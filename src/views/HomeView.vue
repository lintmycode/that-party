<script setup>
import { ref } from 'vue'
import Hero from '../components/Hero.vue'
import Header from '../components/Header.vue'
import Location from '../components/Location.vue'
import FAQs from '../components/FAQs.vue'
import Footer from '../components/Footer.vue'
import RSVP from '../components/RSVP.vue'
import Intro from '../components/Intro.vue'

const loaded = ref(false)

console.log("Are you a former coworker or Dan looking in the console for bugs? Here's a bug for you 🖕")
</script>

<template>
  <Hero id="hero" @entered="loaded = true" />
  
  <template v-if="loaded">
    <Header id="header"/>
    <Intro id="intro"/>
    <FAQs id="faqs"/>
    <RSVP id="rsvp"/>
    <Location id="location"/>
    <Footer id="footer"/>
  </template>
</template>
