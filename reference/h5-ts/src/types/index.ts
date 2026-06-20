export interface DateData {
  day: string;
  date: string;
  kcal: number;
  deficit: 'pos' | 'neg';
  eaten: number;
  target: number;
  left: number;
  active: number;
  rest: number;
  steps: string;
  workouts: string;
  protein: string;
  carb: string;
  fat: string;
  proteinPct: number;
  carbPct: number;
  fatPct: number;
}

export interface MealItem {
  thumb: string;
  name: string;
  desc: string;
  kcal: number;
}

export interface MealData {
  time: string;
  kcal: number;
  items: MealItem[];
}

export type PageName = 'me' | 'progress' | 'bank' | 'add';
export type FilterType = 'all' | 'food' | 'meal' | 'brand' | 'custom' | 'recent';
