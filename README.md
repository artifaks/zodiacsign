# 🌟 Celestial Calendar

A mystical astrology app with AI-powered birth charts, daily rituals, cosmic forecasts, personalized insights, and eBook sales.

## ✨ Features

- **🔮 Birth Chart Analysis** - Discover your Sun & Moon signs with AI interpretations
- **🌙 Daily Rituals** - Personalized lunar rituals and spiritual practices
- **🪐 Cosmic Forecasts** - Daily astrological insights and predictions
- **📝 Journal Prompts** - Guided spiritual journaling with AI assistance
- **👤 User Profiles** - Save your birth chart and journal entries
- **✨ Celestial Gold Membership** - Premium features and advanced insights
- **📖 eBook Sales** - Sell your spiritual eBook with Stripe integration
- **📰 Blog System** - Dynamic blog with categories, search, and admin interface
- **🤖 AI Chatbot** - Interactive cosmic assistant for astrology questions
- **💬 Comment System** - Community engagement with moderation capabilities
- **🔮 Daily Horoscopes** - AI-powered daily horoscopes that change every day
- **📧 Email Subscriptions** - Subscribe to receive daily horoscopes in your inbox
- **⭐ Birth Chart Calculator** - Discover your Sun & Moon signs with cosmic insights
- **🌙 Lunar Rituals** - Sacred rituals aligned with moon phases
- **📱 Social Sharing** - Share cosmic insights across platforms

## 📧 Daily Email Horoscopes System

### Overview
The daily email horoscope system allows users to subscribe to personalized horoscopes delivered to their inbox every morning. Each horoscope is uniquely generated based on the current date and cosmic energies.

### Features
- **AI-Powered Generation** - Unique horoscopes generated daily using cosmic algorithms
- **Personalized Content** - Tailored to each zodiac sign's energy
- **Automatic Delivery** - Scheduled email delivery via cron jobs
- **Easy Subscription** - Simple signup form with zodiac sign selection
- **Unsubscribe Option** - One-click unsubscribe functionality
- **Beautiful Email Templates** - Responsive HTML emails with mystical design

### Setup Instructions

#### 1. Email Service Integration

**Resend Setup (Recommended)**
```bash
npm install resend
```

Add to your `.env.local`:
```env
RESEND_API_KEY=your_resend_api_key
CRON_SECRET_KEY=your_cron_secret_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Resend Configuration Steps:**
1. Sign up at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. Verify your domain (or use sandbox domain for testing)
4. Update the "from" email address in API routes

**Test Email Functionality:**
Visit `/test-email` in development mode to test your Resend integration.

#### 2. Configure Email Sending

The system now uses Resend for email delivery. The `send-daily-horoscopes` API route includes:

- **Personalized Horoscopes** - Each subscriber gets a unique horoscope based on their zodiac sign
- **Beautiful Email Templates** - Responsive HTML emails with mystical design
- **Error Handling** - Comprehensive error tracking and logging
- **Batch Processing** - Efficient sending to multiple subscribers

**Email Template Features:**
- Responsive design with cosmic gradient backgrounds
- Zodiac sign highlighting
- Personalized horoscope content
- Unsubscribe links
- Professional branding

#### 3. Set Up Cron Job

**Option A: Vercel Cron Jobs**
Create `vercel.json` in your project root:
```json
{
  "crons": [
    {
      "path": "/api/send-daily-horoscopes",
      "schedule": "0 8 * * *"
    }
  ]
}
```

**Option B: External Cron Service**
Set up a cron job to call:
```
POST https://yourdomain.com/api/send-daily-horoscopes
Authorization: Bearer your_cron_secret_key
```

The cron job will run daily at 8 AM and send horoscopes to all active subscribers.

#### 4. Database Setup

The system uses the `horoscope_subscriptions` table (already included in `supabase-setup.sql`):

```sql
CREATE TABLE horoscope_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  zodiac_sign TEXT NOT NULL CHECK (zodiac_sign IN ('Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces')),
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  last_sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### How It Works

1. **User Subscription** - Users fill out the subscription form on the horoscope page
2. **Database Storage** - Subscription details are stored in Supabase
3. **Daily Generation** - Cron job triggers horoscope generation for each sign
4. **Email Delivery** - Personalized horoscopes are sent to subscribers
5. **Tracking** - System tracks delivery status and last sent dates

### Customization

#### Email Template
Customize the email HTML template in the `generateEmailHTML` function:

