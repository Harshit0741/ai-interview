'use client'
import { useUser } from '@/app/provider'
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient'
import { Camera, Plus, Video } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import InterviewCard from './InterviewCard'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

function LatestInterviewsList() {
    const [interviewList, setInterviewList] = useState([]);
    const {user} = useUser();
    const router = useRouter();

    useEffect(()=>{
      user&&GetInterviewList();
    },[user])

    const GetInterviewList = async () => {
      let { data: Interviews, error } = await supabase
        .from('Interviews')
        .select('*')
        .eq('userEmail',user?.email)
        .order('id',{ascending:false})
        .limit(6)
      
       console.log(Interviews);
       setInterviewList(Interviews);
        
    }

  return (
    <div className='my-5'>
        <h2 className='font-bold text-2xl'>Previously Created Interviews</h2>
        <div className='bg-white border border-gray-200 rounded-lg p-5 shadow-md mt-3'>
           {interviewList?.length == 0 && 
                <div className='p-5 flex flex-col gap-3 items-center'>
                    <Video className='h-10 w-10 text-primary'/>
                    <h2>You don't have any interview created</h2>
                    <Button className='cursor-pointer' onClick={()=>router.push('/dashboard/create-interview')}><Plus/> Create New Interview</Button>
                </div>
            }
            {interviewList&&
                <div className='grid  grid-cols-1 sm:grid-cols-2  gap-5'>
                  {interviewList.map((interview,index)=>(
                    <InterviewCard interview={interview} key={index}/>
                  ))}
                </div>

            }
        </div>
    </div>
  )
}

export default LatestInterviewsList