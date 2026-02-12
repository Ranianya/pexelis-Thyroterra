// import React, { useState, useEffect } from 'react';
// import { Heart, RotateCcw, Smile, Frown, Pill, Droplets, Footprints, Apple, Moon } from 'lucide-react';
// import { motion } from 'framer-motion';

// const defaultTasks = [
//   { id: 1, title: 'MORNING EXPLORER!', desc: 'YOUR MAGIC PILL', icon: 'pill', action: 'I DID IT', completed: false },
//   { id: 2, title: 'HYDRATION QUEST:', desc: 'DRINK 6 GLASSES TODAY', icon: 'droplets', action: 'DRANK IT', completed: false },
//   { id: 3, title: 'TAKE A SHORT WALK', desc: 'TO BOOST YOUR ENERGY', icon: 'footprints', action: 'WALK DONE', completed: false },
//   { id: 4, title: 'FUEL UP', desc: 'EAT SOMETHING HEALTHY AND LIGHT', icon: 'apple', action: 'ENERGY GAINED', completed: false },
//   { id: 5, title: 'HOW ARE YOU FEELING?', desc: 'TRACK YOUR MOOD', icon: 'mood', action: 'FEEL IT', completed: false },
//   { id: 6, title: 'SLEEP ON TIME', desc: 'GO TO BED EARLY', icon: 'moon', action: 'DREAM MODE', completed: false },
// ];

// const getIconComponent = (icon) => {
//   switch(icon){
//     case 'pill': return <Pill />;
//     case 'droplets': return <Droplets />;
//     case 'footprints': return <Footprints />;
//     case 'apple': return <Apple />;
//     case 'moon': return <Moon />;
//     case 'mood': 
//       return <div className="flex gap-2 justify-center">
//         <Smile className="hover:text-green-600 cursor-pointer" />
//         <Frown className="hover:text-red-600 cursor-pointer" />
//       </div>;
//     default: return <span>{icon}</span>;
//   }
// };

// const TaskCard = ({ task, toggleComplete, removeTask }) => (
//   <motion.div 
//     key={task.id}
//     whileHover={{ y: -5 }}
//     className={`bg-[#f5ead1] border-2 border-[#d9c5a3] p-4 rounded-xl flex flex-col items-center text-center relative overflow-hidden shadow-md
//       ${task.completed ? `Completed: ${task.action}` : task.action }`}
//   >
//     <h3 className="text-[10px] font-black text-stone-500 mb-2 leading-tight uppercase">{task.title}</h3>
//     <p className="text-[11px] font-bold text-stone-800 mb-3 leading-tight h-8">{task.desc}</p>
    
//     <div className="mb-4 text-stone-700 text-2xl">{getIconComponent(task.icon)}</div>

//     <div className="flex flex-col gap-2 w-full">
//       <button
//         onClick={() => toggleComplete(task.id)}
//         className={`mt-auto text-[10px] font-black py-2 px-4 rounded-lg border-2 transition-colors w-full
//           ${task.completed
//             ? 'bg-green-500 text-white border-green-700'
//             : 'bg-[#f1e4c3] border-[#b89a67] text-stone-700 hover:bg-[#e6d5b0]'}`}
//       >
//         {task.completed ? 'COMPLETED' : task.action}
//       </button>
//       {task.isCustom && (
//         <button
//           onClick={() => removeTask(task.id)}
//           className="mt-1 text-[10px] font-black py-1 px-4 rounded-lg border-2 border-red-500 text-red-700 hover:bg-red-500 hover:text-white w-full"
//         >
//           REMOVE
//         </button>
//       )}
//     </div>
//   </motion.div>
// );

// const ThyroterraDashboard = () => {
//   const [tasks, setTasks] = useState(() => {
//     const stored = localStorage.getItem('thyroterra-tasks');
//     return stored ? JSON.parse(stored) : defaultTasks;
//   });
//   const [feedback, setFeedback] = useState({ message: '', type: '' });
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [newTitle, setNewTitle] = useState('');
//   const [newDesc, setNewDesc] = useState('');
//   const [newEmoji, setNewEmoji] = useState('');
  
