<template>
  <section class="timeline-section" ref="timelineEl">
    <p class="sec-eyebrow tl-inner">Reception&nbsp;·&nbsp; 當日流程</p>
    <h2 class="sec-title tl-title tl-inner">Daily Schedule</h2>
    <div class="sec-rule tl-inner"></div>

    <div class="timeline-scroll-outer tl-inner" ref="timelineScrollEl">
      <div class="tlh-track">
        <div class="tlh-item" v-for="(item, i) in timeline" :key="i">
          <div class="tlh-dot"></div>
          <div class="tlh-time">{{ item.time }}</div>
          <div class="tlh-title">{{ item.title }}</div>
          <div class="tlh-title-en">{{ item.titleEn }}</div>
        </div>
      </div>
    </div>

    <p class="tlh-hint tl-inner" :class="{ 'hint-hidden': !showHint }">
      Swipe to view full schedule &nbsp;·&nbsp; 左右滑動查看完整流程
    </p>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const timelineEl = ref(null)
const timelineScrollEl = ref(null)
const showHint = ref(false)

const timeline = [
  { time: '10:30', title: '迎賓入席', titleEn: 'Welcome & Arrival' },
  { time: '11:00', title: '證婚儀式', titleEn: 'Wedding Ceremony' },
  { time: '11:40', title: '大合照', titleEn: 'Group Photo' },
  { time: '12:00', title: '午宴開席', titleEn: 'Grand Opening & Lunch' },
  { time: '13:00', title: '二次進場', titleEn: 'Second Entrance & Activities' },
  { time: '14:10', title: '歡樂大合照', titleEn: 'Group Photo' },
  { time: '14:30', title: '送客致謝', titleEn: 'Farewell' },
]

onMounted(() => {
  // Fade in animation observer
  const io = new IntersectionObserver(
    es => es.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible')
      else e.target.classList.remove('visible')
    }),
    { threshold: 0.07 }
  )
  if (timelineEl.value) io.observe(timelineEl.value)

  // Drag to scroll logic
  if (timelineScrollEl.value) {
    const el = timelineScrollEl.value
    let dragging = false, startX = 0, scrollLeft = 0
    el.addEventListener('mousedown', e => {
      dragging = true; el.style.cursor = 'grabbing'
      startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft
    })
    el.addEventListener('mouseleave', () => { dragging = false; el.style.cursor = 'grab' })
    el.addEventListener('mouseup',    () => { dragging = false; el.style.cursor = 'grab' })
    el.addEventListener('mousemove',  e => {
      if (!dragging) return
      e.preventDefault()
      el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX) * 1.5
    })

    // Swipe hint observer
    new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          showHint.value = true
          setTimeout(() => { showHint.value = false }, 3000)
        }
      })
    }, { threshold: 0.5 }).observe(el)
  }
})
</script>

<style scoped>
.timeline-section { background: var(--white); padding: 72px 0 160px; }
@media (min-width: 601px) {
  .timeline-section {
    padding-bottom: 240px;
  }
}
/* Override sec-title font for timeline to match DRESS style */
.tl-title {
  font-family: 'Cormorant Garamond', serif !important;
  font-weight: 600;
  letter-spacing: 8px;
  text-transform: uppercase;
  font-size: clamp(28px, 6vw, 56px);
}

/* Outer: scrolls horizontally; track self-centers when narrower than screen */
.timeline-scroll-outer {
  overflow-x: auto;
  overflow-y: visible;
  cursor: grab;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  user-select: none;
}
.timeline-scroll-outer::-webkit-scrollbar { display: none; }
.timeline-scroll-outer:active { cursor: grabbing; }

.tlh-track {
  display: flex;
  align-items: flex-start;
  position: relative;
  min-width: max-content;
  padding: 0 64px 32px;
  margin: 0 auto;  /* center when narrower than viewport */
}
/* horizontal line sitting at dot-center (5 px from top of track) */
.tlh-track::before {
  content: '';
  position: absolute;
  top: 5px;
  left: 0; right: 0;
  height: 1px;
  background: var(--border);
}

.tlh-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 168px;
  padding: 0 24px;
  position: relative;
}

.tlh-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 0 5px var(--white);
  flex-shrink: 0;
  z-index: 1;
  position: relative;
  margin-bottom: 22px;
}

.tlh-time {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(36px, 5vw, 54px);
  font-weight: 300;
  color: var(--ink);
  letter-spacing: -1px;
  line-height: 1;
  margin-bottom: 12px;
  white-space: nowrap;
}

.tlh-title {
  font-family: 'Noto Serif TC', serif;
  font-size: 16px; font-weight: 300;
  color: var(--ink);
  margin-bottom: 6px;
  text-align: center;
  white-space: nowrap;
  line-height: 1.5;
}

.tlh-title-en {
  font-family: 'Cormorant Garamond', serif;
  font-size: 11px; letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--muted);
  text-align: center;
  white-space: nowrap;
  opacity: .65;
}

.tlh-hint {
  text-align: center;
  padding: 16px 24px 0;
  font-family: 'Cormorant Garamond', serif;
  font-size: 11px; letter-spacing: 2px;
  color: var(--muted);
  font-style: italic;
  transition: opacity .5s;
}
.tlh-hint.hint-hidden { opacity: 0; }

@media (max-width: 600px) {
  .tlh-item { min-width: 150px; padding: 0 16px; }
  .tlh-time { font-size: 32px; }
  .tlh-title { font-size: 14px; }
}

/* REVEAL: animate inner elements, not the whole section */
.tl-inner { opacity: 0; transform: translateY(20px); transition: opacity .85s ease, transform .85s ease; }
.timeline-section.visible .tl-inner { opacity: 1; transform: translateY(0); }
.timeline-section.visible .tl-inner:nth-child(2) { transition-delay: .1s; }
.timeline-section.visible .tl-inner:nth-child(3) { transition-delay: .2s; }
.timeline-section.visible .tl-inner:nth-child(4) { transition-delay: .3s; }
.timeline-section.visible .tl-inner:nth-child(5) { transition-delay: .4s; }
</style>
