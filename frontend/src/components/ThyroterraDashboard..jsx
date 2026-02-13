import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, RotateCcw, Pill, Droplets, Footprints, Apple, Moon, Menu, X, Star, Smile, Frown } from 'lucide-react';

const ThyroterraDashboard = () => {
  const { dayId } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 1. Fetch habits for the specific day from your Backend
  useEffect(() => {
    const loadQuests = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/habits/day/${dayId}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });

        // ✅ FIX: Check if response is JSON before parsing to avoid "Unexpected token <" error
        if (!response.ok) throw new Error("Server error or Route not found");
        
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        console.error("Fetch error:", err);
        // Fallback to empty if server fails
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };
    loadQuests();
  }, [dayId]);

  const toggleComplete = async (habitId) => {
    const token = localStorage.getItem('token');
    // Toggle locally for instant UI feedback
    setTasks(prev => prev.map(t => t.id === habitId ? {...t, completed: !t.completed} : t));

    // Sync with Backend Progress controller
    try {
      await fetch("http://localhost:5000/api/progress/toggle", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ habitId, dayId })
      });
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  if (loading) return <div className="min-h-screen bg-[#5A7554] flex items-center justify-center font-pixel text-white">LOADING QUESTS...</div>;

  return (
    <div className="min-h-screen bg-[url('./bg.png')] bg-cover font-pixel p-4 flex flex-col items-center">
      {/* Header & Nav logic same as your provided design */}
      <header className="w-full max-w-6xl flex items-center justify-between mb-8 z-50">
        <div className="w-16 h-16 cursor-pointer" onClick={() => navigate('/years')}>
          <img src="/logo.png" alt="logo" />
        </div>
        <h1 className="bg-[#f1e4c3] border-4 border-[#b89a67] px-8 py-2 rounded-xl text-2xl font-black shadow-[0_4px_0_0_#b89a67]">
          DAY {dayId}
        </h1>
        <button onClick={() => navigate(-1)} className="bg-black p-2 rounded-lg text-white">
          <RotateCcw size={24}/>
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {tasks.length > 0 ? tasks.map((task, index) => (
          <TaskCard key={task.id} task={task} toggleComplete={toggleComplete} index={index} />
        )) : (
          <div className="col-span-full text-center text-white p-10 bg-black/20 rounded-xl">
            No quests found for this day. Add them in the database!
          </div>
        )}
      </div>
    </div>
  );
};

const TaskCard = ({ task, toggleComplete, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-[#f5ead1] border-4 border-[#d9c5a3] p-6 rounded-xl flex flex-col items-center text-center shadow-[6px_6px_0_0_#d9c5a3]"
  >
    <h3 className="text-xs font-black text-stone-500 mb-2 uppercase">{task.title}</h3>
    <p className="text-sm font-bold text-stone-800 mb-4">{task.description}</p>
    <button 
      onClick={() => toggleComplete(task.id)}
      className={`w-full py-3 rounded-lg font-black border-b-4 transition-all ${
        task.completed ? 'bg-green-500 border-green-700 text-white' : 'bg-[#e2d6b8] border-stone-400'
      }`}
    >
      {task.completed ? 'DONE ✓' : 'I DID IT'}
    </button>
  </motion.div>
);

export default ThyroterraDashboard;