<template>
  <ul>
    <slot/>
  </ul>
</template>

<style lang="scss" scoped>
ul {
  margin: 2rem auto;
  max-width: 50vw;
  list-style-type: disc;
  font-size: 3rem;
  
  :slotted(li) {
    & + li {
      margin-top: 2rem;
    }
  }
}
</style>