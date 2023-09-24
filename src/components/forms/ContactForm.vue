<script setup>
import { storeToRefs } from 'pinia'
import { usePartyStore } from '@/stores/partyStore.js'

const partyStore = usePartyStore()
const { contact } = storeToRefs(partyStore)
</script>

<template>
  <form>
    <div class="form-item v-flex">
      <label for="email">Email</label>
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
      <label for="message">Mensagem (opcional)</label>
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
  align-items: start;
}
</style>
