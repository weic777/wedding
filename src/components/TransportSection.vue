<template>
  <section class="transport-section" ref="el">

    <!-- ══ 背景圖 + 深綠色遮罩 ══ -->
    <div class="ts-bg-overlay"></div>

    <!-- ══ 上半：標題區 ══ -->
    <div class="ts-header">
      <p class="ts-eyebrow">Getting Here</p>
      <h2 class="ts-title">Find Us</h2>
      <div class="ts-rule"></div>
    </div>

    <!-- ══ 中：交通資訊卡 ══ -->
    <div class="ts-card-wrap">

      <!-- Tab 按鈕 -->
      <div class="tab-row">
        <button
          v-for="tab in tabs" :key="tab.id"
          class="tab-btn"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          <span class="tab-en">{{ tab.en }}</span>
          <span class="tab-zh">{{ tab.zh }}</span>
        </button>
      </div>

      <!-- 面板 -->
      <transition name="fade" mode="out-in">
        <div class="t-card" :key="activeTab">

          <!-- Shuttle -->
          <template v-if="activeTab === 's'">
            <div class="t-header">
              <div>
                <div class="t-label">Shuttle Bus</div>
                <div class="t-zh">接駁車服務</div>
              </div>
            </div>
            <p class="t-intro">從 <strong>捷運 新店站 1 號出口</strong> 出發，車程約 20 分鐘</p>
            <ul class="t-list">
              <li>婚禮當天提供多班接駁車次</li>
              <li>詳細班次時間將於婚禮前通知</li>
              <li>婚宴結束後約 21:30 提供回程接駁</li>
            </ul>
            <p class="t-notice">接駁車座位數量有限，請於 RSVP 登記，以新人確認為準</p>
          </template>

          <!-- Drive -->
          <template v-else-if="activeTab === 'd'">
            <div class="t-header">
              <div>
                <div class="t-label">Self Drive</div>
                <div class="t-zh">自駕停車</div>
              </div>
            </div>
            <p class="t-intro">場地備有停車場，停車位數量有限</p>
            <ul class="t-list">
              <li>停車位以 RSVP 登記順序分配</li>
              <li>停滿後請改搭接駁車或計程車</li>
              <li>詳細停車資訊將於婚禮前另行通知</li>
            </ul>
            <p class="t-notice">停車位數量有限，請事先登記，以新人確認為準</p>
          </template>

          <!-- Taxi / MRT -->
          <template v-else>
            <div class="t-header">
              <div>
                <div class="t-label">Taxi · MRT</div>
                <div class="t-zh">計程車 · 捷運</div>
              </div>
            </div>
            <p class="t-intro">多種大眾交通方式可抵達</p>
            <ul class="t-list">
              <li>捷運新店站 1 號出口，步行約 5 分鐘</li>
              <li>計程車 / Uber，車資約 NT$ 150–250</li>
              <li>公車多線於新店站附近停靠</li>
            </ul>
          </template>

        </div>
      </transition>

    </div>

    <!-- ══ 地圖 ══ -->
    <div class="ts-map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.329442745808!2d121.53938939999999!3d24.9208446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3468015ecb99aabf%3A0xdc6bca56f6e5c5f2!2z5YSq6IGW576O5Zyw6YSJ5p2R5rih5YGH5Yil5aKFLeaWsOWMl-aWsOW6l-iNieWcsOWpmuemri_mloflrprllpzlrrQv6KiC5amaL-iNieWcsOitieWpmi_msYLlqZov5ama57SX5pSd5b2x5aC05ZywL-e-juW8j-Wpmuemri_miLblpJblqZrnpq4g5aC05Zyw56ef5YCfL-mfs-aoguacgy_ol53ooZPlsZUv5bGV5ryUL-W7o-WRiuaLjeaUnS_pm7voppbmi43mlJ0v6Zu75b2x5ouN5pSdL-aIsuWKh-aLjeaUnSDlg7nmoLzosrvnlKjmlLbosrvmjqjolqYg54ax6ZaA5Lq65rCj5aC05ZywIFBUVCBEY2FyZA!5e0!3m2!1szh-TW!2stw!4v1773386994477!5m2!1szh-TW!2stw"
        allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const activeTab = ref('s')
const el = ref(null)

const tabs = [
  { id: 's', en: 'Shuttle Bus', zh: '接駁車' },
  { id: 'd', en: 'Drive',       zh: '自駕停車' },
  { id: 'm', en: 'Taxi · MRT',  zh: '計程車 · 捷運' },
]

onMounted(() => {
  const io = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) el.value?.classList.add('visible') }),
    { threshold: 0.07 }
  )
  if (el.value) io.observe(el.value)
})
</script>

