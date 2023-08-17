<script setup>
import { useScroll } from '@/lib/useScroll';
import SectionTitle from './atoms/SectionTitle.vue'
import ContentSection from './layout/ContentSection.vue'
import PrimaryButton from './ui/PrimaryButton.vue';
import ExternalLink from './ui/ExternalLink.vue';

const { scrollToElementById } = useScroll();
</script>

<template>
  <ContentSection type="dark">
    <template #content>
      <SectionTitle>Óptimo! Vamos a pormenores:</SectionTitle>      
      <p>
        Data <strong>16 DE SETEMBRO DE 2023</strong><br>
        HORÁRIO <strong>16h - 23h (o casamento é às 17h)</strong><br>
        LOCAL <strong>Monte de Santo António - Afife - 
          <ExternalLink href="https://goo.gl/maps/TToH2fmqaeEq3knx6" target="_blank" ><i>ver no mapa</i> -&gt;</ExternalLink></strong><br>
        DRESS CODE <strong>Veste igual a ti - meninas, a desculpa para comprar "aquele vestido"!</strong><br>
        OFERTAS <strong>Doce, Grelha ou Bar -> A música vai ser por nossa conta</strong><br>
      </p>
      <p>
        <footer>
          É MUITO IMPORTANTE O REGISTO DE CADA PESSOA QUE IRÁ MARCAR PRESENÇA NA FESTA, PARA GERIR A COMIDA E A BEBIDA DE FORMA A QUE "NÃO VOS FALTE NADA"!
        </footer>
      </p>
    </template>
    <template #cta>
    <PrimaryButton @click="scrollToElementById('faqs')">Ainda tenho algumas questões &#x25BC;</PrimaryButton>
    </template>
  </ContentSection>
</template>

<style lang="scss" scoped>
</style>

