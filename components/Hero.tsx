import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-timber-dark">
      {/* Upward 'Arborist View' of a Massive Oak - Matching the user's reference image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1920&auto=format&fit=crop" 
          alt="Looking up the trunk of a massive mature oak tree" 
          className="w-full h-full object-cover opacity-50 scale-105"
        />
        {/* Darkened Overlays - Tuned to 'darken just a little' while keeping the limb structure visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-timber-dark/95 via-timber-dark/30 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-timber-dark/90 via-transparent to-timber-dark/60"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl pt-24 md:pt-32">
          <div className="inline-flex items-center space-x-3 px-4 py-2 bg-klein-orange/30 border-l-4 border-klein-orange mb-10 backdrop-blur-md">
            <span className="font-rugged text-white text-sm md:text-base uppercase tracking-[0.3em] font-bold">Paynesville, MN • Klein Tree Services</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-heading leading-[0.9] mb-8 uppercase font-black tracking-tight">
            <span className="text-white block drop-shadow-lg">PRECISION</span>
            <span className="text-klein-orange block italic drop-shadow-lg">POWER.</span>
            <span className="text-white block opacity-30 text-4xl md:text-7xl mt-2 tracking-widest uppercase">Arborist Work</span>
          </h1>
          
          <p className="text-2xl md:text-3xl lg:text-4xl text-white mb-12 max-w-3xl font-marker leading-relaxed drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
            From the highest climbs to the deepest grinds. We are the brothers who bring skill to every tree we touch. Professional results, zero yard debris.
          </p>

          <div className="flex flex-col sm:row gap-6 mb-16">
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, '#contact')}
              className="btn-premium px-10 py-5 text-white text-xl flex items-center justify-center space-x-3 group shadow-2xl"
            >
              <span>GET IN TOUCH</span>
              <ArrowRight className="h-6 w-6 transform group-hover:translate-x-2 transition-transform" />
            </a>
            <a 
              href="#services" 
              onClick={(e) => scrollToSection(e, '#services')}
              className="px-10 py-5 border-2 border-white/40 hover:border-white transition-all text-white font-bold tracking-widest text-center flex items-center justify-center space-x-2 backdrop-blur-md hover:bg-white/10"
            >
              <span>SERVICES</span>
            </a>
          </div>

          {/* Stats Ticker */}
          <div className="pt-10 border-t border-white/20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            <div className="flex flex-col">
              <p className="font-rugged text-klein-orange text-3xl md:text-4xl font-bold drop-shadow-md">100%</p>
              <p className="text-[10px] md:text-xs font-bold uppercase text-white tracking-widest drop-shadow-sm">Fully Insured</p>
            </div>
            <div className="flex flex-col">
              <p className="font-rugged text-klein-orange text-3xl md:text-4xl font-bold drop-shadow-md">24/7</p>
              <p className="text-[10px] md:text-xs font-bold uppercase text-white tracking-widest drop-shadow-sm">Emergency Crew</p>
            </div>
            <div className="flex flex-col">
              <p className="font-rugged text-klein-orange text-3xl md:text-4xl font-bold drop-shadow-md">LOCAL</p>
              <p className="text-[10px] md:text-xs font-bold uppercase text-white tracking-widest drop-shadow-sm">Paynesville Owned</p>
            </div>
            <div className="flex flex-col">
              <p className="font-rugged text-klein-orange text-3xl md:text-4xl font-bold drop-shadow-md">CLEAN</p>
              <p className="text-[10px] md:text-xs font-bold uppercase text-white tracking-widest drop-shadow-sm">Zero Yard Waste</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;