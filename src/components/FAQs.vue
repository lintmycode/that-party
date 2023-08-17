<script setup>import { useScroll } from '@/lib/useScroll';
import SectionTitle from './atoms/SectionTitle.vue'
import UnorderedList from './atoms/UnorderedList.vue'
import ContentSection from './layout/ContentSection.vue'
import PrimaryButton from './ui/PrimaryButton.vue';

const { scrollToElementById } = useScroll();
</script>

<template>
  <ContentSection type="dark">
    <template #content>
      <SectionTitle>Algumas Questões</SectionTitle>
      <UnorderedList>
        <li>
          <h3>Casamento? Vocês já não eram casados?</h3>
          <p>Nunca calhou.</p>
        </li>
        <li>
          <h3>Monte de Santo António? Não conheço essa quinta.</h3>
          <p>O Monte é um local público, gentilmente cedido para o evento pela Junta de Afife.</p>
        </li>
        <li>
          <h3>E vamos à Capela?</h3>
          <p>Não, o casamento é apenas cívil.</p>
        </li>
        <li>
          <h3>E há copo d'água no Monte?</h3>
          <p>Felizmente não. Mas haverá pessoas a servir o que vocês trouxerem.</p>
        </li>
        <li>
          <h3>Lista de casamento?</h3>
          <p>
            Nem pensar nisso! Se és daquelas pessoas que acha que parece mal vir de mãos a abanar, vai
            treinando 👋.
          </p>
        </li>
        <li>
          <h3>Gostava de contribuir com algo diferente e/ou inusitado, vai dar?</h3>
          <p>Apelamos ao bom senso, na dúvida p.f. contacta-nos para uma segunda opinião.</p>
        </li>
        <li>
          <h3>Não vou. Tenho de fazer alguma coisa?</h3>
          <p>Tranquilo, só contamos com quem preencheu a ficha de inscrição acima.</p>
        </li>
      </UnorderedList>
    </template>
    <template #cta>
      <PrimaryButton @click="scrollToElementById('rsvp')">Regista-te Aqui &#x25BC;</PrimaryButton>
    </template>
  </ContentSection>
</template>

<style lang="scss" scoped>
h3 {
  font-weight: 700;
}
</style>
