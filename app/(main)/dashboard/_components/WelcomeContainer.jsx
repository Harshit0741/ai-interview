"use client"
import { useUser } from '@/app/provider';
import { Button } from '@/components/ui/button';
import { useCredits } from '@/context/CreditsContext';
import { Bell, Coins, CoinsIcon, ConeIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

function WelcomeContainer() {
    const {user} = useUser();
    const router = useRouter();
    const {credits} = useCredits()
    console.log("credits:",credits);
    
  return (
    <div className='bg-white p-5 rounded-xl flex justify-between items-center shadow-md'>
        <div>
            <h2 className='text-lg font-bold'>Welcome Back {user?.name}</h2>
            <h2 className='text-gray-500'>AI-Driven Interviews, Hassel Free Hiring</h2>
            <Button variant={'outline'} onClick={()=>router.push('/billing')}>
              <CoinsIcon className="h-6 w-6 text-yellow-400" />
              <span>Credits: {credits}</span>
            </Button>
        </div>
        {user&&<Image src={user?.picture} alt="user" width={40} height={40} className='rounded-full mt-1' />}
    </div>
  )
}

export default WelcomeContainer