import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar2 from '../components/Navbar2';
import { useNavigate } from 'react-router-dom';
const Days = () => {
  const centralDays = [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20, 22, 23, 24, 25, 26, 27];
  
  // État pour savoir quels jours ont été "visités"

  const navigate = useNavigate(); // 2. Initialiser
  const [visitedDays, setVisitedDays] = useState([]);

  const handleDayClick = (dayId) => {
    // Optionnel : Sauvegarder dans le localStorage pour persistance
    if (!visitedDays.includes(dayId)) {
      setVisitedDays([...visitedDays, dayId]);
    }
    
    // 3. Rediriger vers le dashboard avec l'ID du jour
    // On ajoute un petit délai pour laisser l'animation du coeur se finir
    setTimeout(() => {
      navigate(`/dashboard/${dayId}`);
    }, 500);
  };

  return (
    <>
      <Navbar2 />
      <section id='days'>
        <div className='flex flex-col min-h-screen w-full overflow-hidden bg-[#5A7554] font-pixel pt-24 pb-10'>
          
          {/* HEADER */}
          <div className='flex justify-center mb-8'>
            <div className='bg-[#77cc66] p-1 rounded-[25px] shadow-lg max-w-2xl'>
              <div className='bg-white px-10 py-3 rounded-[20px] border-4 border-[#55aa44] text-center'>
                <div className='flex items-center justify-center gap-3'>
                  <img src="/arrow-pixel.png" alt="" className='h-4 w-auto rotate-180' />
                  <h1 className='text-lg font-pixel text-black leading-none'>
                    "Collect the hearts to nourish your land."
                  </h1>
                </div>
                <p className='text-[16px] font-pixel text-[#226622] font-bold'>
                  Hearts Collected: {visitedDays.length}/28
                </p>
              </div>
            </div>
          </div>

          {/* ZONE DE JEU */}
          <div className='relative flex-grow flex items-center justify-center px-20'>
            <div className='grid grid-cols-6 gap-x-6 gap-y-10'>
              {centralDays.slice().reverse().map((day) => (
                <DayBlock 
                  key={day} 
                  day={day} 
                  isVisited={visitedDays.includes(day)} 
                  onClick={() => handleDayClick(day)}
                />
              ))}
            </div>

            {/* JOURS SPECIAUX */}
            {[28, 21, 14, 7].map((specialDay, idx) => {
              const classes = [
                'absolute left-40 top-0', 
                'absolute right-40 top-1/4', 
                'absolute left-40 bottom-1/3', 
                'absolute right-40 bottom-0'
              ];
              return (
                <div key={specialDay} className={classes[idx]}>
                  <DayBlock 
                    day={specialDay} 
                    isSpecial 
                    isVisited={visitedDays.includes(specialDay)} 
                    onClick={() => handleDayClick(specialDay)} 
                  />
                </div>
              );
            })}

            {/* GUIDE */}
            <div className='absolute left-10 bottom-0 flex flex-col items-start'>
              <div className='relative w-64 p-4 mb-13 ml-50 '>
                <img src="/shapetalk.png" alt="" className='absolute inset-0 w-100 h-40 object-contain ' />
                <p className='relative z-10 text-[9px] leading-tight text-black text-center px-4'>
                  "The hearts are waiting! Click to <span className='text-orange-700 font-bold'>jump and collect</span> them."
                </p>
              </div>
              <img src="/leftdays.png" alt="character" className='h-24 w-auto ml-50 mb-0' />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const DayBlock = ({ day, isSpecial = false, isVisited, onClick }) => {
  return (
    <div 
      className='flex flex-col items-center group cursor-pointer relative'
      onClick={onClick}
    >
      <AnimatePresence>
        {/* LOGIQUE INVERSÉE : Le coeur est là SI PAS VISITÉ */}
        {!isVisited && (
          <motion.img 
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 1.5, filter: "brightness(2)" }} // Effet d'éclat quand il part
            transition={{ duration: 0.4 }}
            src="/Heart.png" 
            alt="heart" 
            className='h-6 w-auto absolute top-[-25px] z-30'
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {/* LE PERSONNAGE : Apparaît et RESTE SI VISITÉ */}
        {isVisited && (
          <motion.img 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: -22, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.4 }}
            src="/leftdays.png" 
            className='h-10 w-auto absolute z-20'
          />
        )}
      </AnimatePresence>
      
      {/* Barre d'état */}
      <div className={`w-16 h-2 border-x border-t border-black rounded-t-sm transition-colors duration-300 ${isVisited ? 'bg-[#77cc66]' : 'bg-[#4a8a3f]'}`} />
      
      {/* Bloc Terre */}
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className='relative w-16 h-12'
      >
        <img 
          src={isSpecial ? "/day.png" : "/day.png"} // Utilise tes images ici
          alt="land" 
          className={`w-full h-full transition-all ${isVisited ? 'brightness-110' : 'brightness-90'}`} 
        />
        
        <div className='absolute -bottom-5 w-full text-center'>
          <span className='text-[10px] text-white font-pixel uppercase drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]'>
            Day {day}
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default Days;