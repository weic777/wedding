<template>
  <footer>
<div class="ft-names">
  <img src="/LOGOw.svg" alt="Chloe & Matt" class="ft-logo">
</div>    <div class="ft-date">2026 · 11 · 22 
</div>
  </footer>
</template>

<style scoped>
footer {
  background: 
    var(--green) 
    url('/paper.jpg') center / cover repeat;
  background-blend-mode: multiply;
  padding: 15px 24px;
  text-align: center;
}.ft-logo {
  height: 60px;      /* 依實際 logo 比例調整高度 */
  width: auto;
  display: block;
  margin: 0 auto;     /* 如果父層沒有置中，用這行讓 logo 水平置中 */
}
.ft-names { font-family: 'Dancing Script', cursive; font-size: 34px; color: #fff; margin-bottom: 8px; }
.ft-date  { font-family: 'Cormorant Garamond', serif; font-size: 13px; letter-spacing: 4px; color: rgba(255,255,255,.5); }
</style>
