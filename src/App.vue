<template>
  <!-- Envelope intro (shows first) -->
  <EnvelopeIntro v-if="!siteReady" @done="onEnvDone" />

  <!-- Main site -->
  <div id="site" :class="{ show: siteReady }">
    <!-- Nav -->
    <nav class="nav" :class="{ solid: scrolled }">
      <div class="nav-logo">C &amp; M</div>
      <div class="nav-d">10 · 08 · 25</div>
    </nav>

    <!-- Hero -->
    <HeroSection />

    <!-- Ticker -->
    <div class="ticker-band">
      <div class="ticker-inner">
        <template v-for="_ in 3" :key="_">
          <span>Chloe &amp; Matt</span><span>✦</span>
          <span>2025 · 10 · 08</span><span>✦</span>
          <span>Love · Laughter · Forever</span><span>✦</span>
          <span>台北 · 某某宴會廳</span><span>✦</span>
        </template>
      </div>
    </div>

    <!-- Date Showcase -->
    <section class="date-section reveal" ref="dateEl">
      <div class="date-bg-year">2025</div>
      <p class="date-eyebrow">Save the Date</p>
      <div class="date-calendar">
        <div class="cal-block">
          <div class="cal-lbl">Month</div>
          <div class="cal-num">10</div>
          <div class="cal-sub">October</div>
        </div>
        <div class="cal-block highlight">
          <div class="cal-lbl" style="color:rgba(255,255,255,.6)">Day</div>
          <div class="cal-num">08</div>
          <div class="cal-sub" style="color:rgba(255,255,255,.6)">Wednesday</div>
        </div>
        <div class="cal-block">
          <div class="cal-lbl">Year</div>
          <div class="cal-num">25</div>
          <div class="cal-sub">2025</div>
        </div>
      </div>
      <p class="date-day-name">星期三 · 下午 5:00</p>
      <p class="date-tagline"><span class="date-underline">save our date!</span></p>
    </section>

    <!-- Info -->
    <section class="info-section reveal" ref="infoEl">
      <p class="sec-eyebrow">Wedding Details</p>
      <h2 class="sec-title">婚禮資訊</h2>
      <div class="sec-rule"></div>
      <div class="info-grid">
        <div class="info-card" v-for="card in infoCards" :key="card.label">
          <div class="ic-icon">{{ card.icon }}</div>
          <div>
            <div class="ic-lbl">{{ card.label }}</div>
            <div class="ic-main">{{ card.main }}</div>
            <div class="ic-sub" v-html="card.sub"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Transport (interactive tabs) -->
    <TransportSection />

    <!-- Photos Strip -->
    <section class="photos-section reveal" ref="photosEl">
      <p class="sec-eyebrow" style="padding:0 28px;display:block;margin-bottom:8px;">Our Story</p>
      <div class="sec-rule" style="margin:0 auto 36px;display:block;"></div>
      <div class="strip">
        <div class="p-card" v-for="i in 5" :key="i">
          <div class="p-ph"><span>🤍</span><p>Photo {{ i }}</p></div>
        </div>
      </div>
      <p class="strip-hint">← 左右滑動 →</p>
    </section>

    <!-- Seating -->
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

    <!-- Timeline -->
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

    <!-- Menu -->
    <section class="menu-section reveal" ref="menuEl">
      <p class="sec-eyebrow">Menu</p>
      <h2 class="sec-title">菜單</h2>
      <div class="sec-rule"></div>
      <p class="menu-note">自助式晚宴，葷素皆有<br>請盡情享用！</p>
      <div class="menu-categories">
        <div class="menu-cat" :class="{ open: openMenus.includes(i) }" v-for="(cat, i) in menuCats" :key="i" @click="toggleMenu(i)">
          <div class="menu-cat-head">
            <span class="menu-cat-title">{{ cat.title }}</span>
            <span class="menu-cat-icon">▾</span>
          </div>
          <div class="menu-cat-body">
            <div class="menu-items">
              <div class="menu-item" v-for="item in cat.items" :key="item">{{ item }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Photo Upload -->
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

    <!-- RSVP -->
    <RsvpSection />

    <!-- Footer -->
    <footer>
      <div class="ft-names">Chloe &amp; Matt</div>
      <div class="ft-date">2025 · 10 · 08 &nbsp;·&nbsp; 台北</div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import EnvelopeIntro from './components/EnvelopeIntro.vue'
import HeroSection from './components/HeroSection.vue'
import TransportSection from './components/TransportSection.vue'
import RsvpSection from './components/RsvpSection.vue'

const siteReady = ref(false)
const scrolled = ref(false)
const isDragging = ref(false)
const uploadedPhotos = ref([])
const openMenus = ref([])

// Refs for reveal sections
const dateEl = ref(null)
const infoEl = ref(null)
const photosEl = ref(null)
const seatingEl = ref(null)
const timelineEl = ref(null)
const menuEl = ref(null)
const uploadEl = ref(null)

function onEnvDone() {
  siteReady.value = true
  document.body.style.overflow = ''
}

const infoCards = [
  {
    icon: '🗓',
    label: 'Date & Time',
    main: '2025 年 10 月 8 日',
    sub: '星期三 · 下午 5:00 正式開始<br>迎賓時間 4:30',
  },
  {
    icon: '📍',
    label: 'Venue',
    main: '某某宴會廳',
    sub: '台北市松山區某某路 1 號<br><a href="https://maps.google.com" target="_blank">開啟地圖導航 →</a>',
  },
  {
    icon: '👗',
    label: 'Dress Code',
    main: 'Smart Formal',
    sub: '正式禮服，請避免全白或全黑',
  },
]

const timeline = [
  { time: '16:30', title: '迎賓入席', flower: '🌸' },
  { time: '17:00', title: '開場白', flower: '💐' },
  { time: '17:10', title: '宣讀誓言', flower: '🌼' },
  { time: '17:20', title: '交換戒指', flower: '💍' },
  { time: '17:30', title: '新人互相致詞', flower: '🌷' },
  { time: '17:45', title: '揭開妙緣帕', flower: '🌺' },
  { time: '18:00', title: '晚宴 · 拋捧花', flower: '💒' },
]

const menuCats = [
  {
    title: '🥗 　前菜 / Appetizer',
    items: ['生菜沙拉 · 季節時蔬', '凱薩沙拉 · 帕馬森起司', '精選冷盤拼盤', '新鮮水果塔'],
  },
  {
    title: '🍖 　主菜 / Main Course',
    items: ['香煎菲力牛排', '慢燉羊小排', '香烤雞腿排 · 普羅旺斯風', '清蒸鮮魚 · 薑蔥醬油', '素食：野菇燉飯'],
  },
  {
    title: '🎂 　甜點 / Dessert',
    items: ['婚禮蛋糕', '法式馬卡龍', '巧克力噴泉 · 水果串燒', '台式甜湯'],
  },
]

function toggleMenu(i) {
  const idx = openMenus.value.indexOf(i)
  if (idx === -1) openMenus.value.push(i)
  else openMenus.value.splice(idx, 1)
}

function onDrop(e) {
  isDragging.value = false
  handleFiles(e.dataTransfer.files)
}

function handleFiles(files) {
  [...files].forEach(file => {
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = e => uploadedPhotos.value.push(e.target.result)
    reader.readAsDataURL(file)
  })
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    scrolled.value = window.scrollY > 60
  })

  const io = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
    { threshold: 0.07 }
  )
  ;[dateEl, infoEl, photosEl, seatingEl, timelineEl, menuEl, uploadEl].forEach(r => {
    if (r.value) io.observe(r.value)
  })
})
</script>

