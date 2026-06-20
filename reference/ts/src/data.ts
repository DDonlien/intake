import * as storage from "./storage";

export type TabKey = "me" | "log" | "bank" | "add";
export type AuthMode = "login" | "register";
export type MealName = string;
export type PlanType = "减脂" | "减重" | "维持" | "增肌";
export type FoodTag = "Food" | "Meal" | "Brand" | "Custom";
export type SheetLevel = "peek" | "mid" | "expanded";
export type DataSource = "synced" | "edited";

export type Account = { id: string; email: string; password: string };

export type FoodItem = {
  id: string;
  name: string;
  emoji: string;
  brand: string;
  serving: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  tag: FoodTag;
};

export type FoodLogItem = {
  id: string;
  foodId: string;
  name: string;
  emoji: string;
  brand: string;
  serving: string;
  quantity: number;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  source: "bank" | "scan" | "manual";
};

export type MealEntry = {
  id: string;
  name: MealName;
  time: string;
  foods: FoodLogItem[];
};

export type Goals = {
  currentWeight: number;
  targetWeight: number;
  dailyKcal: number;
  protein: number;
  carbs: number;
  fat: number;
  plan: PlanType;
};

export type Profile = {
  name: string;
  weight: number;
  height: number;
  age: number;
  activity: "Low" | "Moderate" | "High";
};

export type HealthDay = { active: number; exercise: number; steps: number };

export type AppData = {
  schemaVersion: number;
  profile: Profile;
  goals: Goals;
  profileSource: DataSource;
  goalsSource: DataSource;
  foods: FoodItem[];
  entries: Record<string, MealEntry[]>;
  health: Record<string, HealthDay>;
  favorites: string[];
  recentFoodIds: string[];
  expandedMeals: string[];
};

export type PagePrefs = {
  activeTab: TabKey;
  selectedDate: string;
  bankFilter: string;
  bankSearch: string;
  selectedMealName: MealName;
};

export const ACCOUNTS_KEY = "intake.accounts.v1";
export const SESSION_KEY = "intake.session.v1";
export const DATA_KEY = (userId: string) => `intake.data.${userId}.v2`;
export const LEGACY_DATA_KEY = (userId: string) => `intake.data.${userId}.v1`;
export const PREFS_KEY = (userId: string) => `intake.prefs.${userId}.v1`;
export const CURRENT_DATA_SCHEMA_VERSION = 2;

export const tabKeys: TabKey[] = ["me", "log", "bank", "add"];
export const primaryMealNames = ["Breakfast", "Lunch", "Dinner"] as const;
export const mealNames: MealName[] = [...primaryMealNames, "Snack"];
export const bankFilters = ["All", "Foods", "Meals", "Brands", "Custom", "Recent", "Favorites"];
export const planOptions: PlanType[] = ["减脂", "减重", "维持", "增肌"];

export const detectedChoices = [
  { foodId: "chicken-bowl", name: "Chicken avocado bowl", emoji: "🥗", detail: "Chicken, oats, avocado", servingUnit: "bowl", kcalPerServing: 360 },
  { foodId: "grilled-chicken-bowl", name: "Grilled chicken bowl", emoji: "🍗", detail: "Rice, greens, chicken", servingUnit: "bowl", kcalPerServing: 420 },
  { foodId: "oat-salad", name: "Oat salad", emoji: "🥬", detail: "Oats, greens, yogurt", servingUnit: "cup", kcalPerServing: 180 },
];

