import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Menu, X, Phone, ArrowRight, Axe, ShieldAlert, Tractor, 
  Scissors, ArrowUpRight, ShieldCheck, MapPin, Trees, 
  ClipboardList, Loader2, Send, MessageSquare, Coffee,
  Facebook, Instagram
} from 'lucide-react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// --- TYPES ---
interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

// --- AI SERVICE ---
declare var process: { env: { API_KEY: string; [key: string]: string; }; };

const generateTreeResponse = async (
  userMessage: string,
  history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const systemInstruction = `
    You are the "Shop Foreman" for Klein Tree Services.
    Owners: Brothers Keith and Kevin Klein.
    Based in Paynesville, MN.
    Keith: Technical expert, climber, saw lead.
    Kevin: Site operations, safety, field partner.
    Vibe: Dry, professional, small-town warmth. No-nonsense.
    Rule: Yards are left cleaner than they were found.
    Price Inquiries: Say "We need to see the tree. Call dispatch at (320) 428-6726."
  `;
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [...history, { role: 'user', parts: [{ text: userMessage }] }],
      config: { systemInstruction, temperature: 0.8 },
    });
    return response.text || "Just call the crew: (320) 428-6726.";
  } catch (error) {
    return "Something's up with the signal. Call Keith: (320) 428-6726.";
  }
};

// --- COMPONENTS ---

const Logo = ({ className = "h-12 w-12" }: { className?: string }) => (
  <div className={`relative overflow-hidden rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center transition-all ${className}`}>
    <span className="text-klein-orange font-black text-2xl italic tracking-tighter">K</span>
  </div>
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-timber-dark/95 backdrop-blur-xl py-3 border-b border-white/5' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4 group cursor-pointer" onClick={() => handleNavClick('#home')}>
            <Logo className="h-14 w-14 transition-all group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="font-heading text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-none italic">
                KLEIN TREE <span className="text-klein-orange">SERVICES</span>
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.6em] text-timber-light opacity-50">PAYNESVILLE, MN</span>
            </div>
          </div>
          <nav className="hidden lg:flex items-center space-x-8">
            {['Home', 'Services', 'About Us', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '')}`} onClick={(e) => { e.preventDefault(); handleNavClick(`#${item.toLowerCase().replace(' ', '')}`); }} className="font-rugged text-sm uppercase tracking-[0.2em] font-bold text-white hover:text-klein-orange transition-all">{item}</a>
            ))}
            <a href="tel:320-428-6726" className="bg-klein-orange hover:bg-white text-white hover:text-klein-orange px-6 py-3 font-heading text-lg transition-all flex items-center space-x-3 group">
              <Phone className="h-4 w-4 group-hover:rotate-12 transition-transform" />
              <span>(320) 428-6726</span>
            </a>
          </nav>
          <button className="lg:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-timber-dark h-screen fixed inset-0 z-[60] flex flex-col items-center justify-center space-y-8 p-6 animate-in fade-in zoom-in duration-300">
          <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-8 right-8 text-white"><X className="h-10 w-10" /></button>
          <Logo className="h-24 w-24 mb-8" />
          {['Home', 'Services', 'About Us', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '')}`} onClick={(e) => { e.preventDefault(); handleNavClick(`#${item.toLowerCase().replace(' ', '')}`); }} className="text-4xl sm:text-5xl font-heading text-white hover:text-klein-orange uppercase italic tracking-tighter">{item}</a>
          ))}
          <a href="tel:320-428-6726" className="w-full text-center bg-klein-orange text-white py-6 font-heading text-2xl uppercase tracking-widest mt-12">CALL DISPATCH</a>
        </div>
      )}
    </header>
  );
};

