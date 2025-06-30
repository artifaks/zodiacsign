import { NextRequest, NextResponse } from 'next/server';

// Daily horoscope generator that changes based on current date and cosmic energies
const generateDailyHoroscope = (sign: string, date: Date): string => {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const day = date.getDate();
  
  // Cosmic energy patterns that change daily
  const cosmicEnergies = [
    'fiery passion and bold new beginnings',
    'grounded wisdom and patient growth',
    'intellectual curiosity and communication',
    'emotional depth and intuitive insights',
    'creative expression and leadership',
    'practical organization and service',
    'harmonious balance and partnership',
    'transformative power and mystery',
    'adventurous spirit and expansion',
    'ambitious goals and disciplined focus',
    'innovative thinking and humanitarian ideals',
    'spiritual connection and compassionate dreams'
  ];

  // Planetary influences that shift daily
  const planetaryInfluences = [
    'Mars ignites your warrior spirit',
    'Venus brings harmony to relationships',
    'Mercury sharpens your communication',
    'Moon enhances your emotional awareness',
    'Sun amplifies your core identity',
    'Jupiter expands your opportunities',
    'Saturn provides structure and wisdom',
    'Uranus brings unexpected breakthroughs',
    'Neptune dissolves boundaries for spiritual growth',
    'Pluto transforms through deep change'
  ];

  // Daily themes based on date patterns
  const dailyThemes = [
    'new beginnings and fresh starts',
    'nurturing existing connections',
    'learning and intellectual growth',
    'emotional healing and self-care',
    'creative expression and joy',
    'service to others and community',
    'balance and harmony in all areas',
    'transformation and letting go',
    'adventure and exploration',
    'building foundations for the future',
    'innovation and breaking free',
    'spiritual connection and intuition'
  ];

  // Get current cosmic energy based on day of year
  const currentEnergy = cosmicEnergies[dayOfYear % cosmicEnergies.length];
  const planetaryInfluence = planetaryInfluences[dayOfYear % planetaryInfluences.length];
  const dailyTheme = dailyThemes[dayOfYear % dailyThemes.length];

  // Sign-specific daily insights
  const signInsights = {
    'Aries': {
      energy: 'Your natural leadership shines today',
      focus: 'Take bold action on your goals',
      challenge: 'Practice patience with slower-moving situations',
      opportunity: 'New ventures align with your pioneering spirit'
    },
    'Taurus': {
      energy: 'Your steady determination creates lasting results',
      focus: 'Build on your solid foundations',
      challenge: 'Embrace change when it serves your growth',
      opportunity: 'Financial and material gains are favored'
    },
    'Gemini': {
      energy: 'Your quick mind processes information rapidly',
      focus: 'Communicate your ideas clearly',
      challenge: 'Avoid spreading yourself too thin',
      opportunity: 'Networking brings valuable connections'
    },
    'Cancer': {
      energy: 'Your intuition guides you to emotional truth',
      focus: 'Nurture your relationships and home life',
      challenge: 'Don\'t let emotions cloud your judgment',
      opportunity: 'Creative projects flow from your heart'
    },
    'Leo': {
      energy: 'Your natural charisma draws people to you',
      focus: 'Express your creativity and leadership',
      challenge: 'Remember to listen as well as lead',
      opportunity: 'Recognition and appreciation come your way'
    },
    'Virgo': {
      energy: 'Your attention to detail serves you well',
      focus: 'Organize and improve your environment',
      challenge: 'Don\'t be too hard on yourself or others',
      opportunity: 'Health and wellness goals are supported'
    },
    'Libra': {
      energy: 'Your sense of balance creates harmony',
      focus: 'Foster cooperation and partnership',
      challenge: 'Make decisions without overthinking',
      opportunity: 'Beautiful experiences enhance your life'
    },
    'Scorpio': {
      energy: 'Your depth of perception reveals hidden truths',
      focus: 'Transform situations through your insight',
      challenge: 'Release control when it no longer serves',
      opportunity: 'Intimate connections deepen meaningfully'
    },
    'Sagittarius': {
      energy: 'Your optimistic spirit opens new horizons',
      focus: 'Expand your knowledge and experience',
      challenge: 'Ground your big ideas in practical steps',
      opportunity: 'Travel and learning bring growth'
    },
    'Capricorn': {
      energy: 'Your disciplined approach builds success',
      focus: 'Work steadily toward your long-term goals',
      challenge: 'Allow yourself to enjoy the journey',
      opportunity: 'Career advancement is well-supported'
    },
    'Aquarius': {
      energy: 'Your innovative thinking breaks new ground',
      focus: 'Contribute to causes larger than yourself',
      challenge: 'Connect emotionally while staying independent',
      opportunity: 'Technology and social change align with you'
    },
    'Pisces': {
      energy: 'Your spiritual sensitivity connects you to higher wisdom',
      focus: 'Trust your intuition and creative flow',
      challenge: 'Maintain healthy boundaries',
      opportunity: 'Artistic and spiritual pursuits flourish'
    }
  };

  const signData = signInsights[sign as keyof typeof signInsights] || signInsights['Aries'];
  
  // Generate unique daily horoscope
  const horoscope = `Today, ${currentEnergy} flows through your ${sign} energy. ${planetaryInfluence}, creating a powerful alignment for ${dailyTheme}. ${signData.energy}. 

${signData.focus}. The cosmic currents support ${signData.opportunity}, so trust your instincts and move forward with confidence.

${signData.challenge}. Remember that challenges are opportunities for growth, and your ${sign} resilience will see you through.

**Lucky Number:** ${(dayOfYear + day) % 9 + 1}
**Cosmic Color:** ${['Gold', 'Silver', 'Purple', 'Blue', 'Green', 'Red', 'Orange', 'Pink'][dayOfYear % 8]}
**Power Time:** ${['Dawn', 'Midday', 'Sunset', 'Midnight'][dayOfYear % 4]}`;

  return horoscope;
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sign = searchParams.get('sign');
  
  if (!sign) {
    return NextResponse.json({ error: 'Zodiac sign is required' }, { status: 400 });
  }

  // Generate a unique horoscope based on the sign and current date
  const currentDate = new Date();
  const dayOfYear = Math.floor((currentDate.getTime() - new Date(currentDate.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  
  // Create a seed based on sign and date for consistent but varied horoscopes
  const seed = sign.toLowerCase().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + dayOfYear;
  
  // Generate horoscope based on sign and cosmic energies
  const horoscopes = {
    'Aries': [
      "The fiery energy of Mars empowers you today, Aries. Your natural leadership qualities are amplified, making this the perfect time to take bold action on projects you've been contemplating. Trust your instincts and don't hesitate to blaze new trails.",
      "Your warrior spirit is particularly strong today, Aries. The cosmos encourages you to face challenges head-on with courage and determination. Remember, your enthusiasm is contagious - use it to inspire others around you.",
      "The stars align to boost your confidence and energy levels today, Aries. This is an excellent time for physical activity, competition, or any endeavor that requires passion and drive. Your natural optimism will attract positive opportunities."
    ],
    'Taurus': [
      "Venus, your ruling planet, brings harmony and beauty to your day, Taurus. Focus on creating stability and comfort in your environment. Your practical nature will help you make wise decisions about resources and relationships.",
      "The earth element is strong within you today, Taurus. Ground yourself in nature or through physical activities that bring you joy. Your patience and determination will be rewarded as you work steadily toward your goals.",
      "Your sensual nature is heightened today, Taurus. Take time to appreciate the finer things in life - good food, beautiful surroundings, and meaningful connections. Your loyalty and reliability make you a trusted friend and partner."
    ],
    'Gemini': [
      "Mercury's influence sharpens your communication skills today, Gemini. Your curiosity and adaptability are at their peak, making this an ideal time for learning, networking, and sharing ideas. Embrace your natural versatility.",
      "The twins within you are perfectly balanced today, Gemini. Your ability to see multiple perspectives will help you navigate complex situations with grace. Use your wit and charm to bring people together and foster understanding.",
      "Your mental energy is particularly vibrant today, Gemini. This is an excellent time for writing, teaching, or engaging in stimulating conversations. Your natural curiosity will lead you to discover fascinating new information."
    ],
    'Cancer': [
      "The moon's nurturing energy surrounds you today, Cancer. Your emotional intelligence and intuition are heightened, helping you connect deeply with others. Trust your feelings and use your natural empathy to support those around you.",
      "Your protective instincts are strong today, Cancer. Focus on creating a safe, comfortable environment for yourself and your loved ones. Your caring nature will be appreciated by those who need emotional support.",
      "The cosmic tides favor your sensitive nature today, Cancer. Pay attention to your dreams and intuitive feelings - they may contain important messages. Your ability to create emotional security is a gift to those around you."
    ],
    'Leo': [
      "The sun's radiant energy empowers you today, Leo. Your natural charisma and creativity are amplified, making this the perfect time to shine and express yourself. Your warmth and generosity will attract positive attention.",
      "Your leadership qualities are particularly strong today, Leo. Use your natural confidence and enthusiasm to inspire others and take charge of situations that need direction. Your dramatic flair will make any presentation memorable.",
      "The cosmos celebrates your unique spirit today, Leo. Embrace your natural creativity and express yourself through art, performance, or any activity that allows you to be in the spotlight. Your generosity will be returned tenfold."
    ],
    'Virgo': [
      "Mercury's analytical energy sharpens your mind today, Virgo. Your attention to detail and practical skills are at their best, making this an ideal time for organizing, planning, and improving systems. Your helpful nature will be appreciated.",
      "Your perfectionist tendencies are balanced with wisdom today, Virgo. Focus on being helpful without being critical, and remember that progress is more important than perfection. Your practical advice will be valuable to others.",
      "The earth element grounds your analytical mind today, Virgo. Use your natural problem-solving abilities to help others and improve your environment. Your dedication to service and improvement is truly admirable."
    ],
    'Libra': [
      "Venus brings harmony and balance to your day, Libra. Your natural diplomacy and sense of fairness will help you resolve conflicts and create peace in your relationships. Focus on finding the middle ground in any disagreements.",
      "Your aesthetic sense is particularly refined today, Libra. Surround yourself with beauty and use your natural charm to create harmonious relationships. Your ability to see all sides of an issue makes you an excellent mediator.",
      "The scales of justice are perfectly balanced for you today, Libra. Trust your natural sense of fairness and use your diplomatic skills to bring people together. Your grace and charm will open doors and create opportunities."
    ],
    'Scorpio': [
      "Pluto's transformative energy empowers you today, Scorpio. Your natural intensity and determination will help you dive deep into any project or relationship. Trust your instincts and don't be afraid to explore the hidden depths.",
      "Your emotional depth and intuition are particularly strong today, Scorpio. Use your natural investigative skills to uncover truths and solve mysteries. Your loyalty and passion make you a powerful ally and friend.",
      "The cosmic energy supports your natural magnetism today, Scorpio. Your intensity and mysterious nature will attract others who are drawn to depth and authenticity. Trust your powerful instincts and emotional intelligence."
    ],
    'Sagittarius': [
      "Jupiter's expansive energy broadens your horizons today, Sagittarius. Your natural optimism and love of adventure will lead you to new experiences and opportunities. Trust your intuition and embrace the unknown with enthusiasm.",
      "Your philosophical nature is particularly strong today, Sagittarius. Share your wisdom and insights with others, and be open to learning from different cultures and perspectives. Your natural honesty and directness will be appreciated.",
      "The cosmos encourages your adventurous spirit today, Sagittarius. Whether through travel, education, or spiritual exploration, embrace opportunities to expand your mind and experience new things. Your enthusiasm is infectious."
    ],
    'Capricorn': [
      "Saturn's disciplined energy strengthens your resolve today, Capricorn. Your natural ambition and determination will help you achieve your goals through hard work and persistence. Your practical wisdom will guide you to success.",
      "Your leadership qualities are particularly strong today, Capricorn. Use your natural organizational skills and sense of responsibility to take charge of situations that need structure. Your reliability makes you a trusted authority.",
      "The earth element grounds your ambitious nature today, Capricorn. Focus on building solid foundations for your future through careful planning and steady progress. Your patience and determination will be rewarded."
    ],
    'Aquarius': [
      "Uranus brings innovation and originality to your day, Aquarius. Your natural creativity and humanitarian spirit will inspire others and lead to breakthroughs in your projects. Embrace your unique perspective and don't be afraid to be different.",
      "Your intellectual curiosity and progressive thinking are heightened today, Aquarius. Use your natural inventiveness to solve problems and create new solutions. Your humanitarian nature will draw you to causes that benefit society.",
      "The cosmic energy supports your visionary nature today, Aquarius. Your ability to think outside the box and see the bigger picture will help you make important connections and inspire positive change. Your independence is a strength."
    ],
    'Pisces': [
      "Neptune's mystical energy enhances your intuition today, Pisces. Your natural empathy and artistic sensitivity are at their peak, making this an ideal time for creative expression and spiritual connection. Trust your dreams and visions.",
      "Your compassionate nature is particularly strong today, Pisces. Use your natural healing abilities to support others emotionally and spiritually. Your artistic talents may lead to beautiful creations that touch people's hearts.",
      "The cosmic tides flow in your favor today, Pisces. Your natural psychic abilities and connection to the spiritual realm may bring important insights and guidance. Trust your intuition and let your imagination soar."
    ]
  };

  const signHoroscopes = horoscopes[sign as keyof typeof horoscopes] || horoscopes['Aries'];
  const horoscopeIndex = seed % signHoroscopes.length;
  const horoscope = signHoroscopes[horoscopeIndex];

  return NextResponse.json({ 
    horoscope,
    sign,
    date: currentDate.toISOString().split('T')[0]
  });
} 