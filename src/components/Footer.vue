<template>
  <footer>
    <p>
      Ainda tens dúvidas? Sugestões? Escreve para
      <a href="mailto:aquelafesta@nitida.pt">aquelafesta@nitida.pt</a>
    </p>
    <p>//</p>
    <p>Nítida &copy; 2023</p>
  </footer>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/mixins/padding.scss';

footer {
  @include padding-section;
  background-color: var(--color-text);
  text-align: center;

  p {
    color: var(--color-background);
  }
}
</style>