<style scoped>
/* ── Section ── */
.transport-section {
  position: relative;
  background: url('/FindUs-bg.jpg') center top / cover no-repeat;
  overflow: hidden;
  /* Extend behind the DRESS Code section's decorative torn bottom */
  margin-top: -300px;
  padding-top: 300px;
  z-index: 1;
}

/* 深綠色遮罩 */
.ts-bg-overlay {
  position: absolute;
  inset: 0;
  background: rgba(28, 42, 30, 0.68);
  z-index: 0;
}

/* ── 標題區 ── */
.ts-header {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 80px 24px 40px;
}

.ts-eyebrow {
  font-family: 'Cormorant Garamond', serif;
  font-size: 11px; letter-spacing: 5px; text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  margin-bottom: 10px;
}

.ts-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(44px, 9vw, 88px);
  font-weight: 600; letter-spacing: 12px;
  color: #fff; text-transform: uppercase;
  line-height: 1; margin-bottom: 20px;
}

.ts-rule {
  width: 48px; height: 1px;
  background: rgba(255,255,255,0.35);
  margin: 0 auto;
}

/* ── 交通資訊卡 ── */
.ts-card-wrap {
  position: relative;
  z-index: 1;
  max-width: 580px;
  margin: 0 auto;
  padding: 0 24px 60px;
}

/* ══ Tab 按鈕 ══ */
.tab-row {
  display: flex;
  width: 100%;
  border: 1.5px solid rgba(255,255,255,0.3);
  margin-bottom: 0;
}
.tab-btn {
  flex: 1; padding: 14px 6px;
  border: none; border-right: 1.5px solid rgba(255,255,255,0.3);
  background: rgba(255,255,255,0.08);
  cursor: pointer;
  transition: background .2s;
  display: flex; flex-direction: column;
  align-items: center; gap: 3px;
}
.tab-btn:last-child { border-right: none; }
.tab-btn.active { background: rgba(255,255,255,0.18); }
.tab-en {
  font-family: 'Cormorant Garamond', serif;
  font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
  color: rgba(255,255,255,0.55); transition: color .2s;
}
.tab-zh {
  font-family: 'Noto Serif TC', serif;
  font-size: 12px; color: rgba(255,255,255,0.9); transition: color .2s;
}
.tab-btn.active .tab-en { color: rgba(255,255,255,0.8); }
.tab-btn.active .tab-zh { color: #fff; }

/* ══ 卡片 ══ */
.t-card {
  width: 100%; text-align: left;
  padding: 24px 26px;
  background: rgba(250, 248, 243, 0.92);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  min-height: 290px; /* Pre-reserve height to prevent layout jump on desktop */
}

.t-header {
  display: flex; align-items: center;
  gap: 14px; margin-bottom: 16px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(0,0,0,0.1);
}
.t-label {
  font-family: 'Cormorant Garamond', serif;
  font-size: 18px; font-weight: 600; letter-spacing: 2px;
  color: var(--ink); text-transform: uppercase; line-height: 1.2;
}
.t-zh {
  font-family: 'Noto Serif TC', serif;
  font-size: 11px; color: var(--muted); margin-top: 2px;
}

.t-intro {
  font-size: 13px; color: var(--muted);
  line-height: 1.9; margin-bottom: 10px;
}
.t-intro strong { color: var(--ink); }

.t-list {
  list-style: none; padding: 0; margin: 0 0 14px;
  display: flex; flex-direction: column; gap: 7px;
}
.t-list li {
  font-size: 13px; color: var(--ink); line-height: 1.7;
  padding-left: 16px; position: relative;
}
.t-list li::before {
  content: '–'; position: absolute; left: 0;
  color: var(--green-lt);
}

.t-notice {
  font-size: 11px; color: var(--muted); font-style: italic;
  border-top: 1px solid var(--border);
  padding-top: 10px; line-height: 1.7;
}

/* ══ Transition ══ */
.fade-enter-active, .fade-leave-active { transition: opacity .2s, transform .2s; }
.fade-enter-from { opacity: 0; transform: translateY(6px); }
.fade-leave-to   { opacity: 0; transform: translateY(-4px); }

/* ══ 地圖 ══ */
.ts-map {
  position: relative;
  z-index: 1;
  width: 100%; height: 380px; overflow: hidden;
}
.ts-map iframe {
  width: 100%; height: 100%; border: 0; display: block;
  filter: saturate(.65) contrast(1.05);
}

/* ══ RWD ══ */
@media (max-width: 768px) {
  .ts-header { padding: 60px 24px 32px; }
  .ts-map { height: 280px; }
  .t-card { min-height: 330px; } /* Slightly larger min-height on mobile for text wrapping */
}
</style>