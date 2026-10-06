import React, { useState } from 'react';
import { Mystery, Clue } from '../types/mystery';
import { ASSETS, getMysteryScene } from '../data/assets';
import { sounds } from '../utils/sound';
import { ClueDiscoveryModal } from './ClueDiscoveryModal';
import { AskWhyModal } from './AskWhyModal';
import { EvidenceNotebookModal } from './EvidenceNotebookModal';
import { VikarnaPrinceIllustration } from './VikarnaPrinceIllustration';
import {
  HelpCircle,
  BookOpen,
  Sparkles,
  ArrowRight,
  Eye,
  CheckCircle2,
  Footprints,
  Compass,
  MapPin,
  AlertCircle,
} from 'lucide-react';

interface InvestigationSceneProps {
  mystery: Mystery;
  onProceedToDecision: () => void;
  onOpenNotebook: () => void;
  discoveredClueIds: string[];
  onDiscoverClue: (clueId: string) => void;
  onHintUsed: (level: number) => void;
  askedWhyCount: number;
  onAskWhyTriggered: () => void;
}

export const InvestigationScene: React.FC<InvestigationSceneProps> = ({
  mystery,
  onProceedToDecision,
  onOpenNotebook,
  discoveredClueIds,
  onDiscoverClue,
  onHintUsed,
  askedWhyCount,
  onAskWhyTriggered,
}) => {
  const [activeClueForModal, setActiveClueForModal] = useState<Clue | null>(null);
  const [isAskWhyOpen, setIsAskWhyOpen] = useState<boolean>(false);
  const [isNotebookOpen, setIsNotebookOpen] = useState<boolean>(false);

  const discoveredClues = mystery.clues.filter((c) =>
    discoveredClueIds.includes(c.id)
  );

  const getVikarnaThought = () => {
    if (discoveredClueIds.length === 0) {
      return '“Everyone is blaming without looking at the ground. Examine the glowing marks in the scene to verify the facts!”';
    }
    if (discoveredClueIds.length < 3) {
      return '“Good observation! We’re finding details the gossiping crowd never noticed. Let us inspect closer.”';
    }
    return '“Excellent. Our evidence is coming together. Does the initial accusation still hold up?”';
  };

  const stages = [
    { label: 'PROBLEM', state: 'done' },
    { label: 'QUESTION', state: 'done' },
    { label: 'CLUES', state: 'active' },
    { label: 'THINK', state: 'upcoming' },
    { label: 'DECIDE', state: 'upcoming' },
  ];

  const handleHotspotClick = (clue: Clue) => {
    sounds.playClueFound();
    setActiveClueForModal(clue);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 min-h-[calc(100vh-70px)] flex flex-col justify-between bg-[#070B14]">
      {/* Top Section: Progress Path and Scene Title */}
      <div>
        {/* Stages Progress Path */}
        <div className="bg-[#0B1120] rounded-xl p-3 border border-amber-500/25 shadow-md mb-4">
          <div className="flex items-center justify-between gap-1 overflow-x-auto text-[11px] font-bold">
            {stages.map((stage, idx) => (
              <div key={stage.label} className="flex items-center gap-1 sm:gap-2 shrink-0">
                <div
                  className={`px-3.5 py-1.5 rounded-lg transition-all ${
                    stage.state === 'active'
                      ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-extrabold shadow-[0_0_15px_rgba(240,178,62,0.4)]'
                      : stage.state === 'done'
                      ? 'bg-[#141E33] text-amber-200/80 border border-amber-500/20'
                      : 'bg-[#0E1524] text-slate-500 border border-slate-800'
                  }`}
                >
                  <span>{idx + 1}. {stage.label}</span>
                </div>
                {idx < stages.length - 1 && (
                  <span className="text-amber-500/30 font-normal">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Scene Header & Prompt Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {mystery.location.name}
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-slate-400">Case #{mystery.order}</span>
            </div>
            <h1 className="font-cinzel text-xl sm:text-2xl font-bold text-[#F0B23E] leading-tight">
              {mystery.title}
            </h1>
          </div>

          {/* Quick Stats: Clues Found */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sounds.playPageTurn();
                setIsNotebookOpen(true);
              }}
              className="py-2 px-3.5 rounded-xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-xs font-bold text-amber-300 transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(240,178,62,0.15)]"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Evidence Notebook ({discoveredClues.length} / {mystery.clues.length})</span>
            </button>
          </div>
        </div>

        {/* What Everyone Thinks Callout */}
        <div className="bg-[#121422] rounded-xl px-4 py-2.5 border border-amber-500/25 mb-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-amber-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              Initial Gossip:
            </span>
            <span className="text-slate-200 font-medium italic">
              "{mystery.initialAssumption}"
            </span>
          </div>
          <span className="text-[11px] text-amber-300 font-semibold hidden md:inline shrink-0">
            Click glowing clues to verify reality
          </span>
        </div>

        {/* 2D Interactive Scene Stage */}
        <div className="relative rounded-2xl overflow-hidden border border-amber-500/35 shadow-[0_0_30px_rgba(240,178,62,0.1)] bg-[#0A0F1D] min-h-[380px] sm:min-h-[480px]">
          {/* Unique Mystery-Specific Background Visual */}
          <img
            src={getMysteryScene(mystery.id)}
            alt={`${mystery.title} Scene`}
            className="w-full h-full object-cover filter brightness-85 contrast-105"
            referrerPolicy="no-referrer"
          />

          {/* Measured Scrim Overlay to keep UI & Hotspots Crystal Clear */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070B14]/85 via-transparent to-[#070B14]/40 pointer-events-none" />

          {/* Environmental Location HUD Tag */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-2 bg-[#070B14]/90 border border-amber-500/35 px-3 py-1.5 rounded-lg backdrop-blur-md shadow-md text-xs text-amber-300">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold">{mystery.location.name}</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-300 text-[11px] font-mono">
              {discoveredClues.length} / {mystery.clues.length} Clues Found
            </span>
          </div>

          {/* Interactive Hotspots Over Scene */}
          {mystery.clues.map((clue) => {
            const isFound = discoveredClueIds.includes(clue.id);

            return (
              <button
                key={clue.id}
                onClick={() => handleHotspotClick(clue)}
                style={{
                  left: `${clue.scenePosition.x}%`,
                  top: `${clue.scenePosition.y}%`,
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 focus-visible:outline-none group z-20 hover:scale-125 ${
                  isFound ? 'opacity-90' : 'hover:scale-120'
                }`}
                aria-label={`Inspect ${clue.name}`}
              >
                <div className="relative flex flex-col items-center">
                  {/* Pulsing ring for undiscovered */}
                  {!isFound && (
                    <span className="absolute -inset-1 rounded-full bg-amber-400/50 animate-ping" />
                  )}

                  {/* Hotspot Core Button */}
                  <div
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-lg transition-colors border-2 ${
                      isFound
                        ? 'bg-emerald-900 border-emerald-400 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                        : 'bg-gradient-to-tr from-amber-600 to-amber-400 border-amber-200 text-slate-950 shadow-[0_0_20px_rgba(240,178,62,0.6)]'
                    }`}
                  >
                    {isFound ? (
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    ) : (
                      <Sparkles className="w-5 h-5 text-slate-950" />
                    )}
                  </div>

                  {/* Clue Label Floating Badge */}
                  <div
                    className={`mt-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold whitespace-nowrap shadow-md backdrop-blur-xs transition-opacity ${
                      isFound
                        ? 'bg-[#061B14]/90 text-emerald-300 border border-emerald-500/40'
                        : 'bg-[#070B14]/90 text-amber-200 border border-amber-500/40 group-hover:opacity-100'
                    }`}
                  >
                    {clue.name}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Companion Vikarna & Signature "ASK WHY?" Action Console */}
      <div className="mt-4 pt-4 border-t border-amber-500/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* Left: Vikarna Thought Console */}
          <div className="lg:col-span-7 bg-[#0B1120] rounded-2xl p-4 border border-amber-500/25 shadow-md flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-amber-400/80 shrink-0 gold-glow-sm">
              <VikarnaPrinceIllustration className="w-full h-full" />
            </div>
            <div className="flex-1">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                Vikarna Guides:
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-snug font-normal">
                {getVikarnaThought()}
              </p>
            </div>
          </div>

          {/* Right: Signature "ASK WHY?" and "READY TO DECIDE" Buttons */}
          <div className="lg:col-span-5 flex items-center gap-2.5">
            {/* Signature "ASK WHY?" Button */}
            <button
              onClick={() => {
                sounds.playAskWhy();
                onAskWhyTriggered();
                setIsAskWhyOpen(true);
              }}
              className="flex-1 py-3.5 px-4 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-500 text-slate-950 font-outfit text-sm font-extrabold rounded-xl shadow-[0_0_25px_rgba(240,178,62,0.3)] hover:shadow-[0_0_35px_rgba(240,178,62,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-300 group"
            >
              <HelpCircle className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition-transform" />
              <span>🔍 ASK WHY?</span>
            </button>

            {/* Ready to Decide CTA */}
            <button
              onClick={() => {
                sounds.playVictory();
                onProceedToDecision();
              }}
              disabled={discoveredClues.length < 2}
              className={`py-3.5 px-5 rounded-xl font-outfit text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs shrink-0 ${
                discoveredClues.length >= 2
                  ? 'bg-[#15233E] hover:bg-[#1E3054] text-amber-300 border border-amber-500/40 cursor-pointer'
                  : 'bg-[#0E1524] text-slate-600 cursor-not-allowed border border-slate-800'
              }`}
            >
              <span>DECIDE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Clue Discovery Modal */}
      {activeClueForModal && (
        <ClueDiscoveryModal
          clue={activeClueForModal}
          isOpen={!!activeClueForModal}
          isAlreadyAdded={discoveredClueIds.includes(activeClueForModal.id)}
          onAddToNotebook={() => {
            onDiscoverClue(activeClueForModal.id);
            setActiveClueForModal(null);
          }}
          onClose={() => setActiveClueForModal(null)}
        />
      )}

      {/* Signature Ask Why Inquiry Modal */}
      <AskWhyModal
        mystery={mystery}
        discoveredClueIds={discoveredClueIds}
        isOpen={isAskWhyOpen}
        onClose={() => setIsAskWhyOpen(false)}
        onHintUsed={onHintUsed}
      />

      {/* Evidence Notebook Modal */}
      <EvidenceNotebookModal
        mystery={mystery}
        discoveredClues={discoveredClues}
        isOpen={isNotebookOpen}
        onClose={() => setIsNotebookOpen(false)}
        onReadyToDecide={() => {
          setIsNotebookOpen(false);
          onProceedToDecision();
        }}
      />
    </div>
  );
};
