<template>
  <section class="transport-section" ref="el">

    <div class="ts-bg-overlay"></div>

    <div class="ts-header ts-inner">
      <p class="sec-eyebrow ts-eyebrow">Getting Here &nbsp;·&nbsp; 交通資訊</p>
      <h2 class="sec-title ts-title">Find Us</h2>
      <div class="ts-rule"></div>
    </div>

    <div class="ts-card-wrap ts-inner" style="transition-delay:.15s">
      <div class="t-card">
        <div class="t-frame">
          <img :src="bgUrl" class="t-frame-img" alt="">
        </div>

        <div class="t-content">
          <div class="t-block">
            <div class="t-label">Shuttle Bus</div>
            <div class="t-zh">接駁車服務</div>
            <ul class="t-list">
              <li>捷運新店站 1 號出口集合</li>
              <li>車程約20分鐘</li>
            </ul>
          </div>

          <div class="t-divider"></div>

          <div class="t-block">
            <div class="t-label">Self Drive</div>
            <div class="t-zh">自駕停車</div>
            <ul class="t-list">
              <li>車位數量有限，請優先搭乘接駁車</li>
              <li>詳細停車資訊將於婚禮前另行通知</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="ts-map ts-inner" style="transition-delay:.28s">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.329442745808!2d121.53938939999999!3d24.9208446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3468015ecb99aabf%3A0xdc6bca56f6e5c5f2!2z5YSq6IGW576O5Zyw6YSJ5p2R5rih5YGH5Yil5aKFLeaWsOWMl-aWsOW6l-iNieWcsOWpmuemri_mloflrprllpzlrrQv6KiC5amaL-iNieWcsOitieWpmi_msYLlqZov5ama57SX5pSd5b2x5aC05ZywL-e-juW8j-Wpmuemri_miLblpJblqZrnpq4g5aC05Zyw56ef5YCfL-mfs-aoguacgy_ol53ooZPlsZUv5bGV5ryUL-W7o-WRiuaLjeaUnS_pm7voppbmi43mlJ0v6Zu75b2x5ouN5pSdL-aIsuWKh-aLjeaUnSDlg7nmoLzosrvnlKjmlLbosrvmjqjolqYg54ax6ZaA5Lq65rCj5aC05ZywIFBUVCBEY2FyZA!5e0!3m2!1szh-TW!2stw!4v1773386994477!5m2!1szh-TW!2stw"
        allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const el = ref(null)
const bgUrl = `${import.meta.env.BASE_URL}tfcbg.svg`

onMounted(() => {
  const io = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) el.value?.classList.add('visible')
      else el.value?.classList.remove('visible')
    }),
    { threshold: 0.07 }
  )
  if (el.value) io.observe(el.value)
})
</script>

<style scoped>
.transport-section {
  position: relative;
  background: url('/FindUs-bg.jpg') center top / cover no-repeat;
  overflow: hidden;
  margin-top: -300px;
  padding-top: 300px;
  z-index: 1;
}

.ts-bg-overlay {
  position: absolute;
  inset: 0;
  background: rgba(28, 42, 30, 0.72);
  z-index: 0;
}

.ts-header {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 110px 24px 56px;
}
.ts-eyebrow {
color: rgba(255, 255, 255, 0.65) !important;
}
.ts-title {
  font-family: 'Cormorant Garamond', 'Noto Serif TC', serif;
  font-weight: 500;
  font-size: 44px;
  letter-spacing: 4px;
  color: #fff;
  margin: 14px 0 24px;
}
.ts-rule {
  width: 36px; height: 1px;
  background: rgba(255,255,255,0.4);
  margin: 0 auto;
}

.ts-card-wrap {
  position: relative;
  z-index: 1;
  max-width: 560px;
  margin: 0 auto;
  padding: 0 24px 72px;
}

/* ══ 卡片：內容置中，圖片跟著卡片高度鋪滿 ══ */
.t-card {
  position: relative;
  width: 100%;
  min-height: 560px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.t-frame {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.t-frame-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: fill;
}

.t-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 90px;
  color: var(--ink);
  text-align: center;
}

.t-block {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.t-divider {
  width: 60%; height: 1px;
  background: var(--border);
  margin: 14px 0;
}

.t-label {
  font-family: 'Cormorant Garamond', serif;
  font-size: 22px; font-weight: 700; letter-spacing: 3px;
  color: var(--ink); text-transform: uppercase; line-height: 1.3;
}
.t-zh {
  font-family: 'Noto Serif TC', serif;
  font-size: 12px; font-weight: 700; color: var(--green-lt); letter-spacing: 3px;
  margin-top: 6px;
  margin-bottom: 14px;
}

.t-intro {
  font-family: 'Noto Serif TC', serif;
  font-size: 13.5px; color: var(--muted);
  line-height: 1.9; margin-bottom: 14px;
}
.t-intro em {
  font-style: normal;
  color: var(--ink);
  border-bottom: 1px solid var(--green-lt);
  padding-bottom: 1px;
}

.t-list {
  list-style: none; padding: 0; margin: 0;
  display: flex; flex-direction: column;
  align-items: center;
  gap: 4px;
}
.t-list li {
  font-family: 'Noto Serif TC', serif;
  font-size: 13.5px; color: #828282; line-height: 1.75;
  max-width: 240px;
}

.ts-map {
  position: relative;
  z-index: 1;
  width: 100%; height: 380px; overflow: hidden;
}
.ts-map iframe {
  width: 100%; height: 100%; border: 0; display: block;
  filter: saturate(.6) contrast(1.05) brightness(.96);
}

@media (max-width: 768px) {
  .ts-header { padding: 72px 24px 40px; }
  .ts-title { font-size: 34px; }
  .t-content { padding: 40px 64px; }
  .ts-map { height: 280px; }
}

@media (max-width: 400px) {
  .t-content { padding: 30px 40px; }
  .t-label { font-size: 19px; }
}

/* REVEAL: animate inner elements, not the whole section */
.ts-inner { opacity: 0; transform: translateY(20px); transition: opacity .85s ease, transform .85s ease; }
.transport-section.visible .ts-inner { opacity: 1; transform: translateY(0); }
</style>