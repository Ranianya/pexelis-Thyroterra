// // import React from 'react';
// // import { motion } from 'framer-motion';
// // import { 
// //   Activity, 
// //   Stethoscope, 
// //   Droplets, 
// //   Smile, 
// //   Apple, 
// //   Syringe, 
// //   RotateCcw,
// //   Heart
// // } from 'lucide-react';

// // const MonthlyProgress = () => {
// //   const stats = [
// //     { id: 'activities', label: 'Activities', icon: <Activity />, progress: 40, position: 'top-left' },
// //     { id: 'doctor', label: 'doctor', icon: <Stethoscope />, progress: 90, position: 'top-right' },
// //     { id: 'water', label: 'Water', icon: <Droplets />, progress: 75, position: 'middle-right' },
// //     { id: 'moods', label: 'Moods shared', icon: <Smile />, progress: 100, position: 'bottom-right' },
// //     { id: 'eat', label: 'Eat', icon: <Apple />, progress: 95, position: 'bottom-left' },
// //     { id: 'meds', label: 'Meds logged', icon: <Syringe />, progress: 85, position: 'middle-left' },
// //   ];

// //   // Helper for radial positioning
// //   const getPositionClasses = (pos) => {
// //     const base = "absolute flex flex-col items-center group";
// //     const positions = {
// //       'top-left': `${base} -top-12 left-0 md:-left-20`,
// //       'top-right': `${base} -top-12 right-0 md:-right-20`,
// //       'middle-right': `${base} top-1/2 -translate-y-1/2 -right-16 md:-right-32`,
// //       'bottom-right': `${base} -bottom-12 right-0 md:-right-20`,
// //       'bottom-left': `${base} -bottom-12 left-0 md:-left-20`,
// //       'middle-left': `${base} top-1/2 -translate-y-1/2 -left-16 md:-left-32`,
// //     };
// //     return positions[pos];
// //   };

// //   return (
// //     <div className="min-h-screen bg-[url('./bg.png')] font-mono p-4 overflow-hidden flex flex-col items-center relative">
      
// //       {/* Top Header Navigation */}
// //       <div className="w-full max-w-4xl flex justify-between items-center mb-8">
// //         <div className="flex items-center gap-2">
// //           <div className="w-8 h-8 bg-green-700 rounded-sm border-2 border-stone-800" />
// //           <span className="text-stone-800 font-bold text-xl tracking-tighter">Thyroterra</span>
// //         </div>
// //         <div className="flex items-center gap-4">
// //           <div className="flex items-center gap-1 text-stone-800 font-bold bg-white/30 px-3 py-1 rounded-full border-2 border-stone-400">
// //             <Heart size={16} className="text-red-500 fill-red-500" />
// //             <span>x 02</span>
// //           </div>
// //           <button className="bg-black text-white p-2 rounded-lg hover:scale-110 transition-transform border-2 border-stone-700">
// //             <RotateCcw size={20} />
// //           </button>
// //         </div>
// //       </div>

// //       {/* Main Title Banner */}
// //       <div className="w-full max-w-xl bg-white border-x-[12px] border-green-500 py-4 px-8 shadow-[0_6px_0_0_rgba(0,0,0,0.1)] mb-20 flex items-center justify-center gap-4">
// //         <div className="w-6 h-6 bg-stone-800 clip-path-triangle transform rotate-90" />
// //         <h1 className="text-xl md:text-2xl font-black text-stone-800 uppercase tracking-widest">
// //           Your Monthly Progress
// //         </h1>
// //       </div>

// //       {/* Central Interactive Area */}
// //       <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
        
// //         {/* Animated Rings */}
// //         <div className="absolute inset-0 border-[10px] border-orange-200/40 rounded-full scale-125" />
// //         <div className="absolute inset-0 border-[6px] border-orange-200/60 rounded-full scale-110" />
// //         <div className="absolute inset-0 border-[2px] border-orange-200 rounded-full" />

// //         {/* The Evolution Tree (Center Piece) */}
// //         <motion.div 
// //           initial={{ scale: 0 }}
// //           animate={{ scale: 1 }}
// //           className="relative z-10"
// //         >
// //           <div className="w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[40px] border-b-green-400 mb-[-10px]" />
// //           <div className="w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[50px] border-b-green-500 mb-[-10px]" />
// //           <div className="w-0 h-0 border-l-[50px] border-l-transparent border-r-[50px] border-r-transparent border-b-[60px] border-b-green-600" />
// //           <div className="w-6 h-8 bg-orange-300 mx-auto border-x-2 border-stone-400" />
// //         </motion.div>

