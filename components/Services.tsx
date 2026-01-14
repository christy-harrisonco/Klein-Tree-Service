import React from 'react';
import { Axe, ShieldAlert, Tractor, Scissors, ArrowUpRight } from 'lucide-react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    id: 'removal',
    title: 'PRECISION REMOVAL',
    description: "Technical removals in tight spaces. We use specialized gear and expert cutting to ensure your house and property stay safe.",
    iconName: 'axe',
    image: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'trimming',
    title: 'CANOPY MAINTENANCE',
    description: "Proper pruning to keep trees healthy, looking good, and to get rid of dangerous limbs before they fall.",
    iconName: 'scissors',
    image: 'https://images.unsplash.com/photo-1584386161274-91d1ea50d81c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'stump',
    title: 'INDUSTRIAL GRINDING',
    description: "Deep grinding to take out stumps and surface roots completely, so your lawn is flat and ready for grass.",
    iconName: 'tractor',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'storm',
    title: '24/7 STORM RESPONSE',
    description: "Emergency cleanup for trees that fall during central Minnesota storms. We're ready to move when you need us.",
    iconName: 'shield',
    image: 'https://images.unsplash.com/photo-1496264057427-0bb56a0769f0?auto=format&fit=crop&q=80&w=800'
  }
];

const IconMap: Record<string, React.FC<any>> = {
  axe: Axe,
  scissors: Scissors,
  tractor: Tractor,
  shield: ShieldAlert
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 bg-timber-dark relative overflow-hidden">
      {/* Forest Background Overlay */}
      <div className="absolute inset-0 z-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1920&auto=format&fit=crop" 
          alt="Tree trunks in forest" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between">
          <div className="max-w-2xl">
            <h2 className="text-klein-orange font-rugged font-bold uppercase tracking-[0.5em] text-sm mb-4">CAPABILITIES</h2>
            <h3 className="text-6xl md:text-8xl font-heading text-white leading-none uppercase italic tracking-tighter">
              ARBORIST <br/><span className="text-white/20">SOLUTIONS.</span>
            </h3>
          </div>
          <div className="mt-8 md:mt-0">
            <p className="text-timber-light text-xl max-w-sm font-sans italic opacity-80 border-l-2 border-klein-orange pl-4">
              "Professional grade equipment. Precision execution. Small town service."
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {services.map((service) => {
            const Icon = IconMap[service.iconName];
            return (
              <div key={service.id} className="group bg-timber-muted border border-white/5 hover:border-klein-orange transition-all duration-500 overflow-hidden relative">
                <div className="flex flex-col xl:flex-row">
                  <div className="w-full xl:w-1/2 h-72 xl:h-auto overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" 
                    />
                  </div>
                  <div className="p-10 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <Icon className="h-10 w-10 text-klein-orange" />
                        <ArrowUpRight className="h-6 w-6 text-white/20 group-hover:text-klein-orange transition-colors" />
                      </div>
                      <h4 className="text-3xl font-heading text-white mb-4 uppercase italic font-black">{service.title}</h4>
                      <p className="text-timber-light font-sans mb-8">
                        {service.description}
                      </p>
                    </div>
                    <a 
                      href="#contact" 
                      className="inline-flex items-center text-klein-orange font-rugged font-bold text-sm tracking-widest uppercase hover:text-white transition-colors"
                    >
                      <span>TALK TO US</span>
                      <div className="ml-2 w-8 h-[2px] bg-klein-orange group-hover:w-12 transition-all"></div>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;