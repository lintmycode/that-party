<template>
  <ul>
    <slot />
  </ul>
</template>

<style lang="scss" scoped>
ul {
  margin: 0 auto;
  max-width: 50vw;
  list-style-type: disc;
  font-size: 3rem;

  @media (max-width: 1200px) {
    font-size: 2.6rem;
    max-width: 74vw;
  }

  @media (max-width: 768px) {
    font-size: 2.6rem;
    max-width: 80vw;
  }

  :slotted(li) {
    & + li {
      margin-top: 2rem;
    }
  }
}
</style>
