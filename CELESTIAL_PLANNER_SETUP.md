# Celestial Planner Payment & Download System Setup

## Overview
The Premium Celestial Planner is now integrated with your existing Stripe payment system. Once a customer pays $4.99, they'll be redirected to a success page where they can download the complete celestial planner package.

## What's Been Added

### 1. Payment Integration
- Updated `/api/create-checkout-session/route.ts` to include the Premium Celestial Planner
- Product ID: `premium-celestial-planner`
- Price: $4.99 (499 cents)

### 2. Download System
- New API: `/api/get-celestial-planner-download/route.ts`
- Verifies payment with Stripe before allowing download
- Records purchase in Supabase database

### 3. Success Page
- New page: `/celestial-planner/success/page.tsx`
- Handles payment verification and download generation
- Beautiful UI matching your site's theme

### 4. Database Setup
- SQL file: `celestial-planner-setup.sql`
- Creates `celestial_planner_purchases` table
- Includes Row Level Security policies

## Setup Instructions

### 1. Database Setup
Run the SQL commands in `celestial-planner-setup.sql` in your Supabase SQL editor:

```sql
-- Copy and paste the contents of celestial-planner-setup.sql
```

### 2. File Storage
Upload your celestial planner files to Supabase Storage:

1. Go to your Supabase dashboard
2. Navigate to Storage
3. Create a new bucket called `celestial-planner` (if it doesn't exist)
4. Upload your celestial planner files (ZIP, PDF, etc.)
5. Make the files publicly accessible
6. Update the file URL in `/api/get-celestial-planner-download/route.ts`

### 3. Environment Variables
Ensure these are set in your `.env.local`:

```env
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### 4. Stripe Product Setup
In your Stripe dashboard:
1. Create a new product called "Premium Celestial Planner 2025-2026"
2. Set the price to $4.99
3. The system will use the price ID automatically

## How It Works

1. **Customer clicks "Get Premium Access"** on the shop page
2. **Stripe Checkout** processes the $4.99 payment
3. **Success redirect** takes them to `/celestial-planner/success`
4. **Payment verification** happens automatically
5. **Download link** is generated and displayed
6. **Customer downloads** the complete celestial planner package

## File Structure
```
src/app/
├── api/
│   ├── create-checkout-session/route.ts (updated)
│   └── get-celestial-planner-download/route.ts (new)
├── celestial-planner/
│   └── success/
│       └── page.tsx (new)
└── shop/
    └── page.tsx (updated)
```

## Testing
1. Use Stripe test mode for development
2. Test the complete flow: payment → success page → download
3. Verify purchase records in Supabase database

## Customization
- Update the download file URL in the API route
- Modify the success page content and styling
- Add additional products following the same pattern
- Customize the database schema as needed

## Security Features
- Payment verification with Stripe
- Row Level Security in Supabase
- Session-based download links
- Purchase tracking and analytics 