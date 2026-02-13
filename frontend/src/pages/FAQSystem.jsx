// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChevronDown, RotateCcw } from 'lucide-react';

// const FAQSystem = () => {
//   const [view, setView] = useState('list');
//   const [userQuestion, setUserQuestion] = useState('');
//   const [openIndex, setOpenIndex] = useState(null);

//   const questions = [
//     { q: "What is hypothyroidism?", a: "Low thyroid hormone production" },
//     { q: "Which gland is affected?", a: "The thyroid gland, located at the base of your neck." },
//     { q: "Which hormone is usually low?", a: "T4 (Thyroxine) and sometimes T3 (Triiodothyronine)." },
//     { q: "When should you take the pill?", a: "On an empty stomach, at least 30-60 minutes before breakfast." }
//   ];

//   const handleAsk = () => {
//     if (userQuestion.trim()) setView('reply');
//   };

//   const handleBack = () => {
//     setView('list');
//     setUserQuestion('');
//     setOpenIndex(null);
//   };

//   return (
//     <div className="min-h-screen w-full bg-[#94d2bd] bg-[url('./bg.png')] bg-cover bg-center font-pixel flex flex-col items-center relative overflow-hidden">
      
//       {/* Container Principal pour gérer le scroll proprement */}
//       <div className="flex-1 w-full max-w-4xl flex flex-col items-center p-4 z-10 overflow-y-auto pb-40">
        
//         {/* Header */}
//         <div className="w-full flex justify-between items-center mb-6">
//           <div className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
//             <img src="./logo.png" alt="logo" className="w-full h-full object-contain cursor-pointer" onClick={handleBack}/>
//           </div>

//           <div className="flex gap-2">
//             {(
//               <button
//                 onClick={() => { localStorage.clear(); window.location.reload(); }}
//                 className="bg-black p-2 rounded-lg text-white hover:scale-110 transition-transform"
//               >
//                 <RotateCcw size={18} className="sm:w-5 sm:h-5"/>
//               </button>
//             )}

//           </div>
//         </div>

//         {/* Titre FAQ */}
//         <div className="w-full max-w-md sm:max-w-xl bg-white border-4 border-[#D4AF37] rounded-xl p-3 mb-6 text-center shadow-[0_4px_0_0_#B8860B]">
//           <h1 className="text-xl sm:text-2xl font-black text-stone-800 tracking-widest uppercase">FAQ</h1>
//           <p className="text-[10px] sm:text-xs font-bold text-[#5D2E1C]">More about hypothyroïdie</p>
//         </div>

//         <AnimatePresence mode="wait">
//           {view === 'list' ? (
//             <motion.div 
//               key="list"
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className="w-full max-w-md sm:max-w-lg bg-[#f1e4c3] border-4 border-[#D4AF37] rounded-xl p-2 sm:p-4 shadow-lg"
//             >
//               <div className="space-y-1">
//                 {questions.map((item, index) => (
//                   <div key={index} className="border-b-2 border-[#D4AF37]/30 last:border-0">
//                     <button
//                       onClick={() => setOpenIndex(openIndex === index ? null : index)}
//                       className="w-full flex justify-between items-center py-3 text-left px-2 gap-2"
//                     >
//                       <span className="font-bold text-stone-800 text-xs sm:text-sm">{item.q}</span>
//                       <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }}>
//                         <ChevronDown size={16} className="text-stone-600" />
//                       </motion.div>
//                     </button>
//                     <AnimatePresence>
//                       {openIndex === index && (
//                         <motion.div
//                           initial={{ height: 0, opacity: 0 }}
//                           animate={{ height: "auto", opacity: 1 }}
//                           exit={{ height: 0, opacity: 0 }}
//                           className="overflow-hidden"
//                         >
//                           <div className="pb-3 px-2">
//                             <div className="bg-[#e6d5b0] p-2 rounded border-l-4 border-orange-500">
//                               <p className="text-orange-900 font-bold text-[10px] sm:text-xs italic">{item.a}</p>
//                             </div>
//                           </div>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>
//           ) : (
//             <motion.div 
//               key="reply"
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="w-full max-w-md sm:max-w-lg flex flex-col gap-3 sm:gap-4 px-2"
//             >
//               <div className="self-start bg-[#f1e4c3] border-2 border-stone-800 rounded-2xl px-4 py-2 shadow-sm max-w-[90%]">
//                 <p className="text-[11px] sm:text-sm font-bold text-stone-800 italic">hey! ask anything about hypothyroidism?</p>
//               </div>

