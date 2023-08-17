<script setup>
import { ref } from 'vue'
import { useScroll } from '@/lib/useScroll';
import PrimaryButton from './ui/PrimaryButton.vue'
import ContentSection from './layout/ContentSection.vue';

const debug = ref(import.meta.env.VITE_DEBUG === "true" ? true : false)
const { scrollToElementById } = useScroll();

const isPartyStarted = ref(false)
let audio = null
if (!debug.value) {
  audio = new Audio('/mp3/comanchero.mp3')

  // preload media
  document.addEventListener("DOMContentLoaded", function() {
    audio.preload = "auto";
    audio.load();

    var video = document.createElement("video");
    if (video.canPlayType("video/mp4")) {
      video.src = "/video/aquela-festa.mp4";
    }
    video.preload = "auto";
    video.load();
  });
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
    <section v-if="isPartyStarted">
      <p class="who">-&gt; Preparado? &lt;-</p>
      <PrimaryButton class="pink" @click="getThisPartyStarted">Acho que sim!</PrimaryButton>
    </section>

    <section v-else>
      <div class="content">
        <p class="who">-&gt; Filipa &amp; Nuno convidam para &lt;-</p>
        <h1>Aquela Festa</h1>
        <p class="when">16 Setembro - Afife</p>
        <PrimaryButton @click="scrollToElementById('header')">Quero Saber Tudo &#x25BC;</PrimaryButton>  
      </div>
      
      <button @click="toggleAudio" class="audio-toggle" :title="isPlaying ? 'Pause' : 'Play' ">
        {{ isPlaying ? '&#x2759;&#x2759;' : '&#x276F;' }}
      </button>

      <video playsinline autoplay muted loop id="bgVideo" v-if="!debug">
        <source src="/video/aquela-festa.mp4" type="video/mp4" />
      </video>
    </section>
  </transition>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/mixins/padding.scss';

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
  @include padding-section;
  background-color: var(--c-terciary);
  background-size: cover;
  background-repeat: no-repeat;

  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8rem;
  padding: 4rem;

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

      @media (max-width: 480px) {
        margin: 0 auto 3rem;
      } 
    }

    button {
      margin-top: 10rem;

      @media (max-width: 480px) {
        margin-top: 4rem;
        width: 100%;
      }      
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
    font-size: 2.6rem;
    letter-spacing: -.5rem;

    @media (max-width: 480px) {
      bottom: 1rem;
      right: 1rem;
    }
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
