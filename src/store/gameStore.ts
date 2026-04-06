import { create } from 'zustand';
import { Screen, YearBand, Question, DictionaryEntry, LevelProgress, GameStats } from '../types';
import { storyChapters } from '../data/story';
import { generateQuestionsForChapter } from '../utils/questionEngine';
import { wordData } from '../data/words';

interface GameState {
  // Navigation
  currentScreen: Screen;
  currentChapterId: number;
  currentQuestionIndex: number;

  // Player
  playerName: string;
  yearBand: YearBand;

  // Scoring
  wordCoins: number;
  score: number;
  streakDays: number;
  lastStreakDate: string;

  // Current battle session
  currentQuestions: Question[];
  currentAnswerResult: 'correct' | 'wrong' | null;
  currentChosenAnswer: string;
  showBuzzyHint: boolean;
  battleAnimating: boolean;
  chapterSessionCorrect: number;
  chapterSessionTotal: number;
  chapterStars: number;

  // Progress
  levelProgress: Record<number, LevelProgress>;
  dictionary: DictionaryEntry[];
  knownWords: Set<string>;

  // Stats
  stats: GameStats;

  // Unlocks
  unlockedCostumes: string[];
  currentCostume: string;

  // Actions
  setScreen: (screen: Screen) => void;
  setPlayerName: (name: string) => void;
  setYearBand: (year: YearBand) => void;
  startChapter: (chapterId: number) => void;
  nextQuestion: () => void;
  submitAnswer: (answer: string) => void;
  clearAnswerResult: () => void;
  toggleBuzzyHint: () => void;
  setBattleAnimating: (val: boolean) => void;
  completeChapter: () => void;
  addWordToDictionary: (word: string) => void;
  resetCurrentSession: () => void;
  loadFromStorage: () => void;
  saveToStorage: () => void;
  updateStats: (correct: boolean) => void;
}

const STORAGE_KEY = 'wordquest_save';

const defaultStats: GameStats = {
  totalQuestionsAnswered: 0,
  totalCorrect: 0,
  totalWordsLearned: 0,
  totalTimePlayed: 0,
  sessionStartTime: Date.now(),
};

