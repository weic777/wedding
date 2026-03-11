<template>
  <div id="env-screen" ref="screenEl">
    <p class="env-eyebrow">You are cordially invited</p>

    <!-- content 有 perspective，讓上蓋翻轉立體 -->
    <div class="env-content" ref="contentEl">

      <!-- 信紙：兄弟元素，position absolute，在信封後面但被 envelope::after 折線蓋住邊緣 -->
      <div class="env-letter" ref="letterEl">
        <div class="env-letter-body">
          <div class="letter-name">Chloe &amp; Matt</div>
          <div class="letter-rule"></div>
          <div class="letter-date">10 · 08 · 2025</div>
          <div class="letter-sub">Wedding Invitation</div>
        </div>
      </div>

      <!-- 信封：::after 做折線蓋住信紙邊緣（製造「紙在裡面」的錯覺） -->
      <div class="envelope" ref="envelopeEl" @click="openCard">
        <!-- 上蓋（真實 DOM 取代 ::before，GSAP 才能抓到） -->
        <div class="env-flap" ref="flapEl"></div>
      </div>

      <div class="env-shadow" ref="shadowEl"></div>
    </div>

    <p class="env-hint-txt" ref="hintEl">點擊信封開啟邀請函</p>

    <!-- Hero overlay：信紙放大到全螢幕，滑走後露出真實 Hero -->
    <div class="hero-overlay" ref="overlayEl">
      <p class="le-eyebrow">Wedding Invitation</p>
      <div class="le-arch"><div class="le-arch-ph">🌿</div></div>
      <div class="le-names">Chloe<br><span class="le-amp">&amp;</span><br>Matt</div>
      <div class="le-rule"></div>
      <div class="le-date">10 · 08 · 2025</div>
      <div class="le-venue">某某宴會廳 · 台北 · 下午 5:00</div>
      <p class="le-hint">向下滑動探索 ↓</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['done'])

const screenEl  = ref(null)
const contentEl = ref(null)
const flapEl    = ref(null)
const letterEl  = ref(null)
const shadowEl  = ref(null)
const hintEl    = ref(null)
const overlayEl = ref(null)

let opened = false

function loadGSAP() {
  return new Promise(resolve => {
    if (window.gsap) return resolve()
    const s = document.createElement('script')
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js'
    s.onload = resolve
    document.head.appendChild(s)
  })
}

async function openCard() {
  if (opened) return
  opened = true
  await loadGSAP()
  const { gsap } = window

  gsap.to(hintEl.value, { opacity: 0, duration: 0.2 })

  const flap    = flapEl.value
  const letter  = letterEl.value
  const overlay = overlayEl.value

  // 完全照搬原版 t1 的動畫順序：
  // 1. 上蓋翻轉 180°
  // 2. 上蓋 zIndex 降低
  // 3. 信紙往上抽出 -200px
  // 4. 信紙 zIndex 拉高到 40（蓋過折線）
  // 5. 信紙浮起（translateZ 250）
  // 然後接我們的 expand 動畫
  const tl = gsap.timeline({ onComplete: expandLetter })

  tl.to(flap, {
      rotateX: 180,
      duration: 0.5,
    })
    .set(flap, { zIndex: 10 })
    .to(letter, {
      y: -200,
      duration: 0.9,
      ease: 'back.inOut(1.5)',
    })
    .set(letter, { zIndex: 40 })
    .add(() => {
      // 信紙抽出後，計算它目前的螢幕位置，再算出移到正中央需要的偏移量
      // getBoundingClientRect() 在這裡呼叫，已含 y:-200 的偏移，所以直接用
      const r  = letter.getBoundingClientRect()
      const cx = (window.innerWidth  / 2) - (r.left + r.width  / 2)
      const cy = (window.innerHeight / 2) - (r.top  + r.height / 2)
      gsap.to(letter, {
        x: cx,
        y: `+=${cy}`,   // 在現有 y 基礎上再加，避免覆蓋掉 -200
        duration: 0.5,
        ease: 'power2.inOut',
      })
    })
    .to({}, { duration: 0.5 }) // 等上面 gsap.to 跑完

  // 陰影（原版 t2）
  gsap.to(shadowEl.value, {
    delay: 1.4,
    width: 450,
    boxShadow: '-75px 150px 10px 5px #eeeef3',
    ease: 'back.out(.2)',
    duration: 0.7,
  })

  function expandLetter() {
    const r  = letter.getBoundingClientRect()
    const vw = window.innerWidth
    const vh = window.innerHeight

    // overlay 直接貼在信紙終點（已在畫面正中央），無任何位移
    gsap.set(overlay, {
      display: 'flex',
      left: r.left, top: r.top,
      width: r.width, height: r.height,
      borderRadius: 8,
      opacity: 1, y: 0,
    })
    gsap.set(letter, { opacity: 0 })

    // 從中央直接放大到全螢幕
    gsap.to(overlay, {
      delay: 0.05,
      left: 0, top: 0,
      width: vw, height: vh,
      borderRadius: 0,
      duration: 0.65,
      ease: 'power2.inOut',
      onComplete() {
        // 文字依序淡入
        gsap.to(
          overlay.querySelectorAll('.le-arch,.le-eyebrow,.le-names,.le-date,.le-venue,.le-hint'),
          { opacity: 1, duration: 0.45, stagger: 0.09 }
        )
        // 通知 App.vue 渲染主站（在 overlay 下方）
        emit('done')
        // 停留後往上滑走，露出真實 Hero
        gsap.to(overlay, {
          delay: 1.1,
          y: '-100%',
          duration: 0.65,
          ease: 'power2.inOut',
          onComplete() {
            gsap.set(screenEl.value, { display: 'none' })
            document.body.style.overflow = ''
          },
        })
      },
    })
  }
}