const Hero = () => (
  <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-timber-dark">
    <div className="absolute inset-0 z-0">
      <img src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1920&auto=format&fit=crop" alt="Mature tree trunk" className="w-full h-full object-cover opacity-50 scale-105" />
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
          The brothers who bring skill to every climb. Professional results, zero yard debris.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 mb-16">
          <a href="#contact" className="btn-premium px-10 py-5 text-white text-xl flex items-center justify-center space-x-3 group shadow-2xl">
            <span>GET IN TOUCH</span>
            <ArrowRight className="h-6 w-6 transform group-hover:translate-x-2 transition-transform" />
          </a>
          <a href="#services" className="px-10 py-5 border-2 border-white/40 hover:border-white transition-all text-white font-bold tracking-widest text-center flex items-center justify-center space-x-2 backdrop-blur-md hover:bg-white/10">
            <span>SERVICES</span>
          </a>
        </div>
        <div className="pt-10 border-t border-white/20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {[
            { val: '100%', label: 'Fully Insured' },
            { val: '24/7', label: 'Emergency Crew' },
            { val: 'LOCAL', label: 'Paynesville Owned' },
            { val: 'CLEAN', label: 'Zero Yard Waste' }
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <p className="font-rugged text-klein-orange text-3xl md:text-4xl font-bold drop-shadow-md">{stat.val}</p>
              <p className="text-[10px] md:text-xs font-bold uppercase text-white tracking-widest drop-shadow-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Services = () => {
  const serviceItems = [
    { title: 'PRECISION REMOVAL', icon: Axe, desc: 'Technical removals in tight spaces. Your house stays safe.', img: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=800' },
    { title: 'CANOPY MAINTENANCE', icon: Scissors, desc: 'Proper pruning for healthy trees and safety.', img: 'https://images.unsplash.com/photo-1584386161274-91d1ea50d81c?auto=format&fit=crop&q=80&w=800' },
    { title: 'INDUSTRIAL GRINDING', icon: Tractor, desc: 'Deep grinding to take out stumps completely.', img: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=800' },
    { title: '24/7 STORM RESPONSE', icon: ShieldAlert, desc: 'Emergency cleanup for central Minnesota storms.', img: 'https://images.unsplash.com/photo-1496264057427-0bb56a0769f0?auto=format&fit=crop&q=80&w=800' }
  ];
  return (
    <section id="services" className="py-32 bg-timber-dark relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10"><img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1920&auto=format&fit=crop" className="w-full h-full object-cover" /></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between">
          <div className="max-w-2xl">
            <h2 className="text-klein-orange font-rugged font-bold uppercase tracking-[0.5em] text-sm mb-4">CAPABILITIES</h2>
            <h3 className="text-6xl md:text-8xl font-heading text-white leading-none uppercase italic tracking-tighter">ARBORIST <br/><span className="text-white/20">SOLUTIONS.</span></h3>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {serviceItems.map((s) => (
            <div key={s.title} className="group bg-timber-muted border border-white/5 hover:border-klein-orange transition-all duration-500 overflow-hidden relative">
              <div className="flex flex-col xl:flex-row">
                <div className="w-full xl:w-1/2 h-72 xl:h-auto overflow-hidden">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
                </div>
                <div className="p-10 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6"><s.icon className="h-10 w-10 text-klein-orange" /><ArrowUpRight className="h-6 w-6 text-white/20 group-hover:text-klein-orange transition-colors" /></div>
                    <h4 className="text-3xl font-heading text-white mb-4 uppercase italic font-black">{s.title}</h4>
                    <p className="text-timber-light font-sans mb-8">{s.desc}</p>
                  </div>
                  <a href="#contact" className="inline-flex items-center text-klein-orange font-rugged font-bold text-sm tracking-widest uppercase hover:text-white transition-colors"><span>TALK TO US</span><div className="ml-2 w-8 h-[2px] bg-klein-orange group-hover:w-12 transition-all"></div></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => (
  <section id="about" className="py-32 bg-timber-muted relative overflow-hidden">
    <div className="absolute inset-0 z-0 opacity-10"><img src="https://images.unsplash.com/photo-1511497584788-8767fe771d21?q=80&w=1920&auto=format&fit=crop" className="w-full h-full object-cover" /></div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="lg:grid lg:grid-cols-2 lg:gap-24 items-center">
        <div className="relative mb-16 lg:mb-0">
          <div className="relative group">
            <img src="https://images.unsplash.com/photo-1584386161274-91d1ea50d81c?auto=format&fit=crop&q=80&w=1200" className="relative w-full h-[600px] object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-700 shadow-2xl" />
            <div className="absolute bottom-10 -right-8 bg-white p-6 md:p-8 shadow-2xl max-w-sm rotate-1 text-timber-dark">
              <p className="font-marker text-xl md:text-2xl leading-tight mb-4">"Keith’s on the climb, Kevin’s on the line."</p>
              <div className="flex items-center space-x-2 text-klein-orange font-bold text-xs tracking-widest uppercase"><MapPin className="h-4 w-4" /><span>Central Minnesota</span></div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-klein-orange font-rugged font-bold uppercase tracking-[0.5em] text-sm mb-4">OUR LEGACY</h2>
          <h3 className="text-6xl md:text-8xl font-heading text-white mb-6 uppercase tracking-tighter">THE KLEIN <br/> BROTHERS</h3>
          <div className="space-y-6 text-timber-light text-lg leading-relaxed">
            <p className="font-bold text-white text-2xl">Small-town integrity meets heavy-duty performance.</p>
            <p>Keith handles the technical precision work in the canopy. Kevin works alongside him on the ground, keeping the operation running smooth and safe.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex items-center space-x-4 bg-white/5 p-4 border border-white/10 hover:border-klein-orange transition-colors"><ShieldCheck className="h-10 w-10 text-klein-orange" /><div><h4 className="font-heading text-xl text-white">INSURED</h4><p className="text-[10px] text-timber-light uppercase tracking-widest">Bonded Ops</p></div></div>
            <div className="flex items-center space-x-4 bg-white/5 p-4 border border-white/10 hover:border-klein-orange transition-colors"><Trees className="h-10 w-10 text-klein-orange" /><div><h4 className="font-heading text-xl text-white">LOCAL</h4><p className="text-[10px] text-timber-light uppercase tracking-widest">Paynesville Proud</p></div></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', service: 'removal', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("https://formspree.io/f/mwvpgjpe", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', phone: '', email: '', service: 'removal', message: '' });
      }
    } catch (err) { alert("Error sending message. Call (320) 428-6726."); }
    finally { setIsLoading(false); }
  };

  return (
    <section id="contact" className="py-24 bg-timber-muted relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-5"><img src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1920&auto=format&fit=crop" className="w-full h-full object-cover" /></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-24">
          <div className="mb-16 lg:mb-0">
            <h2 className="text-klein-orange font-rugged font-bold uppercase tracking-[0.4em] text-sm mb-4">CONNECT</h2>
            <h3 className="text-6xl md:text-8xl font-heading text-white mb-8 leading-[0.8] uppercase italic tracking-tighter">GET AN <br/> ESTIMATE</h3>
            <div className="space-y-12">
              <div className="border-l-4 border-white/5 pl-8 hover:border-klein-orange transition-colors"><p className="font-marker text-white/30 text-xl italic mb-2">"Call dispatch"</p><a href="tel:320-428-6726" className="text-4xl md:text-6xl font-heading text-white hover:text-klein-orange transition-colors tracking-widest">(320) 428-6726</a></div>
              <div className="border-l-4 border-white/5 pl-8 hover:border-klein-orange transition-colors"><p className="font-marker text-white/30 text-xl italic mb-2">"Email Keith"</p><a href="mailto:Keith@Kleintreeservices.com" className="text-2xl md:text-4xl font-heading text-white hover:text-klein-orange transition-colors break-all">Keith@Kleintreeservices.com</a></div>
            </div>
          </div>
          <div className="bg-white p-8 md:p-12 text-timber-dark shadow-2xl relative">
            {isSubmitted ? (
              <div className="py-20 text-center"><h4 className="text-5xl font-heading uppercase italic mb-4">MESSAGE SENT</h4><p className="font-sans font-bold text-zinc-500 uppercase tracking-widest">Talk soon.</p></div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <input type="text" placeholder="YOUR NAME" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-zinc-50 border-b-2 border-zinc-200 px-4 py-4 focus:border-klein-orange outline-none" />
                <input type="tel" placeholder="PHONE" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-zinc-50 border-b-2 border-zinc-200 px-4 py-4 focus:border-klein-orange outline-none" />
                <select value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})} className="w-full bg-zinc-50 border-b-2 border-zinc-200 px-4 py-4 font-heading text-2xl uppercase">
                  <option value="removal">TREE REMOVAL</option><option value="trimming">TRIMMING</option><option value="stump">STUMP GRINDING</option><option value="storm">STORM DAMAGE</option>
                </select>
                <textarea placeholder="JOB DETAILS..." rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-zinc-50 border-b-2 border-zinc-200 px-4 py-4 focus:border-klein-orange outline-none"></textarea>
                <button type="submit" disabled={isLoading} className="w-full bg-timber-dark hover:bg-klein-orange text-white py-6 font-heading text-3xl uppercase tracking-widest transition-all">
                  {isLoading ? <Loader2 className="h-8 w-8 animate-spin mx-auto" /> : <span>SEND REQUEST</span>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-timber-dark text-white py-20 border-t-8 border-klein-orange">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-12">
      <div className="flex flex-col"><span className="font-heading text-3xl italic uppercase">KLEIN TREE <span className="text-klein-orange">SERVICES</span></span><span className="text-[10px] uppercase tracking-widest opacity-40">EST. PAYNESVILLE, MN</span></div>
      <div className="flex space-x-6"><Facebook className="h-8 w-8 hover:text-klein-orange cursor-pointer" /><Instagram className="h-8 w-8 hover:text-klein-orange cursor-pointer" /></div>
      <div className="text-[10px] opacity-20 uppercase tracking-[0.3em] font-black">&copy; {new Date().getFullYear()} KLEIN TREE SERVICES. NO COMPROMISE.</div>
    </div>
  </footer>
);

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: 'model', text: "I'm the Shop Foreman. Keith is out back. How can I help?", timestamp: new Date() }]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg, timestamp: new Date() }]);
    setIsLoading(true);
    try {
      const history = messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
      const responseText = await generateTreeResponse(userMsg, history);
      setMessages(prev => [...prev, { role: 'model', text: responseText, timestamp: new Date() }]);
    } catch {
      setMessages(prev => [...prev, { role: 'model', text: "Signal's weak. Call: (320) 428-6726.", timestamp: new Date() }]);
    } finally { setIsLoading(false); }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-timber-dark border-4 border-zinc-800 shadow-2xl flex flex-col h-[500px] overflow-hidden">
          <div className="bg-white p-5 flex justify-between items-center text-zinc-900 border-b-4 border-klein-orange">
            <div className="flex items-center space-x-3"><Coffee className="h-6 w-6 text-klein-orange" /><h3 className="font-heading text-2xl uppercase italic leading-none">FOREMAN</h3></div>
            <button onClick={() => setIsOpen(false)}><X className="h-6 w-6" /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 bg-timber-grain space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-4 text-sm font-rugged font-bold ${msg.role === 'user' ? 'bg-klein-orange text-white' : 'bg-white text-zinc-900 border-l-4 border-klein-orange'}`}>{msg.text}</div>
              </div>
            ))}
            {isLoading && <div className="text-white opacity-40 font-heading text-xl">CALCULATING...</div>}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSend} className="p-4 bg-white flex space-x-2">
            <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="ENTER INTEL..." className="flex-1 px-4 py-3 bg-zinc-100 font-rugged text-xs uppercase" />
            <button type="submit" className="p-3 bg-zinc-900 text-white"><Send className="h-6 w-6" /></button>
          </form>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="bg-timber-dark border-4 border-zinc-800 text-white p-5 shadow-2xl hover:border-klein-orange transition-all">
        {isOpen ? <X className="h-10 w-10" /> : <MessageSquare className="h-10 w-10" />}
      </button>
    </div>
  );
};

const App: React.FC = () => (
  <div className="min-h-screen font-sans text-white bg-timber-dark selection:bg-klein-orange selection:text-white">
    <Header /><main><Hero /><Services /><About /><ContactForm /></main><Footer /><AIAssistant />
  </div>
);

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<React.StrictMode><App /></React.StrictMode>);
}