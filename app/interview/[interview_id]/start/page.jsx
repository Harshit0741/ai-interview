"use client";

import { InterviewDataContext } from '@/context/InterviewDataContext';
import { Mic, Phone, Timer } from 'lucide-react';
import Image from 'next/image';
import React, { useContext } from 'react';

function StartInterview() {
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);

  return (
    <div className='p-20 lg:px-48 xl:px-56'>
      <div className='flex justify-between items-center'>
        <h2 className='font-bold text-xl'>AI Interview Session</h2>
        <span className='flex gap-2 items-center'>
          <Timer /> 00:00:00
        </span>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
        <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center shadow-md'>
          <Image src='/ai.svg' alt='ai' width={100} height={100} className='w-[60px] h-[60px] rounded-full object-cover' />
          <h2>AI Recruiter</h2>
        </div>
        <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center shadow-md'>
          <h2 className='text-2xl bg-primary text-white p-3 rounded-full px-6'>
            {interviewInfo?.userName?.[0]}
          </h2>
          <h2>{interviewInfo?.userName}</h2>
        </div>
      </div>

      <div className='flex items-center gap-5 mt-7 justify-center'>
        <Mic className='h-12 w-12 p-3 bg-gray-500 rounded-full text-white shadow-md cursor-pointer' />
        <Phone className='h-12 w-12 p-3 bg-red-500 rounded-full text-white shadow-md cursor-pointer' />
      </div>
      <h2 className='text-sm text-gray-400 text-center mt-5'>Interview In Progress...</h2>
    </div>
  );
}

export default StartInterview;