export const seedFoods: FoodItem[] = [
  { id: "greek-yogurt", name: "Greek Yogurt", emoji: "🥛", brand: "Fage", serving: "170g cup", kcal: 130, protein: 18, carbs: 8, fat: 3, tag: "Food" },
  { id: "chicken-bowl", name: "Chicken Avocado Bowl", emoji: "🥗", brand: "Homemade", serving: "1 bowl", kcal: 360, protein: 32, carbs: 38, fat: 12, tag: "Meal" },
  { id: "protein-shake", name: "Protein Shake", emoji: "🥤", brand: "Custom", serving: "1 bottle", kcal: 210, protein: 24, carbs: 12, fat: 6, tag: "Custom" },
  { id: "turkey-sandwich", name: "Egg & Turkey Sandwich", emoji: "🥪", brand: "Starbucks", serving: "1 sandwich", kcal: 390, protein: 22, carbs: 40, fat: 14, tag: "Brand" },
  { id: "white-rice", name: "White Rice", emoji: "🍚", brand: "No Brand", serving: "1 cup", kcal: 205, protein: 4, carbs: 45, fat: 0, tag: "Food" },
  { id: "oatmeal", name: "Oatmeal", emoji: "🥣", brand: "No Brand", serving: "1 cup", kcal: 150, protein: 6, carbs: 27, fat: 3, tag: "Food" },
  { id: "grilled-chicken-bowl", name: "Grilled Chicken Bowl", emoji: "🍗", brand: "Homemade", serving: "1 bowl", kcal: 420, protein: 38, carbs: 42, fat: 12, tag: "Meal" },
  { id: "fried-chicken", name: "Fried Chicken (2 pcs)", emoji: "🍗", brand: "KFC", serving: "2 pcs", kcal: 560, protein: 32, carbs: 24, fat: 34, tag: "Brand" },
  { id: "big-mac", name: "Big Mac", emoji: "🍔", brand: "McDonald's", serving: "1 burger", kcal: 563, protein: 25, carbs: 45, fat: 33, tag: "Brand" },
  { id: "custom-sandwich", name: "Custom Turkey Sandwich", emoji: "🥪", brand: "Custom", serving: "1 sandwich", kcal: 390, protein: 22, carbs: 40, fat: 14, tag: "Custom" },
  { id: "oat-salad", name: "Oat salad", emoji: "🥬", brand: "Homemade", serving: "1 cup", kcal: 180, protein: 7, carbs: 25, fat: 6, tag: "Food" },
  { id: "blueberries", name: "Blueberries", emoji: "🫐", brand: "No Brand", serving: "80g", kcal: 46, protein: 1, carbs: 12, fat: 0, tag: "Food" },
  { id: "rolled-oats", name: "Rolled oats", emoji: "🥣", brand: "No Brand", serving: "45g", kcal: 214, protein: 7, carbs: 33, fat: 5, tag: "Food" },
  { id: "avocado", name: "Avocado", emoji: "🥑", brand: "No Brand", serving: "half", kcal: 112, protein: 1, carbs: 6, fat: 10, tag: "Food" },
];

export const todayKey = () => toDateKey(new Date());
export const uid = (prefix: string) => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
export const toDateKey = (date: Date) => date.toISOString().slice(0, 10);
export const addDays = (key: string, offset: number) => {
  const date = new Date(`${key}T12:00:00`);
  date.setDate(date.getDate() + offset);
  return toDateKey(date);
};
export const dayLabel = (key: string) => {
  const date = new Date(`${key}T12:00:00`);
  return {
    weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
    date: date.toLocaleDateString("en-US", { month: "short", day: "2-digit" }).replace(" ", "."),
  };
};

export function foodToLog(food: FoodItem, quantity = 1, source: FoodLogItem["source"] = "bank"): FoodLogItem {
  return {
    id: uid("log"),
    foodId: food.id,
    name: food.name,
    emoji: food.emoji,
    brand: food.brand,
    serving: quantity === 1 ? food.serving : `${quantity.toFixed(quantity % 1 === 0 ? 0 : 2)} x ${food.serving}`,
    quantity,
    kcal: Math.round(food.kcal * quantity),
    protein: Math.round(food.protein * quantity),
    carbs: Math.round(food.carbs * quantity),
    fat: Math.round(food.fat * quantity),
    source,
  };
}

export function isSnackMeal(name: string) {
  return /^Snack(?: \d+)?$/.test(name);
}

export function nextSnackName(meals: MealEntry[]) {
  const snackCount = meals.filter((meal) => isSnackMeal(meal.name)).length;
  return `Snack ${snackCount + 1}`;
}

export function normalizeMealNames(meals: MealEntry[]) {
  let snackCount = 0;
  return meals.map((meal) => {
    if (!isSnackMeal(meal.name)) return meal;
    snackCount += 1;
    return { ...meal, name: `Snack ${snackCount}` };
  });
}

export function mealIcon(name: string) {
  if (name === "Breakfast") return "🥣";
  if (name === "Lunch") return "🥗";
  if (name === "Dinner") return "🍽️";
  return "🍎";
}

function defaultMeals(): MealEntry[] {
  const f = Object.fromEntries(seedFoods.map((food) => [food.id, food]));
  return [
    { id: uid("meal"), name: "Breakfast", time: "08:18", foods: [foodToLog(f["greek-yogurt"]), foodToLog(f["blueberries"]), foodToLog(f["rolled-oats"])] },
    { id: uid("meal"), name: "Lunch", time: "12:42", foods: [foodToLog(f["chicken-bowl"]), foodToLog(f["oat-salad"]), foodToLog(f["greek-yogurt"])] },
    { id: uid("meal"), name: "Snack 1", time: "15:26", foods: [foodToLog(f["protein-shake"])] },
  ];
}

