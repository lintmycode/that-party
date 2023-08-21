<script setup>import { useScroll } from '@/lib/useScroll';
import SectionTitle from './atoms/SectionTitle.vue'
import UnorderedList from './atoms/UnorderedList.vue'
import ContentSection from './layout/ContentSection.vue'
import PrimaryButton from './ui/PrimaryButton.vue';
import ExternalLink from './ui/ExternalLink.vue';

const { scrollToElementById } = useScroll();
</script>

<template>
  <ContentSection type="dark">
    <template #content>
      <SectionTitle>Algumas questões</SectionTitle>
      <UnorderedList>
        <li>
          <h3>Casamento!? Já não eram casados?...</h3>
          <p>Não, nunca calhou. 13 anos, 4 casas e filhos depois, achamos que era boa ideia.</p>
        </li>

        <li>
          <h3>Só por curiosidade, porque é que chamaram a este casamento “AQUELA FESTA”?</h3>
          <p>Porque o Adolfo teve dificuldade em memorizar a palavra “Casamento”, referindo-se sempre como AQUELA FESTA. Achamos piada. É nosso filho. Assumimos o nome.</p>
        </li>

        <li>
          <h3>Monte de Santo António? Não conheço essa quinta...</h3>
          <p>O Monte é um local público em Afife, gentilmente cedido para o evento pela Junta de Freguesia. 
            A festa vai ser totalmente ao ar livre e é essencial trazares um agasalho para o final do dia.</p>
        </li>
        
        <li>
          <h3>O casamento vai ser na Capela?</h3>
          <p>Não, o casamento é civil.</p>
        </li>

        <li>
          <h3>E o Copo-d’água?</h3>
          <p>Contamos com o teu contributo na forma de comida e bebida para partilhar. 
            Podes trazer carne para a grelha, queijos e enchidos, doces e bebidas.
            No formulário de registo, mais abaixo, encontrarás uma lista de contributos possíveis onde podes seleccionar o que queres levar.
          </p>
        </li>

        <li>
          <h3>Além das sugestões “Bar, Grelha, Tábua ou Doce”, posso levar moelas, bifanas ou salgadinhos?</h3>
          <p>Sim, claro, todos adoramos um bom petisco! Pedimos é que venham prontos a servir pois não teremos possibilidade 
            de cozinhar no local.</p>
        </li>

        <li>
          <h3>Posso oferecer um “bolo de noivos”?</h3>
          <p>Claro! Adoramos que te inspires em nós para personalizares um dos bolos da nossa celebração! Prepara-te é que 
            pode haver mais do que um bolo de noivos! E na realidade, gostamos da ideia!</p>
        </li>

        <li>
          <h3>Há Lista de Casamento? </h3>
          <p>Não! Lembra-te, a ideia é celebrar! Pedimos apenas que tragas um contributo "comestível", conforme descrito acima.</p>
        </li>

        <li>
          <h3>Quem devo registar no formulário?</h3>
          <p>Registas-te a ti e quem vem contigo; família, filhos, companheira/o... </p>
        </li>

       
        <li>
          <h3>E as crianças?</h3>
          <p>As crianças são super bem-vindas mas estarão à total responsabilidade dos pais. É boa ideia as crianças trazerem lanternas e/ou 
            frontais pois além de ser diversão garantida conseguimos sempre perceber “por onde andam”. As pulseiras 
            neon que brilham no escuro também são boa ideia.</p>
        </li>
        
        <li>
          <h3>Não vou. Tenho de fazer alguma coisa?</h3>
          <p>Tranquilo, só contabilizamos quem preencher o formulário de registo. Se sentires que queres 
            dizer alguma coisa podes escrever para o email 
            <ExternalLink href="mailto:aquelafesta@nitida.pt"><i>aquelafesta@nitida.pt</i>-&gt;</ExternalLink>.</p>
        </li>
      </UnorderedList>
      
    </template>
    <template #cta>
      <PrimaryButton @click="scrollToElementById('rsvp')">Quero Registar-me &#x25BC;</PrimaryButton>
    </template>
  </ContentSection>
</template>

<style lang="scss" scoped>
p {
  font-size: 1.8rem;
  color: var(--color-background);
}
</style>
