import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PixelText = ({ content, greenWords = [], blackWords = [] }) => {
  const words = content.split(' ');

  // Variantes pour l'apparition des mots en cascade
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 5 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.p variants={container} initial="hidden" animate="show">
      {words.map((word, index) => {
        const cleanWord = word.replace(/[.,]/g, "");
        let colorClass = "text-white"; 

        if (blackWords.includes(cleanWord)) {
          colorClass = "text-black font-black";
        } else if (greenWords.includes(cleanWord)) {
          colorClass = "text-[#1a3d1d] font-black"; // Vert plus profond pour lisibilité
        }

        return (
          <motion.span 
            key={index} 
            variants={item}
            className={`${colorClass} inline-block mr-1`}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.p>
  );
};

const Hero = () => {
  const storyText = "ThyroTerra transforms the lifetime challenge of treatment adherence into an epic journey of global discovery. Patients enter a vast digital wilderness where every Land represents a full year of dedicated effort and resilience.";

  return (
    <section id='about' className='w-full relative pb-20 font-pixel overflow-hidden'>
      
      {/* --- ÉLÉMENTS DE DÉCOR ANIMÉS --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Cercles de lumière (Lucioles) */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-200 rounded-full blur-[1px]"
            animate={{ 
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 0.7, 0] 
            }}
            transition={{ 
              duration: 5 + Math.random() * 5, 
              repeat: Infinity, 
              delay: i * 2 
            }}
            style={{ 
              left: `${20 + i * 15}%`, 
              bottom: '10%' 
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* TITRE : Apparition avec rebond */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className='text-[40px] leading-relaxed items-center text-center pt-20 font-pixel'
        >
          <span className='text-[#E4903E] drop-shadow-[4px_4px_0_rgba(0,0,0,0.2)]'>our story</span>              
        </motion.div>

        {/* SOUS-TITRE : Respiration douce */}
        <motion.div 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
          className='mt-4 text-black font-pixel items-center text-center text-[15px] italic'
        >
          <p>Your Thyroid, Your Forest: The Science of Balance.</p>
        </motion.div>

        {/* TEXTE BOX : Style Boîte de dialogue RPG */}
        <div className='mt-12 flex justify-center px-6'>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -5 }}
            className='max-w-3xl bg-[#8ca386]/60 backdrop-blur-md p-10 rounded-[40px] border-4 border-white/30 shadow-[0_10px_0_0_rgba(0,0,0,0.1)] relative'
          >
            {/* Petit triangle de dialogue rétro en bas */}
            <motion.div 
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[15px] border-t-white/30"
            />

            <div className='text-[20px] md:text-[22px] leading-relaxed text-center'>
              <PixelText 
                content={storyText}
                blackWords={["ThyroTerra"]}
                greenWords={["treatment", "adherence", "digital", "wilderness", "Land", "full", "year"]}
              />
            </div>
          </motion.div>
        </div>

        {/* PETIT PERSONNAGE OU ICONE QUI "ÉCOUTE" */}
        <motion.div 
          className="mt-10 flex justify-center"
          animate={{ x: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="bg-white/20 p-4 rounded-full border-2 border-white/40">
            <span className="text-3xl">📜</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;