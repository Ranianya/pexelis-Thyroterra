import React from 'react';
import { Link } from 'react-router-dom'; 

const About = () => {
  return ( 
    <section id='hero' className='mt-14 w-full relative'>
      <div className='flex flex-col items-center justify-center font-pixel px-0 '>
        <div className='w-full max-w'>
          
          <div className='w-full relative h-15 pt-30'>
            <img src="/cloud.png" alt="Cloud" className='absolute left-10 h-12 md:h-16' />
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

        <div className='w-full relative h-15 pt-30'>
          <img src="/cloud.png" alt="Cloud" className='absolute right-10 h-12 md:h-16' />
        </div>

        <div className='flex justify-end pr-0 h-15'>
          <img src="/FloatingLeft.png" alt="" />
          <img src="/Top.png" alt="Forest" />  
        </div>
        
        <div className='mt-5 flex justify-center pb-10'>
          {/* Utilisation de Link pour la navigation */}
          <Link to="/signin">
            <button className='mt-10 bg-[#bcc7ba] text-[#0a2310] font-pixel px-10 py-2 
                               rounded-full border-[12px] border-[#607456] 
                               hover:scale-105 transition-transform duration-200 '>
              Get Start
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;