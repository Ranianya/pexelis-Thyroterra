import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar2 from '../components/Navbar2';
import api from '../api/axios';

const Days = () => {
  const { spotId } = useParams();
  const navigate = useNavigate();

  const [visitedDays, setVisitedDays] = useState([]);
  const [loading, setLoading] = useState(true);

  // Layout configuration for the pixel grid
  const centralDays = [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20, 22, 23, 24, 25, 26, 27];
  const specialDays = [28, 21, 14, 7];
  const guideText = "The hearts are waiting! Click to jump and collect them.";

  // --- API: Fetch Progress ---
  useEffect(() => {
    const fetchProgress = async () => {
      // ✅ Guard clause: prevents calling API with "undefined" or null spotId
      if (!spotId || spotId === 'undefined') {
        console.warn("Map Sync: No spotId provided yet.");
        return;
      }

      try {
        setLoading(true);
        // ✅ Uses template literal to ensure clean URL: /api/monthly/progress/1
        const response = await api.get(`/monthly/progress/${spotId}`);
        
        // ✅ Ensure visitedDays is always an array, even if backend sends null
        setVisitedDays(Array.isArray(response.data) ? response.data : []); 
      } catch (err) {
        // ✅ Enhanced logging to identify 401 (Auth) vs 404 (Route)
        if (err.response) {
          console.error(`Map Sync Error (${err.response.status}):`, err.response.data);
          // If 401, you might want to redirect to login
          if (err.response.status === 401) navigate('/login');
        } else {
          console.error("Map Sync Error (Network):", err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [spotId, navigate]);

  // --- Navigation: Go to Checklist ---
  const handleDayClick = (dayId) => {
    // Optimistic UI: show the character jumping immediately
    if (!visitedDays.includes(dayId)) {
      setVisitedDays(prev => [...prev, dayId]);
    }
    
    // ✅ Passes dayId to Checklist via state (no URL clutter)
    setTimeout(() => {
      navigate(`/checklist`, { state: { selectedDay: dayId, selectedSpot: spotId } });
    }, 500);
  };

  if (loading) return (
    <div className="min-h-screen bg-[#5A7554] flex items-center justify-center font-pixel text-white">
      <motion.div animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
        SYNCING LAND...
      </motion.div>
    </div>
  );

  return (
    <>
      <Navbar2 />
      <section id="days">
        <div className="flex flex-col min-h-screen w-full overflow-hidden bg-[#5A7554] font-pixel pt-24 pb-10">

          {/* --- HEADER STATS --- */}
          <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className='flex justify-center mb-8'>
            <div className='bg-[#77cc66] p-1 rounded-[25px] shadow-lg max-w-2xl'>
              <div className='bg-white px-10 py-3 rounded-[20px] border-4 border-[#55aa44] text-center'>
                <div className='flex items-center justify-center gap-3'>
                  <img src="/arrow-pixel.png" alt="" className='h-4 w-auto rotate-180' />
                  <h1 className='text-lg font-pixel text-black leading-none'>
                    "Collect the hearts to nourish your land."
                  </h1>
                </div>
                <p className='text-[16px] font-pixel text-[#226622] font-bold mt-1'>
                  Hearts Collected: {visitedDays.length}/28
                </p>
              </div>
            </div>
          </motion.div>

          {/* --- GAME MAP AREA --- */}
          <div className='relative flex-grow flex items-center justify-center px-20'>

            {/* CENTRAL GRID */}
            <motion.div className='grid grid-cols-6 gap-x-6 gap-y-10'
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.03 } } }}
            >
              {centralDays.slice().reverse().map(day => (
                <DayBlock 
                  key={day} 
                  day={day} 
                  isVisited={visitedDays.includes(day)} 
                  onClick={() => handleDayClick(day)}
                />
              ))}
            </motion.div>

            {/* SPECIAL MARKER DAYS */}
            {specialDays.map((specialDay, idx) => {
              const positions = [
                'absolute left-40 top-0', 
                'absolute right-40 top-1/4', 
                'absolute left-40 bottom-1/3', 
                'absolute right-40 bottom-0'
              ];
              return (
                <div key={specialDay} className={positions[idx]}>
                  <DayBlock 
                    day={specialDay} 
                    isVisited={visitedDays.includes(specialDay)} 
                    onClick={() => handleDayClick(specialDay)} 
                  />
                </div>
              );
            })}

            {/* CHARACTER & DIALOGUE */}
            <div className='absolute left-10 bottom-0 flex flex-col items-start'>
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className='relative w-64 p-4 mb-4'>
                <img src="/shapetalk.png" alt="" className='absolute inset-0 w-full h-40 object-contain' />
                <div className='relative z-10 flex items-center justify-center h-full pt-4 px-6'>
                  <motion.p className='text-[10px] leading-tight text-black text-center font-bold'>
                    {guideText}
                  </motion.p>
                </div>
              </motion.div>

              <motion.img 
                src="/leftdays.png" 
                alt="character" 
                className='h-24 w-auto' 
                animate={{ y: [0, -4, 0] }} 
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} 
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// --- SUB-COMPONENT: INDIVIDUAL DAY BLOCK ---
const DayBlock = ({ day, isVisited, onClick }) => {
  return (
    <motion.div 
      variants={{ hidden: { opacity: 0, scale: 0 }, visible: { opacity: 1, scale: 1 } }}
      className='flex flex-col items-center group cursor-pointer relative'
      onClick={onClick}
    >
      <AnimatePresence>
        {!isVisited && (
          <motion.img 
            initial={{ opacity: 1, scale: 1 }}
            animate={{ y: [0, -8, 0] }}
            exit={{ opacity: 0, y: -50, scale: 1.5, filter: "brightness(2)" }}
            transition={{ y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }, exit: { duration: 0.4 } }}
            src="/Heart.png" 
            className='h-6 w-auto absolute top-[-25px] z-30'
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isVisited && (
          <motion.img 
            initial={{ y: -100, opacity: 0 }} 
            animate={{ y: -22, opacity: 1 }} 
            src="/leftdays.png" 
            className='h-10 w-auto absolute z-20' 
          />
        )}
      </AnimatePresence>
      
      <div className={`w-16 h-2 border-x border-t border-black rounded-t-sm transition-colors duration-300 ${isVisited ? 'bg-[#77cc66]' : 'bg-[#4a8a3f]'}`} />
      
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className='relative w-16 h-12'>
        <img src="/day.png" alt="platform" className={`w-full h-full transition-all ${isVisited ? 'brightness-110' : 'brightness-90'}`} />
        <div className='absolute -bottom-5 w-full text-center'>
          <span className='text-[10px] text-white font-pixel uppercase drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]'>
            Day {day}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Days;