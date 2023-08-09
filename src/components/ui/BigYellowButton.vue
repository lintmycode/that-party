<template>
  <button type="button">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
button {
  padding: 1.6rem 2rem;
  color: var(--color-text);
  background-color: var(--color-primary);
  border-radius: .5rem;
  text-align: center;
  min-width: 22rem;
  font-weight: 600;
  font-size: 2rem;
  text-transform: uppercase;
  font-family: AnonymousPro;
  border: 0;
  margin-top: 8rem;
  cursor: pointer;
}
</style>