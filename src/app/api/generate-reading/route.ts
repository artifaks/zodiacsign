import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { sun, moon } = await req.json();
    
    const prompt = `Generate a short, beautiful astrology interpretation based on:\n\nSun Sign: ${sun}\nMoon Sign: ${moon}\n\nTone: mystical, empowering, poetic.\nLength: 150 words.`;
    
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300,
        temperature: 0.9
      })
    });
    
    if (!res.ok) {
      throw new Error(`OpenAI API error: ${res.status}`);
    }
    
    const data = await res.json();
    const message = data.choices?.[0]?.message?.content || "Unable to generate reading at this time.";
    
    return new Response(JSON.stringify({ message }), { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    console.error('Error in generate-reading API:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to generate reading' 
    }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
} 