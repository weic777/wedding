<template>
  <section class="transport-section reveal" ref="el">
    <p class="sec-eyebrow">Getting Here</p>
    <h2 class="sec-title">交通資訊</h2>
    <div class="sec-rule"></div>

    <div class="tab-row">
      <button
        v-for="tab in tabs" :key="tab.id"
        class="tab-btn"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >{{ tab.label }}</button>
    </div>

    <!-- Shuttle -->
    <div class="tab-panel" :class="{ active: activeTab === 's' }">
      <div class="t-card">
        <p class="t-intro">從 <strong>捷運 新店站 1 號出口</strong> 出發</p>
        <div v-for="s in shuttles" :key="s.time" class="shuttle-row">
          <span class="s-time">{{ s.time }}</span>
          <div class="s-info">
            <div class="s-title">{{ s.label }}</div>
            <div class="s-bwrap">
              <div class="s-bar"><div class="s-fill" :style="{ width: s.pct + '%' }"></div></div>
              <span class="s-reg">{{ s.registered }} / 20 人</span>
            </div>
          </div>
        </div>
        <p class="t-card-note">✦ 婚宴結束後約 21:30 有回程接駁</p>
      </div>
    </div>

    <!-- Drive -->
    <div class="tab-panel" :class="{ active: activeTab === 'd' }">
      <div class="t-card">
        <p class="t-intro">場地停車位有限，<strong>僅開放 30 台</strong></p>
        <div class="p-labels"><span>停車登記進度</span><span>12 / 30 台</span></div>
        <div class="p-bar"><div class="p-fill"></div></div>
        <p class="p-note">✦ 停滿後請改搭接駁車，感謝配合</p>
      </div>
    </div>

    <!-- MRT -->
    <div class="tab-panel" :class="{ active: activeTab === 'm' }">
      <div class="t-card">
        <p style="font-size:13px;color:var(--muted);line-height:2.1;">
          🚇 搭乘捷運至 <strong style="color:var(--ink)">新店站</strong><br>
          1 號出口步行約 5 分鐘<br><br>
          🚕 計程車 / Uber 至某某宴會廳，車資約 NT$ 150–250
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const activeTab = ref('s')
const el = ref(null)

const tabs = [
  { id: 's', label: '🚌 接駁車' },
  { id: 'd', label: '🚗 自駕' },
  { id: 'm', label: '🚇 計程車' },
]

const shuttles = [
  { time: '10:00', label: '第一班 · 車程約 20 分鐘', registered: 13, pct: 32 },
  { time: '10:00', label: '第二班', registered: 8, pct: 20 },
  { time: '10:30', label: '第三班', registered: 4, pct: 10 },
]

onMounted(() => {
  const io = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) el.value?.classList.add('visible') }),
    { threshold: 0.07 }
  )
  if (el.value) io.observe(el.value)
})
</script>

<style scoped>
.transport-section { background: var(--white); padding: 72px 28px; }
.sec-eyebrow {
  font-family: 'Cormorant Garamond', serif;
  font-size: 11px; letter-spacing: 5px; text-transform: uppercase;
  color: var(--green-lt); text-align: center; margin-bottom: 8px;
}
.sec-title {
  font-family: 'Dancing Script', cursive;
  font-size: clamp(30px, 8vw, 44px); color: var(--ink);
  text-align: center; margin-bottom: 6px;
}
.sec-rule { width: 40px; height: 1.5px; background: var(--green); margin: 0 auto 40px; }

.tab-row {
  display: flex; max-width: 400px; margin: 0 auto 24px;
  background: var(--cream); border: 1px solid var(--border);
  border-radius: 100px; overflow: hidden;
}
.tab-btn {
  flex: 1; padding: 11px 4px; border: none; background: transparent;
  font-family: 'Noto Serif TC', serif; font-size: 12px; color: var(--muted);
  cursor: pointer; transition: all .25s; letter-spacing: 1px;
}
.tab-btn.active { background: var(--green); color: #fff; border-radius: 100px; }

.tab-panel { display: none; max-width: 400px; margin: 0 auto; }
.tab-panel.active { display: block; animation: fadeUp .3s forwards; }

.t-card {
  background: var(--cream); border: 1px solid var(--border);
  border-radius: 10px; padding: 22px 18px;
}
.t-intro { font-size: 13px; color: var(--muted); line-height: 1.9; margin-bottom: 14px; }
.t-intro strong { color: var(--ink); }
.t-card-note { font-size: 11px; color: var(--muted); margin-top: 12px; line-height: 1.7; }

.shuttle-row {
  display: flex; align-items: flex-start; gap: 12px;
  padding: 13px 0; border-bottom: 1px solid var(--border);
}
.shuttle-row:last-of-type { border: none; padding-bottom: 0; }
.s-time {
  font-family: 'Cormorant Garamond', serif;
  font-size: 22px; color: var(--green); min-width: 56px; line-height: 1.2;
}
.s-info { flex: 1; }
.s-title { font-size: 13px; color: var(--ink); margin-bottom: 6px; }
.s-bwrap { display: flex; align-items: center; gap: 8px; }
.s-bar { flex: 1; height: 3px; background: var(--border); border-radius: 4px; overflow: hidden; }
.s-fill { height: 100%; background: linear-gradient(to right, var(--green), var(--green-lt)); }
.s-reg { font-size: 10px; color: var(--muted); letter-spacing: 1px; white-space: nowrap; }

.p-labels { display: flex; justify-content: space-between; font-size: 12px; color: var(--muted); margin: 12px 0 8px; }
.p-bar { height: 4px; background: var(--border); border-radius: 4px; overflow: hidden; }
.p-fill { height: 100%; width: 40%; background: linear-gradient(to right, var(--green), var(--green-lt)); }
.p-note { font-size: 11px; color: var(--muted); margin-top: 10px; line-height: 1.7; }

.reveal { opacity: 0; transform: translateY(24px); transition: opacity .85s ease, transform .85s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }
</style>