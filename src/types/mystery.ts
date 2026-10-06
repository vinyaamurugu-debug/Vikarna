export interface Clue {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name or emoji
  category: 'physical' | 'environmental' | 'witness' | 'trail' | 'distractor' | 'supporting';
  importance: 'key' | 'supporting' | 'distractor';
  scenePosition: { x: number; y: number }; // Percentage 0 - 100
  details: string;
}

export interface DecisionOption {
  id: string;
  text: string;
  isCorrect: boolean;
  reasoningCategory: 'hasty_blame' | 'evidence_based' | 'random_assumption';
  feedback: string;
}

export interface Mystery {
  id: string;
  order: number;
  title: string;
  story: string;
  location: {
    name: string;
    icon: string;
    description: string;
    coordinates: { x: number; y: number }; // percentage on map
  };
  characters: {
    name: string;
    role: string;
    quote?: string;
  }[];
  initialAssumption: string;
  vikarnaPrompt: string;
  clues: Clue[];
  questions: string[];
  hints: {
    hint1: string;
    hint2: string;
    hint3: string;
  };
  decisions: DecisionOption[];
  solutionSummary: string;
  lesson: string;
  sceneBackdrop?: string;
  isCustom?: boolean;
  difficulty: 'Beginner' | 'Investigator' | 'Master Sleuth';
}

export interface MysteryAttempt {
  mysteryId: string;
  completed: boolean;
  stars: number;
  cluesFoundIds: string[];
  askedWhyCount: number;
  hintsUsedCount: number;
  chosenDecisionId: string | null;
  timestamp: number;
}

export interface PlayerProgress {
  completedMysteryIds: string[];
  attempts: Record<string, MysteryAttempt>;
  totalStars: number;
  totalCluesFound: number;
  totalQuestionsAsked: number;
  evidenceDecisionsCount: number;
}
