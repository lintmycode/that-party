<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { usePartyStore } from '@/stores/partyStore.js'
import StepsContent from '../components/StepsContent.vue'
import RSVPSummary from '../components/RSVPSummary.vue'
import RSVPForm from '../components/forms/RSVPForm.vue';
import ContributionForm from '../components/forms/ContributionForm.vue';
import ContactForm from '../components/forms/ContactForm.vue';
import SectionTitle from './atoms/SectionTitle.vue';
import ContentSection from './layout/ContentSection.vue';
import BigYellowButton from './ui/BigYellowButton.vue';

// open form to start registration process
const showForm = ref(false)
const openForm = () => {
  showForm.value = true
}

// get party store
const partyStore = usePartyStore()
const { contributions } = storeToRefs(partyStore)

// steps nav items
const nav = computed(() => ([
  {
    name: 'Quem Vai?',
    nav: 'Quem Vai?',
    condition: true,
  }, 
  {
    name: 'O Que Vou Levar',
    nav: 'O Que Vou Levar',
    condition: partyStore.attendeesOk()
  },
  {
    name: 'Contacto',
    nav: contributions.value.length === 0 ? 'Nada!' : 'Já chega',
    condition: true
  },
  {
    name: 'Resumo',
    nav: 'Resumo',
    condition: partyStore.contactOk()
  },
]))
</script>

<template>
<ContentSection>
  
  <template v-if="showForm">
    <StepsContent :nav="nav" :active-step="0">
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
    <SectionTitle>RSVP</SectionTitle>
    <BigYellowButton @click="openForm">Marcar Presença!</BigYellowButton>
  </template>
</ContentSection>
</template>
