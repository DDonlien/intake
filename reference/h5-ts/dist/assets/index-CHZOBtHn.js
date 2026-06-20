var u=Object.defineProperty;var b=(n,a,t)=>a in n?u(n,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[a]=t;var l=(n,a,t)=>b(n,typeof a!="symbol"?a+"":a,t);(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const e of i)if(e.type==="childList")for(const c of e.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function t(i){const e={};return i.integrity&&(e.integrity=i.integrity),i.referrerPolicy&&(e.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?e.credentials="include":i.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function s(i){if(i.ep)return;i.ep=!0;const e=t(i);fetch(i.href,e)}})();let r;function d(n){const a=document.getElementById("toast");a&&(a.textContent=n,a.classList.add("show"),r&&clearTimeout(r),r=window.setTimeout(()=>a.classList.remove("show"),1800))}class f{constructor(){l(this,"stream",null);l(this,"videoEl",null);l(this,"container",null)}get isActive(){return this.stream!==null&&this.stream.active}async start(a){this.container=a;try{this.stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment",width:{ideal:1280},height:{ideal:720}},audio:!1}),this.videoEl=document.createElement("video"),this.videoEl.autoplay=!0,this.videoEl.playsInline=!0,this.videoEl.muted=!0,this.videoEl.srcObject=this.stream,this.videoEl.style.cssText="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:1;border-radius:inherit;",a.appendChild(this.videoEl)}catch(t){throw console.error("Camera access failed:",t),this.showFallback(),t}}stop(){this.stream&&(this.stream.getTracks().forEach(a=>a.stop()),this.stream=null),this.videoEl&&this.videoEl.parentNode&&(this.videoEl.parentNode.removeChild(this.videoEl),this.videoEl=null)}capture(){if(!this.videoEl||!this.videoEl.videoWidth)return null;const a=document.createElement("canvas");a.width=this.videoEl.videoWidth,a.height=this.videoEl.videoHeight;const t=a.getContext("2d");return t?(t.drawImage(this.videoEl,0,0),a.toDataURL("image/jpeg",.9)):null}showFallback(){if(!this.container)return;const a=document.createElement("div");a.className="camera-fallback",a.textContent="相机不可用，请使用相册或手动输入",a.style.cssText="position:absolute;inset:0;display:grid;place-items:center;color:white;font-size:14px;background:rgba(0,0,0,.5);z-index:2;padding:20px;text-align:center;",this.container.appendChild(a)}}class m{constructor(a){l(this,"currentPage","progress");l(this,"activeMeal","lunch");l(this,"selectedDateIndex",5);l(this,"autoDetect",!0);l(this,"sheetExpanded",!1);l(this,"camera",new f);l(this,"dateData",[{day:"周日",date:"5月18",kcal:1585,deficit:"pos",eaten:1585,target:2e3,left:415,active:320,rest:1380,steps:"7,230",workouts:"0",protein:"112/120",carb:"195/250",fat:"55/70",proteinPct:93,carbPct:78,fatPct:79},{day:"周一",date:"5月19",kcal:1760,deficit:"neg",eaten:1760,target:2e3,left:240,active:380,rest:1380,steps:"8,102",workouts:"1",protein:"98/120",carb:"210/250",fat:"62/70",proteinPct:82,carbPct:84,fatPct:89},{day:"周二",date:"5月20",kcal:1332,deficit:"pos",eaten:1332,target:2e3,left:668,active:290,rest:1380,steps:"6,540",workouts:"0",protein:"85/120",carb:"160/250",fat:"48/70",proteinPct:71,carbPct:64,fatPct:69},{day:"周三",date:"5月21",kcal:1695,deficit:"neg",eaten:1695,target:2e3,left:305,active:350,rest:1380,steps:"7,890",workouts:"1",protein:"105/120",carb:"200/250",fat:"60/70",proteinPct:88,carbPct:80,fatPct:86},{day:"周四",date:"5月22",kcal:1482,deficit:"pos",eaten:1482,target:2e3,left:518,active:280,rest:1380,steps:"6,210",workouts:"0",protein:"95/120",carb:"175/250",fat:"52/70",proteinPct:79,carbPct:70,fatPct:74},{day:"今天",date:"5月24",kcal:1624,deficit:"pos",eaten:1624,target:2e3,left:376,active:410,rest:1380,steps:"8,642",workouts:"1",protein:"102/120",carb:"179/250",fat:"58/70",proteinPct:85,carbPct:72,fatPct:83}]);l(this,"mealData",{breakfast:{time:"8:30",kcal:412,items:[{thumb:"🥣",name:"燕麦牛奶",desc:"1 碗 · 自制",kcal:280},{thumb:"🫐",name:"蓝莓",desc:"50g",kcal:85},{thumb:"☕",name:"黑咖啡",desc:"1 杯",kcal:5}]},lunch:{time:"12:45",kcal:687,items:[{thumb:"🥗",name:"烤鸡谷物碗",desc:"1 碗 · 自制",kcal:360},{thumb:"🥬",name:"藜麦沙拉",desc:"1 杯 · 自制",kcal:180},{thumb:"🥛",name:"希腊酸奶",desc:"FAGE · 1 杯",kcal:120}]},dinner:{time:"19:00",kcal:403,items:[{thumb:"🍣",name:"三文鱼刺身",desc:"5 片 · 日料店",kcal:250},{thumb:"🍚",name:"米饭",desc:"1 小碗",kcal:120},{thumb:"🍵",name:"味噌汤",desc:"1 碗",kcal:33}]},snack:{time:"15:30",kcal:122,items:[{thumb:"🍎",name:"苹果",desc:"1 个",kcal:95},{thumb:"🥜",name:"杏仁",desc:"10g",kcal:27}]}});this.root=a}mount(){this.root.innerHTML=this.renderShell(),this.bindNavigation(),this.initProgressPage(),this.initBankPage(),this.initAddPage(),this.startClock()}renderShell(){return`
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
    `}renderMePage(){return`
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
    `}renderProgressPage(){return`
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
    `}renderBankPage(){return`
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
    `}renderAddPage(){return`
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
    `}bindNavigation(){const a=this.root.querySelectorAll("[data-page]"),t=this.root.querySelectorAll(".tab-btn, .add-tab"),s=this.root.querySelector("#island");t.forEach(i=>{i.addEventListener("click",()=>{const e=i.dataset.page;e&&(this.currentPage=e,a.forEach(c=>c.classList.toggle("hidden",c.dataset.page!==e)),t.forEach(c=>c.classList.toggle("active",c.dataset.page===e)),s&&(e==="add"?(s.style.transform="translateX(-50%) scaleX(0.4) scaleY(0.6)",s.style.opacity="0.3",this.startCamera()):(s.style.transform="translateX(-50%) scaleX(1) scaleY(1)",s.style.opacity="1",this.camera.stop())))})}),this.root.addEventListener("click",i=>{const c=i.target.closest("[data-action]");if(!c)return;switch(c.dataset.action){case"edit-goals":d("进入目标编辑");break;case"goal-type":d("编辑目标类型");break;case"goal-current":d("编辑当前体重");break;case"goal-target":d("编辑目标体重");break;case"goal-speed":d("编辑目标速度");break;case"edit-plan":d("调整计划参数");break;case"plan-kcal":d("查看每日热量计算");break;case"plan-deficit":d("查看缺口计算");break;case"plan-strategy":d("调整饮食策略");break;case"health-data":d("管理健康数据连接");break;case"active-detail":d("查看活动详情");break;case"rest-detail":d("查看静息详情");break;case"steps-detail":d("查看运动记录");break;case"health-connect":d("管理健康连接");break;case"search":d("打开搜索");break;case"filter-menu":d("筛选菜单");break;case"food-detail":d(`查看 ${c.dataset.food} 详情`);break;case"close-add":this.showPage("progress");break;case"meal-select":d("切换餐次");break;case"toggle-auto":this.toggleAutoDetect();break;case"gallery":d("从相册选择");break;case"voice":d("语音记录");break;case"toggle-sheet":this.toggleSheet();break;case"edit-dish":d(`编辑 ${c.dataset.dish}`);break;case"search-food":d("搜索食物");break;case"view-recent":d("查看全部最近食物");break;case"add-recent":d(`添加 ${c.dataset.food}`);break}})}showPage(a){const t=this.root.querySelectorAll("[data-page]"),s=this.root.querySelectorAll(".tab-btn, .add-tab"),i=this.root.querySelector("#island");this.currentPage=a,t.forEach(e=>e.classList.toggle("hidden",e.dataset.page!==a)),s.forEach(e=>e.classList.toggle("active",e.dataset.page===a)),i&&(a==="add"?(i.style.transform="translateX(-50%) scaleX(0.4) scaleY(0.6)",i.style.opacity="0.3",this.startCamera()):(i.style.transform="translateX(-50%) scaleX(1) scaleY(1)",i.style.opacity="1",this.camera.stop()))}async startCamera(){const a=this.root.querySelector("#cameraContainer");if(a)try{await this.camera.start(a)}catch{}}initProgressPage(){this.renderDateScroll(),this.selectDate(this.selectedDateIndex);const a=this.root.querySelector("#mealStrip");a&&a.addEventListener("click",t=>{const s=t.target.closest(".meal-mini");if(!s)return;const i=s.dataset.meal;i&&this.toggleMeal(i)})}renderDateScroll(){const a=this.root.querySelector("#dateScroll");if(a){a.innerHTML="";for(let t=this.dateData.length-1;t>=0;t--){const s=this.dateData[t],i=t===this.selectedDateIndex?"active":"",e=s.deficit==="pos"?"pos":"neg",c=document.createElement("div");c.className=`date-item ${i}`,c.dataset.index=String(t),c.innerHTML=`<strong>${s.day}</strong><span class="caption">${s.date}</span><span class="kcal">${s.kcal.toLocaleString()}</span><div class="balance-dot ${e}"></div>`,c.addEventListener("click",()=>this.selectDate(t)),a.appendChild(c)}a.dataset.initialized||(a.dataset.initialized="true",a.scrollLeft=a.scrollWidth)}}selectDate(a){this.selectedDateIndex=a,this.renderDateScroll();const t=this.dateData[a],s=(h,g)=>{const v=this.root.querySelector(h);v&&(v.textContent=g)};s("#eatenKcal",t.eaten.toLocaleString()),s("#deficitKcal",(t.target-t.eaten>0?t.target-t.eaten:t.eaten-t.target).toLocaleString()),s("#leftKcal",t.left.toLocaleString()),s("#targetKcal",t.target.toLocaleString()+" kcal"),s("#totalBurn",(t.active+t.rest).toLocaleString()+" kcal"),s("#bonusKcal","+"+t.active+" kcal"),s("#bonusLabel","+"+t.active),s("#proteinLabel",t.protein+"g");const i=this.root.querySelector("#proteinBar");i&&(i.style.width=t.proteinPct+"%"),s("#proteinPct",t.proteinPct+"%"),s("#carbLabel",t.carb+"g");const e=this.root.querySelector("#carbBar");e&&(e.style.width=t.carbPct+"%"),s("#carbPct",t.carbPct+"%"),s("#fatLabel",t.fat+"g");const c=this.root.querySelector("#fatBar");c&&(c.style.width=t.fatPct+"%"),s("#fatPct",t.fatPct+"%"),s("#activeEnergy",t.active+" kcal"),s("#restEnergy",t.rest+" kcal"),s("#steps",t.steps),s("#workouts",t.workouts+" 次运动");const o=this.root.querySelector(".ring-wrap svg");o&&(o.style.filter="drop-shadow(0 18px 28px rgba(122,69,255,.20))",setTimeout(()=>o.style.filter="drop-shadow(0 12px 18px rgba(122,69,255,.12))",400))}toggleMeal(a){const t=this.root.querySelector("#mealStrip"),s=this.root.querySelector("#mealExpanded");if(!t||!s)return;if(t.querySelectorAll(".meal-mini").forEach(o=>o.classList.remove("active")),this.activeMeal===a){s.classList.remove("open"),this.activeMeal=null;return}this.activeMeal=a;const e=t.querySelector(`[data-meal="${a}"]`);e&&e.classList.add("active");const c=this.mealData[a];c&&(s.innerHTML=`<div class="caption meal-meta">${c.time} · ${c.kcal} kcal</div>`+c.items.map(o=>`<div class="dish-row" data-action="edit-dish" data-dish="${o.name}"><div class="dish-thumb">${o.thumb}</div><div><strong>${o.name}</strong><p class="caption">${o.desc}</p></div><strong>${o.kcal} kcal</strong></div>`).join(""),s.classList.add("open"))}initBankPage(){const a=this.root.querySelector("#chipRow");a&&a.addEventListener("click",t=>{const s=t.target.closest(".chip");if(!s)return;const i=s.dataset.filter;i&&this.setFilter(i)})}setFilter(a){this.root.querySelectorAll(".chip").forEach(e=>e.classList.toggle("active",e.dataset.filter===a));const s=this.root.querySelector("#foodList");if(!s)return;s.querySelectorAll(".food-row").forEach(e=>{if(a==="all"||a==="recent"||a==="food")e.style.display="";else if(a==="brand"){const c=e.querySelector(".brand:not(.empty)");e.style.display=c?"":"none"}else e.style.display="none"})}initAddPage(){const a=this.root.querySelector("#shutterBtn");a&&a.addEventListener("click",()=>{const e=this.camera.capture();d(e?"照片已捕获":"拍照失败，请重试")});const t=this.root.querySelector("#addSheet");if(!t)return;let s=0,i=!1;t.addEventListener("touchstart",e=>{s=e.touches[0].clientY,i=this.sheetExpanded}),t.addEventListener("touchmove",e=>{const c=s-e.touches[0].clientY;c>40&&!i?(this.sheetExpanded=!0,t.classList.add("expanded")):c<-40&&i&&(this.sheetExpanded=!1,t.classList.remove("expanded"))})}toggleAutoDetect(){this.autoDetect=!this.autoDetect;const a=this.root.querySelector("#autoSwitch");a&&a.classList.toggle("off",!this.autoDetect),d(this.autoDetect?"自动识别已开启":"自动识别已关闭")}toggleSheet(){this.sheetExpanded=!this.sheetExpanded;const a=this.root.querySelector("#addSheet");a&&a.classList.toggle("expanded",this.sheetExpanded)}startClock(){const a=()=>{const t=new Date,s=t.getHours().toString().padStart(2,"0"),i=t.getMinutes().toString().padStart(2,"0"),e=this.root.querySelector("#clock");e&&(e.textContent=s+":"+i)};a(),setInterval(a,3e4)}}const p=document.getElementById("app");if(!p)throw new Error("Root element #app not found");const k=new m(p);k.mount();
