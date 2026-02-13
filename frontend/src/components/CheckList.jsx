import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Check, Plus, Trash2, Menu, X } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const CheckList = ({ onAddToRoutine }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour la navbar mobile

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "FOREST", path: "/years" },
    { name: "LAND", path: "/months" },
    { name: "PROGRES", path: "/days" }, // Corrigé 'PROGRES' -> 'PROGRESS' si tu préfères
    { name: "TODAY", path: "/dashboard" },
    { name: "MONTH", path: "/monthly-progress" },
    { name: "TASKS", path: "/checklist" },
  ];
  // --- TA LOGIQUE DE BASE (INCHANGÉE) ---
  const [coreRitual, setCoreRitual] = useState(() => {
    const saved = localStorage.getItem('thyro-core-list');
    return saved ? JSON.parse(saved) : [
      { id: 'tr1', text: 'Treatment: Take Levothyroxine', checked: true, isDefault: true },
      { id: 'tr2', text: 'Absorption: Empty Stomach First.', checked: true, isDefault: true },
      { id: 'tr3', text: 'Care: Visit Endocrinologist.', checked: false, isDefault: true },
      { id: 'tr4', text: 'Physical: Monitor Neck Ultrasound.', checked: false, isDefault: true },
      { id: 'tr5', text: 'Lab Evidence: Track TSH Levels.', checked: true, isDefault: true },
    ];
  });

  const [wellnessForest, setWellnessForest] = useState(() => {
    const saved = localStorage.getItem('thyro-wellness-list');
    return saved ? JSON.parse(saved) : [
      { id: 'wf1', icon: '💧', text: 'Hydration: "Drink Pure Water."', checked: true, isDefault: true },
      { id: 'wf2', icon: '☀️', text: 'Vitality: "Seek Morning Sunlight."', checked: false, isDefault: true },
      { id: 'wf3', icon: '🏃', text: 'Activity: "Move Body Daily."', checked: false, isDefault: true },
      { id: 'wf4', icon: '🍽️', text: 'Nutrition: "Eat Whole Foods."', checked: false, isDefault: true },
    ];
  });

  const [isAdding, setIsAdding] = useState(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    localStorage.setItem('thyro-core-list', JSON.stringify(coreRitual));
  }, [coreRitual]);

  useEffect(() => {
    localStorage.setItem('thyro-wellness-list', JSON.stringify(wellnessForest));
  }, [wellnessForest]);

  const toggleCheck = (list, id) => {
    if (list === 'core') {
      setCoreRitual(coreRitual.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
    } else {
      setWellnessForest(wellnessForest.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
    }
  };

  const handleAddNewTask = (list) => {
    if (!inputValue.trim()) return;
    const newTask = {
      id: Date.now().toString(),
      text: inputValue,
      icon: list === 'wellness' ? '⭐' : null,
      checked: true,
      isDefault: false 
    };
    if (list === 'core') setCoreRitual([...coreRitual, newTask]);
    else setWellnessForest([...wellnessForest, newTask]);
    setInputValue('');
    setIsAdding(null);
  };

  const deleteTask = (list, id) => {
    if (list === 'core') setCoreRitual(coreRitual.filter(item => item.id !== id));
    else setWellnessForest(wellnessForest.filter(item => item.id !== id));
  };

  const handleFinalSubmit = () => {

    if (onAddToRoutine) onAddToRoutine(selectedTasks);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[url('./bg.png')] bg-cover font-pixel p-4 flex flex-col items-center relative overflow-x-hidden">

      {/* --- NOUVELLE NAVBAR --- */}
      <header className="w-full max-w-6xl flex items-center justify-between mb-8 gap-4 z-50">
        {/* Logo */}
        <div className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
          <img src="./logo.png" alt="logo" className="w-full h-full object-contain" />
        </div>

        {/* Navbar Capsule */}
        <nav className="flex-grow max-w-xl relative">
          <div className="bg-[#f1e4c3] border-[3px] border-[#b89a67] rounded-[40px] px-6 py-2 flex justify-between items-center shadow-[0_8px_0_0_#b89a67] z-50 relative">
            
            {/* Desktop Links */}
            <div className="hidden md:flex justify-around w-full">
              {navLinks.map((link) => (
                <button 
                  key={link.name} 
                  onClick={() => navigate(link.path)}
                  className="text-[10px] font-black text-black hover:scale-110 transition-transform uppercase px-2 cursor-pointer"
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex justify-center w-full">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-black font-black text-[10px] flex items-center justify-center gap-2">
                {isMenuOpen ? <X size={18} /> : <Menu size={18} />} 
                <span className="ml-1 uppercase">Menu</span>
              </button>
            </div>
          </div>

          {/* Mobile Dropdown */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-[#f1e4c3] border-[3px] border-[#b89a67] rounded-2xl p-4 shadow-[4px_4px_0_0_#b89a67] z-40 md:hidden flex flex-col gap-3 items-center"
              >
                {navLinks.map((link) => (
                  <button 
                    key={link.name} 
                    onClick={() => {
                      navigate(link.path);
                      setIsMenuOpen(false); // Ferme le menu après le clic
                    }} 
                    className="font-black text-stone-800 text-xs uppercase hover:text-green-700 transition-colors"
                  >
                    {link.name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Reset Button (Ancien bouton back remplacé par reset unifié) */}
        <div className="flex-shrink-0">
          <button
            onClick={() => { localStorage.clear(); window.location.reload(); }}
            className="bg-black p-2.5 rounded-lg text-white hover:scale-110 transition-transform shadow-[3px_3px_0_0_#5A7554]"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </header>

      {/* --- LE RESTE DU CONTENU (INCHANGÉ) --- */}
      <div className="w-full max-w-2xl bg-white border-4 border-[#D4AF37] rounded-xl p-3 mb-8 text-center shadow-[0_6px_0_0_#B8860B] z-10">
        <h1 className="text-sm md:text-lg font-black text-stone-800 uppercase">
           Select what you want to add to your health routine
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mb-24 z-10">
        {/* Core Ritual Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="bg-[#f1e4c3] border-4 border-[#D4AF37] rounded-xl p-5 w-full shadow-lg min-h-[380px]">
            <h2 className="text-[#E67E22] font-black text-lg mb-4 italic">2. The Core Ritual</h2>
            <div className="space-y-3">
              {coreRitual.map((item) => (
                <div key={item.id} className="flex justify-between items-center group">
                  <span className="font-bold text-stone-800 text-sm flex-1 cursor-pointer" onClick={() => toggleCheck('core', item.id)}>
                    {item.text}
                  </span>
                  <div className="flex items-center gap-2">
                    {!item.isDefault && (
                      <button onClick={() => deleteTask('core', item.id)} className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 size={16} />
                      </button>
                    )}
                    <div onClick={() => toggleCheck('core', item.id)} className={`w-6 h-6 border-2 border-stone-800 rounded cursor-pointer flex items-center justify-center ${item.checked ? 'bg-[#89C33D]' : 'bg-white'}`}>
                      {item.checked && <Check size={16} className="text-white stroke-[4px]" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => setIsAdding('core')} className="bg-[#f1e4c3] border-2 border-stone-800 px-6 py-1 rounded shadow-[3px_3px_0_0_#5A7554] font-bold hover:bg-white transition-all">+ Add</button>
        </div>

        {/* Wellness Forest Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="bg-[#f1e4c3] border-4 border-[#D4AF37] rounded-xl p-5 w-full shadow-lg min-h-[380px]">
            <h2 className="text-[#E67E22] font-black text-lg mb-4 italic">1. The Wellness Forest</h2>
            <div className="space-y-5">
              {wellnessForest.map((item) => (
                <div key={item.id} className="flex justify-between items-center group">
                  <div className="flex items-center gap-3 flex-1 cursor-pointer" onClick={() => toggleCheck('wellness', item.id)}>
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-bold text-stone-800 text-sm">{item.text}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {!item.isDefault && (
                      <button onClick={() => deleteTask('wellness', item.id)} className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 size={16} />
                      </button>
                    )}
                    <div onClick={() => toggleCheck('wellness', item.id)} className={`w-6 h-6 border-2 border-stone-800 rounded cursor-pointer flex items-center justify-center ${item.checked ? 'bg-[#89C33D]' : 'bg-white'}`}>
                      {item.checked && <Check size={16} className="text-white stroke-[4px]" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => setIsAdding('wellness')} className="bg-[#f1e4c3] border-2 border-stone-800 px-6 py-1 rounded shadow-[3px_3px_0_0_#5A7554] font-bold hover:bg-white transition-all">+ Add</button>
        </div>
      </div>

      {/* Modale d'ajout */}
      <AnimatePresence>
        {isAdding && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-[#f1e4c3] border-4 border-stone-800 p-6 rounded-xl w-full max-w-sm">
              <h3 className="font-black mb-4 uppercase">New Task</h3>
              <input autoFocus className="w-full p-2 border-2 border-stone-800 rounded mb-4 shadow-[2px_2px_0_0_#000]" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Type task..." />
              <div className="flex gap-2">
                <button onClick={() => setIsAdding(null)} className="flex-1 py-2 font-bold border-2 border-stone-800 rounded">CANCEL</button>
                <button onClick={() => handleAddNewTask(isAdding)} className="flex-1 py-2 font-bold bg-[#5A7554] text-white border-2 border-stone-800 rounded">ADD</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button: Final Submission */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={handleFinalSubmit}
          className="bg-[#f1e4c3] border-4 border-[#5A7554] px-6 py-3 rounded-xl font-black text-stone-800 shadow-[0_6px_0_0_#5A7554] hover:translate-y-1 hover:shadow-[0_2px_0_0_#5A7554] transition-all flex items-center gap-2"
        >
          <Plus size={20} /> ADD TO THE ROUTINE
        </button>
      </div>

      <div className="absolute bottom-12 left-10 z-20 w-20 h-20 pointer-events-none">
        <img src="/mario.png" alt="character" className="w-full h-full object-contain" />
      </div>
    </div>
  );
};

export default CheckList;