export const useGameStore = create<GameState>((set, get) => ({
  currentScreen: 'home',
  currentChapterId: 1,
  currentQuestionIndex: 0,
  playerName: '',
  yearBand: 2,
  wordCoins: 0,
  score: 0,
  streakDays: 1,
  lastStreakDate: '',
  currentQuestions: [],
  currentAnswerResult: null,
  currentChosenAnswer: '',
  showBuzzyHint: false,
  battleAnimating: false,
  chapterSessionCorrect: 0,
  chapterSessionTotal: 0,
  chapterStars: 0,
  levelProgress: {},
  dictionary: [],
  knownWords: new Set(),
  stats: defaultStats,
  unlockedCostumes: ['default'],
  currentCostume: 'default',

  setScreen: (screen) => {
    set({ currentScreen: screen });
    get().saveToStorage();
  },

  setPlayerName: (name) => set({ playerName: name }),

  setYearBand: (year) => set({ yearBand: year }),

  startChapter: (chapterId) => {
    const chapter = storyChapters.find((c) => c.id === chapterId);
    if (!chapter) return;

    const accuracy = get().stats.totalQuestionsAnswered > 0
      ? get().stats.totalCorrect / get().stats.totalQuestionsAnswered
      : 0.7;

    const questions = generateQuestionsForChapter(chapter.targetWords, 5, accuracy);

    set({
      currentChapterId: chapterId,
      currentQuestions: questions,
      currentQuestionIndex: 0,
      currentAnswerResult: null,
      currentChosenAnswer: '',
      showBuzzyHint: false,
      battleAnimating: false,
      chapterSessionCorrect: 0,
      chapterSessionTotal: 0,
      chapterStars: 0,
    });
  },

  nextQuestion: () => {
    const { currentQuestionIndex, currentQuestions } = get();
    if (currentQuestionIndex < currentQuestions.length - 1) {
      set({
        currentQuestionIndex: currentQuestionIndex + 1,
        currentAnswerResult: null,
        currentChosenAnswer: '',
        showBuzzyHint: false,
        battleAnimating: false,
      });
      get().setScreen('challenge');
    } else {
      get().completeChapter();
    }
  },

  submitAnswer: (answer) => {
    const { currentQuestions, currentQuestionIndex } = get();
    const question = currentQuestions[currentQuestionIndex];
    if (!question) return;

    const isCorrect = answer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();

    set({
      currentAnswerResult: isCorrect ? 'correct' : 'wrong',
      currentChosenAnswer: answer,
      chapterSessionTotal: get().chapterSessionTotal + 1,
      chapterSessionCorrect: isCorrect ? get().chapterSessionCorrect + 1 : get().chapterSessionCorrect,
    });

    get().updateStats(isCorrect);

    if (isCorrect) {
      set({
        wordCoins: get().wordCoins + 10,
        score: get().score + 10,
        battleAnimating: true,
      });
      get().addWordToDictionary(question.word);
    }
  },

  clearAnswerResult: () => {
    set({ currentAnswerResult: null, currentChosenAnswer: '' });
  },

  toggleBuzzyHint: () => {
    set((state) => ({ showBuzzyHint: !state.showBuzzyHint }));
  },

  setBattleAnimating: (val) => set({ battleAnimating: val }),

  completeChapter: () => {
    const { chapterSessionCorrect, chapterSessionTotal, currentChapterId, levelProgress } = get();
    const accuracy = chapterSessionTotal > 0 ? chapterSessionCorrect / chapterSessionTotal : 0;

    let stars = 1;
    if (accuracy >= 0.9) stars = 3;
    else if (accuracy >= 0.7) stars = 2;

    const existing = levelProgress[currentChapterId];
    const newProgress: LevelProgress = {
      chapterId: currentChapterId,
      stars: Math.max(stars, existing?.stars ?? 0),
      completed: true,
      accuracy,
    };

    set({
      levelProgress: { ...levelProgress, [currentChapterId]: newProgress },
      chapterStars: stars,
    });

    get().setScreen('victory');
    get().saveToStorage();
  },

  addWordToDictionary: (word) => {
    const { dictionary, currentChapterId } = get();
    const wordEntry = wordData.find((w: { word: string }) => w.word === word);
    if (!wordEntry) return;

    const alreadyExists = dictionary.some((d) => d.word === word);
    if (alreadyExists) return;

    const newEntry: DictionaryEntry = {
      word: wordEntry.word,
      definition: wordEntry.definition,
      emoji: wordEntry.emoji,
      yearBand: wordEntry.yearBand,
      learnedAt: currentChapterId,
      exampleSentence: wordEntry.exampleSentence,
    };

    const newKnown = new Set(get().knownWords);
    newKnown.add(word);

    set({
      dictionary: [...dictionary, newEntry],
      knownWords: newKnown,
    });
  },

  resetCurrentSession: () => {
    set({
      currentAnswerResult: null,
      currentChosenAnswer: '',
      showBuzzyHint: false,
      battleAnimating: false,
      chapterSessionCorrect: 0,
      chapterSessionTotal: 0,
    });
  },

  updateStats: (correct: boolean) => {
    const stats = get().stats;
    set({
      stats: {
        ...stats,
        totalQuestionsAnswered: stats.totalQuestionsAnswered + 1,
        totalCorrect: correct ? stats.totalCorrect + 1 : stats.totalCorrect,
      },
    });
  },

  loadFromStorage: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);

      // Update streak
      const today = new Date().toDateString();
      let streakDays = saved.streakDays ?? 1;
      if (saved.lastStreakDate) {
        const last = new Date(saved.lastStreakDate);
        const diff = Math.floor((Date.now() - last.getTime()) / 86400000);
        if (diff === 1) streakDays += 1;
        else if (diff > 1) streakDays = 1;
      }

      set({
        playerName: saved.playerName ?? '',
        yearBand: saved.yearBand ?? 2,
        wordCoins: saved.wordCoins ?? 0,
        score: saved.score ?? 0,
        streakDays,
        lastStreakDate: today,
        levelProgress: saved.levelProgress ?? {},
        dictionary: saved.dictionary ?? [],
        knownWords: new Set(saved.knownWords ?? []),
        stats: { ...(saved.stats ?? defaultStats), sessionStartTime: Date.now() },
        unlockedCostumes: saved.unlockedCostumes ?? ['default'],
        currentCostume: saved.currentCostume ?? 'default',
      });
    } catch {
      // ignore corrupt storage
    }
  },

  saveToStorage: () => {
    const state = get();
    const toSave = {
      playerName: state.playerName,
      yearBand: state.yearBand,
      wordCoins: state.wordCoins,
      score: state.score,
      streakDays: state.streakDays,
      lastStreakDate: state.lastStreakDate,
      levelProgress: state.levelProgress,
      dictionary: state.dictionary,
      knownWords: Array.from(state.knownWords),
      stats: state.stats,
      unlockedCostumes: state.unlockedCostumes,
      currentCostume: state.currentCostume,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  },
}));
