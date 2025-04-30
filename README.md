
# 🧠 AI Interview Platform

An intelligent and fully responsive AI-powered interview application built with **Next.js**, leveraging the power of **Google Gemini**, **Vapi**, **Supabase**, and **ShadCN UI**. This platform simulates real interview scenarios, rates your performance, and provides actionable feedback — all with voice interaction and AI-driven personalization.

---

## 🔗 Live Demo

[🚀 Try It Live](https://ai-interview-three-olive.vercel.app/)

---

## ✨ Features

- 🎤 **Voice-Driven Interviews** – Powered by **Vapi**, users can interact with a voice agent in real-time.
- 🧠 **AI-Generated Questions & Answers** – Uses **Google Gemini API** to dynamically generate role-specific questions and model answers.
- 📄 **Resume Parsing** – Upload your resume and let the app generate tailored questions and eligibility insights.
- 🗣️ **Answer Feedback & Scoring** – AI rates your answers and suggests improvements.
- ✅ **Role Eligibility Checker** – Evaluates your resume and interview performance to tell if you're fit for a selected job.
- 🔐 **Authentication & Database** – Managed via **Supabase**, storing user sessions, interview history, and feedback.
- 💅 **Modern UI/UX** – Built using **ShadCN UI** components and Tailwind CSS for a clean, accessible experience.
- 📱 **Responsive Design** – Seamlessly works across mobile, tablet, and desktop.

---

## 🧱 Tech Stack

| Technology        | Purpose                                  |
|-------------------|-------------------------------------------|
| **Next.js 14**    | React framework for frontend & routing    |
| **Supabase**      | Auth & Postgres database                  |
| **Vapi**          | Voice agent for real-time interaction     |
| **Google Gemini** | AI for Q&A, resume parsing, and scoring   |
| **ShadCN UI**     | Modern and accessible UI components       |
| **Tailwind CSS**  | Utility-first styling framework           |

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/ai-interview-app.git
cd ai-interview-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root and add:

```env
OPENAI_API_KEY=your_supabase_url
NEXT_PUBLIC_HOST_URL=your_supabase_anon_key
NEXT_PUBLIC_BASIC_URL=your_vapi_key
NEXT_PUBLIC_VAPI_API=your_gemini_api_key
```

### 4. Run the app locally
```bash
npm run dev
```

---

## ✅ Future Improvements

- 🎥 Video-based interview simulation  
- 🌐 Multi-language support  
- 📊 HR dashboard to review candidate insights  
- 🔗 LinkedIn or job board integration  

---

