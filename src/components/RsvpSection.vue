<template>
  <section class="rsvp-section reveal" ref="el" id="rsvp">
    <p class="sec-eyebrow">RSVP &nbsp;·&nbsp; 出席回覆</p>
    <h2 class="sec-title">Attendance</h2>
    <div class="sec-rule"></div>
    <div class="deadline-badge"><span class="bdot"></span>回覆截止日 &nbsp;2025 · 09 · 20</div>

    <div class="rsvp-form">
      <div v-if="!submitted" id="form-body">
        <!-- Guest Count -->
        <div class="fg">
          <label class="fl">出席人數<span class="req-mark">*</span></label>
          <div class="gc-row">
            <button class="gc-btn" @click="changeCount(-1)">−</button>
            <span class="gc-num">{{ guestCount }}</span>
            <button class="gc-btn" @click="changeCount(1)">＋</button>
            <span class="gc-unit">位</span>
          </div>
        </div>

        <!-- Guest Info -->
        <div class="fg">
          <label class="fl">出席者資訊<span class="req-mark">*</span></label>
          <div v-for="i in guestCount" :key="i" class="name-row">
            <div class="name-row-lbl">出席者 {{ i }}</div>

            <input class="fi" placeholder="中文姓名" v-model="guestNamesZh[i-1]">
            <input class="fi" placeholder="English Name" v-model="guestNamesEn[i-1]">

            <div class="sw age-sw">
              <select class="fs" v-model="guestTypes[i-1]">
                <option value="" disabled>請選擇年齡區間</option>
                <option v-for="opt in ageOpts" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
              </select>
            </div>

            <div class="pills diet-row">
              <div class="p-opt" v-for="opt in dietOpts" :key="opt.value">
                <input
                  type="radio"
                  :id="'d-'+i+'-'+opt.value"
                  :name="'diet-'+i"
                  :value="opt.value"
                  v-model="diets[i-1]"
                >
                <label :for="'d-'+i+'-'+opt.value">{{ opt.label }}</label>
              </div>
            </div>
          </div>
          <p class="fn">✦ 中英文姓名將用於製作座位桌牌，請務必填寫正確</p>
        </div>

        <!-- Transport -->
        <div class="fg">
          <label class="fl">交通方式<span class="req-mark">*</span></label>
          <div class="pills">
            <div class="p-opt" v-for="opt in transOpts" :key="opt.value">
              <input type="radio" :id="'t-'+opt.value" name="trans" :value="opt.value" v-model="transport">
              <label :for="'t-'+opt.value">{{ opt.label }}</label>
            </div>
          </div>

          <div v-if="transport === '接駁'" style="margin-top:14px;">
            <p class="fn">✦ 我們會統一為您安排接駁班次，確切時間與上車地點將於婚禮前另行通知您</p>
          </div>

          <div v-if="transport === '自駕'" style="margin-top:14px;">
            <p class="fn">✦ 車位數量有限，停滿後需改搭接駁車，我們會統計後另行通知您最終的交通安排</p>
          </div>
        </div>

        <!-- Message -->
        <div class="fg">
          <label class="fl">其他想跟新人們說的</label>
          <textarea class="fta" placeholder="留下您的訊息...（選填）" v-model="message"></textarea>
        </div>

        <button class="btn-sub" :disabled="submitting" @click="doSubmit">
          {{ submitting ? '送出中...' : '確認出席' }}
        </button>
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
import { ref, onMounted } from 'vue'

const el = ref(null)
const submitted = ref(false)
const submitting = ref(false)
const guestCount = ref(1)
const guestNamesZh = ref([''])
const guestNamesEn = ref([''])
const guestTypes = ref([''])
const diets = ref([''])
const transport = ref('')
const message = ref('')

const ageOpts = [
  { value: '大人（9歲以上）', label: '大人（9歲以上）' },
  { value: '兒童（4-8歲）', label: '兒童（4–8歲）' },
  { value: '幼兒（0-3歲）', label: '幼兒（0–3歲）' },
]
const dietOpts = [{ value: '一般', label: '一般' }, { value: '素食', label: '素食' }]
const transOpts = [
  { value: '接駁', label: '搭接駁車' },
  { value: '自駕', label: '自行開車' },
  { value: '現場集合', label: '現場集合' },
]

function changeCount(d) {
  const newCount = Math.max(1, guestCount.value + d)

  if (newCount > guestCount.value) {
    for (let i = guestCount.value; i < newCount; i++) {
      guestNamesZh.value.push('')
      guestNamesEn.value.push('')
      guestTypes.value.push('')
      diets.value.push('')
    }
  } else if (newCount < guestCount.value) {
    guestNamesZh.value.length = newCount
    guestNamesEn.value.length = newCount
    guestTypes.value.length = newCount
    diets.value.length = newCount
  }

  guestCount.value = newCount
}

