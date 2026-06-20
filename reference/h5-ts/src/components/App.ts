import { showToast } from '../utils/toast';
import { CameraService } from '../utils/camera';
import type { DateData, MealData, PageName, FilterType } from '../types';

export class App {
  private currentPage: PageName = 'progress';
  private activeMeal: string | null = 'lunch';
  private selectedDateIndex = 5;
  private autoDetect = true;
  private sheetExpanded = false;
  private camera = new CameraService();

  private dateData: DateData[] = [
    { day: '周日', date: '5月18', kcal: 1585, deficit: 'pos', eaten: 1585, target: 2000, left: 415, active: 320, rest: 1380, steps: '7,230', workouts: '0', protein: '112/120', carb: '195/250', fat: '55/70', proteinPct: 93, carbPct: 78, fatPct: 79 },
    { day: '周一', date: '5月19', kcal: 1760, deficit: 'neg', eaten: 1760, target: 2000, left: 240, active: 380, rest: 1380, steps: '8,102', workouts: '1', protein: '98/120', carb: '210/250', fat: '62/70', proteinPct: 82, carbPct: 84, fatPct: 89 },
    { day: '周二', date: '5月20', kcal: 1332, deficit: 'pos', eaten: 1332, target: 2000, left: 668, active: 290, rest: 1380, steps: '6,540', workouts: '0', protein: '85/120', carb: '160/250', fat: '48/70', proteinPct: 71, carbPct: 64, fatPct: 69 },
    { day: '周三', date: '5月21', kcal: 1695, deficit: 'neg', eaten: 1695, target: 2000, left: 305, active: 350, rest: 1380, steps: '7,890', workouts: '1', protein: '105/120', carb: '200/250', fat: '60/70', proteinPct: 88, carbPct: 80, fatPct: 86 },
    { day: '周四', date: '5月22', kcal: 1482, deficit: 'pos', eaten: 1482, target: 2000, left: 518, active: 280, rest: 1380, steps: '6,210', workouts: '0', protein: '95/120', carb: '175/250', fat: '52/70', proteinPct: 79, carbPct: 70, fatPct: 74 },
    { day: '今天', date: '5月24', kcal: 1624, deficit: 'pos', eaten: 1624, target: 2000, left: 376, active: 410, rest: 1380, steps: '8,642', workouts: '1', protein: '102/120', carb: '179/250', fat: '58/70', proteinPct: 85, carbPct: 72, fatPct: 83 },
  ];

