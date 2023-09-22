<script setup>
import { ref } from 'vue'
import { useScroll } from '@/lib/useScroll';
import PrimaryButton from './ui/PrimaryButton.vue'

const debug = ref(import.meta.env.VITE_DEBUG === "true" ? true : false)
const { scrollToElementById } = useScroll()
const content = ref(null)

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
  setTimeout(() => {
    content.value.classList.remove('hidden')
  }, 6000)
 
  emit('entered')
  if (!debug.value) {
    audio.play()
    audio.loop = true
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
  isPlaying.value = !isPlaying.value
}

//
const upload = () => {
  window.location.href = '/carrega'
}
</script>

<template>
  <section v-if="!isPartyStarted">
    <p class="who">-&gt; Preparado? &lt;-</p>
    <PrimaryButton class="pink" @click="getThisPartyStarted">Claro!</PrimaryButton>
    <PrimaryButton class="upload" @click="upload">Enviar fotos da festa -&gt;</PrimaryButton>
  </section>

  <section v-else>
    <PrimaryButton class="upload" @click="upload">Enviar fotos da festa -&gt;</PrimaryButton>
    <div class="content hidden" ref="content">
      <p class="who">-&gt; Filipa &amp; Nuno convidam para &lt;-</p>
      <h1>Aquela Festa</h1>
      <p class="when">16 Setembro - Afife</p>
      <PrimaryButton @click="scrollToElementById('header')">Quero Saber Tudo &#x25BC;</PrimaryButton>  
    </div>
    
    <video playsinline autoplay muted loop id="bgVideo" v-if="!debug">
      <source src="/video/aquela-festa.mp4" type="video/mp4" />
    </video>

    <teleport to="#app">
      <button :class="['audio-toggle', isPlaying ? 'pause' : 'play']" @click="toggleAudio" />
    </teleport>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/mixins/padding.scss';

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

  .upload {
    position: absolute;
    top: 4rem;
    right: 4rem;

    @media (max-width: 480px) {
      top: 2rem;
      left: 2rem;
      right: 2rem;
      padding-left: 4rem;
      padding-right: 4rem;
    } 
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

  .content {
    text-align: center;
    position: relative;
    z-index: 1;
    transition: all 1s ease-in;
    opacity: 1;

    &.hidden {
      opacity: 0;
    }

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

      @media (max-width: 768px) {
        margin-top: 6rem;
      }
    }

    /*
    .player {
      display: flex;
      margin: 5rem auto;
      align-items: center;
      justify-content: center;
      gap: 1rem;

      @media (max-width: 480px) {
        margin: 4rem auto;
      }   

      button {
        background-color: transparent;
        border: 0;
        color: var(--color-secondary);
        font-size: 2rem;
        margin: 0;
        padding: 0;
        transform: rotate(-90deg);

        &:hover,
        &:active,
        &.active {
          color: var(--color-primary);
        }

        &.stop {
          font-size: 2.7rem;
          margin-right: 1rem;
        }

        &.play {
        }
      }  
    }
    */
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

.audio-toggle {
  position: fixed;
  z-index: 1;
  bottom: 3rem;
  right: 3rem;
  background-color: transparent;
  border: 0;
  width: 4rem;
  height: 4rem;
  background-color: var(--color-primary);
  border-radius: 2rem;
  background-repeat: no-repeat;
  background-size: 1.4rem;
  transition: 100ms all;

  &:active {
    background-color: var(--color-secondary);
  }

  @media (max-width: 768px) {
    bottom: 2rem;
    right: 2rem;
  }

  @media (max-width: 480px) {
    bottom: 1rem;
    right: 1rem;
  }

  &.pause {
    background-image: url(/icons/pause.svg);
    background-position: 50%;
  }

  &.play {
    background-image: url(/icons/play.svg);
    background-position: 55% 50%;
  }
}
</style>
