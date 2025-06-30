import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { moonPhase, energy } = await req.json();
    
    const prompt = `Give me a 1-paragraph calming spiritual ritual for a ${moonPhase} moon. Energy focus: ${energy}. 

Requirements:
- Tone: calming, spiritual, mystical
- Length: 1 paragraph, max 80 words
- Include specific actions (lighting candles, meditation, etc.)
- Mention crystals or natural elements
- Make it practical and accessible
- Focus on the current moon phase energy

Format as a simple ritual instruction that someone can follow immediately.`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150,
        temperature: 0.9
      })
    });
    
    if (!res.ok) {
      throw new Error(`OpenAI API error: ${res.status}`);
    }
    
    const data = await res.json();
    const ritual = data.choices?.[0]?.message?.content || "Create a sacred space with crystals and candles. Meditate on your intentions while holding a clear quartz crystal.";
    
    return new Response(JSON.stringify({ ritual }), { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    console.error('Error in generate-ritual API:', error);
    // Return a fallback ritual if API fails
    return new Response(JSON.stringify({ 
      ritual: "Create a sacred space with crystals and candles. Meditate on your intentions while holding a clear quartz crystal."
    }), { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
} 