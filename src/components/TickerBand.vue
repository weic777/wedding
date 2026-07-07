<template>
  <div class="ticker-band">
    <div class="ticker-inner">
      <template v-for="_ in 3" :key="_">
        <span>Chloe &amp; Matt</span><span>✦</span>
        <span>2026 · 11 · 22</span><span>✦</span>
        <span>Love · Laughter · Forever</span><span>✦</span>
        <span>新店 · 優勝美地</span><span>✦</span>
      </template>
    </div>
  </div>
</template>

<style scoped>
.ticker-band { background: var(--green); overflow: hidden; padding: 14px 0; }
.ticker-inner { display: flex; gap: 48px; white-space: nowrap; animation: ticker 20s linear infinite; font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 14px; color: rgba(255,255,255,.65); letter-spacing: 2px; }
</style>
