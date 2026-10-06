/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Mystery, PlayerProgress, DecisionOption } from './types/mystery';
import {
  getAllMysteries,
  getPlayerProgress,
  recordMysteryAttempt,
} from './utils/storage';
import { sounds } from './utils/sound';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { AdventureMap } from './components/AdventureMap';
import { MysteryIntro } from './components/MysteryIntro';
import { InvestigationScene } from './components/InvestigationScene';
import { DecisionView } from './components/DecisionView';
import { ResultsScreen } from './components/ResultsScreen';
import { ProgressPage } from './components/ProgressPage';
import { ParentTeacherMode } from './components/ParentTeacherMode';
import { HowToPlayModal } from './components/HowToPlayModal';
import { EvidenceNotebookModal } from './components/EvidenceNotebookModal';
import { StoryOfVikarnaModal } from './components/StoryOfVikarnaModal';
import { FourStepJourneyModal } from './components/FourStepJourneyModal';

type AppView =
  | 'home'
  | 'map'
  | 'intro'
  | 'investigation'
  | 'decision'
  | 'results'
  | 'progress'
  | 'parent';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [mysteries, setMysteries] = useState<Mystery[]>([]);
  const [activeMysteryId, setActiveMysteryId] = useState<string>('mystery-1');
  const [progress, setProgress] = useState<PlayerProgress>(getPlayerProgress());
  const [isMuted, setIsMuted] = useState<boolean>(sounds.getMuted());

  // Active investigation session state
  const [discoveredClueIds, setDiscoveredClueIds] = useState<string[]>([]);
  const [askedWhyCount, setAskedWhyCount] = useState<number>(0);
  const [hintsUsedCount, setHintsUsedCount] = useState<number>(0);
  const [chosenDecision, setChosenDecision] = useState<DecisionOption | null>(null);

  // Global modals matching reference screenshot
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState<boolean>(false);
  const [isGlobalNotebookOpen, setIsGlobalNotebookOpen] = useState<boolean>(false);
  const [isStoryOfVikarnaOpen, setIsStoryOfVikarnaOpen] = useState<boolean>(false);
  const [isFourStepsOpen, setIsFourStepsOpen] = useState<boolean>(false);

  // Initialize mysteries and progress
  const refreshMysteriesAndProgress = () => {
    const all = getAllMysteries();
    setMysteries(all);
    const prog = getPlayerProgress();
    setProgress(prog);
  };

  useEffect(() => {
    refreshMysteriesAndProgress();
  }, []);

  const activeMystery =
    mysteries.find((m) => m.id === activeMysteryId) || mysteries[0] || null;

  // Toggle mute
  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    sounds.setMuted(next);
  };

  // Launch a mystery (e.g. from Map or Home)
  const handleStartMystery = (mysteryId: string) => {
    setActiveMysteryId(mysteryId);
    setDiscoveredClueIds([]);
    setAskedWhyCount(0);
    setHintsUsedCount(0);
    setChosenDecision(null);
    setCurrentView('intro');
  };

  // Clue discovery
  const handleDiscoverClue = (clueId: string) => {
    if (!discoveredClueIds.includes(clueId)) {
      setDiscoveredClueIds((prev) => [...prev, clueId]);
    }
  };

  // Ask Why triggered
  const handleAskWhyTriggered = () => {
    setAskedWhyCount((prev) => prev + 1);
  };

  // Hint level used
  const handleHintUsed = (level: number) => {
    setHintsUsedCount((prev) => Math.max(prev, level));
  };

  // Final Decision selected
  const handleDecisionChosen = (decision: DecisionOption) => {
    setChosenDecision(decision);

    if (activeMystery) {
      // Calculate curiosity stars
      const totalClues = activeMystery.clues.length;
      const discoveredCount = discoveredClueIds.length;
      const hasKeyClue = activeMystery.clues.some(
        (c) => c.importance === 'key' && discoveredClueIds.includes(c.id)
      );
      const foundAllClues = discoveredCount === totalClues;
      const askedQuestion = askedWhyCount > 0;
      const avoidedUnfairAccusation = decision.reasoningCategory === 'evidence_based';
      const evidenceDecision = decision.isCorrect;

      const starCriteria = [
        askedQuestion,
        hasKeyClue,
        foundAllClues,
        avoidedUnfairAccusation,
        evidenceDecision,
      ];
      const starsEarned = starCriteria.filter(Boolean).length;

      // Record in persistent storage
      const updatedProgress = recordMysteryAttempt({
        mysteryId: activeMystery.id,
        completed: decision.isCorrect,
        stars: starsEarned,
        cluesFoundIds: discoveredClueIds,
        askedWhyCount,
        hintsUsedCount,
        chosenDecisionId: decision.id,
        timestamp: Date.now(),
      });

      setProgress(updatedProgress);
    }

    setCurrentView('results');
  };

  // Next Mystery button handler
  const handleNextMystery = () => {
    if (!activeMystery) {
      setCurrentView('map');
      return;
    }
    const currentIndex = mysteries.findIndex((m) => m.id === activeMystery.id);
    if (currentIndex < mysteries.length - 1) {
      const nextMystery = mysteries[currentIndex + 1];
      handleStartMystery(nextMystery.id);
    } else {
      setCurrentView('map');
    }
  };

  // Replay active mystery
  const handleReplayMystery = () => {
    if (activeMystery) {
      handleStartMystery(activeMystery.id);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-[#EDE7D9] flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Universal Top Bar matching reference screenshot */}
      <Header
        currentView={
          currentView === 'intro' || currentView === 'decision' || currentView === 'results'
            ? 'investigation'
            : currentView === 'map'
            ? 'map'
            : currentView === 'progress'
            ? 'progress'
            : currentView === 'parent'
            ? 'parent'
            : 'home'
        }
        onNavigate={(view) => {
          if (view === 'investigation') {
            setCurrentView('investigation');
          } else {
            setCurrentView(view);
          }
        }}
        onOpenNotebook={() => setIsGlobalNotebookOpen(true)}
        notebookClueCount={discoveredClueIds.length}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenFourSteps={() => setIsFourStepsOpen(true)}
        onOpenStoryOfVikarna={() => setIsStoryOfVikarnaOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeScreen
            onStartAdventure={() => {
              const firstUnsolved = mysteries.find(
                (m) => !progress.completedMysteryIds.includes(m.id)
              );
              handleStartMystery(firstUnsolved ? firstUnsolved.id : 'mystery-1');
            }}
            onOpenMap={() => setCurrentView('map')}
            onOpenHowToPlay={() => setIsHowToPlayOpen(true)}
            onOpenProgress={() => setCurrentView('progress')}
            onOpenParent={() => setCurrentView('parent')}
            onOpenFourSteps={() => setIsFourStepsOpen(true)}
            onOpenStoryOfVikarna={() => setIsStoryOfVikarnaOpen(true)}
            progress={progress}
          />
        )}

        {currentView === 'map' && (
          <AdventureMap
            mysteries={mysteries}
            progress={progress}
            onSelectMystery={(id) => handleStartMystery(id)}
            onBackToHome={() => setCurrentView('home')}
          />
        )}

        {currentView === 'intro' && activeMystery && (
          <MysteryIntro
            mystery={activeMystery}
            onBeginInvestigation={() => setCurrentView('investigation')}
            onBackToMap={() => setCurrentView('map')}
          />
        )}

        {currentView === 'investigation' && activeMystery && (
          <InvestigationScene
            mystery={activeMystery}
            onProceedToDecision={() => setCurrentView('decision')}
            onOpenNotebook={() => setIsGlobalNotebookOpen(true)}
            discoveredClueIds={discoveredClueIds}
            onDiscoverClue={handleDiscoverClue}
            onHintUsed={handleHintUsed}
            askedWhyCount={askedWhyCount}
            onAskWhyTriggered={handleAskWhyTriggered}
          />
        )}

        {currentView === 'decision' && activeMystery && (
          <DecisionView
            mystery={activeMystery}
            discoveredClues={activeMystery.clues.filter((c) =>
              discoveredClueIds.includes(c.id)
            )}
            onDecisionChosen={handleDecisionChosen}
            onBackToInvestigation={() => setCurrentView('investigation')}
            onOpenNotebook={() => setIsGlobalNotebookOpen(true)}
          />
        )}

        {currentView === 'results' && activeMystery && chosenDecision && (
          <ResultsScreen
            mystery={activeMystery}
            decision={chosenDecision}
            cluesDiscoveredIds={discoveredClueIds}
            askedWhyCount={askedWhyCount}
            hintsUsedCount={hintsUsedCount}
            onNextMystery={handleNextMystery}
            onReturnToMap={() => setCurrentView('map')}
            onReplayMystery={handleReplayMystery}
          />
        )}

        {currentView === 'progress' && (
          <ProgressPage
            mysteries={mysteries}
            progress={progress}
            onBackToMap={() => setCurrentView('map')}
            onSelectMystery={(id) => handleStartMystery(id)}
          />
        )}

        {currentView === 'parent' && (
          <ParentTeacherMode
            mysteries={mysteries}
            progress={progress}
            onRefreshMysteries={refreshMysteriesAndProgress}
            onBackToMap={() => setCurrentView('map')}
          />
        )}
      </main>

      {/* Global How to Play Guide Modal */}
      <HowToPlayModal
        isOpen={isHowToPlayOpen}
        onClose={() => setIsHowToPlayOpen(false)}
        onStartFirstMystery={() => {
          setIsHowToPlayOpen(false);
          handleStartMystery('mystery-1');
        }}
      />

      {/* Global Evidence Notebook Modal */}
      {activeMystery && (
        <EvidenceNotebookModal
          mystery={activeMystery}
          discoveredClues={activeMystery.clues.filter((c) =>
            discoveredClueIds.includes(c.id)
          )}
          isOpen={isGlobalNotebookOpen}
          onClose={() => setIsGlobalNotebookOpen(false)}
          onReadyToDecide={() => {
            setIsGlobalNotebookOpen(false);
            setCurrentView('decision');
          }}
        />
      )}

      {/* Story of Vikarna Modal matching screenshot header */}
      <StoryOfVikarnaModal
        isOpen={isStoryOfVikarnaOpen}
        onClose={() => setIsStoryOfVikarnaOpen(false)}
        onStartAdventure={() => {
          setIsStoryOfVikarnaOpen(false);
          handleStartMystery('mystery-1');
        }}
      />

      {/* The 4-Step Journey Modal matching screenshot header */}
      <FourStepJourneyModal
        isOpen={isFourStepsOpen}
        onClose={() => setIsFourStepsOpen(false)}
        onStartAdventure={() => {
          setIsFourStepsOpen(false);
          handleStartMystery('mystery-1');
        }}
      />
    </div>
  );
}
