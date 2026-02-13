import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  RotateCcw,
  Home,
  BookOpen,
  MessageCircleQuestion,
  Menu,
  X,
  Send,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";



const FAQSystem = () => {
  const navigate = useNavigate();

  const [view, setView] = useState("list");
  const [userQuestion, setUserQuestion] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  /* =========================
     FAQ STATIC DATA
  ========================== */
  const questions = [
    {
      q: "What is hypothyroidism?",
      a: "Hypothyroidism is a condition where your thyroid gland doesn't produce enough thyroid hormones, leading to symptoms like fatigue, weight gain, and brain fog.",
    },
    {
      q: "Which gland is affected?",
      a: "The thyroid gland, located at the base of your neck.",
    },
    {
      q: "Which hormone is usually low?",
      a: "T4 (Thyroxine) and sometimes T3 (Triiodothyronine).",
    },
    {
      q: "When should you take the pill?",
      a: "On an empty stomach, at least 30-60 minutes before breakfast for optimal absorption.",
    },
    {
      q: "What is ThyroTerra?",
      a: "ThyroTerra is a gamified health app that helps you maintain your thyroid treatment routine by building a beautiful virtual world through daily adherence.",
    },
    {
      q: "How does the Forest Guide help?",
      a: "The Forest Guide is your companion who provides encouragement, health tips during your 30-minute medication absorption window, and celebrates your progress.",
    },
  ];

  /* =========================
     AUTO SCROLL
  ========================== */
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  /* =========================
     AUTO FOCUS INPUT
  ========================== */
  useEffect(() => {
    if (view === "reply") {
      inputRef.current?.focus();
    }
  }, [view]);

  /* =========================
     HANDLE ASK
  ========================== */
  const handleAsk = async () => {
    if (!userQuestion.trim() || isLoading) return;

    const trimmedQuestion = userQuestion.trim();

    const newUserMessage = {
      role: "user",
      content: trimmedQuestion,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, newUserMessage];

    setMessages(updatedMessages);
    setUserQuestion("");
    setView("reply");
    setIsLoading(true);

    try {
      const response = await api.post("/chat", {
        question: trimmedQuestion,
        conversationHistory: updatedMessages, // ✅ FIXED BUG
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.data.answer,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting right now. Please try again later.",
          timestamp: new Date(),
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  /* =========================
     RESET TO FAQ
  ========================== */
  const handleBack = () => {
    setView("list");
    setUserQuestion("");
    setOpenIndex(null);
    setMessages([]);
  };

  const handleQuickQuestion = (question) => {
    setUserQuestion(question);
    setView("reply");
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  /* =========================
     COMPONENT
  ========================== */
  return (
    <div className="min-h-screen w-full bg-[#94d2bd] bg-[url('./bg.png')] bg-cover bg-center font-pixel flex flex-col relative overflow-hidden">
      
      {/* HEADER */}
      <header className="w-full bg-[#f1e4c3] border-b-4 border-[#b89a67] py-4 px-4 sm:px-6 flex items-center justify-between shadow-md z-50 relative">
        
        <div
          className="w-12 h-12 sm:w-16 sm:h-16 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="./logo.png"
            alt="ThyroTerra Logo"
            className="w-full h-full object-contain"
          />
        </div>

        <nav className="hidden md:flex gap-6">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/story")}>Story</button>
          <button onClick={handleBack} className="text-[#A37803]">
            FAQ
          </button>
        </nav>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          className="hidden md:block bg-black p-2.5 rounded-lg text-white"
        >
          <RotateCcw size={20} />
        </button>
      </header>

      {/* MAIN */}
      <div className="flex-1 w-full max-w-4xl mx-auto flex flex-col items-center p-4 overflow-y-auto pb-40">
        
        {/* TITLE */}
        <div className="w-full max-w-md bg-white border-4 border-[#D4AF37] rounded-xl p-3 mb-6 text-center">
          <h1 className="text-xl font-black uppercase">FAQ</h1>
          <p className="text-xs font-bold">
            More about hypothyroidism & ThyroTerra
          </p>
        </div>

        <AnimatePresence mode="wait">
          {view === "list" ? (
            <motion.div
              key="list"
              className="w-full max-w-md bg-[#f1e4c3] border-4 border-[#D4AF37] rounded-xl p-4"
            >
              {questions.map((item, index) => (
                <div key={index} className="border-b py-2">
                  <button
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                    className="w-full flex justify-between items-center"
                  >
                    <span className="font-bold text-xs">{item.q}</span>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                    >
                      <ChevronDown size={16} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mt-2 text-xs"
                      >
                        {item.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="reply"
              className="w-full max-w-md flex flex-col gap-3"
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`${
                    msg.role === "user" ? "self-end" : "self-start"
                  } max-w-[85%]`}
                >
                  <div
                    className={`border-2 border-black rounded-2xl px-4 py-2 text-xs ${
                      msg.role === "user"
                        ? "bg-[#8b8e4b] text-white"
                        : msg.isError
                        ? "bg-red-100 text-red-900"
                        : "bg-[#f1e4c3]"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="self-start bg-[#f1e4c3] border-2 border-black rounded-2xl px-4 py-2 text-xs flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Thinking...
                </div>
              )}

              <div ref={messagesEndRef} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* INPUT BAR */}
      <div className="fixed bottom-0 w-full bg-[#8B8948] p-4 flex justify-center">
        <div className="w-full max-w-md flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            disabled={isLoading}
            className="flex-1 border-2 border-black rounded-lg px-3 py-2 text-xs"
            placeholder={
              view === "list"
                ? "Ask me a question..."
                : "Continue the conversation..."
            }
          />

          <button
            onClick={handleAsk}
            disabled={!userQuestion.trim() || isLoading}
            className="bg-[#6d8b74] border-2 border-black px-4 py-2 rounded-lg text-white text-xs flex items-center gap-1"
          >
            {isLoading ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <Send className="w-3 h-3" />
            )}
            ASK
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQSystem;
