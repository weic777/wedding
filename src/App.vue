<template>
  <div id="site" :class="{ show: siteReady }">

    <nav class="nav" :class="{ solid: scrolled }">
      <div class="nav-logo">C &amp; M</div>
      <div class="nav-d">11 · 22 · 26</div>
    </nav>

    <HeroSection />

    <div class="ticker-band">
      <div class="ticker-inner">
        <template v-for="_ in 3" :key="_">
          <span>Chloe &amp; Matt</span><span>✦</span>
          <span>2026 · 11 · 22</span><span>✦</span>
          <span>Love · Laughter · Forever</span><span>✦</span>
          <span>新店 · 優勝美地</span><span>✦</span>
        </template>
      </div>
    </div>

    <section class="date-section reveal" ref="dateEl">
      <p class="date-eyebrow">Save the Date &nbsp;·&nbsp; 婚禮日期</p>
      <p class="date-month">November</p>
      <div class="date-row">
        <div class="date-cell">
          <span class="dc-top">六</span>
          <span class="dc-num">21</span>
        </div>
        <div class="date-cell featured">
          <span class="dc-top">日</span>
          <span class="dc-num">22</span>
          <svg class="hand-circle" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="brush4" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="5" seed="33" result="noise"/>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G"/>
              </filter>
            </defs>
            <path class="circle-path c1"
              d="M155,78 C164,44 206,28 240,52 C274,76 278,122 254,154 C232,182 200,202 174,220 C164,228 158,240 154,252 C150,240 142,226 128,216 C100,196 64,172 44,140 C24,108 32,64 66,46 C100,28 142,46 153,74"
              stroke="#8a9a72" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" fill="none"
              style="filter: url(#brush4)"/>
          </svg>
        </div>
        <div class="date-cell">
          <span class="dc-top">一</span>
          <span class="dc-num">23</span>
        </div>
      </div>
      <p class="date-meta">2026 年 11 月 22 日　·　星期日　·　下午 5:00</p>
      <p class="date-tagline"><span class="date-underline">save our date!</span></p>
    </section>

    <section class="info-section reveal" ref="infoEl">
      <div class="dc-block">
        <p class="dc-eyebrow">The Attire</p>
        <div class="dc-title-wrap">
          <span class="dc-title-caps">DRESS</span>
          <span class="dc-title-script">Code</span>
        </div>
        <p class="dc-theme">The wedding theme is <em>Old Money</em></p>
        <p class="dc-note">正式禮服 · 請避免全白（新娘專屬）或全黑<br>歡迎穿著以下色系出席</p>
        <div class="dc-swatches">
          <div class="dc-swatch" style="background:#e8e4db;"></div>
          <div class="dc-swatch" style="background:#a8956e;"></div>
          <div class="dc-swatch" style="background:#2e2c28;"></div>
          <div class="dc-swatch" style="background:#c8c4bc;"></div>
          <div class="dc-swatch" style="background:#f0ece4;"></div>
        </div>
        <p class="dc-white-note">White is reserved for the bride —<br>thank you for understanding!</p>
      </div>
    </section>

    <TransportSection />

    <!-- ════════════════════════════════════
         MENU SECTION
    ════════════════════════════════════ -->
    <section class="menu-section reveal" ref="photosEl">

      <!-- 標題 -->
      <div class="menu-header">
        <p class="sec-eyebrow">Yosemite</p>
        <h2 class="sec-title">Menu</h2>
        <div class="sec-rule"></div>
      </div>

      <!-- 插圖選擇器：三個圖，純浮空，無任何容器感 -->
      <div class="menu-selector">
        <button
          v-for="(item, i) in menuItems"
          :key="i"
          class="ms-btn"
          :class="{ active: activeMenu === i }"
          @click="switchMenu(i)"
        >
          <img :src="item.svg" :alt="item.label" class="ms-illus" draggable="false">
          <span class="ms-label">{{ item.label }}</span>
          <span class="ms-label-zh">{{ item.labelZh }}</span>
        </button>
      </div>

      <!-- 細分隔線 -->
      <div class="menu-divider">
        <div class="menu-divider-track">
          <div class="menu-divider-fill" :style="{ left: activeMenu * 33.333 + '%' }"></div>
        </div>
      </div>

      <!-- 菜單圖片 -->
      <div class="menu-img-stage">
        <Transition :name="menuDir" mode="out-in">
          <img
            :key="activeMenu"
            :src="menuItems[activeMenu].img"
            :alt="menuItems[activeMenu].label"
            class="menu-big-img"
          />
        </Transition>
      </div>

    </section>

    <!-- SEATING -->
    <section class="seating-section reveal" ref="seatingEl">
      <p class="sec-eyebrow">Seating</p>
      <h2 class="sec-title">座位圖</h2>
      <div class="sec-rule"></div>
      <div class="seating-img-wrap">
        <div class="seating-ph">
          <span>🪑</span>
          <p>座位圖將於婚禮前公佈<br>請留意新娘新郎的通知</p>
        </div>
      </div>
    </section>

    <!-- TIMELINE -->
    <section class="timeline-section reveal" ref="timelineEl">
      <p class="sec-eyebrow">Programme</p>
      <h2 class="sec-title">當日流程</h2>
      <div class="sec-rule"></div>
      <div class="timeline">
        <div class="tl-item" v-for="(item, i) in timeline" :key="i">
          <div class="tl-left">
            <template v-if="i % 2 === 0">
              <div class="tl-title">{{ item.title }}</div>
              <span class="tl-flower">{{ item.flower }}</span>
            </template>
            <template v-else>
              <div class="tl-time">{{ item.time }}</div>
            </template>
          </div>
          <div class="tl-dot"></div>
          <div class="tl-right">
            <template v-if="i % 2 === 0">
              <div class="tl-time">{{ item.time }}</div>
            </template>
            <template v-else>
              <div class="tl-title">{{ item.title }}</div>
              <span class="tl-flower">{{ item.flower }}</span>
            </template>
          </div>
        </div>
      </div>
    </section>

    <!-- UPLOAD -->
    <section class="upload-section reveal" ref="uploadEl">
      <p class="sec-eyebrow">Gallery</p>
      <h2 class="sec-title">上傳照片</h2>
      <div class="sec-rule"></div>
      <p class="upload-note">婚禮當天的美好時刻<br>歡迎大家上傳到這裡與我們一起珍藏 📸</p>
      <div class="upload-area" :class="{ drag: isDragging }"
        @click="$refs.fileInput.click()"
        @dragover.prevent="isDragging = true"
        @dragleave="isDragging = false"
        @drop.prevent="onDrop">
        <input ref="fileInput" type="file" accept="image/*" multiple style="display:none" @change="e => handleFiles(e.target.files)">
        <div class="upload-icon">📷</div>
        <div class="upload-txt">點擊或拖曳照片至此處</div>
        <button class="upload-btn" @click.stop="$refs.fileInput.click()">選擇照片</button>
      </div>
      <div class="upload-gallery">
        <div class="ugallery-item" v-for="(src, i) in uploadedPhotos" :key="i">
          <img :src="src" alt="">
        </div>
      </div>
    </section>

    <RsvpSection />

    <footer>
      <div class="ft-names">Chloe &amp; Matt</div>
      <div class="ft-date">2026 · 11 · 22 &nbsp;·&nbsp; 新店</div>
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import HeroSection from './components/HeroSection.vue'
import TransportSection from './components/TransportSection.vue'
import RsvpSection from './components/RsvpSection.vue'

