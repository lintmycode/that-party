<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { usePartyStore } from '@/stores/partyStore.js'
import { useScroll } from '@/lib/useScroll';
import StepsContent from '../components/StepsContent.vue'
import RSVPSummary from '../components/RSVPSummary.vue'
import RSVPForm from '../components/forms/RSVPForm.vue'
import ContributionForm from '../components/forms/ContributionForm.vue'
import ContactForm from '../components/forms/ContactForm.vue'
import SectionTitle from './atoms/SectionTitle.vue'
import ContentSection from './layout/ContentSection.vue'
import PrimaryButton from './ui/PrimaryButton.vue'

const { scrollToElementById } = useScroll();

const formSubmitted = ref(false)

// get party store
const partyStore = usePartyStore()
const { contributions } = storeToRefs(partyStore)

const submit = async () => {
  formSubmitted.value = await partyStore.submit()
}

// scroll up on nav
const navHappened = () => {
  scrollToElementById('rsvp')
}

// steps nav items
const nav = computed(() => [
  {
    name: 'Quem vai?',
    next: 'Quem vai?',
    prev: 'Quem vai?',
    note: 'Regista o teu nome e de quem vai contigo',
    condition: true
  },
  {
    name: 'O que vou levar',
    next: 'O que vou levar',
    prev: 'O que vou levar',
    note: 'Clica nas categorias para escolheres o que queres levar',
    condition: partyStore.attendeesOk()
  },
  {
    name: 'Contacto',
    next: contributions.value.length === 0 ? 'Não levo nada!' : 'Já chega',
    prev: 'Contacto',
    note: 'Adiciona o teu email para podermos entrar em contacto, se necessário',
    condition: true
  },
  {
    name: 'Resumo',
    next: 'Resumo',
    prev: 'Resumo',
    note: 'Obrigado! Aqui está o resumo do teu registo. Confirma e clica ENVIAR. Até já!',
    condition: partyStore.contactOk(),
    submit: true
  }
])
</script>

<template>
  
  <ContentSection type="">
    <h2>-&gt; Formulário de Registo &lt;-</h2>


    <template v-if="!formSubmitted">
      <StepsContent :nav="nav" :active-step="0" @submit="submit" @nav="navHappened">
        <template #step-0>
          <RSVPForm />
        </template>
        <template #step-1>
          <ContributionForm />
        </template>
        <template #step-2>
          <ContactForm />
        </template>
        <template #step-3>
          <RSVPSummary />
        </template>
      </StepsContent>
    </template>

    <template v-else>
      <SectionTitle>Obrigado!</SectionTitle>
      <p>* Até lá *</p>
      <PrimaryButton @click="scrollToElementById('location')">&#x25BC; Lá onde? &#x25BC;</PrimaryButton>
      
    </template>
  </ContentSection>
</template>

<style lang="scss" scoped>
h2 {
  text-transform: uppercase;
  letter-spacing: 0.3rem;
  font-family: AnonymousPro;
  font-size: 2.3rem;
  color: var(--color-text);
  padding: 0 1rem;
}

p {
  font-size: 2.4rem;
}
</style>