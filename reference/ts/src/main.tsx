import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity,
  Apple,
  Bell,
  Camera,
  CheckSquare,
  ChevronRight,
  X,
  Flame,
  Footprints,
  HeartPulse,
  ImagePlus,
  Lock,
  Mic,
  Minus,
  Plus,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Star,
  Timer,
  Trash2,
  UserRound,
  Utensils,
} from "lucide-react";
import "./styles.css";

type TabKey = "me" | "log" | "bank" | "add";
type AuthMode = "login" | "register";
type MealName = string;
type PlanType = "减脂" | "减重" | "维持" | "增肌";
type FoodTag = "Food" | "Meal" | "Brand" | "Custom";
type SheetLevel = "peek" | "mid" | "expanded";
type DataSource = "synced" | "edited";

type Account = { id: string; email: string; password: string };
type FoodItem = {
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
type FoodLogItem = {
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
type MealEntry = {
  id: string;
  name: MealName;
  time: string;
  foods: FoodLogItem[];
};
type Goals = {
  currentWeight: number;
  targetWeight: number;
  dailyKcal: number;
  protein: number;
  carbs: number;
  fat: number;
  plan: PlanType;
};
type Profile = {
  name: string;
  weight: number;
  height: number;
  age: number;
  activity: "Low" | "Moderate" | "High";
};
type HealthDay = { active: number; exercise: number; steps: number };
type AppData = {
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

const ACCOUNTS_KEY = "intake.accounts.v1";
const SESSION_KEY = "intake.session.v1";
const dataKey = (userId: string) => `intake.data.${userId}.v1`;

const primaryMealNames = ["Breakfast", "Lunch", "Dinner"] as const;
const mealNames: MealName[] = [...primaryMealNames, "Snack"];
const bankFilters = ["All", "Foods", "Meals", "Brands", "Custom", "Recent", "Favorites"];
const planOptions: PlanType[] = ["减脂", "减重", "维持", "增肌"];
const detectedChoices = [
  { foodId: "chicken-bowl", name: "Chicken avocado bowl", emoji: "🥗", detail: "Chicken, oats, avocado", servingUnit: "bowl", kcalPerServing: 360 },
  { foodId: "grilled-chicken-bowl", name: "Grilled chicken bowl", emoji: "🍗", detail: "Rice, greens, chicken", servingUnit: "bowl", kcalPerServing: 420 },
  { foodId: "oat-salad", name: "Oat salad", emoji: "🥬", detail: "Oats, greens, yogurt", servingUnit: "cup", kcalPerServing: 180 },
];

const seedFoods: FoodItem[] = [
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

const todayKey = () => toDateKey(new Date());
const uid = (prefix: string) => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
const toDateKey = (date: Date) => date.toISOString().slice(0, 10);
const addDays = (key: string, offset: number) => {
  const date = new Date(`${key}T12:00:00`);
  date.setDate(date.getDate() + offset);
  return toDateKey(date);
};
const dayLabel = (key: string) => {
  const date = new Date(`${key}T12:00:00`);
  return {
    weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
    date: date.toLocaleDateString("en-US", { month: "short", day: "2-digit" }).replace(" ", "."),
  };
};

function foodToLog(food: FoodItem, quantity = 1, source: FoodLogItem["source"] = "bank"): FoodLogItem {
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

function isSnackMeal(name: string) {
  return /^Snack(?: \d+)?$/.test(name);
}

function nextSnackName(meals: MealEntry[]) {
  const snackCount = meals.filter((meal) => isSnackMeal(meal.name)).length;
  return `Snack ${snackCount + 1}`;
}

function normalizeMealNames(meals: MealEntry[]) {
  let snackCount = 0;
  return meals.map((meal) => {
    if (!isSnackMeal(meal.name)) return meal;
    snackCount += 1;
    return { ...meal, name: `Snack ${snackCount}` };
  });
}

function mealIcon(name: string) {
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

function normalizePlan(plan: unknown): PlanType {
  if (planOptions.includes(plan as PlanType)) return plan as PlanType;
  const legacyMap: Record<string, PlanType> = { Cut: "减脂", Maintain: "维持", Gain: "增肌", Custom: "减重" };
  return legacyMap[String(plan)] ?? "减脂";
}

function goalsForPlan(plan: PlanType, profile: Profile): Goals {
  const currentWeight = profile.weight;
  const presets: Record<PlanType, Omit<Goals, "currentWeight" | "plan">> = {
    减脂: { targetWeight: 72, dailyKcal: 2334, protein: 142, carbs: 230, fat: 72 },
    减重: { targetWeight: 70, dailyKcal: 2050, protein: 150, carbs: 185, fat: 58 },
    维持: { targetWeight: currentWeight, dailyKcal: 2600, protein: 126, carbs: 300, fat: 86 },
    增肌: { targetWeight: 82, dailyKcal: 2900, protein: 155, carbs: 335, fat: 95 },
  };
  return { currentWeight, plan, ...presets[plan] };
}

function isDefaultProfile(profile: Profile) {
  const synced = { name: "Tao", weight: 78.4, height: 178, age: 34, activity: "Moderate" as const };
  return profile.weight === synced.weight && profile.height === synced.height && profile.age === synced.age && profile.activity === synced.activity;
}

function isPlanGoal(goals: Goals, profile: Profile) {
  const preset = goalsForPlan(goals.plan, profile);
  return goals.currentWeight === preset.currentWeight && goals.targetWeight === preset.targetWeight && goals.dailyKcal === preset.dailyKcal && goals.protein === preset.protein;
}

function normalizeData(raw: AppData): AppData {
  const profile = raw.profile ?? { name: "Tao", weight: 78.4, height: 178, age: 34, activity: "Moderate" };
  const plan = normalizePlan(raw.goals?.plan);
  const profileSource: DataSource = raw.profileSource === "edited" ? "edited" : "synced";
  const goalsSource: DataSource = raw.goalsSource === "edited" ? "edited" : "synced";
  const planGoals = goalsForPlan(plan, profile);
  const goals = goalsSource === "edited" && raw.goals ? { ...planGoals, ...raw.goals, plan } : planGoals;
  const entries = Object.fromEntries(Object.entries(raw.entries ?? {}).map(([key, meals]) => [key, normalizeMealNames(meals)]));
  const expandedMeals = (raw.expandedMeals ?? []).map((name) => (name === "Snack" ? "Snack 1" : name)).slice(-1);
  return {
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

function makeDefaultData(): AppData {
  const today = todayKey();
  const yesterday = addDays(today, -1);
  const profile: Profile = { name: "Tao", weight: 78.4, height: 178, age: 34, activity: "Moderate" };
  return {
    profile,
    goals: goalsForPlan("减脂", profile),
    profileSource: "synced",
    goalsSource: "synced",
    foods: seedFoods,
    entries: { [today]: defaultMeals(), [yesterday]: [{ id: uid("meal"), name: "Dinner", time: "19:10", foods: [foodToLog(seedFoods[6]), foodToLog(seedFoods[4])] }] },
    health: { [today]: { active: 642, exercise: 38, steps: 8400 }, [yesterday]: { active: 510, exercise: 28, steps: 7200 } },
    favorites: ["greek-yogurt"],
    recentFoodIds: ["chicken-bowl", "greek-yogurt", "protein-shake", "turkey-sandwich"],
    expandedMeals: ["Lunch"],
  };
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

function mealTotals(meal: MealEntry) {
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

function dayTotals(meals: MealEntry[]) {
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

function App() {
  const [account, setAccount] = useState<Account | null>(() => {
    const session = readJson<{ userId?: string }>(SESSION_KEY, {});
    const accounts = readJson<Account[]>(ACCOUNTS_KEY, []);
    return accounts.find((item) => item.id === session.userId) ?? null;
  });
  const [activeTab, setActiveTab] = useState<TabKey>(() => {
    const hashTab = window.location.hash.replace("#", "") as TabKey;
    return ["me", "log", "bank", "add"].includes(hashTab) ? hashTab : "log";
  });
  const [bankFilter, setBankFilter] = useState("All");
  const [bankSearch, setBankSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState(todayKey());
  const [selectedMealName, setSelectedMealName] = useState<MealName>("Lunch");
  const [notice, setNotice] = useState("");
  const [data, setData] = useState<AppData | null>(() => (account ? normalizeData(readJson(dataKey(account.id), makeDefaultData())) : null));
  const activeTabRef = useRef<TabKey>(activeTab);
  const returnTabRef = useRef<TabKey>("log");

  useEffect(() => {
    if (!account) return;
    const stored = readJson<AppData | null>(dataKey(account.id), null);
    const next = normalizeData(stored ?? makeDefaultData());
    setData(next);
    writeJson(dataKey(account.id), next);
  }, [account]);

  useEffect(() => {
    if (account && data) writeJson(dataKey(account.id), data);
  }, [account, data]);

  useEffect(() => {
    const syncHashTab = () => {
      const hashTab = window.location.hash.replace("#", "") as TabKey;
      if (["me", "log", "bank", "add"].includes(hashTab)) {
        if (hashTab === "add" && activeTabRef.current !== "add") returnTabRef.current = activeTabRef.current;
        if (hashTab !== "add") returnTabRef.current = hashTab;
        activeTabRef.current = hashTab;
        setActiveTab(hashTab);
      }
    };
    window.addEventListener("hashchange", syncHashTab);
    return () => window.removeEventListener("hashchange", syncHashTab);
  }, []);

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2200);
  };

  const navigateTab = (tab: TabKey, mealName?: MealName) => {
    const currentTab = activeTabRef.current;
    if (mealName) setSelectedMealName(mealName);
    if (tab === "add" && currentTab !== "add") returnTabRef.current = currentTab;
    if (tab !== "add") returnTabRef.current = tab;
    activeTabRef.current = tab;
    setActiveTab(tab);
    window.history.replaceState(null, "", `#${tab}`);
  };

  const updateData = (recipe: (current: AppData) => AppData) => setData((current) => (current ? recipe(current) : current));
  const ensureDayMeals = (current: AppData, dateKey: string) => {
    if (current.entries[dateKey]) return current.entries[dateKey];
    current.entries[dateKey] = [];
    return current.entries[dateKey];
  };

  const addFoodToMeal = (food: FoodItem, mealName = selectedMealName, quantity = 1, source: FoodLogItem["source"] = "bank") => {
    let targetMealName = mealName;
    updateData((current) => {
      const next = structuredClone(current) as AppData;
      const meals = ensureDayMeals(next, selectedDate);
      targetMealName = mealName === "Snack" ? nextSnackName(meals) : mealName;
      let meal = meals.find((item) => item.name === targetMealName);
      if (!meal) {
        meal = { id: uid("meal"), name: targetMealName, time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }), foods: [] };
        meals.push(meal);
      }
      meal.foods.push(foodToLog(food, quantity, source));
      next.recentFoodIds = [food.id, ...next.recentFoodIds.filter((id) => id !== food.id)].slice(0, 8);
      next.expandedMeals = [targetMealName];
      return next;
    });
    setSelectedMealName(targetMealName);
    showNotice(`${food.name} added to ${targetMealName}`);
  };

  const deleteFood = (mealId: string, itemId: string) => updateData((current) => {
    const next = structuredClone(current) as AppData;
    const meal = next.entries[selectedDate]?.find((item) => item.id === mealId);
    if (meal) meal.foods = meal.foods.filter((food) => food.id !== itemId);
    return next;
  });

  const updateMealFood = (mealId: string, itemId: string, quantity: number) => updateData((current) => {
    const next = structuredClone(current) as AppData;
    const meal = next.entries[selectedDate]?.find((item) => item.id === mealId);
    const food = meal?.foods.find((item) => item.id === itemId);
    const baseFood = food ? next.foods.find((item) => item.id === food.foodId) : null;
    if (food && baseFood) {
      const nextQuantity = Math.max(0.25, Math.min(5, quantity));
      Object.assign(food, foodToLog(baseFood, nextQuantity, food.source), { id: itemId });
    }
    return next;
  });

  const moveMealFood = (fromMealId: string, itemId: string, toMealName: MealName, beforeItemId?: string) => updateData((current) => {
    const next = structuredClone(current) as AppData;
    const meals = ensureDayMeals(next, selectedDate);
    const fromMeal = meals.find((item) => item.id === fromMealId);
    const movingFood = fromMeal?.foods.find((food) => food.id === itemId);
    if (!fromMeal || !movingFood) return next;
    if (fromMeal.name === toMealName && itemId === beforeItemId) return next;
    fromMeal.foods = fromMeal.foods.filter((food) => food.id !== itemId);
    const targetMealName = toMealName === "Snack" ? nextSnackName(meals) : toMealName;
    let toMeal = meals.find((item) => item.name === targetMealName);
    if (!toMeal) {
      toMeal = { id: uid("meal"), name: targetMealName, time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }), foods: [] };
      meals.push(toMeal);
    }
    const insertIndex = beforeItemId ? toMeal.foods.findIndex((food) => food.id === beforeItemId) : -1;
    if (insertIndex >= 0) toMeal.foods.splice(insertIndex, 0, movingFood);
    else toMeal.foods.push(movingFood);
    next.expandedMeals = [targetMealName];
    return next;
  });

  const reorderMeals = (fromMealId: string, beforeMealId: string) => updateData((current) => {
    if (fromMealId === beforeMealId) return current;
    const next = structuredClone(current) as AppData;
    const meals = ensureDayMeals(next, selectedDate);
    const fromIndex = meals.findIndex((meal) => meal.id === fromMealId);
    const beforeIndex = meals.findIndex((meal) => meal.id === beforeMealId);
    if (fromIndex < 0 || beforeIndex < 0) return next;
    const [movingMeal] = meals.splice(fromIndex, 1);
    const nextBeforeIndex = meals.findIndex((meal) => meal.id === beforeMealId);
    meals.splice(nextBeforeIndex >= 0 ? nextBeforeIndex : beforeIndex, 0, movingMeal);
    return next;
  });

  const deleteMeal = (mealId: string) => updateData((current) => {
    const next = structuredClone(current) as AppData;
    const deletedMeal = next.entries[selectedDate]?.find((meal) => meal.id === mealId);
    next.entries[selectedDate] = (next.entries[selectedDate] ?? []).filter((meal) => meal.id !== mealId);
    if (deletedMeal) next.expandedMeals = next.expandedMeals.filter((name) => name !== deletedMeal.name);
    return next;
  });

  const addMeal = () => updateData((current) => {
    const next = structuredClone(current) as AppData;
    const meals = ensureDayMeals(next, selectedDate);
    const available = primaryMealNames.find((name) => !meals.some((meal) => meal.name === name)) ?? nextSnackName(meals);
    meals.push({ id: uid("meal"), name: available, time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }), foods: [] });
    next.expandedMeals = [available];
    setSelectedMealName(available);
    return next;
  });

  const toggleFavorite = (foodId: string) => updateData((current) => {
    const next = structuredClone(current) as AppData;
    next.favorites = next.favorites.includes(foodId) ? next.favorites.filter((id) => id !== foodId) : [...next.favorites, foodId];
    return next;
  });

  const authSubmit = (mode: AuthMode, email: string, password: string, confirmPassword: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const accounts = readJson<Account[]>(ACCOUNTS_KEY, []);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) return "Use a valid email.";
    if (password.length < 6) return "Password needs at least 6 characters.";
    if (mode === "register") {
      if (password !== confirmPassword) return "Passwords do not match.";
      if (accounts.some((item) => item.email === normalizedEmail)) return "This email is already registered.";
      const nextAccount = { id: uid("user"), email: normalizedEmail, password };
      writeJson(ACCOUNTS_KEY, [...accounts, nextAccount]);
      writeJson(SESSION_KEY, { userId: nextAccount.id });
      setAccount(nextAccount);
      showNotice("Registered. Your data stays on this device.");
      return "";
    }
    const found = accounts.find((item) => item.email === normalizedEmail);
    if (!found) return "Email not found. Register first.";
    if (found.password !== password) return "Wrong password.";
    writeJson(SESSION_KEY, { userId: found.id });
    setAccount(found);
    showNotice("Welcome back.");
    return "";
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setAccount(null);
    setData(null);
    window.history.replaceState(null, "", "#log");
    setActiveTab("log");
  };

  const resetDemoData = () => {
    if (!account || !window.confirm("Reset local demo data on this device?")) return;
    const next = makeDefaultData();
    setData(next);
    writeJson(dataKey(account.id), next);
    showNotice("Demo data reset.");
  };

  if (!account || !data) {
    return (
      <main className="stage">
        <section className="phone" aria-label="Intake sign in">
          <StatusBar />
          <AuthScreen onSubmit={authSubmit} />
          {notice ? <Toast message={notice} /> : null}
        </section>
      </main>
    );
  }

  const mealsForDay = data.entries[selectedDate] ?? [];
  const healthForDay = data.health[selectedDate] ?? { active: 0, exercise: 0, steps: 0 };

  return (
    <main className="stage">
      <section className="phone" aria-label="Intake app">
        <StatusBar />
        <div className={activeTab === "add" ? "scroll-page add-page-shell" : activeTab === "bank" ? "scroll-page bank-page" : "scroll-page"} key={activeTab}>
          {activeTab === "me" ? (
            <MePage account={account} data={data} onLogout={logout} onReset={resetDemoData} onUpdate={updateData} />
          ) : null}
          {activeTab === "log" ? (
            <LogPage
              data={data}
              health={healthForDay}
              meals={mealsForDay}
              selectedDate={selectedDate}
              onAddFood={(meal) => navigateTab("add", meal)}
              onAddMeal={addMeal}
              onDateChange={setSelectedDate}
              onDeleteFood={deleteFood}
              onDeleteMeal={deleteMeal}
              onMoveFood={moveMealFood}
              onReorderMeal={reorderMeals}
              onToggleMeal={(mealName) =>
                updateData((current) => {
                  const next = structuredClone(current) as AppData;
                  next.expandedMeals = next.expandedMeals.includes(mealName)
                    ? []
                    : [mealName];
                  return next;
                })
              }
              onUpdateFood={updateMealFood}
            />
          ) : null}
          {activeTab === "bank" ? (
            <BankPage
              activeFilter={bankFilter}
              data={data}
              onAddFood={addFoodToMeal}
              onToggleFavorite={toggleFavorite}
              search={bankSearch}
            />
          ) : null}
          {activeTab === "add" ? (
            <AddPage
              allFoods={data.foods}
              currentMeal={selectedMealName}
              meals={mealsForDay}
              onAddFood={addFoodToMeal}
              onClose={() => navigateTab(returnTabRef.current === "add" ? "log" : returnTabRef.current)}
              onDeleteFood={deleteFood}
              onMealChange={setSelectedMealName}
              onUpdateFood={updateMealFood}
              recentFoodIds={data.recentFoodIds}
            />
          ) : null}
        </div>

        {activeTab === "bank" ? (
          <BankControls activeFilter={bankFilter} onFilterChange={setBankFilter} search={bankSearch} onSearchChange={setBankSearch} />
        ) : null}

        <nav className={activeTab === "add" ? "tabbar hidden" : "tabbar"} aria-label="Prototype tabs">
          <div className="tab-cluster">
            <TabButton active={activeTab === "bank"} icon={<Search size={20} />} label="Bank" onClick={() => navigateTab("bank")} />
            <TabButton active={activeTab === "me"} icon={<UserRound size={20} />} label="Me" onClick={() => navigateTab("me")} />
            <TabButton active={activeTab === "log"} icon={<Activity size={20} />} label="Log" onClick={() => navigateTab("log")} />
          </div>
          <button className={activeTab === "add" ? "add-tab active" : "add-tab"} type="button" aria-label="Record meal" onClick={() => navigateTab("add", selectedMealName)}>
            <Plus size={29} />
          </button>
        </nav>
        {notice ? <Toast message={notice} /> : null}
      </section>
    </main>
  );
}

function AuthScreen({ onSubmit }: { onSubmit: (mode: AuthMode, email: string, password: string, confirmPassword: string) => string }) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("tao@example.com");
  const [password, setPassword] = useState("intake1");
  const [confirmPassword, setConfirmPassword] = useState("intake1");
  const [error, setError] = useState("");
  return (
    <div className="auth-screen">
      <section className="glass-card auth-card">
        <div className="auth-brand">
          <span>Intake</span>
          <h1>{mode === "login" ? "Welcome back" : "Create account"}</h1>
          <p>Email only verifies login. Meal data stays on this device.</p>
        </div>
        <label className="form-field">
          <span>Email</span>
          <input autoComplete="email" inputMode="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label className="form-field">
          <span>Password</span>
          <input autoComplete={mode === "login" ? "current-password" : "new-password"} type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        {mode === "register" ? (
          <label className="form-field">
            <span>Confirm</span>
            <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
          </label>
        ) : null}
        {error ? <p className="form-error">{error}</p> : null}
        <button
          className="primary-action"
          type="button"
          onClick={() => {
            const nextError = onSubmit(mode, email, password, confirmPassword);
            setError(nextError);
          }}
        >
          {mode === "login" ? "Log in" : "Register"}
        </button>
        <button className="link-button center" type="button" onClick={() => setMode(mode === "login" ? "register" : "login")}>
          {mode === "login" ? "Need an account? Register" : "Have an account? Log in"}
        </button>
      </section>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="statusbar" aria-hidden="true">
      <span>9:41</span>
      <span className="system-icons">5G  ▰</span>
    </div>
  );
}

function TabButton({ active, icon, label, onClick }: { active: boolean; icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button className={active ? "tab active" : "tab"} type="button" onClick={onClick}>
      {icon}
      <span>{label}</span>
    </button>
  );
}

function LogPage({
  data,
  health,
  meals,
  selectedDate,
  onAddFood,
  onAddMeal,
  onDateChange,
  onDeleteFood,
  onDeleteMeal,
  onMoveFood,
  onReorderMeal,
  onToggleMeal,
  onUpdateFood,
}: {
  data: AppData;
  health: HealthDay;
  meals: MealEntry[];
  selectedDate: string;
  onAddFood: (mealName: MealName) => void;
  onAddMeal: () => void;
  onDateChange: (date: string) => void;
  onDeleteFood: (mealId: string, itemId: string) => void;
  onDeleteMeal: (mealId: string) => void;
  onMoveFood: (mealId: string, itemId: string, toMealName: MealName, beforeItemId?: string) => void;
  onReorderMeal: (fromMealId: string, beforeMealId: string) => void;
  onToggleMeal: (mealName: MealName) => void;
  onUpdateFood: (mealId: string, itemId: string, quantity: number) => void;
}) {
  const totals = dayTotals(meals);
  const budget = data.goals.dailyKcal + health.active;
  const remaining = budget - totals.kcal;
  const macroRows = [
    { name: "Protein", value: totals.protein, target: data.goals.protein, tone: "protein" },
    { name: "Carbs", value: totals.carbs, target: data.goals.carbs, tone: "carbs" },
    { name: "Fat", value: totals.fat, target: data.goals.fat, tone: "fat" },
  ] as const;
  return (
    <>
      <DateRail data={data} selectedDate={selectedDate} onSelect={onDateChange} />
      <section className="glass-card hero-card">
        <div className="card-title-row">
          <div>
            <p className="eyebrow">Energy Budget</p>
            <h2>{Math.abs(remaining).toLocaleString()} kcal {remaining >= 0 ? "left" : "over"}</h2>
          </div>
          <span className="sync-pill"><HeartPulse size={14} />Live</span>
        </div>
        <div className="energy-layout">
          <EnergyRing remaining={remaining} budget={budget} burned={health.active} />
          <div className="metric-grid">
            <Metric label="Eaten" value={totals.kcal.toLocaleString()} icon={<Utensils size={15} />} />
            <Metric label="Burned" value={health.active.toLocaleString()} icon={<Flame size={15} />} />
            <Metric label="Target" value={budget.toLocaleString()} icon={<Activity size={15} />} />
          </div>
        </div>
      </section>
      <MacroCard rows={macroRows} />
      <FitnessCard health={health} />
      <MealsCard data={data} meals={meals} onAddFood={onAddFood} onAddMeal={onAddMeal} onDeleteFood={onDeleteFood} onDeleteMeal={onDeleteMeal} onMoveFood={onMoveFood} onReorderMeal={onReorderMeal} onToggleMeal={onToggleMeal} onUpdateFood={onUpdateFood} />
    </>
  );
}

function DateRail({ data, selectedDate, onSelect }: { data: AppData; selectedDate: string; onSelect: (date: string) => void }) {
  const railRef = useRef<HTMLElement | null>(null);
  const days = Array.from({ length: 21 }, (_, index) => index - 20).map((offset) => {
    const key = addDays(todayKey(), offset);
    const totals = dayTotals(data.entries[key] ?? []);
    const health = data.health[key] ?? { active: 0, exercise: 0, steps: 0 };
    const budget = data.goals.dailyKcal + health.active;
    const delta = totals.kcal - budget;
    const eatenRatio = budget > 0 ? Math.max(0, Math.min(1, totals.kcal / budget)) : 0;
    const state = delta > 0 ? "surplus" : eatenRatio < 0.5 ? "low" : delta === 0 ? "balanced" : "deficit";
    const labels = dayLabel(key);
    return { key, delta: delta === 0 ? "0" : delta > 0 ? `+${delta}` : `${delta}`, fill: delta > 0 ? "100%" : `${Math.round(eatenRatio * 100)}%`, state, ...labels };
  });

  useEffect(() => {
    railRef.current?.querySelector<HTMLButtonElement>(`[data-date="${selectedDate}"]`)?.scrollIntoView({ inline: "center", block: "nearest" });
  }, [selectedDate]);

  return (
    <section className="glass-card date-rail" ref={railRef} aria-label="Date rail">
      {days.map((day) => (
        <button className={`date-chip ${day.state}${day.key === selectedDate ? " active" : ""}`} data-date={day.key} key={day.key} onClick={() => onSelect(day.key)} style={{ "--fill": day.fill } as React.CSSProperties}>
          <strong>{day.delta}</strong><small>kcal</small><span>{day.weekday}</span><em>{day.date}</em>
        </button>
      ))}
    </section>
  );
}

function EnergyRing({ remaining, budget, burned }: { remaining: number; budget: number; burned: number }) {
  const radius = 118;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference * Math.max(0.04, Math.min(1, (budget - Math.max(0, remaining)) / budget));
  return (
    <div className="ring-wrap">
      <svg viewBox="0 0 280 280" role="img" aria-label="Daily energy budget progress">
        <circle className="ring-track" cx="140" cy="140" r={radius} />
        <circle className="ring-progress" cx="140" cy="140" r={radius} strokeDasharray={`${progress} ${circumference - progress}`} />
      </svg>
      <div className="ring-center">
        <RingStat label={remaining >= 0 ? "Remaining" : "Over"} value={Math.abs(remaining).toLocaleString()} unit="kcal" />
        <RingStat label="Burned" value={burned.toLocaleString()} unit="kcal" />
      </div>
    </div>
  );
}

function RingStat({ label, value, unit }: { label: string; value: string; unit: string }) {
  return <div className="ring-stat"><span>{label}</span><strong>{value}</strong><small>{unit}</small></div>;
}

function Metric({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return <div className="metric"><span>{icon}</span><strong>{value}</strong><small>{label}</small></div>;
}

function MacroCard({ rows }: { rows: readonly { name: string; value: number; target: number; tone: "protein" | "carbs" | "fat" }[] }) {
  return (
    <section className="glass-card content-card">
      <div className="card-title-row compact"><h2>Macros</h2><span className="link-button">Live</span></div>
      <div className="macro-list">
        {rows.map((row) => {
          const percent = Math.min(999, Math.round((row.value / row.target) * 100));
          return <MacroRow key={row.name} name={row.name} value={row.value} target={row.target} percent={percent} tone={row.tone} />;
        })}
      </div>
    </section>
  );
}

function MacroRow({ name, value, target, percent, tone }: { name: string; value: number; target: number; percent: number; tone: "protein" | "carbs" | "fat" }) {
  return (
    <div className="macro-row">
      <div className={`macro-dot ${tone}`}>{name.slice(0, 1)}</div>
      <div className="macro-main">
        <div className="macro-copy"><strong>{name}</strong><span>{value}g / {target}g</span></div>
        <div className="progress-track"><span className={tone} style={{ width: `${Math.min(100, percent)}%` }} /></div>
      </div>
      <span className="macro-percent">{percent}%</span>
    </div>
  );
}

function FitnessCard({ health }: { health: HealthDay }) {
  return (
    <section className="glass-card content-card fitness-card">
      <div className="card-title-row compact">
        <div><p className="eyebrow">Synced from Fitness</p><h2>Move today</h2></div>
        <span className="sync-pill"><Apple size={14} />Mock</span>
      </div>
      <div className="fitness-grid">
        <FitnessMetric label="Active" value={health.active.toLocaleString()} unit="kcal" icon={<Flame size={15} />} tone="move" />
        <FitnessMetric label="Exercise" value={health.exercise.toString()} unit="min" icon={<Timer size={15} />} tone="exercise" />
        <FitnessMetric label="Steps" value={`${(health.steps / 1000).toFixed(1)}k`} unit="today" icon={<Footprints size={15} />} tone="steps" />
      </div>
    </section>
  );
}

function FitnessMetric({ label, value, unit, icon, tone }: { label: string; value: string; unit: string; icon: React.ReactNode; tone: "move" | "exercise" | "steps" }) {
  return <div className={`fitness-metric ${tone}`}><span>{icon}</span><strong>{value}</strong><small>{label}</small><em>{unit}</em></div>;
}

function MealsCard({ data, meals, onAddFood, onAddMeal, onDeleteFood, onDeleteMeal, onMoveFood, onReorderMeal, onToggleMeal, onUpdateFood }: {
  data: AppData;
  meals: MealEntry[];
  onAddFood: (mealName: MealName) => void;
  onAddMeal: () => void;
  onDeleteFood: (mealId: string, itemId: string) => void;
  onDeleteMeal: (mealId: string) => void;
  onMoveFood: (mealId: string, itemId: string, toMealName: MealName, beforeItemId?: string) => void;
  onReorderMeal: (fromMealId: string, beforeMealId: string) => void;
  onToggleMeal: (mealName: MealName) => void;
  onUpdateFood: (mealId: string, itemId: string, quantity: number) => void;
}) {
  const mealOptions = meals.map((meal) => meal.name);
  return (
    <section className="glass-card content-card meals-section" aria-label="Meals">
      <div className="meal-card-list">
        {meals.length ? meals.map((meal) => (
          <MealCard key={meal.id} expanded={data.expandedMeals.includes(meal.name)} meal={meal} mealOptions={mealOptions} onAddFood={() => onAddFood(meal.name)} onDeleteFood={onDeleteFood} onDeleteMeal={onDeleteMeal} onDropFood={onMoveFood} onMoveFood={onMoveFood} onReorderMeal={onReorderMeal} onToggle={() => onToggleMeal(meal.name)} onUpdateFood={onUpdateFood} />
        )) : <div className="empty-state">No meals yet. Add a meal to start today.</div>}
        <button className="meal-add-large" aria-label="Add meal" onClick={onAddMeal} type="button"><span><Plus size={24} /></span><strong>Add meal</strong><small>New entry</small></button>
      </div>
    </section>
  );
}

function MealCard({ meal, expanded, mealOptions, onAddFood, onDeleteFood, onDeleteMeal, onDropFood, onMoveFood, onReorderMeal, onToggle, onUpdateFood }: {
  meal: MealEntry;
  expanded: boolean;
  mealOptions: string[];
  onAddFood: () => void;
  onDeleteFood: (mealId: string, itemId: string) => void;
  onDeleteMeal: (mealId: string) => void;
  onDropFood: (mealId: string, itemId: string, toMealName: MealName, beforeItemId?: string) => void;
  onMoveFood: (mealId: string, itemId: string, toMealName: MealName, beforeItemId?: string) => void;
  onReorderMeal: (fromMealId: string, beforeMealId: string) => void;
  onToggle: () => void;
  onUpdateFood: (mealId: string, itemId: string, quantity: number) => void;
}) {
  const totals = mealTotals(meal);
  const [editingFoodId, setEditingFoodId] = useState("");
  const readFoodDrag = (event: React.DragEvent) => {
    const payload = event.dataTransfer.getData("application/x-intake-food");
    return payload ? (JSON.parse(payload) as { mealId: string; itemId: string }) : null;
  };
  const readMealDrag = (event: React.DragEvent) => event.dataTransfer.getData("application/x-intake-meal");
  return (
    <article
      className={expanded ? "glass-card meal-card expanded" : "glass-card meal-card"}
      draggable
      onDragOver={(event) => event.preventDefault()}
      onDragStart={(event) => {
        event.dataTransfer.setData("application/x-intake-meal", meal.id);
        event.dataTransfer.effectAllowed = "move";
      }}
      onDrop={(event) => {
        const movingMealId = readMealDrag(event);
        if (movingMealId) {
          event.preventDefault();
          onReorderMeal(movingMealId, meal.id);
          return;
        }
        const foodPayload = readFoodDrag(event);
        if (!foodPayload) return;
        event.preventDefault();
        onDropFood(foodPayload.mealId, foodPayload.itemId, meal.name);
      }}
    >
      <button className="meal-card-head" aria-expanded={expanded} onClick={onToggle} type="button">
        <span className="meal-card-art">{mealIcon(meal.name)}</span>
        <span className="meal-card-copy"><strong>{meal.name}</strong><small>{meal.time} · {meal.foods.length} items</small><em>P {totals.protein}g · C {totals.carbs}g · F {totals.fat}g</em></span>
        <span className="meal-card-meta"><b>{totals.kcal} kcal</b><ChevronRight size={17} /></span>
      </button>
      {expanded ? (
        <div className="meal-card-body">
          <div className="meal-card-toolbar"><span>{meal.foods.length ? "Meal foods" : "Empty meal"}</span><button aria-label={`Add food to ${meal.name}`} onClick={onAddFood} type="button"><Plus size={18} /></button></div>
          <div className="meal-food-list">
            {meal.foods.length ? meal.foods.map((food) => (
              <div
                className={editingFoodId === food.id ? "meal-food-row editing" : "meal-food-row"}
                draggable
                key={food.id}
                onDragOver={(event) => event.preventDefault()}
                onDragStart={(event) => {
                  event.stopPropagation();
                  event.dataTransfer.setData("application/x-intake-food", JSON.stringify({ mealId: meal.id, itemId: food.id }));
                  event.dataTransfer.effectAllowed = "move";
                }}
                onDrop={(event) => {
                  event.stopPropagation();
                  const movingMealId = readMealDrag(event);
                  if (movingMealId) {
                    event.preventDefault();
                    onReorderMeal(movingMealId, meal.id);
                    return;
                  }
                  const payload = readFoodDrag(event);
                  if (!payload) return;
                  event.preventDefault();
                  onDropFood(payload.mealId, payload.itemId, meal.name, food.id);
                }}
              >
                <span className="meal-food-art">{food.emoji}</span><span className="meal-food-copy"><strong>{food.name}</strong><small>{food.serving} · {food.brand}</small></span><b>{food.kcal} kcal</b>
                <div className="meal-food-actions">
                  <button className="liquid-icon-button" aria-label={`Edit ${food.name}`} onClick={() => setEditingFoodId(editingFoodId === food.id ? "" : food.id)} type="button"><SlidersHorizontal size={15} /></button>
                  <button className="liquid-icon-button danger" aria-label={`Delete ${food.name}`} onClick={() => onDeleteFood(meal.id, food.id)} type="button"><Trash2 size={15} /></button>
                </div>
                {editingFoodId === food.id ? (
                  <div className="meal-food-editor">
                    <label><span>Serving</span><input inputMode="decimal" value={food.quantity} onChange={(event) => onUpdateFood(meal.id, food.id, Number(event.target.value) || 0.25)} /></label>
                    <label><span>Move</span><select value={meal.name} onChange={(event) => onMoveFood(meal.id, food.id, event.target.value)}>{mealOptions.map((name) => <option key={name}>{name}</option>)}</select></label>
                  </div>
                ) : null}
              </div>
            )) : <div className="empty-state small">No food in this meal.</div>}
          </div>
          <div className="meal-detail-actions"><button className="meal-delete-button" onClick={() => onDeleteMeal(meal.id)} type="button"><Trash2 size={16} />Delete {meal.name}</button></div>
        </div>
      ) : null}
    </article>
  );
}

function BankPage({ activeFilter, data, search, onAddFood, onToggleFavorite }: {
  activeFilter: string;
  data: AppData;
  search: string;
  onAddFood: (food: FoodItem, mealName?: MealName) => void;
  onToggleFavorite: (foodId: string) => void;
}) {
  const [selectedFood, setSelectedFood] = useState(data.foods[0]?.id ?? "");
  const normalizedSearch = search.trim().toLowerCase();
  const recentFoods = data.recentFoodIds.map((id) => data.foods.find((food) => food.id === id)).filter(Boolean) as FoodItem[];
  const filtered = data.foods.filter((food) => {
    const matchesSearch = !normalizedSearch || `${food.name} ${food.brand} ${food.tag}`.toLowerCase().includes(normalizedSearch);
    if (!matchesSearch) return false;
    if (activeFilter === "All") return true;
    if (activeFilter === "Recent") return data.recentFoodIds.includes(food.id);
    if (activeFilter === "Favorites") return data.favorites.includes(food.id);
    const tagByFilter: Record<string, FoodTag> = { Foods: "Food", Meals: "Meal", Brands: "Brand", Custom: "Custom" };
    return food.tag === tagByFilter[activeFilter];
  });
  return (
    <>
      <section className="glass-card content-card">
        <div className="card-title-row compact"><h2>Recent foods</h2><span>{recentFoods.length} items</span></div>
        <div className="food-card-list">{recentFoods.map((food) => <FoodCard key={food.id} food={food} expanded={selectedFood === food.id} favorite={data.favorites.includes(food.id)} onAdd={onAddFood} onToggle={() => setSelectedFood(selectedFood === food.id ? "" : food.id)} onToggleFavorite={onToggleFavorite} />)}</div>
      </section>
      <section className="glass-card content-card bank-library-card">
        <div className="card-title-row compact"><h2>Food library</h2><span>{filtered.length} items</span></div>
        <div className="food-card-list">{filtered.length ? filtered.map((food) => <FoodCard key={food.id} food={food} expanded={selectedFood === food.id} favorite={data.favorites.includes(food.id)} onAdd={onAddFood} onToggle={() => setSelectedFood(selectedFood === food.id ? "" : food.id)} onToggleFavorite={onToggleFavorite} />) : <div className="empty-state">No foods match this search.</div>}</div>
      </section>
    </>
  );
}

function FoodCard({ food, expanded, favorite, onAdd, onToggle, onToggleFavorite }: {
  food: FoodItem;
  expanded: boolean;
  favorite: boolean;
  onAdd: (food: FoodItem, mealName?: MealName) => void;
  onToggle: () => void;
  onToggleFavorite: (foodId: string) => void;
}) {
  return (
    <article className={expanded ? "food-card expanded" : "food-card"}>
      <button className="food-card-main" aria-pressed={expanded} onClick={onToggle} type="button">
        <span className="food-thumb">{food.emoji}{favorite ? <em><Star size={11} /></em> : null}</span><span className="food-card-copy"><strong>{food.name}</strong><small>{food.brand} · {food.serving}</small></span><span className="food-card-meta"><b>{food.kcal}</b><small>kcal</small></span>
      </button>
      {expanded ? (
        <div className="food-card-detail stack">
          <span className="nutrition-line">{food.protein}g protein · {food.carbs}g carbs · {food.fat}g fat</span>
          <div className="inline-actions bank-card-actions"><button className="favorite-action" onClick={() => onToggleFavorite(food.id)} type="button">{favorite ? "Unfavorite" : "Favorite"}</button><button className="add-food-action" onClick={() => onAdd(food)} type="button">Add</button></div>
        </div>
      ) : null}
    </article>
  );
}

function BankControls({ activeFilter, onFilterChange, search, onSearchChange }: { activeFilter: string; onFilterChange: (filter: string) => void; search: string; onSearchChange: (value: string) => void }) {
  return (
    <div className="bank-controls-dock" aria-label="Bank search and filters">
      <div className="filter-row">{bankFilters.map((filter) => <button aria-pressed={activeFilter === filter} className={activeFilter === filter ? "filter-chip active" : "filter-chip"} key={filter} onClick={() => onFilterChange(filter)} type="button">{filter}</button>)}</div>
      <label className="glass-card search-card search-input"><Search size={18} /><input placeholder="Search foods, meals, brands" value={search} onChange={(event) => onSearchChange(event.target.value)} /></label>
    </div>
  );
}

function AddPage({ allFoods, currentMeal, meals, onAddFood, onClose, onDeleteFood, onMealChange, onUpdateFood, recentFoodIds }: {
  allFoods: FoodItem[];
  currentMeal: MealName;
  meals: MealEntry[];
  onAddFood: (food: FoodItem, mealName?: MealName, quantity?: number, source?: FoodLogItem["source"]) => void;
  onClose: () => void;
  onDeleteFood: (mealId: string, itemId: string) => void;
  onMealChange: (meal: MealName) => void;
  onUpdateFood: (mealId: string, itemId: string, quantity: number) => void;
  recentFoodIds: string[];
}) {
  const sheetHeights: Record<SheetLevel, number> = { peek: 108, mid: 510, expanded: 642 };
  const [sheetLevel, setSheetLevel] = useState<SheetLevel>("peek");
  const [sheetHeight, setSheetHeight] = useState(sheetHeights.peek);
  const [sheetDragging, setSheetDragging] = useState(false);
  const [candidateServings, setCandidateServings] = useState<Record<string, number>>({});
  const [expandedMealItem, setExpandedMealItem] = useState("new-0");
  const [query, setQuery] = useState("");
  const dragStartRef = useRef({ y: 0, height: sheetHeights.peek, level: "peek" as SheetLevel });
  const dragMovedRef = useRef(false);
  const sheetHeightRef = useRef(sheetHeights.peek);
  const currentMealEntry = meals.find((meal) => meal.name === currentMeal);
  const currentMealFoods = currentMealEntry?.foods ?? [];
  const mealPickerOptions = [
    ...new Set([
      ...meals.map((meal) => meal.name),
      ...primaryMealNames.filter((name) => !meals.some((meal) => meal.name === name)),
      "Snack",
      currentMeal,
    ]),
  ].filter(Boolean);
  const recentFoods = recentFoodIds.map((id) => allFoods.find((food) => food.id === id)).filter(Boolean) as FoodItem[];
  const searchedFoods = allFoods.filter((food) => `${food.name} ${food.brand} ${food.tag}`.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
  const cameraActionsHidden = sheetHeight > 430;
  const cameraActionsBottom = Math.min(520, Math.max(124, sheetHeight + 16));
  const hasEditedCandidates = Object.values(candidateServings).some((value) => value !== 1);
  const hasUnsavedChanges = hasEditedCandidates || query.trim().length > 0;
  const currentMealLabel = currentMeal === "Snack" ? "New Snack" : currentMeal;

  const closeWithUnsavedCheck = () => {
    if (!hasUnsavedChanges || window.confirm("Discard unsaved food edits?")) onClose();
  };

  const setCandidateServing = (key: string, next: number) => setCandidateServings((current) => ({ ...current, [key]: Math.max(0.25, Math.min(5, next)) }));
  const saveCandidate = (choice: (typeof detectedChoices)[number], key: string) => {
    const food = allFoods.find((item) => item.id === choice.foodId);
    if (!food) return;
    onAddFood(food, currentMeal, candidateServings[key] ?? 1, "scan");
    setCandidateServings((current) => ({ ...current, [key]: 1 }));
    setExpandedMealItem("");
  };

  const setSheetToLevel = (level: SheetLevel) => {
    setSheetLevel(level);
    setSheetHeight(sheetHeights[level]);
    sheetHeightRef.current = sheetHeights[level];
  };
  const updateSheetDrag = (clientY: number) => {
    const delta = dragStartRef.current.y - clientY;
    if (Math.abs(delta) > 6) dragMovedRef.current = true;
    const nextHeight = Math.max(sheetHeights.peek, Math.min(sheetHeights.expanded, dragStartRef.current.height + delta));
    setSheetHeight(nextHeight);
    sheetHeightRef.current = nextHeight;
  };
  const finishSheetDrag = () => {
    if (!sheetDragging) return;
    setSheetDragging(false);
    const delta = sheetHeightRef.current - dragStartRef.current.height;
    if (!dragMovedRef.current) return setSheetToLevel(dragStartRef.current.level);
    if (delta >= 72) return setSheetToLevel("expanded");
    if (delta <= -72) return setSheetToLevel("peek");
    setSheetToLevel(dragStartRef.current.level);
  };
  useEffect(() => {
    if (!sheetDragging) return;
    const move = (event: PointerEvent) => updateSheetDrag(event.clientY);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", finishSheetDrag);
    window.addEventListener("pointercancel", finishSheetDrag);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", finishSheetDrag);
      window.removeEventListener("pointercancel", finishSheetDrag);
    };
  }, [sheetDragging]);

  return (
    <section className="add-camera-screen" aria-label="Record meal camera">
      <div className="add-top-controls"><button className="camera-close" aria-label="Close" onClick={closeWithUnsavedCheck} type="button"><X size={24} /></button><button className="auto-pill">AI Rec<span /></button></div>
      <div className="camera-preview"><div className="scan-ring" /></div>
      <div className={cameraActionsHidden ? "camera-actions hidden" : "camera-actions"} style={{ "--camera-actions-bottom": `${cameraActionsBottom}px` } as React.CSSProperties}>
        <button className="camera-side-action" aria-label="Open photo library"><ImagePlus size={22} /></button><button className="shutter" aria-label="Take photo"><Camera size={26} /></button><button className="camera-side-action" aria-label="Voice input"><Mic size={22} /></button>
      </div>
      <section className={`result-sheet ${sheetLevel !== "peek" ? "content-visible" : ""} ${sheetLevel === "expanded" ? "expanded" : ""} ${sheetDragging ? "dragging" : ""}`} style={{ "--sheet-height": `${sheetHeight}px` } as React.CSSProperties}>
        <button className="sheet-handle" aria-label={sheetLevel === "expanded" ? "Collapse detected foods" : "Expand detected foods"} aria-valuemax={sheetHeights.expanded} aria-valuemin={sheetHeights.peek} aria-valuenow={Math.round(sheetHeight)} onClick={() => !dragMovedRef.current && setSheetToLevel(sheetLevel === "expanded" ? "peek" : "expanded")} onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); dragStartRef.current = { y: event.clientY, height: sheetHeight, level: sheetLevel }; dragMovedRef.current = false; setSheetDragging(true); }} onPointerUp={finishSheetDrag} role="slider" type="button" />
        <label className="sheet-meal-pill">
          <span className="sheet-meal-label">{currentMealLabel}</span>
          <span className="sheet-meal-chevron"><ChevronRight size={15} /></span>
          <select aria-label="Select meal" value={currentMeal} onChange={(event) => onMealChange(event.target.value)}>{mealPickerOptions.map((name) => <option key={name} value={name}>{name === "Snack" ? "New Snack" : name}</option>)}</select>
        </label>
        <section className="add-food-section meal-editor-section" aria-label={`${currentMealLabel} foods`}>
          <div className="sheet-section-label"><span>{currentMealLabel}</span><small>{currentMealFoods.length + detectedChoices.length} items</small></div>
          <div className="meal-editor-list">
            {detectedChoices.map((choice, index) => {
              const key = `new-${index}`;
              const serving = candidateServings[key] ?? 1;
              return <MealEditorFoodRow key={key} expanded={expandedMealItem === key} food={{ id: key, name: choice.name, emoji: choice.emoji, detail: choice.detail, servingUnit: choice.servingUnit, kcalPerServing: choice.kcalPerServing, quantity: serving, kcal: Math.round(choice.kcalPerServing * serving), status: "Is new" }} onAdd={() => saveCandidate(choice, key)} onChangeServing={(next) => setCandidateServing(key, next)} onToggle={() => setExpandedMealItem(expandedMealItem === key ? "" : key)} />;
            })}
            {currentMealFoods.length ? currentMealFoods.map((food) => {
              const baseFood = allFoods.find((item) => item.id === food.foodId);
              const key = `saved-${food.id}`;
              return <MealEditorFoodRow key={food.id} expanded={expandedMealItem === key} food={{ id: food.id, name: food.name, emoji: food.emoji, detail: `${food.brand} · ${food.serving}`, servingUnit: baseFood?.serving ?? "serving", kcalPerServing: baseFood?.kcal ?? food.kcal, quantity: food.quantity, kcal: food.kcal, status: "Saved" }} onChangeServing={(next) => currentMealEntry && onUpdateFood(currentMealEntry.id, food.id, next)} onDelete={() => currentMealEntry && onDeleteFood(currentMealEntry.id, food.id)} onToggle={() => setExpandedMealItem(expandedMealItem === key ? "" : key)} />;
            }) : null}
          </div>
          <label className="sheet-search"><Search size={17} /><input placeholder="Search foods, brands, or meals" value={query} onChange={(event) => setQuery(event.target.value)} /><CheckSquare size={18} /></label>
        </section>
        <section className="add-food-section food-library-section"><div className="sheet-section-label"><span>Food library</span><small>Tap to add</small></div><FoodMiniList title="Recent" items={recentFoods} onAdd={(food) => onAddFood(food, currentMeal)} /><FoodMiniList title={query ? "Search results" : "All foods"} items={searchedFoods} onAdd={(food) => onAddFood(food, currentMeal)} /></section>
      </section>
    </section>
  );
}