async function doSubmit() {
  const namesZh = guestNamesZh.value.slice(0, guestCount.value)
  const namesEn = guestNamesEn.value.slice(0, guestCount.value)
  const types = guestTypes.value.slice(0, guestCount.value)
  const guestDiets = diets.value.slice(0, guestCount.value)

  if (namesZh.some(n => !n.trim())) {
    alert('請填寫每位出席者的中文姓名')
    return
  }
  if (namesEn.some(n => !n.trim())) {
    alert('請填寫每位出席者的英文姓名')
    return
  }
  if (types.some(t => !t)) {
    alert('請選擇每位出席者的年齡區間')
    return
  }
  if (guestDiets.some(d => !d)) {
    alert('請選擇每位出席者的餐飲需求')
    return
  }
  if (!transport.value) {
    alert('請選擇交通方式')
    return
  }

  submitting.value = true

  const payload = {
    guestCount: guestCount.value,
    guestNamesZh: namesZh,
    guestNamesEn: namesEn,
    guestTypes: types,
    diets: guestDiets,
    transport: transport.value,
    message: message.value,
  }

  try {
    await fetch(import.meta.env.VITE_APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(payload),
    })
  } catch (e) {
    // no-cors 模式下 fetch 幾乎不會拋錯，這裡當作保底，不阻擋使用者看到感謝畫面
  } finally {
    submitting.value = false
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

.sec-rule { width: 40px; height: 1.5px; background: var(--green); margin: 0 auto 40px; }

.deadline-badge {
  display: flex; align-items: center; gap: 6px;
  width: fit-content; margin: 0 auto 36px;
  background: rgba(61,81,64,.07);
  border: 1px solid var(--green-pale);
  border-radius: 100px; padding: 6px 18px;
  font-family: 'Cormorant Garamond', serif;
  font-size: 14px; letter-spacing: 3px; color: var(--green);
}
.bdot { width: 5px; height: 5px; background: var(--green-lt); border-radius: 50%; animation: blink 2s infinite; }

.rsvp-form { max-width: 440px; margin: 0 auto; }
.fg { margin-bottom: 34px; }
.fl {
  display: block; font-size: 20px; letter-spacing: 1px;
  color: var(--ink); margin-bottom: 14px;
  font-weight: 700;
}
.req-mark { color: var(--red); margin-left: 2px; }
.fi, .fs, .fta {
  box-sizing: border-box;
  width: 100%; height: 48px; padding: 0 14px;
  background: var(--cream); border: 1px solid var(--border); border-radius: 6px;
  font-family: 'Noto Serif TC', serif; font-size: 16px; color: var(--ink);
  outline: none; transition: border-color .25s;
  appearance: none; -webkit-appearance: none;
}
.fi:focus, .fs:focus, .fta:focus { border-color: var(--green); background: #fff; }
.fta { height: auto; min-height: 80px; padding: 12px 14px; resize: vertical; }
.sw { position: relative; }
.sw::after { content: '▾'; position: absolute; right: 14px; top: 50%; transform: translateY(-50%); color: var(--green-lt); pointer-events: none; }
.age-sw { grid-column: 1/-1; }

.pills { display: flex; gap: 8px; flex-wrap: wrap; }
.p-opt { position: relative; }
.p-opt input { position: absolute; opacity: 0; width: 0; }
.p-opt label {
  display: inline-block; padding: 10px 20px;
  border: 1px solid var(--border); border-radius: 100px;
  font-size: 15px; color: var(--muted); cursor: pointer;
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
.gc-unit { font-size: 15px; color: var(--muted); padding: 0 14px; }

.name-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 20px; }
.name-row-lbl { grid-column: 1/-1; font-size: 16px; letter-spacing: 1px; color: var(--green); margin-bottom: 6px; font-weight: 600; }
.diet-row { grid-column: 1/-1; margin-top: 6px; }
.fn { font-size: 15px; color: var(--muted); margin-top: 12px; line-height: 1.8; }

.park-warn {
  background: rgba(176,48,48,.06); border: 1px solid rgba(176,48,48,.18);
  border-radius: 6px; padding: 10px 14px; font-size: 14px;
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
.btn-sub:disabled { opacity: .6; cursor: not-allowed; }

.success { text-align: center; padding: 36px 16px; }
.si { font-size: 48px; margin-bottom: 16px; }
.st { font-family: 'Dancing Script', cursive; font-size: 36px; color: var(--ink); margin-bottom: 12px; }
.ss { font-size: 14px; color: var(--muted); line-height: 2.1; }

.reveal { opacity: 0; transform: translateY(24px); transition: opacity .85s ease, transform .85s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }
</style>