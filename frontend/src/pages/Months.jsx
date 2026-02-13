import React, { useEffect, useState } from 'react'; // Added useEffect and useState
import { Link } from 'react-router-dom';
import Navbar2 from '../components/Navbar2';
import { motion } from 'framer-motion';

const Months = () => {
  // 1. State to hold database data
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Fetch data from Backend
  useEffect(() => {
    const fetchLands = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/lands");
        const data = await response.json();
        setLands(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching lands:", error);
        setLoading(false);
      }
    };
    fetchLands();
  }, []);

  // Use the first land from DB, or fallback to empty array if still loading
  const currentLand = lands[0] || { name: "Loading...", spots: [] };
  const spots = currentLand.spots || [];


  if (loading) return <div className="bg-[#5A7554] min-h-screen flex items-center justify-center text-white font-pixel">Loading Map...</div>;

  return (
    <>
    <Navbar2/>
    <div className='flex flex-col min-h-screen w-full overflow-hidden bg-[#5A7554] font-pixel relative'>
      
      {/* DECORATION: NUAGES */}
      <motion.img 
        src="/cloud.png" alt="cloud" 
        className='absolute top-32 left-10 w-32 z-0 opacity-80' 
        animate={{ x: [-10, 20, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 1. SECTION CENTRALE */}
      <div className='flex-grow flex items-center justify-center w-full relative pt-20 pb-12 z-10'>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className='relative w-[90%] max-w-[1000px] h-[650px] flex flex-col items-center bg-[#D9EAD3] border-[6px] border-[#A9C4A1] rounded-sm shadow-2xl'
        >
          <div className='absolute inset-2 border-2 border-white/20 pointer-events-none'></div>

          <div className='relative z-10 flex flex-col items-center w-full h-full pt-10 px-6'>
            <div className='flex items-center gap-4 mb-8'>
               <motion.img 
                src="/triangle-pixel.png" alt="" className='h-8 w-auto' 
                animate={{ x: [-4, 4, -4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
               />
               {/* 3. DYNAMIC TITLE FROM DB */}
               <h2 className='text-4xl text-black uppercase tracking-[0.2em] font-bold'>{currentLand.name}</h2>
            </div>

            <motion.div 
              className='flex flex-wrap justify-center gap-x-16 gap-y-6 max-w-[850px]'
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
              {/* 4. RENDER DYNAMIC SPOTS FROM DB */}
              {spots.map((spot, index) => {
                // Logic: Only the first spot is unlocked by default, or use a 'locked' field from DB if you have one
                const isClickable = index === 0 || spot.isUnlocked; 
                
                return (
                  <motion.div 
                    key={spot.id} 
                    variants={{
                      hidden: { opacity: 0, scale: 0.5, y: 20 },
                      visible: { opacity: 1, scale: 1, y: 0 }
                    }}
                    className={`${(index >= 3 && index <= 5) || (index >= 9) ? 'translate-y-2' : ''}`}
                  >
                    {isClickable ? (
                      <Link to={`/days/${spot.id}`}>
                        <motion.div className="flex flex-col items-center cursor-pointer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                          <div className='relative w-32 h-20 rounded-[40%] overflow-hidden border-2 border-[#888] shadow-lg bg-[#ADD8E6]'>
                            {/* Assumes image names match spot IDs or types */}
                            <img src={`/spot${index + 1}.png`} alt="" className="w-full h-full object-cover" />
                          </div>
                          <span className='text-[14px] mt-2 text-black font-bold tracking-tight'>{spot.name}</span>
                        </motion.div>
                      </Link>
                    ) : (
                      <div className='flex flex-col items-center opacity-70 grayscale'>
                        <div className='relative w-32 h-20 rounded-[40%] overflow-hidden border-2 border-[#888] shadow-lg bg-gray-400'>
                          <div className='absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px]'>
                            <img src="/lock.png" alt="locked" className='h-8' />
                          </div>
                        </div>
                        <span className='text-[14px] mt-2 text-black font-bold tracking-tight'>{spot.name}</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Quote and button section stays same */}
            <div className='mt-auto pb-8 flex flex-col items-center'>
                <div className='flex items-center gap-3 mb-4'>
                   <img src="/triangle-pixel.png" alt="" className='h-4 rotate-90' />
                   <p className='text-lg text-black italic font-medium'>"Twelve months. Twelve lands. One Balanced you"</p>
                </div>
            </div>
          </div>
        </motion.div>

        {/* GUIDE ET BULLE section stays same */}
        <div className='absolute left-6 bottom-10 z-30 flex flex-col items-start'>
          {/* ... Guide code ... */}
        </div>
      </div>

      {/* SOL section stays same */}
    </div>
    </>
  )
}

export default Months;