import { QuizState, IDCardDetails, Archetype, EnergySource, Achievement, MentalStatus } from './types';

export interface QuizQuestionOption<T> {
  value: T;
  label: string;
  description: string;
  iconName: string; // Lucide icon mapping
}

export interface QuizQuestion<T> {
  id: keyof QuizState;
  questionText: string;
  subText: string;
  options: QuizQuestionOption<T>[];
}

export const ARCHETYPES: QuizQuestionOption<Archetype>[] = [
  {
    value: 'crypto',
    label: 'Crypto/Web3 Degenerate',
    description: 'Specializes in buying high, selling low, and using "community" to cope with liquidity loss.',
    iconName: 'Coins'
  },
  {
    value: 'engineer',
    label: 'Exhausted Software Engineer',
    description: 'Turns dark coffee, StackOverflow snippets, and prayers into slightly functional production code.',
    iconName: 'Code2'
  },
  {
    value: 'designer',
    label: 'Overworked Graphic Designer',
    description: 'Wields Photoshop like a shield against infinite feedback. Expert in making logos "pop".',
    iconName: 'Palette'
  },
  {
    value: 'corporate',
    label: 'Corporate Slave',
    description: 'Expert in synergistic alignments, attending meetings that should have been emails, and saying "Let\'s take this offline".',
    iconName: 'Briefcase'
  }
];

export const ENERGY_SOURCES: QuizQuestionOption<EnergySource>[] = [
  {
    value: 'coffee',
    label: 'Black Coffee & Anxiety',
    description: 'A volatile biochemical propellant that keeps you vibrating at 80Hz.',
    iconName: 'CupSoda'
  },
  {
    value: 'copium',
    label: 'Copium',
    description: 'Gaseous mixture of hope and denial. Highly flammable when client feedback arrives.',
    iconName: 'Wind'
  },
  {
    value: 'spite',
    label: 'Pure Spite',
    description: 'A highly sustainable, nuclear-grade clean energy source that powers code compiles and layout re-dos.',
    iconName: 'Zap'
  },
  {
    value: 'positivity',
    label: 'Fake Positivity',
    description: 'An unstable facade maintained purely via emojis (✨🙌😊) in public channels.',
    iconName: 'Smile'
  }
];

export const ACHIEVEMENTS: QuizQuestionOption<Achievement>[] = [
  {
    value: 'laptop',
    label: 'Closed laptop without crying',
    description: 'A monumental victory of psychological restraint. Deserves a bonus.',
    iconName: 'Laptop'
  },
  {
    value: 'feature',
    label: 'Convinced the client it’s a feature',
    description: 'Advanced persuasion and mental gymnastics. Bug? No, it’s "emergent design behavior".',
    iconName: 'Sparkles'
  },
  {
    value: 'portfolio',
    label: "Didn't check crypto portfolio for 2 hours",
    description: 'A new record of self-control. Your blood pressure has temporarily stabilized.',
    iconName: 'TrendingDown'
  },
  {
    value: 'meeting',
    label: "Survived a meeting that could've been an email",
    description: '60 minutes of nodding in silence while drafting your resignation in your mind.',
    iconName: 'Calendar'
  }
];

export const MENTAL_STATUSES: QuizQuestionOption<MentalStatus>[] = [
  {
    value: 'fine',
    label: 'Everything is fine (Lie)',
    description: 'The standard response. Inside, a small raccoon is frantically pushing buttons in a burning engine room.',
    iconName: 'Flame'
  },
  {
    value: 'burnout',
    label: 'Luxury Burnout',
    description: 'When standard exhaustion is too mainstream. You are tired at a premium tier of existence.',
    iconName: 'BatteryLow'
  },
  {
    value: 'unstable',
    label: 'Emotionally Unstable but Optimistic',
    description: 'An exciting roller coaster where you cry at compile errors but believe the seed phrase is safe.',
    iconName: 'HeartCrack'
  }
];

