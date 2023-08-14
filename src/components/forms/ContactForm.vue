<script setup>
import { storeToRefs } from 'pinia'
import { usePartyStore } from '@/stores/partyStore.js'

const partyStore = usePartyStore()
const { contact } = storeToRefs(partyStore)
</script>

<template>
  <form>
    <div class="form-item v-flex">
      <label for="email"
        >Deixa-nos o teu email para que possamos comunicar qualquer alteração.</label
      >
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email *"
        required
        v-model="contact.email"
      />
    </div>
    <div class="form-item v-flex">
      <label for="message">Se quiseres podes também deixar-nos uma mensagem.</label>
      <textarea
        name="message"
        id="message"
        rows="10"
        placeholder="Mensagem"
        v-model="contact.message"
      />
    </div>
  </form>
</template>

<style lang="scss" scoped>
.form-item {
  input,
  textarea {
    width: 100%;
  }
}
</style>
