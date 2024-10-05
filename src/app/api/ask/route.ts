import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { title } = await req.json();

    const response = await fetch('https://api.cohere.ai/generate', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.COHERE_API_KEY}`,  // Your Cohere API key
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `Brief recommendation 1 sentence of "${title}"`,
        max_tokens: 100,
      }),
    });

    const data = await response.json();

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching AI response:', error);
    return NextResponse.json({ error: 'An error occurred while fetching the AI response' }, { status: 500 });
  }
}