import imgStarter    from '../public/menu-Starter.jpg'
import imgMainCourse from '../public/menu-MainCourse.jpg'
import imgOther      from '../public/menu-Other.jpg'
import svgMainCourse from '../public/MainCourse.svg'

const menuItems = [
  { label: 'Starter',     labelZh: '前菜',              img: imgStarter,    svg: svgMainCourse },
  { label: 'Main Course', labelZh: '主菜',              img: imgMainCourse, svg: svgMainCourse },
  { label: 'Soup & More', labelZh: '湯品 · 飲料 · 甜點', img: imgOther,      svg: svgMainCourse },
]

const siteReady      = ref(true)
const scrolled       = ref(false)
const isDragging     = ref(false)
const uploadedPhotos = ref([])
const activeMenu     = ref(0)
const menuDir        = ref('menu-r')

function switchMenu(i) {
  menuDir.value = i > activeMenu.value ? 'menu-r' : 'menu-l'
  activeMenu.value = i
}

const dateEl = ref(null), infoEl = ref(null), photosEl = ref(null)
const seatingEl = ref(null), timelineEl = ref(null), uploadEl = ref(null)

const timeline = [
  { time: '16:30', title: '迎賓入席',      flower: '🌸' },
  { time: '17:00', title: '開場白',        flower: '💐' },
  { time: '17:10', title: '宣讀誓言',      flower: '🌼' },
  { time: '17:20', title: '交換戒指',      flower: '💍' },
  { time: '17:30', title: '新人互相致詞',  flower: '🌷' },
  { time: '17:45', title: '揭開妙緣帕',    flower: '🌺' },
  { time: '18:00', title: '晚宴 · 拋捧花', flower: '💒' },
]

