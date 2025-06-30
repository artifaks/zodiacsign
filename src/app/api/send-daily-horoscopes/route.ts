import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

// This would be called by a cron job or scheduled task
export async function POST(request: NextRequest) {
  try {
    // Verify authorization (you can add your own secret key)
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET_KEY}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    // Get all active subscribers
    const { data: subscribers, error: subscribersError } = await supabase
      .from('horoscope_subscriptions')
      .select('email, zodiac_sign')
      .eq('is_active', true);

    if (subscribersError) {
      console.error('Error fetching subscribers:', subscribersError);
      return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({ message: 'No active subscribers found' });
    }

    // Generate today's horoscope
    const today = new Date();
    const horoscope = generateDailyHoroscope(today);

    // Send emails to all subscribers
    const emailPromises = subscribers.map(async (subscriber) => {
      try {
        const personalizedHoroscope = personalizeHoroscope(horoscope, subscriber.zodiac_sign);
        
        await resend.emails.send({
          from: 'Celestial Calendar <info@thecelestialcalendar.com>',
          to: subscriber.email,
          subject: `🌟 Your Daily Horoscope - ${today.toLocaleDateString()}`,
          html: generateEmailTemplate(personalizedHoroscope, subscriber.zodiac_sign, today),
        });

        return { email: subscriber.email, status: 'sent' };
      } catch (error) {
        console.error(`Failed to send email to ${subscriber.email}:`, error);
        return { email: subscriber.email, status: 'failed', error };
      }
    });

    const results = await Promise.allSettled(emailPromises);
    
    const successful = results.filter(result => 
      result.status === 'fulfilled' && result.value.status === 'sent'
    ).length;
    
    const failed = results.length - successful;

    return NextResponse.json({
      message: `Daily horoscopes sent successfully`,
      results: {
        total: subscribers.length,
        successful,
        failed
      }
    });

  } catch (error) {
    console.error('Error sending daily horoscopes:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function generateDailyHoroscope(date: Date): string {
  const cosmicEnergies = [
    'The Moon in Cancer brings emotional depth and intuition',
    'Mercury\'s influence enhances communication and clarity',
    'Venus aligns with Jupiter, bringing abundance and harmony',
    'Mars energy fuels passion and determination',
    'Saturn\'s grounding influence provides stability',
    'Uranus brings unexpected breakthroughs and innovation',
    'Neptune enhances spiritual awareness and creativity',
    'Pluto\'s transformative energy encourages deep change'
  ];

  const randomEnergy = cosmicEnergies[date.getDate() % cosmicEnergies.length];
  
  return `Today's cosmic energy is influenced by ${randomEnergy}. The universe is aligning to support your highest good. Trust in the divine timing and embrace the opportunities that come your way.`;
}

function personalizeHoroscope(baseHoroscope: string, zodiacSign: string): string {
  const signSpecificMessages = {
    'Aries': 'As a fiery Aries, your natural leadership qualities are amplified today. Take bold action on your dreams.',
    'Taurus': 'Grounded Taurus, your patience and determination will serve you well. Focus on building lasting foundations.',
    'Gemini': 'Mercurial Gemini, your curiosity and adaptability shine. Embrace new ideas and connections.',
    'Cancer': 'Nurturing Cancer, your intuition is especially strong. Trust your feelings and care for those around you.',
    'Leo': 'Radiant Leo, your creativity and charisma are at their peak. Share your light with the world.',
    'Virgo': 'Analytical Virgo, your attention to detail brings clarity. Organize and perfect what matters most.',
    'Libra': 'Harmonious Libra, your sense of balance guides you. Seek beauty and fairness in all situations.',
    'Scorpio': 'Mysterious Scorpio, your depth and intensity reveal hidden truths. Transform and evolve.',
    'Sagittarius': 'Adventurous Sagittarius, your optimism opens new horizons. Explore and expand your knowledge.',
    'Capricorn': 'Ambitious Capricorn, your discipline and focus bring success. Build your legacy step by step.',
    'Aquarius': 'Innovative Aquarius, your unique perspective inspires change. Connect with your community.',
    'Pisces': 'Dreamy Pisces, your compassion and creativity flow freely. Trust your spiritual guidance.'
  };

  const signMessage = signSpecificMessages[zodiacSign as keyof typeof signSpecificMessages] || '';
  
  return `${baseHoroscope} ${signMessage}`;
}

function generateEmailTemplate(horoscope: string, zodiacSign: string, date: Date): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Daily Horoscope</title>
      <style>
        body {
          font-family: 'Georgia', serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .container {
          background: white;
          border-radius: 15px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .header h1 {
          color: #4a5568;
          margin: 0;
          font-size: 28px;
        }
        .date {
          color: #718096;
          font-style: italic;
          margin-top: 5px;
        }
        .zodiac-sign {
          background: linear-gradient(135deg, #ffd700, #ffed4e);
          color: #2d3748;
          padding: 10px 20px;
          border-radius: 25px;
          display: inline-block;
          font-weight: bold;
          margin-bottom: 20px;
        }
        .horoscope {
          background: #f7fafc;
          padding: 25px;
          border-radius: 10px;
          border-left: 4px solid #667eea;
          margin: 20px 0;
          font-size: 16px;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
          color: #718096;
          font-size: 14px;
        }
        .unsubscribe {
          color: #667eea;
          text-decoration: none;
        }
        .unsubscribe:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🌟 Celestial Calendar</h1>
          <div class="date">${date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</div>
        </div>
        
        <div style="text-align: center;">
          <div class="zodiac-sign">${zodiacSign}</div>
        </div>
        
        <div class="horoscope">
          ${horoscope}
        </div>
        
        <div class="footer">
          <p>Thank you for connecting with the cosmos! 🌙✨</p>
          <p>
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/horoscope" class="unsubscribe">
              View Full Horoscope
            </a> | 
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe?email=UNSUBSCRIBE_EMAIL" class="unsubscribe">
              Unsubscribe
            </a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
} 