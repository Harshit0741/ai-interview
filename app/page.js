
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  ChartColumn,
  Clock,
  MoveRight,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-secondary text-gray-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          <Image
            src="/cus.svg"
            alt="cus"
            width={200}
            height={300}
            className="w-[140px]"
          />

          <nav className="hidden items-center gap-8 md:flex">
            <h2 className="cursor-pointer text-sm font-medium text-gray-600 transition-colors hover:text-primary">
              Features
            </h2>
            <h2 className="cursor-pointer text-sm font-medium text-gray-600 transition-colors hover:text-primary">
              How It Works
            </h2>
            <h2 className="cursor-pointer text-sm font-medium text-gray-600 transition-colors hover:text-primary">
              Pricing
            </h2>
          </nav>

          <Button
            className="cursor-pointer rounded-lg px-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            onClick={() => router.push('/auth')}
          >
            Dashboard
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute -right-32 top-20 h-72 w-72 rounded-full bg-blue-100/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-primary shadow-sm">
              <Sparkles className="h-4 w-4" />
              AI-Powered Recruitment
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl md:leading-[1.1]">
              AI-Powered{' '}
              <span className="text-primary">
                Interview Assistant
              </span>{' '}
              for Modern Recruiters
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg">
              Let our AI voice agent conduct candidate interviews while you
              focus on finding the perfect match. Save time, reduce bias, and
              improve your hiring process.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 min-[400px]:flex-row">
              <Button
                onClick={() => router.push('/auth')}
                className="h-12 cursor-pointer rounded-lg px-7 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Create Interview
                <MoveRight className="ml-1 h-5 w-5" />
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                AI-powered screening
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Voice interviews
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Instant insights
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Why AiCruiter
            </span>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Streamline Your Hiring Process
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-500 md:text-lg">
              AiCruiter helps you save time and find better candidates with
              our advanced AI interview technology.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            <div className="group rounded-2xl border border-gray-100 bg-white p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <Clock className="h-7 w-7" />
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                Save Time
              </h3>

              <p className="mt-3 leading-6 text-gray-500">
                Automate initial screening interviews and focus on final
                candidates.
              </p>
            </div>

            <div className="group rounded-2xl border border-gray-100 bg-white p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <ChartColumn className="h-7 w-7" />
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                Data Insights
              </h3>

              <p className="mt-3 leading-6 text-gray-500">
                Get detailed analytics and candidate comparisons based on
                interview responses.
              </p>
            </div>

            <div className="group rounded-2xl border border-gray-100 bg-white p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <Users className="h-7 w-7" />
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                Reduce Bias
              </h3>

              <p className="mt-3 leading-6 text-gray-500">
                Standardized interviews help eliminate unconscious bias in the
                hiring process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Simple Process
            </span>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              How AiCruiter Works
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-500 md:text-lg">
              Three simple steps to transform your recruitment process.
            </p>
          </div>

          <div className="relative mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            <div className="relative rounded-2xl border border-gray-100 bg-white p-7 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-primary">
                <span className="text-xl font-bold">1</span>
              </div>

              <h3 className="mt-5 text-xl font-bold">Create Interview</h3>

              <p className="mt-3 leading-6 text-gray-500">
                Set up your job requirements and customize interview
                questions.
              </p>

              <div className="mt-5 flex items-center justify-center gap-1 text-sm font-medium text-primary">
                Start here <ArrowRight className="h-4 w-4" />
              </div>
            </div>

            <div className="relative rounded-2xl border border-gray-100 bg-white p-7 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-primary">
                <span className="text-xl font-bold">2</span>
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Share Interviews
              </h3>

              <p className="mt-3 leading-6 text-gray-500">
                Send interview links to candidates to complete at their
                convenience.
              </p>

              <div className="mt-5 flex items-center justify-center gap-1 text-sm font-medium text-primary">
                Share easily <ArrowRight className="h-4 w-4" />
              </div>
            </div>

            <div className="relative rounded-2xl border border-gray-100 bg-white p-7 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-primary">
                <span className="text-xl font-bold">3</span>
              </div>

              <h3 className="mt-5 text-xl font-bold">Review Results</h3>

              <p className="mt-3 leading-6 text-gray-500">
                Review candidate responses and use AI-powered insights to
                make better hiring decisions.
              </p>

              <div className="mt-5 flex items-center justify-center gap-1 text-sm font-medium text-primary">
                Make decisions <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
          <div className="rounded-3xl border border-blue-100 bg-gradient-to-b from-blue-50 to-white px-6 py-14 shadow-sm md:px-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-primary shadow-sm">
              <Sparkles className="h-4 w-4" />
              Start hiring smarter
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Ready to Transform Your Hiring Process?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-500 md:text-lg">
              Join hundreds of companies already using AiCruiter to find the
              best talent.
            </p>

            <Button
              onClick={() => router.push('/auth')}
              className="mt-8 h-12 cursor-pointer rounded-lg px-7 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Get Started for Free
              <MoveRight className="ml-1 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-8 md:py-10">
          <Image
            src="/cus.svg"
            alt="cus"
            width={200}
            height={300}
            className="w-[140px]"
          />

          <div className="flex flex-wrap gap-5">
            <Link
              className="text-sm text-gray-500 transition-colors hover:text-primary hover:underline"
              href="#"
            >
              Terms
            </Link>

            <Link
              className="text-sm text-gray-500 transition-colors hover:text-primary hover:underline"
              href="#"
            >
              Privacy
            </Link>

            <Link
              className="text-sm text-gray-500 transition-colors hover:text-primary hover:underline"
              href="#"
            >
              Contact
            </Link>
          </div>

          <div className="text-sm text-gray-500">
            © 2025 Ai-Interview. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
