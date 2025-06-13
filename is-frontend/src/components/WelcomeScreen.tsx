import React from 'react';
import { Activity } from 'lucide-react';

const WelcomeScreen: React.FC = () => {
  
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
          I'm your Sales & Marketing assistant, ready to help with sales & marketing questions and guidance.
        </p>
      </div>

    </div>
  );
};

export default WelcomeScreen;