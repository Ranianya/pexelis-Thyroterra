import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

const ThyroterraDashboard = () => {
  const { dayId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await api.get(`/habits/day/${dayId}`);
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [dayId]);

  const toggleTask = async (habitId) => {
    try {
      // Optimistic UI update
      setTasks(prev => prev.map(t => t.id === habitId ? {...t, completed: !t.completed} : t));
      
      // Call your progress toggle endpoint
      await api.post('/progress/toggle', { habitId, dayNumber: dayId });
    } catch (err) {
      console.error("Toggle failed", err);
    }
  };

  if (loading) return <div className="font-pixel text-white">Loading Quests...</div>;

  return (
    <div className="min-h-screen bg-[#5A7554] font-pixel p-10">
      <h1 className="text-white text-3xl mb-10 text-center">Day {dayId} Quests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map(task => (
          <div key={task.id} className="bg-[#f5ead1] p-6 rounded-xl border-4 border-[#d9c5a3]">
            <p className="font-bold mb-4">{task.title}</p>
            <button 
              onClick={() => toggleTask(task.id)}
              className={`w-full py-2 rounded ${task.completed ? 'bg-green-500' : 'bg-gray-400'}`}
            >
              {task.completed ? "COMPLETED" : "MARK DONE"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThyroterraDashboard;