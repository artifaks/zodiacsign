"use client";

import React from "react";
import Link from 'next/link';
import { useState } from 'react';

const prompts = [
  'What do I need to forgive myself for?',
  'What am I growing toward right now?',
  'How can I invite more peace into my day?',
  'What is my body trying to tell me?',
  'Where in my life am I resisting change?',
];

export default function JournalPrompt() {
  const [prompt, setPrompt] = useState(prompts[0]);

  const newPrompt = () => {
    const next = prompts[Math.floor(Math.random() * prompts.length)];
    setPrompt(next);
  };

  return (
    <div className="bg-[#0a0a23] rounded-xl p-6 text-white shadow-md mt-8">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">📝 Journal Prompt</h2>
        <div className="space-x-2">
          <button
            onClick={newPrompt}
            className="text-sm bg-yellow-400 px-3 py-1 rounded"
          >
            New Prompt
          </button>
          <button className="text-sm bg-gray-700 px-3 py-1 rounded">💾 Save</button>
        </div>
      </div>
      <p className="text-lg italic">"{prompt}"</p>
      <p className="text-sm mt-2 text-yellow-300">
        Take a moment to reflect on your spiritual journey
      </p>
    </div>
  );
} 