import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Coffee } from 'lucide-react';
import { generateTreeResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "I'm the Shop Foreman. Keith's out on a job, but I can help with general questions. What's on your mind?", timestamp: new Date() }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

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
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Signal's weak. Give Keith a call: (320) 428-6726.", timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-timber-dark border-4 border-zinc-800 shadow-2xl flex flex-col h-[500px] animate-in slide-in-from-bottom-5 overflow-hidden">
          <div className="bg-white p-5 flex justify-between items-center text-zinc-900 border-b-4 border-klein-orange">
            <div className="flex items-center space-x-3">
              <Coffee className="h-6 w-6 text-klein-orange" />
              <div>
                <h3 className="font-heading text-2xl uppercase italic leading-none">SHOP FOREMAN</h3>
                <p className="text-[10px] font-rugged font-black uppercase text-zinc-400 tracking-widest">ENCRYPTED COMMS</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-zinc-900 transition-colors"><X className="h-6 w-6" /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-timber-grain space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-4 text-sm font-rugged font-bold leading-relaxed shadow-lg ${
                  msg.role === 'user' 
                    ? 'bg-klein-orange text-white italic border-l-4 border-white/20' 
                    : 'bg-white text-zinc-900 font-medium border-l-4 border-klein-orange'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-3 p-4 bg-white/5 border border-white/5">
                  <Loader2 className="h-4 w-4 animate-spin text-klein-orange" />
                  <span className="font-heading text-xl text-white/40 uppercase tracking-widest">CALCULATING...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-4 bg-white">
            <div className="flex items-center space-x-2">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="ENTER INTEL..." className="flex-1 px-4 py-3 bg-zinc-100 border-none focus:ring-2 focus:ring-klein-orange focus:outline-none font-rugged text-xs font-black uppercase text-zinc-900" />
              <button type="submit" disabled={isLoading || !input.trim()} className="p-3 bg-zinc-900 text-white hover:bg-klein-orange transition-all"><Send className="h-6 w-6" /></button>
            </div>
          </form>
        </div>
      )}

      <button onClick={() => setIsOpen(!isOpen)} className="btn-stamped text-white p-5 shadow-2xl transition-all transform hover:scale-105 group">
        {isOpen ? <X className="h-10 w-10" /> : <MessageSquare className="h-10 w-10 text-white" />}
      </button>
    </div>
  );
};

export default AIAssistant;