  private mealData: Record<string, MealData> = {
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

  constructor(private root: HTMLElement) {}

  mount(): void {
    this.root.innerHTML = this.renderShell();
    this.bindNavigation();
    this.initProgressPage();
    this.initBankPage();
    this.initAddPage();
    this.startClock();
  }

  private renderShell(): string {
    return `
      <div class="statusbar"><span id="clock">11:19</span><div class="sys"><span class="dots">••••</span><span>⌁</span><span class="battery"></span></div></div>
      <div class="island" id="island"></div>
      <div class="toast" id="toast"></div>
      ${this.renderMePage()}
      ${this.renderProgressPage()}
      ${this.renderBankPage()}
      ${this.renderAddPage()}
      <nav class="tabbar" aria-label="主导航">
        <div class="tab-buttons">
          <div class="tab-buttons-bg"></div>
          <button class="tab-btn" data-nav="bank" data-page="bank"><span class="tab-ico">▥</span><span class="tab-label">食物库</span></button>
          <button class="tab-btn" data-nav="me" data-page="me"><span class="tab-ico">♙</span><span class="tab-label">我</span></button>
          <button class="tab-btn active" data-nav="progress" data-page="progress"><span class="tab-ico">▮</span><span class="tab-label">进度</span></button>
        </div>
        <button class="add-tab" data-nav="add" data-page="add" aria-label="添加"><div class="add-bg"></div><span>＋</span></button>
      </nav>
    `;
  }

  private renderMePage(): string {
    return `
      <main class="page hidden" data-page="me">
        <div class="stack">
          <section class="glass card profile-hero">
            <div class="avatar">🙂</div>
            <div><h2 class="h2">Alex</h2><p class="caption">减脂计划中</p></div>
            <div class="badge">Plus</div>
          </section>
          <section class="glass card">
            <div class="section-header"><h3 class="h3">目标摘要</h3><span class="edit-btn" data-action="edit-goals">编辑</span></div>
            <div class="goal-grid">
              <div class="goal-item" data-action="goal-type"><div class="label">目标</div><div class="big">减脂</div><div class="sub">高蛋白</div></div>
              <div class="goal-item" data-action="goal-current"><div class="label">当前体重</div><div class="big">68.2</div><div class="sub">kg</div></div>
              <div class="goal-item" data-action="goal-target"><div class="label">目标体重</div><div class="big">60.0</div><div class="sub">kg</div></div>
              <div class="goal-item" data-action="goal-speed"><div class="label">目标速度</div><div class="big">每周 0.5</div><div class="sub">kg</div></div>
            </div>
          </section>
          <section class="glass card">
            <div class="section-header"><h3 class="h3">计划</h3><span class="edit-btn" data-action="edit-plan">调整</span></div>
            <div class="plan-grid">
              <div class="plan-item" data-action="plan-kcal"><div class="label">每日平均热量</div><div class="big">2,000</div><div class="sub">kcal</div></div>
              <div class="plan-item" data-action="plan-deficit"><div class="label">每日缺口目标</div><div class="big">500</div><div class="sub">kcal</div></div>
              <div class="plan-item" data-action="plan-strategy"><div class="label">饮食策略</div><div class="big">高蛋白</div><div class="sub">均衡碳脂</div></div>
            </div>
          </section>
          <section class="glass card list-row" data-action="health-data">
            <div class="row gap-3"><div class="icon">♥</div><div><h3 class="h3">健康数据</h3><p class="caption"><span class="green">已连接</span> · Apple 健康</p></div></div>
            <span class="chev">›</span>
          </section>
        </div>
      </main>
    `;
  }

  private renderProgressPage(): string {
    return `
      <main class="page" data-page="progress">
        <div class="stack">
          <section class="glass date-section">
            <div class="date-scroll" id="dateScroll"></div>
          </section>
          <section class="glass card">
            <div class="energy-top"><h3 class="h3">能量环</h3><div class="caption"><span class="green value" id="bonusLabel">+210</span> 运动加成</div></div>
            <div class="ring-wrap">
              <svg viewBox="0 0 240 240" aria-hidden="true">
                <defs>
                  <linearGradient id="eatGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7A45FF"/><stop offset="1" stop-color="#CB4EEA"/></linearGradient>
                  <linearGradient id="bonusGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#D8DDE9"/><stop offset="1" stop-color="#B8EBCB"/></linearGradient>
                </defs>
                <circle cx="120" cy="120" r="92" fill="none" stroke="rgba(22,27,39,.10)" stroke-width="16" />
                <circle cx="120" cy="120" r="92" fill="none" stroke="url(#eatGrad)" stroke-linecap="round" stroke-width="16" stroke-dasharray="423.96 578.05" transform="rotate(-90 120 120)" />
                <circle cx="120" cy="120" r="92" fill="none" stroke="rgba(22,27,39,.12)" stroke-linecap="butt" stroke-width="16" stroke-dasharray="98.11 578.05" stroke-dashoffset="-423.96" transform="rotate(-90 120 120)" />
                <circle cx="120" cy="120" r="92" fill="none" stroke="url(#bonusGrad)" stroke-linecap="round" stroke-width="16" stroke-dasharray="55.98 578.05" stroke-dashoffset="-522.07" transform="rotate(-90 120 120)" />
              </svg>
              <div class="ring-center">
                <div class="mini">已摄入</div><div class="eaten" id="eatenKcal">1,624</div><div class="mini">kcal</div>
                <div class="mini">剩余预算</div><div class="number purple" id="deficitKcal">376</div>
                <div class="mini">还能吃</div><div class="number green" id="leftKcal">586</div>
              </div>
            </div>
            <div class="ring-stats">
              <div class="ring-stat"><div class="label">目标</div><div class="num" id="targetKcal">2,000 kcal</div></div>
              <div class="ring-stat"><div class="label">总消耗</div><div class="num" id="totalBurn">2,210 kcal</div></div>
              <div class="ring-stat"><div class="label">运动加成</div><div class="num" id="bonusKcal">+210 kcal</div></div>
            </div>
          </section>
          <section class="glass card">
            <div class="section-header"><h3 class="h3">进度</h3><span class="caption">今日目标</span></div>
            <div class="progress-grid">
              <div class="macro-row"><div class="icon small">P</div><div><div class="row between"><strong>蛋白质</strong><span class="caption" id="proteinLabel">102 / 120g</span></div><div class="bar"><span id="proteinBar" style="width:85%"></span></div></div><span class="caption" id="proteinPct">85%</span></div>
              <div class="macro-row"><div class="icon small">C</div><div><div class="row between"><strong>碳水</strong><span class="caption" id="carbLabel">179 / 250g</span></div><div class="bar"><span id="carbBar" style="width:72%"></span></div></div><span class="caption" id="carbPct">72%</span></div>
              <div class="macro-row"><div class="icon small">F</div><div><div class="row between"><strong>脂肪</strong><span class="caption" id="fatLabel">58 / 70g</span></div><div class="bar"><span id="fatBar" style="width:83%"></span></div></div><span class="caption" id="fatPct">83%</span></div>
            </div>
          </section>
          <section class="glass card">
            <div class="section-header"><h3 class="h3">健康同步</h3><span class="caption" id="syncTime">今天 7:32</span></div>
            <div class="sync-grid">
              <div class="sync-item" data-action="active-detail"><span class="caption">活动能量</span><strong id="activeEnergy">410 kcal</strong></div>
              <div class="sync-item" data-action="rest-detail"><span class="caption">静息能量</span><strong id="restEnergy">1,380 kcal</strong></div>
              <div class="sync-item" data-action="steps-detail"><span class="caption">步数 / 运动</span><strong id="steps">8,642</strong><span class="caption" id="workouts">1 次运动</span></div>
              <div class="sync-item" data-action="health-connect"><span class="caption">Apple 健康</span><strong class="green">已连接</strong></div>
            </div>
          </section>
          <section>
            <div class="meal-strip" id="mealStrip">
              <div class="meal-mini" data-meal="breakfast"><div class="meal-pic">🥣</div><strong>早餐</strong><p class="caption">412 kcal</p></div>
              <div class="meal-mini active" data-meal="lunch"><div class="meal-pic">🥗</div><strong>午餐</strong><p class="caption">687 kcal</p></div>
              <div class="meal-mini" data-meal="dinner"><div class="meal-pic">🍣</div><strong>晚餐</strong><p class="caption">403 kcal</p></div>
              <div class="meal-mini" data-meal="snack"><div class="meal-pic">🍎</div><strong>加餐</strong><p class="caption">122 kcal</p></div>
            </div>
            <div class="glass meal-expanded open" id="mealExpanded">
              <div class="caption meal-meta">12:45 · 687 kcal</div>
              <div class="dish-row"><div class="dish-thumb">🥗</div><div><strong>烤鸡谷物碗</strong><p class="caption">1 碗 · 自制</p></div><strong>360 kcal</strong></div>
              <div class="dish-row"><div class="dish-thumb">🥬</div><div><strong>藜麦沙拉</strong><p class="caption">1 杯 · 自制</p></div><strong>180 kcal</strong></div>
              <div class="dish-row"><div class="dish-thumb">🥛</div><div><strong>希腊酸奶</strong><p class="caption">FAGE · 1 杯</p></div><strong>120 kcal</strong></div>
            </div>
          </section>
        </div>
      </main>
    `;
  }

  private renderBankPage(): string {
    return `
      <main class="page hidden" data-page="bank">
        <div class="stack">
          <div class="row gap-2">
            <div class="search-field" data-action="search"><span class="search-icon">⌕</span> <span>搜索食物、餐次、品牌或公司</span></div>
            <button class="round-btn glass" data-action="filter-menu">☰</button>
          </div>
          <div class="chip-row" id="chipRow">
            <div class="chip active" data-filter="all">全部</div>
            <div class="chip" data-filter="food">食物</div>
            <div class="chip" data-filter="meal">餐次</div>
            <div class="chip" data-filter="brand">品牌</div>
            <div class="chip" data-filter="custom">自定义</div>
            <div class="chip" data-filter="recent">最近</div>
          </div>
          <section class="food-list" id="foodList">
            <div class="food-row" data-action="food-detail" data-food="chicken"><div class="food-img">🍗</div><div><h3 class="h3">炸鸡桶 2 块</h3><span class="brand">KFC</span></div><strong>560 kcal</strong></div>
            <div class="food-row" data-action="food-detail" data-food="burger"><div class="food-img">🍔</div><div><h3 class="h3">巨无霸</h3><span class="brand">McDonald's</span></div><strong>563 kcal</strong></div>
            <div class="food-row" data-action="food-detail" data-food="coffee"><div class="food-img">☕</div><div><h3 class="h3">焦糖玛奇朵 大杯</h3><span class="brand">Starbucks</span></div><strong>250 kcal</strong></div>
            <div class="food-row" data-action="food-detail" data-food="rice"><div class="food-img">🍚</div><div><h3 class="h3">米饭 1 碗</h3><span class="brand empty"></span></div><strong>205 kcal</strong></div>
            <div class="food-row" data-action="food-detail" data-food="oats"><div class="food-img">🥣</div><div><h3 class="h3">燕麦 1 杯</h3><span class="brand empty"></span></div><strong>150 kcal</strong></div>
            <div class="food-row" data-action="food-detail" data-food="salad"><div class="food-img">🥗</div><div><h3 class="h3">烤鸡沙拉</h3><span class="brand">星巴克</span></div><strong>320 kcal</strong></div>
          </section>
          <section class="glass card bank-detail">
            <div class="food-img">🍗</div>
            <div>
              <div class="row between"><div><h3 class="h3">炸鸡桶 2 块</h3><span class="brand">KFC</span></div><strong class="purple">560 kcal</strong></div>
              <div class="nutri-row">
                <div class="nutri"><strong>32g</strong><p class="caption">蛋白质</p></div>
                <div class="nutri"><strong>28g</strong><p class="caption">碳水</p></div>
                <div class="nutri"><strong>33g</strong><p class="caption">脂肪</p></div>
                <div class="nutri"><strong>1g</strong><p class="caption">纤维</p></div>
              </div>
            </div>
          </section>
        </div>
      </main>
    `;
  }

  private renderAddPage(): string {
    return `
      <main class="page add-page hidden" data-page="add">
        <div class="photo-bg" id="photoBg">
          <div id="cameraContainer" style="position:absolute;inset:0;border-radius:34px;overflow:hidden;z-index:1;"></div>
        </div>
        <div class="add-overlays">
          <div class="add-top">
            <button class="round-btn glass" data-action="close-add">×</button>
            <div class="glass meal-select" data-action="meal-select">🍴 午餐 <span class="small">⌄</span></div>
            <div class="glass auto-switch-pill" data-action="toggle-auto"><span>自动识别</span><span class="switch" id="autoSwitch"></span></div>
          </div>
          <div class="capture-controls">
            <button class="round-btn glass" data-action="gallery">▧</button>
            <button class="shutter" aria-label="拍照" id="shutterBtn"></button>
            <button class="round-btn glass purple" data-action="voice">🎙</button>
          </div>
        </div>
        <section class="glass add-sheet" id="addSheet">
          <div class="handle" data-action="toggle-sheet"></div>
          <div class="section-header-sm"><h3 class="h3">检索到的食物</h3><span class="caption">可修改后入账</span></div>
          <div class="detected-card">
            <div class="detected-row" data-action="edit-dish" data-dish="bowl"><div class="dish-thumb">🥗</div><div><strong>烤鸡谷物碗</strong><p class="caption">鸡肉、藜麦、牛油果 · 1 碗</p></div><strong>360 kcal</strong></div>
            <div class="detected-row" data-action="edit-dish" data-dish="avocado"><div class="dish-thumb">🥑</div><div><strong>牛油果</strong><p class="caption">半个 · 估算 70g</p></div><strong>112 kcal</strong></div>
          </div>
          <div class="spacer-md"></div>
          <div class="search-field" data-action="search-food"><span class="search-icon">⌕</span> <span>搜索食物、品牌或餐次</span><span class="ml-auto">▢</span></div>
          <div class="spacer-md"></div>
          <div class="section-header-sm"><h3 class="h3">最近食物</h3><span class="purple small value" data-action="view-recent">查看全部</span></div>
          <div class="glass card-compact">
            <div class="dish-row" data-action="add-recent" data-food="yogurt"><div class="dish-thumb">🥛</div><div><strong>希腊酸奶</strong><p class="caption">FAGE · 1 杯</p></div><strong>120 kcal</strong></div>
            <div class="dish-row" data-action="add-recent" data-food="apple"><div class="dish-thumb">🍎</div><div><strong>苹果</strong><p class="caption">1 个</p></div><strong>95 kcal</strong></div>
          </div>
        </section>
      </main>
    `;
  }

  private bindNavigation(): void {
    const pages = this.root.querySelectorAll<HTMLElement>('[data-page]');
    const tabBtns = this.root.querySelectorAll<HTMLElement>('.tab-btn, .add-tab');
    const island = this.root.querySelector<HTMLElement>('#island');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const page = btn.dataset.page as PageName;
        if (!page) return;
        this.currentPage = page;
        pages.forEach(p => p.classList.toggle('hidden', p.dataset.page !== page));
        tabBtns.forEach(b => b.classList.toggle('active', b.dataset.page === page));
        if (island) {
          if (page === 'add') {
            island.style.transform = 'translateX(-50%) scaleX(0.4) scaleY(0.6)';
            island.style.opacity = '0.3';
            this.startCamera();
          } else {
            island.style.transform = 'translateX(-50%) scaleX(1) scaleY(1)';
            island.style.opacity = '1';
            this.camera.stop();
          }
        }
      });
    });

    // Delegate click handlers for all interactive elements
    this.root.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const actionEl = target.closest('[data-action]') as HTMLElement | null;
      if (!actionEl) return;
      const action = actionEl.dataset.action;
      switch (action) {
        case 'edit-goals': showToast('进入目标编辑'); break;
        case 'goal-type': showToast('编辑目标类型'); break;
        case 'goal-current': showToast('编辑当前体重'); break;
        case 'goal-target': showToast('编辑目标体重'); break;
        case 'goal-speed': showToast('编辑目标速度'); break;
        case 'edit-plan': showToast('调整计划参数'); break;
        case 'plan-kcal': showToast('查看每日热量计算'); break;
        case 'plan-deficit': showToast('查看缺口计算'); break;
        case 'plan-strategy': showToast('调整饮食策略'); break;
        case 'health-data': showToast('管理健康数据连接'); break;
        case 'active-detail': showToast('查看活动详情'); break;
        case 'rest-detail': showToast('查看静息详情'); break;
        case 'steps-detail': showToast('查看运动记录'); break;
        case 'health-connect': showToast('管理健康连接'); break;
        case 'search': showToast('打开搜索'); break;
        case 'filter-menu': showToast('筛选菜单'); break;
        case 'food-detail': showToast(`查看 ${actionEl.dataset.food} 详情`); break;
        case 'close-add': this.showPage('progress'); break;
        case 'meal-select': showToast('切换餐次'); break;
        case 'toggle-auto': this.toggleAutoDetect(); break;
        case 'gallery': showToast('从相册选择'); break;
        case 'voice': showToast('语音记录'); break;
        case 'toggle-sheet': this.toggleSheet(); break;
        case 'edit-dish': showToast(`编辑 ${actionEl.dataset.dish}`); break;
        case 'search-food': showToast('搜索食物'); break;
        case 'view-recent': showToast('查看全部最近食物'); break;
        case 'add-recent': showToast(`添加 ${actionEl.dataset.food}`); break;
      }
    });
  }

  private showPage(name: PageName): void {
    const pages = this.root.querySelectorAll<HTMLElement>('[data-page]');
    const tabBtns = this.root.querySelectorAll<HTMLElement>('.tab-btn, .add-tab');
    const island = this.root.querySelector<HTMLElement>('#island');
    this.currentPage = name;
    pages.forEach(p => p.classList.toggle('hidden', p.dataset.page !== name));
    tabBtns.forEach(b => b.classList.toggle('active', b.dataset.page === name));
    if (island) {
      if (name === 'add') {
        island.style.transform = 'translateX(-50%) scaleX(0.4) scaleY(0.6)';
        island.style.opacity = '0.3';
        this.startCamera();
      } else {
        island.style.transform = 'translateX(-50%) scaleX(1) scaleY(1)';
        island.style.opacity = '1';
        this.camera.stop();
      }
    }
  }

  private async startCamera(): Promise<void> {
    const container = this.root.querySelector<HTMLElement>('#cameraContainer');
    if (!container) return;
    try {
      await this.camera.start(container);
    } catch {
      // fallback already shown by CameraService
    }
  }

  private initProgressPage(): void {
    this.renderDateScroll();
    this.selectDate(this.selectedDateIndex);

    const mealStrip = this.root.querySelector<HTMLElement>('#mealStrip');
    if (mealStrip) {
      mealStrip.addEventListener('click', (e) => {
        const mini = (e.target as HTMLElement).closest<HTMLElement>('.meal-mini');
        if (!mini) return;
        const meal = mini.dataset.meal;
        if (!meal) return;
        this.toggleMeal(meal);
      });
    }
  }

  private renderDateScroll(): void {
    const scroll = this.root.querySelector<HTMLElement>('#dateScroll');
    if (!scroll) return;
    scroll.innerHTML = '';
    for (let i = this.dateData.length - 1; i >= 0; i--) {
      const d = this.dateData[i];
      const active = i === this.selectedDateIndex ? 'active' : '';
      const dotClass = d.deficit === 'pos' ? 'pos' : 'neg';
      const el = document.createElement('div');
      el.className = `date-item ${active}`;
      el.dataset.index = String(i);
      el.innerHTML = `<strong>${d.day}</strong><span class="caption">${d.date}</span><span class="kcal">${d.kcal.toLocaleString()}</span><div class="balance-dot ${dotClass}"></div>`;
      el.addEventListener('click', () => this.selectDate(i));
      scroll.appendChild(el);
    }
    if (!scroll.dataset.initialized) {
      scroll.dataset.initialized = 'true';
      scroll.scrollLeft = scroll.scrollWidth;
    }
  }

  private selectDate(index: number): void {
    this.selectedDateIndex = index;
    this.renderDateScroll();
    const d = this.dateData[index];

    const setText = (id: string, text: string) => {
      const el = this.root.querySelector<HTMLElement>(id);
      if (el) el.textContent = text;
    };

    setText('#eatenKcal', d.eaten.toLocaleString());
    setText('#deficitKcal', (d.target - d.eaten > 0 ? d.target - d.eaten : d.eaten - d.target).toLocaleString());
    setText('#leftKcal', d.left.toLocaleString());
    setText('#targetKcal', d.target.toLocaleString() + ' kcal');
    setText('#totalBurn', (d.active + d.rest).toLocaleString() + ' kcal');
    setText('#bonusKcal', '+' + d.active + ' kcal');
    setText('#bonusLabel', '+' + d.active);

    setText('#proteinLabel', d.protein + 'g');
    const pBar = this.root.querySelector<HTMLElement>('#proteinBar');
    if (pBar) pBar.style.width = d.proteinPct + '%';
    setText('#proteinPct', d.proteinPct + '%');

    setText('#carbLabel', d.carb + 'g');
    const cBar = this.root.querySelector<HTMLElement>('#carbBar');
    if (cBar) cBar.style.width = d.carbPct + '%';
    setText('#carbPct', d.carbPct + '%');

    setText('#fatLabel', d.fat + 'g');
    const fBar = this.root.querySelector<HTMLElement>('#fatBar');
    if (fBar) fBar.style.width = d.fatPct + '%';
    setText('#fatPct', d.fatPct + '%');

    setText('#activeEnergy', d.active + ' kcal');
    setText('#restEnergy', d.rest + ' kcal');
    setText('#steps', d.steps);
    setText('#workouts', d.workouts + ' 次运动');

    const ring = this.root.querySelector<HTMLElement>('.ring-wrap svg');
    if (ring) {
      ring.style.filter = 'drop-shadow(0 18px 28px rgba(122,69,255,.20))';
      setTimeout(() => ring.style.filter = 'drop-shadow(0 12px 18px rgba(122,69,255,.12))', 400);
    }
  }

  private toggleMeal(meal: string): void {
    const strip = this.root.querySelector<HTMLElement>('#mealStrip');
    const expanded = this.root.querySelector<HTMLElement>('#mealExpanded');
    if (!strip || !expanded) return;
    const minis = strip.querySelectorAll<HTMLElement>('.meal-mini');
    minis.forEach(m => m.classList.remove('active'));

    if (this.activeMeal === meal) {
      expanded.classList.remove('open');
      this.activeMeal = null;
      return;
    }

    this.activeMeal = meal;
    const mEl = strip.querySelector<HTMLElement>(`[data-meal="${meal}"]`);
    if (mEl) mEl.classList.add('active');

    const data = this.mealData[meal];
    if (!data) return;
    expanded.innerHTML = `<div class="caption meal-meta">${data.time} · ${data.kcal} kcal</div>` +
      data.items.map(item =>
        `<div class="dish-row" data-action="edit-dish" data-dish="${item.name}">` +
        `<div class="dish-thumb">${item.thumb}</div>` +
        `<div><strong>${item.name}</strong><p class="caption">${item.desc}</p></div>` +
        `<strong>${item.kcal} kcal</strong>` +
        `</div>`
      ).join('');
    expanded.classList.add('open');
  }

  private initBankPage(): void {
    const chipRow = this.root.querySelector<HTMLElement>('#chipRow');
    if (!chipRow) return;
    chipRow.addEventListener('click', (e) => {
      const chip = (e.target as HTMLElement).closest<HTMLElement>('.chip');
      if (!chip) return;
      const filter = chip.dataset.filter as FilterType;
      if (!filter) return;
      this.setFilter(filter);
    });
  }

  private setFilter(filter: FilterType): void {
    const chips = this.root.querySelectorAll<HTMLElement>('.chip');
    chips.forEach(c => c.classList.toggle('active', c.dataset.filter === filter));
    const list = this.root.querySelector<HTMLElement>('#foodList');
    if (!list) return;
    const rows = list.querySelectorAll<HTMLElement>('.food-row');
    rows.forEach(row => {
      if (filter === 'all' || filter === 'recent' || filter === 'food') {
        row.style.display = '';
      } else if (filter === 'brand') {
        const hasBrand = row.querySelector('.brand:not(.empty)');
        row.style.display = hasBrand ? '' : 'none';
      } else {
        row.style.display = 'none';
      }
    });
  }

  private initAddPage(): void {
    const shutter = this.root.querySelector<HTMLElement>('#shutterBtn');
    if (shutter) {
      shutter.addEventListener('click', () => {
        const image = this.camera.capture();
        if (image) {
          showToast('照片已捕获');
          // In a real app, send image to AI for food recognition
        } else {
          showToast('拍照失败，请重试');
        }
      });
    }

    const addSheet = this.root.querySelector<HTMLElement>('#addSheet');
    if (!addSheet) return;
    let startY = 0, startExpanded = false;
    addSheet.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
      startExpanded = this.sheetExpanded;
    });
    addSheet.addEventListener('touchmove', (e) => {
      const dy = startY - e.touches[0].clientY;
      if (dy > 40 && !startExpanded) {
        this.sheetExpanded = true;
        addSheet.classList.add('expanded');
      } else if (dy < -40 && startExpanded) {
        this.sheetExpanded = false;
        addSheet.classList.remove('expanded');
      }
    });
  }

  private toggleAutoDetect(): void {
    this.autoDetect = !this.autoDetect;
    const sw = this.root.querySelector<HTMLElement>('#autoSwitch');
    if (sw) sw.classList.toggle('off', !this.autoDetect);
    showToast(this.autoDetect ? '自动识别已开启' : '自动识别已关闭');
  }

  private toggleSheet(): void {
    this.sheetExpanded = !this.sheetExpanded;
    const sheet = this.root.querySelector<HTMLElement>('#addSheet');
    if (sheet) sheet.classList.toggle('expanded', this.sheetExpanded);
  }

  private startClock(): void {
    const update = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, '0');
      const m = now.getMinutes().toString().padStart(2, '0');
      const el = this.root.querySelector<HTMLElement>('#clock');
      if (el) el.textContent = h + ':' + m;
    };
    update();
    setInterval(update, 30000);
  }
}
