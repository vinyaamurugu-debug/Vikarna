import React from 'react';
import { Volume2, VolumeX, BookOpen, Map, Award, Users, Shield, Compass, Scroll } from 'lucide-react';
import { sounds } from '../utils/sound';

interface HeaderProps {
  currentView: 'home' | 'map' | 'investigation' | 'progress' | 'parent';
  onNavigate: (view: 'home' | 'map' | 'investigation' | 'progress' | 'parent') => void;
  onOpenNotebook?: () => void;
  notebookClueCount?: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenFourSteps: () => void;
  onOpenStoryOfVikarna: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenNotebook,
  notebookClueCount = 0,
  isMuted,
  onToggleMute,
  onOpenFourSteps,
  onOpenStoryOfVikarna,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#070B14]/95 backdrop-blur-md border-b border-[#1A253A] px-4 sm:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* LEFT ZONE: Brand Lockup matching reference screenshot */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sounds.playClick();
              onNavigate('home');
            }}
            className="flex items-center gap-3 text-left group focus-visible:outline-none cursor-pointer"
          >
            {/* Gold Shield Crest Icon */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-amber-500/60 bg-gradient-to-b from-amber-500/15 to-transparent flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(240,178,62,0.25)] group-hover:border-amber-400 transition-colors shrink-0">
              <Shield className="w-5 h-5 text-amber-400 stroke-[2.2]" />
            </div>

            {/* Wordmark, Prototype Tag, and Subtitle */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-wider text-[#F0B23E] group-hover:text-amber-300 transition-colors drop-shadow-[0_2px_12px_rgba(240,178,62,0.25)] leading-none">
                  VIKARNA
                </span>
                <span className="text-[10px] font-mono font-semibold text-amber-400 border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 rounded-sm tracking-wider uppercase">
                  PROTOTYPE V1.0
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-cinzel font-semibold tracking-[0.2em] text-[#C98A2C] mt-0.5 uppercase leading-none">
                THINK BEFORE YOU FOLLOW
              </span>
            </div>
          </button>
        </div>

        {/* RIGHT ZONE: Reference Links and Actions matching screenshot */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Reference Link 1: The 4-Step Journey */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenFourSteps();
            }}
            className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-200 hover:text-amber-300 transition-colors group cursor-pointer"
          >
            <Compass className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
            <span>The 4–Step Journey</span>
          </button>

          {/* Reference Link 2: Story of Vikarna */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenStoryOfVikarna();
            }}
            className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-200 hover:text-amber-300 transition-colors group cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>Story of Vikarna</span>
          </button>

          {/* Adventure Map */}
          <button
            onClick={() => {
              sounds.playClick();
              onNavigate('map');
            }}
            className={`transition-colors flex items-center gap-1.5 py-1 text-xs font-semibold ${
              currentView === 'map'
                ? 'text-amber-300 border-b-2 border-amber-400'
                : 'text-slate-300 hover:text-amber-200'
            }`}
          >
            <Map className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Map</span>
          </button>

          {/* Notebook button if active in investigation */}
          {onOpenNotebook && (
            <button
              onClick={() => {
                sounds.playPageTurn();
                onOpenNotebook();
              }}
              className="flex items-center gap-1.5 py-1 text-xs font-semibold text-amber-200/90 hover:text-amber-200 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Notebook</span>
              {notebookClueCount > 0 && (
                <span className="text-[10px] font-bold text-slate-950 bg-amber-400 px-1.5 py-0.2 rounded-full">
                  {notebookClueCount}
                </span>
              )}
            </button>
          )}

          {/* My Progress */}
          <button
            onClick={() => {
              sounds.playClick();
              onNavigate('progress');
            }}
            className={`transition-colors flex items-center gap-1.5 py-1 text-xs font-semibold ${
              currentView === 'progress'
                ? 'text-amber-300 border-b-2 border-amber-400'
                : 'text-slate-300 hover:text-amber-200'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Progress</span>
          </button>

          {/* Parent/Teacher */}
          <button
            onClick={() => {
              sounds.playClick();
              onNavigate('parent');
            }}
            className={`transition-colors flex items-center gap-1.5 py-1 text-xs font-semibold ${
              currentView === 'parent'
                ? 'text-amber-300 border-b-2 border-amber-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Parent / Teacher Mode"
          >
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden lg:inline">Parent/Teacher</span>
          </button>

          {/* Audio toggle */}
          <button
            onClick={() => {
              onToggleMute();
              sounds.playClick();
            }}
            aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
            className="p-1.5 text-slate-400 hover:text-amber-300 rounded-lg hover:bg-white/5 border border-transparent hover:border-amber-500/20 transition-colors"
            title={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>
        </div>
      </div>
    </header>
  );
};
