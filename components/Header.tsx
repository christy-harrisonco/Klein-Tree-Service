import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-timber-dark/95 backdrop-blur-xl py-3 border-b border-white/5' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Brand */}
          <div className="flex items-center space-x-4 group cursor-pointer" onClick={(e) => handleNavClick(e as any, '#home')}>
            <Logo className="h-14 w-14 transition-all group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="font-heading text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-none italic">
                KLEIN TREE <span className="text-klein-orange">SERVICES</span>
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.6em] text-timber-light opacity-50">
                PAYNESVILLE, MN
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-rugged text-sm uppercase tracking-[0.2em] font-bold text-white hover:text-klein-orange transition-all"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="tel:320-428-6726" 
              className="bg-klein-orange hover:bg-white text-white hover:text-klein-orange px-6 py-3 font-heading text-lg transition-all flex items-center space-x-3 group"
            >
              <Phone className="h-4 w-4 group-hover:rotate-12 transition-transform" />
              <span>(320) 428-6726</span>
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-timber-dark h-screen fixed inset-0 z-[60] flex flex-col items-center justify-center space-y-8 p-6 animate-in fade-in zoom-in duration-300">
          <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-8 right-8 text-white"><X className="h-10 w-10" /></button>
          <Logo className="h-24 w-24 mb-8" />
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-4xl sm:text-5xl font-heading text-white hover:text-klein-orange uppercase italic tracking-tighter"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="tel:320-428-6726"
            className="w-full text-center bg-klein-orange text-white py-6 font-heading text-2xl uppercase tracking-widest mt-12"
          >
            CALL DISPATCH
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;