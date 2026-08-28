
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Home,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Sparkles,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const InterviewComplete = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/30 to-white text-primary font-sans antialiased flex flex-col">
      <main className="flex-grow flex flex-col items-center px-5 py-12 sm:px-8 sm:py-16">
        
        {/* Success Icon */}
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-green-400/20 blur-xl" />

          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600 shadow-lg shadow-green-200">
            <CheckCircle2 className="h-11 w-11 text-white" strokeWidth={2.2} />
          </div>
        </div>

        {/* Heading */}
        <div className="max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-100 bg-white px-4 py-2 text-sm font-medium text-purple-600 shadow-sm">
            <Sparkles className="h-4 w-4" />
            Interview Submitted Successfully
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Interview Complete!
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-gray-500 sm:text-lg">
            Thank you for participating in the AI-driven interview with{' '}
            <span className="font-semibold text-primary">AI-Interview</span>.
          </p>
        </div>

        {/* Illustration */}
        <div className="relative mt-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-white bg-white shadow-xl shadow-purple-100/50">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 via-transparent to-blue-100/20 pointer-events-none" />

          <Image
            src="/happyusers.svg"
            width={1000}
            height={500}
            alt="Interview completed"
            className="relative h-auto w-full object-cover"
          />
        </div>

        {/* What's Next Card */}
        <div className="relative mt-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-purple-100 bg-white p-7 shadow-lg shadow-purple-100/40 sm:p-9">
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-purple-100/40 blur-3xl" />

          <div className="relative">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-md shadow-blue-200">
              <ArrowRight className="h-7 w-7 text-white" />
            </div>

            <h2 className="mt-5 text-center text-2xl font-bold text-gray-900">
              What&apos;s Next?
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-center leading-7 text-gray-500">
              The recruiter will review your interview responses and contact
              you soon regarding the next steps.
            </p>

            <div className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full bg-gray-50 px-4 py-2 text-sm text-gray-500">
              <Clock3 className="h-4 w-4 text-purple-500" />
              Response within 2–3 business days
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-9 flex w-full max-w-2xl flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            variant="outline"
            className="h-12 cursor-pointer rounded-xl border-gray-200 bg-white px-6 text-gray-600 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50"
            onClick={() => router.push('/dashboard')}
          >
            <Home className="h-5 w-5" />
            <span>Return to Homepage</span>
          </Button>

          <Button
            className="h-12 cursor-pointer rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-6 text-white shadow-md shadow-purple-200 transition-all hover:scale-[1.02] hover:from-blue-600 hover:to-purple-700"
            onClick={() => router.push('/dashboard')}
          >
            <span>View Other Opportunities</span>
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white/80 py-5 text-center backdrop-blur-sm">
        <p className="text-sm text-gray-400">
          © 2025 Ai-Interview. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default InterviewComplete;

