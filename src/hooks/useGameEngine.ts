import { useCallback } from 'react';
import { useGameStore } from '../store/gameStore';

export function useGameEngine() {
  const store = useGameStore();

  const speakText = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = 0.85;
    utt.pitch = 1.1;
    window.speechSynthesis.speak(utt);
  }, []);

  const handleAnswerSubmit = useCallback(
    (answer: string) => {
      store.submitAnswer(answer);
    },
    [store]
  );

  const handleNextAfterResult = useCallback(() => {
    const { currentAnswerResult, battleAnimating } = store;
    if (battleAnimating) return; // wait for animation
    if (currentAnswerResult === 'correct') {
      store.setScreen('battle');
    } else {
      store.clearAnswerResult();
    }
  }, [store]);

  const handleBattleComplete = useCallback(() => {
    store.setBattleAnimating(false);
    store.nextQuestion();
  }, [store]);

  const handleStartChapter = useCallback(
    (chapterId: number) => {
      store.startChapter(chapterId);
      store.setScreen('story');
    },
    [store]
  );

  const handleContinueFromStory = useCallback(() => {
    store.setScreen('challenge');
  }, [store]);

  const handleNextChapter = useCallback(() => {
    const next = store.currentChapterId + 1;
    if (next <= 5) {
      handleStartChapter(next);
    } else {
      store.setScreen('map');
    }
  }, [store, handleStartChapter]);

  const currentQuestion =
    store.currentQuestions[store.currentQuestionIndex] ?? null;

  const isChapterComplete =
    store.currentQuestionIndex >= store.currentQuestions.length - 1 &&
    store.currentAnswerResult === 'correct';

  const accuracy =
    store.chapterSessionTotal > 0
      ? store.chapterSessionCorrect / store.chapterSessionTotal
      : 1;

  return {
    ...store,
    currentQuestion,
    isChapterComplete,
    accuracy,
    speakText,
    handleAnswerSubmit,
    handleNextAfterResult,
    handleBattleComplete,
    handleStartChapter,
    handleContinueFromStory,
    handleNextChapter,
  };
}
