import React from 'react';
import { Mystery } from '../types/mystery';
import { VikarnaPrinceIllustration } from './VikarnaPrinceIllustration';
import { getMysteryScene } from '../data/assets';
import { sounds } from '../utils/sound';
import { ArrowRight, Compass, MapPin, Users, AlertCircle, ArrowLeft } from 'lucide-react';

interface MysteryIntroProps {
  mystery: Mystery;
  onBeginInvestigation: () => void;
  onBackToMap: () => void;
}

export const MysteryIntro: React.FC<MysteryIntroProps> = ({
  mystery,
  onBeginInvestigation,
  onBackToMap,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 min-h-[calc(100vh-70px)] flex flex-col justify-between bg-[#070B14]">
      <div>
        {/* Back navigation */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <button
            onClick={() => {
              sounds.playClick();
              onBackToMap();
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-amber-300 py-1.5 px-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span>Adventure Map</span>
          </button>

          <span className="text-xs font-bold text-amber-400 font-mono tracking-widest uppercase">
            Case #{mystery.order} of 10
          </span>
        </div>

        {/* Case Banner */}
        <div className="bg-[#0B1120] rounded-2xl p-6 sm:p-8 border border-amber-500/30 shadow-[0_0_30px_rgba(240,178,62,0.1)] mb-6">
          {/* Panoramic Scene Environment Visual */}
          <div className="relative h-44 sm:h-56 w-full rounded-xl overflow-hidden border border-amber-500/30 mb-6 shadow-md">
            <img
              src={getMysteryScene(mystery.id)}
              alt={`${mystery.title} Environment`}
              className="w-full h-full object-cover filter brightness-90 contrast-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-black/30" />
            <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-[#070B14]/85 border border-amber-500/30 px-3 py-1 rounded-md backdrop-blur-xs text-xs text-amber-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold">{mystery.location.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              {mystery.location.name}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-slate-400">{mystery.difficulty} Investigation</span>
          </div>

          <h1 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-[#F0B23E] mb-3 tracking-wide">
            {mystery.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 font-normal">
            {mystery.story}
          </p>

          {/* What Everyone Thinks Callout */}
          <div className="bg-[#141221] rounded-xl p-4 sm:p-5 border border-amber-500/30 mb-6 shadow-xs">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1.5">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span>What Everyone Immediately Claims (Unexamined Gossip):</span>
            </div>
            <p className="text-sm sm:text-base text-slate-100 font-medium italic">
              "{mystery.initialAssumption}"
            </p>
          </div>

          {/* Persons of Interest / Characters */}
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400/90 block mb-2.5">
              Voices at the Scene:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {mystery.characters.map((char) => (
                <div
                  key={char.name}
                  className="bg-[#070B14] rounded-xl p-3.5 border border-amber-500/20 text-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <strong className="text-amber-200">{char.name}</strong>
                    <span className="text-slate-400 text-[11px]">{char.role}</span>
                  </div>
                  {char.quote && (
                    <p className="text-slate-300 italic">"{char.quote}"</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Vikarna Reflection Banner */}
          <div className="bg-[#080E1C] rounded-xl p-4 sm:p-5 border border-amber-500/25 flex items-start gap-4">
            <div className="w-13 h-13 rounded-full overflow-hidden border border-amber-400/80 shrink-0 gold-glow-sm">
              <VikarnaPrinceIllustration className="w-full h-full" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-400 block mb-1">
                Vikarna's Guiding Question:
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                "{mystery.vikarnaPrompt}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="pt-4 border-t border-amber-500/20">
        <button
          onClick={() => {
            sounds.playVictory();
            onBeginInvestigation();
          }}
          className="w-full py-4 px-6 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-500 text-slate-950 font-outfit text-base font-extrabold rounded-xl shadow-[0_0_25px_rgba(240,178,62,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer group"
        >
          <span>STEP INTO THE SCENE & EXAMINE EVIDENCE</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