function MealEditorFoodRow({ expanded, food, onAdd, onChangeServing, onDelete, onToggle }: {
  expanded: boolean;
  food: { id: string; name: string; emoji: string; detail: string; servingUnit: string; kcalPerServing: number; quantity: number; kcal: number; status: "Is new" | "Saved" };
  onAdd?: () => void;
  onChangeServing: (value: number) => void;
  onDelete?: () => void;
  onToggle: () => void;
}) {
  const [deleteRevealed, setDeleteRevealed] = useState(false);
  const swipeStartX = useRef<number | null>(null);
  const swipeMoved = useRef(false);
  const servingValue = food.quantity.toFixed(food.quantity % 1 === 0 ? 0 : 1);
  const baseServingLabel = /^\d/.test(food.servingUnit) ? food.servingUnit : `1 ${food.servingUnit}`;
  const servingUnitLabel = food.servingUnit.replace(/^1\s+/, "");
  return (
    <article
      className={`${expanded ? "meal-editor-food expanded" : "meal-editor-food"}${deleteRevealed ? " delete-revealed" : ""}`}
      onPointerDown={(event) => {
        swipeStartX.current = event.clientX;
        swipeMoved.current = false;
      }}
      onPointerUp={(event) => {
        if (swipeStartX.current === null) return;
        const delta = event.clientX - swipeStartX.current;
        swipeStartX.current = null;
        if (Math.abs(delta) < 28) return;
        swipeMoved.current = true;
        if (delta < -28 && onDelete) setDeleteRevealed(true);
        if (delta > 28) setDeleteRevealed(false);
      }}
    >
      <button className="meal-editor-main" aria-expanded={expanded} onClick={() => { if (!swipeMoved.current) onToggle(); }} type="button">
        <span className="detected-art">{food.emoji}</span>
        <span className="detected-copy"><strong>{food.name}<em className={food.status === "Is new" ? "food-status new" : "food-status added"}>{food.status}</em></strong><small>{food.detail}</small></span>
        <b>{food.kcal} kcal</b>
      </button>
      {(expanded || deleteRevealed) ? (
        <div className="detected-editor">
          {expanded ? <div className="serving-editor"><span><small>{baseServingLabel}</small><strong>{food.kcalPerServing} kcal</strong></span><div className="serving-stepper"><button aria-label="Decrease serving" onClick={() => onChangeServing(food.quantity - 0.1)} type="button"><Minus size={15} /></button><label aria-label={`Serving amount in ${servingUnitLabel}`}><input inputMode="decimal" value={servingValue} onChange={(event) => onChangeServing(Number(event.target.value) || 0.25)} /><small>{servingUnitLabel}</small></label><button aria-label="Increase serving" onClick={() => onChangeServing(food.quantity + 0.1)} type="button"><Plus size={15} /></button></div></div> : null}
          <div className="meal-editor-actions">{onDelete ? <button className="swipe-delete-action" onClick={onDelete} type="button"><Trash2 size={15} />Delete</button> : null}{onAdd ? <button className="add-food-action" onClick={onAdd} type="button">Add to meal</button> : null}</div>
        </div>
      ) : null}
    </article>
  );
}

