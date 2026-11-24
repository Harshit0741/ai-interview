
'use client'

import { Video, ArrowUpRight, Sparkles, Users, Clock } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function CreateOptions() {
  return (
    <div className="w-full">
      <Link
        href="/dashboard/create-interview"
        className="group relative flex w-full flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl sm:p-8"
      >
        {/* Background decoration */}
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-blue-50 opacity-70 blur-3xl transition-all duration-300 group-hover:bg-blue-100" />

        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
              <Video size={27} />
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-all group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white">
              <ArrowUpRight size={20} />
            </div>
          </div>

          <div className="mt-7">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles size={15} className="text-blue-600" />
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                AI Powered
              </span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Create New Interview
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
              Create customized AI-powered interviews based on job roles and
              descriptions. Generate relevant questions and evaluate candidates
              with ease.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="relative z-10 mt-8 flex flex-wrap gap-3 border-t border-gray-100 pt-5">
          <span className="flex items-center gap-2 rounded-full bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600">
            <Users size={14} className="text-blue-600" />
            Candidate Screening
          </span>

          <span className="flex items-center gap-2 rounded-full bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600">
            <Clock size={14} className="text-blue-600" />
            Custom Duration
          </span>

          <span className="flex items-center gap-2 rounded-full bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600">
            <Sparkles size={14} className="text-blue-600" />
            AI Generated Questions
          </span>
        </div>
      </Link>
    </div>
  )
}

export default CreateOptions
