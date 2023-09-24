<script setup></script>

<template>
  <ul>
    <slot />
  </ul>
</template>

<style lang="scss" scoped>
ul {
  display: flex;
  gap: 1.6rem 0.8rem;
  flex-wrap: wrap;
  justify-content: flex-start;

  :slotted(li) {
    flex: 1 1 auto;
    height: 19vh;
    min-height: 15rem;
    position: relative;
    transition: opacity, border 100ms ease-in;
    border: 1px solid transparent;
    opacity: 0.9;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;

    &:hover {
      opacity: 1;
      border-color: var(--color-secondary);
    }

    img {
      cursor: pointer;
      //width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
    }
  }
}
</style>