export function normalizePlan(plan: unknown): PlanType {
  if (planOptions.includes(plan as PlanType)) return plan as PlanType;
  const legacyMap: Record<string, PlanType> = { Cut: "减脂", Maintain: "维持", Gain: "增肌", Custom: "减重" };
  return legacyMap[String(plan)] ?? "减脂";
}

export function goalsForPlan(plan: PlanType, profile: Profile): Goals {
  const currentWeight = profile.weight;
  const presets: Record<PlanType, Omit<Goals, "currentWeight" | "plan">> = {
    减脂: { targetWeight: 72, dailyKcal: 2334, protein: 142, carbs: 230, fat: 72 },
    减重: { targetWeight: 70, dailyKcal: 2050, protein: 150, carbs: 185, fat: 58 },
    维持: { targetWeight: currentWeight, dailyKcal: 2600, protein: 126, carbs: 300, fat: 86 },
    增肌: { targetWeight: 82, dailyKcal: 2900, protein: 155, carbs: 335, fat: 95 },
  };
  return { currentWeight, plan, ...presets[plan] };
}

export function isDefaultProfile(profile: Profile) {
  const synced = { name: "Tao", weight: 78.4, height: 178, age: 34, activity: "Moderate" as const };
  return profile.weight === synced.weight && profile.height === synced.height && profile.age === synced.age && profile.activity === synced.activity;
}

export function isPlanGoal(goals: Goals, profile: Profile) {
  const preset = goalsForPlan(goals.plan, profile);
  return goals.currentWeight === preset.currentWeight && goals.targetWeight === preset.targetWeight && goals.dailyKcal === preset.dailyKcal && goals.protein === preset.protein;
}

export function normalizeData(raw: Partial<AppData>): AppData {
  const profile = raw.profile ?? { name: "Tao", weight: 78.4, height: 178, age: 34, activity: "Moderate" };
  const plan = normalizePlan(raw.goals?.plan);
  const profileSource: DataSource = raw.profileSource === "edited" ? "edited" : "synced";
  const goalsSource: DataSource = raw.goalsSource === "edited" ? "edited" : "synced";
  const planGoals = goalsForPlan(plan, profile);
  const goals = goalsSource === "edited" && raw.goals ? { ...planGoals, ...raw.goals, plan } : planGoals;
  const entries = Object.fromEntries(Object.entries(raw.entries ?? {}).map(([key, meals]) => [key, normalizeMealNames(meals)]));
  const expandedMeals = (raw.expandedMeals ?? []).map((name) => (name === "Snack" ? "Snack 1" : name)).slice(-1);
  return {
    schemaVersion: typeof raw.schemaVersion === "number" ? raw.schemaVersion : CURRENT_DATA_SCHEMA_VERSION,
    profile,
    goals,
    profileSource,
    goalsSource,
    foods: raw.foods ?? seedFoods,
    entries,
    health: raw.health ?? {},
    favorites: raw.favorites ?? [],
    recentFoodIds: raw.recentFoodIds ?? [],
    expandedMeals,
  };
}

export function makeDefaultData(options?: { demo?: boolean }): AppData {
  const demo = options?.demo ?? false;
  const today = todayKey();
  const yesterday = addDays(today, -1);
  const profile: Profile = { name: "Tao", weight: 78.4, height: 178, age: 34, activity: "Moderate" };
  return {
    schemaVersion: CURRENT_DATA_SCHEMA_VERSION,
    profile,
    goals: goalsForPlan("减脂", profile),
    profileSource: "synced",
    goalsSource: "synced",
    foods: seedFoods,
    entries: demo
      ? { [today]: defaultMeals(), [yesterday]: [{ id: uid("meal"), name: "Dinner", time: "19:10", foods: [foodToLog(seedFoods[6]), foodToLog(seedFoods[4])] }] }
      : {},
    health: demo
      ? { [today]: { active: 642, exercise: 38, steps: 8400 }, [yesterday]: { active: 510, exercise: 28, steps: 7200 } }
      : {},
    favorites: demo ? ["greek-yogurt"] : [],
    recentFoodIds: demo ? ["chicken-bowl", "greek-yogurt", "protein-shake", "turkey-sandwich"] : [],
    expandedMeals: demo ? ["Lunch"] : [],
  };
}

