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
    name: 'Quem Vai?',
    next: 'Quem Vai?',
    prev: 'Quem Vai?',
    condition: true
  },
  {
    name: 'O Que Vou Levar',
    next: 'O Que Vou Levar',
    prev: 'O Que Vou Levar',
    condition: partyStore.attendeesOk()
  },
  {
    name: 'Contacto',
    next: contributions.value.length === 0 ? 'Nada!' : 'Já chega',
    prev: 'Contacto',
    condition: true
  },
  {
    name: 'Resumo',
    next: 'Resumo',
    prev: 'Resumo',
    condition: partyStore.contactOk(),
    submit: true
  }
])
</script>

<template>
  <ContentSection>

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
p {
  font-size: 2.4rem;
}
</style>