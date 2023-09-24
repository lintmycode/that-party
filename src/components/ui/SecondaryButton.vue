<template>
  <button type="button">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
button {
  display: flex;
  align-items: center;
  gap: 1rem;
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1.8rem;
  letter-spacing: 0.2rem;
  background-color: var(--color-text);
  color: var(--color-background);
  cursor: pointer;
  border-radius: 0;
  transition: 100ms all;

  &:hover,
  &:focus {
    color: var(--color-primary);
  }
}
</style>
