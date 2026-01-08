import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-12 w-12" }) => {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center transition-all ${className}`}>
      <img 
        src="/favicon.png" 
        alt="Klein Tree Services Logo" 
        className="w-full h-full object-contain p-1.5"
        onError={(e) => {
          // If the image hasn't been uploaded yet, show a clean 'K' placeholder
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent) {
            parent.innerHTML = '<span class="text-klein-orange font-black text-xl italic tracking-tighter">K</span>';
            parent.classList.add('bg-white');
          }
        }}
      />
    </div>
  );
};

export default Logo;