//               <div className="self-end bg-[#8b8e4b] border-2 border-stone-800 rounded-2xl px-4 py-2 shadow-sm max-w-[90%]">
//                 <p className="text-[11px] sm:text-sm font-black text-white">{userQuestion}</p>
//               </div>

//               <div className="self-start bg-[#f1e4c3] border-2 border-stone-800 rounded-2xl px-4 py-2 shadow-sm animate-pulse border-dashed">
//                 <p className="text-[11px] sm:text-sm font-black text-stone-800">Fatigue</p>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* Footer fixe */}
//       <div className="fixed bottom-0 w-full z-50">

//         {/* Zone personnage + bulle */}
        // {view === "list" && (
        //   <div className="absolute bottom-20 left-4 sm:left-6 flex flex-col items-start">

        //     {/* Bubble */}
        //     <div className="relative bg-[#f1e4c3] border-2 border-stone-800 rounded-xl p-2 px-3 shadow-md mb-1">
        //       <p className="text-[9px] sm:text-[10px] font-black italic">
        //         Hey! ask anything about hypothyroidism?
        //       </p>

        //       {/* Arrow */}
        //       <div className="absolute -bottom-2 left-4 w-3 h-3 bg-[#f1e4c3] border-r-2 border-b-2 border-stone-800 rotate-45" />
        //     </div>

        //     {/* Character */}
        //     <img
        //       src="/mario.png"
        //       alt="character"
        //       className="w-20 h-20 sm:w-20 sm:h-20 object-contain"
        //     />

        //   </div>
        // )}

//         {/* Barre input */}
//         <div className="w-full bg-[#8B8948] border-t-4 border-[#47A548] p-4 pb-6 flex justify-center">

//           <div className="w-full max-w-md flex items-center gap-2">

//             <div className="flex-1 bg-[#f1e4c3] border-4 border-[#D4AF37] rounded-xl p-1 shadow-inner">
//               <input 
//                 type="text"
//                 value={userQuestion}
//                 onChange={(e) => setUserQuestion(e.target.value)}
//                 onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
//                 className="w-full bg-transparent outline-none font-bold text-stone-700 text-xs sm:text-sm px-2 py-1.5"
//                 placeholder="Type here..."
//               />
//             </div>

//             <button 
//               onClick={handleAsk}
//               className="bg-[#6d8b74] border-2 border-stone-800 px-4 py-2 rounded-lg text-white font-black text-xs shadow-[3px_3px_0_0_#000] active:translate-y-1 active:shadow-none"
//             >
//               ASK
//             </button>

//           </div>
//         </div>
//       </div>
//       </div>
//         );
//       };

