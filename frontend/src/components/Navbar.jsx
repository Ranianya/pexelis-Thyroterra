import React from 'react';
import { Link as RouterLink } from 'react-router-dom'; 

const Navbar = () => {
  const navLinks = [
    { name: 'Home', href: 'hero' }, 
    { name: 'About', href: 'about' },
    { name: 'Story', href: 'story' },
  ];

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between font-pixel bg-[#5A7554]">
      
      {/* LEFT SIDE: LOGO */}
      <div className="flex items-center cursor-pointer hover:scale-105 transition-transform">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img 
            src="/logo.png" 
            alt="Thyroterra Logo" 
            className="h-12 w-auto object-contain" 
          />
        </button>
      </div>

      {/* CENTER: NAVIGATION VERS COMPOSANTS (SCROLL) */}
      <ul className="flex items-center gap-10 md:gap-14">
        {navLinks.map((link) => (
          <li key={link.name}>
            <button
              onClick={() => handleScroll(link.href)}
              className="text-black text-l md:text-xl tracking-tight hover:text-white transition-colors uppercase cursor-pointer"
            >
              {link.name}
            </button>
          </li>
        ))}
      </ul>

      {/* RIGHT SIDE: SIGN IN BUTTON (NAVIGATE TO PAGE) */}
      <div className="flex items-center">
       
        <RouterLink to="/signin" className="relative group transition-transform hover:scale-105 active:scale-95">
          <img 
            src="/sign.png" 
            alt="SignIn" 
            className="h-10 md:h-12 w-auto object-contain"
          />
          <span className="absolute inset-0 flex items-center justify-center text-black text-xs md:text-sm pt-1">
            Sign in
          </span>
        </RouterLink>
      </div>
    </nav>
  );
};

export default Navbar;