<template>
  <section class="menu-section" ref="photosEl">

    <!-- 標題 -->
    <div class="menu-header mn-inner">
      <p class="sec-eyebrow">Yosemite &nbsp;·&nbsp; 婚禮菜單</p>
      <h2 class="sec-title">Menu</h2>
      <div class="sec-rule"></div>
    </div>

    <!-- 插圖選擇器：三個圖，純浮空，無任何容器感 -->
    <div class="menu-selector mn-inner" style="transition-delay:.12s">
      <button
        v-for="(item, i) in menuItems"
        :key="i"
        class="ms-btn"
        :class="{ active: activeMenu === i }"
        @click="switchMenu(i)"
      >
        <img :src="item.svg" :alt="item.label" class="ms-illus" draggable="false">
        <span class="ms-label">{{ item.label }}</span>
        <span class="ms-label-zh">{{ item.labelZh }}</span>
      </button>
    </div>

    <!-- 細分隔線 -->
    <div class="menu-divider mn-inner" style="transition-delay:.18s">
      <div class="menu-divider-track">
        <div class="menu-divider-fill" :style="{ left: activeMenu * 33.333 + '%' }"></div>
      </div>
    </div>

    <!-- 菜單圖片 -->
    <div class="menu-img-stage mn-inner" style="transition-delay:.26s">
      <Transition :name="menuDir">
        <img
          :key="activeMenu"
          :src="menuItems[activeMenu].img"
          :alt="menuItems[activeMenu].label"
          class="menu-big-img"
        />
      </Transition>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const photosEl = ref(null)
const activeMenu = ref(0)
const menuDir = ref('menu-r')

const base = import.meta.env.BASE_URL
const menuItems = [
  { label: 'Starter',     labelZh: '前菜',              img: `${base}menu-Starter.jpg`,    svg: `${base}Starter.svg` },
  { label: 'Main Course', labelZh: '主菜',              img: `${base}menu-MainCourse.jpg`, svg: `${base}MainCourse.svg` },
  { label: 'Soup & More', labelZh: '湯品 · 飲料 · 甜點', img: `${base}menu-Other.jpg`,      svg: `${base}More.svg` },
]

function switchMenu(i) {
  menuDir.value = i > activeMenu.value ? 'menu-r' : 'menu-l'
  activeMenu.value = i
}

onMounted(() => {
  const io = new IntersectionObserver(
    es => es.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible')
      else e.target.classList.remove('visible')
    }),
    { threshold: 0.07 }
  )
  if (photosEl.value) io.observe(photosEl.value)
})
</script>

<style scoped>
.menu-section {
  background: var(--cream);
  padding: 80px 0 0;
}

.menu-header {
  text-align: center;
  padding: 0 24px;
  margin-bottom: 40px;
}

/* ── 插圖選擇器：三個純浮空按鈕，沒有任何邊框背景 ── */
.menu-selector {
  display: flex;
  justify-content: center;
  gap: 0;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 16px;
}

.ms-btn {
  flex: 1;
  min-width: 0;   /* 加這行：強制三欄真正等寬，蓋掉瀏覽器預設的 min-width:auto */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 8px 12px 20px;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
}

/* 插圖本身 */
.ms-illus {
  width: clamp(72px, 12vw, 110px);
  height: clamp(52px, 9vw, 80px);
  object-fit: contain;
  object-position: center;
  display: block;
  opacity: .35;
  filter: grayscale(20%);
  transform: scale(.9) translateY(4px);
  transition: opacity .45s ease, transform .45s cubic-bezier(.34,1.3,.64,1), filter .45s ease;
}

/* Active 插圖：清晰、放大、浮起 */
.ms-btn.active .ms-illus {
  opacity: 1;
  filter: none;
  transform: scale(1.12) translateY(-4px);
}

.ms-btn:hover:not(.active) .ms-illus {
  opacity: .6;
  transform: scale(.95) translateY(2px);
}

/* 標籤文字 */
.ms-label {
  font-family: 'Cormorant Garamond', serif;
  font-size: 13px; letter-spacing: 3px; text-transform: uppercase;
  color: var(--muted);
  opacity: .5;
  transition: color .35s, opacity .35s;
  white-space: nowrap;
}
.ms-label-zh {
  font-family: 'Noto Serif TC', serif;
  font-size: 15px; letter-spacing: 1.5px;
  color: var(--muted);
  opacity: 0;
  transition: opacity .35s, color .35s;
  margin-top: -2px;
  font-weight: 500;
}

.ms-btn.active .ms-label {
  color: var(--ink);
  opacity: 1;
}
.ms-btn.active .ms-label-zh {
  color: var(--green);
  opacity: 1;
}

/* ── 細分隔線（帶滑動指示器）── */
.menu-divider {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 16px;
}
.menu-divider-track {
  position: relative;
  height: 1px;
  background: rgba(61,81,64,.12);
}
.menu-divider-fill {
  position: absolute;
  top: 0;
  width: 33.333%;
  height: 100%;
  background: var(--green);
  height: 1.5px;
  top: -0.25px;
  border-radius: 2px;
  transition: left .4s cubic-bezier(.4,0,.2,1);
}

/* ── 圖片區域：全寬，無邊距感 ── */
.menu-img-stage {
  margin-top: 0;
  overflow: hidden;
  position: relative;
  max-width: 520px;
  margin: 32px auto 0;
  padding: 0 24px 80px;
  display: grid;
  grid-template-columns: 1fr;
}

.menu-big-img {
  grid-area: 1 / 1;
  width: 100%;
  display: block;
  border-radius: 4px;
  box-shadow: 0 2px 40px rgba(61,81,64,.1);
}

/* ── 切換動畫 ── */
.menu-r-enter-active, .menu-r-leave-active,
.menu-l-enter-active, .menu-l-leave-active {
  transition: all .32s cubic-bezier(.4,0,.2,1);
}
.menu-r-enter-from { opacity: 0; transform: translateX(24px); }
.menu-r-leave-to   { opacity: 0; transform: translateX(-24px); }
.menu-l-enter-from { opacity: 0; transform: translateX(-24px); }
.menu-l-leave-to   { opacity: 0; transform: translateX(24px); }

/* REVEAL: animate inner elements, not the whole section */
.mn-inner { opacity: 0; transform: translateY(20px); transition: opacity .85s ease, transform .85s ease; }
.menu-section.visible .mn-inner { opacity: 1; transform: translateY(0); }



</style>
