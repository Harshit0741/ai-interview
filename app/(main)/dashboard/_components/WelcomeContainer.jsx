"use client"
import { useUser } from '@/app/provider';
import { Bell } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

function WelcomeContainer() {
    const {user} = useUser(); 
  return (
    <div className='bg-white p-5 rounded-xl flex justify-between items-center shadow-md'>
        <div>
            <h2 className='text-lg font-bold'>Welcome Back {user?.name}</h2>
            <h2 className='text-gray-500'>AI-Driven Interviews, Hassel Free Hiring</h2>
        </div>
        {user&&<Image src={user?.picture} alt="user" width={40} height={40} className='rounded-full mt-5' />}
    </div>
  )
}

export default WelcomeContainer