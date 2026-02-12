import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, RotateCcw } from 'lucide-react';

const FAQSystem = () => {
  const [view, setView] = useState('list');
  const [userQuestion, setUserQuestion] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  const questions = [
    { q: "What is hypothyroidism?", a: "Low thyroid hormone production" },
    { q: "Which gland is affected?", a: "The thyroid gland, located at the base of your neck." },
    { q: "Which hormone is usually low?", a: "T4 (Thyroxine) and sometimes T3 (Triiodothyronine)." },
    { q: "When should you take the pill?", a: "On an empty stomach, at least 30-60 minutes before breakfast." }
  ];

  const handleAsk = () => {
    if (userQuestion.trim()) setView('reply');
  };

  const handleBack = () => {
    setView('list');
    setUserQuestion('');
    setOpenIndex(null);
  };

  return (
    <div className="min-h-screen w-full bg-[#94d2bd] bg-[url('./bg.png')] bg-cover bg-center font-mono flex flex-col items-center relative overflow-hidden">
      
      {/* Container Principal pour gérer le scroll proprement */}
      <div className="flex-1 w-full max-w-4xl flex flex-col items-center p-4 z-10 overflow-y-auto pb-40">
        
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
            <img src="./logo.png" alt="logo" className="w-full h-full object-contain cursor-pointer" onClick={handleBack}/>
          </div>

          <div className="flex gap-2">
            {(
              <button
                onClick={() => { localStorage.clear(); window.location.reload(); }}
                className="bg-black p-2 rounded-lg text-white hover:scale-110 transition-transform"
              >
                <RotateCcw size={18} className="sm:w-5 sm:h-5"/>
              </button>
            )}

          </div>
        </div>

        {/* Titre FAQ */}
        <div className="w-full max-w-md sm:max-w-xl bg-white border-4 border-[#D4AF37] rounded-xl p-3 mb-6 text-center shadow-[0_4px_0_0_#B8860B]">
          <h1 className="text-xl sm:text-2xl font-black text-stone-800 tracking-widest uppercase">FAQ</h1>
          <p className="text-[10px] sm:text-xs font-bold text-[#5D2E1C]">More about hypothyroïdie</p>
        </div>

        <AnimatePresence mode="wait">
          {view === 'list' ? (
            <motion.div 
              key="list"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full max-w-md sm:max-w-lg bg-[#f1e4c3] border-4 border-[#D4AF37] rounded-xl p-2 sm:p-4 shadow-lg"
            >
              <div className="space-y-1">
                {questions.map((item, index) => (
                  <div key={index} className="border-b-2 border-[#D4AF37]/30 last:border-0">
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      className="w-full flex justify-between items-center py-3 text-left px-2 gap-2"
                    >
                      <span className="font-bold text-stone-800 text-xs sm:text-sm">{item.q}</span>
                      <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }}>
                        <ChevronDown size={16} className="text-stone-600" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pb-3 px-2">
                            <div className="bg-[#e6d5b0] p-2 rounded border-l-4 border-orange-500">
                              <p className="text-orange-900 font-bold text-[10px] sm:text-xs italic">{item.a}</p>
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
            <motion.div 
              key="reply"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md sm:max-w-lg flex flex-col gap-3 sm:gap-4 px-2"
            >
              <div className="self-start bg-[#f1e4c3] border-2 border-stone-800 rounded-2xl px-4 py-2 shadow-sm max-w-[90%]">
                <p className="text-[11px] sm:text-sm font-bold text-stone-800 italic">hey! ask anything about hypothyroidism?</p>
              </div>

              <div className="self-end bg-[#8b8e4b] border-2 border-stone-800 rounded-2xl px-4 py-2 shadow-sm max-w-[90%]">
                <p className="text-[11px] sm:text-sm font-black text-white">{userQuestion}</p>
              </div>

              <div className="self-start bg-[#f1e4c3] border-2 border-stone-800 rounded-2xl px-4 py-2 shadow-sm animate-pulse border-dashed">
                <p className="text-[11px] sm:text-sm font-black text-stone-800">Fatigue</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer fixe */}
      <div className="fixed bottom-0 w-full z-50">

        {/* Zone personnage + bulle */}
        {view === "list" && (
          <div className="absolute bottom-20 left-4 sm:left-6 flex flex-col items-start">

            {/* Bubble */}
            <div className="relative bg-[#f1e4c3] border-2 border-stone-800 rounded-xl p-2 px-3 shadow-md mb-1">
              <p className="text-[9px] sm:text-[10px] font-black italic">
                hey! ask anything?
              </p>

              {/* Arrow */}
              <div className="absolute -bottom-2 left-4 w-3 h-3 bg-[#f1e4c3] border-r-2 border-b-2 border-stone-800 rotate-45" />
            </div>

            {/* Character */}
            <img
              src="/mario.png"
              alt="character"
              className="w-20 h-20 sm:w-20 sm:h-20 object-contain"
            />

          </div>
        )}

        {/* Barre input */}
        <div className="w-full bg-[#8B8948] border-t-4 border-[#47A548] p-4 pb-6 flex justify-center">

          <div className="w-full max-w-md flex items-center gap-2">

            <div className="flex-1 bg-[#f1e4c3] border-4 border-[#D4AF37] rounded-xl p-1 shadow-inner">
              <input 
                type="text"
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                className="w-full bg-transparent outline-none font-bold text-stone-700 text-xs sm:text-sm px-2 py-1.5"
                placeholder="Type here..."
              />
            </div>

            <button 
              onClick={handleAsk}
              className="bg-[#6d8b74] border-2 border-stone-800 px-4 py-2 rounded-lg text-white font-black text-xs shadow-[3px_3px_0_0_#000] active:translate-y-1 active:shadow-none"
            >
              ASK
            </button>

          </div>
        </div>
      </div>
      </div>
        );
      };

export default FAQSystem;