//   useEffect(() => {
//     localStorage.setItem('thyroterra-tasks', JSON.stringify(tasks));
//     const completedCount = tasks.filter(t => t.completed).length;
//     if(completedCount === 0) setFeedback({ message: 'Ready to start?', type: 'neutral' });
//     else if(completedCount < 3) setFeedback({ message: 'Adjust your routine before your health deteriorates', type: 'warning' });
//     else if(completedCount === 3) setFeedback({ message: 'Keep going!', type: 'encouraging' });
//     else setFeedback({ message: 'Perfect!', type: 'celebration' });
//   }, [tasks]);

//   const toggleComplete = (id) => setTasks(tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t));
//   const removeTask = (id) => setTasks(tasks.filter(t => t.id !== id));

//   const addTask = () => {
//     if(!newTitle.trim()) return;
//     const newTask = {
//       id: Math.max(...tasks.map(t => t.id)) + 1,
//       title: newTitle,
//       desc: newDesc,
//       icon: newEmoji || '⭐',
//       action: 'COMPLETE',
//       completed: false,
//       isCustom: true
//     };
//     setTasks([...tasks, newTask]);
//     setNewTitle(''); setNewDesc(''); setNewEmoji('');
//     setShowAddForm(false);
//   };

//   const completedCount = tasks.filter(t => t.completed).length;
//   const progressPercentage = (completedCount / tasks.length) * 100;

//   return (
//     <div className="min-h-screen bg-[url('./bg.png')] bg-cover bg-center font-mono p-4 flex flex-col items-center">
//       {/* Header */}
//       <div className="w-full max-w-2xl flex justify-between items-start mb-6">
//         <div className="bg-[#f1e4c3] border-4 border-[#b89a67] px-4 py-1 rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
//           <span>🌳</span>
//           <span className="text-stone-700 font-bold text-lg">Thyroterra</span>
//         </div>
//         <button className="bg-black p-2 rounded-lg text-white hover:scale-110 transition-transform">
//           <RotateCcw size={24} />
//         </button>
//       </div>

//       {/* Date Banner */}
//       <div className="w-full max-w-2xl bg-[#f1e4c3] border-4 border-[#b89a67] rounded-xl p-4 mb-8 text-center relative shadow-[0_8px_0_0_#b89a67]">
//         <h1 className="text-2xl md:text-3xl font-black text-stone-800 tracking-tighter">Sunday, Feb 1</h1>
//         <p className="text-stone-600 font-bold uppercase text-sm mt-1">Daily Progress</p>
//         <div className="absolute -right-4 top-12 flex items-center bg-stone-200 px-3 py-1 rounded-full border-2 border-stone-400">
//           <Heart className="text-red-500 fill-red-500 mr-1" size={18} />
//           <span className="font-bold text-stone-700">x {completedCount}</span>
//         </div>
//       </div>

//       {/* Tasks Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-6">
//         {tasks.map(task => (
//           <TaskCard
//             key={task.id}
//             task={task}
//             toggleComplete={toggleComplete}
//             removeTask={removeTask}
//           />
//         ))}
//       </div>

//       {/* Add Task Form */}
//       {showAddForm && (
//         <div className="bg-[#f1e4c3] border-4 border-[#b89a67] rounded-xl p-6 mb-6 shadow-lg w-full max-w-2xl">
//           <h3 className="text-lg font-bold text-stone-800 mb-4">Add New Task</h3>
//           <input placeholder="Title" value={newTitle} onChange={e => setNewTitle(e.target.value)} className="w-full p-2 mb-2 rounded border-2 border-stone-400"/>
//           <input placeholder="Description" value={newDesc} onChange={e => setNewDesc(e.target.value)} className="w-full p-2 mb-2 rounded border-2 border-stone-400"/>
//           <input placeholder="Emoji or Icon" value={newEmoji} onChange={e => setNewEmoji(e.target.value)} className="w-full p-2 mb-4 rounded border-2 border-stone-400"/>
//           <button onClick={addTask} className="w-full bg-[#5A7554] cursor-pointer text-white py-2 rounded ">Add Task</button>
//         </div>
//       )}

