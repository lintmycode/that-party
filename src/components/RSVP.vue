<script setup>
import { ref, computed } from 'vue'
import StepsContent from '../components/StepsContent.vue'
import RSVPForm from '../components/forms/RSVPForm.vue';
import ContributionForm from '../components/forms/ContributionForm.vue';
import SectionTitle from './atoms/SectionTitle.vue';
import ContentSection from './layout/ContentSection.vue';
import BigYellowButton from './ui/BigYellowButton.vue';

const showForm = ref(false)

const openForm = () => {
  showForm.value = true
}

//
const canProceed = ref(false)
const formStatusChanged = (ok) => {
  canProceed.value = ok
}

//
const nav = computed(() => ([
  {
    name: 'Quem Vai?',
    condition: true,
  }, 
  {
    name: 'O Que Vou Levar',
    condition: canProceed.value
  }
]))
</script>

<template>
<ContentSection>
  
  <template v-if="showForm">
    <StepsContent :nav="nav" :active-step="0">
      <template #step-0>
        <RSVPForm @formOK="formStatusChanged"/>
      </template>

      <template #step-1>
        <ContributionForm />  
      </template>
    </StepsContent>
  </template>
  
  <template v-else>
    <SectionTitle>RSVP</SectionTitle>
    <BigYellowButton @click="openForm">Marcar Presença!</BigYellowButton>
  </template>
</ContentSection>
</template>
