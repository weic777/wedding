<template>
  <div id="site" :class="{ show: siteReady }">


    <HeroSection />

    <DateSection />
    <TickerBand />

    <TimelineSection />

    <InfoSection />

    <TransportSection />

    <MenuSection />

    <!-- <SeatingSection /> -->

    <!-- <UploadSection /> -->

    <RsvpSection />

    <FooterSection />

  </div>
</template>

<script setup>
import { ref } from 'vue'
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

</script>

<style>
#site { opacity: 0; transition: opacity 1s; }
#site.show { opacity: 1; }


/* SHARED SECTION HEADERS */
.sec-eyebrow { font-family: 'Cormorant Garamond', 'Noto Serif TC', serif; font-size: clamp(13px, 1.6vw, 16px); letter-spacing: 5px; text-transform: uppercase; color: var(--green-lt); text-align: center; margin-bottom: 10px; font-weight: 500; }
.sec-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(28px, 6vw, 56px); font-weight: 600; letter-spacing: 8px; text-transform: uppercase; color: var(--ink); text-align: center; margin-bottom: 6px; }
.sec-rule { width: 40px; height: 1.5px; background: var(--green); margin: 0 auto 40px; }

/* REVEAL TRANSITION */
.reveal { opacity: 0; transform: translateY(24px); transition: opacity .85s ease, transform .85s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }
</style>