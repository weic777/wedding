<template>
  <section class="upload-section reveal" ref="uploadEl">
    <p class="sec-eyebrow">Gallery</p>
    <h2 class="sec-title">上傳照片</h2>
    <div class="sec-rule"></div>
    <p class="upload-note">婚禮當天的美好時刻<br>歡迎大家上傳到這裡與我們一起珍藏 📸</p>
    
    <div class="upload-area" :class="{ drag: isDragging }"
      @click="triggerInput"
      @dragover.prevent="isDragging = true"
      @dragleave="isDragging = false"
      @drop.prevent="onDrop">
      <input ref="fileInput" type="file" accept="image/*" multiple style="display:none" @change="e => handleFiles(e.target.files)">
      <div class="upload-icon">📷</div>
      <div class="upload-txt">點擊或拖曳照片至此處</div>
      <button class="upload-btn" @click.stop="triggerInput">選擇照片</button>
    </div>
    
    <div class="upload-gallery">
      <div class="ugallery-item" v-for="(src, i) in uploadedPhotos" :key="i">
        <img :src="src" alt="">
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const uploadEl = ref(null)
const fileInput = ref(null)
const isDragging = ref(false)
const uploadedPhotos = ref([])

function triggerInput() {
  if (fileInput.value) fileInput.value.click()
}

function onDrop(e) {
  isDragging.value = false
  handleFiles(e.dataTransfer.files)
}

function handleFiles(files) {
  ;[...files].forEach(f => {
    if (!f.type.startsWith('image/')) return
    const r = new FileReader()
    r.onload = e => uploadedPhotos.value.push(e.target.result)
    r.readAsDataURL(f)
  })
}

onMounted(() => {
  const io = new IntersectionObserver(
    es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
    { threshold: 0.07 }
  )
  if (uploadEl.value) io.observe(uploadEl.value)
})
</script>

<style scoped>
.upload-section { background: var(--white); padding: 72px 28px; }
.upload-note { text-align: center; font-size: 13px; color: var(--muted); line-height: 1.9; margin-bottom: 28px; max-width: 320px; margin-left: auto; margin-right: auto; }
.upload-area { max-width: 440px; margin: 0 auto 20px; border: 2px dashed var(--green-pale); border-radius: 10px; padding: 40px 24px; text-align: center; cursor: pointer; transition: all .3s; background: var(--cream); }
.upload-area:hover, .upload-area.drag { border-color: var(--green); background: rgba(143,168,130,.05); }
.upload-icon { font-size: 40px; margin-bottom: 12px; opacity: .5; }
.upload-txt  { font-size: 13px; color: var(--muted); line-height: 1.7; }
.upload-btn { display: inline-block; margin-top: 12px; padding: 10px 28px; background: var(--green); color: #fff; border-radius: 100px; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; font-family: 'Cormorant Garamond', serif; cursor: pointer; border: none; transition: background .3s; }
.upload-btn:hover { background: var(--green-lt); }
.upload-gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; max-width: 440px; margin: 0 auto; }
.ugallery-item { aspect-ratio: 1; border-radius: 6px; overflow: hidden; background: var(--border); }
.ugallery-item img { width: 100%; height: 100%; object-fit: cover; }

/* REVEAL override for component scope */
.reveal { opacity: 0; transform: translateY(24px); transition: opacity .85s ease, transform .85s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }

/* SHARED */
.sec-eyebrow { font-family: 'Cormorant Garamond', serif; font-size: 11px; letter-spacing: 5px; text-transform: uppercase; color: var(--green-lt); text-align: center; margin-bottom: 8px; }
.sec-title { font-family: 'Dancing Script', cursive; font-size: clamp(30px,8vw,44px); color: var(--ink); text-align: center; margin-bottom: 6px; }
.sec-rule { width: 40px; height: 1.5px; background: var(--green); margin: 0 auto 40px; }
</style>
