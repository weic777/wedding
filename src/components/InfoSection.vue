<template>
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
</template>

<script setup>
import { ref, onMounted } from 'vue'

const infoEl = ref(null)

onMounted(() => {
  const io = new IntersectionObserver(
    es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
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
