import React from 'react';
import { Link } from 'react-router-dom'; 
import { motion } from 'framer-motion'; // On importe motion

const About = () => {
  return ( 
    <section id='hero' className='mt-14 w-full relative overflow-hidden'> {/* overflow-hidden pour éviter le scroll horizontal */}
      <div className='flex flex-col items-center justify-center font-pixel px-0 '>
        <div className='w-full max-w'>
          
          {/* NUAGE 1 : Flotte de gauche à droite */}
          <div className='w-full relative h-15 pt-30'>
            <motion.img 
              src="/cloud.png" 
              alt="Cloud" 
              className='absolute left-10 h-12 md:h-16'
              animate={{ 
                x: [0, 50, 0], // Se déplace de 50px vers la droite
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          <div className='flex justify-end'>
            <img className='pr-10 h-15' src="/TreePine.png" alt="tree" />
            <img className='pr-5 h-15' src="/TreeRound.png" alt="tree" />
          </div>

          <div className='flex justify-end pr-0 h-15'>
            <img src="/FloatingLeft.png" alt="" />
            <img src="/Top.png" alt="Forest" />  
          </div>

          <div className='text-[27px] leading-relaxed items-center text-center pt-20'>
            <p>
              <span className='text-white'>Welcome to </span>
              <span className='text-[#0a2310]'>the Forest Land.</span>
            </p>
            <p>
              <span className='text-white'>Your </span>
              <span className='text-[#0a2310]'>health journey</span>
              <span className='text-white'> starts</span>
            </p>
            <p className='text-white '>here</p>
          </div>
        </div>

        <div className='mt-12 text-white text-[15px] opacity-90 '>
          <p>"Your journey isn't just a calendar; it's a masterpiece in progress."</p>
        </div>

        {/* NUAGE 2 : Flotte de droite à gauche (effet miroir) */}
        <div className='w-full relative h-15 pt-30'>
          <motion.img 
            src="/cloud.png" 
            alt="Cloud" 
            className='absolute right-10 h-12 md:h-16' 
            animate={{ 
              x: [0, -40, 0], // Se déplace vers la gauche
              y: [0, 10, 0]   // Petit mouvement vertical en plus
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className='flex justify-start h-15 w-full'>
          <img src="/homeleft.png" alt="" className='h-50 ml-0' />
        </div>
        
       <div className='mt-5 flex justify-center pb-10'>
  <Link to="/signin">
    <motion.button 
      // Animation constante : le bouton "respire" (pulse)
      animate={{ 
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      // Interaction survol : il s'agrandit légèrement
      whileHover={{ 
        scale: 1.1,
        filter: "brightness(1.1)",
      }}
      // Interaction clic : il s'écrase (style bouton arcade)
      whileTap={{ 
        scale: 0.9,
        y: 5 // Effet d'enfoncement
      }}
      className='mt-10 bg-[#bcc7ba] text-[#0a2310] font-pixel px-10 py-2 
                 rounded-full border-[12px] border-[#607456] 
                 shadow-[0_8px_0_0_#4a5a42] active:shadow-none
                 transition-all duration-100 relative'
    >
      <span className='drop-shadow-md'>Get Started</span>
      
      {/* Petit reflet brillant style jeu rétro */}
      <div className='absolute top-1 left-4 w-2/3 h-1 bg-white/30 rounded-full' />
    </motion.button>
  </Link>
</div>
      </div>
    </section>
  );
};

export default About;