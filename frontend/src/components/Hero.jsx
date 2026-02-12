import React from 'react'
import { useEffect,useState } from 'react'


const PixelText = ({ content, greenWords = [], blackWords = [] }) => {
  const words = content.split(' ');

  return (
    <section id='about'>
    <p>
      {words.map((word, index) => {
        // On nettoie la ponctuation pour la comparaison
        const cleanWord = word.replace(/[.,]/g, "");
        
        let colorClass = "text-white"; // Couleur de base

        if (blackWords.includes(cleanWord)) {
          colorClass = "text-black";
        } else if (greenWords.includes(cleanWord)) {
          colorClass = "text-[#065C16]"; // Vert foncé + gras comme sur l'image
        }

        return (
          <span key={index} className={`${colorClass} inline-block mr-1`}>
            {word}
          </span>
        );
      })}
    </p>
    </section>
  );
};


const Hero = () => {

    const storyText = "ThyroTerra transforms the lifetime challenge of treatment adherence into an epic journey of global discovery. Patients enter a vast digital wilderness where every Land represents a full year of dedicated effort and resilience.";

  return (
    <section id='about' className='  w-full relative  pb-10 font-pixel'>
        <div>

            <div className='text-[40px] leading-relaxed items-center text-center pt-20 font-pixel'>
             <span className='text-[#E4903E]'>our story </span>              
            </div>


            <div className='mt-12 text-black font-pixel items-center text-center text-[15px] opacity-90 '>
               <p>Your Thyroid, Your Forest: The Science of Balance.</p>
            </div>


        

           <div className='mt-12 flex justify-center px-6'>
        <div className='max-w-3xl bg-[#8ca386]/40 p-10 rounded-[40px] border-2 border-white/10 shadow-inner'>
          <div className='text-[22px] leading-relaxed text-center'>
            <PixelText 
              content={storyText}
              blackWords={["ThyroTerra"]}
              greenWords={["treatment", "adherence", "digital", "wilderness", "Land", "full", "year"]}
            />
          </div>
        </div>
      </div>

        </div>
    </section>
  )
}

export default Hero