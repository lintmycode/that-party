<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>

<style lang="scss">
@import './assets/scss/reset';
@import './assets/scss/fonts';
@import './assets/scss/base';
@import './assets/scss/form';
@import './assets/scss/mixins/padding.scss';

main {
  & > section {
    @include padding-section;
    background-color: var(--color-background);
    min-height: 100vh;
  }
}
</style>
