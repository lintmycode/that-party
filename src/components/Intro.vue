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
        <li>DATA - <strong>SÁBADO, 16 DE SETEMBRO DE 2023</strong></li>
        <li>HORÁRIO - <strong>Das 16h às 23h</strong></li>
        <li>LOCAL - <strong>
          <ExternalLink href="https://goo.gl/maps/TToH2fmqaeEq3knx6" target="_blank" ><i>Monte de Santo António</i></ExternalLink> -> Afife</strong></li>
        <li>DRESS CODE - <strong>Informal; veste igual a ti -> traz o que já tens</strong></li>
        <li>RSVP - <strong>Confirma a tua presença (e de quem vai contigo) no formulário mais abaixo</strong></li>
        <li>OFERTAS - <strong>Traz algo para partilhar - Bar, Grelha, Tábua ou Doce</strong></li>
      </UnorderedList>
      <footer>Para outras ofertas contacta-nos pf.</footer>
    </template>
    <template #cta>
    <PrimaryButton @click="scrollToElementById('faqs')">Algumas questões &#x25BC;</PrimaryButton>
    </template>
  </ContentSection>
</template>

<style lang="scss" scoped>
</style>

