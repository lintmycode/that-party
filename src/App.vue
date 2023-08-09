<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <!-- <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </div>
  </header> -->

  <RouterView />
</template>

<style lang="scss">
@import './assets/scss/reset';
@import './assets/scss/fonts';
@import './assets/scss/base';
@import './assets/scss/form';
</style>
