import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { interviewTypes } from '@/services/constants'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
  

function FormContainer({onHandleInputChange, GoToNext}) {
    const [interviewType,setInterviewType] = useState([]);

    useEffect(()=>{
        if(interviewType) {
            onHandleInputChange('type',interviewType)
        }
    },[interviewType])

    const AddInterviewType = (type) => {
        const data = interviewType.includes(type);
        if(!data) {
            setInterviewType(prev => [...prev,type])
        }else{
            const result = interviewType.filter(item => item != type);
            setInterviewType(result);
        }
    }
  return (
    <div className='p-5 bg-white rounded-xl shadow-md'>
        <div>
            <h2 className='text-sm font-semibold'>Job Position</h2>
            <Input placeholder='eg. Full Stack Developer' className='mt-2' onChange={(event)=>onHandleInputChange('jobPosition',event.target.value)}/>
        </div>
        <div className='mt-5'>
            <h2 className='text-sm font-semibold'>Job Description</h2>
            <Textarea placeholder='Enter details job description' className='mt-2 h-[200px]' onChange={(event)=>onHandleInputChange('jobDescription',event.target.value)}/>
        </div>
        <div className='mt-5'>
            <h2 className='text-sm font-semibold'>Interview Duration</h2>
            <Select onValueChange={(value)=>onHandleInputChange('duration',value)}>
                <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Select Duration" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="5 Min">5 Min</SelectItem>
                    <SelectItem value="15 Min">15 Min</SelectItem>
                    <SelectItem value="30 Min">30 Min</SelectItem>
                    <SelectItem value="45 Min">45 Min</SelectItem>
                    <SelectItem value="60 Min">60 Min</SelectItem>
                </SelectContent>`
            </Select>
        <div className='mt-5'>
            <h2 className='text-sm font-semibold'>Interview Type</h2>
            <div className='flex flex-wrap gap-3 mt-2'>
                {interviewTypes.map((type, index) => (
                    <div key={index} className={`flex items-center gap-2 p-1 bg-white cursor-pointer border border-gray-300 px-2 rounded-2xl hover:bg-secondary ${interviewType.includes(type.title) && 'bg-blue-100 text-primary'}`} onClick={()=>AddInterviewType(type.title)}>
                        <type.icon className='text-2xl text-gray-500 h-4 w-4' />
                        <span className='text-sm font-semibold'>{type.title}</span>
                    </div>
                ))}
            </div>
        </div>
        <div className='mt-7 flex justify-end' onClick={()=>GoToNext()}>
            <Button className="cursor-pointer">
                Generate Question <ArrowRight/>
            </Button>
        </div> 

        </div>
    </div>
  )
}

export default FormContainer