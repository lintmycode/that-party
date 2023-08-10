<script setup>
import { ref, onMounted, watch } from 'vue'
import SecondaryButton from '../ui/SecondaryButton.vue';

const attendees = ref([{name: '', isChild: false}])
const message = ref("")
const plusOne = () => {
  const lastIndex = attendees.value.length - 1
  if (attendees.value[lastIndex].name.trim().length === 0) {
    message.value = "Falta o nome do último acompanhante"
    document.getElementsByName('name-' + lastIndex)[0].classList.add('error')
    return false
  }

  attendees.value.push({name: '', isChild: false})
  setTimeout(() => {
    focusLastName()
  }, 50)
  // console.log('attendees', attendees.value)
}

//
const nameEdited = (e) => {
  if (e.target.value.trim().length > 0) {
    message.value = ""
    e.target.classList.remove("error")
  }
}

// 
const emit = defineEmits(['formOK']);
watch(attendees, () => {
  const allFilled = attendees.value.every(att => att.name.trim() !== '');
  console.log(allFilled)
  emit('formOK', allFilled);
}, { deep: true });

//
onMounted(() => {
  // focusLastName()
})

const focusLastName = () => {
  console.log()
  document.getElementsByName("name-" + (attendees.value.length - 1))[0].focus()
}
</script>

<template>
  <!-- <p>Adiciona o nome de todos os que vão contigo</p> -->
  <form>
    <div class="form-item" v-for="attendee, index in attendees" :key="index">
      <!-- <label>Nome</label> -->
      <input type="text" :name="'name-' + index" v-model="attendee.name" placeholder="Nome" @keyup="nameEdited">
      <label>Criança?</label>
      <input type="checkbox" :name="'is-child-' + index" v-model="attendee.isChild">
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