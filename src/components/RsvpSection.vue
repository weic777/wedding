<template>
  <section class="rsvp-section reveal" ref="el" id="rsvp">
    <p class="sec-eyebrow">RSVP</p>
    <h2 class="sec-title">出席回覆</h2>
    <div class="sec-rule"></div>
    <div class="deadline-badge"><span class="bdot"></span>回覆截止日 &nbsp;2025 · 09 · 20</div>

    <div class="rsvp-form">
      <div v-if="!submitted" id="form-body">
        <!-- Guest Count -->
        <div class="fg">
          <label class="fl">出席人數</label>
          <div class="gc-row">
            <button class="gc-btn" @click="changeCount(-1)">−</button>
            <span class="gc-num">{{ guestCount }}</span>
            <button class="gc-btn" @click="changeCount(1)">＋</button>
            <span class="gc-unit">位</span>
          </div>
          <p class="fn">✦ 包含您本人，最多可填 4 位</p>
        </div>

        <!-- Guest Names -->
        <div class="fg">
          <label class="fl">每位出席者姓名</label>
          <div v-for="i in guestCount" :key="i" class="name-row">
            <div class="name-row-lbl">出席者 {{ i }}</div>
            <input class="fi" :placeholder="'姓名'" v-model="guestNames[i-1]">
            <div class="sw">
              <select class="fs" v-model="guestTypes[i-1]" style="padding:9px 11px;font-size:13px;">
                <option value="大人">大人</option>
                <option value="小孩">🧒 小孩</option>
              </select>
            </div>
          </div>
          <p class="fn">✦ 姓名將用於製作座位桌牌，請填寫正確</p>
        </div>

        <!-- Diet -->
        <div class="fg">
          <label class="fl">餐飲需求</label>
          <div class="pills">
            <div class="p-opt" v-for="opt in dietOpts" :key="opt.value">
              <input type="radio" :id="'d-'+opt.value" name="diet" :value="opt.value" v-model="diet">
              <label :for="'d-'+opt.value">{{ opt.label }}</label>
            </div>
          </div>
          <p class="fn">✦ 自助式菜單，如有素食需求請選擇</p>
        </div>

        <!-- Transport -->
        <div class="fg">
          <label class="fl">交通方式</label>
          <div class="pills">
            <div class="p-opt" v-for="opt in transOpts" :key="opt.value">
              <input type="radio" :id="'t-'+opt.value" name="trans" :value="opt.value" v-model="transport">
              <label :for="'t-'+opt.value">{{ opt.label }}</label>
            </div>
          </div>

          <div v-if="transport === '接駁'" style="margin-top:14px;">
            <label class="fl" style="margin-bottom:8px;">接駁班次</label>
            <div class="pills" id="shuttle-pills">
              <div class="p-opt" v-for="s in shuttleOpts" :key="s.value">
                <input type="radio" :id="'sh-'+s.value" name="shuttle" :value="s.value" v-model="shuttle">
                <label :for="'sh-'+s.value" style="text-align:center;line-height:1.5;padding:8px 14px;">
                  {{ s.value }}<br><span style="font-size:10px;opacity:.7">{{ s.seats }}</span>
                </label>
              </div>
            </div>
          </div>

          <div v-if="transport === '自駕'" class="park-warn">
            🚗 目前已登記 <strong>12 / 30</strong> 台，停滿後請改搭接駁車
          </div>
        </div>

        <!-- Message -->
        <div class="fg">
          <label class="fl">祝福新人 💌</label>
          <textarea class="fta" placeholder="留下您的祝福..." v-model="message"></textarea>
        </div>

        <button class="btn-sub" @click="doSubmit">確認出席 ✦</button>
        <p style="text-align:center;font-size:11px;color:var(--muted);margin-top:16px;letter-spacing:1px;line-height:2;">
          如需更改，請聯繫<br>Chloe: 09XX-XXX-XXX ／ Matt: 09XX-XXX-XXX
        </p>
      </div>

      <div v-else class="success">
        <div class="si">🥂</div>
        <div class="st">感謝您的回覆！</div>
        <p class="ss">期待與您共度這美好的一天<br><br>婚禮前夕將傳送給您<br>座位圖 · 流程表 · 菜單</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const el = ref(null)
const submitted = ref(false)
const guestCount = ref(1)
const guestNames = ref(['', '', '', ''])
const guestTypes = ref(['大人', '大人', '大人', '大人'])
const diet = ref('一般')
const transport = ref('接駁')
const shuttle = ref('')
const message = ref('')

const dietOpts = [{ value: '一般', label: '一般' }, { value: '素食', label: '素食' }]
const transOpts = [
  { value: '接駁', label: '搭接駁車' },
  { value: '自駕', label: '自行開車' },
  { value: '現場集合', label: '現場集合' },
]
const shuttleOpts = [
  { value: '15:30', seats: '13/40人' },
  { value: '16:00', seats: '8/40人' },
  { value: '16:30', seats: '4/40人' },
]

