import React, { useState } from 'react';
import { ClipboardList, Loader2, Send } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'removal',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://formspree.io/f/mwvpgjpe", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', phone: '', email: '', service: 'removal', message: '' });
        setTimeout(() => setIsSubmitted(false), 8000);
      } else {
        setError("Something went wrong. Please call us.");
      }
    } catch (err) {
      setError("System's acting up. (320) 428-6726 works better.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-timber-muted relative overflow-hidden">
      {/* Tree background for contact section */}
      <div className="absolute inset-0 z-0 opacity-5">
        <img 
          src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1920&auto=format&fit=crop" 
          alt="Tree trunks" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-24">
          <div className="mb-16 lg:mb-0">
            <h2 className="text-klein-orange font-rugged font-bold uppercase tracking-[0.4em] text-sm mb-4">CONNECT WITH US</h2>
            <h3 className="text-6xl md:text-8xl font-heading text-white mb-8 leading-[0.8] uppercase italic tracking-tighter">GET AN <br/> ESTIMATE</h3>
            <p className="text-2xl font-sans text-timber-light mb-12 max-w-lg leading-snug">
              Tell us what you need, and the crew will take a look. We're local Paynesville guys who care about doing the job right.
            </p>

            <div className="space-y-12">
              <div className="group border-l-4 border-white/5 pl-8 hover:border-klein-orange transition-colors">
                <p className="font-marker text-white/30 text-xl mb-2 italic">"Give us a call"</p>
                <a href="tel:320-428-6726" className="text-4xl md:text-6xl font-heading text-white hover:text-klein-orange transition-colors tracking-widest">
                  (320) 428-6726
                </a>
              </div>
              
              <div className="group border-l-4 border-white/5 pl-8 hover:border-klein-orange transition-colors">
                <p className="font-marker text-white/30 text-xl mb-2 italic">"Email us"</p>
                <a href="mailto:Keith@Kleintreeservices.com" className="text-2xl md:text-4xl font-heading text-white hover:text-klein-orange transition-colors break-all">
                  Keith@Kleintreeservices.com
                </a>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white p-8 md:p-12 text-timber-dark shadow-2xl relative">
              <div className="flex items-center space-x-4 mb-10 border-b-2 border-zinc-100 pb-6">
                <ClipboardList className="h-8 w-8 text-klein-orange" />
                <h3 className="text-4xl font-heading uppercase italic tracking-wider">REQUEST INFO</h3>
              </div>

              {isSubmitted ? (
                <div className="py-20 text-center">
                  <div className="w-20 h-20 bg-klein-orange mx-auto flex items-center justify-center mb-8 shadow-xl rounded-full">
                    <Send className="h-10 w-10 text-white" />
                  </div>
                  <h4 className="text-5xl font-heading uppercase italic mb-4">MESSAGE SENT</h4>
                  <p className="font-sans font-bold text-zinc-500 uppercase tracking-widest">The brothers will be in touch soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {error && <div className="p-4 bg-red-100 text-red-700 font-bold text-xs uppercase border-l-8 border-red-500">{error}</div>}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2 font-sans">Name</label>
                      <input type="text" name="name" required value={formData.name} onChange={handleChange} disabled={isLoading} className="w-full bg-zinc-50 border-b-2 border-zinc-200 px-4 py-4 font-sans font-bold text-lg focus:border-klein-orange outline-none transition-all" placeholder="YOUR NAME" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2 font-sans">Phone</label>
                      <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} disabled={isLoading} className="w-full bg-zinc-50 border-b-2 border-zinc-200 px-4 py-4 font-sans font-bold text-lg focus:border-klein-orange outline-none transition-all" placeholder="(320) --- ----" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2 font-sans">Service</label>
                    <select name="service" value={formData.service} onChange={handleChange} disabled={isLoading} className="w-full bg-zinc-50 border-b-2 border-zinc-200 px-4 py-4 font-heading text-2xl uppercase tracking-wider focus:border-klein-orange outline-none appearance-none cursor-pointer">
                      <option value="removal">TREE REMOVAL</option>
                      <option value="trimming">TRIMMING / PRUNING</option>
                      <option value="stump">STUMP GRINDING</option>
                      <option value="storm">STORM DAMAGE</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2 font-sans">Message</label>
                    <textarea name="message" rows={4} value={formData.message} onChange={handleChange} disabled={isLoading} className="w-full bg-zinc-50 border-b-2 border-zinc-200 px-4 py-4 font-sans font-bold text-lg focus:border-klein-orange outline-none transition-all" placeholder="TELL US ABOUT THE JOB..."></textarea>
                  </div>

                  <button type="submit" disabled={isLoading} className="w-full bg-timber-dark hover:bg-klein-orange text-white py-6 font-heading text-3xl uppercase tracking-widest transition-all">
                    {isLoading ? <Loader2 className="h-8 w-8 animate-spin mx-auto" /> : <span>SEND REQUEST</span>}
                  </button>
                  <div className="text-center font-marker text-zinc-400 text-xl rotate-1">
                    * Locally Owned & Operated.
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;