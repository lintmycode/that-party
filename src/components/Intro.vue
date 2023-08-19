<script setup>
import { useScroll } from '@/lib/useScroll';
import SectionTitle from './atoms/SectionTitle.vue'
import ContentSection from './layout/ContentSection.vue'
import PrimaryButton from './ui/PrimaryButton.vue';
import ExternalLink from './ui/ExternalLink.vue';
import UnorderedList from './atoms/UnorderedList.vue'

const { scrollToElementById } = useScroll();
</script>

<template>
  <ContentSection type="dark">
    <template #content>
      <SectionTitle>Óptimo! Vamos a pormenores:</SectionTitle>      
      <UnorderedList>
        <li>Data <strong>SÁBADO, 16 DE SETEMBRO DE 2023</strong></li>
        <li>HORÁRIO <strong>16h - 23h (o casamento começa às 17h)</strong></li>
        <li>LOCAL <strong>
          <ExternalLink href="https://goo.gl/maps/TToH2fmqaeEq3knx6" target="_blank" ><i>Monte de Santo António</i></ExternalLink> -> Afife</strong></li>
        <li>DRESS CODE <strong>Veste igual a ti -> traz o que já tens</strong></li>
        <li>OFERTAS <strong>Bar, Grelha, Tábua ou Doce -> A música vai ser por nossa conta</strong></li>
      </UnorderedList>
      <footer>
        RSVP: É IMPORTANTE O REGISTO DE CADA PESSOA QUE IRÁ MARCAR PRESENÇA NA FESTA, PARA GERIR A COMIDA E A BEBIDA DE FORMA A QUE "NÃO VOS FALTE NADA"!
      </footer>
    </template>
    <template #cta>
    <PrimaryButton @click="scrollToElementById('faqs')">Ainda tenho algumas questões &#x25BC;</PrimaryButton>
    </template>
  </ContentSection>
</template>

<style lang="scss" scoped>
</style>

