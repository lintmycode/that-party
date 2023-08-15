<template>
  <section class="content-section">
    <slot />
  </section>
</template>

<style lang="scss" scoped>
.content-section {
  padding: 10rem 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8rem;

  @media (max-width: 1200px) {
    padding: 6rem 3rem;
    gap: 6rem;
  }
  
  @media (max-width: 768px) {
    padding: 4rem 2rem;
  }

  & + .content-section {
    border-top: 0.5rem solid var(--color-secondary);
  }
}
</style>