function onDrop(e) { isDragging.value = false; handleFiles(e.dataTransfer.files) }
function handleFiles(files) {
  ;[...files].forEach(f => {
    if (!f.type.startsWith('image/')) return
    const r = new FileReader()
    r.onload = e => uploadedPhotos.value.push(e.target.result)
    r.readAsDataURL(f)
  })
}

onMounted(() => {
  window.addEventListener('scroll', () => { scrolled.value = window.scrollY > 60 })

  const io = new IntersectionObserver(
    es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
    { threshold: 0.07 }
  )
  ;[infoEl, photosEl, seatingEl, timelineEl, uploadEl].forEach(r => r.value && io.observe(r.value))

  const dio = new IntersectionObserver(
    es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); dio.unobserve(e.target) }
    }),
    { threshold: 0.3 }
  )
  if (dateEl.value) dio.observe(dateEl.value)
})
</script>

<style>
#site { opacity: 0; transition: opacity 1s; }
#site.show { opacity: 1; }

/* NAV */
.nav { position: fixed; top: 0; left: 0; right: 0; z-index: 200; display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; transition: all .4s; }
.nav.solid { background: rgba(250,248,243,.96); backdrop-filter: blur(8px); border-bottom: 1px solid var(--border); }
.nav-logo { font-family: 'Dancing Script', cursive; font-size: 22px; color: var(--green); }
.nav-d    { font-family: 'Cormorant Garamond', serif; font-size: 12px; letter-spacing: 3px; color: var(--muted); }

/* TICKER */
.ticker-band { background: var(--green); overflow: hidden; padding: 14px 0; }
.ticker-inner { display: flex; gap: 48px; white-space: nowrap; animation: ticker 20s linear infinite; font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 14px; color: rgba(255,255,255,.65); letter-spacing: 2px; }

