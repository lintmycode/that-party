<script setup>
import { ref, onMounted } from 'vue'
import BigYellowButton from './ui/BigYellowButton.vue';

const showVideo = ref(true)

onMounted(() => {
  if (showVideo.value) {
    document.body.classList.add('no-scroll')
  }
})

const isPartyStarted = ref(false)
let audio = null
if (showVideo.value) {
  audio = new Audio('/mp3/comanchero.mp3');
} else {
  isPartyStarted.value = false
}
const getThisPartyStarted = () => {  
  isPartyStarted.value = true
  console.log('comanchero')
  audio.play()
  document.body.classList.remove('no-scroll')
}
</script>

<template>
  <transition name="fade" mode="in-out">
    <section v-if="!isPartyStarted">
      <h1>já aqui estás?</h1>
      <BigYellowButton @click="getThisPartyStarted">Entra</BigYellowButton>
    </section>
  
    <section v-else>
      <div class="content">
        <p class="who">-&gt; Filipa &amp; Nuno convidam para &lt;-</p>
        <h1>Aquela Festa</h1>
        <p class="when">16 Setembro - Afife</p>
        <BigYellowButton>O Quê ??!</BigYellowButton>
      </div>
      
      <video playsinline autoplay muted loop id="bgVideo" v-if="isPartyStarted">
        <source src="/video/aquela-festa.mp4" type="video/mp4">
      </video>
    </section>
  </transition>
</template>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 3s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.fade-enter-to, .fade-leave-from {
  opacity: 1;
}


section {
  background: radial-gradient(at left top, #010101, #743C9A);
  background-size: cover;
  background-repeat: no-repeat;

  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .content {
    text-align: center;
    position: relative;
    z-index: 1;
    
    &::before {
      content: '';
      background-image: url(/icons/heart.svg);
      background-repeat: no-repeat;
      background-size: 52px auto;
      width: 52px;
      height: 52px;
      position: relative;
      display: flex;
      margin: 0 auto 6rem;
    }

    p {
      text-transform: uppercase;
      letter-spacing: .3rem;
      color: var(--color-primary);
      
      &.who {
        font-family: AnonymousPro;
        font-size: 2.3rem;
      }

      &.when {
        font-family: CormorantGaramond;
        font-size: 2.4rem;
      }
    }
  }

  h1 {
    color: var(--color-primary);
    font-family: HiguenSerif;
    font-size: 18rem;
    line-height: 1.2;
  }

  video {
    position: fixed;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    z-index: 0;
    transform: translateX(-50%) translateY(-50%);
  }
}
</style>