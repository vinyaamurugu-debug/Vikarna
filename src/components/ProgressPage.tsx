import React from 'react';
import { Mystery, PlayerProgress } from '../types/mystery';
import { sounds } from '../utils/sound';
import { Award, Star, Compass, BookOpen, CheckCircle2, ChevronRight, HelpCircle, ArrowLeft } from 'lucide-react';

interface ProgressPageProps {
  mysteries: Mystery[];
  progress: PlayerProgress;
  onBackToMap: () => void;
  onSelectMystery: (id: string) => void;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({
  mysteries,
  progress,
  onBackToMap,
  onSelectMystery,
}) => {
  const totalMysteries = mysteries.length;
  const solvedCount = progress.completedMysteryIds.length;
  const maxPossibleStars = totalMysteries * 5;

  const badges = [
    {
      title: 'First Observation',
      desc: 'Solved your very first mystery with solid evidence',
      unlocked: solvedCount >= 1,
      icon: '🌱',
    },
    {
      title: 'Inquiring Mind',
      desc: 'Asked “WHY?” at least 3 times during investigations',
      unlocked: progress.totalQuestionsAsked >= 3,
      icon: '🔍',
    },
    {
      title: 'Evidence Detective',
      desc: 'Discovered 15 or more scene clues across cases',
      unlocked: progress.totalCluesFound >= 15,
      icon: '📖',
    },
    {
      title: 'Unbiased Thinker',
      desc: 'Avoided jumping to gossip in 3 different mysteries',
      unlocked: progress.evidenceDecisionsCount >= 3,
      icon: '⚖️',
    },
    {
      title: 'Crown of Vikarna',
      desc: 'Completed all 10 kingdom investigations',
      unlocked: solvedCount >= 10,
      icon: '👑',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 min-h-[calc(100vh-70px)] flex flex-col justify-between bg-[#070B14]">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                Personal Investigator Journal
              </span>
            </div>
            <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#F0B23E] tracking-wide">
              My Learning Progress
            </h1>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onBackToMap();
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-amber-300 py-2 px-3.5 rounded-lg border border-amber-500/30 hover:bg-[#0B1120] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span>Adventure Map</span>
          </button>
        </div>

        {/* Motivational Banner */}
        <div className="bg-gradient-to-r from-[#172544] via-[#0F1A30] to-[#2E1F0F] rounded-2xl p-6 text-white border border-amber-500/35 shadow-md mb-6">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-1">
            Growth & Critical Thinking
          </span>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#F0B23E] mb-2">
            “You’re becoming an extraordinary investigator!”
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Every time you question unverified rumors and look for physical clues, you practice the courage of Vikarna.
          </p>
        </div>

        {/* Key Numerical Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-8">
          <div className="bg-[#0B1120] rounded-xl p-4 border border-amber-500/25 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Mysteries Solved
            </span>
            <div className="text-2xl font-extrabold font-outfit text-amber-300">
              {solvedCount} <span className="text-xs font-normal text-slate-500">/ {totalMysteries}</span>
            </div>
          </div>

          <div className="bg-[#0B1120] rounded-xl p-4 border border-amber-500/25 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Curiosity Stars
            </span>
            <div className="text-2xl font-extrabold font-outfit text-amber-400 flex items-center gap-1">
              {progress.totalStars} <span className="text-xs font-normal text-slate-500">/ {maxPossibleStars}</span>
            </div>
          </div>

          <div className="bg-[#0B1120] rounded-xl p-4 border border-amber-500/25 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Clues Discovered
            </span>
            <div className="text-2xl font-extrabold font-outfit text-slate-100">
              {progress.totalCluesFound}
            </div>
          </div>

          <div className="bg-[#0B1120] rounded-xl p-4 border border-amber-500/25 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Fair Decisions
            </span>
            <div className="text-2xl font-extrabold font-outfit text-emerald-400">
              {progress.evidenceDecisionsCount}
            </div>
          </div>
        </div>

        {/* Critical Thinker Badges Strip */}
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-3">
            Inquiry Badges Earned:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {badges.map((b) => (
              <div
                key={b.title}
                className={`rounded-xl p-3.5 border transition-all ${
                  b.unlocked
                    ? 'bg-[#0B1120] border-amber-500/40 shadow-xs'
                    : 'bg-[#070B14] border-slate-800 opacity-50'
                }`}
              >
                <div className="text-2xl mb-1.5">{b.icon}</div>
                <h4 className="font-outfit font-bold text-xs text-amber-200 mb-1">
                  {b.title}
                </h4>
                <p className="text-[10px] text-slate-400 leading-tight">
                  {b.desc}
                </p>
                <div className="mt-2 text-[9px] font-semibold">
                  {b.unlocked ? (
                    <span className="text-amber-400">✓ Unlocked</span>
                  ) : (
                    <span className="text-slate-600">In Progress</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Case Record Table */}
        <div className="bg-[#0B1120] rounded-2xl border border-amber-500/25 overflow-hidden shadow-xs mb-6">
          <div className="px-5 py-3.5 bg-[#070B14] border-b border-amber-500/20 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Kingdom Case Log
            </span>
            <span className="text-xs text-slate-400">
              Click any case to replay or investigate
            </span>
          </div>

          <div className="divide-y divide-amber-500/10">
            {mysteries.map((m) => {
              const attempt = progress.attempts[m.id];
              const isCompleted = progress.completedMysteryIds.includes(m.id);
              const stars = attempt?.stars || 0;

              return (
                <div
                  key={m.id}
                  onClick={() => {
                    sounds.playClick();
                    onSelectMystery(m.id);
                  }}
                  className="px-5 py-3 flex items-center justify-between gap-4 hover:bg-[#121B30] cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md bg-amber-500/15 text-amber-300 font-bold text-xs flex items-center justify-center border border-amber-500/30 font-mono">
                      {m.order}
                    </span>
                    <div>
                      <h4 className="font-outfit font-bold text-sm text-slate-100">
                        {m.title}
                      </h4>
                      <span className="text-xs text-slate-400">
                        {m.location.name} · {m.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-0.5 text-sm">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <span
                          key={s}
                          className={s <= stars ? 'text-amber-400' : 'text-slate-700'}
                        >
                          ★
                        </span>
                      ))}
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
