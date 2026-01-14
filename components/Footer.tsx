import React from 'react';
import { Facebook, Instagram } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSocialClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  };

  return (
    <footer className="bg-timber-dark text-white py-20 border-t-8 border-klein-orange">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <Logo className="h-16 w-16 shadow-2xl" />
              <div className="flex flex-col">
                <span className="font-heading text-3xl md:text-4xl tracking-wider text-white uppercase leading-none italic">
                  KLEIN TREE <span className="text-klein-orange">SERVICES</span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
                  EST. PAYNESVILLE, MN
                </span>
              </div>
            </div>
            <p className="font-rugged text-sm font-bold uppercase tracking-widest text-white/40 mb-8 max-w-sm leading-relaxed">
              Professional Grade. Ironclad Honesty. Central Minnesota's trusted crew for heavy-duty tree removal and maintenance.
            </p>
            <div className="flex space-x-6">
              <a href="#" onClick={handleSocialClick} className="text-white hover:text-klein-orange transition-colors">
                <Facebook className="h-8 w-8" />
              </a>
              <a href="#" onClick={handleSocialClick} className="text-white hover:text-klein-orange transition-colors">
                <Instagram className="h-8 w-8" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-klein-orange font-heading text-2xl uppercase tracking-[0.3em] mb-8">SERVICE MENU</h4>
            <ul className="space-y-4 font-rugged font-black uppercase tracking-widest text-xs italic">
              <li><a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="hover:text-klein-orange transition-colors cursor-pointer block border-b border-white/5 pb-2">Tree Removal</a></li>
              <li><a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="hover:text-klein-orange transition-colors cursor-pointer block border-b border-white/5 pb-2">Stump Grinding</a></li>
              <li><a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="hover:text-klein-orange transition-colors cursor-pointer block border-b border-white/5 pb-2">Trimming & Pruning</a></li>
              <li><a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="hover:text-klein-orange transition-colors cursor-pointer block border-b border-white/5 pb-2">Storm Response</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-klein-orange font-heading text-2xl uppercase tracking-[0.3em] mb-8">BASE OPS</h4>
            <ul className="space-y-6">
              <li className="flex flex-col">
                <span className="text-white/40 font-rugged font-black uppercase tracking-widest text-[10px] mb-1">Phone Dispatch</span>
                <span className="text-white font-heading tracking-widest text-3xl">(320) 428-6726</span>
              </li>
              <li className="flex flex-col">
                <span className="text-white/40 font-rugged font-black uppercase tracking-widest text-[10px] mb-1">Email</span>
                <span className="text-white font-heading tracking-widest text-xl break-all">Keith@Kleintreeservices.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] font-rugged font-black uppercase tracking-[0.3em] text-white/20">
          <p>&copy; {new Date().getFullYear()} KLEIN TREE SERVICES. NO COMPROMISE.</p>
          <div className="mt-4 md:mt-0 space-x-6">
            <a href="#" className="hover:text-white transition-colors">Safety Manual</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;