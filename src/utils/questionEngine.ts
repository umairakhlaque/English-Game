import { WordEntry, Question, QuestionType } from '../types';
import { wordData } from '../data/words';

let questionIdCounter = 0;
const nextId = () => `q_${++questionIdCounter}_${Date.now()}`;

const shuffle = <T>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

const scrambleWord = (word: string): string[] => {
  const letters = word.split('');
  let scrambled = shuffle(letters);
  // Ensure it's actually different from the original for words > 2 chars
  let attempts = 0;
  while (scrambled.join('') === word && word.length > 2 && attempts < 20) {
    scrambled = shuffle(letters);
    attempts++;
  }
  return scrambled;
};

const getDistractors = (correctWord: WordEntry, count: number, allWords: WordEntry[]): WordEntry[] => {
  const sameYear = allWords.filter(
    (w) => w.yearBand === correctWord.yearBand && w.word !== correctWord.word
  );
  const pool =
    sameYear.length >= count
      ? sameYear
      : allWords.filter((w) => w.word !== correctWord.word);
  return shuffle(pool).slice(0, count);
};

const clozeTemplates = [
  (word: string, def: string) => ({
    sentence: `The traveller needed to _____ the ancient scroll. It means: "${def}".`,
    prompt: `Fill in the blank: The traveller needed to _____ the ancient scroll.`,
  }),
  (word: string, def: string) => ({
    sentence: `In the land of Linguara, the word "_____ " means ${def}.`,
    prompt: `Which word means: "${def}"?`,
  }),
  (word: string, def: string) => ({
    sentence: `Lex wrote the word _____ in the magic book. It means ${def}.`,
    prompt: `Which word means: "${def}"?`,
  }),
  (word: string, def: string) => ({
    sentence: `Buzzy said, "This word, _____, is very important! It means ${def}."`,
    prompt: `What word did Buzzy say?`,
  }),
];

export function generateClozeQuestion(wordEntry: WordEntry, allWords: WordEntry[]): Question {
  const template = clozeTemplates[Math.floor(Math.random() * clozeTemplates.length)];
  const { prompt } = template(wordEntry.word, wordEntry.definition);
  const distractors = getDistractors(wordEntry, 2, allWords);
  const options = shuffle([wordEntry.word, ...distractors.map((d) => d.word)]);

  return {
    id: nextId(),
    type: 'cloze',
    word: wordEntry.word,
    sentence: wordEntry.exampleSentence.replace(
      new RegExp(`\\b${wordEntry.word}\\b`, 'i'),
      '_____'
    ),
    options,
    correctAnswer: wordEntry.word,
    hint: `Think about: ${wordEntry.definition}`,
    buzzySays: `Psst! This word means "${wordEntry.definition}". Look at the example: "${wordEntry.exampleSentence}"`,
    wordEntry,
  };
}

export function generateMultipleChoiceQuestion(wordEntry: WordEntry, allWords: WordEntry[]): Question {
  const distractors = getDistractors(wordEntry, 2, allWords);

  // Randomly pick: "which word means X" or "what does X mean"
  const isDefinitionQuestion = Math.random() > 0.5;

  let prompt: string;
  let options: string[];
  let correctAnswer: string;

  if (isDefinitionQuestion) {
    prompt = `What does the word "${wordEntry.word}" mean?`;
    options = shuffle([wordEntry.definition, ...distractors.map((d) => d.definition)]);
    correctAnswer = wordEntry.definition;
  } else {
    prompt = `Which word means: "${wordEntry.definition}"?`;
    options = shuffle([wordEntry.word, ...distractors.map((d) => d.word)]);
    correctAnswer = wordEntry.word;
  }

  return {
    id: nextId(),
    type: 'multipleChoice',
    word: wordEntry.word,
    options,
    correctAnswer,
    hint: `The word "${wordEntry.word}" ${isDefinitionQuestion ? 'is about' : 'means'} ${wordEntry.definition}`,
    buzzySays: `Here is a clue: ${wordEntry.emoji} ${wordEntry.word} — "${wordEntry.definition}"`,
    wordEntry,
  };
}

export function generateWordScrambleQuestion(wordEntry: WordEntry, _allWords: WordEntry[]): Question {
  const scrambled = scrambleWord(wordEntry.word);

  return {
    id: nextId(),
    type: 'wordScramble',
    word: wordEntry.word,
    scrambled,
    options: [wordEntry.word],
    correctAnswer: wordEntry.word,
    hint: `The word has ${wordEntry.word.length} letters and means: ${wordEntry.definition}`,
    buzzySays: `Unscramble these letters to make a word! Clue: it means "${wordEntry.definition}" ${wordEntry.emoji}`,
    wordEntry,
  };
}

export function generateSentenceBuilderQuestion(wordEntry: WordEntry, _allWords: WordEntry[]): Question {
  const sentence = wordEntry.exampleSentence;
  const words = sentence.replace(/[.!?]$/, '').split(' ');
  const shuffled = shuffle(words);

  return {
    id: nextId(),
    type: 'sentenceBuilder',
    word: wordEntry.word,
    sentenceWords: shuffled,
    options: words, // correct order
    correctAnswer: words.join(' '),
    hint: `The sentence uses the word "${wordEntry.word}". Build it from beginning to end.`,
    buzzySays: `Put the words in the right order to make a proper sentence about "${wordEntry.word}"!`,
    wordEntry,
  };
}

export function generateQuestion(
  wordEntry: WordEntry,
  allWords: WordEntry[],
  preferredType?: QuestionType,
  accuracy?: number
): Question {
  // Adapt difficulty
  let type: QuestionType;

  if (preferredType && preferredType !== 'storyTwist') {
    type = preferredType;
  } else if (accuracy !== undefined && accuracy < 0.6) {
    // Struggling: use multiple choice (easiest)
    type = 'multipleChoice';
  } else if (accuracy !== undefined && accuracy > 0.8) {
    // Excelling: use harder types
    const harder: QuestionType[] = ['wordScramble', 'sentenceBuilder', 'cloze'];
    type = harder[Math.floor(Math.random() * harder.length)];
  } else {
    const types: QuestionType[] = ['cloze', 'multipleChoice', 'wordScramble', 'sentenceBuilder'];
    type = types[Math.floor(Math.random() * types.length)];
  }

  switch (type) {
    case 'cloze':
      return generateClozeQuestion(wordEntry, allWords);
    case 'multipleChoice':
      return generateMultipleChoiceQuestion(wordEntry, allWords);
    case 'wordScramble':
      return generateWordScrambleQuestion(wordEntry, allWords);
    case 'sentenceBuilder':
      return generateSentenceBuilderQuestion(wordEntry, allWords);
    default:
      return generateMultipleChoiceQuestion(wordEntry, allWords);
  }
}

export function generateQuestionsForChapter(
  targetWords: string[],
  questionsNeeded: number,
  accuracy?: number
): Question[] {
  const wordEntries = targetWords
    .map((w) => wordData.find((entry) => entry.word === w))
    .filter((w): w is WordEntry => w !== undefined);

  if (wordEntries.length === 0) return [];

  const questions: Question[] = [];
  const types: QuestionType[] = ['cloze', 'multipleChoice', 'wordScramble', 'sentenceBuilder'];

  for (let i = 0; i < questionsNeeded; i++) {
    const wordEntry = wordEntries[i % wordEntries.length];
    const type = types[i % types.length];
    questions.push(generateQuestion(wordEntry, wordData, type, accuracy));
  }

  return questions;
}
