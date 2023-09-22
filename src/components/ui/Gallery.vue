<script setup>
</script>

<template>
  <ul>
    <slot />
  </ul>
</template>

<style lang="scss" scoped>
ul {
  display: flex;
  gap: 1.6rem .8rem;
  flex-wrap: wrap;
  justify-content: flex-start;

  :slotted(li) {
    flex: 1 1 auto;
    height: 19vh;
    min-height: 15rem;
    
    img,
    video {
      cursor: pointer;
      //max-width: 30rem;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: .9;
      transition: all 100ms ease-in;
      border: 1px solid transparent;

      &:hover {
        opacity: 1;
        border-color: var(--color-secondary);
      }
    }
  }
}

</style>