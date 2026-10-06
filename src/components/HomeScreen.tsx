import React from 'react';
import { Play, Map, HelpCircle, Award, Users, Compass, BookOpen, Sparkles, ChevronRight } from 'lucide-react';
import { VikarnaPrinceIllustration } from './VikarnaPrinceIllustration';
import { sounds } from '../utils/sound';
import { PlayerProgress } from '../types/mystery';

interface HomeScreenProps {
  onStartAdventure: () => void;
  onOpenMap: () => void;
  onOpenHowToPlay: () => void;
  onOpenProgress: () => void;
  onOpenParent: () => void;
  onOpenFourSteps: () => void;
  onOpenStoryOfVikarna: () => void;
  progress: PlayerProgress;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartAdventure,
  onOpenMap,
  onOpenHowToPlay,
  onOpenProgress,
  onOpenParent,
  onOpenFourSteps,
  onOpenStoryOfVikarna,
  progress,
}) => {
  const steps = [
    { num: '01', label: 'OBSERVE', desc: 'Identify what everyone assumes' },
    { num: '02', label: 'QUESTION', desc: 'Ask why before following' },
    { num: '03', label: 'INVESTIGATE', desc: 'Collect solid physical evidence' },
    { num: '04', label: 'DECIDE', desc: 'Form fair, fact-based conclusions' },
  ];

  return (
    <div className="min-h-[calc(100vh-65px)] flex flex-col justify-between bg-cosmic-dark relative overflow-hidden">
      {/* Subtle Atmospheric Gold Aura in Center Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-gradient-to-b from-amber-500/10 via-amber-600/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Container matching reference screenshot */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-12 w-full flex flex-col items-center text-center relative z-10">
        
        {/* 1. Circular Character Frame with Glow matching screenshot */}
        <div className="relative mb-5 flex flex-col items-center">
          <div className="relative p-2 rounded-full gold-glow-lg transition-transform hover:scale-102 duration-300">
            <VikarnaPrinceIllustration className="w-48 h-48 sm:w-56 sm:h-56" />
          </div>

          {/* Overlapping Badge: "✦ PRINCE OF REASON" */}
          <div className="absolute -bottom-2 z-20">
            <div className="flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 font-outfit font-extrabold text-[11px] sm:text-xs tracking-wider shadow-[0_2px_12px_rgba(240,178,62,0.4)] border border-amber-300/80 uppercase">
              <Sparkles className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
              <span>PRINCE OF REASON</span>
            </div>
          </div>
        </div>

        {/* 2. Quote Pill Badge: "Question before you follow the crowd." */}
        <div className="mt-4 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/35 bg-amber-500/10 text-amber-200/90 text-xs sm:text-sm font-medium shadow-xs">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>“Question before you follow the crowd.”</span>
          </div>
        </div>

        {/* 3. Massive Title Branding: VIKARNA */}
        <div className="mb-2">
          <h1 className="font-cinzel text-5xl sm:text-7xl lg:text-8xl font-black tracking-widest text-[#F0B23E] gold-text-glow leading-none select-none">
            VIKARNA
          </h1>
        </div>

        {/* 4. Subtitle: THINK BEFORE YOU FOLLOW */}
        <div className="mb-4">
          <p className="font-cinzel text-xs sm:text-base font-bold tracking-[0.28em] text-[#C98A2C] uppercase">
            THINK BEFORE YOU FOLLOW
          </p>
        </div>

        {/* 5. Tagline: "Question assumptions. Discover evidence. Make informed decisions." */}
        <p className="text-sm sm:text-base text-slate-200/90 max-w-xl font-normal leading-relaxed mb-8">
          “Question assumptions. Discover evidence. Make informed decisions.”
        </p>

        {/* 6. Primary and Secondary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md mb-12">
          {/* Primary CTA: START ADVENTURE */}
          <button
            onClick={() => {
              sounds.playVictory();
              onStartAdventure();
            }}
            className="w-full sm:w-auto flex-1 py-4 px-8 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-500 text-slate-950 font-outfit text-base font-extrabold rounded-xl shadow-[0_0_30px_rgba(240,178,62,0.35)] hover:shadow-[0_0_40px_rgba(240,178,62,0.5)] transition-all flex items-center justify-center gap-2.5 cursor-pointer group border border-amber-300"
          >
            <Play className="w-5 h-5 fill-slate-950 text-slate-950 group-hover:scale-110 transition-transform" />
            <span>START ADVENTURE</span>
          </button>

          {/* Secondary CTA: HOW TO PLAY */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenHowToPlay();
            }}
            className="w-full sm:w-auto py-4 px-6 bg-[#0B1120] hover:bg-[#121B30] text-amber-200 hover:text-amber-100 font-outfit text-sm font-bold rounded-xl border border-amber-500/40 hover:border-amber-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>HOW TO PLAY</span>
          </button>
        </div>

        {/* 7. Secondary Navigation Pills (Adventure Map, My Progress, Parent/Teacher) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          <button
            onClick={() => {
              sounds.playClick();
              onOpenMap();
            }}
            className="py-2 px-4 rounded-lg bg-[#0D1527] hover:bg-[#15203B] border border-amber-500/25 hover:border-amber-400/50 text-slate-300 hover:text-amber-200 text-xs font-semibold transition-colors flex items-center gap-2"
          >
            <Map className="w-3.5 h-3.5 text-amber-400" />
            <span>Mystery Map ({progress.completedMysteryIds.length} / 10 Solved)</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onOpenProgress();
            }}
            className="py-2 px-4 rounded-lg bg-[#0D1527] hover:bg-[#15203B] border border-amber-500/25 hover:border-amber-400/50 text-slate-300 hover:text-amber-200 text-xs font-semibold transition-colors flex items-center gap-2"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>⭐ {progress.totalStars} Curiosity Stars</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onOpenParent();
            }}
            className="py-2 px-4 rounded-lg bg-[#0D1527] hover:bg-[#15203B] border border-amber-500/25 hover:border-amber-400/50 text-slate-400 hover:text-slate-200 text-xs font-semibold transition-colors flex items-center gap-2"
          >
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>Parent / Teacher Mode</span>
          </button>
        </div>

        {/* 8. The 4-Step Philosophy Grid Bar (Dark + Gold styling) */}
        <div className="w-full bg-[#0B1120]/80 rounded-2xl p-5 sm:p-6 border border-amber-500/25 shadow-lg backdrop-blur-xs">
          <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-amber-500/15">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>The 4–Step Journey of Reasoning</span>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                onOpenFourSteps();
              }}
              className="text-xs text-slate-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
            >
              <span>Learn Method</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {steps.map((st) => (
              <div
                key={st.num}
                className="bg-[#070B14] rounded-xl p-3.5 border border-amber-500/20 text-left hover:border-amber-400/40 transition-colors"
              >
                <div className="text-amber-400 font-mono font-bold text-xs mb-1">
                  {st.num}
                </div>
                <div className="text-xs font-bold text-amber-200 mb-1">
                  {st.label}
                </div>
                <div className="text-[11px] text-slate-400 leading-tight">
                  {st.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Subtle Quiet Dark Footer */}
      <footer className="border-t border-[#162238] py-4 px-6 text-center text-xs text-slate-500 bg-[#060A12] relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Inspired by Vikarna’s courageous independent questioning in the Mahabharata.</span>
          <span className="text-slate-500">“Think Before You Follow” · Educational Investigation</span>
        </div>
      </footer>
    </div>
  );
};
