import React, { useState, useEffect } from 'react';
import { Heart, RotateCcw, Smile, Frown, Pill, Droplets, Footprints, Apple, Moon, Menu, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const defaultTasks = [
  { id: 1, title: 'MORNING EXPLORER!', desc: 'YOUR MAGIC PILL', icon: 'pill', action: 'I DID IT', completed: false },
  { id: 2, title: 'HYDRATION QUEST:', desc: 'DRINK 6 GLASSES TODAY', icon: 'droplets', action: 'DRANK IT', completed: false },
  { id: 3, title: 'TAKE A SHORT WALK', desc: 'TO BOOST YOUR ENERGY', icon: 'footprints', action: 'WALK DONE', completed: false },
  { id: 4, title: 'FUEL UP', desc: 'EAT SOMETHING HEALTHY AND LIGHT', icon: 'apple', action: 'ENERGY GAINED', completed: false },
  { id: 5, title: 'HOW ARE YOU FEELING?', desc: 'TRACK YOUR MOOD', icon: 'mood', action: 'FEEL IT', completed: false },
  { id: 6, title: 'SLEEP ON TIME', desc: 'GO TO BED EARLY', icon: 'moon', action: 'DREAM MODE', completed: false },
];

const getIconComponent = (icon) => {
  switch(icon){
    case 'pill': return <Pill />;
    case 'droplets': return <Droplets />;
    case 'footprints': return <Footprints />;
    case 'apple': return <Apple />;
    case 'moon': return <Moon />;
    case 'mood': 
      return <div className="flex gap-2 justify-center">
        <Smile className="hover:scale-125 transition-transform text-green-600 cursor-pointer" />
        <Frown className="hover:scale-125 transition-transform text-red-600 cursor-pointer" />
      </div>;
    default: return <span className="text-xl">{icon}</span>;
  }
};

const TaskCard = ({ task, toggleComplete, removeTask, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -8, transition: { duration: 0.2 } }}
    className={`bg-[#f5ead1] border-2 border-[#d9c5a3] p-4 rounded-xl flex flex-col items-center text-center relative overflow-hidden shadow-[4px_4px_0_0_#d9c5a3] transition-all
      ${task.completed ? 'brightness-95 bg-[#e2d6b8]' : ''}`}
  >
    {/* Petit badge "Completed" animé */}
    <AnimatePresence>
      {task.completed && (
        <motion.div 
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0 }}
          className="absolute top-2 right-2 z-10"
        >
          <Star size={16} className="text-yellow-500 fill-yellow-500" />
        </motion.div>
      )}
    </AnimatePresence>

    <h3 className="text-[10px] font-black text-stone-500 mb-2 leading-tight uppercase tracking-wider">{task.title}</h3>
    <p className="text-[11px] font-bold text-stone-800 mb-3 leading-tight h-8">{task.desc}</p>
    
    <motion.div 
      animate={task.completed ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
      className={`mb-4 text-3xl ${task.completed ? 'text-green-600' : 'text-stone-700'}`}
    >
      {getIconComponent(task.icon)}
    </motion.div>

    <div className="flex flex-col gap-2 w-full mt-auto">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => toggleComplete(task.id)}
        className={`text-[10px] font-black py-2 px-4 rounded-lg border-2 shadow-[0_4px_0_0_rgba(0,0,0,0.1)] transition-all w-full
          ${task.completed
            ? 'bg-green-500 text-white border-green-700'
            : 'bg-[#f1e4c3] border-[#b89a67] text-stone-700 hover:bg-[#e6d5b0]'}`}
      >
        {task.completed ? 'COMPLETED ✓' : task.action}
      </motion.button>
      
      {task.isCustom && (
        <button
          onClick={() => removeTask(task.id)}
          className="text-[9px] font-black py-1 text-red-500 hover:underline transition-all uppercase"
        >
          Remove quest
        </button>
      )}
    </div>
  </motion.div>
);

