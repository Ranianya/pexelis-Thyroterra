import React from 'react'
import { motion } from 'framer-motion'

const Infos = () => {
  // Animation de flottaison plus fluide
  const floatingAnim = (delay) => ({
    y: [0, -15, 0],
    rotate: [-1, 1, -1], // Ajout d'une micro-rotation pour le style "objet flottant"
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay
    }
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1, ease: "backOut" } 
    }
  };

  return (
    <section id='story' className='pb-32 font-pixel relative overflow-hidden'>
      
      {/* --- DÉCOR DE FOND : Rayons de lumière (God Rays) --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute -top-[10%] left-[10%] w-[200px] h-[600px] bg-white rotate-[35deg] blur-[100px]" />
        <div className="absolute -top-[10%] left-[50%] w-[150px] h-[600px] bg-white rotate-[35deg] blur-[80px]" />
      </div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className='flex flex-wrap justify-center items-center gap-12 lg:gap-20 px-10'
      > 

        {/* 1. Daily: The Life Spot */}
        <motion.div 
          variants={fadeInUp}
          animate={floatingAnim(0)}
          whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
          className='bg-[#a8b6a4] mt-24 p-8 rounded-[40px] max-w-[320px] min-h-[420px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-b-8 border-r-8 border-[#8ca386] relative group'
        > 
          {/* Badge de rareté style RPG */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#99f6b4] text-[#0a2310] px-4 py-1 rounded-full text-[10px] font-black border-2 border-white shadow-md uppercase">Common Quest</div>

          <div className='flex flex-col gap-7 text-center items-center h-full justify-center'>
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className='bg-[#99f6b4] p-3 rounded-2xl shadow-[0_0_20px_rgba(153,246,180,0.6)]'
            >
              <img src="/icon.png" alt="Icon" className='h-10 w-10 object-contain' />
            </motion.div>
            <h3 className='text-xl text-[#0a2310] font-black leading-tight uppercase tracking-tight'>Daily: <br/>The Life Spot</h3>
            <p className='text-[13px] text-[#2d3a2c] leading-relaxed font-bold'>
              Every morning you take your medication, you nourish a <span className="text-[#065C16]">Life Spot</span>. A simple ritual that plants a seed of energy in your world.
            </p>
          </div>
        </motion.div>

        {/* 2. Monthly: The Floating Land */}
        <motion.div 
          variants={fadeInUp}
          animate={floatingAnim(0.5)}
          whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
          className='bg-[#98a894] mt-4 lg:mt-12 p-8 rounded-[40px] max-w-[320px] min-h-[420px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-b-8 border-r-8 border-[#7d8c79] relative'
        > 
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#60a5fa] text-white px-4 py-1 rounded-full text-[10px] font-black border-2 border-white shadow-md uppercase tracking-wider">Rare Territory</div>

          <div className='flex flex-col gap-7 text-center items-center h-full justify-center'>
            <div className='bg-blue-300 p-3 rounded-2xl shadow-[0_0_20px_rgba(147,197,253,0.6)] animate-pulse'>
              <img src="/icon.png" alt="Icon" className='h-10 w-10 object-contain' />
            </div>
            <h3 className='text-xl text-[#0a2310] font-black leading-tight uppercase tracking-tight'>Monthly: <br/>The Floating Land</h3>
            <p className='text-[13px] text-[#2d3a2c] leading-relaxed font-bold'>
              After 30 days of consistency, your spots merge to form a unique <span className="text-blue-900">Floating Island</span>. Every month is a new territory to explore.
            </p>
          </div>
        </motion.div>

        {/* 3. Yearly: The Big Land */}
        <motion.div 
          variants={fadeInUp}
          animate={floatingAnim(1)}
          whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
          className='bg-[#899985] mt-24 p-8 rounded-[40px] max-w-[320px] min-h-[420px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-b-8 border-r-8 border-[#6b7a67] relative'
        > 
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#fbbf24] text-[#0a2310] px-4 py-1 rounded-full text-[10px] font-black border-2 border-white shadow-md uppercase tracking-wider">Legendary Achievement</div>

          <div className='flex flex-col gap-7 text-center items-center h-full justify-center'>
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }} 
              transition={{ duration: 2, repeat: Infinity }}
              className='bg-yellow-300 p-3 rounded-2xl shadow-[0_0_30px_rgba(251,191,36,0.8)]'
            >
              <img src="/icon.png" alt="Icon" className='h-10 w-10 object-contain' />
            </motion.div>
            <h3 className='text-xl text-[#0a2310] font-black leading-tight uppercase tracking-tight'>Yearly: <br/>The Big Land</h3>
            <p className='text-[13px] text-[#2d3a2c] leading-relaxed font-bold'>
              Twelve islands unite into a <span className="text-orange-900">Big Land</span>. This continent represents one full year of effort, turning chronic condition into a thriving ecosystem.
            </p>
          </div>
        </motion.div>

      </motion.div>

      {/* --- ÉLÉMENT DE NAVIGATION (Indicateur de scroll) --- */}
      <motion.div 
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mt-20 text-center text-white text-[10px] uppercase tracking-[0.3em]"
      >
        ••• scroll to explore more •••
      </motion.div>
    </section>
  )
}

export default Infos