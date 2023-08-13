<script setup>
import SectionTitle from './atoms/SectionTitle.vue'
import UnorderedList from './atoms/UnorderedList.vue'
import ContentSection from './layout/ContentSection.vue'
</script>

<template>
  <ContentSection>
    <!-- Header: This is where you can briefly explain the plan for the day and your concept of the celebration. 
      Make it welcoming and personal. It's also a good place to clarify the informal dress code and mention 
      that it's a "bring your own" food and drink event. -->

    <SectionTitle>Vem Celebrar</SectionTitle>

    <UnorderedList>
      <li>Das 16h às 23h; a notária vem às 17h.</li>
      <li>Vestuário informal; traz o que já tens.</li>
      <li>Não queremos presentes, já temos tudo. Mas aceitamos contributos para a festa.</li>
      <li>
        O essêncial é registares-te, dizeres quem vem e o que vais trazer. <a href="#">AQUI</a>
      </li>
    </UnorderedList>

    <blockquote>
      <p>Finalmente.</p>
      <cite>- toda a gente</cite>
    </blockquote>
  </ContentSection>
</template>

<style lang="scss" scoped>
blockquote {
  padding: 2rem;
  border-left: 8px solid var(--color-secondary);
  position: relative;
  width: 60rem;
  margin: 2rem auto;

  &:before {
    content: '“';
    position: absolute;
    top: 1rem;
    left: 2rem;
    font-size: 12rem;
    line-height: 12rem;
    color: var(--color-secondary);
    font-family: 'Georgia', serif;
  }

  p {
    font-size: 5rem;
    line-height: 5rem;
    margin-left: 5rem;
    font-style: italic;
    font-family: 'Georgia', serif;
  }

  cite {
    display: block;
    text-align: right;
    margin-top: 1rem;
    font-weight: bold;
    color: var(--color-border);
  }
}
</style>
