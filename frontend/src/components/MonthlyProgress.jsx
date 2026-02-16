import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Cloud,
  Menu,
  X
} from 'lucide-react';

const MonthlyProgress = ({ monthlyStats }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "FOREST", path: "/years" },
    { name: "LAND", path: "/months" },
    { name: "PROGRESS", path: "/days" }, 
    { name: "TODAY", path: "/dashboard" },
    { name: "MONTH", path: "/monthly-progress" },
    { name: "TASKS", path: "/checklist" },
  ];

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

  const guideText = globalProgress > 80 
    ? "Such a great progress this month!" 
    : "Keep it up, your forest is growing!";

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
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.5 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.8 },
    visible: { y: 0, opacity: 1, scale: 1 }
  };

  return (
    <div 
      className="min-h-screen font-pixel p-3 sm:p-4 overflow-x-hidden flex flex-col items-center relative"
      style={{ backgroundImage: "url('/bg.png')", backgroundSize: "cover", backgroundPosition: "center" }}
    >

      {/* --- HEADER --- */}
      <header className="w-full max-w-6xl flex items-center justify-between mb-8 gap-4 z-50">
        <motion.div whileHover={{ scale: 1.1 }} className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 cursor-pointer">
          <img src="/logo.png" alt="logo" onClick={() => navigate('/')} />
        </motion.div>

        <nav className="flex-grow max-w-xl relative">
          <div className="bg-[#f1e4c3] border-[3px] border-[#b89a67] rounded-[40px] px-6 py-2 flex justify-between items-center shadow-[0_8px_0_0_#b89a67] z-50 relative">
            <div className="hidden md:flex justify-around w-full">
              {navLinks.map(link => (
                <button 
                  key={link.name} 
                  onClick={() => navigate(link.path)}
                  className="text-[10px] font-black text-black hover:text-green-700 transition-colors uppercase px-2"
                >
                  {link.name}
                </button>
              ))}
            </div>
            <div className="md:hidden flex justify-center w-full">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-black font-black text-[10px] flex items-center gap-2">
                {isMenuOpen ? <X size={18} /> : <Menu size={18} />} 
                <span className="ml-1 uppercase">Menu</span>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-full left-0 right-0 mt-2 bg-[#f1e4c3] border-[3px] border-[#b89a67] rounded-2xl p-4 shadow-[4px_4px_0_0_#b89a67] z-40 md:hidden flex flex-col gap-3 items-center"
              >
                {navLinks.map(link => (
                  <button key={link.name} onClick={() => { navigate(link.path); setIsMenuOpen(false); }} className="font-black text-stone-800 text-xs uppercase">
                    {link.name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        <motion.button
          whileHover={{ scale: 1.1, rotate: -10 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)}
          className="bg-black p-2.5 rounded-lg text-white shadow-[3px_3px_0_0_#5A7554]"
        >
          <RotateCcw size={20}/>
        </motion.button>
      </header>

      {/* --- CLOUDS --- */}
      <motion.div 
        animate={{ x: [-20, 20] }} 
        transition={{ repeat: Infinity, duration: 5, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute top-24 left-6 opacity-40 text-white pointer-events-none"
      >
        <Cloud size={50} fill="currentColor" />
      </motion.div>

      {/* --- TITLE BANNER --- */}
      <motion.div 
        initial={{ scale: 0, rotate: -5 }}
        animate={{ scale: 1, rotate: 0 }}
        className="w-full max-w-2xl bg-[#f1e4c3] border-4 border-[#89C33D] rounded-xl p-4 mb-8 text-center shadow-[0_8px_0_0_#1DA303] z-10"
      >
        <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-stone-800">
          Your Monthly Progress
        </h1>
      </motion.div>

      {/* --- STATS & TREE --- */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-2xl flex-1 flex items-center justify-center scale-[0.85] sm:scale-100"
      >
        {/* Tree + Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-52 h-52 sm:w-64 sm:h-64 border-[12px] border-[#E1D1AA] rounded-full"
          />
          <div className="absolute w-64 h-64 sm:w-80 sm:h-80 border-[4px] border-[#D8CDB3] rounded-full opacity-80"/>
        </div>

        {/* Tree */}
        <div className="relative z-10 flex flex-col items-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} className="w-0 h-0 border-l-[22px] border-l-transparent border-r-[22px] border-r-transparent border-b-[32px] border-[#89CFA6]" />
          {globalProgress > 30 && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }} className="w-0 h-0 border-l-[32px] border-l-transparent border-r-[32px] border-r-transparent border-b-[42px] border-[#70C593] -mt-4"/>}
          {globalProgress > 60 && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 }} className="w-0 h-0 border-l-[42px] border-l-transparent border-r-[42px] border-r-transparent border-b-[52px] border-[#65B787] -mt-5"/>}
          <motion.div initial={{ height: 0 }} animate={{ height: 40 }} className="w-6 bg-[#D1A690] border-x-2 border-[#8D6856]" />
        </div>

        {/* Stats Items */}
        {stats.map(stat => (
          <motion.div key={stat.id} variants={itemVariants} className={getPositionClasses(stat.position)}>
            <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="p-2 rounded-lg mb-1 text-[#046716]">
              {stat.icon}
            </motion.div>
            <span className="text-[10px] font-bold uppercase mb-1">{stat.label}</span>
            <HealthBar progress={stat.progress}/>
          </motion.div>
        ))}
      </motion.div>

      {/* Character + Guide Text */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 sm:left-6 sm:translate-x-0 md:left-20 flex flex-col items-center gap-1 z-20 scale-[0.9] sm:scale-100">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#f1e4c3] border-2 border-[#d9c5a3] rounded-2xl px-3 py-2 max-w-[180px] text-[11px] sm:text-xs font-bold shadow-md text-center">
          <motion.p initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.04 } } }}>
            {guideText.split("").map((char, i) => (
              <motion.span key={i} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                {char}
              </motion.span>
            ))}
          </motion.p>
        </motion.div>
        <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20">
          <img src="/mario.png" alt="character" className="w-full h-full object-contain" />
        </motion.div>
      </div>

      {/* Ground layers */}
      <div className="absolute bottom-0 w-full z-10 pointer-events-none">
        <div className="h-4 bg-[#47A548] w-full border-t-2 border-[#2F5B2F]" />
        <div className="h-12 bg-[#8B8948] w-full flex flex-col">
          <div className="h-2 bg-[#70543a] w-full opacity-50" />
          <div className="flex-1 w-full bg-[radial-gradient(#614832_1px,transparent_1px)] [background-size:10px_10px] opacity-30" />
        </div>
      </div>

    </div>
  );
};

const HealthBar = ({ progress }) => (
  <div className="flex items-center gap-1">
    <Heart size={10} className={progress > 0 ? "text-red-500 fill-red-500" : "text-gray-400"} />
    <div className="w-16 sm:w-20 h-2.5 bg-stone-900 border border-stone-700 rounded-full overflow-hidden p-[1.5px]">
      <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1, ease: "easeOut", delay: 1 }} className={`h-full rounded-full ${progress < 30 ? 'bg-red-500' : progress < 70 ? 'bg-yellow-400' : 'bg-green-500'}`} />
    </div>
    <Heart size={10} className={progress === 100 ? "text-red-500 fill-red-500" : "text-gray-400"} />
  </div>
);

export default MonthlyProgress;
