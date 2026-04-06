import { WordEntry, Question, QuestionType, YearBand } from '../types';
import { wordData } from '../data/words';

let questionIdCounter = 0;
const nextId = () => `q_${++questionIdCounter}_${Date.now()}`;

const shuffle = <T>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

const scrambleWord = (word: string): string[] => {
  const letters = word.split('');
  let scrambled = shuffle(letters);
  let attempts = 0;
  while (scrambled.join('') === word && word.length > 2 && attempts < 20) {
    scrambled = shuffle(letters);
    attempts++;
  }
  return scrambled;
};

/**
 * Get plausible distractors: same year band, similar length and start letter preferred.
 */
const getDistractors = (correctWord: WordEntry, count: number, allWords: WordEntry[]): WordEntry[] => {
  const pool = allWords.filter((w) => w.word !== correctWord.word);

  // Score by similarity (same year = +3, similar length ±2 = +2, same start letter = +2)
  const scored = pool.map((w) => {
    let score = Math.random(); // base noise
    if (w.yearBand === correctWord.yearBand) score += 3;
    if (Math.abs(w.word.length - correctWord.word.length) <= 2) score += 2;
    if (w.word[0].toLowerCase() === correctWord.word[0].toLowerCase()) score += 2;
    return { w, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, count).map((s) => s.w);
};

const clozeTemplates = [
  (_word: string, _def: string, example: string) => ({
    sentence: example.replace(
      new RegExp(`\\b${_word}\\b`, 'gi'),
      '_____'
    ),
    prompt: `Fill in the blank:`,
  }),
  (_word: string, def: string) => ({
    sentence: `In the land of Linguara, a word that means "${def}" is: _____`,
    prompt: `Which word fits?`,
  }),
  (_word: string, def: string) => ({
    sentence: `Buzzy says: "I know a word! It means '${def}'. The word is: _____ "`,
    prompt: `What word is Buzzy thinking of?`,
  }),
];

export function generateClozeQuestion(wordEntry: WordEntry, allWords: WordEntry[]): Question {
  const tmpl = clozeTemplates[Math.floor(Math.random() * clozeTemplates.length)];
  const { sentence, prompt } = tmpl(wordEntry.word, wordEntry.definition, wordEntry.exampleSentence);
  const distractors = getDistractors(wordEntry, 2, allWords);
  const options = shuffle([wordEntry.word, ...distractors.map((d) => d.word)]);

  return {
    id: nextId(),
    type: 'cloze',
    word: wordEntry.word,
    sentence,
    options,
    correctAnswer: wordEntry.word,
    hint: `Think about the meaning: "${wordEntry.definition}" 🤔`,
    buzzySays: `Psst! The missing word means "${wordEntry.definition}". It starts with the letter "${wordEntry.word[0].toUpperCase()}"! 🐛`,
    wordEntry,
  };
}

export function generateMultipleChoiceQuestion(wordEntry: WordEntry, allWords: WordEntry[]): Question {
  const distractors = getDistractors(wordEntry, 2, allWords);
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
    hint: isDefinitionQuestion
      ? `Think about: "${wordEntry.definition}" 💡`
      : `It starts with "${wordEntry.word[0].toUpperCase()}" and has ${wordEntry.word.length} letters! 💡`,
    buzzySays: isDefinitionQuestion
      ? `Buzzy says: look carefully at the word and think what it means! The definition has something to do with: "${wordEntry.definition.split(' ').slice(0, 3).join(' ')}..." 🐛`
      : `Buzzy says: the answer starts with "${wordEntry.word[0].toUpperCase()}" and has ${wordEntry.word.length} letters! 🐛`,
    wordEntry,
  };
}

export function generateWordScrambleQuestion(wordEntry: WordEntry, allWords: WordEntry[]): Question {
  const scrambled = scrambleWord(wordEntry.word);
  const distractors = getDistractors(wordEntry, 2, allWords);
  const options = shuffle([wordEntry.word, ...distractors.map((d) => d.word)]);

  return {
    id: nextId(),
    type: 'wordScramble',
    word: wordEntry.word,
    scrambled,
    options,
    correctAnswer: wordEntry.word,
    hint: `The word has ${wordEntry.word.length} letters and means: "${wordEntry.definition}" 🔤`,
    buzzySays: `Buzzy says: rearrange the letters to spell a word that means "${wordEntry.definition}"! First letter is "${wordEntry.word[0].toUpperCase()}" 🐛`,
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
    options: words,
    correctAnswer: words.join(' '),
    hint: `Put the words in the right order to make a proper sentence! 📝`,
    buzzySays: `Buzzy says: start with who or what the sentence is about, then what they do! You can do it! 🐛`,
    wordEntry,
  };
}

/**
 * Generate a question adapted for a given year band and accuracy level.
 * Year 1–2: multiple choice / cloze only (simpler)
 * Year 3–4: all types
 * Year 5: prefer harder types
 */
export function generateQuestion(
  wordEntry: WordEntry,
  allWords: WordEntry[],
  preferredType?: QuestionType,
  accuracy?: number,
  yearBand?: YearBand
): Question {
  let type: QuestionType;

  if (preferredType && preferredType !== 'storyTwist') {
    type = preferredType;
  } else {
    const year = yearBand ?? wordEntry.yearBand;
    if (year <= 2) {
      // Simple: only multiple choice or cloze
      type = Math.random() > 0.5 ? 'multipleChoice' : 'cloze';
    } else if (year >= 5) {
      // Complex: prefer harder types
      if (accuracy !== undefined && accuracy > 0.8) {
        const harder: QuestionType[] = ['wordScramble', 'sentenceBuilder', 'cloze'];
        type = harder[Math.floor(Math.random() * harder.length)];
      } else {
        const all: QuestionType[] = ['cloze', 'multipleChoice', 'wordScramble', 'sentenceBuilder'];
        type = all[Math.floor(Math.random() * all.length)];
      }
    } else {
      // Year 3–4: adapt by accuracy
      if (accuracy !== undefined && accuracy < 0.6) {
        type = 'multipleChoice'; // Struggling — give easier
      } else if (accuracy !== undefined && accuracy > 0.8) {
        const harder: QuestionType[] = ['wordScramble', 'sentenceBuilder', 'cloze'];
        type = harder[Math.floor(Math.random() * harder.length)];
      } else {
        const types: QuestionType[] = ['cloze', 'multipleChoice', 'wordScramble', 'sentenceBuilder'];
        type = types[Math.floor(Math.random() * types.length)];
      }
    }
  }

  switch (type) {
    case 'cloze':          return generateClozeQuestion(wordEntry, allWords);
    case 'multipleChoice': return generateMultipleChoiceQuestion(wordEntry, allWords);
    case 'wordScramble':   return generateWordScrambleQuestion(wordEntry, allWords);
    case 'sentenceBuilder':return generateSentenceBuilderQuestion(wordEntry, allWords);
    default:               return generateMultipleChoiceQuestion(wordEntry, allWords);
  }
}

/**
 * Generate questions for a chapter, adapting to accuracy and year band.
 * Never repeats words until all target words are used.
 */
export function generateQuestionsForChapter(
  targetWords: string[],
  questionsNeeded: number,
  accuracy?: number,
  yearBand?: YearBand
): Question[] {
  const wordEntries = targetWords
    .map((w) => wordData.find((entry) => entry.word === w))
    .filter((w): w is WordEntry => w !== undefined);

  if (wordEntries.length === 0) return [];

  const questions: Question[] = [];
  const types: QuestionType[] = ['cloze', 'multipleChoice', 'wordScramble', 'sentenceBuilder'];

  // Shuffle so we don't always ask about the same words first
  const shuffledEntries = shuffle(wordEntries);

  for (let i = 0; i < questionsNeeded; i++) {
    const wordEntry = shuffledEntries[i % shuffledEntries.length];
    const type = types[i % types.length];
    questions.push(generateQuestion(wordEntry, wordData, type, accuracy, yearBand));
  }

  return questions;
}
