<template>
  <section class="hero">
    <svg class="hero-lines" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
      <path d="M-20 200 Q100 180 200 220 Q300 260 420 240" stroke="#3d5140" stroke-width="0.8" fill="none"/>
      <path d="M-20 400 Q80 370 200 410 Q320 450 420 420" stroke="#3d5140" stroke-width="0.8" fill="none"/>
      <path d="M-20 600 Q120 580 200 610 Q280 640 420 600" stroke="#3d5140" stroke-width="0.6" fill="none"/>
    </svg>

    <p class="hero-eyebrow">You are cordially invited</p>

    <div class="hero-arch">
      <!-- 換成你的照片: <img src="/your-photo.jpg" alt="Chloe & Matt"> -->
      <div class="hero-arch-ph"><span>🌿</span>Your Photo</div>
    </div>

    <h1 class="hero-names">
      Chloe<br>
      <span class="hero-amp">&amp;</span><br>
      Matt
    </h1>

    <p class="hero-sub">
      Let's celebrate love, laughter,<br>and happily ever after!
    </p>

    <p class="hero-venue-line">新店 · 優勝美地 · 2026</p>

    <div class="scroll-cue">
      <div class="sc-line"></div>
      <p class="sc-txt">scroll</p>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100svh;
  background: var(--white);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  text-align: center;
  padding: 100px 32px 70px;
  position: relative; overflow: hidden;
}
.hero-lines {
  position: absolute; inset: 0; pointer-events: none; opacity: .06;
}
.hero-eyebrow {
  font-family: 'Cormorant Garamond', serif;
  font-size: 11px; letter-spacing: 6px; text-transform: uppercase;
  color: var(--muted); margin-bottom: 28px;
  opacity: 0; animation: fadeUp .8s .1s forwards;
}
.hero-arch {
  width: 150px; height: 190px;
  border-radius: 75px 75px 6px 6px;
  overflow: hidden; margin: 0 auto 24px;
  background: var(--cream);
  border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 20px rgba(0,0,0,.08);
  opacity: 0; animation: fadeUp .8s .25s forwards;
}
.hero-arch img { width: 100%; height: 100%; object-fit: cover; }
.hero-arch-ph { color: var(--green-lt); font-size: 9px; letter-spacing: 2px; opacity: .5; text-transform: uppercase; text-align: center; }
.hero-arch-ph span { display: block; font-size: 26px; margin-bottom: 6px; }
.hero-names {
  font-family: 'Dancing Script', cursive;
  font-size: clamp(54px, 15vw, 80px); font-weight: 700;
  color: var(--ink); line-height: .95;
  opacity: 0; animation: fadeUp .8s .4s forwards;
}
.hero-amp {
  font-family: 'Cormorant Garamond', serif;
  font-size: 24px; font-style: italic; color: var(--red);
  display: inline-block; margin: 0 6px; vertical-align: middle;
}
.hero-sub {
  font-family: 'Playfair Display', serif; font-style: italic;
  font-size: 15px; color: var(--muted);
  margin-top: 18px; line-height: 1.7; max-width: 280px;
  opacity: 0; animation: fadeUp .8s .55s forwards;
}
.hero-venue-line {
  margin-top: 20px;
  font-size: 12px; letter-spacing: 3px; color: var(--green); text-transform: uppercase;
  opacity: 0; animation: fadeUp .8s .7s forwards;
}
.scroll-cue {
  position: absolute; bottom: 26px; left: 50%; transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  opacity: 0; animation: fadeUp .8s 1.2s forwards;
}
.sc-line {
  width: 1px; height: 38px;
  background: linear-gradient(to bottom, var(--green-lt), transparent);
  animation: scAnim 2.4s ease-in-out infinite;
}
.sc-txt { font-size: 9px; letter-spacing: 3px; color: var(--muted); text-transform: uppercase; }
</style>