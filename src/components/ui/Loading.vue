<template>
  <span>
    <slot />
  </span>
</template>

<style lang="scss" scoped>
@keyframes pulsate {
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
}

span {
  font-size: 2.4rem;
  animation: pulsate 1s infinite;
  text-align: center;
}
</style>