import React from 'react';
import { Link } from 'react-router-dom';

const Navbar2 = () => {
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Forest', href: '/years' },
    { name: 'Land', href: '/months' },
    { name: 'Progres', href: '/days' },
    { name: 'FAQ', href: '/FAQ' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between font-pixel bg-[#5A7554]">
   
      <div className="flex items-center cursor-pointer hover:scale-105 transition-transform">
        <Link to="/">
          <img 
            src="/logo.png" 
            alt="Thyroterra Logo" 
            className="h-12 w-auto object-contain" 
          />
        </Link>
      </div>

     
      <ul className="flex items-center gap-10 md:gap-14">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              to={link.href}
              className="text-black text-l md:text-xl tracking-tight hover:text-white transition-colors uppercase"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

   
      <div className="flex items-center">
     
        <Link to="/" className="relative group transition-transform hover:scale-105 active:scale-95">
          <img 
            src="/sign.png" 
            alt="Sign Out" 
            className="h-12 md:h-14 w-30 object-contain"
          />
          <span className="absolute inset-0 flex items-center justify-center text-black text-xs md:text-sm pt-1">
            Sign out
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar2;