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

  // View & UI State
  const [view, setView] = useState("list"); 
  const [userQuestion, setUserQuestion] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Chat Logic State
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Updated questions to be in minuscule
  const questions = [
    { q: "What is hypothyroidism?", a: "A condition where the thyroid doesn't produce enough hormones, causing fatigue and weight gain." },
    { q: "Which gland is affected?", a: "The thyroid gland, located at the base of your neck." },
    { q: "Which hormone is usually low?", a: "T4 (Thyroxine) and sometimes T3 (Triiodothyronine)." },
    { q: "When should you take the pill?", a: "On an empty stomach, at least 30-60 minutes before breakfast." },
    { q: "What is ThyroTerra?", a: "A gamified app helping you maintain thyroid treatment by building a virtual world." }
  ];

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (view === "reply") scrollToBottom();
  }, [messages, view, scrollToBottom]);

  const handleAsk = async () => {
    if (!userQuestion.trim() || isLoading) return;

    const trimmedQuestion = userQuestion.trim();
    const newUserMessage = { role: "user", content: trimmedQuestion };

    setMessages((prev) => [...prev, newUserMessage]);
    setUserQuestion("");
    setView("reply");
    setIsLoading(true);

    try {
      const response = await api.post("/chat", {
        question: trimmedQuestion,
        conversationHistory: [...messages, newUserMessage],
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.data.answer },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "connection lost. try again later.", isError: true },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setView("list");
    setMessages([]);
    setUserQuestion("");
    setOpenIndex(null);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#94d2bd] bg-[url('./bg.png')] bg-cover bg-center font-pixel flex flex-col items-center relative overflow-hidden">
      
      {/* --- HEADER --- */}
      <header className="w-full max-w-6xl flex justify-between items-center p-4 z-50">
        <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
          <img 
            src="/logo.png" 
            alt="logo" 
            className="w-full h-full object-contain cursor-pointer active:scale-95 transition-transform" 
            onClick={() => navigate('/')}
          />
        </div>

        <nav className="hidden md:flex items-center gap-8 bg-[#f1e4c3] px-8 py-3 rounded-2xl border-2 border-[#b89a67] shadow-[0_8px_0_0_#b89a67]">
          <button onClick={() => navigate('/')} className="text-xs font-black hover:text-[#5A7554] normal-case tracking-widest transition-colors">Home</button>
          <button onClick={() => navigate('/story')} className="text-xs font-black hover:text-[#5A7554] normal-case tracking-widest transition-colors">Story</button>
          <button onClick={handleBack} className={`text-xs font-black normal-case tracking-widest ${view === 'list' ? 'text-[#A37803] border-b-2 border-[#A37803]' : ''}`}>FAQ</button>
        </nav>

        <div className="flex gap-3">
          <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="bg-black p-2 rounded-lg text-white"><RotateCcw size={18} /></button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden bg-[#f1e4c3] border-2 border-[#b89a67] p-2 rounded-lg shadow-[0_4px_0_0_#b89a67]">
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute top-20 right-4 w-48 bg-[#f1e4c3] border-4 border-[#b89a67] rounded-xl shadow-[0_8px_0_0_#b89a67] p-2 flex flex-col md:hidden">
               <button onClick={() => navigate('/')} className="flex items-center gap-3 p-3 font-black text-xs normal-case"><Home size={16}/> Home</button>
               <button onClick={() => navigate('/story')} className="flex items-center gap-3 p-3 font-black text-xs normal-case"><BookOpen size={16}/> Story</button>
               <button onClick={handleBack} className="flex items-center gap-3 p-3 text-[#A37803] font-black text-xs normal-case"><MessageCircleQuestion size={16}/> FAQ</button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* --- CONTENT --- */}
      <div className="flex-1 w-full max-w-4xl flex flex-col items-center p-4 z-10 overflow-y-auto pb-40">
        
        {/* Title Card */}
        <div className="w-full max-w-md bg-white border-4 border-[#D4AF37] rounded-xl p-3 mb-6 text-center shadow-[0_4px_0_0_#B8860B]">
          <h1 className="text-xl sm:text-2xl font-black text-stone-800 tracking-widest normal-case">FAQ</h1>
          <p className="text-[10px] sm:text-xs font-bold text-[#5D2E1C]">more about hypothyroidism</p>
        </div>

        <AnimatePresence mode="wait">
          {view === 'list' ? (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-md bg-[#f1e4c3] border-4 border-[#D4AF37] rounded-xl p-4 shadow-lg">
              <div className="space-y-1">
                {questions.map((item, index) => (
                  <div key={index} className="border-b-2 border-[#D4AF37]/30 last:border-0">
                    <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full flex justify-between items-center py-3 px-2 gap-2 text-left">
                      <span className="font-bold text-stone-800 text-xs sm:text-sm normal-case">{item.q}</span>
                      <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }}><ChevronDown size={16} /></motion.div>
                    </button>
                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="pb-3 px-2">
                            <div className="bg-[#e6d5b0] p-2 rounded border-l-4 border-orange-500 text-[10px] sm:text-xs font-bold italic text-orange-900 normal-case">
                              {item.a}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="reply" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md flex flex-col gap-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`${msg.role === 'user' ? 'self-end bg-[#8b8e4b] text-white' : 'self-start bg-[#f1e4c3] text-stone-800'} border-2 border-stone-800 rounded-2xl px-4 py-2 shadow-sm max-w-[85%] font-bold text-xs normal-case`}>
                  {msg.content}
                </div>
              ))}
              {isLoading && (
                <div className="self-start bg-[#f1e4c3] border-2 border-stone-800 rounded-2xl px-4 py-2 flex items-center gap-2 font-black text-xs normal-case">
                  <Loader2 className="animate-spin" size={14}/> analyzing...
                </div>
              )}
              <div ref={messagesEndRef} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- FOOTER INPUT --- */}
      <div className="fixed bottom-0 w-full z-40">
        {view === "list" && (
          <div className="absolute bottom-24 left-6 flex flex-col items-start">
            <div className="relative bg-[#f1e4c3] border-2 border-stone-800 rounded-xl p-2 px-3 shadow-md mb-1">
              <p className="text-[9px] font-black italic normal-case">hey! ask anything about hypothyroidism?</p>
              <div className="absolute -bottom-2 left-4 w-3 h-3 bg-[#f1e4c3] border-r-2 border-b-2 border-stone-800 rotate-45" />
            </div>
            <img src="/mario.png" alt="character" className="w-20 h-20 object-contain" />
          </div>
        )}

        <div className="w-full bg-[#8B8948] border-t-4 border-[#47A548] p-4 pb-8 flex justify-center shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
          <div className="w-full max-w-md flex items-center gap-2">
            <div className="flex-1 bg-[#f1e4c3] border-4 border-[#D4AF37] rounded-xl p-1 shadow-inner">
              <input 
                ref={inputRef}
                type="text"
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                className="w-full bg-transparent outline-none font-bold text-stone-700 text-xs px-2 py-1.5 normal-case"
                placeholder="ask me a question..."
              />
            </div>
            <button 
              onClick={handleAsk}
              disabled={isLoading || !userQuestion.trim()}
              className="bg-[#6d8b74] border-2 border-stone-800 px-4 py-2 rounded-lg text-white font-black text-xs shadow-[3px_3px_0_0_#000] active:translate-y-1 active:shadow-none disabled:opacity-50 uppercase"
            >
              {isLoading ? <Loader2 className="animate-spin" size={16}/> : "ASK"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSystem;