<template>
  <section class="hero">
    <svg class="hero-lines" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
      <path d="M-20 200 Q100 180 200 220 Q300 260 420 240" stroke="#3d5140" stroke-width="0.8" fill="none"/>
      <path d="M-20 400 Q80 370 200 410 Q320 450 420 420" stroke="#3d5140" stroke-width="0.8" fill="none"/>
      <path d="M-20 600 Q120 580 200 610 Q280 640 420 600" stroke="#3d5140" stroke-width="0.6" fill="none"/>
    </svg>

    <div class="hero-content">
      <img src="/LOGO.png" alt="Chloe & Matt" class="hero-logo">

      <h1 class="hero-names">
        Michael
        <span class="hero-divider">
          <span class="hero-line"></span>
          <span class="hero-amp">&amp;</span>
          <span class="hero-line"></span>
        </span>
        Weic
      </h1>

      <p class="hero-date">November 22, 2026</p>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: calc(var(--vh, 1vh) * 100);
  background: url('/IMG.jpg') center / cover no-repeat;
  display: flex; flex-direction: column;
  align-items: center; justify-content: flex-start;
  text-align: center;
  padding: 0 32px 70px;
  padding-top: clamp(120px, calc(var(--vh, 1vh) * 25), 280px);
  position: relative; overflow: hidden;
}
.hero-lines {
  position: absolute; inset: 0; pointer-events: none; opacity: .06;
}

.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-logo {
  width: 44px;
  height: auto;
  margin-bottom: 20px;
  opacity: 0; animation: fadeUp .8s .1s forwards;
}
/* 電腦寬螢幕：logo 往上調整 */
@media (min-width: 1200px) {
  .hero-logo {
    margin-top: -40px;
  }
}

.hero-names {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 500;
  font-size: clamp(26px, 6vw, 36px);
  letter-spacing: 5px;
  text-transform: uppercase;
  color: var(--int);
  line-height: 1.3;
  margin-top: 110px;
  opacity: 0; animation: fadeUp .8s .3s forwards;
}

/* 矮螢幕（iPhone SE 667、Surface Duo 720、Nest Hub 橫向 600）：再往上收 */
@media (max-height: 800px) {
  .hero-names {
    margin-top: 80px;
  }
}

/* 螢幕較高的機型（如 iPhone 14 Pro Max, 932px 高）：人名要再往下多一點 */
@media (min-height: 850px) {
  .hero-names {
    margin-top: 120px;
  }
}

/* 螢幕更高的機型（如 Zenbook Fold 1280px）：再往下更多 */
@media (min-height: 920px) {
  .hero-names {
    margin-top: 200px;
  }
}

/* 最高螢幕（iPad Pro 1366、Surface Pro 7 1368）：往下推最多 */
@media (min-height: 1300px) {
  .hero-names {
    margin-top: 250px;
  }
}
/* 電腦寬螢幕：名字再往下 */
@media (min-width: 1200px) {
  .hero-names {
    margin-top: 150px;
  }
}
.hero-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 4px auto;
  width: 100%;
  max-width: 160px;
}
.hero-line {
  flex: 1;
  height: 1px;
  background: var(--green);
  opacity: .4;
}
.hero-amp {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: 15px;
  color: var(--green);
}

.hero-date {
  font-family: 'Cormorant Garamond', serif;
  font-size: 12px; letter-spacing: 3px; text-transform: uppercase;
  color: var(--green);
  margin-top: 18px;
  opacity: 0; animation: fadeUp .8s .5s forwards;
}

.hero-sub {
  font-family: 'Cormorant Garamond', serif;
  font-size: 9px; letter-spacing: 3px; text-transform: uppercase;
  color: var(--green);
  opacity: .75;
  margin-top: 5px;
  opacity: 0; animation: fadeUp .8s .6s forwards;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>