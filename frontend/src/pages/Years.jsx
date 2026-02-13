import React from 'react'
import { Link } from 'react-router-dom' // Importation du Link
import Navbar2 from '../components/Navbar2'

const Years = () => {
  return (
    <section id='years' className='bg-[#5A7554] relative w-full min-h-[800px] overflow-hidden flex flex-col font-pixel'>
      <Navbar2/>
      
      {/* 1. LES NUAGES */}
      <div className='w-full relative h-32'> 
        <img 
          src="/cloud.png" 
          alt="Cloud" 
          className='absolute top-10 left-10 h-12 md:h-16 z-10 animate-pulse' 
        />
        <img 
          src="/cloud.png" 
          alt="Cloud" 
          className='absolute top-20 right-5 h-10 md:h-14 z-10 scale-x-[-1] opacity-80' 
        />
      </div>

      {/* BANDEAU "THE FOREST LAND" */}
      <div className='flex justify-center z-20 mt-5'>
        <div className='bg-[#77cc66] p-1 rounded-[25px] shadow-lg'>
          <div className='bg-white px-10 py-4 rounded-[20px] border-4 border-[#55aa44] text-center'>
            <div className='flex items-center justify-center gap-3 mb-1'>
              <img src="/arrow-pixel.png" alt="" className='h-5 w-auto' />
              <h1 className='text-3xl font-pixel text-black uppercase tracking-tight'>
                The Forest Land
              </h1>
            </div>
            <p className='text-[14px] font-pixel text-[#226622] leading-tight'>
              every "Land" represents a Full year of <br />
              dedicated effort and resilience
            </p>
          </div>
        </div>
      </div>

     {/* 2. DÉCOR DE FOND ET BLOBS CLIQUABLES */}
<div className='absolute bottom-0 left-95 z-10'> {/* Changé z-0 en z-10 */}
  <img 
    src="/years.png" 
    alt="background landscape" 
    className='h-160 w-[800px] block opacity-80' 
  />

  {/* Blob 1 - On force le z-50 pour qu'il soit au-dessus de tout */}
  <Link 
    to="/months" 
    className='absolute bottom-[5%] left-[45%] z-50 w-24 h-16 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer pointer-events-auto'
  >
    <img src="/Blob.png" alt="" className='absolute inset-0 w-full h-full object-contain' />
    <span className='relative text-black text-xl font-pixel pt-2'>1</span>
  </Link>

  {/* Blob 2 */}
  <Link 
    to="/months" 
    className='absolute bottom-[25%] left-[67%] z-50 w-20 h-14 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer pointer-events-auto'
  >
    <img src="/Blob.png" alt="" className='absolute inset-0 w-full h-full object-contain' />
    <span className='relative text-black text-lg font-pixel pt-1'>2</span>
  </Link>

  {/* Blob 3 */}
  <Link 
    to="/months" 
    className='absolute bottom-[48%] left-[70%] z-50 w-16 h-11 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer pointer-events-auto'
  >
    <img src="/Blob.png" alt="" className='absolute inset-0 w-full h-full object-contain' />
    <span className='relative text-black text-base font-pixel'>3</span>
  </Link>

  {/* Blob 4 */}
  <Link 
    to="/months" 
    className='absolute bottom-[58%] left-[48%] z-50 w-14 h-8 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer pointer-events-auto'
  >
    <img src="/Blob.png" alt="" className='absolute inset-0 w-full h-full object-contain' />
    <span className='relative text-black text-sm font-pixel'>4</span>
  </Link>
</div>

      {/* 3. LE CONTENU AU SOL (Avec la bulle du guide) */}
      <div className='mt-auto relative z-10 w-full'>
        <div className='absolute bottom-[110px] left-5 w-[320px] h-[200px] flex items-center justify-center p-6 text-center z-30'>
          <img src="/shapetalk.png" alt="" className='absolute inset- mb-60 w-full h-100 object-contain' />
          <p className='relative font-pixel text-[11px] leading-tight text-black mb-80'>
            "Hi! I'm your <span className='text-[#8b4444]'>Forest Guide</span>. Let's <br />
            begin a <span className='text-[#226622]'>healthy year</span> <br />
            together. Your journey to balance <br />
            starts <br />
            with a single choice: <br />
            <span className='text-[#8b4444]'>Select a Land for this Year.</span>"
          </p>
        </div>

        <div className='flex justify-between items-end w-full'>
          <div className='relative flex items-end'>
            <img 
              src="/person.png" 
              alt="character" 
              className='absolute bottom-[10px] left-6 h-28 w-auto z-20 mb-18' 
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

export default Years