```typescript
function generateEmailHTML(sign: string, horoscope: string, date: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Your Daily ${sign} Horoscope</title>
      <style>
        /* Your custom CSS styles */
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🌟 Your Daily ${sign} Horoscope</h1>
        <p>${date}</p>
        <div class="horoscope">
          ${horoscope.replace(/\n/g, '<br>')}
        </div>
      </div>
    </body>
    </html>
  `;
}
```

#### Horoscope Generation
The horoscope generation algorithm can be customized in `/api/generate-daily-horoscope/route.ts`:

- **Cosmic Energies** - Modify the energy patterns array
- **Planetary Influences** - Add or change planetary effects
- **Daily Themes** - Customize the daily theme patterns
- **Sign Insights** - Update sign-specific interpretations

### Testing

#### Email System Testing
1. **Set up Resend** - Add your API key to `.env.local`
2. **Test Email Functionality** - Visit `/test-email` in development mode
3. **Send Test Email** - Use the form to verify email delivery
4. **Check Email Templates** - Verify the beautiful HTML email design

#### Manual Testing
Test the subscription system:
1. Visit `/horoscope` page
2. Fill out the subscription form
3. Check the database for the new subscription
4. Manually trigger the email sending API

#### Email Testing
```bash
# Test the daily horoscope sending
curl -X POST https://yourdomain.com/api/send-daily-horoscopes \
  -H "Authorization: Bearer your_cron_secret_key"

# Test individual email sending
curl -X POST https://yourdomain.com/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

#### Development Testing
- **Test Environment** - Visit `/test-env` to check environment variables
- **Email Testing** - Visit `/test-email` to test Resend integration
- **API Testing** - Use the provided test endpoints for all functionality

### Monitoring

The system provides detailed logging:
- Subscription creation/deletion
- Email delivery status
- Error tracking
- Performance metrics

