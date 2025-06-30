"use client";

import { useState } from 'react';
import Link from 'next/link';
import ShareButton from '@/components/ShareButton';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitStatus('success');
    setIsSubmitting(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitStatus('idle');
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#191970] via-[#232946] to-[#0a0a23] pt-32 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-[#FFD700] font-bold mb-4 drop-shadow-lg">
            🌟 Connect with the Cosmos
          </h1>
          <p className="text-lg text-[#C0C0C0] mb-8 max-w-2xl mx-auto">
            Have questions about your cosmic journey? Need guidance on rituals or birth charts? 
            We're here to help you navigate the mystical realms.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-[#232946] to-[#0a0a23] rounded-2xl p-8 border border-[#FFD700]/20">
            <h2 className="text-2xl font-serif text-[#FFD700] font-bold mb-6">
              📩 Send Us a Message
            </h2>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                <p className="text-green-400 text-center">
                  ✨ Your message has been sent! We'll get back to you within 24 hours.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-[#C0C0C0] font-medium mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#191970]/40 border border-[#FFD700]/30 rounded-lg text-[#C0C0C0] placeholder-[#C0C0C0]/60 focus:outline-none focus:border-[#FFD700]/60 focus:ring-2 focus:ring-[#FFD700]/20"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-[#C0C0C0] font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#191970]/40 border border-[#FFD700]/30 rounded-lg text-[#C0C0C0] placeholder-[#C0C0C0]/60 focus:outline-none focus:border-[#FFD700]/60 focus:ring-2 focus:ring-[#FFD700]/20"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-[#C0C0C0] font-medium mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#191970]/40 border border-[#FFD700]/30 rounded-lg text-[#C0C0C0] focus:outline-none focus:border-[#FFD700]/60 focus:ring-2 focus:ring-[#FFD700]/20"
                >
                  <option value="">Select a subject</option>
                  <option value="birth-chart">Birth Chart Questions</option>
                  <option value="rituals">Ritual Guidance</option>
                  <option value="horoscope">Horoscope & Forecasts</option>
                  <option value="membership">Celestial Gold Membership</option>
                  <option value="technical">Technical Support</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-[#C0C0C0] font-medium mb-2">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-[#191970]/40 border border-[#FFD700]/30 rounded-lg text-[#C0C0C0] placeholder-[#C0C0C0]/60 focus:outline-none focus:border-[#FFD700]/60 focus:ring-2 focus:ring-[#FFD700]/20 resize-none"
                  placeholder="Tell us about your cosmic journey and how we can help..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold py-3 px-6 rounded-lg hover:from-[#FFA500] hover:to-[#FFD700] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">🌙</span>
                    Sending Message...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    ✨ Send Message
                  </span>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Quick Contact */}
            <div className="bg-gradient-to-br from-[#232946] to-[#0a0a23] rounded-2xl p-8 border border-[#FFD700]/20">
              <h2 className="text-2xl font-serif text-[#FFD700] font-bold mb-6">
                🌙 Quick Contact
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">📧</div>
                  <div>
                    <p className="text-[#C0C0C0] font-medium">Email</p>
                    <p className="text-[#FFD700]">hello@celestialcalendar.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-2xl">⏰</div>
                  <div>
                    <p className="text-[#C0C0C0] font-medium">Response Time</p>
                    <p className="text-[#FFD700]">Within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-2xl">🌍</div>
                  <div>
                    <p className="text-[#C0C0C0] font-medium">Time Zone</p>
                    <p className="text-[#FFD700]">PST (Pacific Standard Time)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Preview */}
            <div className="bg-gradient-to-br from-[#232946] to-[#0a0a23] rounded-2xl p-8 border border-[#FFD700]/20">
              <h2 className="text-2xl font-serif text-[#FFD700] font-bold mb-6">
                🔮 Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                <div className="border-b border-[#FFD700]/20 pb-3">
                  <h3 className="text-[#C0C0C0] font-medium mb-2">
                    How accurate are the birth chart readings?
                  </h3>
                  <p className="text-[#C0C0C0]/80 text-sm">
                    Our AI-powered readings combine traditional astrology with modern insights for comprehensive interpretations.
                  </p>
                </div>
                
                <div className="border-b border-[#FFD700]/20 pb-3">
                  <h3 className="text-[#C0C0C0] font-medium mb-2">
                    Can I get a refund for my membership?
                  </h3>
                  <p className="text-[#C0C0C0]/80 text-sm">
                    We offer a 30-day money-back guarantee for all Celestial Gold memberships.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-[#C0C0C0] font-medium mb-2">
                    Do you offer personal consultations?
                  </h3>
                  <p className="text-[#C0C0C0]/80 text-sm">
                    Yes! Celestial Gold members have access to monthly personal consultations with our astrologers.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-gradient-to-br from-[#232946] to-[#0a0a23] rounded-2xl p-8 border border-[#FFD700]/20">
              <h2 className="text-2xl font-serif text-[#FFD700] font-bold mb-6">
                🌟 Follow Our Journey
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <a href="#" className="flex items-center gap-3 p-3 bg-[#191970]/40 rounded-lg hover:bg-[#191970]/60 transition-colors border border-[#FFD700]/20">
                  <span className="text-2xl">📱</span>
                  <span className="text-[#C0C0C0]">Instagram</span>
                </a>
                
                <a href="#" className="flex items-center gap-3 p-3 bg-[#191970]/40 rounded-lg hover:bg-[#191970]/60 transition-colors border border-[#FFD700]/20">
                  <span className="text-2xl">🐦</span>
                  <span className="text-[#C0C0C0]">Twitter</span>
                </a>
                
                <a href="#" className="flex items-center gap-3 p-3 bg-[#191970]/40 rounded-lg hover:bg-[#191970]/60 transition-colors border border-[#FFD700]/20">
                  <span className="text-2xl">📺</span>
                  <span className="text-[#C0C0C0]">YouTube</span>
                </a>
                
                <a href="#" className="flex items-center gap-3 p-3 bg-[#191970]/40 rounded-lg hover:bg-[#191970]/60 transition-colors border border-[#FFD700]/20">
                  <span className="text-2xl">📧</span>
                  <span className="text-[#C0C0C0]">Newsletter</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 