const ThyroterraDashboard = () => {
  const navigate = useNavigate();

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "FOREST", path: "/years" },
    { name: "LAND", path: "/months" },
    { name: "PROGRESS", path: "/days" },
    { name: "TODAY", path: "/dashboard" },
    { name: "MONTH", path: "/monthly-progress" },
    { name: "TASKS", path: "/checklist" },
  ];

  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem('thyroterra-tasks');
    return stored ? JSON.parse(stored) : defaultTasks;
  });
  const [isFinished, setIsFinished] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newEmoji, setNewEmoji] = useState('');
  
  useEffect(() => {
    localStorage.setItem('thyroterra-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const toggleComplete = (id) => setTasks(tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t));
  const removeTask = (id) => setTasks(tasks.filter(t => t.id !== id));

  const addTask = () => {
    if(!newTitle.trim()) return;
    const newTask = {
      id: Date.now(),
      title: newTitle.toUpperCase(),
      desc: newDesc.toUpperCase(),
      icon: newEmoji || '⭐',
      action: 'COMPLETE',
      completed: false,
      isCustom: true
    };
    setTasks([...tasks, newTask]);
    setNewTitle(''); setNewDesc(''); setNewEmoji('');
    setShowAddForm(false);
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercentage = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  const getFinishContent = () => {
    if (completedCount < 3) return { msg: "⚠️ Your Vitality is Low!", sub: "Rest and heal! Small quests await tomorrow…" };
    if (completedCount === tasks.length) return { msg: "🏆 PERFECT DAY!", sub: "The forest is in full bloom thanks to you!" };
    return { msg: "🌳 Champion of the Forest!", sub: "Your health is thriving! The forest celebrates your dedication!" };
  };

  if (isFinished) {
    const content = getFinishContent();
    return (
      <div className="min-h-screen bg-[url(./bg.png)] bg-cover font-pixel p-4 flex flex-col items-center justify-center text-center">
         <motion.div 
          initial={{ scale: 0.5, opacity: 0, rotate: -10 }} 
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          className="bg-[#f1e4c3] border-4 border-[#b89a67] rounded-xl p-8 max-w-2xl w-full shadow-[0_12px_0_0_#b89a67] relative"
        >
          <motion.div 
            animate={{ y: [0, -10, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-5xl mb-6"
          >
            {completedCount === tasks.length ? '🌟' : '🌳'}
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-black text-stone-800 mb-6 uppercase tracking-widest">{content.msg}</h2>
          <p className="text-lg font-bold text-stone-700 mb-8">{content.sub}</p>
          <button onClick={() => setIsFinished(false)} className="bg-[#5A7554] text-white py-3 px-8 rounded-full border-4 border-[#3d5238] font-black hover:scale-110 transition-transform uppercase shadow-lg">Continue Quest</button>
        </motion.div>
        
        <motion.button 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => navigate('/monthly-progress')} 
          className="mt-8 bg-[#3d5238] text-white px-6 py-3 rounded-xl font-bold hover:bg-black transition-colors uppercase border-b-4 border-black"
        >
          Show Monthly Progress
        </motion.button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[url(./bg.png)] bg-cover font-pixel p-4 flex flex-col items-center">
      
      {/* HEADER */}
      <header className="w-full max-w-6xl flex items-center justify-between mb-8 gap-4 z-50">
        <motion.div whileHover={{ rotate: -10 }} className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 cursor-pointer">
          <img src="./logo.png" alt="logo" onClick={() => navigate('/')} />
        </motion.div>

        <nav className="flex-grow max-w-xl relative">
          <div className="bg-[#f1e4c3] border-[3px] border-[#b89a67] rounded-[40px] px-6 py-2 flex justify-between items-center shadow-[0_8px_0_0_#b89a67] relative">
            <div className="hidden md:flex justify-around w-full">
              {navLinks.map((link) => (
                <button key={link.name} onClick={() => navigate(link.path)} className="text-[10px] font-black text-black hover:text-green-700 transition-colors uppercase px-2">
                  {link.name}
                </button>
              ))}
            </div>
            <div className="md:hidden flex justify-center w-full">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-black font-black text-[10px] flex items-center gap-2">
                {isMenuOpen ? <X size={18} /> : <Menu size={18} />} <span className="uppercase">Menu</span>
              </button>
            </div>
          </div>
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute top-full left-0 right-0 mt-2 bg-[#f1e4c3] border-[3px] border-[#b89a67] rounded-2xl p-4 shadow-[4px_4px_0_0_#b89a67] flex flex-col gap-3 items-center">
                {navLinks.map((link) => (
                  <button key={link.name} onClick={() => { navigate(link.path); setIsMenuOpen(false); }} className="font-black text-stone-800 text-xs uppercase">{link.name}</button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        <motion.button whileHover={{ scale: 1.1, rotate: 10 }} onClick={() => { if(window.confirm("Reset quest?")) { localStorage.clear(); window.location.reload(); } }} className="bg-black p-2.5 rounded-lg text-white shadow-[3px_3px_0_0_#5A7554]">
          <RotateCcw size={20}/>
        </motion.button>
      </header>

      {/* BANNER DATE */}
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-2xl bg-[#f1e4c3] border-4 border-[#b89a67] rounded-xl p-4 mb-8 text-center relative shadow-[0_8px_0_0_#b89a67]">
        <h1 className="text-2xl md:text-3xl font-black text-stone-800 tracking-tighter uppercase">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
        </h1>
        <motion.div 
          key={completedCount}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute -right-4 top-12 flex items-center bg-white px-3 py-1 rounded-full border-2 border-stone-400 shadow-md"
        >
          <Heart className="text-red-500 fill-red-500 mr-1" size={18} />
          <span className="font-black text-stone-700">x {completedCount}</span>
        </motion.div>
      </motion.div>

      {/* TASKS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl mb-6">
        {tasks.map((task, index) => (
          <TaskCard key={task.id} task={task} toggleComplete={toggleComplete} removeTask={removeTask} index={index} />
        ))}
      </div>

      {/* Add Task Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="w-full max-w-2xl overflow-hidden mb-6">
            <div className="bg-[#f1e4c3] border-4 border-[#b89a67] rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-black text-stone-800 mb-4 uppercase">New Quest</h3>
              <div className="space-y-3">
                <input placeholder="Quest Title" value={newTitle} onChange={e => setNewTitle(e.target.value)} className="w-full p-2 rounded border-2 border-stone-400 focus:border-[#5A7554] outline-none font-bold"/>
                <input placeholder="Goal" value={newDesc} onChange={e => setNewDesc(e.target.value)} className="w-full p-2 rounded border-2 border-stone-400 focus:border-[#5A7554] outline-none"/>
                <input placeholder="Quest Icon (Emoji)" value={newEmoji} onChange={e => setNewEmoji(e.target.value)} className="w-full p-2 rounded border-2 border-stone-400 focus:border-[#5A7554] outline-none"/>
                <button onClick={addTask} className="w-full bg-[#5A7554] text-white py-2 rounded font-black border-b-4 border-[#3d5238] active:border-0 active:translate-y-1 transition-all">START QUEST</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ACTION BUTTONS */}
      <div className="w-full max-w-2xl flex flex-col gap-3 mb-8">
        <motion.button whileTap={{ scale: 0.98 }} onClick={() => setShowAddForm(!showAddForm)} className="bg-[#f1e4c3] border-2 border-[#5A7554] text-stone-800 py-2 rounded-lg font-black shadow-[0_4px_0_0_#5A7554] hover:bg-white uppercase text-xs">
          {showAddForm ? "✖ Cancel Quest" : "+ Unlock New Quest"}
        </motion.button>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }} onClick={() => setIsFinished(true)} className="bg-[#5A7554] border-3 border-[#3d5238] text-white py-4 rounded-lg font-black shadow-[0_6px_0_0_#3d5238] uppercase tracking-widest text-lg">
          Finish the Day
        </motion.button>
      </div>

      {/* PROGRESS FOOTER */}
      <motion.div 
        initial={{ y: 50 }} 
        animate={{ y: 0 }} 
        className="w-full max-w-2xl bg-[#f1e4c3] border-4 border-[#b89a67] rounded-xl p-6 shadow-[0_8px_0_0_#b89a67] mb-10"
      >
        <div className="flex flex-col items-center gap-4">
          <p className="font-black text-lg text-stone-800 uppercase italic tracking-tighter">Your Vitality Level</p>
          <div className="w-full h-10 bg-[#4a3d24] rounded-xl border-4 border-[#b89a67] overflow-hidden flex items-center p-1 relative">
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: `${progressPercentage}%` }} 
              className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-lg shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)]" 
            />
            <div className="absolute inset-0 flex items-center justify-center">
               <span className="font-black text-white mix-blend-difference drop-shadow-md text-sm">{Math.round(progressPercentage)}%</span>
            </div>
          </div>
          <div className="flex gap-2">
             {[...Array(tasks.length)].map((_, i) => (
               <Heart key={i} size={16} className={i < completedCount ? "text-red-500 fill-red-500 animate-pulse" : "text-stone-400"} />
             ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ThyroterraDashboard;