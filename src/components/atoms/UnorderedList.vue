<template>
  <ul>
    <slot />
  </ul>
</template>

<style lang="scss" scoped>
ul {
  //margin: 0 auto;
  list-style-type: disc;
  font-size: 2.4rem;
  margin-left: 2.4rem;

  @media (max-width: 1200px) {
    // font-size: 2.2rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-left: 2rem;
  }

  :slotted(li) {
    & + li {
      margin-top: 2rem;
    }
  }
}
</style>
