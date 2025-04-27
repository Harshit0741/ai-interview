'use client';
import React from 'react';
import { Home, ArrowRight, CheckCircle, Rocket, Clock } from 'lucide-react';

const InterviewComplete = () => {
  return (
    <div className="bg-[#0B1120] text-white font-sans antialiased flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col items-center justify-center space-y-10 py-20 px-4">
        
        {/* Success Icon */}
        <div className="bg-green-600 p-4 rounded-full shadow-lg">
          <CheckCircle className="h-12 w-12 text-white" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-center">Interview Complete!</h1>
        <p className="text-lg text-gray-300 text-center max-w-xl">
          Thank you for participating in the AI-driven interview with Alcruiter.
        </p>

        {/* Image */}
        <img
          src="https://i.imgur.com/g5B0C9N.png"
          alt="Interview Illustration"
          className="rounded-xl shadow-lg w-full max-w-3xl h-auto object-cover"
        />

        {/* Next Steps */}
        <div className="bg-[#1E293B] rounded-xl p-8 shadow-md w-full max-w-xl space-y-6">
          <div className="flex justify-center">
            <div className="bg-[#334155] p-3 rounded-full">
              <Rocket className="text-blue-400 h-6 w-6" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-center">What's Next?</h2>
          <p className="text-gray-300 text-center">
            The recruiter will review your interview responses and contact you soon regarding the next steps.
          </p>
          <p className="text-gray-400 text-sm text-center flex items-center justify-center gap-2">
            <Clock className="h-4 w-4" />
            Response within 2-3 business days
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-[#334155] text-gray-300 hover:text-white rounded-lg py-3 px-6 flex items-center gap-2 transition-all duration-300">
            <Home className="h-5 w-5" />
            Return to Homepage
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 px-6 flex items-center gap-2 transition-all duration-300">
            View Other Opportunities
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1E293B] text-gray-400 text-center py-4">
        &copy; 2023 Alcruiter. All rights reserved.
      </footer>
    </div>
  );
};

export default InterviewComplete;
