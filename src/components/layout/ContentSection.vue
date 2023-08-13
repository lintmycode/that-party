<template>
  <section class="content-section">
    <slot />
  </section>
</template>

<style lang="scss" scoped>
.content-section {
  padding: 10rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8rem;

  & + .content-section {
    border-top: 0.5rem solid var(--color-secondary);
  }
}
</style>
