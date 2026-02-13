import React from 'react';
import { Link } from 'react-router-dom'; 
import { motion } from 'framer-motion';

const About = () => {
  // On génère quelques positions aléatoires pour des "fleurs/herbes" décoratives
  const decorations = [
    { top: '20%', left: '15%', delay: 0 },
    { top: '45%', left: '85%', delay: 0.5 },
    { top: '70%', left: '10%', delay: 1.2 },
    { top: '85%', left: '80%', delay: 0.8 },
  ];

  return ( 
    <section id='hero' className='mt-14 w-full relative overflow-hidden min-h-screen'> 
      
      {/* --- BACKGROUND DECORATIONS (Le "remplissage") --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Particules qui flottent (Feuilles/Vent) */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-green-200/30 rounded-full"
            initial={{ y: "100vh", x: Math.random() * 100 + "vw", opacity: 0 }}
            animate={{ 
              y: "-10vh", 
              x: (Math.random() * 100 - 20) + "vw",
              opacity: [0, 1, 0],
              rotate: 360 
            }}
            transition={{ 
              duration: 10 + Math.random() * 10, 
              repeat: Infinity, 
              delay: Math.random() * 10 
            }}
          />
        ))}

        {/* Petites fleurs pixelisées statiques qui bougent doucement */}
        {decorations.map((dec, i) => (
          <motion.div
            key={i}
            style={{ top: dec.top, left: dec.left }}
            className="absolute text-xl opacity-40"
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, delay: dec.delay }}
          >
            🌿
          </motion.div>
        ))}
      </div>

      <div className='flex flex-col items-center justify-center font-pixel px-0 relative z-10'>
        <div className='w-full max-w'>
          
          {/* NUAGE 1 */}
          <div className='w-full relative h-15 pt-30'>
            <motion.img 
              src="/cloud.png" 
              alt="Cloud" 
              className='absolute left-10 h-12 md:h-16'
              animate={{ x: [0, 50, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className='flex justify-end'>
            <motion.img 
              animate={{ scaleY: [1, 1.05, 1] }} 
              transition={{ duration: 3, repeat: Infinity }}
              className='pr-10 h-15 origin-bottom' 
              src="/TreePine.png" alt="tree" 
            />
            <motion.img 
              animate={{ scaleY: [1, 1.03, 1] }} 
              transition={{ duration: 4, repeat: Infinity }}
              className='pr-5 h-15 origin-bottom' 
              src="/TreeRound.png" alt="tree" 
            />
          </div>

          <div className='flex justify-end pr-0 h-15'>
            <img src="/FloatingLeft.png" alt="" />
            <img src="/Top.png" alt="Forest" />  
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-[27px] leading-relaxed items-center text-center pt-20'
          >
            <p>
              <span className='text-white'>Welcome to </span>
              <span className='text-[#0a2310] font-black'>the Forest Land.</span>
            </p>
            <p>
              <span className='text-white'>Your </span>
              <span className='text-[#0a2310] font-black'>health journey</span>
              <span className='text-white'> starts</span>
            </p>
            <p className='text-white '>here</p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.5 }}
          className='mt-12 text-white text-[14px] px-6 text-center italic'
        >
          <p>"Your journey isn't just a calendar; it's a masterpiece in progress."</p>
        </motion.div>

        {/* NUAGE 2 */}
        <div className='w-full relative h-15 pt-30'>
          <motion.img 
            src="/cloud.png" 
            alt="Cloud" 
            className='absolute right-10 h-12 md:h-16' 
            animate={{ 
              x: [0, -40, 0],
              y: [0, 10, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className='flex justify-start h-15 w-full'>
          <motion.img 
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            src="/homeleft.png" 
            alt="" 
            className='h-50 ml-0' 
          />
        </div>
        
        <div className='mt-5 flex justify-center pb-20'>
          <Link to="/signin">
            <motion.button 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              whileHover={{ scale: 1.1, filter: "brightness(1.1)" }}
              whileTap={{ scale: 0.9, y: 5 }}
              className='mt-10 bg-[#bcc7ba] text-[#0a2310] font-pixel px-10 py-3 
                         rounded-full border-[10px] border-[#607456] 
                         shadow-[0_8px_0_0_#4a5a42] active:shadow-none
                         transition-all duration-100 relative'
            >
              <span className='drop-shadow-md text-lg uppercase font-black'>Get Started</span>
              <div className='absolute top-1 left-4 w-2/3 h-1 bg-white/40 rounded-full' />
            </motion.button>
          </Link>
        </div>
      </div>

      {/* --- SOL PIXELISÉ (Optionnel : pour ancrer le bas de page) --- */}
      <div className="absolute bottom-0 w-full h-4 bg-[#4a5a42] opacity-30" />
    </section>
  );
};

export default About;