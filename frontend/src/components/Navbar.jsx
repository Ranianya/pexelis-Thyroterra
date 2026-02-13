import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom'; 
import { Menu, X } from 'lucide-react'; // Assure-toi d'avoir lucide-react installé
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', href: 'hero', type: 'scroll' }, 
    { name: 'About', href: 'about', type: 'scroll' },
    { name: 'Story', href: 'story', type: 'scroll' },
    { name: 'FAQ', href: '/FAQ', type: 'link' },
  ];

  const handleNavClick = (link) => {
    setIsOpen(false); // Ferme le menu mobile après clic
    
    if (link.type === 'scroll') {
      const element = document.getElementById(link.href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Si on n'est pas sur la page d'accueil, on navigue vers / d'abord
        navigate('/');
        setTimeout(() => {
          document.getElementById(link.href)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      navigate(link.href);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-4 flex items-center justify-between font-pixel bg-[#5A7554] shadow-lg">
      
      {/* LEFT SIDE: LOGO */}
      <div className="flex items-center z-50">
        <button onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <img 
            src="/logo.png" 
            alt="Thyroterra Logo" 
            className="h-10 md:h-12 w-auto object-contain cursor-pointer hover:scale-105 transition-transform" 
          />
        </button>
      </div>

      {/* CENTER: DESKTOP NAVIGATION */}
      <ul className="hidden md:flex items-center gap-8 lg:gap-12">
        {navLinks.map((link) => (
          <li key={link.name}>
            <button
              onClick={() => handleNavClick(link)}
              className="text-black text-sm lg:text-base font-black tracking-tight hover:text-white transition-colors uppercase cursor-pointer"
            >
              {link.name}
            </button>
          </li>
        ))}
      </ul>

      {/* RIGHT SIDE: ACTIONS (Desktop) */}
      <div className="hidden md:flex items-center">
        <RouterLink to="/signin" className="relative group transition-transform hover:scale-105 active:scale-95">
          <img 
            src="/sign.png" 
            alt="SignIn" 
            className="h-10 lg:h-12 w-auto object-contain"
          />
          <span className="absolute inset-0 flex items-center justify-center text-black font-black text-[10px] lg:text-xs pt-1 uppercase">
            Sign in
          </span>
        </RouterLink>
      </div>

      {/* MOBILE BURGER BUTTON */}
      <div className="md:hidden flex items-center gap-4 z-50">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-black bg-white/20 rounded-lg border-2 border-black active:scale-90 transition-all"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
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
              <button
                key={link.name}
                onClick={() => handleNavClick(link)}
                className="text-2xl font-black text-black hover:text-white uppercase tracking-widest"
              >
                {link.name}
              </button>
            ))}
            
            <RouterLink 
              to="/signin" 
              onClick={() => setIsOpen(false)}
              className="relative mt-4 scale-150"
            >
              <img src="/sign.png" alt="SignIn" className="h-10 w-auto" />
              <span className="absolute inset-0 flex items-center justify-center text-black font-black text-[10px] pt-1 uppercase">
                Sign in
              </span>
            </RouterLink>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;