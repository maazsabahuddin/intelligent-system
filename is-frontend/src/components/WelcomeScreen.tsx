import React from 'react';
import { Activity } from 'lucide-react';

const WelcomeScreen: React.FC = () => {
  const suggestions = [
    "What are the symptoms of diabetes?",
    "How can I improve my sleep quality?",
    "What should I do for a minor cut?",
    "Explain different types of headaches"
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="bg-primary-500 text-white p-4 rounded-full">
            <Activity className="h-8 w-8" />
          </div>
        </div>
        <h1 className="text-4xl font-semibold text-neutral-800 mb-4">
          Where should we begin?
        </h1>
        <p className="text-lg text-neutral-600 max-w-2xl">
          I'm your healthcare assistant, ready to help with medical questions, health advice, and wellness guidance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            className="p-4 text-left border border-neutral-200 rounded-xl hover:border-neutral-300 hover:bg-neutral-50 transition-all duration-200 group"
          >
            <div className="text-neutral-700 group-hover:text-neutral-900">
              {suggestion}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WelcomeScreen;