//       {/* Add to Routine Button */}

//         <div className="w-full max-w-2xl bg-[#f1e4c3] border-4 border-[#5A7554] rounded-xl p-4 mb-8 text-center relative shadow-[0_8px_0_0_#5A7554]">
//             <button onClick={() => setShowAddForm(!showAddForm)} className="mb-5  text-black py-3 px-6  font-bold hover:bg-[#5A7554] cursor-pointer transition-colors rounded-lg ">
//                 Add to the Routine
//             </button>
//         </div>

//       {/* Progress Footer */}
//       <div className="w-full max-w-2xl bg-[#f1e4c3] border-4 border-[#b89a67] rounded-xl p-6 shadow-[0_8px_0_0_#b89a67]">
//         <div className="flex flex-col items-center gap-4">
//           <p className={`font-black text-lg transition-all duration-500
//             ${feedback.type === 'warning' ? 'text-red-600 animate-pulse' : 'text-stone-800'}`}>
//             {feedback.message}
//           </p>
//           <div className="w-full h-8 bg-[#b89a67] rounded-full border-4 border-[#b89a67] overflow-hidden flex items-center px-1">
//             <motion.div 
//               initial={{ width: 0 }}
//               animate={{ width: `${progressPercentage}%` }}
//               className="h-4 bg-[#6B5B31] rounded-full transition-all duration-700"
//             />
//           </div>
//           <span className="font-black text-stone-700">{completedCount}/{tasks.length}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ThyroterraDashboard;

import React, { useState, useEffect } from 'react';
import { Heart, RotateCcw, Smile, Frown, Pill, Droplets, Footprints, Apple, Moon } from 'lucide-react';
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
        <Smile className="hover:text-green-600 cursor-pointer" />
        <Frown className="hover:text-red-600 cursor-pointer" />
      </div>;
    default: return <span>{icon}</span>;
  }
};

const TaskCard = ({ task, toggleComplete, removeTask }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`bg-[#f5ead1] border-2 border-[#d9c5a3] p-4 rounded-xl flex flex-col items-center text-center relative overflow-hidden shadow-md transition-all
      ${task.completed ? 'opacity-80' : ''}`}
  >
    <h3 className="text-[10px] font-black text-stone-500 mb-2 leading-tight uppercase">{task.title}</h3>
    <p className="text-[11px] font-bold text-stone-800 mb-3 leading-tight h-8">{task.desc}</p>
    
    <div className="mb-4 text-stone-700 text-2xl">{getIconComponent(task.icon)}</div>

    <div className="flex flex-col gap-2 w-full">
      <button
        onClick={() => toggleComplete(task.id)}
        className={`mt-auto text-[10px] font-black py-2 px-4 rounded-lg border-2 transition-colors w-full
          ${task.completed
            ? 'bg-green-500 text-white border-green-700'
            : 'bg-[#f1e4c3] border-[#b89a67] text-stone-700 hover:bg-[#e6d5b0]'}`}
      >
        {task.completed ? 'COMPLETED' : task.action}
      </button>
      {task.isCustom && (
        <button
          onClick={() => removeTask(task.id)}
          className="mt-1 text-[10px] font-black py-1 px-4 rounded-lg border-2 border-red-500 text-red-700 hover:bg-red-500 hover:text-white w-full"
        >
          REMOVE
        </button>
      )}
    </div>
  </motion.div>
);

