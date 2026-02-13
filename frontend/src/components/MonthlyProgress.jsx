
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, 
  Stethoscope, 
  Droplets, 
  Smile, 
  Apple, 
  Syringe, 
  RotateCcw,
  Heart,
  Cloud
} from 'lucide-react';


import { view } from 'framer-motion/client';

const MonthlyProgress = ({ monthlyStats }) => {

  const stats = useMemo(() => monthlyStats || [
    { id: 'activities', label: 'Activities', icon: <Activity size={18} />, progress: 40, position: 'top-left' },
    { id: 'doctor', label: 'Doctor', icon: <Stethoscope size={18} />, progress: 90, position: 'top-right' },
    { id: 'meds', label: 'Meds logged', icon: <Syringe size={18} />, progress: 85, position: 'middle-left' },
    { id: 'water', label: 'Water', icon: <Droplets size={18} />, progress: 75, position: 'middle-right' },
    { id: 'eat', label: 'Eat', icon: <Apple size={18} />, progress: 95, position: 'bottom-left' },
    { id: 'moods', label: 'Moods', icon: <Smile size={18} />, progress: 100, position: 'bottom-right' },
  ], [monthlyStats]);

  const globalProgress = useMemo(() =>
    stats.reduce((acc, s) => acc + s.progress, 0) / stats.length
  , [stats]);

  const getPositionClasses = (pos) => {
    const base = "absolute flex flex-col items-center z-20";
    const positions = {
      'top-left': `${base} top-[4%] left-[2%] sm:left-[10%]`,
      'top-right': `${base} top-[4%] right-[2%] sm:right-[10%]`,
      'middle-left': `${base} top-[38%] left-[1%] sm:left-8`,
      'middle-right': `${base} top-[38%] right-[1%] sm:right-8`,
      'bottom-left': `${base} bottom-[22%] left-[2%] sm:left-[10%]`,
      'bottom-right': `${base} bottom-[22%] right-[2%] sm:right-[10%]`,
    };
    return positions[pos];
    const navigate = useNavigate();
  };


  return (
    <>
      
    <div className="min-h-screen bg-[url('./bg.png')] bg-cover font-pixel p-3 sm:p-4 overflow-x-hidden flex flex-col items-center relative">

      {/* Clouds */}
      <motion.div 
        animate={{ x: [-20, 20] }} 
        transition={{ repeat: Infinity, duration: 5, repeatType: "reverse" }}
        className="absolute top-6 left-6 opacity-40 text-white"
      >
        <Cloud size={50} fill="currentColor" />
      </motion.div>

      <motion.div 
        animate={{ x: [20, -20] }} 
        transition={{ repeat: Infinity, duration: 7, repeatType: "reverse" }}
        className="absolute top-20 right-6 opacity-30 text-white"
      >
        <Cloud size={70} fill="currentColor" />
      </motion.div>

      {/* Header */}
        <div className="w-full flex justify-between items-center mb-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
            <img src="./logo.png" alt="logo" className="w-full h-full object-contain cursor-pointer" />
          </div>

            <div className="flex gap-2">
            <button
                onClick={() => navigate(-1)} // <- revient à la page précédente
                className="bg-black p-2 rounded-lg text-white hover:scale-110 transition-transform"
            >
                <RotateCcw size={18} className="sm:w-5 sm:h-5"/>
            </button>
            </div>
        </div>

      {/* Title */}
      <div className="w-full max-w-2xl bg-[#f1e4c3] border-4 border-[#89C33D] rounded-xl p-4 mb-8 text-center shadow-[0_8px_0_0_#1DA303]">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-stone-800">
          Your Monthly Progress
        </h1>
      </div>

      {/* Center Tree */}
      <div className="relative w-full max-w-2xl flex-1 flex items-center justify-center scale-[0.85] sm:scale-100">

        {/* Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-52 h-52 sm:w-64 sm:h-64 border-[12px] border-[#E1D1AA] rounded-full opacity-80 animate-pulse"/>
          <div className="absolute w-64 h-64 sm:w-80 sm:h-80 border-[4px] border-[#D8CDB3] rounded-full opacity-80"/>
        </div>

        {/* Tree */}
        <div className="relative z-10 flex flex-col items-center">

          <div className="w-0 h-0 border-l-[22px] border-l-transparent border-r-[22px] border-r-transparent border-b-[32px] border-[#89CFA6]" />

          {globalProgress > 30 &&
            <div className="w-0 h-0 border-l-[32px] border-l-transparent border-r-[32px] border-r-transparent border-b-[42px] border-[#70C593] -mt-4"/>
          }

          {globalProgress > 60 &&
            <div className="w-0 h-0 border-l-[42px] border-l-transparent border-r-[42px] border-r-transparent border-b-[52px] border-[#65B787] -mt-5"/>
          }

          <div className="w-6 h-10 bg-[#D1A690] border-x-2 border-[#8D6856]" />

        </div>

        {/* Stats */}
        {stats.map(stat => (
          <div key={stat.id} className={getPositionClasses(stat.position)}>
            <div className="backdrop-blur-sm p-2 rounded-lg mb-1 text-[#046716]">
              {stat.icon}
            </div>
            <span className="text-[10px] font-bold uppercase mb-1">
              {stat.label}
            </span>
            <HealthBar progress={stat.progress}/>
          </div>
        ))}

      </div>

      
        {/* Character + Bubble */}
        <div
        className="
            absolute
            bottom-16
            left-1/2
            -translate-x-1/2
            sm:left-6 sm:translate-x-0
            md:left-20
            flex
            flex-col
            items-center
            gap-1
            z-20
            scale-[0.9]
            sm:scale-100
        "
        >

        {/* Bubble */}
        <div
            className="
            bg-[#f1e4c3]
            border-2 border-[#d9c5a3]
            rounded-2xl
            px-3 py-2
            max-w-[180px]
            text-[11px]
            sm:text-xs
            font-bold
            shadow-md
            text-center
            "
        >
            {globalProgress > 80
            ? "Such a great progress this month!"
            : "Keep it up, your forest is growing!"}
        </div>

        {/* Character */}
        <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 pointer-events-none">
            <img
            src="./mario.png"
            alt="character"
            className="w-full h-full object-contain"
            />
        </div>

        </div>
      {/* Sol Pixelisé Multi-couches */}
      <div className="absolute bottom-0 w-full z-10">
        <div className="h-4 bg-[#47A548] w-full border-t-2 border-[#2F5B2F]" />
        <div className="h-12 bg-[#8B8948] w-full flex flex-col">
            <div className="h-2 bg-[#70543a] w-full opacity-50" />
            <div className="flex-1 w-full bg-[radial-gradient(#614832_1px,transparent_1px)] [background-size:10px_10px] opacity-30" />
        </div>
      </div>

    </div>
    </>
  );
};


/* HealthBar */
const HealthBar = ({ progress }) => (
  <div className="flex items-center gap-1">

    <Heart size={10} className={progress > 0 ? "text-red-500 fill-red-500" : "text-gray-400"} />

    <div className="w-16 sm:w-20 h-2.5 bg-stone-900 border border-stone-700 rounded-full overflow-hidden p-[1.5px]">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        className={`h-full rounded-full ${
          progress < 30 ? 'bg-red-500' :
          progress < 70 ? 'bg-yellow-400' :
          'bg-green-500'
        }`}
      />
    </div>

    <Heart size={10} className={progress === 100 ? "text-red-500 fill-red-500" : "text-gray-400"} />

  </div>
  
);

export default MonthlyProgress;