onMounted(() => {
  document.body.style.overflow = 'hidden'
})
</script>

<style scoped>
#env-screen {
  position: fixed; inset: 0; z-index: 9999;
  background: #f2ede2;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
}

.env-eyebrow {
  font-family: 'Cormorant Garamond', serif;
  font-size: 11px; letter-spacing: 6px; text-transform: uppercase;
  color: #888; margin-bottom: 32px;
  opacity: 0; animation: fadeUp .7s .4s forwards;
}

/* ── content：perspective 讓翻蓋有立體感，和原版相同 ── */
.env-content {
  position: relative;
  perspective: 600px;
  opacity: 0;
  animation: fadeUp .7s .7s forwards;
}

.env-shadow {
  position: absolute;
  width: 200px; height: 1px;
  background: transparent;
  border-radius: 30%;
  box-shadow: 50px 100px 10px 5px #eeeef3;
}

/* ── 信紙：完全照原版，position absolute，top:10 left:10 ── */
.env-letter {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 280px;
  height: 160px;
  display: flex; align-items: center; justify-content: center;
  z-index: 15;
  border-radius: 2px;
  background: #d8d7e5;
  box-shadow: 0px 1px 7px -2px #5E5690;
}
.env-letter-body {
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 6px;
  color: #5E5690;
}
.letter-name { font-family: 'Dancing Script', cursive; font-size: 20px; color: #3d5140; }
.letter-rule { width: 36px; height: 1px; background: #ddd5c2; }
.letter-date { font-family: 'Cormorant Garamond', serif; font-size: 10px; letter-spacing: 3px; color: #888; }
.letter-sub  { font-family: 'Cormorant Garamond', serif; font-size: 9px; letter-spacing: 2px; color: #bbb; text-transform: uppercase; }

/* ── 信封：完全照原版 ── */
.envelope {
  position: relative;
  width: 300px;
  height: 180px;
  background: linear-gradient(#cccbd7 0.5px, #7873A7 0.5px);
  cursor: pointer;
}

/* 折線（原版 ::after），z-index:25 蓋住信紙邊緣製造「紙在裡面」錯覺 */
.envelope::after {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 300px; height: 180px;
  z-index: 25;
  background:
    linear-gradient(30deg,    #555184 47%, #4F4C6B 50%, #5E5690 50%) 150px 90px / 150px 90px no-repeat,
    linear-gradient(31deg,    #5E5690 49%, #4F4C6B 50%, transparent 50%) 0px 0px / 152px 90px no-repeat,
    linear-gradient(150deg,   #5E5690 50%, #4F4C6B 50%, #555184 53%) 0px 90px / 151px 90px no-repeat,
    linear-gradient(148.7deg, transparent 50%, #4F4C6B 50%, #5E5690 51%) 150px 0px / 150px 90px no-repeat;
}

/* ── 上蓋（取代原版 ::before，真實 DOM 讓 GSAP 能抓到） ── */
.env-flap {
  position: absolute;
  top: 0; left: 0;
  width: 300px; height: 0;
  /* 用 border 做三角形，和原版 ::before 完全相同 */
  border-top: 115px solid #7873A7;
  border-left: 150px solid transparent;
  border-right: 150px solid transparent;
  box-sizing: border-box;
  transform-origin: top center;
  z-index: 30;
}

/* ── Hero overlay ── */
.hero-overlay {
  position: fixed; z-index: 10000;
  background: #fffef9;
  display: none;
  flex-direction: column; align-items: center; justify-content: center;
  text-align: center; overflow: hidden;
  opacity: 0; pointer-events: none;
}
.le-eyebrow {
  font-family: 'Cormorant Garamond', serif;
  font-size: 10px; letter-spacing: 6px; text-transform: uppercase;
  color: #888; margin-bottom: 20px; opacity: 0;
}
.le-arch {
  width: 110px; height: 138px; border-radius: 55px 55px 4px 4px;
  background: #d4e0d4; margin: 0 auto 20px;
  display: flex; align-items: center; justify-content: center;
  opacity: 0;
}
.le-arch-ph { font-size: 26px; opacity: .4; }
.le-names {
  font-family: 'Dancing Script', cursive;
  font-size: clamp(46px,12vw,64px); font-weight: 700;
  color: #1c1c1c; line-height: .95; opacity: 0;
}
.le-amp {
  font-family: 'Cormorant Garamond', serif; font-size: 22px;
  font-style: italic; color: #b03030;
  display: inline-block; margin: 0 4px; vertical-align: middle;
}
.le-rule { width: 40px; height: 1px; background: #ddd5c2; margin: 14px auto; }
.le-date {
  font-family: 'Cormorant Garamond', serif;
  font-size: 15px; letter-spacing: 4px; color: #888; opacity: 0;
}
.le-venue { font-size: 11px; letter-spacing: 2px; color: #3d5140; margin-top: 5px; opacity: 0; }
.le-hint {
  position: absolute; bottom: 32px;
  font-family: 'Cormorant Garamond', serif;
  font-size: 11px; letter-spacing: 3px; color: #888; text-transform: uppercase;
  opacity: 0; animation: float 2.5s ease-in-out infinite;
}

.env-hint-txt {
  margin-top: 18px;
  font-family: 'Cormorant Garamond', serif;
  font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
  color: #888;
  opacity: 0; animation: fadeUp .7s 1.3s forwards;
}
</style>