<style>
/* ── NAV ── */
#site { opacity: 0; transition: opacity 1s; }
#site.show { opacity: 1; }

.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 200;
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px 24px; transition: all .4s;
}
.nav.solid {
  background: rgba(250,248,243,.96);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
}
.nav-logo { font-family: 'Dancing Script', cursive; font-size: 22px; color: var(--green); }
.nav-d { font-family: 'Cormorant Garamond', serif; font-size: 12px; letter-spacing: 3px; color: var(--muted); }

/* ── TICKER ── */
.ticker-band { background: var(--green); overflow: hidden; padding: 14px 0; }
.ticker-inner {
  display: flex; gap: 48px; white-space: nowrap;
  animation: ticker 20s linear infinite;
  font-family: 'Cormorant Garamond', serif; font-style: italic;
  font-size: 14px; color: rgba(255,255,255,.65); letter-spacing: 2px;
}

/* ── DATE ── */
.date-section {
  background: var(--white); padding: 80px 28px;
  text-align: center; position: relative; overflow: hidden;
}
.date-bg-year {
  position: absolute;
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(100px, 32vw, 200px); font-weight: 300;
  color: rgba(61,81,64,.04);
  top: 50%; left: 50%; transform: translate(-50%, -50%);
  white-space: nowrap; pointer-events: none; letter-spacing: -4px;
}
.date-eyebrow {
  font-family: 'Cormorant Garamond', serif;
  font-size: 11px; letter-spacing: 6px; text-transform: uppercase;
  color: var(--muted); margin-bottom: 36px;
}
.date-calendar {
  display: flex; align-items: stretch; justify-content: center;
  max-width: 340px; margin: 0 auto 36px;
  border: 1.5px solid var(--border); border-radius: 4px; overflow: hidden;
  position: relative; z-index: 2;
}
.cal-block {
  flex: 1; padding: 20px 8px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 4px; background: var(--white);
}
.cal-block + .cal-block { border-left: 1.5px solid var(--border); }
.cal-block.highlight { background: var(--green); }
.cal-lbl {
  font-family: 'Cormorant Garamond', serif;
  font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--muted);
}
.cal-num {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(42px, 12vw, 58px); font-weight: 300; line-height: 1; color: var(--ink);
}
.cal-block.highlight .cal-num { color: var(--white); }
.cal-sub { font-size: 11px; letter-spacing: 1px; color: var(--muted); margin-top: 4px; }
.date-day-name {
  font-family: 'Playfair Display', serif; font-style: italic;
  font-size: 18px; color: var(--green); margin-bottom: 8px; position: relative; z-index: 2;
}
.date-tagline {
  font-family: 'Dancing Script', cursive;
  font-size: clamp(26px, 7vw, 36px); color: var(--ink); position: relative; z-index: 2;
}
.date-underline { display: inline-block; border-bottom: 2px solid var(--red); padding-bottom: 2px; }

