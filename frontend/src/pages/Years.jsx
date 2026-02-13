import React from 'react'
import { Link } from 'react-router-dom' 
import Navbar2 from '../components/Navbar2'
import { motion } from 'framer-motion'

const Years = () => {
  // Texte à animer
  const sentence = "Hi! I'm your Forest Guide. Let's begin a healthy year together. Your journey to balance starts with a single choice: Select a Land for this Year.";

  // Variantes pour l'animation lettre par lettre
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      transition: {
        staggerChildren: 0.04, // Vitesse de frappe
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <section id='years' className='bg-[#5A7554] relative w-full min-h-[800px] overflow-hidden flex flex-col font-pixel'>
      <Navbar2/>
      
      {/* 1. LES NUAGES */}
      <div className='w-full relative h-32'> 
        <motion.img 
          src="/cloud.png" 
          alt="Cloud" 
          className='absolute top-10 left-10 h-12 md:h-16 z-10' 
          animate={{ x: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.img 
          src="/cloud.png" 
          alt="Cloud" 
          className='absolute top-20 right-5 h-10 md:h-14 z-10 scale-x-[-1] opacity-80' 
          animate={{ x: [0, -25, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* BANDEAU "THE FOREST LAND" */}
      <div className='flex justify-center z-20 mt-5'>
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className='bg-[#77cc66] p-1 rounded-[25px] shadow-lg'
        >
          <div className='bg-white px-10 py-4 rounded-[20px] border-4 border-[#55aa44] text-center'>
            <div className='flex items-center justify-center gap-3 mb-1'>
              <motion.img 
                src="/arrow-pixel.png" 
                alt="" 
                className='h-5 w-auto' 
                animate={{ x: [-4, 4, -4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <h1 className='text-3xl font-pixel text-black uppercase tracking-tight'>
                The Forest Land
              </h1>
            </div>
            <p className='text-[14px] font-pixel text-[#226622] leading-tight'>
              every "Land" represents a Full year of <br />
              dedicated effort and resilience
            </p>
          </div>
        </motion.div>
      </div>

      {/* 2. DÉCOR DE FOND ET BLOBS CLIQUABLES (Tes positions originales) */}
      <div className='absolute bottom-0 left-95 z-10'>
        <img 
          src="/years.png" 
          alt="background landscape" 
          className='h-160 w-[800px] block opacity-80' 
        />

        {/* Blob 1 */}
        <Link to="/months" className='absolute bottom-[5%] left-[45%] z-50 w-24 h-16 flex items-center justify-center pointer-events-auto'>
          <motion.div 
            className='relative w-full h-full flex items-center justify-center'
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.2 }}
          >
            <img src="/Blob.png" alt="" className='absolute inset-0 w-full h-full object-contain drop-shadow-md' />
            <span className='relative text-black text-xl font-pixel pt-2'>1</span>
          </motion.div>
        </Link>

        {/* Blob 2 */}
        <Link to="/months" className='absolute bottom-[25%] left-[67%] z-50 w-20 h-14 flex items-center justify-center pointer-events-auto'>
          <motion.div 
            className='relative w-full h-full flex items-center justify-center'
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            whileHover={{ scale: 1.2 }}
          >
            <img src="/Blob.png" alt="" className='absolute inset-0 w-full h-full object-contain drop-shadow-md' />
            <span className='relative text-black text-lg font-pixel pt-1'>2</span>
          </motion.div>
        </Link>

        {/* Blob 3 */}
        <Link to="/months" className='absolute bottom-[48%] left-[70%] z-50 w-16 h-11 flex items-center justify-center pointer-events-auto'>
          <motion.div 
            className='relative w-full h-full flex items-center justify-center'
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            whileHover={{ scale: 1.2 }}
          >
            <img src="/Blob.png" alt="" className='absolute inset-0 w-full h-full object-contain drop-shadow-md' />
            <span className='relative text-black text-base font-pixel'>3</span>
          </motion.div>
        </Link>

        {/* Blob 4 */}
        <Link to="/months" className='absolute bottom-[58%] left-[48%] z-50 w-14 h-8 flex items-center justify-center pointer-events-auto'>
          <motion.div 
            className='relative w-full h-full flex items-center justify-center'
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
            whileHover={{ scale: 1.2 }}
          >
            <img src="/Blob.png" alt="" className='absolute inset-0 w-full h-full object-contain drop-shadow-md' />
            <span className='relative text-black text-sm font-pixel'>4</span>
          </motion.div>
        </Link>
      </div>

      {/* 3. LE CONTENU AU SOL (Bulle avec texte lettre par lettre) */}
      <div className='mt-auto relative z-10 w-full'>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className='absolute bottom-[110px] left-5 w-[320px] h-[200px] flex items-center justify-center p-6 text-center z-30'
        >
          <img src="/shapetalk.png" alt="" className='absolute mb-60 w-full h-100 object-contain' />
          
          <motion.p 
            className='relative font-pixel text-[11px] leading-tight text-black mb-80 px-4'
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {sentence.split("").map((char, index) => (
              <motion.span key={index} variants={letterVariants}>
                {char}
              </motion.span>
            ))}
          </motion.p>
        </motion.div>

        <div className='flex justify-between items-end w-full'>
          <div className='relative flex items-end'>
            <motion.img 
              src="/person.png" 
              alt="character" 
              className='absolute bottom-[10px] left-6 h-28 w-auto z-20 mb-18' 
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <img src="/left.png" alt="left element" className='h-auto relative z-10' />
          </div>

          <div className='flex items-end'>
            <img src="/right.png" alt="right element" className='h-auto' />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Years;