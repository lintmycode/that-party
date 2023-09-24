<script setup>
const emit = defineEmits(['close'])
const close = () => {
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <section class="modal">
      <button class="close" @click="close">&#x2715;</button>
      <slot />
    </section>
  </Teleport>
</template>

<style lang="scss" scoped>
section {
  position: fixed;
  width: 100vw;
  height: 100vh;
  padding: 0;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    //background-color: rgba(27, 6, 48, .6);
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(20px);
    z-index: 0;
  }

  button,
  :slotted(button) {
    position: absolute;
    width: 4rem;
    height: 4rem;
    border-radius: 2rem;
    border: 0;
    background-color: var(--color-primary);
    font-family: arial, sans-serif;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    color: var(--color-text);

    &:active {
      background-color: var(--color-secondary);
    }

    &.close {
      font-size: 2rem;
      top: 2rem;
      right: 2rem;
    }
  }
}
</style>
