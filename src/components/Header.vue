<script setup>
import { useScroll } from '@/lib/useScroll';
import SectionTitle from './atoms/SectionTitle.vue'
import ContentSection from './layout/ContentSection.vue'
import PrimaryButton from './ui/PrimaryButton.vue';

const { scrollToElementById } = useScroll();
</script>

<template>
  <ContentSection type="light">
    <template #content>
      <SectionTitle>Vamos casar,</SectionTitle>      
      <p>
        <strong>
          Mas, acima de tudo, queremos CE-LE-BRAR! Celebrar a vida. Celebrar a família que nos gerou e a 
          que nos acompanha desde que nascemos (ou até antes!), a família que a vida nos trouxe e escolhemos, 
          a família que entretanto geramos. Celebrar os amigos de sempre, os mais recentes, os novos e os que 
          ainda virão a ser maiores. Celebrar esta terra que decidimos agora chamar nossa, as suas gentes e costumes, 
          o seu mar, a sua montanha e a doçura da água que a percorre. Queremos celebrar, acima de tudo, a VIDA! Vamos juntos?
        </strong>
      </p>
      <footer>
        (NA REALIDADE TUDO COMEÇOU PORQUE O NUNO QUERIA 15 DIAS EXTRA DE FÉRIAS... :)
      </footer>
    </template>
    <template #cta>
    <PrimaryButton @click="scrollToElementById('intro')">Já só quero celebrar! &#x25BC;</PrimaryButton>
    </template>
  </ContentSection>
</template>

<style lang="scss" scoped>
</style>
