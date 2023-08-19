<template>
  <h2>
    <slot />
  </h2>
</template>

<style lang="scss" scoped>
h2 {
  font-family: HiguenSerif;
  font-size: 7rem;
  line-height: 1;
  text-align: left;

  @media (max-width: 1200px) {
    font-size: 6rem;
  }

  @media (max-width: 768px) {
    font-size: 3.9rem;
  }
}
</style>
