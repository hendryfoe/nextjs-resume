import { NextResponse } from 'next/server';

import type { LaunchOptions } from 'playwright-core';

import chromium from '@sparticuz/chromium-min';
import { chromium as playwright } from 'playwright-core';

const apiKey = process.env.API_AUTHENTICATION_KEY;
const chromiumExecutablePath = process.env.CHROMIUM_EXECUTABLE_PATH;

export async function GET(req: Request) {
  const { searchParams, host } = new URL(req.url);
  const password = searchParams.get('p');

  if (apiKey === '' || password !== apiKey) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401, statusText: 'Unauthorized' });
  }

  let protocol;
  // let options: LaunchOptions & BrowserLaunchArgumentOptions & BrowserConnectOptions;
  let options: LaunchOptions;

  // https://github.com/vercel/virtual-event-starter-kit/blob/main/lib/screenshot.ts
  // https://github.com/Sparticuz/chromium/releases
  if (process.env.AWS_REGION || process.env.NODE_ENV === 'production') {
    protocol = 'https://';
    options = {
      args: chromium.args,
      executablePath: await chromium.executablePath(chromiumExecutablePath),
      headless: true
    };
  } else {
    protocol = 'http://';
    options = {
      args: [],
      executablePath:
        process.platform === 'win32'
          ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
          : process.platform === 'linux'
          ? '/usr/bin/google-chrome'
          : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: true
    };
  }

  const endpoint = `${protocol}${host}?p=${password}`;

  try {
    console.time('playwright-time');
    const browser = await playwright.launch(options);

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(endpoint);

    const pdfBuffer = await page.pdf({ format: 'a4', printBackground: true });

    await browser.close();
    console.timeEnd('playwright-time');

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
