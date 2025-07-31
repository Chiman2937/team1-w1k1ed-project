import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return new Response(JSON.stringify({ error: 'Missing URL' }), { status: 400 });
  }

  try {
    const res = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(targetUrl)}`);
    const { data } = await res.json();

    const ogData = {
      title: data.title || '',
      description: data.description || '',
      image: data.image?.url || '',
    };

    return new Response(JSON.stringify(ogData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Microlink fetch failed', details: String(err) }), {
      status: 500,
    });
  }
}