// //         {/* Stats Radial Grid */}
// //         {stats.map((stat) => (
// //           <div key={stat.id} className={getPositionClasses(stat.position)}>
// //             <div className="text-stone-700 mb-2 drop-shadow-sm scale-125">
// //               {stat.icon}
// //             </div>
// //             <span className="text-[10px] font-black uppercase mb-1 text-stone-800">{stat.label}</span>
// //             <HealthBar progress={stat.progress} />
// //           </div>
// //         ))}
// //       </div>

//     //   {/* Character Bubble */}
//     //   <div className="absolute bottom-16 left-8 md:left-24 flex items-end gap-2">
//     //     <div className="relative">
//     //       <div className="bg-[#f1e4c3] border-4 border-[#d9c5a3] rounded-2xl p-4 max-w-[180px] shadow-lg mb-4">
//     //         <p className="text-[12px] font-bold text-stone-800 leading-tight">
//     //           "Such a great progress for this month"
//     //         </p>
//     //         {/* Speech Bubble Tail */}
//     //         <div className="absolute -bottom-4 left-6 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[20px] border-t-[#d9c5a3]" />
//     //       </div>
//     //       {/* Pixel Character Placeholder */}
//     //       <div className="w-12 h-16 bg-blue-800 rounded-md border-4 border-stone-900 relative">
//     //         <div className="absolute top-1 left-1 w-8 h-4 bg-stone-300" /> {/* Face */}
//     //         <div className="absolute bottom-0 w-full h-4 bg-stone-900" /> {/* Feet */}
//     //       </div>
//     //     </div>
//     //   </div>

// //       {/* Ground Background */}
// //       <div className="absolute bottom-0 w-full h-12 bg-[#8c6a4a] border-t-8 border-[#4e8c31] flex flex-col overflow-hidden">
// //         <div className="w-full h-full opacity-30 bg-[radial-gradient(circle,transparent_20%,#70543a_20%,#70543a_80%,transparent_80%,transparent),radial-gradient(circle,transparent_20%,#70543a_20%,#70543a_80%,transparent_80%,transparent)] bg-[length:15px_15px] bg-[0_0,7.5px_7.5px]" />
// //       </div>
// //     </div>
// //   );
// // };

// // /* Custom HealthBar Component */
// // const HealthBar = ({ progress }) => {
// //   return (
// //     <div className="flex items-center gap-1">
// //       <Heart size={14} className="text-red-500 fill-red-500" />
// //       <div className="w-24 h-3 bg-stone-800 border-2 border-stone-900 rounded-sm p-[1px] flex items-center">
// //         <motion.div 
// //           initial={{ width: 0 }}
// //           animate={{ width: `${progress}%` }}
// //           className={`h-full ${progress < 50 ? 'bg-yellow-400' : 'bg-green-500'}`}
// //         />
// //         <div className="flex-1 h-full bg-stone-700" />
// //       </div>
// //       <Heart size={14} className="text-red-500 fill-red-500" />
// //     </div>
// //   );
// // };

// // export default MonthlyProgress;

// import React, { useMemo } from 'react';
// import { motion } from 'framer-motion';
// import { 
//   Activity, 
//   Stethoscope, 
//   Droplets, 
//   Smile, 
//   Apple, 
//   Syringe, 
//   RotateCcw,
//   Heart,
//   Cloud
// } from 'lucide-react';

// const MonthlyProgress = ({ monthlyStats, onBack }) => {
//   // Données par défaut si aucune prop n'est fournie
//   const stats = useMemo(() => monthlyStats || [
//     { id: 'activities', label: 'Activities', icon: <Activity size={18} />, progress: 40, position: 'top-left' },
//     { id: 'doctor', label: 'doctor', icon: <Stethoscope size={18} />, progress: 90, position: 'top-right' },
//     { id: 'meds', label: 'Meds logged', icon: <Syringe size={18} />, progress: 85, position: 'middle-left' },
//     { id: 'water', label: 'Water', icon: <Droplets size={18} />, progress: 75, position: 'middle-right' },
//     { id: 'eat', label: 'Eat', icon: <Apple size={18} />, progress: 95, position: 'bottom-left' },
//     { id: 'moods', label: 'Moods shared', icon: <Smile size={18} />, progress: 100, position: 'bottom-right' },
//   ], [monthlyStats]);

