<script setup>
import { ref } from 'vue'
import { useScroll } from '@/lib/useScroll';
import BigYellowButton from './ui/BigYellowButton.vue'
import ContentSection from './layout/ContentSection.vue';

const debug = ref(true)
const { scrollToElementById } = useScroll();

const isPartyStarted = ref(false)
let audio = null
if (!debug.value) {
  audio = new Audio('/mp3/comanchero.mp3')
} else {
  isPartyStarted.value = false
  emit('entered')
}

// display video and start the music
const isPlaying = ref(false);
const emit = defineEmits(['entered'])
const getThisPartyStarted = () => {
  isPartyStarted.value = true
  console.log('comanchero')
  emit('entered')
  if (!debug.value) {
    audio.play()
    isPlaying.value = true
  }
}

// pause/play music
const toggleAudio = () => {
  if (isPlaying.value) {
    audio.pause();
  } else {
    audio.play();
  }
  isPlaying.value = !isPlaying.value;
};
</script>

<template>
  <transition name="fade" mode="in-out">
    <ContentSection v-if="!isPartyStarted">
      <h1>já aqui estás?</h1>
      <BigYellowButton @click="getThisPartyStarted">Entra</BigYellowButton>
    </ContentSection>

    <section v-else>
      <div class="content">
        <p class="who">-&gt; Filipa &amp; Nuno convidam para &lt;-</p>
        <h1>Aquela Festa</h1>
        <p class="when">16 Setembro - Afife</p>
        <BigYellowButton @click="scrollToElementById('header')">O Quê ??!</BigYellowButton>  
      </div>
      
      <button @click="toggleAudio" class="audio-toggle" :title="isPlaying ? 'Pause' : 'Play' ">
        {{ isPlaying ? '⏸' : '▶' }}
      </button>

      <video playsinline autoplay muted loop id="bgVideo" v-if="!debug">
        <source src="/video/aquela-festa.mp4" type="video/mp4" />
      </video>
    </section>
  </transition>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

section {
  background: radial-gradient(at left top, #010101, #743c9a);
  background-size: cover;
  background-repeat: no-repeat;

  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8rem;

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
      letter-spacing: 0.3rem;
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

    button {
      margin-top: 10rem;
    }
  }

  h1 {
    color: var(--color-primary);
    font-family: HiguenSerif;
    font-size: 18rem;
    line-height: 1.2;
    text-align: center;

    @media (max-width: 1200px) {
      font-size: 12rem;
    }

    @media (max-width: 768px) {
      font-size: 8rem;
    }
  }

  .audio-toggle {
    position: absolute;
    z-index: 1;
    bottom: 2rem;
    right: 2rem;
    background-color: transparent;
    border: 0;
    color: var(--color-primary);
    font-size: 4rem;
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
