<template>
  <section class="date-section" ref="dateEl">
    <div class="date-inner">
    <p class="sec-eyebrow" style="margin-bottom: 20px;">Save the Date &nbsp;·&nbsp; 婚禮日期</p>
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
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const dateEl = ref(null)

onMounted(() => {
  const dio = new IntersectionObserver(
    es => es.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible')
      else e.target.classList.remove('visible')
    }),
    { threshold: 0.2 }
  )
  if (dateEl.value) dio.observe(dateEl.value)
})
</script>

<style scoped>
.date-section { background: var(--white); padding: 80px 0 72px; text-align: center; position: relative; overflow: hidden; }
.date-section .date-inner { opacity: 0; transform: translateY(20px); transition: opacity .85s ease, transform .85s ease; }
.date-section.visible .date-inner { opacity: 1; transform: translateY(0); }
.date-month { font-family: 'Cormorant Garamond', serif; font-size: clamp(36px,10vw,64px); font-weight: 300; font-style: italic; letter-spacing: .08em; color: #3d5140; opacity: .5; margin: 0 0 24px; line-height: 1; }

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
</style>
