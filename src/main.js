import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

// 鎖定初始視窗高度，防止手機網址列收起時 vh 跳動
// 只在 load 時設定一次，不監聽 resize（網址列收起是 resize 事件）
const setVH = () => {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
}
setVH()
// 只處理真實旋轉，忽略網址列收起的微小高度變化
let lastWidth = window.innerWidth
window.addEventListener('resize', () => {
  if (window.innerWidth !== lastWidth) {
    lastWidth = window.innerWidth
    setVH()
  }
})

createApp(App).mount('#app')