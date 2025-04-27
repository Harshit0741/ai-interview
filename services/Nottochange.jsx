// "use client";

// import { InterviewDataContext } from '@/context/InterviewDataContext';
// import { Mic, Phone, Timer } from 'lucide-react';
// import Image from 'next/image';
// import React, { useContext, useEffect, useRef, useState } from 'react';
// import Vapi from '@vapi-ai/web';
// import AlertConfirmation from './_components/AlertConfirmation';
// import { toast } from 'sonner';
// import axios from 'axios';
// import { supabase } from '@/services/supabaseClient';
// import { useParams, useRouter } from 'next/navigation';

// function StartInterview() {
//   const { interviewInfo } = useContext(InterviewDataContext);
//   const [activeUser, setActiveUser] = useState(false);
//   const [time, setTime] = useState(0);
//   const [conversation, setConversation] = useState([]); // Initialize as array
//   const { interview_id } = useParams();
//   const router = useRouter();
//   const vapiRef = useRef(null);

//   useEffect(() => {
//     if (!vapiRef.current) {
//       vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_API);
//     }
//   }, []);

//   useEffect(() => {
//     let interval;
//     if (interviewInfo) {
//       interval = setInterval(() => {
//         setTime((prev) => prev + 1);
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [interviewInfo]);

//   useEffect(() => {
//     interviewInfo&&startCall();
//   }, [interviewInfo]);

//   const formatTime = (seconds) => {
//     const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
//     const secs = String(seconds % 60).padStart(2, '0');
//     return `${mins}:${secs}`;
//   };

//   const startCall = () => {
//     let questionList;
//     interviewInfo?.interviewData.forEach((item,indedx) => {
//       questionList=item?.question+","+questionList
//   });

//     const assistantOptions = {
//       name: "AI Recruiter",
//       firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.interviewDesc}?`,
//       transcriber: {
//         provider: "deepgram",
//         model: "nova-2",
//         language: "en-US",
//       },
//       voice: {
//         provider: "playht",
//         voiceId: "jennifer",
//       },
//       model: {
//         provider: "openai",
//         model: "gpt-4",
//         messages: [
//           {
//             role: "system",
//             content: `
//               You are an AI voice assistant conducting interviews.
//               Your job is to ask candidates provided interview questions, assess their responses.
//               Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
//               "Hey there! Welcome to your ${interviewInfo?.interviewDesc} interview. Let’s get started with a few questions!"
//               Ask one question at a time and wait for the candidate’s response before proceeding. Keep the questions clear and concise. Below are the questions. Ask one by one:
//               Questions: ${questionList}
//               If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
//               "Need a hint? Think about how React tracks component updates!"
//               Provide brief, encouraging feedback after each answer. Example:
//               "Nice! That’s a solid answer."
//               "Hmm, not quite! Want to try again?"
//               Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let’s tackle a tricky one!"
//               After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
//               "That was great! You handled some tough questions well. Keep sharpening your skills!"
//               End on a positive note:
//               "Thanks for chatting! Hope to see you crushing projects soon!"
//               Key Guidelines:
//               ✅ Be friendly, engaging, and witty 🎤
//               ✅ Keep responses short and natural, like a real conversation
//               ✅ Adapt based on the candidate’s confidence level
//               ✅ Ensure the interview remains focused on React
//             `.trim(),
//           },
//         ],
//       },
//     };

//     console.log("Starting call with options: ", assistantOptions);
//     vapiRef.current.start(assistantOptions);
//   };

//   const stopInterview = () => {
//     console.log("Stopping call...");
//     vapiRef.current.stop();
//     vapiRef.current.once("call-end", () => {
//       console.log("Call has ended, now redirecting...");
//       router.replace(`/interview/${interview_id}/completed`);
//     });
//   };

//   useEffect(() => {
//     const handleMessage = (message) => {
//       console.log("Received message: ", message?.conversation);
//       setConversation(message?.conversation)
//     };

