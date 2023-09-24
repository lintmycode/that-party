<template>
  <a><slot /></a>
</template>

<style lang="scss" scoped>
a {
  text-decoration: none;

  :slotted(i) {
    font-style: normal;
    text-decoration: underline;
    font-weight: 700;
  }
}
</style>
