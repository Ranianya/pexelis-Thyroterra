import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Check, Plus, Loader2 } from 'lucide-react';
import api from '../api/axios';

const CheckList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // ✅ FIX: Capture both spot and day from navigation state
  // When coming from Months, selectedDay defaults to 1
  const activeSpot = location.state?.selectedSpot || 1;
  const activeDay = location.state?.selectedDay || 1;

  const [loading, setLoading] = useState(true);
  
  // Get User Info from storage
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;

  const [coreRitual, setCoreRitual] = useState([]);
  const [wellnessForest, setWellnessForest] = useState([]);
  const [isAdding, setIsAdding] = useState(null); 
  const [inputValue, setInputValue] = useState('');

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "MAP", path: `/days/${activeSpot}` }, // Updated to lead back to the correct spot map
    { name: "TODAY", path: "/dashboard" },
  ];

  // --- API: Fetch Habits ---
  const fetchData = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const [res1, res2] = await Promise.all([
        api.get(`/habits/category1?userId=${userId}`),
        api.get(`/habits/category2?userId=${userId}`)
      ]);
      
      const format = (data) => data.map(h => ({
        id: h.id,
        text: h.taskName,
        checked: h.userHabits?.length > 0 ? h.userHabits[0].isChecked : false,
      }));

      setWellnessForest(format(res1.data));
      setCoreRitual(format(res2.data));
    } catch (err) { 
      console.error("Fetch Error:", err); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  // --- API: Toggle Habit ---
  const handleToggle = async (type, id, currentlyChecked) => {
    try {
      const setter = type === 'core' ? setCoreRitual : setWellnessForest;
      setter(prev => prev.map(h => h.id === id ? { ...h, checked: !currentlyChecked } : h));

      const action = currentlyChecked ? 'uncheck' : 'check';
      await api.put(`/routine/${id}/${action}`, { userId });
    } catch (err) { 
      console.error("Toggle Error:", err);
      fetchData(); 
    }
  };

  // --- API: Add Custom Habit ---
  const addNewHabit = async (type) => {
    if (!inputValue) return;
    try {
      const cat = type === 'wellness' ? 1 : 2;
      await api.post(`/habits/category${cat}`, { 
        taskName: inputValue, 
        userId: userId 
      });
      setInputValue('');
      setIsAdding(null);
      fetchData(); 
    } catch (err) { console.error("Add Error:", err); }
  };

  // --- API: Final Submit ---
  const handleFinalSubmit = async () => {
    const selected = [...coreRitual, ...wellnessForest].filter(h => h.checked);
    
    if (selected.length === 0) {
      alert("Please select at least one habit to continue!");
      return;
    }

    try {
      // ✅ FIX: Using dynamic activeSpot and activeDay
      await api.post('/routine', { 
        userId, 
        spotId: activeSpot, 
        dayId: activeDay 
      });
      navigate("/dashboard");
    } catch (err) { 
        console.error("Final Submit Error:", err);
        alert(`Error: Could not save progress for Spot ${activeSpot}, Day ${activeDay}.`); 
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-stone-900 flex flex-col items-center justify-center text-white font-pixel">
      <Loader2 className="animate-spin mb-4 text-[#89C33D]" size={48} />
      <p className="uppercase tracking-widest">Syncing Rituals...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[url('./bg.png')] bg-cover bg-fixed font-pixel p-4 flex flex-col items-center relative overflow-x-hidden">
      
      {/* --- HEADER --- */}
      <header className="w-full max-w-6xl flex items-center justify-between mb-8 gap-4 z-50">
        <motion.div whileHover={{ scale: 1.1 }} className="w-12 h-12 cursor-pointer" onClick={() => navigate('/')}>
          <img src="/logo.png" alt="logo" className="w-full h-full object-contain" />
        </motion.div>

        <nav className="flex-grow max-w-xl relative">
          <div className="bg-[#f1e4c3] border-[3px] border-[#b89a67] rounded-[40px] px-6 py-2 flex justify-between items-center shadow-[0_4px_0_0_#b89a67]">
            <div className="hidden md:flex justify-around w-full">
              {navLinks.map((link) => (
                <button key={link.name} onClick={() => navigate(link.path)} className="text-[10px] font-black text-black hover:scale-110 px-2">
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <motion.button whileHover={{ rotate: 180 }} onClick={fetchData} className="bg-black p-2.5 rounded-lg text-white">
          <RotateCcw size={20} />
        </motion.button>
      </header>

      {/* --- DYNAMIC TITLE --- */}
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-2xl bg-white border-4 border-[#D4AF37] rounded-xl p-4 mb-10 text-center shadow-[0_6px_0_0_#B8860B] z-10">
        <h1 className="text-sm md:text-lg font-black text-stone-800 uppercase italic">
          Spot {activeSpot} <span className="mx-2 text-stone-400">|</span> Preparing <span className="text-[#E67E22] underline">Day {activeDay}</span> Rituals
        </h1>
      </motion.div>

      {/* --- HABIT COLUMNS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mb-32 z-10">
        <HabitBox 
            title="Core Rituals" 
            data={coreRitual} 
            onToggle={(id, chk) => handleToggle('core', id, chk)} 
            onAdd={() => setIsAdding('core')} 
        />
        <HabitBox 
            title="Wellness Forest" 
            data={wellnessForest} 
            onToggle={(id, chk) => handleToggle('wellness', id, chk)} 
            onAdd={() => setIsAdding('wellness')} 
        />
      </div>

      {/* --- SUBMIT --- */}
      <div className="fixed bottom-8 right-8 z-50">
        <motion.button 
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={handleFinalSubmit}
          className="bg-[#f1e4c3] border-4 border-[#5A7554] px-8 py-4 rounded-2xl font-black text-stone-800 shadow-[0_8px_0_0_#5A7554] flex items-center gap-3"
        >
          <Plus size={24} /> START JOURNEY
        </motion.button>
      </div>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="bg-[#f1e4c3] border-4 border-stone-800 p-8 rounded-2xl w-full max-w-sm">
              <input autoFocus className="w-full p-3 border-2 border-stone-800 rounded-lg mb-6" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Habit name..." />
              <div className="flex gap-4">
                <button onClick={() => setIsAdding(null)} className="flex-1 font-black underline">CANCEL</button>
                <button onClick={() => addNewHabit(isAdding)} className="flex-1 py-3 bg-[#5A7554] text-white border-2 border-stone-800 rounded-lg">ADD</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const HabitBox = ({ title, data, onToggle, onAdd }) => (
  <div className="flex flex-col items-center gap-6">
    <div className="bg-[#f1e4c3] border-4 border-[#D4AF37] rounded-2xl p-6 w-full shadow-2xl min-h-[350px]">
      <h2 className="text-[#E67E22] font-black text-xl mb-6 italic uppercase underline">{title}</h2>
      <div className="space-y-4">
        {data.map(item => (
          <div key={item.id} className="flex justify-between items-center bg-white/40 p-3 rounded-lg border border-black/5">
            <span className="font-bold text-stone-800 text-sm">{item.text}</span>
            <div 
              onClick={() => onToggle(item.id, item.checked)} 
              className={`w-7 h-7 border-2 border-stone-800 rounded-md cursor-pointer flex items-center justify-center ${item.checked ? 'bg-[#89C33D]' : 'bg-white'}`}
            >
              {item.checked && <Check size={18} className="text-white stroke-[3px]" />}
            </div>
          </div>
        ))}
      </div>
    </div>
    <button onClick={onAdd} className="bg-[#f1e4c3] border-2 border-stone-800 px-8 py-2 rounded shadow-[4px_4px_0_0_#000] font-black uppercase">+ Custom</button>
  </div>
);

export default CheckList;