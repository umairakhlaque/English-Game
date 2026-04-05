export type Screen =
  | 'home'
  | 'map'
  | 'story'
  | 'challenge'
  | 'battle'
  | 'victory'
  | 'dictionary'
  | 'parentDashboard';

export type YearBand = 1 | 2 | 3 | 4 | 5;

export type QuestionType =
  | 'cloze'
  | 'multipleChoice'
  | 'wordScramble'
  | 'sentenceBuilder'
  | 'storyTwist';

export interface WordEntry {
  word: string;
  definition: string;
  emoji: string;
  yearBand: YearBand;
  exampleSentence: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  word: string;
  sentence?: string;
  scrambled?: string[];
  sentenceWords?: string[];
  options: string[];
  correctAnswer: string;
  hint: string;
  buzzySays: string;
  wordEntry: WordEntry;
}

export interface StoryTwistOption {
  text: string;
  consequence: string;
  emoji: string;
}

export interface StoryChapter {
  id: number;
  title: string;
  world: string;
  emoji: string;
  backgroundGradient: string;
  storyText: string;
  targetWords: string[];
  minionName: string;
  minionEmoji: string;
  buzzyCommentary: string;
  bossName: string;
  bossEmoji: string;
  storyTwist: {
    prompt: string;
    options: StoryTwistOption[];
  };
}

export interface LevelProgress {
  chapterId: number;
  stars: number;
  completed: boolean;
  accuracy: number;
}

export interface DictionaryEntry {
  word: string;
  definition: string;
  emoji: string;
  yearBand: YearBand;
  learnedAt: number;
  exampleSentence: string;
}

export interface GameStats {
  totalQuestionsAnswered: number;
  totalCorrect: number;
  totalWordsLearned: number;
  totalTimePlayed: number;
  sessionStartTime: number;
}
