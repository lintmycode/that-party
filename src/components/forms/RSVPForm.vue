<script setup>
import { ref } from 'vue'

const attendees = ref([{name: '', isChild: false}])

const plusOne = () => {
  attendees.value.push({name: '', isChild: false})
  // console.log('attendees', attendees.value)
}
</script>

<template>
  <form>
    <div class="form-item" v-for="attendee, index in attendees" :key="index">
      <label>Nome</label>
      <input type="text" :name="'name-' + index" v-model="attendee.name">
      <label>Criança?</label>
      <input type="checkbox" :name="'is-child-' + index" v-model="attendee.isChild">
    </div>
    <button type="button" @click="plusOne">Adicionar acompanhante</button>
  </form>
</template>