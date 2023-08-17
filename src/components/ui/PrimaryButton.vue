<template>
  <button type="button">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
button {
  padding: .8rem 6rem;
  color: var(--color-background);
  background-color: var(--color-secondary);
  border-radius: 0;
  text-align: center;
  min-width: 22rem;
  font-weight: 600;
  font-size: 1.8rem;
  text-transform: uppercase;
  font-family: AnonymousPro;
  border: 0;
  cursor: pointer;
  z-index: 1;
  transition: 50ms all ease-in;

  &:hover,
  &:focus {
    color: var(--color-text);
    background-color: var(--color-primary);
  }

  &[disabled] {
    opacity: 0.3;
    cursor: default;
    pointer-events: none;
  }
}
</style>
