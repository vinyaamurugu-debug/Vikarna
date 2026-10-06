import React, { useState } from 'react';
import { Mystery, PlayerProgress, Clue, DecisionOption } from '../types/mystery';
import { saveCustomMystery, deleteCustomMystery, resetPlayerProgress } from '../utils/storage';
import { sounds } from '../utils/sound';
import {
  Users,
  Shield,
  Plus,
  Trash2,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

interface ParentTeacherModeProps {
  mysteries: Mystery[];
  progress: PlayerProgress;
  onRefreshMysteries: () => void;
  onBackToMap: () => void;
}

export const ParentTeacherMode: React.FC<ParentTeacherModeProps> = ({
  mysteries,
  progress,
  onRefreshMysteries,
  onBackToMap,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [securityAnswer, setSecurityAnswer] = useState<string>('');
  const [authError, setAuthError] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<'analytics' | 'create' | 'manage'>('analytics');

  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [locationName, setLocationName] = useState('');
  const [locationDesc, setLocationDesc] = useState('');
  const [initialAssumption, setInitialAssumption] = useState('');
  const [vikarnaPrompt, setVikarnaPrompt] = useState('');
  const [lesson, setLesson] = useState('');
  const [solutionSummary, setSolutionSummary] = useState('');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Investigator' | 'Master Sleuth'>('Beginner');

  const [clues, setClues] = useState<Clue[]>([
    {
      id: 'c1',
      name: 'Key Physical Clue',
      description: 'Physical marks visible at the scene',
      icon: 'Footprints',
      category: 'physical',
      importance: 'key',
      scenePosition: { x: 50, y: 60 },
      details: 'Physical fact that disproves the initial gossip.',
    },
    {
      id: 'c2',
      name: 'Environmental Clue',
      description: 'Natural factor or weather sign',
      icon: 'Wind',
      category: 'environmental',
      importance: 'key',
      scenePosition: { x: 75, y: 35 },
      details: 'Environmental conditions explain what occurred.',
    },
    {
      id: 'c3',
      name: 'Witness or Item Clue',
      description: 'Item found nearby',
      icon: 'Sparkles',
      category: 'supporting',
      importance: 'supporting',
      scenePosition: { x: 30, y: 70 },
      details: 'Shows where someone or something actually went.',
    },
  ]);

  const [hint1, setHint1] = useState('');
  const [hint2, setHint2] = useState('');
  const [hint3, setHint3] = useState('');

  const [decA, setDecA] = useState('');
  const [feedbackA, setFeedbackA] = useState('');
  const [decB, setDecB] = useState('');
  const [feedbackB, setFeedbackB] = useState('');
  const [decC, setDecC] = useState('');
  const [feedbackC, setFeedbackC] = useState('');

  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (securityAnswer.trim() === '33') {
      setIsAuthenticated(true);
      setAuthError(false);
      sounds.playVictory();
    } else {
      setAuthError(true);
      sounds.playClick();
    }
  };

  const handleCreateMystery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !story || !initialAssumption || !lesson) {
      alert('Please fill in all essential mystery fields.');
      return;
    }

    const newMystery: Omit<Mystery, 'id' | 'order' | 'isCustom'> = {
      title,
      story,
      location: {
        name: locationName || 'Kingdom Outskirts',
        icon: 'MapPin',
        description: locationDesc || 'An unexplored part of the kingdom.',
        coordinates: {
          x: Math.floor(Math.random() * 60) + 20,
          y: Math.floor(Math.random() * 60) + 20,
        },
      },
      characters: [
        { name: 'Accuser', role: 'Complainant', quote: initialAssumption },
        { name: 'The Suspect', role: 'Innocent Bystander', quote: 'I am innocent!' },
      ],
      initialAssumption,
      vikarnaPrompt: vikarnaPrompt || 'Everyone assumes the worst... but where is our proof? Let’s inspect the scene.',
      clues,
      questions: [
        'Did anyone verify the accusation with physical proof?',
        'What do the clues on the scene actually prove?',
        'Is there a simpler, natural explanation?',
      ],
      hints: {
        hint1: hint1 || 'Take a close look at the physical clues near the scene.',
        hint2: hint2 || 'Notice how the clues tell a different story from the gossip.',
        hint3: hint3 || 'The physical evidence shows what actually happened.',
      },
      decisions: [
        {
          id: 'dec-1',
          text: decA || 'Accuse the person everyone suspected without checking evidence.',
          isCorrect: false,
          reasoningCategory: 'hasty_blame',
          feedback: feedbackA || 'Remember, gossip and rumors are not proof!',
        },
        {
          id: 'dec-2',
          text: decB || 'Follow the physical evidence to resolve the situation fairly.',
          isCorrect: true,
          reasoningCategory: 'evidence_based',
          feedback: feedbackB || 'Excellent reasoning! You followed real facts instead of rumors.',
        },
        {
          id: 'dec-3',
          text: decC || 'Pick another random explanation with no evidence.',
          isCorrect: false,
          reasoningCategory: 'random_assumption',
          feedback: feedbackC || 'Guessing randomly is not evidence-based thinking.',
        },
      ],
      solutionSummary: solutionSummary || 'The physical evidence showed what truly happened.',
      lesson,
      difficulty,
    };

    saveCustomMystery(newMystery);
    sounds.playVictory();
    setFormSuccess(`"${title}" was created successfully and is now active on the Adventure Map!`);
    onRefreshMysteries();

    setTitle('');
    setStory('');
    setLocationName('');
    setInitialAssumption('');
    setLesson('');
    setTimeout(() => setFormSuccess(null), 4000);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this custom mystery?')) {
      deleteCustomMystery(id);
      sounds.playClick();
      onRefreshMysteries();
    }
  };

  const handleReset = () => {
    resetPlayerProgress();
    sounds.playVictory();
    setConfirmResetOpen(false);
    onRefreshMysteries();
    alert('Student progress has been reset.');
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 min-h-[calc(100vh-70px)] flex flex-col justify-center bg-[#070B14]">
        <div className="bg-[#0B1120] border border-amber-500/35 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(240,178,62,0.15)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Shield className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                Educator Access Gate
              </span>
              <h1 className="font-cinzel text-xl font-bold text-[#F0B23E] leading-tight">
                Parent & Teacher Mode
              </h1>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-6">
            Please solve this quick challenge to verify you are an adult/educator:
          </p>

          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                What is 18 + 15?
              </label>
              <input
                type="number"
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
                placeholder="Enter answer"
                className="w-full px-3.5 py-2.5 rounded-xl border border-amber-500/30 bg-[#070B14] text-amber-100 text-sm font-semibold focus:border-amber-400 focus:outline-none"
                required
              />
              {authError && (
                <span className="text-xs text-rose-400 mt-1 block">
                  Incorrect answer. Please calculate 18 + 15.
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  onBackToMap();
                }}
                className="w-1/2 py-2.5 px-3 rounded-xl border border-amber-500/30 text-xs font-semibold text-slate-300 hover:bg-[#070B14] transition-colors"
              >
                Back to Map
              </button>

              <button
                type="submit"
                className="w-1/2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-slate-950 text-xs font-bold transition-all shadow-[0_0_15px_rgba(240,178,62,0.3)] cursor-pointer"
              >
                Enter Dashboard
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  const customMysteries = mysteries.filter((m) => m.isCustom);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 min-h-[calc(100vh-70px)] bg-[#070B14]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Educator & Parent Portal
            </span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#F0B23E] tracking-wide">
            Curriculum & Mysteries Manager
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setConfirmResetOpen(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 py-2 px-3 rounded-lg border border-rose-500/30 hover:bg-rose-950/20 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Student Progress</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onBackToMap();
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-amber-300 py-2 px-3.5 rounded-lg border border-amber-500/30 hover:bg-[#0B1120] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span>Back to Map</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-amber-500/20 gap-2 mb-6">
        <button
          onClick={() => {
            sounds.playClick();
            setActiveTab('analytics');
          }}
          className={`py-2 px-4 text-xs font-bold rounded-t-lg transition-colors ${
            activeTab === 'analytics'
              ? 'bg-[#0B1120] text-amber-300 border-t border-x border-amber-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Student Learning Analytics
        </button>

        <button
          onClick={() => {
            sounds.playClick();
            setActiveTab('create');
          }}
          className={`py-2 px-4 text-xs font-bold rounded-t-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'create'
              ? 'bg-[#0B1120] text-amber-300 border-t border-x border-amber-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Plus className="w-3.5 h-3.5 text-amber-400" />
          <span>Create New Mystery</span>
        </button>

        <button
          onClick={() => {
            sounds.playClick();
            setActiveTab('manage');
          }}
          className={`py-2 px-4 text-xs font-bold rounded-t-lg transition-colors ${
            activeTab === 'manage'
              ? 'bg-[#0B1120] text-amber-300 border-t border-x border-amber-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Custom Mysteries ({customMysteries.length})
        </button>
      </div>

      {/* TAB 1: Student Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-[#0B1120] p-4 rounded-xl border border-amber-500/25">
              <span className="text-xs text-slate-400 font-semibold block mb-1">Total Stars Earned</span>
              <span className="text-2xl font-bold font-outfit text-amber-400">⭐ {progress.totalStars}</span>
            </div>
            <div className="bg-[#0B1120] p-4 rounded-xl border border-amber-500/25">
              <span className="text-xs text-slate-400 font-semibold block mb-1">Mysteries Solved</span>
              <span className="text-2xl font-bold font-outfit text-amber-200">{progress.completedMysteryIds.length} / {mysteries.length}</span>
            </div>
            <div className="bg-[#0B1120] p-4 rounded-xl border border-amber-500/25">
              <span className="text-xs text-slate-400 font-semibold block mb-1">Clues Inspected</span>
              <span className="text-2xl font-bold font-outfit text-slate-100">{progress.totalCluesFound}</span>
            </div>
            <div className="bg-[#0B1120] p-4 rounded-xl border border-amber-500/25">
              <span className="text-xs text-slate-400 font-semibold block mb-1">Evidence Decisions</span>
              <span className="text-2xl font-bold font-outfit text-emerald-400">{progress.evidenceDecisionsCount}</span>
            </div>
          </div>

          <div className="bg-[#0B1120] rounded-2xl border border-amber-500/25 overflow-hidden shadow-xs">
            <div className="p-4 bg-[#070B14] border-b border-amber-500/20">
              <h3 className="font-outfit font-bold text-sm text-amber-300">
                Detailed Case Reasoning Records
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#090E1B] text-slate-300 font-semibold border-b border-amber-500/20">
                  <tr>
                    <th className="p-3">Case</th>
                    <th className="p-3">Title</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Curiosity Stars</th>
                    <th className="p-3">Clues Found</th>
                    <th className="p-3">Inquiries Asked</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-500/10">
                  {mysteries.map((m) => {
                    const att = progress.attempts[m.id];
                    const isDone = progress.completedMysteryIds.includes(m.id);

                    return (
                      <tr key={m.id} className="hover:bg-[#121B30]">
                        <td className="p-3 font-mono font-bold text-amber-400">#{m.order}</td>
                        <td className="p-3 font-semibold text-slate-200">{m.title}</td>
                        <td className="p-3">
                          {isDone ? (
                            <span className="text-emerald-400 font-semibold">✓ Completed</span>
                          ) : (
                            <span className="text-slate-500">Not Completed</span>
                          )}
                        </td>
                        <td className="p-3 font-bold text-amber-400">
                          {att ? `${att.stars} / 5 ⭐` : '—'}
                        </td>
                        <td className="p-3 text-slate-300">
                          {att ? `${att.cluesFoundIds.length} / ${m.clues.length}` : '—'}
                        </td>
                        <td className="p-3 text-slate-300">
                          {att ? att.askedWhyCount : '—'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CREATE NEW MYSTERY FORM */}
      {activeTab === 'create' && (
        <div className="bg-[#0B1120] rounded-2xl border border-amber-500/30 p-6 shadow-xs">
          <div className="mb-6">
            <h2 className="font-cinzel text-xl font-bold text-[#F0B23E] mb-1">
              Add a New Mystery Case
            </h2>
            <p className="text-xs text-slate-300">
              Create a custom investigation for your child or classroom. Once saved, it will immediately appear on the Adventure Map.
            </p>
          </div>

          {formSuccess && (
            <div className="p-4 bg-emerald-950/40 border border-emerald-400/40 rounded-xl text-xs font-semibold text-emerald-200 mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{formSuccess}</span>
            </div>
          )}

          <form onSubmit={handleCreateMystery} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1">
                  Mystery Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. The Spilled Paint in the Temple"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-amber-500/30 bg-[#070B14] text-slate-100 focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1">
                  Difficulty Level
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as unknown as 'Beginner')}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-amber-500/30 bg-[#070B14] text-slate-100 focus:outline-none focus:border-amber-400"
                >
                  <option value="Beginner">Beginner (Ages 8-10)</option>
                  <option value="Investigator">Investigator (Ages 10-12)</option>
                  <option value="Master Sleuth">Master Sleuth (Ages 12-14)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-300 mb-1">
                Story Introduction *
              </label>
              <textarea
                value={story}
                onChange={(e) => setStory(e.target.value)}
                rows={3}
                placeholder="Describe what incident happened and who is being gossiped about..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-amber-500/30 bg-[#070B14] text-slate-100 focus:outline-none focus:border-amber-400"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1">
                  Location Name
                </label>
                <input
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  placeholder="e.g. Royal Silk Workshop"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-amber-500/30 bg-[#070B14] text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1">
                  What Everyone Thinks (Initial Assumption) *
                </label>
                <input
                  type="text"
                  value={initialAssumption}
                  onChange={(e) => setInitialAssumption(e.target.value)}
                  placeholder="e.g. Everyone blames the apprentice who arrived late."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-amber-500/30 bg-[#070B14] text-slate-100 focus:outline-none focus:border-amber-400"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-300 mb-1">
                Vikarna's Thoughtful Prompt
              </label>
              <input
                type="text"
                value={vikarnaPrompt}
                onChange={(e) => setVikarnaPrompt(e.target.value)}
                placeholder="e.g. Everyone points fingers, but did anyone inspect the scene?"
                className="w-full px-3 py-2 text-xs rounded-lg border border-amber-500/30 bg-[#070B14] text-slate-100 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Clues */}
            <div className="border-t border-amber-500/20 pt-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-3">
                Scene Clues (3 Interactive Clues)
              </span>
              <div className="space-y-3">
                {clues.map((clue, idx) => (
                  <div key={clue.id} className="p-3 bg-[#070B14] rounded-xl border border-amber-500/20 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-0.5">
                        Clue {idx + 1} Name
                      </label>
                      <input
                        type="text"
                        value={clue.name}
                        onChange={(e) => {
                          const updated = [...clues];
                          updated[idx].name = e.target.value;
                          setClues(updated);
                        }}
                        className="w-full px-2.5 py-1.5 text-xs rounded-md border border-amber-500/30 bg-[#0B1120] text-slate-100"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-400 mb-0.5">
                        What does inspecting this clue reveal?
                      </label>
                      <input
                        type="text"
                        value={clue.details}
                        onChange={(e) => {
                          const updated = [...clues];
                          updated[idx].details = e.target.value;
                          setClues(updated);
                        }}
                        className="w-full px-2.5 py-1.5 text-xs rounded-md border border-amber-500/30 bg-[#0B1120] text-slate-100"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hints */}
            <div className="border-t border-amber-500/20 pt-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-3">
                Progressive Socratic Hints (Ask Why)
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-0.5">
                    Hint 1: Subtle
                  </label>
                  <input
                    type="text"
                    value={hint1}
                    onChange={(e) => setHint1(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-md border border-amber-500/30 bg-[#070B14] text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-0.5">
                    Hint 2: Targeted
                  </label>
                  <input
                    type="text"
                    value={hint2}
                    onChange={(e) => setHint2(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-md border border-amber-500/30 bg-[#070B14] text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-0.5">
                    Hint 3: Direct
                  </label>
                  <input
                    type="text"
                    value={hint3}
                    onChange={(e) => setHint3(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-md border border-amber-500/30 bg-[#070B14] text-slate-100"
                  />
                </div>
              </div>
            </div>

            {/* Decisions */}
            <div className="border-t border-amber-500/20 pt-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-3">
                Decisions & Reasoning Choices
              </span>
              <div className="space-y-3">
                <div className="p-3 bg-[#151421] rounded-xl border border-rose-500/30">
                  <label className="block text-xs font-bold text-rose-400 mb-1">
                    Choice A: Hasty Accusation (Incorrect)
                  </label>
                  <input
                    type="text"
                    value={decA}
                    onChange={(e) => setDecA(e.target.value)}
                    placeholder="e.g. Accuse the apprentice immediately."
                    className="w-full px-2.5 py-1.5 text-xs rounded-md border border-amber-500/30 bg-[#070B14] text-slate-100 mb-1.5"
                  />
                  <input
                    type="text"
                    value={feedbackA}
                    onChange={(e) => setFeedbackA(e.target.value)}
                    placeholder="Feedback explaining why this lacks evidence..."
                    className="w-full px-2.5 py-1.5 text-xs rounded-md border border-amber-500/30 bg-[#070B14] text-slate-100"
                  />
                </div>

                <div className="p-3 bg-[#0A1A17] rounded-xl border border-emerald-500/30">
                  <label className="block text-xs font-bold text-emerald-400 mb-1">
                    Choice B: Evidence-Based Conclusion (Correct)
                  </label>
                  <input
                    type="text"
                    value={decB}
                    onChange={(e) => setDecB(e.target.value)}
                    placeholder="e.g. Strong wind from the high window knocked over the paint pot."
                    className="w-full px-2.5 py-1.5 text-xs rounded-md border border-amber-500/30 bg-[#070B14] text-slate-100 mb-1.5"
                  />
                  <input
                    type="text"
                    value={feedbackB}
                    onChange={(e) => setFeedbackB(e.target.value)}
                    placeholder="Encouraging feedback celebrating their evidence-based thinking..."
                    className="w-full px-2.5 py-1.5 text-xs rounded-md border border-amber-500/30 bg-[#070B14] text-slate-100"
                  />
                </div>
              </div>
            </div>

            {/* Lesson */}
            <div className="border-t border-amber-500/20 pt-4">
              <label className="block text-xs font-bold text-amber-300 mb-1">
                The Critical Thinking Lesson *
              </label>
              <input
                type="text"
                value={lesson}
                onChange={(e) => setLesson(e.target.value)}
                placeholder="e.g. Don't blame someone just because they were near the scene. Check physical causes first."
                className="w-full px-3 py-2 text-xs rounded-lg border border-amber-500/30 bg-[#070B14] text-slate-100"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-500 text-slate-950 font-outfit text-sm font-extrabold transition-all shadow-[0_0_20px_rgba(240,178,62,0.3)] cursor-pointer flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>SAVE & PUBLISH MYSTERY TO MAP</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: MANAGE CUSTOM MYSTERIES */}
      {activeTab === 'manage' && (
        <div className="bg-[#0B1120] rounded-2xl border border-amber-500/30 p-6 shadow-xs">
          <h2 className="font-cinzel text-xl font-bold text-[#F0B23E] mb-4">
            Custom Created Mysteries
          </h2>

          {customMysteries.length === 0 ? (
            <div className="text-center py-12 px-4 bg-[#070B14] rounded-xl border border-dashed border-amber-500/20">
              <p className="text-sm font-semibold text-slate-300 mb-1">
                No custom mysteries created yet.
              </p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                Use the "Create New Mystery" tab to design your own investigation scenarios!
              </p>
              <button
                onClick={() => setActiveTab('create')}
                className="py-2 px-4 bg-amber-500 text-slate-950 rounded-lg text-xs font-bold"
              >
                Create One Now
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {customMysteries.map((m) => (
                <div
                  key={m.id}
                  className="p-4 bg-[#070B14] rounded-xl border border-amber-500/25 flex items-center justify-between gap-4"
                >
                  <div>
                    <h3 className="font-outfit font-bold text-sm text-amber-200">
                      {m.title}
                    </h3>
                    <span className="text-xs text-slate-400">
                      {m.location.name} · {m.difficulty} · {m.clues.length} clues
                    </span>
                  </div>

                  <button
                    onClick={() => handleDelete(m.id)}
                    className="p-2 text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors border border-rose-500/30"
                    title="Delete mystery"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Reset Confirmation Dialog */}
      {confirmResetOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0B1120] rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-rose-500/40">
            <div className="flex items-center gap-2 text-rose-400 mb-2">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-outfit text-lg font-bold text-slate-100">
                Reset All Progress?
              </h3>
            </div>
            <p className="text-xs text-slate-300 mb-6">
              This will clear all completed mystery stars, badges, and clue records for the current student. Custom mysteries will remain safe.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setConfirmResetOpen(false)}
                className="w-1/2 py-2 px-3 rounded-lg border border-slate-700 text-xs font-semibold text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="w-1/2 py-2 px-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
