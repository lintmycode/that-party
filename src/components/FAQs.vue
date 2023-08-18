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
          <h3>Casamento!? Já não eram casados? ...</h3>
          <p>Não, nunca calhou. 13 anos, 4 casas e filhos depois, achamos que era boa ideia - na realidade 
            tudo começou com o Nuno a querer mais 15 dias de férias e a Filipa a querer festa em Afife!</p>
        </li>

        <li>
          <h3>Monte de Santo António? Não conheço essa quinta...</h3>
          <p>O Monte é um local público em Afife, gentilmente cedido para o evento, pela Junta de Freguesia. 
            A vista é única, o pôr-do-sol de cortar a respiração, MAS traz casaquinho que o vento vem de norte, 
            e há sempre aquela humidade “fresquinha”. A festa vai ser totalmente ao ar livre e se-deus-quiser vai 
            estar um tempo incrível!</p>
        </li>
        
        <li>
          <h3>O casamento vai ser na Capela de Santo António, a que dá nome ao Monte?</h3>
          <p>Não, o casamento é civil. Apenas iremos usar todo o espaço verde envolvente para a nossa celebração. 
            Ter em atenção que será uma celebração totalmente ao ar livre.</p>
        </li>

        <li>
          <h3>E o Copo-d’água?</h3>
          <p>Decidimos reinventar o conceito do Copo d’água tradicional. Haverão algumas mesas e bancos mas sem lugares 
            sentados previamente atribuídos (dar prioridade aos mais séniores é de bom tom!) 
            <br>Existe um pequeno edifício no local onde poderão deixar as vossas ofertas (Bar, Grelha, Tábua ou Doce) e 
            onde estarão pessoas dedicadas a organizá-las para depois servir. Ter em atenção que será uma celebração 
            totalmente ao ar livre (trazer agasalhos para o final do dia é imprescindível!). Uma manta, kispo, albernó, 
            lenço ou xaile é boa ideia.</p>
        </li>

        <li>
          <h3>Há Lista de Casamento? </h3>
          <p>Não! Lembra-te, a ideia é celebrar! Pedimos apenas que tragas uma oferta “comestível”. Pode ser Bar, Grelha, 
            Tábua ou Doce - no formulário de registo, onde confirmarás a tua participação, vais ser totalmente orientado 
            para os itens que podes trazer. </p>
        </li>

        <li>
          <h3>“Bar, Grelha, Tábua ou Doce” - Expliquem melhor pf!</h3>
          <p>Estas serão as vossas ofertas para esta nossa/vossa celebração, além da vossa presença imprescindível. Obviamente 
            não precisas de trazer “de tudo”. No formulário de registo, onde confirmarás a tua participação, vais ser totalmente 
            orientado para os itens que podes trazer. Além destas, ofereceremos o Caldo Verde, o Pão 
            e a Broa!
            <br><br><span class="highlight">BAR</span> - Podes optar por trazer o clássico gin ou porto tónico ou trazer os ingredientes 
            necessários para fazer o tradicional Champarrião. Também podes optar pelos variados tipos de vinho: rosé, espumante, 
            branco, tinto ou alvarinho. Para as crianças, e para quem vai conduzir, podes trazer: água das pedras, 
            coca-cola, 7up, Fanta, ice tea e sumos. Há uma fonte de água potável no local. Além disso, será oferecido um copo 
            no pedido da primeira bebida onde será escrito o teu nome. Esse copo deve ser mantido até ao fim, haverá um 
            “lava-copos” no local, onde poderás lavar o copo antes da bebida seguinte. MUITO IMPORTANTE: mantermos o Monte 
            limpo e não produzir excesso de lixo.
            <br><br><span class="highlight">GRELHA</span> - vai haver um grelhador grande com uma pessoa responsável por cozinhar tudo o 
            que trouxerem, idealmente temperado (não tens tempo para isso, sem stress, traz só o bicho!). Podes trazer 
            hambúrgueres, frango, costelinhas, febras, chouriço ou salsichas. Também poderão ser grelhados legumes ou 
            hambúrgueres vegetarianos para quem não come carne.
            <br><br><span class="highlight">TÁBUA</span> - enchidos, queijos, tostas, crakers, grissinos, batatas fritas, frutos secos, 
            uvas, figos, frutos silvestres, maça, mel, húmus, tomates cereja, azeitonas, cenouras e pepinos. 
            <br><br><span class="highlight">DOCE</span> - pode ser qualquer bolo, tarte, torta, biscoitos, bolachas, queques ou sobremesa, 
            desde que não necessite de “frio”, não temos mega frigoríficos no local e serão privilegiadas as bebidas frescas.</p>
        </li>

        <li>
          <h3>Além deste “Bar, Grelha, Tábua ou Doce”, posso levar moelas, bifanas ou salgadinhos?</h3>
          <p>Sim, claro, todos adoramos um bom petisco! Pedimos é que venham prontos a servir pois não teremos possibilidade 
            de cozinhar no local.</p>
        </li>

        <li>
          <h3>Posso oferecer um “bolo de noivos”?</h3>
          <p>Claro! Adoramos que te inspires em nós para personalizares um dos bolos da nossa celebração! Prepara-te é que 
            pode haver mais do que um bolo de noivos! E na realidade, gostamos da ideia!</p>
        </li>

        <li>
          <h3>Gostava de contribuir com algo diferente e/ou inusitado, acham boa ideia?</h3>
          <p>Apelamos ao bom senso, na dúvida p.f. contacta-nos para uma segunda opinião.</p>
        </li>

        <li>
          <h3>O que é isso do “formulário de registo”?</h3>
          <p>Para não haver litros e litros de álcool para três febras na grelha, lembramo-nos de criar um formulário que 
            contabiliza o número de pessoas e o que se comprometem a trazer. É essencial que cumpram com o vosso compromisso, 
            caso contrário, corremos o risco de ter litros e litros de álcool para três febras na grelha, como falamos há 
            bocado...</p>
        </li>

        <li>
          <h3>E se eu me esquecer do que me comprometi a levar, posso inventar?</h3>
          <p>Isso nunca irá acontecer pois assim que efectuas o registo recebes um email com tudo o que disseste que levavas!</p>
        </li>

        <li>
          <h3>Posso registar a presença de mais do que uma pessoa no “formulário de registo”?</h3>
          <p>Sim, claro. No formulário podes acrescentar várias pessoas do teu agregado e que foram nomeadas como nossos 
            convidados. </p>
        </li>

        <li>
          <h3>Vai haver música para dançar?</h3>
          <p>Sim, fazemos questão de manter a reputação de mais de uma dezena de anos de festas de enorme sucesso! :) :) :)</p>
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
          <h3>Só por curiosidade, porque é que chamaram a este casamento “AQUELA FESTA”?</h3>
          <p>Porque o Adolfo, desde o início, teve dificuldade em memorizar a palavra “Casamento”, referindo-se sempre ao 
            mesmo como AQUELA FESTA. Achamos piada. É nosso filho. Assumimos o nome.</p>
        </li>

        <li>
          <h3>E as crianças?</h3>
          <p>As crianças são super bem-vindas mas estarão à total responsabilidade dos pais. Pretendemos montar um trampolim 
            e uma tenda com algumas almofadas para as crianças usufruirem. É boa ideia as crianças trazerem lanternas e/ou 
            frontais pois além de ser diversão garantida conseguimos sempre perceber “por onde andam”. Mais uma vez, as pulseiras 
            neon que brilham no escuro são uma boa ideia.</p>
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
            <br><strong>Restaurante Mariana</strong> - um clássico, robalo cozido ao vapor em sargaço com feijão verde e maionese caseira - imperdível (Afife)
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

        <li>
          <h3>Não vou. Tenho de fazer alguma coisa?</h3>
          <p>Tranquilo, só contabilizamos quem preencher o formulário de registo.</p>
        </li>

        <li>
          <h3>SUPER ATENÇÃO please</h3>
          <p>É muito importante o registo de cada pessoa que pretende celebrar connosco este dia, para gerir a comida e a bebida, Queremos que "não vos falte nada"! Pf faz o teu registo logo que possível.
            <br><br>Quem por qualquer razão não consiga estar presente, apenas não faz registo de presença. Se sentir que quer dizer alguma coisa pode escrever para o email <ExternalLink href="mailto:aquelafesta@nitida.pt"><i>aquelafesta@nitida.pt</i>-&gt;</ExternalLink>.
            <br><br><span class="highlight">Qualquer uma destas informações está sujeita a ser alterada até à data da “AQUELA FESTA”, por questões práticas/logísticas que entretanto possam surgir, pelo que aconselhamos a que revejam mais perto do evento esta página das “Questões”. Um email será também enviado quando se tratarem de alterações importantes.</span></p>
        </li>
      </UnorderedList>
    </template>
    <template #cta>
      <PrimaryButton @click="scrollToElementById('rsvp')">Quero Registar-me &#x25BC;</PrimaryButton>
    </template>
  </ContentSection>
</template>

<style lang="scss" scoped>
h3 {
  color: var(--color-secondary);
  margin-bottom: 1rem;
}

p {
  font-size: 1.8rem;
  color: var(--color-background);
}
</style>