//   // Calcul de la progression globale pour faire "pousser" l'arbre
//   const globalProgress = useMemo(() => 
//     stats.reduce((acc, curr) => acc + curr.progress, 0) / stats.length
//   , [stats]);

//   const getPositionClasses = (pos) => {
//     const base = "absolute flex flex-col items-center z-20";
//     const positions = {
//       'top-left': `${base} top-[5%] left-[5%] md:left-[15%]`,
//       'top-right': `${base} top-[5%] right-[5%] md:right-[15%]`,
//       'middle-left': `${base} top-[40%] left-2 md:left-10`,
//       'middle-right': `${base} top-[40%] right-2 md:right-10`,
//       'bottom-left': `${base} bottom-[20%] left-[5%] md:left-[15%]`,
//       'bottom-right': `${base} bottom-[20%] right-[5%] md:right-[15%]`,
//     };
//     return positions[pos];
//   };

//   return (
//     <div className="min-h-screen bg-[url('./bg.png')] bg-cover  font-mono p-4 overflow-hidden flex flex-col items-center relative">
      
//       {/* Nuages décoratifs animés */}
//       <motion.div 
//         animate={{ x: [-20, 20] }} 
//         transition={{ repeat: Infinity, duration: 5, repeatType: "reverse" }}
//         className="absolute top-10 left-10 opacity-40 text-white"
//       >
//         <Cloud size={60} fill="currentColor" />
//       </motion.div>
//       <motion.div 
//         animate={{ x: [20, -20] }} 
//         transition={{ repeat: Infinity, duration: 7, repeatType: "reverse" }}
//         className="absolute top-24 right-20 opacity-30 text-white"
//       >
//         <Cloud size={80} fill="currentColor" />
//       </motion.div>

//       {/* Header */}
//         <div className="w-full max-w-2xl flex justify-between items-center mb-6 relative">

//         {/* Logo */}
//         <div className="w-16 h-16">
//             <img
//             src="./logo.png"
//             alt="Logo"
//             className="w-full h-full object-contain"
//             />
//         </div>

//         {/* Reset Button */}
//         <button
//             onClick={() => { 
//             localStorage.clear(); 
//             window.location.reload(); 
//             }}
//             className="bg-black p-2 rounded-lg text-white hover:scale-110 transition-transform"
//         >
//             <RotateCcw size={24} />
//         </button>

//         </div>


//       {/* Date Banner */}
//       <div className="w-full max-w-2xl bg-[#f1e4c3] border-4 border-[#89C33D] rounded-xl p-4 mb-8 text-center relative shadow-[0_8px_0_0_#1DA303]">
//         <h1 className="text-2xl md:text-3xl font-black text-stone-800 tracking-tighter">Your Monthly Progress </h1>

//       </div>

//       {/* Zone Centrale : L'Arbre de Vie */}
//       <div className="relative w-full max-w-2xl flex-1 flex items-center justify-center">
        
//         {/* Anneaux de croissance (évoluent avec globalProgress) */}
//         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//           <div className="w-64 h-64 border-[12px] border-[#E1D1AA] opacity-80 rounded-full animate-pulse" />
//           <div className="absolute w-80 h-80 border-[4px] border-[#D8CDB3] opacity-80 rounded-full" />
//         </div>

//         {/* L'Arbre Dynamique */}
//         <div className="relative z-10 flex flex-col items-center">
//           <motion.div 
//             initial={{ scale: 0 }} 
//             animate={{ scale: 1 }}
//             className="flex flex-col items-center"
//           >
//             {/* Sommet */}
//             <div className="w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[35px] border-[#89CFA6]" />
            
//             {/* Étage 2 (visible si progress > 30) */}
//             {globalProgress > 30 && (
//               <div className="w-0 h-0 border-l-[35px] border-l-transparent border-r-[35px] border-r-transparent border-b-[45px] border-[#70C593] -mt-5" />
//             )}
            
