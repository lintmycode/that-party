<template>
  <h2>
    <slot />
  </h2>
</template>

<style lang="scss" scoped>
h2 {
  font-family: HiguenSerif;
  font-size: 10rem;
  line-height: 1.2;
  text-align: center;

  @media (max-width: 1200px) {
    font-size: 8rem;
  }

  @media (max-width: 768px) {
    font-size: 6rem;
  }
}
</style>
