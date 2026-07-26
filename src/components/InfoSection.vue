<template>
  <section class="info-section reveal" ref="infoEl">
    <div class="dc-block">
      <p class="sec-eyebrow" style="margin-bottom: 14px;">The Attire &nbsp;·&nbsp; 著裝色系建議</p>
      <div class="dc-title-wrap">
        <span class="dc-title-caps">DRESS</span>
        <span class="dc-title-script">Code</span>
      </div>
<p class="dc-theme">The wedding theme is <em>Old Money</em></p>
<p class="dc-note">為捕捉最和諧的美好畫面，誠摯邀請您著以下色系出席：</p>
<div class="dc-swatches">
  <div class="dc-swatch" style="background:#e8e4db;"></div>
  <div class="dc-swatch" style="background:#a8956e;"></div>
  <div class="dc-swatch" style="background:#2e2c28;"></div>
  <div class="dc-swatch" style="background:#c8c4bc;"></div>
</div>
<p class="dc-white-note">To create a harmonious and beautiful atmosphere,<br>we kindly invite you to dress in the color palette above.</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const infoEl = ref(null)

onMounted(() => {
  const io = new IntersectionObserver(
    es => es.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible')
      else e.target.classList.remove('visible')
    }),
    { threshold: 0.07 }
  )
  if (infoEl.value) io.observe(infoEl.value)
})
</script>

<style scoped>
/* DRESS CODE */
/* margin-top pulls bg.png's torn top edge behind the timeline section bottom.
   padding-top compensates so DRESS content stays at roughly the same position. */
.info-section { background: url('/bg.png') center center / 100% 100% no-repeat; min-height: 1000px; padding: 190px 5vw 190px; position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; justify-content: center; margin-top: -180px; }
@media (max-width: 768px) { .info-section { background: url('/bg-m.png') center center / 100% 100% no-repeat; min-height: 0; padding: 140px 5vw 140px; margin-top: -120px; } }
.dc-block { width: 100%; text-align: center; }

.dc-title-wrap { display: flex; align-items: baseline; justify-content: center; gap: 16px; margin-bottom: 20px; }
.dc-title-caps { font-family: 'Cormorant Garamond', serif; font-size: clamp(28px, 6vw, 56px); font-weight: 600; letter-spacing: 8px; color: var(--ink); text-transform: uppercase; }
.dc-title-script { font-family: 'Dancing Script', cursive; font-size: clamp(34px, 7.5vw, 68px); color: var(--ink); }
.dc-theme { font-family: 'Cormorant Garamond', serif; font-size: clamp(16px,2vw,26px); color: var(--muted); margin-bottom: 10px; letter-spacing: .5px; }
.dc-theme em { font-family: 'Dancing Script', cursive; font-size: clamp(22px,3vw,40px); color: var(--ink); font-style: normal; }
.dc-note { font-size: clamp(13px,1.4vw,18px); color: var(--muted); line-height: 2; margin-bottom: 32px; letter-spacing: .5px; }
.dc-swatches { display: flex; justify-content: center; gap: clamp(12px,2vw,24px); margin-bottom: 24px; }
.dc-swatch { width: clamp(44px,5.5vw,80px); height: clamp(44px,5.5vw,80px); border-radius: 50%; box-shadow: 0 2px 12px rgba(0,0,0,.1); border: 1.5px solid rgba(0,0,0,.12); transition: transform .2s; }
.dc-swatch:hover { transform: scale(1.12); }
.dc-white-note { font-family: 'Cormorant Garamond', serif; font-size: clamp(13px,1.4vw,18px); font-style: italic; color: var(--muted); line-height: 1.8; opacity: .8; }

/* Prevent background flash: make the section instantly opaque, animate the inner block instead */
.info-section.reveal {
  opacity: 1 !important;
  transform: none !important;
}
.info-section .dc-block {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity .85s ease, transform .85s ease;
}
.info-section.visible .dc-block {
  opacity: 1;
  transform: translateY(0);
}
</style>
