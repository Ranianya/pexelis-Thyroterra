import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Stethoscope, Droplets, Smile, Apple, Syringe, Heart, Cloud } from 'lucide-react';

const MonthlyProgress = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch("http://localhost:5000/api/monthly/stats", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Stats fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMonthlyData();
  }, []);

  // UI Mapping for the floating bars
  const statConfig = [
    { id: 'activities', label: 'Activities', icon: <Activity size={18} />, pos: 'top-left' },
    { id: 'meds', label: 'Meds', icon: <Syringe size={18} />, pos: 'middle-left' },
    { id: 'water', label: 'Water', icon: <Droplets size={18} />, pos: 'middle-right' },
    { id: 'moods', label: 'Moods', icon: <Smile size={18} />, pos: 'bottom-right' },
  ];

  const globalAvg = stats ? Object.values(stats).reduce((a, b) => a + b, 0) / 4 : 0;

  if (loading) return <div className="min-h-screen bg-[#5A7554] flex items-center justify-center font-pixel text-white">CALCULATING VITALITY...</div>;

  return (
    <div className="min-h-screen bg-[url('./bg.png')] bg-cover font-pixel p-4 flex flex-col items-center relative overflow-hidden">
      <div className="w-full max-w-2xl bg-[#f1e4c3] border-4 border-[#89C33D] rounded-xl p-4 mb-10 text-center shadow-[0_8px_0_0_#1DA303]">
        <h1 className="text-2xl font-black text-stone-800 uppercase">Monthly Vitality</h1>
      </div>

      {/* The RPG Tree */}
      <div className="relative w-full max-w-lg h-[400px] flex items-center justify-center">
        {/* Growing Tree Logic based on global progress */}
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: globalAvg > 10 ? 1 : 0.5 }} 
          className="relative z-10 flex flex-col items-center"
        >
          <div className="w-0 h-0 border-l-[40px] border-r-[40px] border-b-[60px] border-[#65B787]" />
          <div className="w-8 h-10 bg-[#D1A690]" />
        </motion.div>

        {/* Floating Stat Bars */}
        {statConfig.map((s) => (
          <div key={s.id} className={`absolute flex flex-col items-center ${getPos(s.pos)}`}>
            <div className="text-green-800 mb-1">{s.icon}</div>
            <span className="text-[10px] font-bold uppercase">{s.label}</span>
            <div className="w-20 h-3 bg-black rounded-full p-[2px] border border-white/20">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${stats?.[s.id] || 0}%` }}
                className="h-full bg-green-500 rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const getPos = (pos) => {
  if (pos === 'top-left') return 'top-10 left-10';
  if (pos === 'middle-right') return 'top-1/2 right-4';
  if (pos === 'bottom-right') return 'bottom-10 right-10';
  return 'top-1/2 left-4';
};

export default MonthlyProgress;