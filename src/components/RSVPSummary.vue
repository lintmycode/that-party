<script setup>
import { storeToRefs } from 'pinia'
import { usePartyStore } from '@/stores/partyStore.js'

const partyStore = usePartyStore()
const { attendees, contributions, contact } = storeToRefs(partyStore)
</script>

<template>
  <div>
    <h3>Quem Vai</h3>
    <ul>
      <li v-for="(attendee, index) in attendees" :key="'attendee-' + index">
        {{ attendee.name + (attendee.isChild ? ' (criança)' : '') }}
      </li>
    </ul>

    <h3>Vou levar</h3>
    <ul>
      <li v-for="(contribution, index) in contributions" :key="'contribution-' + index">
        {{ contribution.name + ' (' + contribution.qty + ')' }}
      </li>
    </ul>

    <h3>Contacto</h3>
    <p>{{ contact.email }}</p>
    <p>{{ contact.message }}</p>
  </div>
</template>

<style lang="scss" scoped>
h3 {
  font-weight: 700;
  font-size: 3rem;
}

ul {
  list-style: disc inside;

  + h3 {
    margin-top: 2rem;
  }
}

li,
p {
  font-size: 2rem;
}
</style>