function FoodMiniList({ title, items, onAdd }: { title: string; items: FoodItem[]; onAdd: (food: FoodItem) => void }) {
  return <div className="food-mini-group"><p>{title}</p><div className="food-mini-list">{items.length ? items.map((food) => <button className="food-mini-row" key={food.id} onClick={() => onAdd(food)} type="button"><span className="food-thumb mini">{food.emoji}</span><span><strong>{food.name}</strong><small>{food.brand} · {food.serving}</small></span><b>{food.kcal}</b></button>) : <div className="empty-state small">No foods found.</div>}</div></div>;
}

function MePage({ account, data, onLogout, onReset, onUpdate }: { account: Account; data: AppData; onLogout: () => void; onReset: () => void; onUpdate: (recipe: (current: AppData) => AppData) => void }) {
  const syncedProfile: Profile = { name: "Tao", weight: 78.4, height: 178, age: 34, activity: "Moderate" };
  const bodyStatusLabel = data.profileSource === "synced" ? "Synced" : "Custom";
  const goalStatusLabel = data.goalsSource === "synced" ? "Plan synced" : "Custom";
  const [bodyEditing, setBodyEditing] = useState(false);
  const [goalEditing, setGoalEditing] = useState(false);
  const [draftGoals, setDraftGoals] = useState(data.goals);
  const [draftProfile, setDraftProfile] = useState(data.profile);
  useEffect(() => {
    if (!goalEditing) setDraftGoals(data.goals);
    if (!bodyEditing) setDraftProfile(data.profile);
  }, [bodyEditing, data.goals, data.profile, goalEditing]);
  const resetBodyDraft = () => setDraftProfile(syncedProfile);
  const resetGoalDraft = () => setDraftGoals(goalsForPlan(draftGoals.plan, draftProfile));
  const saveBody = () => {
    onUpdate((current) => {
      const profile = draftProfile;
      return {
        ...current,
        profile,
        profileSource: isDefaultProfile(profile) ? "synced" : "edited",
        goals: current.goalsSource === "synced" ? goalsForPlan(current.goals.plan, profile) : current.goals,
      };
    });
    setBodyEditing(false);
  };
  const saveGoal = () => {
    const profile = { ...draftProfile, weight: draftGoals.currentWeight };
    const preset = goalsForPlan(draftGoals.plan, profile);
    const changed = [
      draftGoals.currentWeight !== preset.currentWeight ? `Current: ${preset.currentWeight} -> ${draftGoals.currentWeight} kg` : "",
      draftGoals.targetWeight !== preset.targetWeight ? `Target: ${preset.targetWeight} -> ${draftGoals.targetWeight} kg` : "",
      draftGoals.dailyKcal !== preset.dailyKcal ? `Daily: ${preset.dailyKcal} -> ${draftGoals.dailyKcal} kcal` : "",
      draftGoals.protein !== preset.protein ? `Protein: ${preset.protein} -> ${draftGoals.protein} g` : "",
    ].filter(Boolean);
    onUpdate((current) => ({ ...current, goals: draftGoals, goalsSource: isPlanGoal(draftGoals, profile) ? "synced" : "edited", profile }));
    setGoalEditing(false);
    window.alert(changed.length ? `已保存自定义目标：\n${changed.join("\n")}` : "已保存。目标仍匹配当前计划预设。");
  };
  const updatePlan = (plan: PlanType) => {
    if (plan === draftGoals.plan) return;
    window.alert("从今天开始生效，之前的数据不会变动。");
    const nextGoals = goalsForPlan(plan, draftProfile);
    setDraftGoals(nextGoals);
    onUpdate((current) => ({ ...current, goals: goalsForPlan(plan, current.profile), goalsSource: "synced" }));
  };
  const updateProfile = (patch: Partial<Profile>) => {
    setDraftProfile({ ...draftProfile, ...patch });
  };
  return (
    <>
      <section className="glass-card profile-card"><div className="avatar">T</div><div className="profile-copy"><h2>{data.profile.name}</h2><p>{data.goals.plan} · {data.goalsSource === "synced" ? "Plan synced" : "Goal edited"}</p><small>{account.email}</small></div><span className="status-chip">Signed in</span></section>
      <section className="glass-card content-card"><div className="card-title-row compact"><h2>Plan settings</h2><SourceBadge source="synced" label="Presets" /></div><div className="segmented-list">{planOptions.map((plan) => <button className={draftGoals.plan === plan ? "filter-chip active" : "filter-chip"} key={plan} onClick={() => updatePlan(plan)} type="button">{plan}</button>)}</div></section>
      <section className="glass-card content-card"><div className="card-title-row compact"><h2>Body data</h2><div className="title-actions"><SourceBadge source={data.profileSource} label={bodyStatusLabel} />{bodyEditing ? <button className="reset-action" aria-label="Reset body data" onClick={resetBodyDraft} type="button"><RotateCcw size={14} /></button> : null}<button className="link-button" onClick={() => (bodyEditing ? saveBody() : setBodyEditing(true))} type="button">{bodyEditing ? "Save" : "Edit"}</button></div></div><div className="settings-list"><NumberSetting editing={bodyEditing} label="Weight" source={data.profileSource} unit="kg" value={draftProfile.weight} onChange={(weight) => updateProfile({ weight })} /><NumberSetting editing={bodyEditing} label="Height" source={data.profileSource} unit="cm" value={draftProfile.height} onChange={(height) => updateProfile({ height })} /><NumberSetting editing={bodyEditing} label="Age" source={data.profileSource} unit="years" value={draftProfile.age} onChange={(age) => updateProfile({ age })} /><ActivitySetting editing={bodyEditing} source={data.profileSource} value={draftProfile.activity} onChange={(activity) => updateProfile({ activity })} /></div></section>
      <section className="glass-card content-card"><div className="card-title-row compact"><h2>Goal summary</h2><div className="title-actions"><SourceBadge source={data.goalsSource} label={goalStatusLabel} />{goalEditing ? <button className="reset-action" aria-label="Reset goal" onClick={resetGoalDraft} type="button"><RotateCcw size={14} /></button> : null}<button className="link-button" onClick={() => (goalEditing ? saveGoal() : setGoalEditing(true))} type="button">{goalEditing ? "Save" : "Edit"}</button></div></div><div className="summary-grid"><SummaryTile label="Current" value={draftGoals.currentWeight.toString()} unit="kg" editing={goalEditing} onChange={(v) => setDraftGoals({ ...draftGoals, currentWeight: Number(v) || 0 })} /><SummaryTile label="Target" value={draftGoals.targetWeight.toString()} unit="kg" editing={goalEditing} onChange={(v) => setDraftGoals({ ...draftGoals, targetWeight: Number(v) || 0 })} /><SummaryTile label="Daily" value={draftGoals.dailyKcal.toString()} unit="kcal" editing={goalEditing} onChange={(v) => setDraftGoals({ ...draftGoals, dailyKcal: Number(v) || 0 })} /><SummaryTile label="Protein" value={draftGoals.protein.toString()} unit="g" editing={goalEditing} onChange={(v) => setDraftGoals({ ...draftGoals, protein: Number(v) || 0 })} /></div></section>
      <section className="glass-card content-card"><div className="card-title-row compact"><h2>Settings</h2></div><div className="settings-list"><SettingsRow icon={<Lock size={17} />} title="Privacy" detail="Email is for sign-in; meals, goals, and mock Health stay here, not on NAS" /><SettingsRow icon={<Camera size={17} />} title="Demo boundaries" detail="Camera, Health, voice, and barcode are mock for P0.1" /><ActionRow icon={<SlidersHorizontal size={17} />} title="Reset demo data" detail="Restore default local records" onClick={onReset} /></div></section>
      <button className="danger-action" onClick={onLogout} type="button"><X size={18} /><span><strong>Log out</strong><small>Keep local data on this device</small></span></button>
    </>
  );
}

