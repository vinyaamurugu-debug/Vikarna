import React, { useState } from 'react';
import { Mystery, PlayerProgress } from '../types/mystery';
import { ASSETS, getMysteryScene } from '../data/assets';
import { sounds } from '../utils/sound';
import { Lock, Star, ChevronRight, Sparkles, MapPin, Compass } from 'lucide-react';

interface AdventureMapProps {
  mysteries: Mystery[];
  progress: PlayerProgress;
  onSelectMystery: (mysteryId: string) => void;
  onBackToHome: () => void;
}

export const AdventureMap: React.FC<AdventureMapProps> = ({
  mysteries,
  progress,
  onSelectMystery,
  onBackToHome,
}) => {
  const [selectedMystery, setSelectedMystery] = useState<Mystery | null>(
    mysteries[0] || null
  );

  const isUnlocked = (mystery: Mystery, index: number) => {
    if (index === 0) return true;
    if (mystery.isCustom) return true;
    const prevMystery = mysteries[index - 1];
    return progress.completedMysteryIds.includes(prevMystery.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 min-h-[calc(100vh-70px)] flex flex-col justify-between bg-[#070B14]">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Kingdom Cartography
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-slate-400">10 Mystical Case Realms</span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#F0B23E] tracking-wide">
            The Adventure Map
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#0B1120] border border-amber-500/30 px-3.5 py-1.5 rounded-lg text-xs flex items-center gap-2 text-slate-300 shadow-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Curiosity Stars: <strong className="text-amber-300 font-semibold">{progress.totalStars}</strong></span>
          </div>

          <div className="bg-[#0B1120] border border-amber-500/30 px-3.5 py-1.5 rounded-lg text-xs flex items-center gap-2 text-slate-300 shadow-xs">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Solved: <strong className="text-amber-300 font-semibold">{progress.completedMysteryIds.length}</strong> / {mysteries.length}</span>
          </div>
        </div>
      </div>

      {/* Main Map Arena and Preview Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Map Canvas Zone */}
        <div className="lg:col-span-8 bg-[#090D1A] rounded-2xl overflow-hidden border border-amber-500/35 shadow-[0_0_35px_rgba(240,178,62,0.1)] relative min-h-[480px] sm:min-h-[560px]">
          {/* Map Illustrated Backdrop */}
          <div className="absolute inset-0">
            <img
              src={ASSETS.adventureMap}
              alt="Illustrated Kingdom Adventure Map"
              className="w-full h-full object-cover filter brightness-60 contrast-125"
              referrerPolicy="no-referrer"
            />
            {/* Atmospheric Midnight Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-[#070B14]/80 pointer-events-none" />
          </div>

          {/* Interactive Map Nodes Overlay */}
          <div className="relative w-full h-full min-h-[480px] sm:min-h-[560px] p-6">
            {mysteries.map((mystery, index) => {
              const unlocked = isUnlocked(mystery, index);
              const attempt = progress.attempts[mystery.id];
              const isCompleted = progress.completedMysteryIds.includes(mystery.id);
              const stars = attempt?.stars || 0;
              const isSelected = selectedMystery?.id === mystery.id;

              return (
                <button
                  key={mystery.id}
                  onClick={() => {
                    sounds.playClick();
                    setSelectedMystery(mystery);
                  }}
                  style={{
                    left: `${mystery.location.coordinates.x}%`,
                    top: `${mystery.location.coordinates.y}%`,
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 focus-visible:outline-none group z-20 ${
                    isSelected ? 'scale-120' : 'hover:scale-110'
                  }`}
                  aria-label={`Select mystery: ${mystery.title}`}
                >
                  <div className="flex flex-col items-center">
                    {/* Node Beacon */}
                    <div
                      className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all shadow-md ${
                        !unlocked
                          ? 'bg-slate-900/80 border border-slate-700 text-slate-500 opacity-60'
                          : isCompleted
                          ? 'bg-gradient-to-b from-amber-500 to-amber-700 border-2 border-amber-200 text-slate-950 shadow-[0_0_20px_rgba(240,178,62,0.6)]'
                          : isSelected
                          ? 'bg-amber-500 border-2 border-white text-slate-950 ring-4 ring-amber-400/50 animate-pulse shadow-[0_0_25px_rgba(240,178,62,0.8)]'
                          : 'bg-[#0B1528] hover:bg-[#101D38] border-2 border-amber-400/80 text-amber-200 shadow-[0_0_15px_rgba(240,178,62,0.3)]'
                      }`}
                    >
                      {!unlocked ? (
                        <Lock className="w-4 h-4 text-slate-500" />
                      ) : isCompleted ? (
                        <div className="flex flex-col items-center">
                          <Star className="w-4 h-4 fill-slate-950 text-slate-950 drop-shadow-xs" />
                        </div>
                      ) : (
                        <span className="font-cinzel font-bold text-xs">
                          {mystery.order}
                        </span>
                      )}
                    </div>

                    {/* Node Text Flag */}
                    <div
                      className={`mt-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold whitespace-nowrap backdrop-blur-xs transition-colors shadow-md ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950 font-bold border border-amber-200 shadow-[0_0_12px_rgba(240,178,62,0.5)]'
                          : 'bg-[#070B14]/90 text-amber-200/90 border border-amber-500/30'
                      }`}
                    >
                      {mystery.order}. {mystery.title}
                    </div>

                    {/* Star Row for Completed */}
                    {isCompleted && (
                      <div className="flex items-center gap-0.5 mt-0.5 bg-black/80 px-1.5 py-0.2 rounded border border-amber-500/30">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span
                            key={s}
                            className={`text-[9px] ${
                              s <= stars ? 'text-amber-400' : 'text-slate-600'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Mystery Details & Launch Panel */}
        <div className="lg:col-span-4 bg-[#0B1120] rounded-2xl p-6 border border-amber-500/30 shadow-md flex flex-col justify-between min-h-[480px]">
          {selectedMystery ? (
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-amber-500/20">
                <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold uppercase tracking-wider">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>{selectedMystery.location.name}</span>
                </div>
                <span className="text-xs font-semibold text-slate-400">
                  {selectedMystery.difficulty}
                </span>
              </div>

              {/* Location Scene Preview Thumbnail */}
              <div className="relative h-28 w-full rounded-xl overflow-hidden border border-amber-500/30 mb-4 shadow-sm">
                <img
                  src={getMysteryScene(selectedMystery.id)}
                  alt={`${selectedMystery.title} Scene Preview`}
                  className="w-full h-full object-cover filter brightness-90 contrast-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent" />
              </div>

              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                Case #{selectedMystery.order}
              </span>
              
              <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#F0B23E] mb-2">
                {selectedMystery.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {selectedMystery.story}
              </p>

              {/* What Everyone Thinks Box */}
              <div className="bg-[#121422] rounded-xl p-3.5 border border-amber-500/25 mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                  What Everyone Suspects:
                </span>
                <p className="text-xs text-slate-200 font-medium italic">
                  "{selectedMystery.initialAssumption}"
                </p>
              </div>

              {/* Persons of Interest */}
              <div className="mb-4">
                <span className="text-xs font-semibold text-slate-400 block mb-1.5">
                  Persons of Interest:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedMystery.characters.map((char) => (
                    <span
                      key={char.name}
                      className="text-xs bg-[#070B14] text-amber-200 px-2.5 py-1 rounded-md border border-amber-500/20"
                    >
                      {char.name} · <span className="text-slate-400">{char.role}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Stars status if attempted */}
              {progress.attempts[selectedMystery.id] && (
                <div className="p-3 bg-[#0A1A17] rounded-lg border border-emerald-500/30 text-xs text-emerald-200 mb-4 flex items-center justify-between">
                  <span>Best Score:</span>
                  <div className="flex items-center gap-1 font-bold text-amber-400 font-mono">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className="text-sm">
                        {s <= (progress.attempts[selectedMystery.id]?.stars || 0) ? '⭐' : '☆'}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16 text-slate-500">
              Select a location on the map to view the mystery details.
            </div>
          )}

          {/* Action Button */}
          {selectedMystery && (
            <div className="pt-4 border-t border-amber-500/20">
              {(() => {
                const mysteryIndex = mysteries.findIndex((m) => m.id === selectedMystery.id);
                const unlocked = isUnlocked(selectedMystery, mysteryIndex);

                if (!unlocked) {
                  return (
                    <div className="bg-[#070B14] rounded-xl p-3.5 text-center text-xs text-slate-400 border border-slate-800 flex items-center justify-center gap-2">
                      <Lock className="w-4 h-4 text-slate-500" />
                      <span>Complete previous mystery to unlock this case</span>
                    </div>
                  );
                }

                return (
                  <button
                    onClick={() => {
                      sounds.playVictory();
                      onSelectMystery(selectedMystery.id);
                    }}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-500 text-slate-950 font-outfit text-sm font-extrabold rounded-xl transition-all shadow-[0_0_20px_rgba(240,178,62,0.3)] flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <span>BEGIN INVESTIGATION</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
