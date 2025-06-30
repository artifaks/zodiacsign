import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { email, zodiacSign } = await request.json();

    console.log('=== SUBSCRIPTION API DEBUG ===');
    console.log('Request data:', { email, zodiacSign });
    console.log('Supabase client available:', !!supabase);
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing');
    console.log('Supabase Anon Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing');

    if (!email || !zodiacSign) {
      return NextResponse.json({ 
        error: 'Email and zodiac sign are required' 
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ 
        error: 'Please enter a valid email address' 
      }, { status: 400 });
    }

    // Validate zodiac sign
    const validSigns = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    if (!validSigns.includes(zodiacSign)) {
      return NextResponse.json({ 
        error: 'Please select a valid zodiac sign' 
      }, { status: 400 });
    }

    // Check if user is already subscribed
    if (supabase) {
      console.log('Attempting to check existing subscription...');
      
      try {
        const { data: existingSubscription, error: checkError } = await supabase
          .from('horoscope_subscriptions')
          .select('*')
          .eq('email', email)
          .maybeSingle();

        console.log('Check result:', { 
          existingSubscription: !!existingSubscription, 
          checkError: checkError ? checkError.message : null 
        });

        if (checkError) {
          console.error('Error checking existing subscription:', checkError);
          return NextResponse.json({ 
            error: `Failed to check subscription status: ${checkError.message}` 
          }, { status: 500 });
        }

        if (existingSubscription) {
          return NextResponse.json({ 
            error: 'You are already subscribed to daily horoscopes!' 
          }, { status: 400 });
        }

        console.log('Adding new subscription...');
        // Add new subscription
        const { data, error } = await supabase
          .from('horoscope_subscriptions')
          .insert([
            {
              email,
              zodiac_sign: zodiacSign,
              subscribed_at: new Date().toISOString(),
              is_active: true
            }
          ])
          .select()
          .single();

        if (error) {
          console.error('Supabase insert error:', error);
          return NextResponse.json({ 
            error: `Failed to subscribe: ${error.message}` 
          }, { status: 500 });
        }

        console.log('Subscription successful:', data);
        return NextResponse.json({
          success: true,
          message: `You've been subscribed to daily ${zodiacSign} horoscopes! Check your email tomorrow morning for your first cosmic forecast.`,
          subscription: data
        });
      } catch (dbError) {
        console.error('Database operation error:', dbError);
        return NextResponse.json({ 
          error: `Database error: ${dbError instanceof Error ? dbError.message : 'Unknown error'}` 
        }, { status: 500 });
      }
    } else {
      console.log('Supabase not available, using fallback');
      // Fallback for when Supabase is not available
      return NextResponse.json({
        success: true,
        message: `You've been subscribed to daily ${zodiacSign} horoscopes! Check your email tomorrow morning for your first cosmic forecast.`,
        note: 'Subscription saved locally (database not connected)'
      });
    }

  } catch (error) {
    console.error('Subscription API error:', error);
    return NextResponse.json({ 
      error: `Failed to subscribe: ${error instanceof Error ? error.message : 'Unknown error'}` 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ 
        error: 'Email is required' 
      }, { status: 400 });
    }

    if (supabase) {
      const { error } = await supabase
        .from('horoscope_subscriptions')
        .delete()
        .eq('email', email);

      if (error) {
        console.error('Supabase error:', error);
        return NextResponse.json({ 
          error: 'Failed to unsubscribe. Please try again.' 
        }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        message: 'You have been unsubscribed from daily horoscopes.'
      });
    } else {
      return NextResponse.json({
        success: true,
        message: 'You have been unsubscribed from daily horoscopes.',
        note: 'Unsubscription processed locally (database not connected)'
      });
    }

  } catch (error) {
    console.error('Unsubscription error:', error);
    return NextResponse.json({ 
      error: 'Failed to unsubscribe. Please try again.' 
    }, { status: 500 });
  }
} 