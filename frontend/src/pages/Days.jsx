import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // ✅ Import fixed
import Navbar2 from '../components/Navbar2';
import { useParams, useNavigate } from 'react-router-dom';

const Days = () => {
  const { spotId } = useParams();
  const navigate = useNavigate();
  const [visitedDays, setVisitedDays] = useState([]);
  const centralDays = [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20, 22, 23, 24, 25, 26, 27];

  const handleDayClick = (day) => {
    if (!visitedDays.includes(day)) setVisitedDays([...visitedDays, day]);
    setTimeout(() => navigate(`/dashboard/${day}`), 500);
  };

  return (
    <>
      <Navbar2 />
      <div className='min-h-screen bg-[#5A7554] font-pixel pt-24 px-10'>
        <div className='grid grid-cols-6 gap-6 max-w-4xl mx-auto'>
          {centralDays.slice().reverse().map((day) => (
            <DayBlock 
              key={day} 
              day={day} 
              isVisited={visitedDays.includes(day)} 
              onClick={() => handleDayClick(day)} 
            />
          ))}
        </div>
        <div className='fixed bottom-10 left-10'>
          <img src="/leftdays.png" className='h-24 animate-bounce' alt="Guide" />
        </div>
      </div>
    </>
  );
};

const DayBlock = ({ day, isVisited, onClick }) => (
  <motion.div onClick={onClick} className='relative cursor-pointer flex flex-col items-center'>
    <AnimatePresence>
      {!isVisited && <motion.img exit={{ opacity: 0, y: -20 }} src="/Heart.png" className='h-6 absolute -top-6' />}
      {isVisited && <motion.img initial={{ y: -50 }} animate={{ y: -20 }} src="/leftdays.png" className='h-8 absolute' />}
    </AnimatePresence>
    <div className={`w-12 h-10 rounded-t-lg ${isVisited ? 'bg-green-400' : 'bg-green-800'}`}>
       <span className='text-[8px] text-white flex justify-center mt-2'>Day {day}</span>
    </div>
  </motion.div>
);

export default Days;