//             {/* Étage 3 (visible si progress > 60) */}
//             {globalProgress > 60 && (
//               <div className="w-0 h-0 border-l-[45px] border-l-transparent border-r-[45px] border-r-transparent border-b-[55px] border-[#65B787] -mt-6" />
//             )}

//             {/* Tronc */}
//             <div className="w-6 h-10 bg-[#D1A690] border-x-2 border-[#8D6856]" />
//           </motion.div>
//         </div>

//         {/* Stats tout autour */}
//         {stats.map((stat) => (
//           <div key={stat.id} className={getPositionClasses(stat.position)}>
//             <div className=" backdrop-blur-sm p-2 rounded-lg  mb-1 flex items-center justify-center text-[#046716]">
//               {stat.icon}
//             </div>
//             <span className="text-[10px] font-bold uppercase mb-1 text-stone-800 text-shadow-sm">{stat.label}</span>
//             <HealthBar progress={stat.progress} />
//           </div>
//         ))}
//       </div>

    //   {/* Character Bubble */}
    //   <div className="absolute bottom-16 left-8 md:left-24 flex items-end gap-2">
    //     <div className="relative">
    //       <motion.div 
    //         initial={{ y: 20, opacity: 0 }} 
    //         animate={{ y: 0, opacity: 1 }}
    //         className="bg-[#f1e4c3] border-2 border-[#d9c5a3] rounded-2xl p-3 max-w-[160px] relative mb-4 shadow-md"
    //       >
    //         <p className="text-[10px] font-bold text-stone-800 leading-tight">
    //           {globalProgress > 80 
    //             ? "Such a great progress for this month!" 
    //             : "Keep it up, your forest is growing!"}
    //         </p>
    //         <div className="absolute -bottom-2 left-4 w-4 h-4 bg-[#f1e4c3] border-r-2 border-b-2 border-[#d9c5a3] rotate-45" />
    //       </motion.div>
    //       {/* Pixel Character Placeholder */}
    //       <div className="w-20 h-20  ">
    //         <img src="./mario.png" alt="mario" className='bg-transparent'/>
    //       </div>
    //     </div>
    //   </div>


    //   {/* Sol Pixelisé Multi-couches */}
    //   <div className="absolute bottom-0 w-full z-10">
    //     <div className="h-4 bg-[#47A548] w-full border-t-2 border-[#2F5B2F]" />
    //     <div className="h-12 bg-[#8B8948] w-full flex flex-col">
    //         <div className="h-2 bg-[#70543a] w-full opacity-50" />
    //         <div className="flex-1 w-full bg-[radial-gradient(#614832_1px,transparent_1px)] [background-size:10px_10px] opacity-30" />
    //     </div>
    //   </div>
//     </div>
//   );
// };

// /* HealthBar Dynamique */
// const HealthBar = ({ progress }) => {
//   return (
//     <div className="flex items-center gap-1">
//       <Heart size={10} className={`${progress > 0 ? 'text-red-500 fill-red-500' : 'text-stone-400'} transition-colors`} />
//       <div className="w-20 h-2.5 bg-stone-900 border border-stone-700 rounded-full overflow-hidden p-[1.5px]">
//         <motion.div 
//           initial={{ width: 0 }} 
//           animate={{ width: `${progress}%` }}
//           className={`h-full rounded-full ${
//             progress < 30 ? 'bg-red-500' : progress < 70 ? 'bg-yellow-400' : 'bg-green-500'
//           }`}
//         />
//       </div>
//       <Heart size={10} className={`${progress === 100 ? 'text-red-500 fill-red-500' : 'text-stone-400'} transition-colors`} />
//     </div>
//   );
// };

// export default MonthlyProgress;

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
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
  };
    const handleBack = () => {
    setView('list');
    setUserQuestion('');
    setOpenIndex(null);
  };

  return (
    <div className="min-h-screen bg-[url('./bg.png')] bg-cover font-mono p-3 sm:p-4 overflow-x-hidden flex flex-col items-center relative">

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
            <img src="./logo.png" alt="logo" className="w-full h-full object-contain cursor-pointer" onClick={handleBack}/>
          </div>

          <div className="flex gap-2">
            { (
              <button
                onClick={() => { localStorage.clear(); window.location.reload(); }}
                className="bg-black p-2 rounded-lg text-white hover:scale-110 transition-transform"
              >
                <RotateCcw size={18} className="sm:w-5 sm:h-5"/>
              </button>
            )}

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
