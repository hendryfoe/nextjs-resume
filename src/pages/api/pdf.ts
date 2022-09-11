// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import chrome from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';

type Data = {
  error?: any;
  message: string;
};

const apiKey = process.env.API_AUTHENTICATION_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const requestMethod = req.method?.toUpperCase();
  const password = req.query.p;

  if ((requestMethod !== 'GET' && requestMethod !== 'POST') || apiKey === '' || password !== apiKey) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
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

  const endpoint = `${protocol}${req.headers.host!}?p=${password}`;

  try {
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.goto(endpoint, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'a4', printBackground: true });
    await browser.close();

    // res.write(pdfBuffer, 'binary');
    // res.setHeader('Content-disposition', 'attachment; filename=resume.pdf');
    res.end(pdfBuffer);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        error: error.message,
        message: error.name
      });
    }

    return res.status(500).json({
      error: JSON.stringify(error),
      message: 'Failed'
    });
  }
}
