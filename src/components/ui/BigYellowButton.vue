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
  z-index: 1;
  transition: 100ms all ease-in;

  &:before,
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: var(--color-secondary);
    border-radius: .5rem;
    z-index: -1;
  }

  &:before {
    background-color: var(--color-primary);
    width: 100%;
  }

  &:after {
    width: 0;
    transition: 200ms all ease-in;
  }

  &:hover {
    color: var(--color-background);

    &:after {
      width: 100%;
    }
  }
}
</style>