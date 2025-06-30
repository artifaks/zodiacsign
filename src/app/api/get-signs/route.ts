import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

// Mock function to determine zodiac sign based on date
function getZodiacSign(date: string): string {
  const birthDate = new Date(date);
  const month = birthDate.getMonth() + 1; // getMonth() returns 0-11
  const day = birthDate.getDate();
  
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
  return "Pisces";
}

// Mock function to get moon sign (simplified - in reality this requires complex calculations)
function getMoonSign(date: string, time: string): string {
  const birthDate = new Date(date + 'T' + time);
  const hour = birthDate.getHours();
  
  // Simple mock: alternate between signs based on hour
  const signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
  const index = Math.floor(hour / 2) % 12;
  return signs[index];
}

export async function POST(req: NextRequest) {
  try {
    const { birthDate, birthTime, birthPlace } = await req.json();
    
    // Use mock functions instead of external API
    const sunSign = getZodiacSign(birthDate);
    const moonSign = getMoonSign(birthDate, birthTime);
    
    console.log(`Calculated signs for ${birthDate} ${birthTime} in ${birthPlace}: Sun=${sunSign}, Moon=${moonSign}`);
    
    return new Response(JSON.stringify({ 
      sun: sunSign, 
      moon: moonSign 
    }), { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    console.error('Error in get-signs API:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to get astrological signs' 
    }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
} 