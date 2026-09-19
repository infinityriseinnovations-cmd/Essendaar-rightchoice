import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'white';
}

export const EssendaarLogo: React.FC<LogoProps> = ({ className = 'h-10 w-auto', variant = 'full' }) => {
  if (variant === 'white') {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        <div className="flex flex-col text-left">
          <span className="font-headline font-black tracking-tight text-white text-xl leading-none">
            ESSENDAAR
          </span>
          <span className="text-[10px] tracking-widest text-secondary-fixed uppercase font-bold mt-0.5">
            Suppliers &amp; Institutional Services
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Stylized SVG Emblem */}
      <svg
        viewBox="0 0 120 120"
        className="h-10 w-10 shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0F4C81" />
          </linearGradient>
          <linearGradient id="logoGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#15803D" />
          </linearGradient>
        </defs>
        <g transform="translate(5, 5)">
          <path
            d="M 65 15 C 30 15, 10 38, 10 70 C 10 98, 32 108, 68 106 C 85 105, 92 98, 92 98 C 92 98, 75 96, 62 92 C 38 84, 32 68, 38 52 C 43 40, 56 34, 76 35 C 92 36, 100 44, 100 44 C 100 44, 92 22, 65 15 Z"
            fill="url(#logoBlueGrad)"
          />
          <path
            d="M 22 75 C 38 98, 70 102, 92 88 C 104 80, 108 68, 108 68 C 108 68, 95 76, 78 74 C 55 72, 45 58, 48 45 C 40 55, 28 66, 22 75 Z"
            fill="url(#logoGreenGrad)"
          />
          <rect x="35" y="55" width="48" height="12" rx="6" fill="url(#logoBlueGrad)" />
        </g>
      </svg>

      {/* Brand Name Typography */}
      <div className="flex flex-col text-left">
        <span className="font-headline font-black text-xl tracking-tight text-primary leading-none">
          ESSENDAAR
        </span>
        <span className="text-[10px] tracking-widest text-secondary uppercase font-bold mt-0.5">
          Suppliers &amp; Facility Care
        </span>
      </div>
    </div>
  );
};
