import React, { useState } from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-12 w-12" }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center transition-all ${className} ${hasError ? 'bg-klein-orange' : 'bg-zinc-900'}`}>
      {!hasError ? (
        <img 
          src="./favicon.png" 
          alt="Klein Tree Services Logo" 
          className="w-full h-full object-contain p-1.5"
          onError={() => setHasError(true)}
        />
      ) : (
        <span className="text-white font-black text-xl italic tracking-tighter">K</span>
      )}
    </div>
  );
};

export default Logo;