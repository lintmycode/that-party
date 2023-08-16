<script setup>
import { ref } from 'vue'
import Hero from '../components/Hero.vue'
import Header from '../components/Header.vue'
import Location from '../components/Location.vue'
import FAQs from '../components/FAQs.vue'
import Footer from '../components/Footer.vue'
import RSVP from '../components/RSVP.vue'

const loaded = ref(false)

console.log("Are you a former coworker or Dan looking in the console for bugs? Here's a bug for you 🖕")
</script>

<template>
  <main>
    <Hero id="hero" @entered="loaded = true" />
    
    <template v-if="loaded">
      <Header id="header"/>
      <FAQs id="faqs"/>
      <RSVP id="rsvp"/>
      <Location id="location"/>
      <Footer id="footer"/>
    </template>
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