// Helper to determine satirical results based on answers
export function evaluateQuizResults(state: QuizState): IDCardDetails {
  const { archetype, energySource, achievement, mentalStatus, name, department } = state;

  // 1. Establish custom titles & details based on archetype
  let title = 'Digital Survivor';
  let clearanceLevel = 'LVL-01 UNPAID INTERN';
  let specialAbility = 'Can look busy while fully dissociated';
  let dailyDuty = 'Staring blankly at screen waiting for 5 PM';
  let badgeColor = 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 shadow-emerald-500/10';
  let avatarSeed = 'default';

  switch (archetype) {
    case 'crypto':
      title = 'Liquidity Rugpull Victim';
      clearanceLevel = 'LVL-99 BAG HOLDER';
      specialAbility = 'Infinite loss tolerance & HODL defense';
      dailyDuty = 'Checking charts every 45 seconds';
      badgeColor = 'from-amber-500/20 to-orange-500/10 border-amber-500/30 shadow-amber-500/10';
      avatarSeed = 'crypto';
      break;
    case 'engineer':
      title = 'Senior Copy-Paste Architect';
      clearanceLevel = 'LVL-04 BUG FABRICATOR';
      specialAbility = 'Writing code that only runs on my machine';
      dailyDuty = 'Telling QA "it worked fine in local dev"';
      badgeColor = 'from-indigo-500/20 to-purple-500/10 border-indigo-500/30 shadow-indigo-500/10';
      avatarSeed = 'engineer';
      break;
    case 'designer':
      title = 'Chief Font-Nudge Evangelist';
      clearanceLevel = 'LVL-03 PIXEL PUSHER';
      specialAbility = 'Hearing client feedback without committing a crime';
      dailyDuty = 'Saving file as "final_final_v4_revised_actual_FINAL.psd"';
      badgeColor = 'from-pink-500/20 to-rose-500/10 border-pink-500/30 shadow-pink-500/10';
      avatarSeed = 'designer';
      break;
    case 'corporate':
      title = 'Vice President of Synergy';
      clearanceLevel = 'LVL-10 OVERPAID ALIGNER';
      specialAbility = 'Talking for 20 minutes without saying anything';
      dailyDuty = 'Taking simple action items "offline"';
      badgeColor = 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 shadow-cyan-500/10';
      avatarSeed = 'corporate';
      break;
  }

  // Override title combinations for extra humor
  if (archetype === 'engineer' && energySource === 'copium') {
    title = 'AI Prompt-Injection Engineer';
  } else if (archetype === 'crypto' && mentalStatus === 'burnout') {
    title = 'DeFi Yield Farming Martyr';
  } else if (archetype === 'designer' && achievement === 'feature') {
    title = 'Dark Pattern UI Sorcerer';
  } else if (archetype === 'corporate' && energySource === 'spite') {
    title = 'Passive-Aggressive Email Specialist';
  }

  // 2. Compute dynamic stats
  let patienceLevel = 45;
  let anxietyLevel = 50;
  let clientResistance = 35;

  // Modify patience based on Energy Source & Mental Status
  if (energySource === 'coffee') {
    patienceLevel = 8;
    anxietyLevel += 35;
  } else if (energySource === 'copium') {
    patienceLevel = 75;
    clientResistance = 5; // Copium makes them fold easily
  } else if (energySource === 'spite') {
    patienceLevel = 2;
    clientResistance = 95; // Pure spite gives high resistance
  } else if (energySource === 'positivity') {
    patienceLevel = 90; // Fake positive, looks high but is brittle
    anxietyLevel += 25;
  }

  if (mentalStatus === 'burnout') {
    patienceLevel = Math.max(0, patienceLevel - 30);
    anxietyLevel = 99;
  } else if (mentalStatus === 'unstable') {
    patienceLevel = Math.floor(Math.random() * 20); // Fluctuates
    anxietyLevel = 85;
  }

  if (achievement === 'laptop') {
    patienceLevel = Math.min(100, patienceLevel + 15);
  } else if (achievement === 'feature') {
    clientResistance = Math.min(100, clientResistance + 30);
  }

  // Ensure bounds
  patienceLevel = Math.min(100, Math.max(0, patienceLevel));
  anxietyLevel = Math.min(100, Math.max(0, anxietyLevel));
  clientResistance = Math.min(100, Math.max(0, clientResistance));

  // 3. Generate a satirical existential advice quote
  let existentialQuote = "Remember, the server will eventually burn. Your contributions are transient. Enjoy the coffee.";

  const quotes: Record<Archetype, string[]> = {
    crypto: [
      "Your net worth is highly volatile, but your digital despair remains a solid, stable asset.",
      "The true block chain was the Slack threads we were locked in along the way.",
      "Losing gas fees is a temporary sacrifice. The permanent sacrifice is your peace of mind.",
      "In the decentralized future, we will all be burned out equally. HODL your last nerve."
    ],
    engineer: [
      "No matter how elegant your architecture is, a single client with an outdated browser will destroy it.",
      "There is no bug-free code, only code that QA got tired of testing.",
      "A cup of coffee saves 3 hours of writing code. Writing code saves 3 minutes of reading documentation.",
      "Your codebase is a house of cards built on a swamp of legacy packages. Tread lightly."
    ],
    designer: [
      "No matter how perfect the layout, they will always ask for the logo to be bigger and the font to be Comic Sans.",
      "White space is not 'empty'; it is where your soul resides, away from client revisions.",
      "A design system is just a fancy set of rules that the product manager will ask you to break tomorrow.",
      "The client doesn't know what they want, but they know it isn't what you just spent 40 hours creating."
    ],
    corporate: [
      "Aligning stakeholders is like trying to herd caffeinated cats through a Zoom meeting that is already 15 minutes over.",
      "A synergy a day keeps productivity away. Keep aligning those touchpoints.",
      "The best status update is a vague status update. If they don't understand it, they can't blame you.",
      "A desk is a dangerous place from which to view the world, but at least there is free sparkling water."
    ]
  };

  const selectedQuotes = quotes[archetype || 'engineer'];
  const quoteIdx = (energySource.length + achievement.length + mentalStatus.length) % selectedQuotes.length;
  existentialQuote = selectedQuotes[quoteIdx];

  // Generate a funny random-looking barcode value
  const numString = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10)).join('');
  const barcodeValue = `MISERY-${numString.slice(0, 4)}-${numString.slice(4, 8)}-${archetype ? archetype.toUpperCase() : 'EMP'}`;

  return {
    title,
    department: department || (archetype ? `${archetype.toUpperCase()} HAZARD DEPT` : 'GENERAL DISMAY'),
    clearanceLevel,
    avatarSeed,
    patienceLevel,
    anxietyLevel,
    clientResistance,
    existentialQuote,
    badgeColor,
    barcodeValue,
    specialAbility,
    dailyDuty
  };
}
