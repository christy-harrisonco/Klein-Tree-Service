import React from 'react';
import { ShieldCheck, MapPin, Trees } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 bg-timber-muted relative overflow-hidden">
      {/* Background Tree Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1511497584788-8767fe771d21?q=80&w=1920&auto=format&fit=crop" 
          alt="Forest canopy" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-24 items-center">
          
          <div className="relative mb-16 lg:mb-0">
            <div className="relative group">
              <div className="absolute -inset-4 bg-klein-orange opacity-10 blur-xl group-hover:opacity-20 transition-opacity"></div>
              <img 
                src="https://images.unsplash.com/photo-1584386161274-91d1ea50d81c?auto=format&fit=crop&q=80&w=1200" 
                alt="Keith and Kevin Klein" 
                className="relative w-full h-[600px] object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-700 shadow-2xl"
              />
              <div className="absolute bottom-10 -right-8 bg-white p-6 md:p-8 shadow-2xl max-w-sm rotate-1">
                <p className="font-marker text-timber-dark text-xl md:text-2xl leading-tight mb-4">
                  "Keith’s on the climb, Kevin’s on the line. One family, zero shortcuts."
                </p>
                <div className="flex items-center space-x-2 text-klein-orange font-bold text-xs tracking-widest uppercase font-sans">
                  <MapPin className="h-4 w-4" />
                  <span>Serving Central Minnesota</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-8">
              <h2 className="text-klein-orange font-rugged font-bold uppercase tracking-[0.5em] text-sm mb-4">OUR LEGACY</h2>
              <h3 className="text-6xl md:text-8xl font-heading text-white mb-6 uppercase tracking-tighter">THE KLEIN <br/> BROTHERS</h3>
            </div>

            <div className="space-y-6 text-timber-light text-lg leading-relaxed">
              <p className="font-bold text-white text-2xl">
                We aren't just cutting trees. We're managing the safety and value of your property.
              </p>
              <p>
                Keith handles the technical precision work in the canopy—climbing and cutting that requires absolute focus. Kevin works alongside him on the ground, keeping the operation running smooth and ensuring the site stays safe from the first drop to the final cleanup.
              </p>
              <p>
                We founded Klein Tree Services on a simple principle: small-town integrity meets heavy-duty performance. Every job comes with a handshake and a promise that your yard will look better when we leave than when we arrived.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex items-center space-x-4 bg-white/5 p-4 border border-white/10 group hover:border-klein-orange transition-colors">
                <ShieldCheck className="h-10 w-10 text-klein-orange" />
                <div>
                  <h4 className="font-heading text-xl text-white uppercase tracking-wider">INSURED</h4>
                  <p className="text-[10px] text-timber-light uppercase tracking-widest">Fully Bonded Ops</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 bg-white/5 p-4 border border-white/10 group hover:border-klein-orange transition-colors">
                <Trees className="h-10 w-10 text-klein-orange" />
                <div>
                  <h4 className="font-heading text-xl text-white uppercase tracking-wider">LOCAL</h4>
                  <p className="text-[10px] text-timber-light uppercase tracking-widest">Paynesville Proud</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default About;