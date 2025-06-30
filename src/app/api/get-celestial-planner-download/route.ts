import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Celestial Planner file mapping
const celestialPlannerFiles = {
  'premium-celestial-planner': {
    mainFile: 'YOUR_SUPABASE_FILE_URL_HERE', // Replace with your actual file URL from Supabase
    description: 'Premium Celestial Planner 2025-2026 - Complete Package'
  }
};

export async function POST(request: NextRequest) {
  try {
    const { sessionId, productId } = await request.json();

    if (!sessionId || !productId) {
      return NextResponse.json(
        { error: 'Session ID and Product ID are required' },
        { status: 400 }
      );
    }

    // Verify payment with Stripe
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      );
    }

    // Get the celestial planner file URL
    const plannerFile = celestialPlannerFiles[productId as keyof typeof celestialPlannerFiles];
    if (!plannerFile) {
      return NextResponse.json(
        { error: 'Invalid Product ID' },
        { status: 400 }
      );
    }

    // Record the purchase in Supabase if available
    if (supabase) {
      try {
        await supabase
          .from('celestial_planner_purchases')
          .insert({
            session_id: sessionId,
            product_id: productId,
            customer_email: session.customer_details?.email,
            amount: session.amount_total / 100, // Convert from cents
            status: 'completed'
          });
      } catch (error) {
        console.error('Error recording purchase:', error);
        // Don't fail the download if recording fails
      }
    }

    return NextResponse.json({ 
      downloadUrl: plannerFile.mainFile,
      description: plannerFile.description
    });
  } catch (error) {
    console.error('Error generating download link:', error);
    return NextResponse.json(
      { error: 'Failed to generate download link' },
      { status: 500 }
    );
  }
} 