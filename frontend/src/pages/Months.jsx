import React from 'react';
import { Link } from 'react-router-dom'; 
import Navbar2 from '../components/Navbar2';
import { motion } from 'framer-motion';

const Months = () => {
  const spots = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Spot${i + 1}`,
    locked: i !== 0,
  }));

  const guideText = "To conquer the year, we must first map the month. Select a spot in your land to begin this 30-day expedition";

  return (
    <>
      <Navbar2/>
      <div className='flex flex-col min-h-screen w-full overflow-hidden bg-[#5A7554] font-pixel relative'>
        
        {/* --- DECORATION --- */}
        <motion.img 
          src="/cloud.png" alt="cloud" 
          className='absolute top-32 left-10 w-32 z-0 opacity-80' 
          animate={{ x: [-10, 20, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className='flex-grow flex items-center justify-center w-full relative pt-20 pb-12 z-10'>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className='relative w-[90%] max-w-[1000px] h-[650px] flex flex-col items-center bg-[#D9EAD3] border-[6px] border-[#A9C4A1] rounded-sm shadow-2xl'
          >
            <div className='relative z-10 flex flex-col items-center w-full h-full pt-10 px-6'>
              <div className='flex items-center gap-4 mb-8'>
                 <h2 className='text-4xl text-black uppercase tracking-[0.2em] font-bold'>The Land 1</h2>
              </div>

              <motion.div 
                className='flex flex-wrap justify-center gap-x-16 gap-y-6 max-w-[850px]'
                initial="hidden" animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              >
                {spots.map((spot, index) => {
                  const isClickable = !spot.locked;
                  return (
                    <motion.div 
                      key={spot.id} 
                      variants={{
                        hidden: { opacity: 0, scale: 0.5, y: 20 },
                        visible: { opacity: 1, scale: 1, y: 0 }
                      }}
                    >
                      {isClickable ? (
                        /* ✅ FIXED: Navigates to checklist and passes current spotId */
                        <Link to="/checklist" state={{ selectedSpot: spot.id, selectedDay: 1 }}>
                          <motion.div className="flex flex-col items-center cursor-pointer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                            <div className='relative w-32 h-20 rounded-[40%] overflow-hidden border-2 border-[#888] shadow-lg bg-[#ADD8E6]'>
                              <img src={`/spot${spot.id}.png`} alt="" className="w-full h-full object-cover" />
                            </div>
                            <span className='text-[14px] mt-2 text-black font-bold'>Spot {spot.id}</span>
                          </motion.div>
                        </Link>
                      ) : (
                        <div className='flex flex-col items-center opacity-70 grayscale'>
                          <div className='relative w-32 h-20 rounded-[40%] overflow-hidden border-2 border-[#888] shadow-lg bg-gray-400'>
                            <div className='absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px]'>
                              <img src="/lock.png" alt="locked" className='h-8' />
                            </div>
                          </div>
                          <span className='text-[14px] mt-2 text-black font-bold'>Spot {spot.id}</span>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Months;