/* ── INFO ── */
.info-section {
  background: url('/bg.png') center center / cover no-repeat, #ffffff;
  min-height: 1000px;
  padding: 100px 28px;
  position: relative;
  z-index: 2;
  overflow: hidden;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.sec-eyebrow {
  font-family: 'Cormorant Garamond', serif;
  font-size: 11px; letter-spacing: 5px; text-transform: uppercase;
  color: var(--green-lt); text-align: center; margin-bottom: 8px;
}
.sec-title {
  font-family: 'Dancing Script', cursive;
  font-size: clamp(30px, 8vw, 44px); color: var(--ink);
  text-align: center; margin-bottom: 6px;
}
.sec-rule { width: 40px; height: 1.5px; background: var(--green); margin: 0 auto 40px; }
.info-grid { display: flex; flex-direction: column; gap: 14px; max-width: 440px; margin: 0 auto; }
.info-card {
  background: var(--white); border: 1px solid var(--border);
  border-radius: 8px; padding: 20px 18px;
  display: flex; gap: 14px; align-items: flex-start;
}
.ic-icon { font-size: 20px; flex-shrink: 0; margin-top: 2px; }
.ic-lbl { font-size: 10px; letter-spacing: 3px; color: var(--green-lt); text-transform: uppercase; margin-bottom: 4px; }
.ic-main { font-family: 'Playfair Display', serif; font-style: italic; font-size: 18px; color: var(--ink); margin-bottom: 3px; }
.ic-sub { font-size: 13px; color: var(--muted); line-height: 1.8; }
.ic-sub a { color: var(--green); text-decoration: none; border-bottom: 1px dotted var(--green-lt); }

/* ── PHOTOS ── */
.photos-section { background: var(--cream); padding: 72px 0; }
.strip {
  display: flex; gap: 12px; padding: 4px 28px;
  overflow-x: auto; scrollbar-width: none;
  scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;
}
.strip::-webkit-scrollbar { display: none; }
.p-card {
  flex: 0 0 190px; scroll-snap-align: center;
  border-radius: 95px 95px 10px 10px; overflow: hidden;
  background: var(--border); height: 270px;
  display: flex; align-items: center; justify-content: center;
}
.p-card img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s; }
.p-card:hover img { transform: scale(1.05); }
.p-ph { color: var(--green-lt); text-align: center; }
.p-ph span { display: block; font-size: 24px; opacity: .4; margin-bottom: 6px; }
.p-ph p { font-size: 9px; letter-spacing: 2px; opacity: .4; text-transform: uppercase; }
.strip-hint { text-align: center; font-size: 11px; letter-spacing: 2px; color: var(--muted); margin-top: 14px; padding: 0 28px; }

/* ── SEATING ── */
.seating-section { background: var(--white); padding: 72px 28px; }
.seating-img-wrap {
  max-width: 440px; margin: 0 auto;
  border: 1px solid var(--border); border-radius: 8px;
  overflow: hidden; background: var(--cream);
  min-height: 280px; display: flex; align-items: center; justify-content: center;
}
.seating-ph { text-align: center; color: var(--green-lt); padding: 40px; }
.seating-ph span { display: block; font-size: 36px; opacity: .4; margin-bottom: 12px; }
.seating-ph p { font-size: 11px; letter-spacing: 2px; opacity: .5; text-transform: uppercase; line-height: 1.8; }

