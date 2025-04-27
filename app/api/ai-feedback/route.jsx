import { FEEDBACK_PROMPT } from "@/services/constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
    const {conversation} = await req.json();
    const FEEDBACK = FEEDBACK_PROMPT.replace('{{conversation}}',JSON.stringify(conversation))

    try{
        const openai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.OPENAI_API_KEY,
    
        })
    
        const completion = await openai.chat.completions.create({
            model: "openai/gpt-3.5-turbo",
                messages: [
                    { role: "user", content: FEEDBACK },
                ],
        })
        console.log(completion.choices[0].message)
        return NextResponse.json(completion.choices[0].message);
    
        }catch(err){
            console.log(err);
            return NextResponse.json(err);
        }
}