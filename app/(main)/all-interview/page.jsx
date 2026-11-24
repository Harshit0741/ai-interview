
'use client'
import { useUser } from '@/app/provider'
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient'
import { Plus, Video } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import InterviewCard from '../dashboard/_components/InterviewCard'
import { useRouter } from 'next/navigation'

function AllInterview() {
  const [interviewList, setInterviewList] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    user && GetInterviewList();
  }, [user])

  const GetInterviewList = async () => {
    let { data: Interviews, error } = await supabase
      .from('Interviews')
      .select('*')
      .eq('userEmail', user?.email)
      .order('id', { ascending: false })

    console.log(Interviews);
    setInterviewList(Interviews);
  }

  return (
    <div className='my-8 w-full'>
      <div className='mb-4'>
        <h2 className='font-bold text-2xl tracking-tight text-gray-900'>
          All Previously Created Interviews
        </h2>
        <p className='text-sm text-gray-500 mt-1'>
          Manage and revisit all your previously created interviews.
        </p>
      </div>

      <div className='bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm'>

        {interviewList?.length === 0 &&
          <div className='py-12 flex flex-col gap-4 items-center text-center'>
            <div className='h-16 w-16 flex items-center justify-center rounded-2xl bg-blue-50 text-blue-600'>
              <Video className='h-8 w-8' />
            </div>

            <div>
              <h2 className='font-semibold text-lg text-gray-900'>
                No interviews yet
              </h2>
              <p className='text-sm text-gray-500 mt-1'>
                Start by creating your first AI-powered interview.
              </p>
            </div>

            <Button
              className='cursor-pointer rounded-xl mt-1'
              onClick={() => router.push('/dashboard/create-interview')}
            >
              <Plus className='mr-1 h-4 w-4' />
              Create New Interview
            </Button>
          </div>
        }

        {interviewList?.length > 0 &&
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
            {interviewList.map((interview, index) => (
              <div
                key={interview.id || index}
                className='group rounded-xl border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg'
              >
                <InterviewCard interview={interview} />
              </div>
            ))}
          </div>
        }

      </div>
    </div>
  )
}

export default AllInterview
