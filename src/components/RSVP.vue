<script setup>
import { ref } from 'vue'
import StepsContent from '../components/StepsContent.vue'
import RSVPForm from '../components/forms/RSVPForm.vue';
import ContributionForm from '../components/forms/ContributionForm.vue';

const showForm = ref(false)

const openForm = () => {
  showForm.value = true
}

</script>

<template>
<section>
  <h2>RSVP</h2>
  <!-- <template v-if="showForm"> -->
    <h2>Fixe :)</h2>

    <StepsContent :nav="['Quem Vai', 'O Que Vou Levar']" :active-step="1">
      <template #step-0>
        <RSVPForm />
      </template>

      <template #step-1>
        <ContributionForm />  
      </template>
    </StepsContent>

  <!-- </template>
  
  <template v-else>
    <button type="button" @click="openForm">Marcar Presença!</button>
  </template> -->
</section>
</template>
