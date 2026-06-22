import { showToast } from './toast';
import type { DateData, MealData } from '../types';

export interface UserState {
  name: string;
  goal: string;
  subGoal: string;
  currentWeight: string;
  targetWeight: string;
  speed: string;
  dailyKcal: string;
  deficitTarget: string;
  strategy: string;
  strategySub: string;
  healthConnected: boolean;
  hasData: boolean;
}

export interface AppData {
  user: UserState;
  dates: DateData[];
  meals: Record<string, MealData>;
}

const EMPTY_USER: UserState = {
  name: '',
  goal: '',
  subGoal: '',
  currentWeight: '',
  targetWeight: '',
  speed: '',
  dailyKcal: '',
  deficitTarget: '',
  strategy: '',
  strategySub: '',
  healthConnected: false,
  hasData: false,
};

const DEFAULT_USER: UserState = {
  name: 'Alex',
  goal: '减脂',
  subGoal: '高蛋白',
  currentWeight: '68.2',
  targetWeight: '60.0',
  speed: '每周 0.5',
  dailyKcal: '2,000',
  deficitTarget: '500',
  strategy: '高蛋白',
  strategySub: '均衡碳脂',
  healthConnected: true,
  hasData: true,
};

const DEFAULT_DATES: DateData[] = [
  { day: '周日', date: '5月18', kcal: 1585, deficit: 'pos', eaten: 1585, target: 2000, left: 415, active: 320, rest: 1380, steps: '7,230', workouts: '0', protein: '112/120', carb: '195/250', fat: '55/70', proteinPct: 93, carbPct: 78, fatPct: 79 },
  { day: '周一', date: '5月19', kcal: 1760, deficit: 'neg', eaten: 1760, target: 2000, left: 240, active: 380, rest: 1380, steps: '8,102', workouts: '1', protein: '98/120', carb: '210/250', fat: '62/70', proteinPct: 82, carbPct: 84, fatPct: 89 },
  { day: '周二', date: '5月20', kcal: 1332, deficit: 'pos', eaten: 1332, target: 2000, left: 668, active: 290, rest: 1380, steps: '6,540', workouts: '0', protein: '85/120', carb: '160/250', fat: '48/70', proteinPct: 71, carbPct: 64, fatPct: 69 },
  { day: '周三', date: '5月21', kcal: 1695, deficit: 'neg', eaten: 1695, target: 2000, left: 305, active: 350, rest: 1380, steps: '7,890', workouts: '1', protein: '105/120', carb: '200/250', fat: '60/70', proteinPct: 88, carbPct: 80, fatPct: 86 },
  { day: '周四', date: '5月22', kcal: 1482, deficit: 'pos', eaten: 1482, target: 2000, left: 518, active: 280, rest: 1380, steps: '6,210', workouts: '0', protein: '95/120', carb: '175/250', fat: '52/70', proteinPct: 79, carbPct: 70, fatPct: 74 },
  { day: '今天', date: '5月24', kcal: 1624, deficit: 'pos', eaten: 1624, target: 2000, left: 376, active: 410, rest: 1380, steps: '8,642', workouts: '1', protein: '102/120', carb: '179/250', fat: '58/70', proteinPct: 85, carbPct: 72, fatPct: 83 },
];

const DEFAULT_MEALS: Record<string, MealData> = {
  breakfast: { time: '8:30', kcal: 412, items: [
    { thumb: '🥣', name: '燕麦牛奶', desc: '1 碗 · 自制', kcal: 280 },
    { thumb: '🫐', name: '蓝莓', desc: '50g', kcal: 85 },
    { thumb: '☕', name: '黑咖啡', desc: '1 杯', kcal: 5 },
  ]},
  lunch: { time: '12:45', kcal: 687, items: [
    { thumb: '🥗', name: '烤鸡谷物碗', desc: '1 碗 · 自制', kcal: 360 },
    { thumb: '🥬', name: '藜麦沙拉', desc: '1 杯 · 自制', kcal: 180 },
    { thumb: '🥛', name: '希腊酸奶', desc: 'FAGE · 1 杯', kcal: 120 },
  ]},
  dinner: { time: '19:00', kcal: 403, items: [
    { thumb: '🍣', name: '三文鱼刺身', desc: '5 片 · 日料店', kcal: 250 },
    { thumb: '🍚', name: '米饭', desc: '1 小碗', kcal: 120 },
    { thumb: '🍵', name: '味噌汤', desc: '1 碗', kcal: 33 },
  ]},
  snack: { time: '15:30', kcal: 122, items: [
    { thumb: '🍎', name: '苹果', desc: '1 个', kcal: 95 },
    { thumb: '🥜', name: '杏仁', desc: '10g', kcal: 27 },
  ]},
};

export class DataStore {
  private data: AppData;
  private listeners: Set<() => void> = new Set();

  constructor() {
    // Try to load from localStorage, otherwise use empty state (new user)
    const saved = localStorage.getItem('intake_data');
    if (saved) {
      try {
        this.data = JSON.parse(saved);
      } catch {
        this.data = this.getEmptyData();
      }
    } else {
      this.data = this.getEmptyData();
    }
  }

  private getEmptyData(): AppData {
    return {
      user: { ...EMPTY_USER },
      dates: [],
      meals: {},
    };
  }

  get(): AppData {
    return this.data;
  }

  getUser(): UserState {
    return this.data.user;
  }

  getDates(): DateData[] {
    return this.data.dates;
  }

  getMeals(): Record<string, MealData> {
    return this.data.meals;
  }

  hasData(): boolean {
    return this.data.user.hasData;
  }

  // For demo purposes: load sample data
  loadSampleData(): void {
    this.data = {
      user: { ...DEFAULT_USER },
      dates: [...DEFAULT_DATES],
      meals: { ...DEFAULT_MEALS },
    };
    this.save();
    this.notify();
  }

  clearAll(): void {
    this.data = this.getEmptyData();
    localStorage.removeItem('intake_data');
    this.notify();
  }

  save(): void {
    localStorage.setItem('intake_data', JSON.stringify(this.data));
  }

  onChange(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach(fn => fn());
  }
}
