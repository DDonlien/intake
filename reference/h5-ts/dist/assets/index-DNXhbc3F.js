var x=Object.defineProperty;var M=(r,t,a)=>t in r?x(r,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):r[t]=a;var l=(r,t,a)=>M(r,typeof t!="symbol"?t+"":t,a);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function a(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(e){if(e.ep)return;e.ep=!0;const i=a(e);fetch(e.href,i)}})();let h;function c(r){const t=document.getElementById("toast");t&&(t.textContent=r,t.classList.add("show"),h&&clearTimeout(h),h=window.setTimeout(()=>t.classList.remove("show"),1800))}class A{constructor(){l(this,"stream",null);l(this,"videoEl",null);l(this,"container",null)}get isActive(){return this.stream!==null&&this.stream.active}async start(t){this.container=t;try{this.stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment",width:{ideal:1280},height:{ideal:720}},audio:!1}),this.videoEl=document.createElement("video"),this.videoEl.autoplay=!0,this.videoEl.playsInline=!0,this.videoEl.muted=!0,this.videoEl.srcObject=this.stream,this.videoEl.style.cssText="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:1;border-radius:inherit;",t.appendChild(this.videoEl)}catch(a){throw console.error("Camera access failed:",a),this.showFallback(),a}}stop(){this.stream&&(this.stream.getTracks().forEach(t=>t.stop()),this.stream=null),this.videoEl&&this.videoEl.parentNode&&(this.videoEl.parentNode.removeChild(this.videoEl),this.videoEl=null)}capture(){if(!this.videoEl||!this.videoEl.videoWidth)return null;const t=document.createElement("canvas");t.width=this.videoEl.videoWidth,t.height=this.videoEl.videoHeight;const a=t.getContext("2d");return a?(a.drawImage(this.videoEl,0,0),t.toDataURL("image/jpeg",.9)):null}showFallback(){if(!this.container)return;const t=document.createElement("div");t.className="camera-fallback",t.textContent="相机不可用，请使用相册或手动输入",t.style.cssText="position:absolute;inset:0;display:grid;place-items:center;color:white;font-size:14px;background:rgba(0,0,0,.5);z-index:2;padding:20px;text-align:center;",this.container.appendChild(t)}}const B={name:"",goal:"",subGoal:"",currentWeight:"",targetWeight:"",speed:"",dailyKcal:"",deficitTarget:"",strategy:"",strategySub:"",healthConnected:!1,hasData:!1},C={name:"Alex",goal:"减脂",subGoal:"高蛋白",currentWeight:"68.2",targetWeight:"60.0",speed:"每周 0.5",dailyKcal:"2,000",deficitTarget:"500",strategy:"高蛋白",strategySub:"均衡碳脂",healthConnected:!0,hasData:!0},q=[{day:"周日",date:"5月18",kcal:1585,deficit:"pos",eaten:1585,target:2e3,left:415,active:320,rest:1380,steps:"7,230",workouts:"0",protein:"112/120",carb:"195/250",fat:"55/70",proteinPct:93,carbPct:78,fatPct:79},{day:"周一",date:"5月19",kcal:1760,deficit:"neg",eaten:1760,target:2e3,left:240,active:380,rest:1380,steps:"8,102",workouts:"1",protein:"98/120",carb:"210/250",fat:"62/70",proteinPct:82,carbPct:84,fatPct:89},{day:"周二",date:"5月20",kcal:1332,deficit:"pos",eaten:1332,target:2e3,left:668,active:290,rest:1380,steps:"6,540",workouts:"0",protein:"85/120",carb:"160/250",fat:"48/70",proteinPct:71,carbPct:64,fatPct:69},{day:"周三",date:"5月21",kcal:1695,deficit:"neg",eaten:1695,target:2e3,left:305,active:350,rest:1380,steps:"7,890",workouts:"1",protein:"105/120",carb:"200/250",fat:"60/70",proteinPct:88,carbPct:80,fatPct:86},{day:"周四",date:"5月22",kcal:1482,deficit:"pos",eaten:1482,target:2e3,left:518,active:280,rest:1380,steps:"6,210",workouts:"0",protein:"95/120",carb:"175/250",fat:"52/70",proteinPct:79,carbPct:70,fatPct:74},{day:"今天",date:"5月24",kcal:1624,deficit:"pos",eaten:1624,target:2e3,left:376,active:410,rest:1380,steps:"8,642",workouts:"1",protein:"102/120",carb:"179/250",fat:"58/70",proteinPct:85,carbPct:72,fatPct:83}],T={breakfast:{time:"8:30",kcal:412,items:[{thumb:"🥣",name:"燕麦牛奶",desc:"1 碗 · 自制",kcal:280},{thumb:"🫐",name:"蓝莓",desc:"50g",kcal:85},{thumb:"☕",name:"黑咖啡",desc:"1 杯",kcal:5}]},lunch:{time:"12:45",kcal:687,items:[{thumb:"🥗",name:"烤鸡谷物碗",desc:"1 碗 · 自制",kcal:360},{thumb:"🥬",name:"藜麦沙拉",desc:"1 杯 · 自制",kcal:180},{thumb:"🥛",name:"希腊酸奶",desc:"FAGE · 1 杯",kcal:120}]},dinner:{time:"19:00",kcal:403,items:[{thumb:"🍣",name:"三文鱼刺身",desc:"5 片 · 日料店",kcal:250},{thumb:"🍚",name:"米饭",desc:"1 小碗",kcal:120},{thumb:"🍵",name:"味噌汤",desc:"1 碗",kcal:33}]},snack:{time:"15:30",kcal:122,items:[{thumb:"🍎",name:"苹果",desc:"1 个",kcal:95},{thumb:"🥜",name:"杏仁",desc:"10g",kcal:27}]}};class I{constructor(){l(this,"data");l(this,"listeners",new Set);const t=localStorage.getItem("intake_data");if(t)try{this.data=JSON.parse(t)}catch{this.data=this.getEmptyData()}else this.data=this.getEmptyData()}getEmptyData(){return{user:{...B},dates:[],meals:{}}}get(){return this.data}getUser(){return this.data.user}getDates(){return this.data.dates}getMeals(){return this.data.meals}hasData(){return this.data.user.hasData}loadSampleData(){this.data={user:{...C},dates:[...q],meals:{...T}},this.save(),this.notify()}clearAll(){this.data=this.getEmptyData(),localStorage.removeItem("intake_data"),this.notify()}save(){localStorage.setItem("intake_data",JSON.stringify(this.data))}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}notify(){this.listeners.forEach(t=>t())}}class F{constructor(t){l(this,"currentPage","progress");l(this,"activeMeal",null);l(this,"selectedDateIndex",0);l(this,"autoDetect",!0);l(this,"sheetExpanded",!1);l(this,"camera",new A);l(this,"store",new I);l(this,"dateData",[{day:"周日",date:"5月18",kcal:1585,deficit:"pos",eaten:1585,target:2e3,left:415,active:320,rest:1380,steps:"7,230",workouts:"0",protein:"112/120",carb:"195/250",fat:"55/70",proteinPct:93,carbPct:78,fatPct:79},{day:"周一",date:"5月19",kcal:1760,deficit:"neg",eaten:1760,target:2e3,left:240,active:380,rest:1380,steps:"8,102",workouts:"1",protein:"98/120",carb:"210/250",fat:"62/70",proteinPct:82,carbPct:84,fatPct:89},{day:"周二",date:"5月20",kcal:1332,deficit:"pos",eaten:1332,target:2e3,left:668,active:290,rest:1380,steps:"6,540",workouts:"0",protein:"85/120",carb:"160/250",fat:"48/70",proteinPct:71,carbPct:64,fatPct:69},{day:"周三",date:"5月21",kcal:1695,deficit:"neg",eaten:1695,target:2e3,left:305,active:350,rest:1380,steps:"7,890",workouts:"1",protein:"105/120",carb:"200/250",fat:"60/70",proteinPct:88,carbPct:80,fatPct:86},{day:"周四",date:"5月22",kcal:1482,deficit:"pos",eaten:1482,target:2e3,left:518,active:280,rest:1380,steps:"6,210",workouts:"0",protein:"95/120",carb:"175/250",fat:"52/70",proteinPct:79,carbPct:70,fatPct:74},{day:"今天",date:"5月24",kcal:1624,deficit:"pos",eaten:1624,target:2e3,left:376,active:410,rest:1380,steps:"8,642",workouts:"1",protein:"102/120",carb:"179/250",fat:"58/70",proteinPct:85,carbPct:72,fatPct:83}]);l(this,"mealData",{breakfast:{time:"8:30",kcal:412,items:[{thumb:"🥣",name:"燕麦牛奶",desc:"1 碗 · 自制",kcal:280},{thumb:"🫐",name:"蓝莓",desc:"50g",kcal:85},{thumb:"☕",name:"黑咖啡",desc:"1 杯",kcal:5}]},lunch:{time:"12:45",kcal:687,items:[{thumb:"🥗",name:"烤鸡谷物碗",desc:"1 碗 · 自制",kcal:360},{thumb:"🥬",name:"藜麦沙拉",desc:"1 杯 · 自制",kcal:180},{thumb:"🥛",name:"希腊酸奶",desc:"FAGE · 1 杯",kcal:120}]},dinner:{time:"19:00",kcal:403,items:[{thumb:"🍣",name:"三文鱼刺身",desc:"5 片 · 日料店",kcal:250},{thumb:"🍚",name:"米饭",desc:"1 小碗",kcal:120},{thumb:"🍵",name:"味噌汤",desc:"1 碗",kcal:33}]},snack:{time:"15:30",kcal:122,items:[{thumb:"🍎",name:"苹果",desc:"1 个",kcal:95},{thumb:"🥜",name:"杏仁",desc:"10g",kcal:27}]}});this.root=t}mount(){this.root.innerHTML=this.renderShell(),this.bindNavigation(),this.initProgressPage(),this.initBankPage(),this.initAddPage(),this.startClock()}hasData(){return this.store.hasData()}getDates(){return this.store.getDates()}getMeals(){return this.store.getMeals()}getUser(){return this.store.getUser()}renderShell(){return`
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
    `}renderMePage(){const t=this.getUser(),a=this.hasData();return`
      <main class="page hidden" data-page="me">
        <div class="stack">
          <section class="glass card profile-hero">
            <div class="avatar">🙂</div>
            <div><h2 class="h2">${a?t.name||"未命名":"新用户"}</h2><p class="caption">${a?"减脂计划中":"欢迎来到 Intake"}</p></div>
            ${a?'<div class="badge">Plus</div>':""}
          </section>
          ${a?this.renderMeGoals():this.renderMeEmpty()}
          ${a?this.renderMePlan():""}
          <section class="glass card list-row" data-action="health-data">
            <div class="row gap-3"><div class="icon">♥</div><div><h3 class="h3">健康数据</h3><p class="caption">${t.healthConnected?'<span class="green">已连接</span>':'<span class="muted">未连接</span>'} · Apple 健康</p></div></div>
            <span class="chev">›</span>
          </section>
          ${a?`<section class="glass card list-row" data-action="clear-data">
            <div class="row gap-3"><div class="icon" style="color:var(--red);background:rgba(248,92,106,.12)">⚠</div><div><h3 class="h3" style="color:var(--red)">清空个人数据</h3><p class="caption">重置所有记录和目标</p></div></div>
            <span class="chev" style="color:var(--red)">›</span>
          </section>`:""}
          ${a?"":`<section class="glass card center" style="padding:var(--s-6);gap:var(--s-3)">
            <p class="caption text-center">你还没有设置任何目标<br>点击下方按钮开始使用</p>
            <button class="edit-btn" style="padding:var(--s-3) var(--s-5);border-radius:var(--r-sm);background:var(--purple-soft);margin-top:var(--s-2)" data-action="load-demo">加载演示数据</button>
          </section>`}
        </div>
      </main>
    `}renderMeGoals(){const t=this.getUser();return`
      <section class="glass card">
        <div class="section-header"><h3 class="h3">目标摘要</h3><span class="edit-btn" data-action="edit-goals">编辑</span></div>
        <div class="goal-grid">
          <div class="goal-item" data-action="goal-type"><div class="label">目标</div><div class="big">${t.goal||"--"}</div><div class="sub">${t.subGoal||"--"}</div></div>
          <div class="goal-item" data-action="goal-current"><div class="label">当前体重</div><div class="big">${t.currentWeight||"--"}</div><div class="sub">kg</div></div>
          <div class="goal-item" data-action="goal-target"><div class="label">目标体重</div><div class="big">${t.targetWeight||"--"}</div><div class="sub">kg</div></div>
          <div class="goal-item" data-action="goal-speed"><div class="label">目标速度</div><div class="big">${t.speed||"--"}</div><div class="sub">kg</div></div>
        </div>
      </section>
    `}renderMeEmpty(){return`
      <section class="glass card">
        <div class="section-header"><h3 class="h3">目标摘要</h3><span class="edit-btn" data-action="edit-goals">设置</span></div>
        <div class="goal-grid">
          <div class="goal-item" data-action="goal-type"><div class="label">目标</div><div class="big">--</div><div class="sub">--</div></div>
          <div class="goal-item" data-action="goal-current"><div class="label">当前体重</div><div class="big">--</div><div class="sub">kg</div></div>
          <div class="goal-item" data-action="goal-target"><div class="label">目标体重</div><div class="big">--</div><div class="sub">kg</div></div>
          <div class="goal-item" data-action="goal-speed"><div class="label">目标速度</div><div class="big">--</div><div class="sub">kg</div></div>
        </div>
      </section>
    `}renderMePlan(){const t=this.getUser();return`
      <section class="glass card">
        <div class="section-header"><h3 class="h3">计划</h3><span class="edit-btn" data-action="edit-plan">调整</span></div>
        <div class="plan-grid">
          <div class="plan-item" data-action="plan-kcal"><div class="label">每日平均热量</div><div class="big">${t.dailyKcal||"--"}</div><div class="sub">kcal</div></div>
          <div class="plan-item" data-action="plan-deficit"><div class="label">每日缺口目标</div><div class="big">${t.deficitTarget||"--"}</div><div class="sub">kcal</div></div>
          <div class="plan-item" data-action="plan-strategy"><div class="label">饮食策略</div><div class="big">${t.strategy||"--"}</div><div class="sub">${t.strategySub||"--"}</div></div>
        </div>
      </section>
    `}renderProgressPage(){this.hasData();const t=this.getDates(),a=t.length>0?t[t.length-1]:null,s=a?a.eaten.toLocaleString():"--",e=a?(a.target-a.eaten>0?a.target-a.eaten:a.eaten-a.target).toLocaleString():"--",i=a?a.left.toLocaleString():"--",d=a?a.target.toLocaleString()+" kcal":"-- kcal",n=a?(a.active+a.rest).toLocaleString()+" kcal":"-- kcal",o=a?"+"+a.active+" kcal":"-- kcal",p=a?"+"+a.active:"--",g=a?a.protein+"g":"-- / --g",v=a?a.proteinPct+"%":"--%",m=a?a.proteinPct+"%":"0%",f=a?a.carb+"g":"-- / --g",k=a?a.carbPct+"%":"--%",y=a?a.carbPct+"%":"0%",w=a?a.fat+"g":"-- / --g",P=a?a.fatPct+"%":"--%",E=a?a.fatPct+"%":"0%",S=a?a.active+" kcal":"-- kcal",L=a?a.rest+" kcal":"-- kcal",$=a?a.steps:"--",D=a?a.workouts+" 次运动":"0 次运动",u=this.getUser();return`
      <main class="page" data-page="progress">
        <div class="stack">
          <section class="glass date-section">
            <div class="date-scroll" id="dateScroll"></div>
          </section>
          <section class="glass card">
            <div class="energy-top"><h3 class="h3">能量环</h3><div class="caption"><span class="green value" id="bonusLabel">${p}</span> 运动加成</div></div>
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
                <div class="mini">已摄入</div><div class="eaten" id="eatenKcal">${s}</div><div class="mini">kcal</div>
                <div class="mini">剩余预算</div><div class="number purple" id="deficitKcal">${e}</div>
                <div class="mini">还能吃</div><div class="number green" id="leftKcal">${i}</div>
              </div>
            </div>
            <div class="ring-stats">
              <div class="ring-stat"><div class="label">目标</div><div class="num" id="targetKcal">${d}</div></div>
              <div class="ring-stat"><div class="label">总消耗</div><div class="num" id="totalBurn">${n}</div></div>
              <div class="ring-stat"><div class="label">运动加成</div><div class="num" id="bonusKcal">${o}</div></div>
            </div>
          </section>
          <section class="glass card">
            <div class="section-header"><h3 class="h3">进度</h3><span class="caption">今日目标</span></div>
            <div class="progress-grid">
              <div class="macro-row"><div class="icon small">P</div><div><div class="row between"><strong>蛋白质</strong><span class="caption" id="proteinLabel">${g}</span></div><div class="bar"><span id="proteinBar" style="width:${m}"></span></div></div><span class="caption" id="proteinPct">${v}</span></div>
              <div class="macro-row"><div class="icon small">C</div><div><div class="row between"><strong>碳水</strong><span class="caption" id="carbLabel">${f}</span></div><div class="bar"><span id="carbBar" style="width:${y}"></span></div></div><span class="caption" id="carbPct">${k}</span></div>
              <div class="macro-row"><div class="icon small">F</div><div><div class="row between"><strong>脂肪</strong><span class="caption" id="fatLabel">${w}</span></div><div class="bar"><span id="fatBar" style="width:${E}"></span></div></div><span class="caption" id="fatPct">${P}</span></div>
            </div>
          </section>
          <section class="glass card">
            <div class="section-header"><h3 class="h3">健康同步</h3><span class="caption" id="syncTime">今天 7:32</span></div>
            <div class="sync-grid">
              <div class="sync-item" data-action="active-detail"><span class="caption">活动能量</span><strong id="activeEnergy">${S}</strong></div>
              <div class="sync-item" data-action="rest-detail"><span class="caption">静息能量</span><strong id="restEnergy">${L}</strong></div>
              <div class="sync-item" data-action="steps-detail"><span class="caption">步数 / 运动</span><strong id="steps">${$}</strong><span class="caption" id="workouts">${D}</span></div>
              <div class="sync-item" data-action="health-connect"><span class="caption">Apple 健康</span><strong class="${u.healthConnected?"green":"muted"}">${u.healthConnected?"已连接":"未连接"}</strong></div>
            </div>
          </section>
          <section>
            <div class="meal-strip" id="mealStrip">
              <div class="meal-mini" data-meal="breakfast"><div class="meal-pic">🥣</div><strong>早餐</strong><p class="caption">-- kcal</p></div>
              <div class="meal-mini" data-meal="lunch"><div class="meal-pic">🥗</div><strong>午餐</strong><p class="caption">-- kcal</p></div>
              <div class="meal-mini" data-meal="dinner"><div class="meal-pic">🍣</div><strong>晚餐</strong><p class="caption">-- kcal</p></div>
              <div class="meal-mini" data-meal="snack"><div class="meal-pic">🍎</div><strong>加餐</strong><p class="caption">-- kcal</p></div>
            </div>
            <div class="glass meal-expanded" id="mealExpanded">
              <div class="caption meal-meta">还没有记录</div>
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
    `}bindNavigation(){const t=this.root.querySelectorAll("[data-page]"),a=this.root.querySelectorAll(".tab-btn, .add-tab"),s=this.root.querySelector("#island");a.forEach(e=>{e.addEventListener("click",()=>{const i=e.dataset.page;i&&(this.currentPage=i,t.forEach(d=>d.classList.toggle("hidden",d.dataset.page!==i)),a.forEach(d=>d.classList.toggle("active",d.dataset.page===i)),s&&(i==="add"?(s.style.transform="translateX(-50%) scaleX(0.4) scaleY(0.6)",s.style.opacity="0.3",this.startCamera()):(s.style.transform="translateX(-50%) scaleX(1) scaleY(1)",s.style.opacity="1",this.camera.stop())))})}),this.root.addEventListener("click",e=>{const d=e.target.closest("[data-action]");if(!d)return;switch(d.dataset.action){case"edit-goals":c("进入目标编辑");break;case"goal-type":c("编辑目标类型");break;case"goal-current":c("编辑当前体重");break;case"goal-target":c("编辑目标体重");break;case"goal-speed":c("编辑目标速度");break;case"edit-plan":c("调整计划参数");break;case"plan-kcal":c("查看每日热量计算");break;case"plan-deficit":c("查看缺口计算");break;case"plan-strategy":c("调整饮食策略");break;case"health-data":c("管理健康数据连接");break;case"active-detail":c("查看活动详情");break;case"rest-detail":c("查看静息详情");break;case"steps-detail":c("查看运动记录");break;case"health-connect":c("管理健康连接");break;case"search":c("打开搜索");break;case"filter-menu":c("筛选菜单");break;case"food-detail":c(`查看 ${d.dataset.food} 详情`);break;case"close-add":this.showPage("progress");break;case"meal-select":c("切换餐次");break;case"toggle-auto":this.toggleAutoDetect();break;case"gallery":c("从相册选择");break;case"voice":c("语音记录");break;case"toggle-sheet":this.toggleSheet();break;case"edit-dish":c(`编辑 ${d.dataset.dish}`);break;case"search-food":c("搜索食物");break;case"view-recent":c("查看全部最近食物");break;case"add-recent":c(`添加 ${d.dataset.food}`);break;case"clear-data":{confirm("确定要清空所有个人数据吗？此操作不可撤销。")&&(this.store.clearAll(),this.activeMeal=null,this.selectedDateIndex=0,c("个人数据已清空"),this.root.innerHTML=this.renderShell(),this.bindNavigation(),this.initProgressPage(),this.initBankPage(),this.initAddPage(),this.startClock());break}case"load-demo":{this.store.loadSampleData(),this.activeMeal="lunch",this.selectedDateIndex=5,c("已加载演示数据"),this.root.innerHTML=this.renderShell(),this.bindNavigation(),this.initProgressPage(),this.initBankPage(),this.initAddPage(),this.startClock();break}}})}showPage(t){const a=this.root.querySelectorAll("[data-page]"),s=this.root.querySelectorAll(".tab-btn, .add-tab"),e=this.root.querySelector("#island");this.currentPage=t,a.forEach(i=>i.classList.toggle("hidden",i.dataset.page!==t)),s.forEach(i=>i.classList.toggle("active",i.dataset.page===t)),e&&(t==="add"?(e.style.transform="translateX(-50%) scaleX(0.4) scaleY(0.6)",e.style.opacity="0.3",this.startCamera()):(e.style.transform="translateX(-50%) scaleX(1) scaleY(1)",e.style.opacity="1",this.camera.stop()))}async startCamera(){const t=this.root.querySelector("#cameraContainer");if(t)try{await this.camera.start(t)}catch{}}initProgressPage(){this.renderDateScroll();const t=this.getDates();t.length>0&&(this.selectedDateIndex=t.length-1,this.selectDate(this.selectedDateIndex));const a=this.root.querySelector("#mealStrip");a&&a.addEventListener("click",s=>{const e=s.target.closest(".meal-mini");if(!e)return;const i=e.dataset.meal;i&&this.toggleMeal(i)})}renderDateScroll(){const t=this.root.querySelector("#dateScroll");if(!t)return;t.innerHTML="";const a=this.getDates();if(a.length===0){const s=document.createElement("div");s.className="date-item active",s.innerHTML='<strong>今天</strong><span class="caption">--</span><span class="kcal">--</span><div class="balance-dot pos"></div>',s.addEventListener("click",()=>c("今天还没有记录")),t.appendChild(s);return}for(let s=a.length-1;s>=0;s--){const e=a[s],i=s===this.selectedDateIndex?"active":"",d=e.deficit==="pos"?"pos":"neg",n=document.createElement("div");n.className=`date-item ${i}`,n.dataset.index=String(s),n.innerHTML=`<strong>${e.day}</strong><span class="caption">${e.date}</span><span class="kcal">${e.kcal.toLocaleString()}</span><div class="balance-dot ${d}"></div>`,n.addEventListener("click",()=>this.selectDate(s)),t.appendChild(n)}t.dataset.initialized||(t.dataset.initialized="true",t.scrollLeft=t.scrollWidth)}selectDate(t){this.selectedDateIndex=t,this.renderDateScroll();const s=this.getDates()[t];if(!s)return;const e=(p,g)=>{const v=this.root.querySelector(p);v&&(v.textContent=g)};e("#eatenKcal",s.eaten.toLocaleString()),e("#deficitKcal",(s.target-s.eaten>0?s.target-s.eaten:s.eaten-s.target).toLocaleString()),e("#leftKcal",s.left.toLocaleString()),e("#targetKcal",s.target.toLocaleString()+" kcal"),e("#totalBurn",(s.active+s.rest).toLocaleString()+" kcal"),e("#bonusKcal","+"+s.active+" kcal"),e("#bonusLabel","+"+s.active),e("#proteinLabel",s.protein+"g");const i=this.root.querySelector("#proteinBar");i&&(i.style.width=s.proteinPct+"%"),e("#proteinPct",s.proteinPct+"%"),e("#carbLabel",s.carb+"g");const d=this.root.querySelector("#carbBar");d&&(d.style.width=s.carbPct+"%"),e("#carbPct",s.carbPct+"%"),e("#fatLabel",s.fat+"g");const n=this.root.querySelector("#fatBar");n&&(n.style.width=s.fatPct+"%"),e("#fatPct",s.fatPct+"%"),e("#activeEnergy",s.active+" kcal"),e("#restEnergy",s.rest+" kcal"),e("#steps",s.steps),e("#workouts",s.workouts+" 次运动");const o=this.root.querySelector(".ring-wrap svg");o&&(o.style.filter="drop-shadow(0 18px 28px rgba(122,69,255,.20))",setTimeout(()=>o.style.filter="drop-shadow(0 12px 18px rgba(122,69,255,.12))",400))}toggleMeal(t){const a=this.root.querySelector("#mealStrip"),s=this.root.querySelector("#mealExpanded");if(!a||!s)return;if(a.querySelectorAll(".meal-mini").forEach(o=>o.classList.remove("active")),this.activeMeal===t){s.classList.remove("open"),this.activeMeal=null;return}this.activeMeal=t;const i=a.querySelector(`[data-meal="${t}"]`);i&&i.classList.add("active");const n=this.getMeals()[t];if(!n){s.innerHTML='<div class="caption meal-meta">还没有记录</div>',s.classList.add("open");return}s.innerHTML=`<div class="caption meal-meta">${n.time} · ${n.kcal} kcal</div>`+n.items.map(o=>`<div class="dish-row" data-action="edit-dish" data-dish="${o.name}"><div class="dish-thumb">${o.thumb}</div><div><strong>${o.name}</strong><p class="caption">${o.desc}</p></div><strong>${o.kcal} kcal</strong></div>`).join(""),s.classList.add("open")}initBankPage(){const t=this.root.querySelector("#chipRow");t&&t.addEventListener("click",a=>{const s=a.target.closest(".chip");if(!s)return;const e=s.dataset.filter;e&&this.setFilter(e)})}setFilter(t){this.root.querySelectorAll(".chip").forEach(i=>i.classList.toggle("active",i.dataset.filter===t));const s=this.root.querySelector("#foodList");if(!s)return;s.querySelectorAll(".food-row").forEach(i=>{if(t==="all"||t==="recent"||t==="food")i.style.display="";else if(t==="brand"){const d=i.querySelector(".brand:not(.empty)");i.style.display=d?"":"none"}else i.style.display="none"})}initAddPage(){const t=this.root.querySelector("#shutterBtn");t&&t.addEventListener("click",()=>{const i=this.camera.capture();c(i?"照片已捕获":"拍照失败，请重试")});const a=this.root.querySelector("#addSheet");if(!a)return;let s=0,e=!1;a.addEventListener("touchstart",i=>{s=i.touches[0].clientY,e=this.sheetExpanded}),a.addEventListener("touchmove",i=>{const d=s-i.touches[0].clientY;d>40&&!e?(this.sheetExpanded=!0,a.classList.add("expanded")):d<-40&&e&&(this.sheetExpanded=!1,a.classList.remove("expanded"))})}toggleAutoDetect(){this.autoDetect=!this.autoDetect;const t=this.root.querySelector("#autoSwitch");t&&t.classList.toggle("off",!this.autoDetect),c(this.autoDetect?"自动识别已开启":"自动识别已关闭")}toggleSheet(){this.sheetExpanded=!this.sheetExpanded;const t=this.root.querySelector("#addSheet");t&&t.classList.toggle("expanded",this.sheetExpanded)}startClock(){const t=()=>{const a=new Date,s=a.getHours().toString().padStart(2,"0"),e=a.getMinutes().toString().padStart(2,"0"),i=this.root.querySelector("#clock");i&&(i.textContent=s+":"+e)};t(),setInterval(t,3e4)}}const b=document.getElementById("app");if(!b)throw new Error("Root element #app not found");const G=new F(b);G.mount();
