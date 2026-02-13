import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Forest', href: '/years' },
    { name: 'Land', href: '/months' },
    { name: 'Progres', href: '/days' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between font-pixel bg-[#5A7554] border-b-4 border-black/20 shadow-lg">
      
      {/* LOGO */}
      <div className="flex items-center z-50 cursor-pointer hover:scale-105 transition-transform">
        <Link to="/">
          <img 
            src="/logo.png" 
            alt="Thyroterra Logo" 
            className="h-10 md:h-12 w-auto object-contain" 
          />
        </Link>
      </div>

      {/* DESKTOP MENU */}
      <ul className="hidden md:flex items-center gap-10 lg:gap-14">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              to={link.href}
              className="text-black text-lg font-black tracking-tight hover:text-white transition-colors uppercase"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* RIGHT SIDE: SIGN OUT & BURGER */}
      <div className="flex items-center gap-4">
        {/* Sign Out - Masqué sur petit mobile pour gagner de la place, ou visible selon ton choix */}
        <Link to="/" className="relative group transition-transform hover:scale-105 active:scale-95 hidden sm:block">
          <img 
            src="/sign.png" 
            alt="Sign Out" 
            className="h-10 md:h-12 w-28 object-contain"
          />
          <span className="absolute inset-0 flex items-center justify-center text-black text-[10px] md:text-xs font-black pt-1 uppercase">
            Sign out
          </span>
        </Link>

        {/* BURGER BUTTON (Mobile only) */}
        <button 
          onClick={toggleMenu}
          className="md:hidden z-50 p-2 bg-[#f1e4c3] border-2 border-black rounded-lg text-black shadow-[2px_2px_0_0_#000] active:translate-y-0.5 active:shadow-none transition-all"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE OVERLAY MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#5A7554] flex flex-col items-center justify-center gap-8 md:hidden z-40"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-black text-black hover:text-white uppercase tracking-widest transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            {/* Sign Out Mobile */}
            <Link 
              to="/" 
              onClick={() => setIsOpen(false)}
              className="relative mt-4 scale-125"
            >
              <img src="/sign.png" alt="Sign Out" className="h-10 w-auto" />
              <span className="absolute inset-0 flex items-center justify-center text-black font-black text-[10px] pt-1 uppercase">
                Sign out
              </span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar2;