#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🌟 Celestial Calendar Environment Setup\n');

const envPath = path.join(process.cwd(), '.env.local');
const envExample = `# Supabase Configuration
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
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
`;

if (fs.existsSync(envPath)) {
  console.log('⚠️  .env.local already exists!');
  console.log('Please update your existing .env.local file with the following variables:\n');
} else {
  fs.writeFileSync(envPath, envExample);
  console.log('✅ Created .env.local file\n');
}

console.log('📋 Required Environment Variables:\n');
console.log('🔗 Supabase:');
console.log('  - NEXT_PUBLIC_SUPABASE_URL');
console.log('  - NEXT_PUBLIC_SUPABASE_ANON_KEY\n');

console.log('💳 Stripe (for eBook sales):');
console.log('  - STRIPE_SECRET_KEY');
console.log('  - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY\n');

console.log('🤖 OpenAI (for AI features):');
console.log('  - OPENAI_API_KEY\n');

console.log('📧 Resend (for email horoscopes):');
console.log('  - RESEND_API_KEY');
console.log('  - CRON_SECRET_KEY');
console.log('  - NEXT_PUBLIC_SITE_URL\n');

console.log('🌐 URLs:');
console.log('  - NEXT_PUBLIC_BASE_URL (for production)\n');

console.log('📖 Setup Instructions:');
console.log('1. Sign up for Resend at https://resend.com');
console.log('2. Get your API key from the Resend dashboard');
console.log('3. Add RESEND_API_KEY=your_api_key to .env.local');
console.log('4. Visit /test-email in development mode to test');
console.log('5. Set up cron jobs for daily horoscope delivery\n');

console.log('🔗 Useful Links:');
console.log('- Resend: https://resend.com');
console.log('- Supabase: https://supabase.com');
console.log('- Stripe: https://stripe.com');
console.log('- OpenAI: https://openai.com\n');

console.log('✨ Happy coding!'); 