/* ── TIMELINE ── */
.timeline-section { background: var(--cream); padding: 72px 28px; }
.timeline { max-width: 340px; margin: 0 auto; position: relative; }
.timeline::before {
  content: ''; position: absolute;
  left: 50%; top: 0; bottom: 0;
  width: 1px; background: var(--border);
  transform: translateX(-50%); z-index: 0;
}
.tl-item {
  display: grid; grid-template-columns: 1fr 16px 1fr;
  align-items: start; margin-bottom: 36px; position: relative;
}
.tl-dot {
  width: 10px; height: 10px; border-radius: 50%;
  background: var(--green); grid-column: 2; justify-self: center;
  margin-top: 5px; position: relative; z-index: 1;
  box-shadow: 0 0 0 4px var(--cream);
}
.tl-left { grid-column: 1; text-align: right; padding-right: 14px; }
.tl-right { grid-column: 3; text-align: left; padding-left: 14px; }
.tl-time { font-family: 'Cormorant Garamond', serif; font-size: 13px; color: var(--muted); letter-spacing: 1px; padding-top: 3px; }
.tl-title { font-size: 13px; color: var(--ink); font-weight: 400; line-height: 1.5; }
.tl-flower { font-size: 14px; margin-top: 3px; opacity: .75; display: block; }

/* ── MENU ── */
.menu-section { background: var(--white); padding: 72px 28px; }
.menu-note {
  text-align: center; font-family: 'Playfair Display', serif;
  font-style: italic; font-size: 15px; color: var(--muted);
  margin-bottom: 32px; line-height: 1.8;
  max-width: 320px; margin-left: auto; margin-right: auto;
}
.menu-categories { max-width: 440px; margin: 0 auto; display: flex; flex-direction: column; gap: 20px; }
.menu-cat { border: 1px solid var(--border); border-radius: 8px; overflow: hidden; }
.menu-cat-head {
  background: var(--green); color: var(--white); padding: 14px 18px;
  display: flex; justify-content: space-between; align-items: center; cursor: pointer;
}
.menu-cat-title { font-family: 'Cormorant Garamond', serif; font-size: 14px; letter-spacing: 3px; text-transform: uppercase; }
.menu-cat-icon { font-size: 18px; transition: transform .3s; }
.menu-cat.open .menu-cat-icon { transform: rotate(180deg); }
.menu-cat-body { max-height: 0; overflow: hidden; transition: max-height .4s ease; background: var(--cream); }
.menu-cat.open .menu-cat-body { max-height: 400px; }
.menu-items { padding: 14px 18px; display: flex; flex-direction: column; gap: 8px; }
.menu-item { font-size: 13px; color: var(--ink); line-height: 1.6; padding-left: 14px; position: relative; }
.menu-item::before { content: '✦'; position: absolute; left: 0; color: var(--green-lt); font-size: 8px; top: 4px; }

/* ── UPLOAD ── */
.upload-section { background: var(--cream); padding: 72px 28px; }
.upload-note { text-align: center; font-size: 13px; color: var(--muted); line-height: 1.9; margin-bottom: 28px; max-width: 320px; margin-left: auto; margin-right: auto; }
.upload-area {
  max-width: 440px; margin: 0 auto 20px;
  border: 2px dashed var(--green-pale);
  border-radius: 10px; padding: 40px 24px;
  text-align: center; cursor: pointer;
  transition: all .3s; background: var(--white);
}
.upload-area:hover, .upload-area.drag { border-color: var(--green); background: rgba(143,168,130,.05); }
.upload-icon { font-size: 40px; margin-bottom: 12px; opacity: .5; }
.upload-txt { font-size: 13px; color: var(--muted); line-height: 1.7; }
.upload-btn {
  display: inline-block; margin-top: 12px; padding: 10px 28px;
  background: var(--green); color: #fff; border-radius: 100px;
  font-size: 12px; letter-spacing: 2px; text-transform: uppercase;
  font-family: 'Cormorant Garamond', serif; cursor: pointer; border: none;
  transition: background .3s;
}
.upload-btn:hover { background: var(--green-lt); }
.upload-gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; max-width: 440px; margin: 0 auto; }
.ugallery-item { aspect-ratio: 1; border-radius: 6px; overflow: hidden; background: var(--border); }
.ugallery-item img { width: 100%; height: 100%; object-fit: cover; }

/* ── FOOTER ── */
footer { background: var(--green); padding: 52px 24px; text-align: center; }
.ft-names { font-family: 'Dancing Script', cursive; font-size: 34px; color: #fff; margin-bottom: 8px; }
.ft-date { font-family: 'Cormorant Garamond', serif; font-size: 13px; letter-spacing: 4px; color: rgba(255,255,255,.5); }

/* ── REVEAL ── */
.reveal { opacity: 0; transform: translateY(24px); transition: opacity .85s ease, transform .85s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }
</style>