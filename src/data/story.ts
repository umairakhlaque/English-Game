import { StoryChapter } from '../types';

export const storyChapters: StoryChapter[] = [
  {
    id: 1,
    title: 'Forest of First Words',
    world: 'The Whispering Woods',
    emoji: '🌲',
    backgroundGradient: 'linear-gradient(135deg, #10B981 0%, #047857 50%, #065F46 100%)',
    storyText:
      'Young Lex stepped into the magical land of Linguara. The trees had faces and whispered ancient words. But something was wrong — the leaves were falling as scrambled, jumbled letters! Buzzy the bookworm flew down. "The Shadow Scrambler has stolen the first scrolls!" Buzzy cried. "We must restore the words to save the forest!" A Confusion Minion leapt out from behind a mossy rock, waving tangled letter vines. Lex gripped the glowing book-sword and prepared to battle!',
    targetWords: ['friend', 'school', 'love', 'come', 'some', 'house', 'beautiful', 'because', 'every', 'great'],
    minionName: 'Wobbly',
    minionEmoji: '👺',
    buzzyCommentary: 'Use your word power! Every correct answer makes the Shadow Scrambler weaker!',
    bossName: 'Tangle-Vine Thug',
    bossEmoji: '🌿',
    storyTwist: {
      prompt: 'You have restored the first word scroll! Now Wobbly the Minion starts to cry…',
      options: [
        {
          text: 'Give the minion a hug',
          consequence: 'Wobbly bursts into confetti and leaves behind a golden coin!',
          emoji: '🤗',
        },
        {
          text: 'Teach the minion a word',
          consequence: 'Wobbly learns the word "friend" and becomes your ally!',
          emoji: '📚',
        },
        {
          text: 'Do a victory dance',
          consequence: 'Your dance is so funny that Wobbly falls over laughing and drops a treasure!',
          emoji: '💃',
        },
      ],
    },
  },
  {
    id: 2,
    title: 'Castle of Sentences',
    world: 'Sentence Stronghold',
    emoji: '🏰',
    backgroundGradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 50%, #1E3A8A 100%)',
    storyText:
      'Lex arrived at the ancient Castle of Sentences, where stone walls were covered in scrambled carvings. Two Confusion Minions named Bloop and Snarl were playing catch — but instead of a ball, they were throwing mixed-up sentence pieces! "Those sentences are from the second scroll!" Buzzy exclaimed. Lex watched as beautiful words tumbled through the air in completely the wrong order. The drawbridge could only be lowered by correctly arranging the magic words. Lex took a deep breath and raised the book-sword!',
    targetWords: ['beautiful', 'because', 'people', 'every', 'great', 'water', 'again', 'money', 'could', 'would'],
    minionName: 'Bloop',
    minionEmoji: '🟣',
    buzzyCommentary: 'Think carefully about the order of words. A sentence must make sense from start to finish!',
    bossName: 'Sentence Smasher',
    bossEmoji: '🏯',
    storyTwist: {
      prompt: 'The drawbridge crashes open and Bloop and Snarl slide down it like a slide!',
      options: [
        {
          text: 'Slide down too!',
          consequence: 'Wheee! You land in a pile of golden word-coins!',
          emoji: '🛝',
        },
        {
          text: 'Walk in with dignity',
          consequence: 'A royal trumpet fanfare plays. Everyone bows to the hero!',
          emoji: '🎺',
        },
        {
          text: 'Cartwheel inside',
          consequence: 'Buzzy tries to cartwheel too and gets dizzy for the whole next level!',
          emoji: '🤸',
        },
      ],
    },
  },
  {
    id: 3,
    title: 'Mountain of Magic Grammar',
    world: 'The Rumbling Peaks',
    emoji: '⛰️',
    backgroundGradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #92400E 100%)',
    storyText:
      'The path led up the Mountain of Magic Grammar, where every step made a different vowel sound. Three Confusion Minions — Grumble, Fumble, and Tumble — were rolling boulders made of scrambled words down the slope! "These boulders are crushing the grammar scrolls!" Buzzy warned. Lex dodged a boulder made entirely of the word "because" spelled backwards. Up ahead, the mountain peak crackled with electricity spelling out wrong sentences. Lex needed to use the power of correct grammar to defuse each crackling word-boulder!',
    targetWords: ['separate', 'different', 'special', 'surprise', 'imagine', 'believe', 'possible', 'forward', 'strength', 'through'],
    minionName: 'Grumble',
    minionEmoji: '😤',
    buzzyCommentary: 'Some words are tricky to spell! Look for patterns — "separate" has "a rat" inside it!',
    bossName: 'Boulder Blaster',
    bossEmoji: '🪨',
    storyTwist: {
      prompt: 'You have cleared all the word-boulders! Grumble, Fumble and Tumble are now stuck on the mountaintop.',
      options: [
        {
          text: 'Send them a rope',
          consequence: 'They shimmy down and bring you a treasure chest full of star-coins!',
          emoji: '🪢',
        },
        {
          text: 'Teach them grammar',
          consequence: 'They become Grammar Guards and protect the scrolls forever!',
          emoji: '🎓',
        },
        {
          text: 'Call for a dragon taxi',
          consequence: 'A tiny pocket dragon arrives! It carries the minions AND Lex to the next world!',
          emoji: '🐉',
        },
      ],
    },
  },
  {
    id: 4,
    title: "Dragon's Dictionary",
    world: 'The Library of Scales',
    emoji: '🐉',
    backgroundGradient: 'linear-gradient(135deg, #EC4899 0%, #BE185D 50%, #831843 100%)',
    storyText:
      "Deep in the Library of Scales lived Wordo, the ancient Word Dragon. But Wordo was in terrible confusion — the Shadow Scrambler had mixed up all the dragon's precious dictionary pages! Words and their meanings were completely separated. Wordo couldn't remember what anything meant and was accidentally breathing fire when trying to say \"hello\"! Buzzy rushed to help. \"We need to match each word to its definition, Lex!\" Four Confusion Minions dressed as librarians were running about with armfuls of mixed-up pages. The Dragon needed Lex's help urgently!",
    targetWords: ['dictionary', 'knowledge', 'language', 'describe', 'explain', 'excellent', 'environment', 'necessary', 'recognise', 'recommend'],
    minionName: 'Scribbly',
    minionEmoji: '📝',
    buzzyCommentary: 'A dictionary is your best friend! When in doubt, think about what the word sounds like.',
    bossName: 'Definition Destroyer',
    bossEmoji: '📚',
    storyTwist: {
      prompt: "Wordo the Dragon is so happy you helped! The dragon offers you a gift.",
      options: [
        {
          text: 'A ride on Wordo\'s back',
          consequence: 'You soar over all of Linguara and spot a shortcut to the final level!',
          emoji: '🦅',
        },
        {
          text: 'A flame-grilled sandwich',
          consequence: 'It is the most delicious thing you have ever tasted. +20 energy coins!',
          emoji: '🥪',
        },
        {
          text: 'A dictionary scale',
          consequence: 'The magical scale can look up any word. It joins your inventory!',
          emoji: '🐾',
        },
      ],
    },
  },
  {
    id: 5,
    title: "Scrambler's Lair",
    world: 'The Dark Tower of Muddle',
    emoji: '🏚️',
    backgroundGradient: 'linear-gradient(135deg, #7C3AED 0%, #4C1D95 50%, #2D1B69 100%)',
    storyText:
      "At last! Lex stood before the Dark Tower of Muddle — home of the Shadow Scrambler! The tower was built entirely from scrambled words and broken sentences. The evil Shadow Scrambler appeared on a balcony, surrounded by stolen story scrolls. \"You cannot restore the scrolls!\" the Scrambler cackled. \"English is too difficult! Give up now!\" But Lex thought of every word learned on this journey. Of Buzzy's hints, of the Dragon's wisdom, of all the Minions who'd been changed by the power of words. Lex gripped the glowing book-sword tightly. This was the final battle!",
    targetWords: ['determined', 'competition', 'knowledge', 'strength', 'important', 'sufficient', 'marvellous', 'excellent', 'special', 'champion'],
    minionName: 'Shadow Guard',
    minionEmoji: '👤',
    buzzyCommentary: "You have learned so many words! Use everything you know. You CAN do this!",
    bossName: 'Shadow Scrambler',
    bossEmoji: '😈',
    storyTwist: {
      prompt: 'VICTORY! The Shadow Scrambler has been defeated! The scrolls are restored!',
      options: [
        {
          text: 'Forgive the Scrambler',
          consequence: 'The Scrambler bursts into tears, promises to learn all the words, and becomes the librarian!',
          emoji: '🤝',
        },
        {
          text: 'Have a victory feast',
          consequence: 'All of Linguara celebrates! There are cakes shaped like every word you learned!',
          emoji: '🎂',
        },
        {
          text: 'Write the story down',
          consequence: "Lex writes everything in the Golden Book — and you've earned the WordQuest Hero badge!",
          emoji: '✍️',
        },
      ],
    },
  },
];

export const getChapter = (id: number): StoryChapter | undefined =>
  storyChapters.find((c) => c.id === id);
