import { INITIAL_MYSTERIES } from '../data/mysteries';
import { Mystery, MysteryAttempt, PlayerProgress } from '../types/mystery';

const CUSTOM_MYSTERIES_KEY = 'vikarna_custom_mysteries_v1';
const PROGRESS_KEY = 'vikarna_player_progress_v1';

const DEFAULT_PROGRESS: PlayerProgress = {
  completedMysteryIds: [],
  attempts: {},
  totalStars: 0,
  totalCluesFound: 0,
  totalQuestionsAsked: 0,
  evidenceDecisionsCount: 0,
};

export function getAllMysteries(): Mystery[] {
  if (typeof window === 'undefined') return INITIAL_MYSTERIES;
  try {
    const raw = localStorage.getItem(CUSTOM_MYSTERIES_KEY);
    const customList: Mystery[] = raw ? JSON.parse(raw) : [];
    // Combine initial and custom
    return [...INITIAL_MYSTERIES, ...customList];
  } catch {
    return INITIAL_MYSTERIES;
  }
}

export function getCustomMysteries(): Mystery[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CUSTOM_MYSTERIES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCustomMystery(mystery: Omit<Mystery, 'id' | 'order' | 'isCustom'>): Mystery {
  const existing = getCustomMysteries();
  const newId = `custom-mystery-${Date.now()}`;
  const newOrder = INITIAL_MYSTERIES.length + existing.length + 1;

  const fullMystery: Mystery = {
    ...mystery,
    id: newId,
    order: newOrder,
    isCustom: true,
  };

  const updated = [...existing, fullMystery];
  localStorage.setItem(CUSTOM_MYSTERIES_KEY, JSON.stringify(updated));
  return fullMystery;
}

export function updateCustomMystery(id: string, updatedFields: Partial<Mystery>): Mystery | null {
  const existing = getCustomMysteries();
  const idx = existing.findIndex((m) => m.id === id);
  if (idx === -1) return null;

  existing[idx] = { ...existing[idx], ...updatedFields };
  localStorage.setItem(CUSTOM_MYSTERIES_KEY, JSON.stringify(existing));
  return existing[idx];
}

export function deleteCustomMystery(id: string): boolean {
  const existing = getCustomMysteries();
  const filtered = existing.filter((m) => m.id !== id);
  localStorage.setItem(CUSTOM_MYSTERIES_KEY, JSON.stringify(filtered));
  return true;
}

export function getPlayerProgress(): PlayerProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function savePlayerProgress(progress: PlayerProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch {}
}

export function recordMysteryAttempt(attempt: MysteryAttempt): PlayerProgress {
  const progress = getPlayerProgress();
  const existingAttempt = progress.attempts[attempt.mysteryId];

  // Keep highest stars and union of clues
  const highestStars = existingAttempt ? Math.max(existingAttempt.stars, attempt.stars) : attempt.stars;
  const mergedClues = existingAttempt
    ? Array.from(new Set([...existingAttempt.cluesFoundIds, ...attempt.cluesFoundIds]))
    : attempt.cluesFoundIds;

  const updatedAttempt: MysteryAttempt = {
    ...attempt,
    stars: highestStars,
    cluesFoundIds: mergedClues,
  };

  const completedIds = new Set(progress.completedMysteryIds);
  if (attempt.completed) {
    completedIds.add(attempt.mysteryId);
  }

  const updatedAttempts = {
    ...progress.attempts,
    [attempt.mysteryId]: updatedAttempt,
  };

  // Recalculate totals
  let totalStars = 0;
  let totalClues = 0;
  let totalQuestions = 0;
  let evidenceDecisions = 0;

  Object.values(updatedAttempts).forEach((att) => {
    totalStars += att.stars;
    totalClues += att.cluesFoundIds.length;
    totalQuestions += att.askedWhyCount;
    if (att.completed && att.stars >= 4) {
      evidenceDecisions += 1;
    }
  });

  const newProgress: PlayerProgress = {
    completedMysteryIds: Array.from(completedIds),
    attempts: updatedAttempts,
    totalStars,
    totalCluesFound: totalClues,
    totalQuestionsAsked: totalQuestions,
    evidenceDecisionsCount: evidenceDecisions,
  };

  savePlayerProgress(newProgress);
  return newProgress;
}

export function resetPlayerProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(PROGRESS_KEY);
}

// Progressive hint generator that simulates intelligent contextual reasoning
export function getContextualHint(
  mystery: Mystery,
  cluesDiscoveredIds: string[],
  hintLevel: number // 1, 2, or 3
): { text: string; guidingQuestion: string; encouragement: string } {
  const keyClues = mystery.clues.filter((c) => c.importance === 'key');
  const undiscoveredKeyClues = keyClues.filter((c) => !cluesDiscoveredIds.includes(c.id));

  let text = '';
  let guidingQuestion = '';
  const encouragement =
    hintLevel === 1
      ? 'Great investigators start by noticing the quiet details!'
      : hintLevel === 2
      ? 'You are closing in! Think about how these parts fit together.'
      : 'Look at the whole picture. The physical evidence speaks for itself!';

  if (hintLevel === 1) {
    text = mystery.hints.hint1;
    guidingQuestion = mystery.questions[0] || 'What is our first real fact here?';
  } else if (hintLevel === 2) {
    if (undiscoveredKeyClues.length > 0) {
      text = `Notice that we haven't inspected everything yet. ${mystery.hints.hint2}`;
    } else {
      text = mystery.hints.hint2;
    }
    guidingQuestion = mystery.questions[1] || 'Does the initial gossip match what we saw?';
  } else {
    text = mystery.hints.hint3;
    guidingQuestion = mystery.questions[2] || 'What does the evidence prove beyond doubt?';
  }

  return { text, guidingQuestion, encouragement };
}
