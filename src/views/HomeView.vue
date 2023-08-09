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
    <Hero />
    <Header />
    <Location />
    <FAQs />
    <RSVP />
    <Footer />
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