import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Forest', href: '/years' },
    { name: 'Land', href: '/months' },
    { name: 'Progres', href: '/days' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-4 py-3 font-pixel bg-transparent">
      
      {/* HUD CONTAINER - justify-center pour aligner les titres au milieu */}
      <div className="max-w-6xl mx-auto flex items-center justify-center bg-[#f1e4c3] border-[3px] border-[#b89a67] rounded-full px-5 py-2 shadow-[0_6px_0_0_#b89a67] relative min-h-[50px]">
        
        {/* LEFT SIDE: LOGO - Absolute pour ne pas pousser les titres */}
        <div className="absolute left-4 md:left-6 flex items-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center"
          >
            <img 
              src="/logo.png" 
              alt="Thyroterra" 
              className="h-14 md:h-24 w-auto object-contain drop-shadow-md" 
              style={{ transform: 'translateY(-2px)' }} 
            />
          </motion.button>
        </div>

        {/* CENTER: NAVIGATION LINKS - Parfaitement centrés */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-10">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;

            return (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className={`relative text-[10px] lg:text-[11px] font-black tracking-widest transition-all uppercase flex items-center gap-2
                    ${isActive ? 'text-[#065C16]' : 'text-stone-500 hover:text-black'}`}
                >
                  {isActive && (
                    <motion.span 
                      layoutId="activeDot2" 
                      className="w-2 h-2 bg-[#065C16] rounded-full shadow-[0_0_8px_#99f6b4]" 
                    />
                  )}
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* RIGHT SIDE: EXIT BUTTON - Absolute à droite */}
        <div className="hidden md:flex items-center absolute right-4 md:right-6">
          <Link to="/">
            <motion.button 
              whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#4a5a42] border-2 border-[#607456] rounded-xl px-5 py-1 shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)]"
            >
              <span className="text-white font-black text-[9px] uppercase tracking-wider">
                Exit
              </span>
            </motion.button>
          </Link>
        </div>

        {/* MOBILE BURGER - Absolute à droite en mobile */}
        <div className="md:hidden absolute right-4 flex items-center z-50">
          <button 
            onClick={toggleMenu}
            className="text-stone-700 p-1"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU (Pause Menu Style) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center md:hidden z-40 p-6"
          >
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-[#f1e4c3] border-[4px] border-[#b89a67] p-8 rounded-[24px] w-full max-w-xs flex flex-col gap-4 shadow-[0_10px_0_0_#b89a67]"
            >
              <p className="text-[#b89a67] text-[10px] font-black text-center border-b border-[#b89a67] pb-2 mb-2 tracking-widest uppercase">Navigation</p>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-black uppercase text-stone-800 hover:text-green-800 flex items-center gap-3 transition-colors"
                >
                  <ChevronRight size={18} className="text-green-700" />
                  {link.name}
                </Link>
              ))}
              <Link to="/" onClick={() => setIsOpen(false)} className="mt-4">
                 <button className="w-full bg-[#4a5a42] text-white font-black py-3 rounded-xl uppercase text-xs tracking-widest">
                    Exit Game
                 </button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar2;