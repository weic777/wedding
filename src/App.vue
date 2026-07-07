<template>
  <div id="site" :class="{ show: siteReady }">

    <nav class="nav" :class="{ solid: scrolled }">
      <div class="nav-logo">C &amp; M</div>
      <div class="nav-d">11 · 22 · 26</div>
    </nav>

    <HeroSection />

    <TickerBand />

    <DateSection />

    <TimelineSection />

    <InfoSection />

    <TransportSection />

    <MenuSection />

    <SeatingSection />

    <UploadSection />

    <RsvpSection />

    <FooterSection />

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HeroSection from './components/HeroSection.vue'
import TickerBand from './components/TickerBand.vue'
import DateSection from './components/DateSection.vue'
import TimelineSection from './components/TimelineSection.vue'
import InfoSection from './components/InfoSection.vue'
import TransportSection from './components/TransportSection.vue'
import MenuSection from './components/MenuSection.vue'
import SeatingSection from './components/SeatingSection.vue'
import UploadSection from './components/UploadSection.vue'
import RsvpSection from './components/RsvpSection.vue'
import FooterSection from './components/FooterSection.vue'

const siteReady = ref(true)
const scrolled = ref(false)

onMounted(() => {
  window.addEventListener('scroll', () => { scrolled.value = window.scrollY > 60 })
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

/* SHARED SECTION HEADERS */
.sec-eyebrow { font-family: 'Cormorant Garamond', serif; font-size: 11px; letter-spacing: 5px; text-transform: uppercase; color: var(--green-lt); text-align: center; margin-bottom: 8px; }
.sec-title { font-family: 'Dancing Script', cursive; font-size: clamp(30px,8vw,44px); color: var(--ink); text-align: center; margin-bottom: 6px; }
.sec-rule { width: 40px; height: 1.5px; background: var(--green); margin: 0 auto 40px; }

/* REVEAL TRANSITION */
.reveal { opacity: 0; transform: translateY(24px); transition: opacity .85s ease, transform .85s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }
</style>