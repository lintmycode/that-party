<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { usePartyStore } from '@/stores/partyStore.js'
import { useScroll } from '@/lib/useScroll'
import StepsContent from '../components/StepsContent.vue'
import RSVPSummary from '../components/RSVPSummary.vue'
import RSVPForm from '../components/forms/RSVPForm.vue'
import ContributionForm from '../components/forms/ContributionForm.vue'
import ContactForm from '../components/forms/ContactForm.vue'
import ContentSection from './layout/ContentSection.vue'
import PrimaryButton from './ui/PrimaryButton.vue'

const formOpen = ref(import.meta.env.VITE_FORM_OPEN === 'true' ? true : false)

const { scrollToElementById } = useScroll()

const formSubmitted = ref(false)
const contentSectionType = ref('')

// get party store
const partyStore = usePartyStore()
const { contributions } = storeToRefs(partyStore)

const submit = async () => {
  formSubmitted.value = await partyStore.submit()
  if (formSubmitted.value) {
    contentSectionType.value = 'light'
    scrollToElementById('rsvp', { behavior: 'instant' })
  }
}

// scroll up on nav
const navHappened = () => {
  scrollToElementById('rsvp', { behavior: 'instant' })
}

// steps nav items
const nav = computed(() => [
  {
    name: 'Quem vai?',
    next: 'Voltar a Quem Vai',
    prev: 'Voltar a quem vai',
    note: 'Regista o teu nome e de quem vai contigo',
    condition: true
  },
  {
    name: 'O que vou levar',
    next: 'Avançar',
    prev: 'Voltar a contributos',
    note: 'Escolhe o que queres levar',
    condition: partyStore.attendeesOk()
  },
  {
    name: 'Está quase...',
    // next: contributions.value.length === 0 ? 'Não levo nada!' : 'Já chega',
    next: 'Avançar',
    prev: 'Voltar',
    note: 'Adiciona o teu email',
    condition: true
  },
  {
    name: 'Resumo',
    next: 'Avançar',
    prev: 'Resumo',
    note: 'Obrigado! Aqui está o resumo do teu registo. Confirma e clica ENVIAR.',
    condition: partyStore.contactOk(),
    submit: true
  }
])
</script>

<template>
  <ContentSection :type="contentSectionType" v-if="formOpen">
    <template v-if="!formSubmitted">
      <h2>-&gt; Formulário de Registo &lt;-</h2>
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
      <h2>-&gt; Obrigado &lt;-</h2>
      <p>* Até já! Vêmo-nos n'AQUELA FESTA! *</p>
      <PrimaryButton @click="scrollToElementById('location')"> Mapa &#x25BC;</PrimaryButton>
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
