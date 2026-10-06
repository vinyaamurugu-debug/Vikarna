import React from 'react';

export const VikarnaPrinceIllustration: React.FC<{ className?: string }> = ({ className = 'w-48 h-48' }) => {
  return (
    <div className={`relative ${className} select-none`}>
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-[0_4px_16px_rgba(240,178,62,0.2)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Radial aura gradient */}
          <radialGradient id="vikarnaHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#D97706" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0B1120" stopOpacity="0" />
          </radialGradient>
          {/* Inner circle background */}
          <radialGradient id="innerNight" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#17243B" />
            <stop offset="100%" stopColor="#0B1120" />
          </radialGradient>
          {/* Gold robe gradient */}
          <linearGradient id="robeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="60%" stopColor="#C2410C" />
            <stop offset="100%" stopColor="#9A3412" />
          </linearGradient>
          {/* Gold ornament gradient */}
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>

        {/* Outer Circular Aura Glow */}
        <circle cx="100" cy="100" r="96" fill="url(#vikarnaHalo)" />

        {/* Outer Gold Ring 1 */}
        <circle cx="100" cy="100" r="88" stroke="#F59E0B" strokeWidth="1.2" strokeOpacity="0.8" />
        {/* Inner Gold Ring 2 */}
        <circle cx="100" cy="100" r="83" stroke="#D97706" strokeWidth="0.8" strokeDasharray="3 2" strokeOpacity="0.6" />

        {/* Circular Midnight Base */}
        <circle cx="100" cy="100" r="80" fill="url(#innerNight)" />

        {/* Floating Stardust Points */}
        <circle cx="65" cy="65" r="1.5" fill="#FDE68A" opacity="0.8" />
        <circle cx="138" cy="68" r="1.8" fill="#67E8F9" opacity="0.9" />
        <circle cx="55" cy="95" r="1.2" fill="#FDE68A" opacity="0.6" />
        <circle cx="145" cy="105" r="1.5" fill="#FDE68A" opacity="0.7" />
        <circle cx="98" cy="42" r="1.2" fill="#FDE68A" opacity="0.7" />

        {/* Character Clipping Group */}
        <g clipPath="url(#circleClip)">
          {/* Torso & Robe */}
          <path
            d="M50 200 C52 165 70 148 100 148 C130 148 148 165 150 200 Z"
            fill="url(#robeGrad)"
          />
          {/* Gold Collar / Sash */}
          <path
            d="M75 152 C85 168 115 168 125 152 C120 180 80 180 75 152 Z"
            fill="url(#goldGrad)"
          />
          {/* Blue Center Collar Jewel */}
          <circle cx="100" cy="165" r="3.5" fill="#0284C7" stroke="#FDE68A" strokeWidth="0.8" />

          {/* Shoulders Royal Trim */}
          <path
            d="M52 195 L68 160 C74 158 80 162 82 170 L65 200 Z"
            fill="#B45309"
            opacity="0.6"
          />
          <path
            d="M148 195 L132 160 C126 158 120 162 118 170 L135 200 Z"
            fill="#B45309"
            opacity="0.6"
          />

          {/* Dark Royal Hair falling behind neck */}
          <path
            d="M68 95 C68 135 72 155 80 162 L120 162 C128 155 132 135 132 95 Z"
            fill="#1E293B"
          />

          {/* Neck */}
          <rect x="91" y="125" width="18" height="22" rx="4" fill="#F5D0A9" />

          {/* Head Shape */}
          <path
            d="M78 88 C78 68 88 56 100 56 C112 56 122 68 122 88 C122 114 112 132 100 132 C88 132 78 114 78 88 Z"
            fill="#FBD9B5"
          />

          {/* Ears */}
          <circle cx="77" cy="94" r="5" fill="#F5D0A9" />
          <circle cx="123" cy="94" r="5" fill="#F5D0A9" />
          {/* Gold Earrings */}
          <circle cx="77" cy="97" r="2.5" fill="url(#goldGrad)" />
          <circle cx="123" cy="97" r="2.5" fill="url(#goldGrad)" />

          {/* Royal Front Hair Bangs/Sides */}
          <path
            d="M76 80 C80 66 90 62 100 62 C110 62 120 66 124 80 C122 105 120 130 126 148 L120 150 C114 128 116 105 116 82 C110 74 90 74 84 82 C84 105 86 128 80 150 L74 148 C80 130 78 105 76 80 Z"
            fill="#0F172A"
          />

          {/* Golden Royal Diadem / Headpiece */}
          <path
            d="M78 72 C88 66 112 66 122 72 L120 66 C110 60 90 60 80 66 Z"
            fill="url(#goldGrad)"
          />
          {/* Diadem Central Peak */}
          <polygon points="100,50 105,64 95,64" fill="url(#goldGrad)" />
          {/* Diadem Ruby Gem */}
          <circle cx="100" cy="62" r="3" fill="#DC2626" stroke="#FDE68A" strokeWidth="0.8" />

          {/* Red Tilak on Forehead */}
          <path
            d="M100 70 L101.5 82 L98.5 82 Z"
            fill="#DC2626"
          />
          <circle cx="100" cy="85" r="1.2" fill="#FDE68A" />

          {/* Eyebrows (gentle, curious, intelligent) */}
          <path d="M85 86 Q91 83 96 86" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M104 86 Q109 83 115 86" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />

          {/* Eyes (warm, calm, observant) */}
          <ellipse cx="91" cy="92" rx="3.2" ry="3.8" fill="#1E293B" />
          <circle cx="92.2" cy="90.8" r="1.1" fill="#FFFFFF" />

          <ellipse cx="109" cy="92" rx="3.2" ry="3.8" fill="#1E293B" />
          <circle cx="110.2" cy="90.8" r="1.1" fill="#FFFFFF" />

          {/* Nose */}
          <path d="M100 90 L100 99 L102 101" stroke="#E2A677" strokeWidth="1.2" strokeLinecap="round" fill="none" />

          {/* Gentle Confident Smile */}
          <path d="M94 108 Q100 113 106 108" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round" fill="none" />

          {/* Small Ancient Scroll / Tablet in Hand */}
          <g transform="translate(118, 142) rotate(-8)">
            {/* Parchment Base */}
            <rect x="0" y="0" width="34" height="22" rx="2" fill="#FEF3C7" stroke="#D97706" strokeWidth="1" />
            {/* Scroll Inscription Lines */}
            <line x1="4" y1="5" x2="30" y2="5" stroke="#B45309" strokeWidth="1.2" strokeDasharray="2 1.5" />
            <line x1="4" y1="9" x2="30" y2="9" stroke="#B45309" strokeWidth="1.2" strokeDasharray="3 1.5" />
            <line x1="4" y1="13" x2="24" y2="13" stroke="#B45309" strokeWidth="1.2" strokeDasharray="2 1.5" />
            <line x1="4" y1="17" x2="20" y2="17" stroke="#B45309" strokeWidth="1.2" strokeDasharray="2 1.5" />
            {/* Tiny Seal */}
            <circle cx="28" cy="15" r="2.2" fill="#DC2626" />
          </g>

          {/* Left / Right Hands holding tablet */}
          <ellipse cx="120" cy="154" rx="4.5" ry="3.5" fill="#F5D0A9" />
          <ellipse cx="146" cy="150" rx="4" ry="3" fill="#F5D0A9" />
        </g>

        <clipPath id="circleClip">
          <circle cx="100" cy="100" r="79" />
        </clipPath>
      </svg>
    </div>
  );
};
