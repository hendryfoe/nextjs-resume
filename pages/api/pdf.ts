// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import playwright from 'playwright';

type Data = {
  error?: any;
  message: string;
};

const APP_URL = process.env.APP_URL;
const API_AUTHENTICATION_KEY = process.env.API_AUTHENTICATION_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const password = req.query.p;

  if (
    req.method?.toUpperCase() !== 'GET' ||
    password == null ||
    password === '' ||
    password !== API_AUTHENTICATION_KEY ||
    API_AUTHENTICATION_KEY == null ||
    API_AUTHENTICATION_KEY === ''
  ) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }

  try {
    const browser = await playwright.chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(APP_URL, { waitUntil: 'networkidle' });
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
    await browser.close();

    res.write(pdfBuffer, 'binary');
    // res.setHeader('Content-disposition', 'attachment; filename=resume.pdf');
    res.end();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        error: error.message,
        message: error.name
      });
    }

    return res.status(400).json({
      error: JSON.stringify(error),
      message: 'Failed'
    });
  }
}
