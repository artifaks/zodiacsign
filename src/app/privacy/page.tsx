import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#191970] via-[#232946] to-[#0a0a23] pt-32 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-serif text-[#FFD700] font-bold mb-8 text-center">🔒 Privacy Policy</h1>
        <div className="bg-[#232946]/50 backdrop-blur-sm rounded-lg p-8 text-[#C0C0C0]">
          <p>Your privacy is important to us. This policy explains how we collect and use your information.</p>
        </div>
      </div>
    </div>
  );
}
