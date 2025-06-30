"use client";

import React from "react";
import Link from 'next/link';

const products = [
  {
    name: 'Moon Phase Crystal Set',
    price: '$29.99',
    link: '#',
    image: '/images/crystals.png',
  },
  {
    name: 'Sacred Ritual Oils',
    price: '$24.99',
    link: '#',
    image: '/images/oils.png',
  },
  {
    name: 'Lunar Journal',
    price: '$19.99',
    link: '#',
    image: '/images/journal.png',
  },
];

export default function AffiliateProducts() {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-center text-white mb-4">🛍️ Shop This Energy</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((item) => (
          <div
            key={item.name}
            className="bg-[#0a0a23] text-white p-4 rounded-xl shadow-md text-center"
          >
            <div className="h-24 mx-auto mb-2 flex items-center justify-center text-4xl">
              {item.name.includes('Crystal') ? '🔮' : 
               item.name.includes('Oils') ? '🧴' : '📓'}
            </div>
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-yellow-300 mb-2">{item.price}</p>
            <a
              href={item.link}
              className="bg-yellow-400 px-4 py-1 rounded text-sm font-medium text-black hover:bg-yellow-300 transition-colors"
            >
              Shop This Energy
            </a>
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-gray-400 mt-2">
        Curated products to enhance your spiritual practice
      </p>
    </div>
  );
} 