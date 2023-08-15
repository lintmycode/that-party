<script setup>
import Hero from '../components/Hero.vue'
import Header from '../components/Header.vue'
import Location from '../components/Location.vue'
import FAQs from '../components/FAQs.vue'
import Footer from '../components/Footer.vue'
import RSVP from '../components/RSVP.vue'
</script>

<template>
  <main>
    <Hero id="hero" />
    <Header id="header" />
    <FAQs id="faqs" />
    <RSVP id="rsvp" />
    <Location id="location" />
    <Footer id="footer" />
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
