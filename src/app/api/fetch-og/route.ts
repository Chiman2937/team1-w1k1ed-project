import { NextRequest } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return new Response(JSON.stringify({ error: 'Missing URL' }), { status: 400 });
  }

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });

    const ogData = await page.evaluate(() => {
      const get = (prop: string) =>
        document.querySelector(`meta[property="${prop}"]`)?.getAttribute('content') || '';
      return {
        title: get('og:title'),
        description: get('og:description'),
        image: get('og:image'),
      };
    });

    await browser.close();

    return new Response(JSON.stringify(ogData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'puppeteer failed', details: String(err) }), {
      status: 500,
    });
  }
}
