<template>
  <section class="timeline-section reveal" ref="timelineEl">
    <p class="sec-eyebrow">Programme &nbsp;·&nbsp; 當日流程</p>
    <h2 class="sec-title tl-title">Daily Schedule</h2>
    <div class="sec-rule"></div>

    <div class="timeline-scroll-outer" ref="timelineScrollEl">
      <div class="tlh-track">
        <div class="tlh-item" v-for="(item, i) in timeline" :key="i">
          <div class="tlh-dot"></div>
          <div class="tlh-time">{{ item.time }}</div>
          <div class="tlh-title">{{ item.title }}</div>
          <div class="tlh-title-en">{{ item.titleEn }}</div>
        </div>
      </div>
    </div>

    <p class="tlh-hint" :class="{ 'hint-hidden': !showHint }">
      ← Swipe to view full schedule &nbsp;·&nbsp; 左右滑動查看完整流程 →
    </p>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const timelineEl = ref(null)
const timelineScrollEl = ref(null)
const showHint = ref(false)

const timeline = [
  { time: '16:30', title: '迎賓入席',       titleEn: 'Guest Arrival'       },
  { time: '17:00', title: '開場白',         titleEn: 'Opening'             },
  { time: '17:10', title: '宣讀誓言',       titleEn: 'Vows'                },
  { time: '17:20', title: '交換戒指',       titleEn: 'Ring Exchange'       },
  { time: '17:30', title: '新人互相致詞',   titleEn: 'Couple Speech'       },
  { time: '17:45', title: '揭開妙緣帕',     titleEn: 'Veil Ceremony'       },
  { time: '18:00', title: '晚宴 · 拋捧花',  titleEn: 'Dinner & Bouquet Toss' },
]

onMounted(() => {
  // Fade in animation observer
  const io = new IntersectionObserver(
    es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
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

/* REVEAL override for component scope */
.reveal { opacity: 0; transform: translateY(24px); transition: opacity .85s ease, transform .85s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }
</style>
