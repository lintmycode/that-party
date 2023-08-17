<script setup>
import { useScroll } from '@/lib/useScroll';
import SectionTitle from './atoms/SectionTitle.vue'
import UnorderedList from './atoms/UnorderedList.vue'
import ContentSection from './layout/ContentSection.vue'
import BigYellowButton from './ui/BigYellowButton.vue';

const { scrollToElementById } = useScroll();
</script>

<template>
  <ContentSection>
    <SectionTitle>Vem Celebrar</SectionTitle>

    <UnorderedList>
      <li>Das 16h às 23h; a notária vem às 17h.</li>
      <li>Vestuário informal; traz o que já tens.</li>
      <li>Não queremos presentes, já temos tudo. Mas aceitamos contributos para a festa.</li>
      <li>
        O essêncial é registares-te, dizeres quem vem e o que vais trazer. 
      </li>
    </UnorderedList>
    <BigYellowButton @click="scrollToElementById('faqs')">&#x25BC; Ainda tens dúvidas? &#x25BC;</BigYellowButton>

    <!-- <blockquote>
      <p>Finalmente.</p>
      <cite>- toda a gente</cite>
    </blockquote> -->
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