export function makeDemoData(): AppData {
  return makeDefaultData({ demo: true });
}

export function migrateAppData(raw: unknown): { data: AppData; migrated: boolean } {
  if (!raw || typeof raw !== "object") {
    return { data: makeDefaultData({ demo: false }), migrated: false };
  }
  const record = raw as Record<string, unknown>;
  const version = typeof record.schemaVersion === "number" ? record.schemaVersion : 1;
  if (version >= CURRENT_DATA_SCHEMA_VERSION) {
    return { data: normalizeData(record as AppData), migrated: false };
  }
  // v1 -> v2: add schema version and normalize any missing fields.
  const migrated = normalizeData({ ...record, schemaVersion: CURRENT_DATA_SCHEMA_VERSION } as AppData);
  return { data: migrated, migrated: true };
}

export function loadUserData(
  userId: string,
  options?: { demo?: boolean },
): { data: AppData; migrated: boolean; isNew: boolean; error?: string } {
  if (!userId) {
    return { data: makeDefaultData({ demo: false }), migrated: false, isNew: true, error: "Missing user id" };
  }
  let raw = storage.readJson<unknown>(DATA_KEY(userId), null);
  let legacy = false;
  if (raw === null) {
    raw = storage.readJson<unknown>(LEGACY_DATA_KEY(userId), null);
    legacy = raw !== null;
  }
  if (raw === null) {
    return { data: makeDefaultData({ demo: options?.demo ?? false }), migrated: false, isNew: true };
  }
  try {
    const result = migrateAppData(raw);
    return { data: result.data, migrated: result.migrated || legacy, isNew: false };
  } catch (error) {
    return {
      data: makeDefaultData({ demo: false }),
      migrated: false,
      isNew: true,
      error: `Failed to load local data: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

export function saveUserData(userId: string, data: AppData): storage.WriteResult {
  if (!userId) {
    return { success: false, error: "Missing user id" };
  }
  if (typeof data.schemaVersion !== "number") {
    return { success: false, error: "Data is missing schema version" };
  }
  return storage.writeJson(DATA_KEY(userId), data);
}

export function clearUserData(userId: string) {
  storage.removeItem(DATA_KEY(userId));
  storage.removeItem(LEGACY_DATA_KEY(userId));
  storage.removeItem(PREFS_KEY(userId));
}

export function defaultPagePrefs(): PagePrefs {
  return {
    activeTab: "log",
    selectedDate: todayKey(),
    bankFilter: "All",
    bankSearch: "",
    selectedMealName: "Lunch",
  };
}

export function loadPagePrefs(userId: string): PagePrefs {
  const fallback = defaultPagePrefs();
  const raw = storage.readJson<Partial<PagePrefs>>(PREFS_KEY(userId), fallback);
  const activeTab = tabKeys.includes(raw.activeTab as TabKey) ? (raw.activeTab as TabKey) : fallback.activeTab;
  const selectedDate = typeof raw.selectedDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(raw.selectedDate) ? raw.selectedDate : fallback.selectedDate;
  const bankFilter = bankFilters.includes(raw.bankFilter ?? "") ? (raw.bankFilter as string) : fallback.bankFilter;
  const bankSearch = typeof raw.bankSearch === "string" ? raw.bankSearch : fallback.bankSearch;
  const selectedMealName = typeof raw.selectedMealName === "string" ? raw.selectedMealName : fallback.selectedMealName;
  return { activeTab, selectedDate, bankFilter, bankSearch, selectedMealName };
}

export function savePagePrefs(userId: string, prefs: PagePrefs): storage.WriteResult {
  if (!userId) {
    return { success: false, error: "Missing user id" };
  }
  return storage.writeJson(PREFS_KEY(userId), prefs);
}

export function mealTotals(meal: MealEntry) {
  return meal.foods.reduce(
    (sum, food) => ({
      kcal: sum.kcal + food.kcal,
      protein: sum.protein + food.protein,
      carbs: sum.carbs + food.carbs,
      fat: sum.fat + food.fat,
    }),
    { kcal: 0, protein: 0, carbs: 0, fat: 0 },
  );
}

export function dayTotals(meals: MealEntry[]) {
  return meals.reduce(
    (sum, meal) => {
      const totals = mealTotals(meal);
      return {
        kcal: sum.kcal + totals.kcal,
        protein: sum.protein + totals.protein,
        carbs: sum.carbs + totals.carbs,
        fat: sum.fat + totals.fat,
      };
    },
    { kcal: 0, protein: 0, carbs: 0, fat: 0 },
  );
}
