<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { usePartyStore } from '@/stores/partyStore.js'
import SecondaryButton from '../ui/SecondaryButton.vue';

const partyStore = usePartyStore()
const { attendees } = storeToRefs(partyStore)

// add a guest if the guest array is ok
const message = ref('')
const plusOne = () => {
  if (partyStore.attendeesOk()) {
    attendees.value.push({ name: '', isChild: false })
    setTimeout(() => {
      focusLastName()
    }, 50)
  } else {
    message.value = 'Ops, faltam nomes!'
    document.getElementsByName('name-' + (attendees.value.length - 1))[0].classList.add('error')
  }
}

// rm error if name is valid
const nameEdited = (e) => {
  if (e.target.value.trim().length > 0) {
    message.value = ''
    e.target.classList.remove('error')
  }
}

// autofocus name input
const focusLastName = () => {
  document.getElementsByName('name-' + (attendees.value.length - 1))[0].focus()
}

onMounted(() => {
  focusLastName()
})
</script>

<template>
  <form>
    <div class="form-item" v-for="(attendee, index) in attendees" :key="index">
      <input
        type="text"
        :name="'name-' + index"
        v-model="attendee.name"
        placeholder="Nome *"
        @keyup="nameEdited"
      />
      <template v-if="index > 0">
        <label>Criança?</label>
        <input type="checkbox" :name="'is-child-' + index" v-model="attendee.isChild" />
      </template>
    </div>
    <div class="form-item message" v-if="message" v-html="message"></div>
    <SecondaryButton @click="plusOne">+ acompanhante</SecondaryButton>
  </form>
</template>

<style lang="scss" scoped>
button {
  margin: 2rem 0 0 auto;
}
</style>
