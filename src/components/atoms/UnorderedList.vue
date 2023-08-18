<template>
  <ul>
    <slot />
  </ul>
</template>

<style lang="scss" scoped>
ul {
  list-style-type: none;
  font-size: 2.2rem;
  margin-left: 0;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-left: 2rem;
  }

  :slotted(li) {
    & + li {
      margin-top: 2rem;
    }

    .highlight {
      color: var(--color-secondary);
    }
  }
}
</style>
