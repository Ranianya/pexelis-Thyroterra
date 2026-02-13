import React from 'react'
import { motion } from 'framer-motion'

const Infos = () => {
  // Animation de flottaison (douce montée et descente)
  const floatingAnim = (delay) => ({
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay
    }
  });

  // Animation d'entrée au scroll
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id='story' className='pb-20 font-pixel'>
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className='flex flex-wrap justify-center items-start gap-20 px-10'
      > 

        {/* 1. Daily: The Life Spot */}
        <motion.div 
          variants={fadeInUp}
          animate={floatingAnim(0)}
          className='bg-[#a8b6a4] mt-24 p-8 rounded-[30px] max-w-[350px] h-[400px] shadow-lg hover:shadow-2xl transition-shadow'
        > 
          <div className='flex flex-col gap-7 text-center items-center'>
            <div className='bg-[#99f6b4] p-2 rounded-full shadow-[0_0_15px_rgba(153,246,180,0.5)]'>
              <img src="/icon.png" alt="Icon" className='h-8 w-8' />
            </div>
            <h3 className='text-lg text-[#0a2310] leading-tight'>Daily: The Life Spot</h3>
            <p className='text-[12px] text-[#2d3a2c] leading-relaxed'>
              Every morning you take your medication, you nourish a Life Spot. A simple ritual that plants a seed of energy in your world.
            </p>
          </div>
        </motion.div>

        {/* 2. Monthly: The Floating Land */}
        <motion.div 
          variants={fadeInUp}
          animate={floatingAnim(0.5)} // Délai différent pour un effet organique
          className='bg-[#a8b6a4] mt-12 p-8 rounded-[30px] max-w-[350px] h-[400px] shadow-lg border-2 border-white/10 hover:shadow-2xl transition-shadow'
        > 
          <div className='flex flex-col gap-7 text-center items-center'>
            <div className='bg-[#99f6b4] p-2 rounded-full shadow-[0_0_15px_rgba(153,246,180,0.5)]'>
              <img src="/icon.png" alt="Icon" className='h-8 w-8' />
            </div>
            <h3 className='text-lg text-[#0a2310] leading-tight'>Monthly: The Floating Land</h3>
            <p className='text-[12px] text-[#2d3a2c] leading-relaxed'>
              After 30 days of consistency, your spots merge to form a unique Floating Island. Every month is a new territory to explore.
            </p>
          </div>
        </motion.div>

        {/* 3. Yearly: The Big Land */}
        <motion.div 
          variants={fadeInUp}
          animate={floatingAnim(1)} // Délai encore différent
          className='bg-[#a8b6a4] mt-24 p-8 rounded-[30px] max-w-[350px] h-[400px] shadow-lg hover:shadow-2xl transition-shadow'
        > 
          <div className='flex flex-col gap-7 text-center items-center'>
            <div className='bg-[#99f6b4] p-2 rounded-full shadow-[0_0_15px_rgba(153,246,180,0.5)]'>
              <img src="/icon.png" alt="Icon" className='h-8 w-8' />
            </div>
            <h3 className='text-lg text-[#0a2310] leading-tight'>Yearly: The Big Land</h3>
            <p className='text-[12px] text-[#2d3a2c] leading-relaxed'>
              Twelve islands unite into a Big Land. This continent represents one full year of effort, turning a chronic condition into a thriving ecosystem.
            </p>
          </div>
        </motion.div>

      </motion.div>
    </section>
  )
}

export default Infos