//     const handleCallStart = () => toast("Call Connected...");
//     const handleSpeechStart = () => setActiveUser(false);
//     const handleSpeechEnd = () => setActiveUser(true);
//     const handleCallEnd = () => {
//       toast('Interview Ended!!');
//       GenerateFeedback();
//     };

//     vapiRef.current.on("message", handleMessage);
//     vapiRef.current.on("call-start", handleCallStart);
//     vapiRef.current.on("speech-start", handleSpeechStart);
//     vapiRef.current.on("speech-end", handleSpeechEnd);
//     vapiRef.current.on("call-end", handleCallEnd);

//     return () => {
//       vapiRef.current.off("message", handleMessage);
//       vapiRef.current.off("call-start", handleCallStart);
//       vapiRef.current.off("speech-start", handleSpeechStart);
//       vapiRef.current.off("speech-end", handleSpeechEnd);
//       vapiRef.current.off("call-end", handleCallEnd);
//     };
//   }, []);

//   const GenerateFeedback = async () => {
//     const result = await axios.post('/api/ai-feedback', {
//       conversation:conversation
//     })
//     console.log(result?.data);
//     const Content = result?.data?.content
//     const FINAL_CONTENT = Content.replace('```json', '').replace('```', '')
//     console.log(FINAL_CONTENT);
//     const FINAL = JSON.parse(FINAL_CONTENT)

//     const { data, error } = await supabase
//     .from('interview-feedback')
//     .insert([
//       { 
//         userName: interviewInfo?.userName,
//         userEmail: interviewInfo?.userEmail,
//         interview_id: interview_id,
//         feedback: FINAL,
//         recommended: false

//       },
//     ])
//     .select()
//     console.log(data);    
    
//   };

//   return (
//     <div className='p-20 lg:px-48 xl:px-56'>
//       <div className='flex justify-between items-center'>
//         <h2 className='font-bold text-xl'>AI Interview Session</h2>
//         <span className='flex gap-2 items-center'>
//           <Timer /> {formatTime(time)}
//         </span>
//       </div>

//       <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
//         <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center shadow-md'>
//           <div className='relative'>
//             {!activeUser && <span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping' />}
//             <Image src='/ai.svg' alt='ai' width={100} height={100} className='w-[60px] h-[60px] rounded-full object-cover' />
//           </div>
//           <h2>AI Recruiter</h2>
//         </div>
//         <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center shadow-md'>
//           <div className='relative'>
//             {activeUser && <span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping' />}
//             <h2 className='text-2xl bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center'>
//               {interviewInfo?.userName?.[0]}
//             </h2>
//           </div>
//           <h2>{interviewInfo?.userName}</h2>
//         </div>
//       </div>

//       <div className='flex items-center gap-5 mt-7 justify-center'>
//         <Mic className='h-12 w-12 p-3 bg-gray-500 rounded-full text-white shadow-md cursor-pointer' />
//         <AlertConfirmation stopInterview={stopInterview}>
//           <Phone className='h-12 w-12 p-3 bg-red-500 rounded-full text-white shadow-md cursor-pointer' />
//         </AlertConfirmation>
//       </div>
//       <h2 className='text-sm text-gray-400 text-center mt-5'>Interview In Progress...</h2>
//     </div>
//   );
// }

// export default StartInterview;


// import { FEEDBACK_PROMPT } from "@/services/constants";
// import { NextResponse } from "next/server";
// import OpenAI from "openai";

// export async function POST(req) {
//     const {conversation} = await req.json();
//     const FEEDBACK = FEEDBACK_PROMPT.replace('{{conversation}}',JSON.stringify(conversation))

//     try{
//         const openai = new OpenAI({
//             baseURL: "https://openrouter.ai/api/v1",
//             apiKey: process.env.OPENAI_API_KEY,
    
//         })
    
//         const completion = await openai.chat.completions.create({
//             model: "openai/gpt-3.5-turbo",
//                 messages: [
//                     { role: "user", content: FEEDBACK },
//                 ],
//         })
//         console.log(completion.choices[0].message)
//         return NextResponse.json(completion.choices[0].message);
    
//         }catch(err){
//             console.log(err);
//             return NextResponse.json(err);
//         }
// }