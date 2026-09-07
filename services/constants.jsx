import { BriefcaseBusinessIcon, Calendar, Code2Icon, LayoutDashboard, List, Puzzle, Settings, User2Icon, WalletCards } from "lucide-react";

export const sideBarOptions = [
    {
        name: "Dashboard",
        icon:LayoutDashboard,
        path: "/dashboard",
    },
    // {
    //     name: "Scheduling Interview",
    //     icon:Calendar,
    //     path: "/schedule-interview",
    // },
    {
        name: "All Interview",
        icon:List,
        path: "/all-interview",
    },
    {
        name: "Billing",
        icon:WalletCards,
        path: "/billing",
    },
    {
        name: "Settings",
        icon:Settings,
        path: "",
        dropdown: [
            { name: 'Profile Settings', path: '/settings/profile' },
            { name: 'Account Settings', path: '/settings/account' },
            { name: 'Privacy Settings', path: '/settings/privacy' },
        ],
    },
]

export const interviewTypes = [
    {
        title:'Technical',
        icon:Code2Icon,
    },
    {
        title:'Behavioral',
        icon:User2Icon,
    },
    {
        title:'Experience',
        icon:BriefcaseBusinessIcon,
    },
    {
        title:'Problem Solving',
        icon:Puzzle,
    },
    // {
    //     title:'Leadership',
    //     icon:leader,
    // },
]

export const QUESTION_PROMPT = `
You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions:

Job Title: {{jobTitle}}

Job Description: {{jobDescription}}

Interview Duration: {{duration}}

Interview Type: {{type}}

📝 Your task:

- Analyze the job description to identify key responsibilities, required skills, and expected experience.
- Generate a list of interview questions based on the interview duration.
- Adjust the number and depth of questions to match the interview duration.
- Ensure the questions match the tone and structure of a real-life {{type}} interview.

🧩 Output Requirements:
Respond ONLY in VALID JSON.
Use DOUBLE QUOTES for all keys and string values.
NO markdown, NO backticks, NO comments.

📌 Output Format EXACTLY like this:

{
  "interviewQuestions": [
    {
      "question": "",
      "type": "Technical | Behavioral | Experience | Problem Solving"
    }
  ]
}

🎯 The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.
`


export const FEEDBACK_PROMPT = `{{conversation}}

You are evaluating the above Interview Conversation between an assistant (interviewer) and a user (candidate).

Before scoring, first check: does this conversation contain actual interview substance — i.e., did the assistant ask at least one real interview/technical/behavioral question AND did the user give a substantive answer (not just a greeting, small talk, or a single short message)?

- If NO (e.g. the conversation is just a greeting like "hi", is empty, or has no real Q&A exchange), do NOT invent a rating. Respond with this exact JSON shape instead:
{
  "feedback": {
    "insufficientData": true,
    "message": "<one line explaining there isn't enough interview content to generate feedback>"
  }
}

- If YES, evaluate normally and respond in this JSON format:
{
  "feedback": {
    "insufficientData": false,
    "rating": {
      "technicalSkills": <number 1-10>,
      "communication": <number 1-10>,
      "problemSolving": <number 1-10>,
      "experience": <number 1-10>,
      "totalRating": <number 1-10>
    },
    "summary": "<3 line summary of the interview>",
    "recommendation": "<'Recommended' or 'Not Recommended'>",
    "recommendationMsg": "<one line explaining the recommendation>"
  }
}

Base every rating strictly on evidence actually present in the conversation. Do not assume skills, experience, or competence that weren't demonstrated. If the conversation is too short to judge a specific category fairly, reflect that with a lower score and note it in the summary rather than defaulting to a high score.

Respond with valid JSON only — no extra text, no markdown code fences.`;




    