function changeCount(d) {
  guestCount.value = Math.min(4, Math.max(1, guestCount.value + d))
}

function doSubmit() {
  const names = guestNames.value.slice(0, guestCount.value)
  if (names.some(n => !n.trim())) {
    alert('請填寫每位出席者的姓名')
    return
  }
  if (transport.value === '接駁' && !shuttle.value) {
    alert('請選擇接駁班次')
    return
  }
  submitted.value = true
  setTimeout(() => {
    el.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 100)
}

onMounted(() => {
  const io = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) el.value?.classList.add('visible') }),
    { threshold: 0.07 }
  )
  if (el.value) io.observe(el.value)
})
</script>

<style scoped>
.rsvp-section { background: var(--white); padding: 72px 28px; }
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

.deadline-badge {
  display: flex; align-items: center; gap: 6px;
  width: fit-content; margin: 0 auto 36px;
  background: rgba(61,81,64,.07);
  border: 1px solid var(--green-pale);
  border-radius: 100px; padding: 6px 18px;
  font-family: 'Cormorant Garamond', serif;
  font-size: 12px; letter-spacing: 3px; color: var(--green);
}
.bdot { width: 5px; height: 5px; background: var(--green-lt); border-radius: 50%; animation: blink 2s infinite; }

.rsvp-form { max-width: 440px; margin: 0 auto; }
.fg { margin-bottom: 22px; }
.fl {
  display: block; font-size: 10px; letter-spacing: 3px;
  color: var(--green); text-transform: uppercase; margin-bottom: 8px;
}
.fi, .fs, .fta {
  width: 100%; padding: 12px 14px;
  background: var(--cream); border: 1px solid var(--border); border-radius: 6px;
  font-family: 'Noto Serif TC', serif; font-size: 14px; color: var(--ink);
  outline: none; transition: border-color .25s;
  appearance: none; -webkit-appearance: none;
}
.fi:focus, .fs:focus, .fta:focus { border-color: var(--green); background: #fff; }
.fta { min-height: 80px; resize: vertical; }
.sw { position: relative; }
.sw::after { content: '▾'; position: absolute; right: 14px; top: 50%; transform: translateY(-50%); color: var(--green-lt); pointer-events: none; }

.pills { display: flex; gap: 8px; flex-wrap: wrap; }
.p-opt { position: relative; }
.p-opt input { position: absolute; opacity: 0; width: 0; }
.p-opt label {
  display: inline-block; padding: 9px 18px;
  border: 1px solid var(--border); border-radius: 100px;
  font-size: 13px; color: var(--muted); cursor: pointer;
  background: var(--cream); transition: all .22s; letter-spacing: 1px;
}
.p-opt input:checked + label { background: var(--green); color: #fff; border-color: var(--green); }

.gc-row {
  display: flex; align-items: center;
  background: var(--cream); border: 1px solid var(--border);
  border-radius: 8px; overflow: hidden; width: fit-content;
}
.gc-btn {
  width: 48px; height: 48px; border: none; background: none;
  font-size: 22px; color: var(--green); cursor: pointer; transition: background .2s;
}
.gc-btn:hover { background: var(--green-pale); }
.gc-num {
  min-width: 48px; text-align: center;
  font-family: 'Cormorant Garamond', serif; font-size: 26px; color: var(--ink);
  border-left: 1px solid var(--border); border-right: 1px solid var(--border);
}
.gc-unit { font-size: 13px; color: var(--muted); padding: 0 14px; }

.name-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px; }
.name-row-lbl { grid-column: 1/-1; font-size: 10px; letter-spacing: 2px; color: var(--green-lt); text-transform: uppercase; margin-bottom: 2px; }
.fn { font-size: 12px; color: var(--muted); margin-top: 6px; line-height: 1.6; }

.park-warn {
  background: rgba(176,48,48,.06); border: 1px solid rgba(176,48,48,.18);
  border-radius: 6px; padding: 10px 14px; font-size: 13px;
  color: var(--red); line-height: 1.7; margin-top: 10px;
}

.btn-sub {
  width: 100%; padding: 17px; margin-top: 8px;
  background: var(--green); color: #fff; border: none; border-radius: 8px;
  font-family: 'Cormorant Garamond', serif;
  font-size: 16px; letter-spacing: 5px; text-transform: uppercase;
  cursor: pointer; transition: background .3s;
}
.btn-sub:hover { background: var(--green-lt); }

.success { text-align: center; padding: 36px 16px; }
.si { font-size: 48px; margin-bottom: 16px; }
.st { font-family: 'Dancing Script', cursive; font-size: 36px; color: var(--ink); margin-bottom: 12px; }
.ss { font-size: 14px; color: var(--muted); line-height: 2.1; }

.reveal { opacity: 0; transform: translateY(24px); transition: opacity .85s ease, transform .85s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }
</style>