function SourceBadge({ source, label }: { source: DataSource; label: string }) {
  return <span className={`source-badge ${source}`}>{label}</span>;
}

function SummaryTile({ label, value, unit, editing = false, onChange }: { label: string; value: string; unit: string; editing?: boolean; onChange?: (value: string) => void }) {
  return <div className="summary-tile"><span>{label}</span>{editing ? <input aria-label={`${label} goal value`} className="summary-value-input" inputMode="decimal" value={value} onChange={(event) => onChange?.(event.target.value)} /> : <strong>{Number(value).toLocaleString("en-US")}</strong>}<small>{unit}</small></div>;
}

function NumberSetting({ editing, label, source, unit, value, onChange }: { editing: boolean; label: string; source: DataSource; unit: string; value: number; onChange: (value: number) => void }) {
  return <label className={`settings-row editable-row ${source}${editing ? " editing" : ""}`}><span className="settings-icon"><Activity size={17} /></span><span><strong>{label}</strong><small>{unit}</small></span>{editing ? <input inputMode="decimal" value={value} onChange={(event) => onChange(Number(event.target.value) || 0)} /> : <span className="setting-plain-value">{value}</span>}</label>;
}

function ActivitySetting({ editing, source, value, onChange }: { editing: boolean; source: DataSource; value: Profile["activity"]; onChange: (value: Profile["activity"]) => void }) {
  return <label className={`settings-row editable-row ${source}${editing ? " editing" : ""}`}><span className="settings-icon"><Timer size={17} /></span><span><strong>Activity</strong><small>daily level</small></span>{editing ? <select value={value} onChange={(event) => onChange(event.target.value as Profile["activity"])}><option>Low</option><option>Moderate</option><option>High</option></select> : <span className="setting-plain-value">{value}</span>}</label>;
}

function SettingsRow({ icon, title, detail }: { icon: React.ReactNode; title: string; detail: string }) {
  return <button className="settings-row" type="button"><span className="settings-icon">{icon}</span><span><strong>{title}</strong><small>{detail}</small></span><ChevronRight size={16} /></button>;
}

function ActionRow({ icon, title, detail, onClick }: { icon: React.ReactNode; title: string; detail: string; onClick: () => void }) {
  return <button className="settings-row" onClick={onClick} type="button"><span className="settings-icon">{icon}</span><span><strong>{title}</strong><small>{detail}</small></span><ChevronRight size={16} /></button>;
}

function Toast({ message }: { message: string }) {
  return <div className="toast">{message}</div>;
}

createRoot(document.getElementById("root")!).render(<App />);