// export default FAQSystem;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, RotateCcw, Menu, X, Home, BookOpen, MessageCircleQuestion } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FAQSystem = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('list');
  const [userQuestion, setUserQuestion] = useState('');
  const [openIndex, setOpenIndex] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#94d2bd] bg-[url('./bg.png')] bg-cover bg-center pixel-font flex flex-col items-center relative overflow-hidden">
      
      {/* --- HEADER RESPONSIVE --- */}
      <header className="w-full max-w-6xl flex justify-between items-center p-4 z-50">
        {/* Logo */}
        <div className="w-20 h-20 sm:w-20 sm:h-20 flex-shrink-0">
          <img 
            src="/logo.png" 
            alt="logo" 
            className="w-full h-full object-contain cursor-pointer active:scale-95 transition-transform" 
            onClick={() => navigate('/home')}
          />
        </div>

        {/* NAVIGATION DESKTOP (Visible uniquement sur large écran) */}
        <nav className="hidden md:flex items-center gap-8 bg-[#f1e4c3] backdrop-blur-md px-8 py-3 rounded-2xl border-2 border-[#b89a67] shadow-[0_8px_0_0_#b89a67]">
          <button onClick={() => navigate('/')} className="text-xs font-black hover:text-[#5A7554] transition-colors uppercase tracking-widest">Home</button>
          <button onClick={() => navigate('/')} className="text-xs font-black hover:text-[#5A7554] transition-colors uppercase tracking-widest">Story</button>
          <button onClick={handleBack} className="text-xs font-black text-[#A37803] border-b-2 border-[#A37803] uppercase tracking-widest">FAQ</button>
        </nav>

        {/* NAVIGATION MOBILE (Visible uniquement à droite sur mobile) */}
        <div className="flex items-center gap-3 md:hidden">
            {/* Bouton Reset (Toujours visible) */}
            <button
                onClick={() => { localStorage.clear(); window.location.reload(); }}
                className=" bg-black p-2 rounded-lg text-white active:scale-90 transition-transform"
            >
                <RotateCcw size={18} />
            </button>

            {/* Bouton Menu Mobile */}
            <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="bg-[#f1e4c3] border-2 border-[#b89a67] p-2 rounded-lg shadow-[0_8px_0_0_#b89a67] active:translate-y-0.5 transition-all"
            >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
        </div>

        {/* Menu Déroulant Mobile */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 right-4 w-48 bg-[#f1e4c3] border-4 border-[#b89a67] rounded-xl shadow-[0_8px_0_0_#b89a67] p-2 flex flex-col gap-1 md:hidden overflow-hidden"
            >
              <button onClick={() => navigate('hero')} className="flex items-center gap-3 p-3 hover:bg-[#8b8e4b]/20 rounded-lg font-black text-xs uppercase tracking-tighter">
                <Home size={16} /> Home
              </button>
              <button onClick={() => navigate('story')} className="flex items-center gap-3 p-3 hover:bg-[#8b8e4b]/20 rounded-lg font-black text-xs uppercase tracking-tighter">
                <BookOpen size={16} /> Story
              </button>
              <button onClick={handleBack} className="flex items-center gap-3 p-3  text-[#A37803] rounded-lg font-black text-xs uppercase tracking-tighter ">
                <MessageCircleQuestion size={16} /> FAQ
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bouton Reset Desktop (Caché sur mobile car déjà dans le bloc mobile) */}
        <button
          onClick={() => { localStorage.clear(); window.location.reload(); }}
          className="hidden md:block bg-black p-2.5 rounded-lg text-white hover:scale-110 transition-transform shadow-[3px_3px_0_0_#333]"
        >
          <RotateCcw size={20} />
        </button>
      </header>

      {/* --- CONTENU PRINCIPAL --- */}
      <div className="flex-1 w-full max-w-4xl flex flex-col items-center p-4 z-10 overflow-y-auto pb-40">
        
        {/* Titre FAQ */}
        <div className="w-full max-w-md sm:max-w-xl bg-white border-4 border-[#D4AF37] rounded-xl p-3 mb-6 text-center shadow-[0_4px_0_0_#B8860B]">
          <h1 className="text-xl sm:text-2xl font-black text-stone-800 tracking-widest uppercase">FAQ</h1>
          <p className="text-[10px] sm:text-xs font-bold text-[#5D2E1C]">More about hypothyroïdie</p>
        </div>

        <AnimatePresence mode="wait">
          {view === 'list' ? (
            <motion.div 
              key="list"
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
            <motion.div key="reply" className="w-full max-w-md sm:max-w-lg flex flex-col gap-3 px-2">
                <div className="self-start bg-[#f1e4c3] border-2 border-stone-800 rounded-2xl px-4 py-2 shadow-sm max-w-[90%] font-bold text-xs italic text-stone-800">hey! ask anything about hypothyroidism?</div>
                <div className="self-end bg-[#8b8e4b] border-2 border-stone-800 rounded-2xl px-4 py-2 shadow-sm max-w-[90%] font-black text-xs text-white uppercase">{userQuestion}</div>
                <div className="self-start bg-[#f1e4c3] border-2 border-stone-800 rounded-2xl px-4 py-2  font-black text-xs text-stone-800 tracking-tighter">Analyzing...</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- FOOTER FIXE (INPUT UNIQUEMENT) --- */}
      <div className="fixed bottom-0 w-full z-40">
        
        {/* Mario Character */}
        {view === "list" && (
          <div className="absolute bottom-20 left-4 sm:left-6 flex flex-col items-start">

            {/* Bubble */}
            <div className="relative bg-[#f1e4c3] border-2 border-stone-800 rounded-xl p-2 px-3 shadow-md mb-1">
              <p className="text-[9px] sm:text-[10px] font-black italic">
                Hey! ask anything about hypothyroidism?
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
        <div className="w-full bg-[#8B8948] border-t-4 border-[#47A548] p-4 pb-6 flex justify-center shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
          <div className="w-full max-w-md flex items-center gap-2">
            <div className="flex-1 bg-[#f1e4c3] border-4 border-[#D4AF37] rounded-xl p-1 shadow-inner">
              <input 
                type="text"
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                className="w-full bg-transparent outline-none font-bold text-stone-700 text-xs px-2 py-1.5"
                placeholder="Ask me a question..."
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