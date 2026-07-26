<template>
  <section class="rsvp-section" ref="el" id="rsvp">
    <p class="sec-eyebrow rv-inner">RSVP &nbsp;·&nbsp; 出席回覆</p>
    <h2 class="sec-title rv-inner" style="transition-delay:.1s">Attendance</h2>
    <div class="sec-rule rv-inner" style="transition-delay:.18s"></div>

    <div class="rsvp-form rv-inner" style="transition-delay:.26s">
      <div v-if="!submitted" id="form-body">
        <!-- Guest Count -->
        <div class="fg">
          <span class="fl-en">Number of Guests</span>
          <label class="fl">出席人數<span class="req-mark">*</span></label>
          <div class="gc-row">
            <button class="gc-btn" @click="changeCount(-1)">−</button>
            <span class="gc-num">{{ guestCount }}</span>
            <button class="gc-btn" @click="changeCount(1)">＋</button>
            <span class="gc-unit">位 Guest(s)</span>
          </div>
        </div>

        <!-- Guest Info -->
        <div class="fg">
          <span class="fl-en">Guest Details</span>
          <label class="fl">出席者資訊<span class="req-mark">*</span></label>
          <div v-for="i in guestCount" :key="i" class="name-row">
            <div class="name-row-lbl">出席者 {{ i }} <span class="name-row-lbl-en">Guest {{ i }}</span></div>

<input class="fi" placeholder="中文姓名 Chinese Name" v-model="guestNamesZh[i-1]">
<input class="fi" placeholder="英文姓名 English Name" v-model="guestNamesEn[i-1]">
            <div class="sw age-sw">
              <select class="fs" v-model="guestTypes[i-1]">
                <option value="" disabled>請選擇年齡區間 Select age group</option>
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
          <p class="fn">✦ 中英文姓名將用於製作座位桌牌，請務必填寫正確<br><span class="fn-en">Names will be used for seating cards, please fill in accurately</span></p>
        </div>

        <!-- Transport -->
        <div class="fg">
          <span class="fl-en">Transportation</span>
          <label class="fl">交通方式<span class="req-mark">*</span></label>
          <div class="pills">
            <div class="p-opt" v-for="opt in transOpts" :key="opt.value">
              <input type="radio" :id="'t-'+opt.value" name="trans" :value="opt.value" v-model="transport">
              <label :for="'t-'+opt.value">{{ opt.label }}</label>
            </div>
          </div>

          <div v-if="transport === '接駁'" style="margin-top:14px;">
            <p class="fn">✦ 我們會統一為您安排接駁班次，確切時間與上車地點將於婚禮前另行通知您<br><span class="fn-en">We will arrange shuttle schedules; exact time and pickup location will be notified before the wedding</span></p>
          </div>

          <div v-if="transport === '自駕'" style="margin-top:14px;">
            <p class="fn">✦ 車位數量有限，停滿後需改搭接駁車，我們會統計後另行通知您最終的交通安排<br><span class="fn-en">Parking is limited; once full you'll need to use the shuttle. Final arrangements will be confirmed with you</span></p>
          </div>
        </div>

        <!-- Message -->
        <div class="fg">
          <span class="fl-en">Message to the Couple</span>
          <label class="fl">其他想跟新人們說的</label>
          <textarea class="fta" placeholder="留下您的訊息...（選填）Leave a message... (optional)" v-model="message"></textarea>
        </div>

        <button class="btn-sub" :disabled="submitting" @click="doSubmit">
          {{ submitting ? '送出中... Submitting...' : '確認出席 Confirm Attendance' }}
        </button>
      </div>

      <div v-else class="success">
        <div class="si"><img src="/thanks.svg" alt="Thank you" class="si-img"></div>
        <div class="st">感謝您的回覆！ <span class="st-en">Thank You!</span></div>
        <p class="ss">
          期待與您共度這美好的一天<br>
          <span class="ss-en">We look forward to celebrating with you</span><br><br>
          婚禮前夕將傳送給您<br>座位圖 · 交通資訊<br>
          <span class="ss-en">Seating chart & transportation info will be sent before the wedding</span>
        </p>
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
  { value: '大人（9歲以上）', label: '大人（9歲以上） Adult (9+)' },
  { value: '兒童（4-8歲）', label: '兒童（4–8歲） Child (4–8)' },
  { value: '幼兒（0-3歲）', label: '幼兒（0–3歲） Infant (0–3)' },
]
const dietOpts = [
  { value: '一般', label: '一般 General' },
  { value: '素食', label: '素食 Vegetarian' },
]
const transOpts = [
  { value: '接駁', label: '搭接駁車 Shuttle' },
  { value: '自駕', label: '自行開車 Self Drive' },
  { value: '現場集合', label: '現場集合 Meet On-site' },
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
if (namesZh.some(n => !/^[\u4e00-\u9fa5]+$/.test(n.trim()))) {
  alert('中文姓名欄位請只填寫中文姓名，不要包含數字或英文喔')
  return
}
if (namesEn.some(n => !n.trim())) {
  alert('請填寫每位出席者的英文姓名')
  return
}
if (namesEn.some(n => !/^[A-Za-z\s'-]+$/.test(n.trim()))) {
  alert('英文姓名欄位請填寫英文拼音，不要包含數字或中文喔')
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
    entries => entries.forEach(e => {
      if (e.isIntersecting) el.value?.classList.add('visible')
      else el.value?.classList.remove('visible')
    }),
    { threshold: 0.07 }
  )
  if (el.value) io.observe(el.value)
})
</script>

<style scoped>
.rsvp-section {
  position: relative;
  background: var(--white);
  padding: 72px 28px;
  overflow: hidden;
}

/* 淺綠直條紋滿版底 */
.rsvp-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to right,
    var(--green-pale) 0px,
    var(--green-pale) 3px,
    transparent 3px,
    transparent 14px
  );
  opacity: .5;
  z-index: 0;
}

