<template>
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
</template>

<script setup>
import { ref, onMounted } from 'vue'

const seatingEl = ref(null)

onMounted(() => {
  const io = new IntersectionObserver(
    es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
    { threshold: 0.07 }
  )
  if (seatingEl.value) io.observe(seatingEl.value)
})
</script>

<style scoped>
.seating-section { background: var(--white); padding: 72px 28px; }
.seating-img-wrap { max-width: 440px; margin: 0 auto; border: 1px solid var(--border); border-radius: 8px; overflow: hidden; background: var(--cream); min-height: 280px; display: flex; align-items: center; justify-content: center; }
.seating-ph { text-align: center; color: var(--green-lt); padding: 40px; }
.seating-ph span { display: block; font-size: 36px; opacity: .4; margin-bottom: 12px; }
.seating-ph p { font-size: 11px; letter-spacing: 2px; opacity: .5; text-transform: uppercase; line-height: 1.8; }

/* REVEAL override for component scope */
.reveal { opacity: 0; transform: translateY(24px); transition: opacity .85s ease, transform .85s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }

/* SHARED */
.sec-eyebrow { font-family: 'Cormorant Garamond', serif; font-size: 11px; letter-spacing: 5px; text-transform: uppercase; color: var(--green-lt); text-align: center; margin-bottom: 8px; }
.sec-title { font-family: 'Dancing Script', cursive; font-size: clamp(30px,8vw,44px); color: var(--ink); text-align: center; margin-bottom: 6px; }
.sec-rule { width: 40px; height: 1.5px; background: var(--green); margin: 0 auto 40px; }
</style>
