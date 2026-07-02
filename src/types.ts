export type Archetype = 
  | 'crypto'
  | 'engineer'
  | 'designer'
  | 'corporate';

export type EnergySource = 
  | 'coffee'
  | 'copium'
  | 'spite'
  | 'positivity';

export type Achievement = 
  | 'laptop'
  | 'feature'
  | 'portfolio'
  | 'meeting';

export type MentalStatus = 
  | 'fine'
  | 'burnout'
  | 'unstable';

export interface QuizState {
  name: string;
  department: string;
  archetype: Archetype | '';
  energySource: EnergySource | '';
  achievement: Achievement | '';
  mentalStatus: MentalStatus | '';
}

export interface IDCardDetails {
  title: string;
  department: string;
  clearanceLevel: string;
  avatarSeed: string;
  patienceLevel: number;
  anxietyLevel: number;
  clientResistance: number;
  existentialQuote: string;
  badgeColor: string; // Tailwind hex or class combination
  barcodeValue: string;
  specialAbility: string;
  dailyDuty: string;
}
