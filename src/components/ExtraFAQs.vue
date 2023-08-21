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
      <SectionTitle>Mais Questões &amp; Sugestões</SectionTitle>
      <UnorderedList>
        <li>
          <h3>Gostava de contribuir com algo diferente e/ou inusitado, acham boa ideia?</h3>
          <p>Apelamos ao bom senso, na dúvida p.f. contacta-nos para uma segunda opinião.</p>
        </li>

        <li>
          <h3>E se eu me esquecer do que me comprometi a levar, posso inventar?</h3>
          <p>Isso nunca irá acontecer pois assim que efectuas o registo recebes um email com tudo o que disseste que levavas!</p>
        </li>

        <li>
          <h3>Então, esta festa vai ser tipo um arraial, ...?</h3>
          <p>Longe disso. Perdoem-nos os mais sensíveis mas não será permitido pedir, evocar, implorar ao DJ qualquer tipo 
            de música “pimba”. “Apita o comboio” incluído. Não apreciamos, de maneira nenhuma. Obrigado. </p>
        </li>

        <li>
          <h3>Há algum “tema” nesta festa?</h3>
          <p>Gostamos de imaginar que o tema “Neon” vai estar presente na festa, mas podemos chegar a ter só uma party-lamp 
            a rodar, ... As pessoas, na sua autenticidade, farão AQUELA FESTA! Pelo sim pelo não, traz daquelas pulseiras que 
            brilham no escuro; parece-nos boa ideia!</p>
        </li>

        <li>
          <h3>Vai haver música para dançar?</h3>
          <p>Sim, fazemos questão de manter a reputação de mais de uma dezena de anos de festas de enorme sucesso! :) :) :)</p>
        </li>

        <li>
          <h3>É permitido fumar/foguear no local?</h3>
          <p>Estamos ao ar livre e por isso é permitido fumar, desde que te certifiques que apagas o teu cigarro nos recipientes
             com areia que estarão disponíveis para esse efeito no local. Tanto pela questão de risco de incêndio como pela 
             limpeza no fim da festa. Agradecemos desde já atenção a qualquer tipo de “fogo”. São absolutamente proibidos 
             quaisquer fogos de artificio, ou qualquer outro tipo de fogo, por mais pequenos que sejam, pelas razões obvias 
             (estamos no Monte!).</p>
        </li>

        <li>
          <h3>E locais para dormir? Recomendam alguma coisa?</h3>
          <p>Em Afife existem alguns alojamentos locais e turismos rurais; se preferes um hotel ou maior oferta de alojamentos,
            o melhor é procurar em Vila Praia de Âncora, Viana do Castelo ou Caminha. Também existe o Parque de Campismo "Sereia da Gelfa"
            com algumas opções. Não marcaste dormida a tempo? Sem stress, os parques de estacionamento da praia da Arda permitem pernoita 
            em carro ou auto-caravana, com direito a chuveiro e wc.</p>
        </li>

        <li>
          <h3>E para comer, perto da festa...?</h3>
          <p><strong>Café de Cabanas</strong> - comida orgânica proveniente da Quinta de Cabanas - sitio mágico (Afife)
            <br><strong>Restaurante Mariana</strong> - um clássico, robalo cozido ao vapor em sargaço com feijão verde e maionese caseira - 
            imperdível (Afife)
            <br><strong>Restaurante Sr. Bacalhau</strong> - o mais trend de Afife, ambiente moderno, comida boa - nada económico
            <br><strong>Taberna da Estação</strong> - tapas e petiscos, cervejas boas (Afife)
            <br><strong>Moodz café</strong> - café típico, tem de tudo um pouco, revistas, gelados da Olá e tabaco incluído
            <br><strong>Supermercado Coviran</strong> - pão e fruta ótima - tem tudo que um super deve ter
            <br><strong>Cafetaria</strong> - o típico local com pizas, pregos, sandes e afins - na entrada do Campismo da Sereia da Gelfa (Gelfa)
            <br><strong>Restaurante Camarão</strong> - mariscada com vista (Praia Forte do Cão)
            <br><strong>A Taberna 349</strong> - finos, tapas, pataniscas em cima do mar (Vila Praia de Âncora)
            <br><strong>Restaurante Casa dos Caracóis</strong> - comida simples e saborosa, servem durante todo o dia (Vila Praia de Âncora)
            <br><strong>Petinga Doce</strong> - café com esplanada e pastelaria típica. Provar os Sidónios (Vila Praia de Âncora)
            <br>Também tens algumas boas opções, um pouco mais afastadas, em Moledo, Caminha e Viana do Castelo</p>
        </li>

      </UnorderedList>
    </template>

  </ContentSection>
</template>

<style lang="scss" scoped>
p {
  font-size: 1.8rem;
  color: var(--color-background);
}
</style>
