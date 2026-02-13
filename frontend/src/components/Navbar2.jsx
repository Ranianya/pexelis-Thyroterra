import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Pour savoir sur quelle page on est

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Forest', href: '/years' },
    { name: 'Land', href: '/months' },
    { name: 'Progres', href: '/days' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-2 grid grid-cols-3 items-center font-pixel bg-[#5A7554] border-b-4 border-black/20 shadow-lg">
      
      {/* LEFT SIDE: LOGO  */}
      <div className="flex items-center z-50 w-32 h-10"> {/* Largeur fixe pour réserver l'espace à gauche */}
  <button 
    onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
    className="absolute top-1/2 -translate-y-1/2 transition-transform hover:scale-110"
  >
    <img 
      src="/logo.png" 
      alt="Thyroterra Logo" 
      className="h-16 md:h-40 w-auto object-contain drop-shadow-md" 
    />
  </button>
</div>

      {/* COLONNE 2 - MENU (centré) */}
      <ul className="hidden md:flex items-center justify-center gap-10 lg:gap-14">
        {navLinks.map((link) => {
          // On vérifie si le chemin actuel correspond au lien
          const isActive = location.pathname === link.href;

          return (
            <li key={link.name}>
              <Link
                to={link.href}
                className={`text-base lg:text-lg font-black tracking-tight transition-colors uppercase 
                  ${isActive ? 'text-white' : 'text-black hover:text-white'}`}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* COLONNE 3 - BOUTONS (alignés à droite) */}
      <div className="flex items-center justify-end gap-4">
        <Link 
          to="/" 
          className="hidden sm:block relative group transition-transform hover:scale-105 active:scale-95"
        >
          <img 
            src="/sign.png" 
            alt="Sign Out" 
            className="h-8 md:h-10 w-auto object-contain"
          />
          <span className="absolute inset-0 flex items-center justify-center text-black text-[8px] md:text-[10px] font-black pt-1 uppercase">
            Sign out
          </span>
        </Link>

        {/* BURGER BUTTON (Mobile only) */}
        <button 
          onClick={toggleMenu}
          className="md:hidden z-50 p-1.5 bg-[#f1e4c3] border-2 border-black rounded-lg text-black shadow-[2px_2px_0_0_#000]"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar2;