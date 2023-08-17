import chrome from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';

const apiKey = process.env.API_AUTHENTICATION_KEY;

import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams, host } = new URL(req.url);
  const password = searchParams.get('p');

  if (apiKey === '' || password !== apiKey) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401, statusText: 'Unauthorized' });
  }

  let protocol;
  let options;

  // https://github.com/vercel/virtual-event-starter-kit/blob/main/lib/screenshot.ts
  if (process.env.AWS_REGION) {
    protocol = 'https://';
    options = {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless
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
          : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    };
  }

  const endpoint = `${protocol}${host}?p=${password}`;

  try {
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.goto(endpoint, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'a4', printBackground: true });
    await browser.close();

    // res.write(pdfBuffer, 'binary');
    // res.setHeader('Content-disposition', 'attachment; filename=resume.pdf');
    // const headers = new Headers();
    // headers.append('Content-disposition', 'attachment; filename=resume.pdf');
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
