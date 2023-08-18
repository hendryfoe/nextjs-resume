import { NextResponse } from 'next/server';

import type { LaunchOptions, BrowserLaunchArgumentOptions, BrowserConnectOptions } from 'puppeteer-core';

import chromium from '@sparticuz/chromium-min';
import puppeteer from 'puppeteer-core';

const apiKey = process.env.API_AUTHENTICATION_KEY;
const chromiumExecutablePath = process.env.CHROMIUM_EXECUTABLE_PATH;

export async function GET(req: Request) {
  const { searchParams, host } = new URL(req.url);
  const password = searchParams.get('p');

  if (apiKey === '' || password !== apiKey) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401, statusText: 'Unauthorized' });
  }

  let protocol;
  let options: LaunchOptions & BrowserLaunchArgumentOptions & BrowserConnectOptions;

  // https://github.com/vercel/virtual-event-starter-kit/blob/main/lib/screenshot.ts
  // https://github.com/Sparticuz/chromium/releases
  if (process.env.AWS_REGION || process.env.NODE_ENV === 'production') {
    protocol = 'https://';
    options = {
      args: chromium.args,
      // defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(chromiumExecutablePath),
      headless: chromium.headless as boolean,
      ignoreHTTPSErrors: true
    };
  } else {
    protocol = 'http://';
    options = {
      args: [],
      defaultViewport: chromium.defaultViewport,
      executablePath:
        process.platform === 'win32'
          ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
          : process.platform === 'linux'
          ? '/usr/bin/google-chrome'
          : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: chromium.headless as boolean
    };
  }

  const endpoint = `${protocol}${host}?p=${password}`;

  try {
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();

    await page.goto(endpoint, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({ format: 'a4', printBackground: true });

    // await browser.close();

    return new Response(pdfBuffer);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: error.message,
          message: error.name
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error: JSON.stringify(error),
        message: 'Failed'
      },
      { status: 500 }
    );
  }
}
