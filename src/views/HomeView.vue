<script setup>
import { ref } from 'vue'
import Hero from '../components/Hero.vue'
import Header from '../components/Header.vue'
import Location from '../components/Location.vue'
import FAQs from '../components/FAQs.vue'
import Footer from '../components/Footer.vue'
import RSVP from '../components/RSVP.vue'

const loaded = ref(false)
</script>

<template>
  <main>
    <Hero id="hero" @entered="loaded = true" />
    <Header id="header" v-if="loaded" />
    <FAQs id="faqs" v-if="loaded" />
    <RSVP id="rsvp" v-if="loaded" />
    <Location id="location" v-if="loaded" />
    <Footer id="footer" v-if="loaded" />
  </main>
</template>

<style lang="scss">
@import '@/assets/scss/mixins/padding.scss';

main {
  & > section {
    @include padding-section;
    background-color: var(--color-background);
    min-height: 100vh;
  }
}
</style>
