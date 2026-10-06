import React, { useState } from 'react';
import { Mystery, Clue } from '../types/mystery';
import { sounds } from '../utils/sound';
import { BookOpen, X, Sparkles, CheckCircle2, ChevronRight, HelpCircle, FileText, ShieldAlert } from 'lucide-react';

interface EvidenceNotebookModalProps {
  mystery: Mystery;
  discoveredClues: Clue[];
  isOpen: boolean;
  onClose: () => void;
  onReadyToDecide: () => void;
}

export const EvidenceNotebookModal: React.FC<EvidenceNotebookModalProps> = ({
  mystery,
  discoveredClues,
  isOpen,
  onClose,
  onReadyToDecide,
}) => {
  const [activeTab, setActiveTab] = useState<'clues' | 'questions' | 'observations'>('clues');

  if (!isOpen) return null;

  const totalCluesCount = mystery.clues.length;
  const discoveredCount = discoveredClues.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0B1120] border border-amber-500/35 rounded-2xl max-w-2xl w-full shadow-[0_0_60px_rgba(240,178,62,0.18)] overflow-hidden flex flex-col max-h-[85vh]">
        {/* Top Gold Trim */}
        <div className="h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />

        {/* Notebook Top Header */}
        <div className="bg-[#070B14] px-6 py-4 border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400/90 block">
                Investigator's Dossier
              </span>
              <h2 className="font-cinzel text-lg font-bold text-[#F0B23E] leading-tight">
                Evidence Notebook
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-mono">
              Clues: {discoveredCount} / {totalCluesCount}
            </span>
            <button
              onClick={() => {
                sounds.playPageTurn();
                onClose();
              }}
              className="p-1 rounded-lg text-slate-400 hover:text-amber-200 hover:bg-white/5 transition-colors"
              aria-label="Close Notebook"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notebook Tabs */}
        <div className="flex border-b border-amber-500/20 bg-[#070B14]/60 px-6 pt-2 gap-2 text-xs font-semibold">
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('clues');
            }}
            className={`px-4 py-2 rounded-t-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'clues'
                ? 'bg-[#0B1120] text-amber-300 border-t border-x border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Discovered Clues ({discoveredCount})</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('questions');
            }}
            className={`px-4 py-2 rounded-t-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'questions'
                ? 'bg-[#0B1120] text-amber-300 border-t border-x border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Inquiry Questions</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('observations');
            }}
            className={`px-4 py-2 rounded-t-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'observations'
                ? 'bg-[#0B1120] text-amber-300 border-t border-x border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Rumor vs Evidence</span>
          </button>
        </div>

        {/* Notebook Content Scroll Area */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'clues' && (
            <div>
              {discoveredClues.length === 0 ? (
                <div className="text-center py-12 px-4 bg-[#070B14] rounded-xl border border-dashed border-amber-500/20">
                  <p className="font-outfit text-base font-semibold text-slate-300 mb-1">
                    Your notebook is currently empty
                  </p>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Inspect the scene and click on pulsating marks (footprints, timber fence, apples, etc.) to log verified physical evidence.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {discoveredClues.map((clue) => (
                    <div
                      key={clue.id}
                      className="bg-[#0F172A] rounded-xl p-3.5 border border-amber-500/25 hover:border-amber-400/50 transition-colors flex flex-col justify-between shadow-xs"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                            {clue.category} Evidence
                          </span>
                          {clue.importance === 'key' && (
                            <span className="text-[10px] font-semibold text-slate-950 bg-amber-400 px-1.5 py-0.5 rounded font-mono">
                              Key Clue
                            </span>
                          )}
                        </div>
                        <h4 className="font-outfit font-bold text-sm text-amber-100 mb-1">
                          {clue.name}
                        </h4>
                        <p className="text-xs text-slate-300 mb-2 leading-relaxed">
                          {clue.description}
                        </p>
                      </div>

                      <div className="bg-[#070B14] rounded-lg p-2.5 text-[11px] text-amber-200/90 italic border border-amber-500/15">
                        "{clue.details}"
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'questions' && (
            <div className="space-y-3">
              <div className="bg-amber-950/25 rounded-xl p-3.5 border border-amber-500/30 text-xs text-amber-200">
                <strong className="text-amber-300">Investigator Principle:</strong> Socratic questions allow you to separate what people assume from what is physically proven.
              </div>

              {mystery.questions.map((q, idx) => (
                <div
                  key={idx}
                  className="bg-[#0F172A] rounded-xl p-3.5 border border-amber-500/20 flex items-start gap-3"
                >
                  <span className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 font-mono">
                    {idx + 1}
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    {q}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'observations' && (
            <div className="space-y-4">
              {/* Rumor Card */}
              <div className="bg-[#151421] border border-rose-500/30 rounded-xl p-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 block mb-1">
                  What Everyone Suspects (Unproven Gossip):
                </span>
                <p className="text-xs sm:text-sm text-slate-200 italic">
                  "{mystery.initialAssumption}"
                </p>
              </div>

              {/* Physical Evidence Contrast */}
              <div className="bg-[#0A1A17] border border-emerald-500/30 rounded-xl p-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                  What Verified Evidence Proves:
                </span>
                <ul className="text-xs text-emerald-200 space-y-1.5 list-disc list-inside">
                  {discoveredClues.map((clue) => (
                    <li key={clue.id}>
                      <strong className="text-emerald-100">{clue.name}:</strong> {clue.details}
                    </li>
                  ))}
                  {discoveredClues.length === 0 && (
                    <li className="italic text-slate-400">
                      No clues logged yet. Explore the scene first!
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Notebook Bottom Action Footer */}
        <div className="bg-[#070B14] border-t border-amber-500/20 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            {discoveredCount >= 2
              ? '✨ You have enough verified clues to form an evidence-based decision.'
              : '🔍 Find at least 2 clues before attempting a final decision.'}
          </span>

          <button
            onClick={() => {
              sounds.playVictory();
              onClose();
              onReadyToDecide();
            }}
            disabled={discoveredCount < 2}
            className={`py-2.5 px-5 rounded-xl font-outfit text-xs font-bold transition-all flex items-center gap-2 ${
              discoveredCount >= 2
                ? 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-extrabold cursor-pointer shadow-[0_0_15px_rgba(240,178,62,0.3)]'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            <span>PROCEED TO DECISION</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
