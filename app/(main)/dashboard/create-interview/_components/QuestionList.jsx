import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Loader2, Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import QuestionListContainer from './QuestionListContainer';
import { supabase } from '@/services/supabaseClient';
import { useUser } from '@/app/provider';
import { v4 as uuidv4 } from 'uuid';

function QuestionList({formData,onCreateLink}) {

    const [loading,setLoading] = useState(true);
    const [questionList,setQuestionList] = useState();
    const {user} = useUser();
    const [saveLoading,setSaveLoading] = useState(false);

    useEffect(() => {
        if(formData) {
            GenerateQuestionList();
        }
    }, [formData])

    const onFinish = async () => {
        setSaveLoading(true);
        const interview_id = uuidv4();
        const { data, error } = await supabase
            .from('Interviews')
            .insert([
            { ...formData,
                questionList: questionList,
                userEmail: user?.email,
                interview_id: interview_id
             },
            ])
            .select()
            
        //Update user credits
            
        const userUpdate = await supabase
        .from('Users')
        .update({ credits:  Number(user?.credits)-1  })
        .eq('email', user?.email)
        .select()
        console.log(userUpdate);
        
        
            setSaveLoading(false);
            // console.log("Interview Created:", data);
            onCreateLink(interview_id);
              
    }

    const GenerateQuestionList = async () => {
        setLoading(true);
        try{
            const result = await axios.post('/api/ai-model', {
            ...formData
            })
            console.log("result:", result.data.content);
            const Content = result.data.content;
            const FINAL_CONTENT = Content.replace('"```json"','').replace('```','').replace(/\\n/g,'\n')
            setQuestionList(JSON.parse(FINAL_CONTENT)?.interviewQuestions);
            setLoading(false);
        }catch(err) {
            toast.error("Something went wrong")
            console.log("Error:", err);
            setLoading(false);
        }
    }

  return (
    <div>
        {loading&&
        <div className='p-5 bg-blue-50 rounded-xl border border-primary shadow-md flex items-center gap-5'>
           <Loader2Icon className='animate-spin' />
            <div>
                <h2 className='font-medium'>Generating Questions...</h2>
                <p className='text-primary'>Our AI is crafting personalised questions based on your job position</p>
            </div> 
          
        </div>}
        {questionList?.length>0&&
            <div>
                <QuestionListContainer questionList={questionList}/>
            </div>
        }
        <div className='flex justify-end mt-5'>
            <Button onClick={()=>onFinish()} className='cursor-pointer' disabled={saveLoading}>
                {saveLoading&&<Loader2 className='animate-spin'/>}Create Interview Link & Finish
            </Button>
        </div>
    </div>
  )
}

export default QuestionList