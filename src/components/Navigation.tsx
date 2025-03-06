import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface NavigationProps {
  heroHeight?: number; // Make heroHeight optional
  alwaysShowBackground?: boolean;
}

export function Navigation({ heroHeight, alwaysShowBackground = false }: NavigationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (heroHeight !== undefined) {
        setIsVisible(window.scrollY > heroHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [heroHeight]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      alwaysShowBackground || isVisible ? 'bg-gray-900 shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-4">
          <img
            src="/Logo/Logo Nusantara GOLD.png"
            alt="Nusantara Maha Utama Logo"
            className="w-24 h-24 object-contain"
          />
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="hover:text-[#188fdc] transition-colors text-white">Home</Link>
          <Link to="/about-us" className="hover:text-[#188fdc] transition-colors text-white">About us</Link>
          <Link to="/contact-us" className="hover:text-[#188fdc] transition-colors text-white">Contact us</Link>
        </div>
      </div>
    </nav>
  );
}