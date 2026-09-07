import { FEEDBACK_PROMPT } from "@/services/constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

function hasEnoughContent(conversation) {
    if (!Array.isArray(conversation)) return false;
    const userMessages = conversation.filter((m) => m.role === "user");
    const totalChars = userMessages.reduce(
        (sum, m) => sum + (m.content?.length || 0),
        0
    );
    return userMessages.length >= 2 && totalChars >= 100;
}

export async function POST(req) {
    const {conversation} = await req.json();

        if (!conversation || conversation.length === 0) {
        return NextResponse.json({ error: "No conversation provided" }, { status: 400 });
    }

    if (!hasEnoughContent(conversation)) {
        return NextResponse.json({
            content: JSON.stringify({
                feedback: {
                    insufficientData: true,
                    message: "Not enough interview content was exchanged to generate feedback."
                }
            })
        });
    }

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
                max_tokens: 1000
        })
        console.log(completion.choices[0].message)
        return NextResponse.json(completion.choices[0].message);
    
    } catch (err) {
        console.error("AI FEEDBACK ERROR:", err?.status, err?.message, err?.error);
        return NextResponse.json(
            { error: err?.error?.message || err?.message || "Unknown error generating feedback" },
            { status: err?.status || 500 }
        );
    }
}