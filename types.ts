export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  BUILD_CITATION = 'BUILD_CITATION',
  SIMULATION = 'SIMULATION', // New Immersive Editor Mode
}

export interface SimulationToken {
  id: string;
  display: string; // The initial text displayed (often incorrect)
  options: string[]; // Options the user can switch this token to
  correct: string; // The correct text required to pass
  isLocked?: boolean; // If true, this part of the citation is immutable/correct
}

export interface Question {
  id: string;
  type: QuestionType;
  prompt: string;
  // For Multiple Choice
  options?: string[];
  correctOptionIndex?: number;
  // For Build Citation
  citationSegments?: string[]; 
  distractorSegments?: string[];
  // For Simulation
  caseFile?: {
    title: string;
    court: string;
    date: string;
    source: string; // Reporter or Docket
    history?: string; // Subsequent history info
    facts: string;
  };
  simulationTokens?: SimulationToken[];
  
  // Common
  explanation: string;
  ruleReference?: string;
}

export interface Level {
  id: string;
  title: string;
  description: string;
  icon: string;
  requiredXp: number;
  questions: Question[];
  color: string;
}

export interface UserState {
  currentLevelIndex: number;
  xp: number;
  completedLevels: string[];
  rank: string;
}

export const RANKS = [
  { name: 'Candidate', minXp: 0 },
  { name: 'Junior Associate', minXp: 500 },
  { name: 'Senior Associate', minXp: 1200 },
  { name: 'Junior Partner', minXp: 2500 },
  { name: 'Managing Partner', minXp: 4000 },
  { name: 'Citation Master', minXp: 6000 },
];