Check the console logs and database for monitoring information.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (for authentication & database)
- Stripe account (for eBook payments)
- OpenAI API key (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd celestial-calendar
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Stripe Configuration (for eBook sales)
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   
   # OpenAI Configuration (for AI features)
   OPENAI_API_KEY=your_openai_api_key
   
   # Email Service (for daily horoscopes)
   RESEND_API_KEY=your_resend_api_key
   CRON_SECRET_KEY=your_cron_secret_key
   
   # Base URL (for production)
   NEXT_PUBLIC_BASE_URL=https://yourdomain.com
   ```

4. **Set up Supabase Database**
   
   Run the complete SQL setup from `supabase-setup.sql` in your Supabase SQL editor, or use the simplified version below:
   ```sql
   -- Create birth_charts table
   CREATE TABLE birth_charts (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     birth_date DATE NOT NULL,
     birth_time TIME NOT NULL,
     birth_place TEXT NOT NULL,
     sun_sign TEXT NOT NULL,
     moon_sign TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   
   -- Create journal_entries table
   CREATE TABLE journal_entries (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     prompt TEXT NOT NULL,
     response TEXT,
     saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   
   -- Create blog_posts table
   CREATE TABLE blog_posts (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title TEXT NOT NULL,
     excerpt TEXT NOT NULL,
     content TEXT NOT NULL,
     author TEXT NOT NULL,
     category TEXT NOT NULL,
     read_time TEXT,
     image TEXT,
     image_url TEXT,
     tags TEXT[],
     published BOOLEAN DEFAULT false,
     published_at TIMESTAMP WITH TIME ZONE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   
   -- Create ebook_purchases table
   CREATE TABLE ebook_purchases (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     session_id TEXT NOT NULL UNIQUE,
     customer_email TEXT,
     amount INTEGER NOT NULL,
     status TEXT NOT NULL DEFAULT 'pending',
     download_count INTEGER DEFAULT 0,
     download_limit INTEGER DEFAULT 3,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   
   -- Enable Row Level Security
   ALTER TABLE birth_charts ENABLE ROW LEVEL SECURITY;
   ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
   ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
   ALTER TABLE ebook_purchases ENABLE ROW LEVEL SECURITY;
   
   -- Create policies (see supabase-setup.sql for complete policies)
   ```

5. **Set up Stripe for eBook Sales**
   
   a. Create a Stripe account at [stripe.com](https://stripe.com)
   b. Get your API keys from the Stripe Dashboard
   c. Add them to your `.env.local` file
   d. Configure webhook endpoints (optional, for production)

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the app.

## 📖 eBook Sales System

The eBook sales system includes:

- **Beautiful Product Page** - Showcase your eBook with pricing and features
- **Stripe Integration** - Secure payment processing
- **Download Management** - Track purchases and downloads
- **Success Page** - Thank you page with download instructions
- **Purchase Tracking** - Database records of all sales

### eBook Setup

1. **Upload your eBook** to Supabase Storage or your preferred hosting
2. **Update the download URL** in `/api/get-ebook-download/route.ts`
3. **Customize the product page** in `/app/ebook/page.tsx`
4. **Test the purchase flow** using Stripe test cards

### Stripe Test Cards

Use these test card numbers for testing:
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **Expiry**: Any future date
- **CVC**: Any 3 digits

## 🤖 AI Chatbot System

The AI chatbot provides an interactive cosmic assistant that can answer questions about:

- **Astrology** - Birth charts, zodiac signs, planetary influences
- **Lunar Phases** - Moon cycles, rituals, and energy work
- **Crystals** - Healing properties and spiritual uses
- **Meditation** - Techniques and spiritual practices
- **Rituals** - Sacred practices and intention setting

### Features
- **Floating Chat Widget** - Always accessible on all pages
- **Intelligent Responses** - Context-aware cosmic wisdom
- **Beautiful UI** - Mystical design matching the app theme
- **Real-time Interaction** - Instant responses to user questions

### Customization
The chatbot responses can be customized in `/src/components/AIChatbot.tsx` by modifying the `responses` object and `defaultResponses` array.

## 💬 Comment System

The blog comment system enables community engagement with:

- **User Comments** - Readers can leave comments on blog posts
- **Moderation** - Admin approval system for quality control
- **Rich Interface** - Beautiful comment display with timestamps
- **Admin Management** - Complete comment moderation interface

### Features
- **Comment Form** - Easy-to-use comment submission
- **Moderation Queue** - Admin interface for approving/rejecting comments
- **User-Friendly** - Simple name and email collection
- **Fallback Data** - Sample comments when Supabase is unavailable

### Admin Interface
Access the comment management system at `/admin/comments` to:
- View all comments (pending, approved, or all)
- Approve or reject comments
- See comment details and associated blog posts
- Manage community engagement

### Database Schema
The comment system uses the `blog_comments` table with:
- Comment content and author information
- Approval status tracking
- Blog post association
- Timestamp tracking

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── create-checkout-session/  # Stripe checkout
│   │   ├── get-ebook-download/       # eBook download
│   │   └── blog-posts/               # Blog API
│   ├── ebook/             # eBook sales page
│   │   └── success/       # Purchase success page
│   ├── birth-chart/       # Birth chart analysis page
│   ├── forecast/          # Daily cosmic forecast
│   ├── membership/        # Premium membership page
│   ├── profile/           # User profile page
│   ├── rituals/           # Daily rituals page
│   └── shop/              # Affiliate products
├── components/            # Reusable React components
├── contexts/              # React contexts (Auth)
└── lib/                   # Utility functions and configurations
```

## 🔧 Configuration

### Supabase Setup
1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Add them to your `.env.local` file
4. Run the SQL setup from `supabase-setup.sql`

### Stripe Setup
1. Create an account at [stripe.com](https://stripe.com)
2. Get your API keys from the Dashboard
3. Add them to your `.env.local` file
4. Test the payment flow with test cards

### OpenAI Setup
1. Get an API key from [platform.openai.com](https://platform.openai.com)
2. Add it to your `.env.local` file

## 🌟 Features in Development

- [ ] **Advanced Birth Chart Analysis** - Full natal chart with all planets
- [ ] **Lunar Calendar Integration** - Moon phase tracking and rituals
- [ ] **PDF Report Generation** - Downloadable birth chart reports
- [ ] **Email Notifications** - Daily forecasts and ritual reminders
- [ ] **Mobile App** - React Native version

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Astrology calculations powered by astronomical algorithms
- AI insights powered by OpenAI GPT models
- Payment processing powered by Stripe
- Beautiful UI inspired by cosmic aesthetics

## 📚 Cosmic Blog

The blog system supports:

- **Categories**: Moon Phases, Astrology, Rituals, Crystals, Meditation
- **Search**: Full-text search across titles, excerpts, and content
- **Tags**: Flexible tagging system
- **Admin Interface**: Create, edit, and manage blog posts
- **Fallback Mode**: Works with sample data when Supabase is not connected

### Blog Features

- ✅ **Dynamic Content** - Fetch from Supabase database
- ✅ **Category Filtering** - Filter by mystical categories
- ✅ **Search Functionality** - Search across all content
- ✅ **Responsive Design** - Beautiful mobile-friendly layout
- ✅ **Loading States** - Smooth user experience
- ✅ **Error Handling** - Graceful fallback to sample data
- ✅ **SEO Optimized** - Meta tags and structured content
- ✅ **Social Sharing** - Share buttons for all major platforms
- ✅ **Individual Post Pages** - Full article display with sharing

## API Routes

- `/api/blog-posts` - GET/POST blog posts
- `/api/blog-posts/[id]` - GET individual blog post
- `/api/create-checkout-session` - Create Stripe checkout session
- `/api/get-ebook-download` - Generate secure download URL
- `/api/subscribe` - Newsletter subscription

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **Storage**: Supabase Storage (for eBooks)
- **Deployment**: Vercel (recommended)

## Development

### Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── api/            # API routes
│   ├── blog/           # Blog pages
│   ├── ebook/          # eBook sales
│   └── admin/          # Admin interface
├── components/         # React components
├── contexts/           # React contexts
└── lib/               # Utilities and configs
```

### Key Features

- **Authentication**: Supabase Auth with email/password
- **Database**: PostgreSQL with Row Level Security
- **Payments**: Stripe Checkout for eBook sales
- **Blog System**: Full CRUD with admin interface
- **Responsive Design**: Mobile-first approach
- **SEO Optimized**: Meta tags and structured data

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables

Make sure to set these in your production environment:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`