
"use client";

import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Mic, MicOff, Phone, Timer, Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import AlertConfirmation from "./_components/AlertConfirmation";
import { toast } from "sonner";
import axios from "axios";
import { supabase } from "@/services/supabaseClient";
import { useParams, useRouter } from "next/navigation";

function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContext);


  const [callStatus, setCallStatus] = useState("idle");

  const [activeUser, setActiveUser] = useState(null);

  const [isMuted, setIsMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [conversation, setConversation] = useState([]);
  const [vapiReady, setVapiReady] = useState(false);

  const { interview_id } = useParams();
  const router = useRouter();

  const vapiRef = useRef(null);
  const conversationRef = useRef([]);
  const feedbackGeneratedRef = useRef(false);
  const callStartedRef = useRef(false);

  /*
   * Initialize Vapi
   */
  useEffect(() => {
    if (vapiRef.current) return;

    const apiKey = process.env.NEXT_PUBLIC_VAPI_API;

    if (!apiKey) {
      console.error("NEXT_PUBLIC_VAPI_API is missing");
      toast.error("Vapi API key is missing");
      return;
    }

    try {
      vapiRef.current = new Vapi(apiKey);
      setVapiReady(true);
      console.log("Vapi initialized");
    } catch (error) {
      console.error("Failed to initialize Vapi:", error);
      toast.error("Failed to initialize interview");
    }
  }, []);

  /*
   * Keep conversation ref synchronized with state
   */
  useEffect(() => {
    conversationRef.current = conversation;
  }, [conversation]);

  /*
   * Timer — only runs while the call is actually connected.
   */
  useEffect(() => {
    if (callStatus !== "active") return;

    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [callStatus]);

  /*
   * Vapi event listeners — registered only once.
   */
  useEffect(() => {
    const vapi = vapiRef.current;
    if (!vapi) return;

    const handleMessage = (message) => {
      // console.log("Received Vapi message:", message);

      if (message?.type === "conversation-update") {
        const messages = message?.messages;
        if (Array.isArray(messages)) {
          conversationRef.current = messages;
          setConversation(messages);
        }
        return;
      }

      if (message?.type === "transcript") {
        // console.log(`${message?.role || "unknown"}:`, message?.transcript);
      }
    };

    const handleCallStart = () => {
      console.log("Vapi call started");
      setCallStatus("active");
      setActiveUser(true);
      toast.success("Call Connected...");
    };

    const handleSpeechStart = () => {
      setActiveUser(false);
    };

    const handleSpeechEnd = () => {
      setActiveUser(true);
    };

    const handleCallEnd = async () => {
      console.log("Vapi call ended");

      // Immediately change UI when call is cut
      setCallStatus("ended");
      setActiveUser(null);

      if (feedbackGeneratedRef.current) {
        console.log("Feedback generation already started");
        return;
      }

      feedbackGeneratedRef.current = true;

      toast("Interview Ended!!");

      const finalConversation = conversationRef.current;
      await GenerateFeedback(finalConversation);
    };

    const handleError = (error) => {
      console.error("Vapi error:", error);
      if (callStatus !== "active") {
        setCallStatus("idle");
        callStartedRef.current = false;
        toast.error("Something went wrong connecting the call");
      }
    };

    vapi.on("message", handleMessage);
    vapi.on("call-start", handleCallStart);
    vapi.on("speech-start", handleSpeechStart);
    vapi.on("speech-end", handleSpeechEnd);
    vapi.on("call-end", handleCallEnd);
    vapi.on("error", handleError);

    console.log("Vapi event listeners registered");

    return () => {
      vapi.off("message", handleMessage);
      vapi.off("call-start", handleCallStart);
      vapi.off("speech-start", handleSpeechStart);
      vapi.off("speech-end", handleSpeechEnd);
      vapi.off("call-end", handleCallEnd);
      vapi.off("error", handleError);
      console.log("Vapi event listeners removed");
    };
  }, [vapiReady]); // eslint-disable-line react-hooks/exhaustive-deps

  /*
   * Start call only once interviewInfo and Vapi are both actually ready.
   */
  useEffect(() => {
    if (!interviewInfo || !vapiReady || callStartedRef.current) return;

    callStartedRef.current = true;
    setCallStatus("connecting");
    startCall();
  }, [interviewInfo, vapiReady]); // eslint-disable-line react-hooks/exhaustive-deps

  /*
   * Stop an in-progress call if the component unmounts
   */
  useEffect(() => {
    return () => {
      if (callStartedRef.current && vapiRef.current) {
        try {
          vapiRef.current.stop();
        } catch (e) {
          console.error("Error stopping Vapi on unmount:", e);
        }
      }
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  /*
   * Start Vapi interview
   */
  const startCall = () => {
    if (!vapiRef.current) {
      console.error("Vapi is not initialized");
      return;
    }

    const questionList =
      interviewInfo?.interviewData
        ?.map((item) => item?.question)
        .filter(Boolean)
        .join(", ") || "";

    // console.log("Interview questions:", questionList);

    const assistantOptions = {
      name: "AI Recruiter",

      firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.interviewDesc}?`,

      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },

      voice: {
        provider: "vapi",
        voiceId: "Neil",
      },

      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are an AI voice assistant conducting an interview...`,
          },
        ],
      },
    };

    // console.log("Starting call with options:", assistantOptions);

    try {
      vapiRef.current.start(assistantOptions);
    } catch (error) {
      console.error("Error starting Vapi call:", error);
      callStartedRef.current = false;
      setCallStatus("idle");
      toast.error("Unable to start interview");
    }
  };

  /*
   * Stop interview manually
   */
  const stopInterview = () => {
    if (!vapiRef.current) return;

    console.log("Stopping Vapi call...");
    try {
      vapiRef.current.stop();
    } catch (error) {
      console.error("Error stopping Vapi call:", error);
    }
  };

  /*
   * Toggle mute
   */
  const toggleMute = () => {
    if (!vapiRef.current || callStatus !== "active") return;

    const next = !isMuted;
    try {
      vapiRef.current.setMuted(next);
      setIsMuted(next);
    } catch (error) {
      console.error("Error toggling mute:", error);
    }
  };

  /*
   * Generate feedback and save it
   */
  const GenerateFeedback = async (finalConversation) => {
    try {
      if (
        !finalConversation ||
        !Array.isArray(finalConversation) ||
        finalConversation.length === 0
      ) {
        console.warn("No conversation available for feedback");
        toast.error("No interview conversation was found");
        return;
      }

      const result = await axios.post("/api/ai-feedback", {
        conversation: finalConversation,
      });

      const content = result?.data?.content;
      if (!content) {
        throw new Error("AI feedback content is missing");
      }

      const finalContent = content
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const finalFeedback = JSON.parse(finalContent);

      const recommendation =
        finalFeedback?.feedback?.recommendation ||
        finalFeedback?.feedback?.Recommendation ||
        "";

      const recommended =
        recommendation.toLowerCase().trim() === "recommended";

      const { data, error } = await supabase
        .from("interview-feedback")
        .insert([
          {
            userName: interviewInfo?.userName,
            userEmail: interviewInfo?.userEmail,
            interview_id: interview_id,
            feedback: finalFeedback,
            recommended: recommended,
          },
        ])
        .select();

      if (error) {
        console.error("SUPABASE ERROR:", error);
        toast.error("Failed to save interview feedback");
        return;
      }

      toast.success("Interview feedback saved successfully");
      router.replace(`/interview/${interview_id}/completed`);
    } catch (error) {
      console.error("GENERATE FEEDBACK ERROR:", error);
      toast.error("Failed to generate interview feedback");
    }
  };

  return (
    <div className="relative p-20 lg:px-48 xl:px-56">
      {/* Only UI change: show immediate feedback overlay when call ends */}
      {callStatus === "ended" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Phone className="h-7 w-7 rotate-[135deg] text-green-600" />
            </div>

            <h2 className="text-xl font-bold text-gray-900">
              Interview Ended
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Your interview has ended successfully.
            </p>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600">
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating your interview feedback...
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">AI Interview Session</h2>

        <span className="flex items-center gap-2">
          <Timer />
          {formatTime(time)}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-7 md:grid-cols-2">
        {/* AI Recruiter */}
        <div className="flex h-[400px] flex-col items-center justify-center gap-3 rounded-lg border bg-white shadow-md">
          <div className="relative">
            {callStatus === "active" && activeUser === false && (
              <span className="absolute inset-0 animate-ping rounded-full bg-blue-500 opacity-75" />
            )}

            <Image
              src="/ai.svg"
              alt="ai"
              width={100}
              height={100}
              className="h-[60px] w-[60px] rounded-full object-cover"
            />
          </div>

          <h2>AI Recruiter</h2>
        </div>

        {/* User */}
        <div className="flex h-[400px] flex-col items-center justify-center gap-3 rounded-lg border bg-white shadow-md">
          <div className="relative">
            {callStatus === "active" && activeUser === true && (
              <span className="absolute inset-0 animate-ping rounded-full bg-blue-500 opacity-75" />
            )}

            <h2 className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-2xl text-white">
              {interviewInfo?.userName?.[0]}
            </h2>
          </div>

          <h2>{interviewInfo?.userName}</h2>
        </div>
      </div>

      <div className="mt-7 flex items-center justify-center gap-5">
        <button onClick={toggleMute} disabled={callStatus !== "active"}>
          {isMuted ? (
            <MicOff className="h-12 w-12 cursor-pointer rounded-full bg-gray-500 p-3 text-white shadow-md" />
          ) : (
            <Mic className="h-12 w-12 cursor-pointer rounded-full bg-gray-500 p-3 text-white shadow-md" />
          )}
        </button>

        <AlertConfirmation stopInterview={stopInterview}>
          <Phone className="h-12 w-12 cursor-pointer rounded-full bg-red-500 p-3 text-white shadow-md" />
        </AlertConfirmation>
      </div>

      <h2 className="mt-5 text-center text-sm text-gray-400">
        {callStatus === "connecting" &&
          "Connecting to your AI recruiter..."}

        {callStatus === "active" && "Interview In Progress..."}

        {callStatus === "ended" && "Wrapping up your feedback..."}

        {callStatus === "idle" && "Preparing your interview..."}
      </h2>
    </div>
  );
}

export default StartInterview;
