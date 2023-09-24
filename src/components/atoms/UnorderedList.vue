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
    margin-left: 0rem;
  }

  :slotted(li) {
    & + li {
      margin-top: 2rem;
    }

    h3 {
      color: var(--color-secondary);
      margin-bottom: 1rem;
      line-height: 1.4;
    }

    .highlight {
      color: var(--color-secondary);
    }
  }
}
</style>