const ThyroterraDashboard = () => {
    // Button shiw your progress
     const navigate = useNavigate();
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem('thyroterra-tasks');
    return stored ? JSON.parse(stored) : defaultTasks;
  });
  const [isFinished, setIsFinished] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
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
      title: newTitle,
      desc: newDesc,
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
  const progressPercentage = (completedCount / tasks.length) * 100;

  // Logique des messages de fin
  const getFinishContent = () => {
    if (completedCount < 3) return { msg: "ADJUST YOUR ROUTINE BEFORE YOUR HEALTH DETERIORATES", sub: "Take small steps tomorrow!" };
    if (completedCount === 3) return { msg: "KEEP GOING!", sub: "You're halfway there, don't stop now!" };
    return { msg: "PERFECT!", sub: "THE TREES ARE PROUD OF YOU. YOUR FOREST IS BLOOMING TODAY" };
  };

  // --- ÉCRAN DE RÉSULTAT FINAL ---
  if (isFinished) {
    const content = getFinishContent();
    return (
      <div className="min-h-screen bg-[url(./bg.png)] font-mono p-4 flex flex-col items-center justify-center">
         <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          className="bg-[#f1e4c3] border-4 border-[#b89a67] rounded-xl p-8 max-w-2xl w-full text-center shadow-[0_12px_0_0_#b89a67] relative"
        >
          {/* Étoiles décoratives style pixel */}
          <div className="absolute top-4 left-4 text-blue-300">✦</div>
          <div className="absolute bottom-4 right-4 text-blue-300">✦</div>
          <div className="absolute top-10 right-10 text-white">✦</div>
          <div className="absolute top-10 right-10 text-white">✦</div>

          <h2 className="text-2xl md:text-3xl font-black text-stone-800 mb-6 leading-tight uppercase">
            {content.msg}
          </h2>
          <p className="text-lg font-bold text-stone-700 mb-8">
            {content.sub}
          </p>

          <button 
            className="bg-[#5A7554] text-white py-3 px-8 rounded-full border-4 border-[#3d5238] font-black hover:scale-105 transition-transform"
          >
            LEVEL UP!
          </button>
        </motion.div>

        {/* Barre de progression finale */}
        <div className="mt-12 w-full max-w-2xl bg-[#f1e4c3] border-4 border-[#b89a67] rounded-xl p-4 shadow-[0_8px_0_0_#b89a67]">
            <p className="text-center font-bold mb-2">Your Current Progress!</p>
            <div className="w-full h-8 bg-[#b89a67] rounded-full border-4 border-[#b89a67] overflow-hidden flex items-center px-1">
                <div style={{ width: `${progressPercentage}%` }} className="h-4 bg-[#6B5B31] rounded-full" />
            </div>
            <p className="text-right font-black mt-1">{completedCount}/{tasks.length}</p>
        </div>

        <button 
            onClick={() => navigate('/monthly-progress')}
            className="mt-6 bg-[#3d5238] text-white px-6 py-3 rounded-xl font-bold hover:bg-black transition-colors"
        >
            Show your Monthly progress
        </button>
      </div>
    );
  }

  // --- ÉCRAN PRINCIPAL DU DASHBOARD ---
  return (
    <div className="min-h-screen bg-[url(./bg.png)] bg-cover font-mono p-4 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-2xl flex justify-between items-center mb-6">

        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
          <img src="./logo.png" alt="logo" className="w-full h-full object-contain"/>
        </div>

        <button
          onClick={() => { localStorage.clear(); window.location.reload(); }}
          className="bg-black p-2 rounded-lg text-white hover:scale-110 transition-transform"
        >
          <RotateCcw size={22}/>
        </button>

      </div>

      {/* Date Banner */}
      <div className="w-full max-w-2xl bg-[#f1e4c3] border-4 border-[#b89a67] rounded-xl p-4 mb-8 text-center relative shadow-[0_8px_0_0_#b89a67]">
        <h1 className="text-2xl md:text-3xl font-black text-stone-800 tracking-tighter">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
        </h1>

        <p className="text-stone-600 font-bold uppercase text-sm mt-1">Daily Progress</p>
        <div className="absolute -right-4 top-12 flex items-center bg-stone-200 px-3 py-1 rounded-full border-2 border-stone-400 shadow-md">
          <Heart className="text-red-500 fill-red-500 mr-1" size={18} />
          <span className="font-bold text-stone-700">x {completedCount}</span>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-6">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} toggleComplete={toggleComplete} removeTask={removeTask} />
        ))}
      </div>

      {/* Add Task Form */}
      <AnimatePresence>
        {showAddForm && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="w-full max-w-2xl overflow-hidden">
                <div className="bg-[#f1e4c3] border-4 border-[#b89a67] rounded-xl p-6 mb-6 shadow-lg w-full max-w-2xl">
                    <h3 className="text-lg font-bold text-stone-800 mb-4">Add New Task</h3>
                    <input placeholder="Title" value={newTitle} onChange={e => setNewTitle(e.target.value)} className="w-full p-2 mb-2 rounded border-2 border-stone-400"/>
                    <input placeholder="Description" value={newDesc} onChange={e => setNewDesc(e.target.value)} className="w-full p-2 mb-2 rounded border-2 border-stone-400"/>
                    <input placeholder="Emoji or Icon" value={newEmoji} onChange={e => setNewEmoji(e.target.value)} className="w-full p-2 mb-4 rounded border-2 border-stone-400"/>
                    <button onClick={addTask} className="w-full bg-[#5A7554] cursor-pointer text-white py-2 rounded ">Add Task</button>
                </div>
            </motion.div>
        )}
      </AnimatePresence>


      {/* Boutons d'action : ADD et DONE */}
        <div className="w-full max-w-2xl flex flex-col gap-3 mb-6">

        {!showAddForm ? (
            <button
            onClick={() => setShowAddForm(true)}
            className="
                bg-[#f1e4c3]
                border-2 border-[#5A7554]
                text-stone-800
                py-2
                px-4
                rounded-lg
                font-bold
                text-sm
                shadow-[0_4px_0_0_#5A7554]
                hover:translate-y-0.5
                hover:shadow-[0_2px_0_0_#5A7554]
                transition-all
            "
            >
            + ADD TO THE ROUTINE
            </button>
        ) : (
            <button
            onClick={() => setShowAddForm(false)}
            className="
                bg-red-300
                border-2 border-red-600
                text-red-900
                py-2
                px-4
                rounded-lg
                font-bold
                text-sm
                shadow-[0_4px_0_0_#7f1d1d]
                hover:translate-y-0.5
                hover:shadow-[0_2px_0_0_#7f1d1d]
                transition-all
            "
            >
            ✖ CANCEL
            </button>
        )}

        {/* DONE BUTTON */}
        <button 
            onClick={() => setIsFinished(true)}
            className="
            bg-[#5A7554]
            border-3 border-[#3d5238]
            text-white
            py-2.5
            rounded-lg
            font-black
            text-base
            shadow-[0_4px_0_0_#3d5238]
            hover:translate-y-0.5
            hover:shadow-[0_2px_0_0_#3d5238]
            transition-all
            uppercase
            tracking-wider
            "
        >
            DONE
        </button>

        </div>


      {/* Progress Footer (Sticky-like) */}
      <div className="w-full max-w-2xl bg-[#f1e4c3] border-4 border-[#b89a67] rounded-xl p-6 shadow-[0_8px_0_0_#b89a67]">
        <div className="flex flex-col items-center gap-4">
          <p className="font-black text-lg text-stone-800">Your Current Progress</p>
          <div className="w-full h-8 bg-[#b89a67] rounded-full border-4 border-[#b89a67] overflow-hidden flex items-center px-1">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              className="h-4 bg-[#6B5B31] rounded-full transition-all duration-700"
            />
          </div>
          <span className="font-black text-stone-700">{completedCount}/{tasks.length}</span>
        </div>
      </div>
    </div>
  );
};

export default ThyroterraDashboard;