/* DATE */
.date-section { background: var(--white); padding: 80px 0 72px; text-align: center; position: relative; overflow: hidden; }
.date-month { font-family: 'Cormorant Garamond', serif; font-size: clamp(36px,10vw,64px); font-weight: 300; font-style: italic; letter-spacing: .08em; color: #3d5140; opacity: .5; margin: 0 0 24px; line-height: 1; }
.date-eyebrow { font-family: 'Cormorant Garamond', serif; font-size: 11px; letter-spacing: 6px; text-transform: uppercase; color: var(--muted); margin-bottom: 20px; }
.date-row { display: flex; align-items: stretch; margin: 0 0 28px; border-top: 2.5px solid #3d5140; border-bottom: 2.5px solid #3d5140; }
.date-cell { flex: 1; display: flex; flex-direction: column; align-items: center; border-right: 2.5px solid #3d5140; position: relative; }
.date-cell:first-child { border-left: none; } .date-cell:last-child { border-right: none; }
.dc-top { font-family: 'Noto Serif TC', serif; font-size: clamp(11px,1.4vw,15px); letter-spacing: 2px; color: var(--muted); opacity: .5; width: 100%; text-align: center; height: 44px; line-height: 44px; border-bottom: 2.5px solid #3d5140; flex-shrink: 0; display: block; position: relative; z-index: 2; }
.dc-num { font-family: 'Cormorant Garamond', serif; font-size: clamp(72px,17vw,130px); font-weight: 300; line-height: 1; color: var(--muted); opacity: .25; flex: 1; display: flex; align-items: center; justify-content: center; width: 100%; position: relative; z-index: 2; margin-bottom: 50px; }
.date-cell.featured .dc-num { color: var(--ink); opacity: 1; font-size: clamp(88px,22vw,160px); }
.date-cell.featured .dc-top { color: var(--ink); opacity: .65; }
.hand-circle { position: absolute; top: 50%; left: 52%; transform: translate(-50%,-40%) rotate(-6deg); width: 118%; height: 112%; pointer-events: none; overflow: visible; z-index: 10; }
.circle-path { stroke-dasharray: 1100; stroke-dashoffset: 1100; }
.date-section.visible .c1 { animation: draw-heart 3s cubic-bezier(.4,0,.2,1) .3s forwards; }
@keyframes draw-heart { to { stroke-dashoffset: 0; } }
.date-meta { font-family: 'Noto Serif TC', serif; font-size: clamp(12px,1.4vw,16px); color: var(--muted); letter-spacing: 1px; margin-bottom: 16px; opacity: .7; }
.date-tagline { font-family: 'Dancing Script', cursive; font-size: clamp(26px,7vw,38px); color: var(--ink); }
.date-underline { display: inline-block; border-bottom: 2.5px solid var(--green); padding-bottom: 2px; }

/* DRESS CODE */
.info-section { background: url('/bg.png') center center / 100% 100% no-repeat, #ffffff; min-height: 1000px; padding: 100px 5vw; position: relative; z-index: 2; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; }
@media (max-width: 768px) { .info-section { background: url('/bg-m.png') center center / 100% 100% no-repeat, #ffffff; min-height: 0; } }
.dc-block { width: 100%; text-align: center; }
.dc-eyebrow { font-family: 'Cormorant Garamond', serif; font-size: clamp(11px,1.2vw,15px); letter-spacing: 6px; text-transform: uppercase; color: var(--muted); margin-bottom: 14px; opacity: .7; }
.dc-title-wrap { display: flex; align-items: baseline; justify-content: center; gap: 16px; margin-bottom: 20px; }
.dc-title-caps { font-family: 'Cormorant Garamond', serif; font-size: clamp(36px,7vw,80px); font-weight: 600; letter-spacing: 8px; color: var(--ink); text-transform: uppercase; }
.dc-title-script { font-family: 'Dancing Script', cursive; font-size: clamp(44px,9vw,100px); color: var(--ink); }
.dc-theme { font-family: 'Cormorant Garamond', serif; font-size: clamp(16px,2vw,26px); color: var(--muted); margin-bottom: 10px; letter-spacing: .5px; }
.dc-theme em { font-family: 'Dancing Script', cursive; font-size: clamp(22px,3vw,40px); color: var(--ink); font-style: normal; }
.dc-note { font-size: clamp(13px,1.4vw,18px); color: var(--muted); line-height: 2; margin-bottom: 32px; letter-spacing: .5px; }
.dc-swatches { display: flex; justify-content: center; gap: clamp(12px,2vw,24px); margin-bottom: 24px; }
.dc-swatch { width: clamp(44px,5.5vw,80px); height: clamp(44px,5.5vw,80px); border-radius: 50%; box-shadow: 0 2px 12px rgba(0,0,0,.1); border: 1.5px solid rgba(0,0,0,.12); transition: transform .2s; }
.dc-swatch:hover { transform: scale(1.12); }
.dc-white-note { font-family: 'Cormorant Garamond', serif; font-size: clamp(13px,1.4vw,18px); font-style: italic; color: var(--muted); line-height: 1.8; opacity: .8; }

/* SHARED */
.sec-eyebrow { font-family: 'Cormorant Garamond', serif; font-size: 11px; letter-spacing: 5px; text-transform: uppercase; color: var(--green-lt); text-align: center; margin-bottom: 8px; }
.sec-title { font-family: 'Dancing Script', cursive; font-size: clamp(30px,8vw,44px); color: var(--ink); text-align: center; margin-bottom: 6px; }
.sec-rule { width: 40px; height: 1.5px; background: var(--green); margin: 0 auto 40px; }

/* ══════════════════════════════════
   MENU SECTION
══════════════════════════════════ */
.menu-section {
  background: var(--cream);
  padding: 80px 0 0;
}

.menu-header {
  text-align: center;
  padding: 0 24px;
  margin-bottom: 40px;
}

/* ── 插圖選擇器：三個純浮空按鈕，沒有任何邊框背景 ── */
.menu-selector {
  display: flex;
  justify-content: center;
  gap: 0;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 16px;
}

.ms-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 8px 12px 20px;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  /* 完全無框感 */
}

/* 插圖本身 */
.ms-illus {
  width: clamp(72px, 12vw, 110px);
  height: clamp(52px, 9vw, 80px);
  object-fit: contain;
  object-position: center;
  display: block;
  /* 非 active：淡化退後 */
  opacity: .35;
  filter: grayscale(20%);
  transform: scale(.9) translateY(4px);
  transition: opacity .45s ease, transform .45s cubic-bezier(.34,1.3,.64,1), filter .45s ease;
}

/* Active 插圖：清晰、放大、浮起 */
.ms-btn.active .ms-illus {
  opacity: 1;
  filter: none;
  transform: scale(1.12) translateY(-4px);
}

.ms-btn:hover:not(.active) .ms-illus {
  opacity: .6;
  transform: scale(.95) translateY(2px);
}

/* 標籤文字 */
.ms-label {
  font-family: 'Cormorant Garamond', serif;
  font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
  color: var(--muted);
  opacity: .5;
  transition: color .35s, opacity .35s;
  white-space: nowrap;
}
.ms-label-zh {
  font-family: 'Noto Serif TC', serif;
  font-size: 10px; letter-spacing: 1px;
  color: var(--muted);
  opacity: 0;
  transition: opacity .35s;
  margin-top: -6px;
}

.ms-btn.active .ms-label {
  color: var(--ink);
  opacity: 1;
}
.ms-btn.active .ms-label-zh {
  opacity: .5;
}

/* ── 細分隔線（帶滑動指示器）── */
.menu-divider {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 16px;
}
.menu-divider-track {
  position: relative;
  height: 1px;
  background: rgba(61,81,64,.12);
}
.menu-divider-fill {
  position: absolute;
  top: 0;
  width: 33.333%;
  height: 100%;
  background: var(--green);
  /* 稍微粗一點，有質感 */
  height: 1.5px;
  top: -0.25px;
  border-radius: 2px;
  transition: left .4s cubic-bezier(.4,0,.2,1);
}

/* ── 圖片區域：全寬，無邊距感 ── */
.menu-img-stage {
  margin-top: 0;
  /* 讓圖片自然延伸到 section 底部 */
  overflow: hidden;
  position: relative;
  /* 固定最大寬度，置中 */
  max-width: 520px;
  margin: 32px auto 0;
  padding: 0 24px 80px;
}

.menu-big-img {
  width: 100%;
  display: block;
  border-radius: 4px;
  /* 輕微陰影，讓圖片有深度感但不俗 */
  box-shadow: 0 2px 40px rgba(61,81,64,.1);
}

/* ── 切換動畫 ── */
.menu-r-enter-active, .menu-r-leave-active,
.menu-l-enter-active, .menu-l-leave-active {
  transition: all .32s cubic-bezier(.4,0,.2,1);
  position: absolute; width: calc(100% - 48px);
}
.menu-r-enter-from { opacity: 0; transform: translateX(24px); }
.menu-r-leave-to   { opacity: 0; transform: translateX(-24px); }
.menu-l-enter-from { opacity: 0; transform: translateX(-24px); }
.menu-l-leave-to   { opacity: 0; transform: translateX(24px); }

/* 靜止時讓 stage 有高度 */
.menu-img-stage { min-height: 200px; }

/* SEATING */
.seating-section { background: var(--white); padding: 72px 28px; }
.seating-img-wrap { max-width: 440px; margin: 0 auto; border: 1px solid var(--border); border-radius: 8px; overflow: hidden; background: var(--cream); min-height: 280px; display: flex; align-items: center; justify-content: center; }
.seating-ph { text-align: center; color: var(--green-lt); padding: 40px; }
.seating-ph span { display: block; font-size: 36px; opacity: .4; margin-bottom: 12px; }
.seating-ph p { font-size: 11px; letter-spacing: 2px; opacity: .5; text-transform: uppercase; line-height: 1.8; }

/* TIMELINE */
.timeline-section { background: var(--cream); padding: 72px 28px; }
.timeline { max-width: 340px; margin: 0 auto; position: relative; }
.timeline::before { content: ''; position: absolute; left: 50%; top: 0; bottom: 0; width: 1px; background: var(--border); transform: translateX(-50%); z-index: 0; }
.tl-item { display: grid; grid-template-columns: 1fr 16px 1fr; align-items: start; margin-bottom: 36px; }
.tl-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--green); grid-column: 2; justify-self: center; margin-top: 5px; z-index: 1; box-shadow: 0 0 0 4px var(--cream); position: relative; }
.tl-left  { grid-column: 1; text-align: right; padding-right: 14px; }
.tl-right { grid-column: 3; text-align: left; padding-left: 14px; }
.tl-time  { font-family: 'Cormorant Garamond', serif; font-size: 13px; color: var(--muted); letter-spacing: 1px; padding-top: 3px; }
.tl-title { font-size: 13px; color: var(--ink); font-weight: 400; line-height: 1.5; }
.tl-flower { font-size: 14px; margin-top: 3px; opacity: .75; display: block; }

/* UPLOAD */
.upload-section { background: var(--white); padding: 72px 28px; }
.upload-note { text-align: center; font-size: 13px; color: var(--muted); line-height: 1.9; margin-bottom: 28px; max-width: 320px; margin-left: auto; margin-right: auto; }
.upload-area { max-width: 440px; margin: 0 auto 20px; border: 2px dashed var(--green-pale); border-radius: 10px; padding: 40px 24px; text-align: center; cursor: pointer; transition: all .3s; background: var(--cream); }
.upload-area:hover, .upload-area.drag { border-color: var(--green); background: rgba(143,168,130,.05); }
.upload-icon { font-size: 40px; margin-bottom: 12px; opacity: .5; }
.upload-txt  { font-size: 13px; color: var(--muted); line-height: 1.7; }
.upload-btn { display: inline-block; margin-top: 12px; padding: 10px 28px; background: var(--green); color: #fff; border-radius: 100px; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; font-family: 'Cormorant Garamond', serif; cursor: pointer; border: none; transition: background .3s; }
.upload-btn:hover { background: var(--green-lt); }
.upload-gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; max-width: 440px; margin: 0 auto; }
.ugallery-item { aspect-ratio: 1; border-radius: 6px; overflow: hidden; background: var(--border); }
.ugallery-item img { width: 100%; height: 100%; object-fit: cover; }

/* FOOTER */
footer { background: var(--green); padding: 52px 24px; text-align: center; }
.ft-names { font-family: 'Dancing Script', cursive; font-size: 34px; color: #fff; margin-bottom: 8px; }
.ft-date  { font-family: 'Cormorant Garamond', serif; font-size: 13px; letter-spacing: 4px; color: rgba(255,255,255,.5); }

/* REVEAL */
.reveal { opacity: 0; transform: translateY(24px); transition: opacity .85s ease, transform .85s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }
</style>