.rsvp-section::after {
  content: '';
  position: absolute;
  top: 60px; bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  width: min(92%, 900px);
  background: var(--white);
  z-index: 0;
}

/* 讓所有內容浮在條紋背景之上 */
.rsvp-section > * {
  position: relative;
  z-index: 1;
}

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

.rsvp-form {
  max-width: 440px;
  margin: 0 auto;
}
@media (min-width: 769px) {
  .rsvp-section {
    padding: 72px 48px;
  }
  .rsvp-form {
    max-width: 820px;
  }
  .name-row {
    grid-template-columns: 1fr 1fr 1fr;
    align-items: end;
  }
  .name-row-lbl {
    grid-column: 1/-1;
  }
  .age-sw {
    grid-column: auto;
  }
  .diet-row {
    grid-column: 1/-1;
  }
}
.fg { margin-bottom: 34px; }
.fl-en {
  display: block;
  font-family: 'Cormorant Garamond', serif;
  font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
  color: var(--green-lt);
  margin-bottom: 4px;
}
.fl {
  display: block; font-size: 20px; letter-spacing: 1px;
  color: var(--ink); margin-bottom: 14px;
  font-weight: 700;
}
.req-mark { color: var(--red); margin-left: 2px; }
.fi, .fs, .fta {
  box-sizing: border-box;
  width: 100%; height: 48px; padding: 0 14px;
  background: #f3f4f2; border: 1px solid transparent; border-radius: 0;
  font-family: 'Noto Serif TC', serif; font-size: 16px; color: var(--ink);
  outline: none; transition: background .25s, border-color .25s;
  appearance: none; -webkit-appearance: none;
}
.fi:focus, .fs:focus, .fta:focus { background: #fff; border-color: #d9dbd6; }
.fta { height: auto; min-height: 80px; padding: 12px 14px; resize: vertical; }
.sw { position: relative; }
.sw::after { content: '▾'; position: absolute; right: 14px; top: 50%; transform: translateY(-50%); color: var(--green-lt); pointer-events: none; }
.age-sw { grid-column: 1/-1; }

.pills { display: flex; gap: 8px; flex-wrap: wrap; }
.p-opt { position: relative; }
.p-opt input { position: absolute; opacity: 0; width: 0; }
.p-opt label {
  display: inline-block; padding: 10px 20px;
  border: none; border-radius: 0;
  font-size: 15px; color: var(--muted); cursor: pointer;
  background: #f3f4f2; transition: all .22s; letter-spacing: 1px;
}
.p-opt input:checked + label { background: var(--green); color: #fff; border-color: var(--green); }

.gc-row {
  display: flex; align-items: center;
  background: #f3f4f2; border: none;
  border-radius: 0; overflow: hidden; width: fit-content;
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
.gc-unit { font-size: 14px; color: var(--muted); padding: 0 14px; white-space: nowrap; }

.name-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 20px; }
.name-row-lbl { grid-column: 1/-1; font-size: 16px; letter-spacing: 1px; color: var(--green); margin-bottom: 6px; font-weight: 600; }
.name-row-lbl-en { font-size: 12px; color: var(--green-lt); font-weight: 400; letter-spacing: .5px; }
.diet-row { grid-column: 1/-1; margin-top: 6px; }
.fn { font-size: 14px; color: var(--muted); margin-top: 12px; line-height: 1.8; }
.fn-en { font-size: 12px; color: var(--muted); opacity: .75; font-style: italic; }

.park-warn {
  background: rgba(176,48,48,.06); border: 1px solid rgba(176,48,48,.18);
  border-radius: 6px; padding: 10px 14px; font-size: 14px;
  color: var(--red); line-height: 1.7; margin-top: 10px;
}

.btn-sub {
  width: 100%; padding: 12px 17px; margin-top: 8px; margin-bottom: 40px;
  background: transparent;
  color: var(--green);
  border: 1.5px solid var(--green-lt);
  border-radius: 0;
  font-family: 'Cormorant Garamond', serif;
  font-size: 15px; letter-spacing: 2px; text-transform: uppercase;
  cursor: pointer; transition: background .3s, color .3s;
}
.btn-sub:hover { background: var(--green-lt); color: #fff; }
.btn-sub:disabled { opacity: .6; cursor: not-allowed; }
.success { text-align: center; padding: 36px 16px; }
.si {
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
}
.si-img {
  width: 200px;
  height: auto;
  display: block;
}
.st {
  font-family: 'Noto Serif TC', serif;
  font-weight: 600;
  font-size: 28px;
  color: var(--ink);
  margin-bottom: 12px;
}
.st-en {
  display: block;
  font-family: 'Cormorant Garamond', serif;
  font-size: 16px;
  color: var(--green-lt);
  font-weight: 500;
  margin-top: 6px;
}
.ss { font-size: 14px; color: var(--muted); line-height: 2.1; }
.ss-en { font-size: 12px; color: var(--muted); opacity: .75; font-style: italic; }

/* REVEAL: animate inner elements, not the whole section */
.rv-inner { opacity: 0; transform: translateY(20px); transition: opacity .85s ease, transform .85s ease; }
.rsvp-section.visible .rv-inner { opacity: 1; transform: translateY(0); }
</style>