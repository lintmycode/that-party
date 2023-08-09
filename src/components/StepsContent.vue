<script setup>
import { ref } from 'vue'

const props = defineProps({
  nav: Array,
  activeStep: {
    type: Number,
    default: 0
  }
})
const activeIndex = ref(props.activeStep)

const setActiveStep = (index) => {
  console.log(index)
  activeIndex.value = index
}
</script>

<template>
  <div>
    <ul>
      <li v-for="(item, index) in nav" :key="index" :class="{ active: activeIndex === index }">
        <button @click="setActiveStep(index)" v-if="index < activeIndex">{{ item }}</button>
        <span v-else>{{ item }}</span>
      </li>
    </ul>

    <ul>
      <li v-for="(item, index) in nav" :key="index" :hidden="activeIndex !== index">
        <slot :name="'step-' + index" />
        
        <button type="button" v-if="activeIndex > 0" 
          @click="setActiveStep(activeIndex - 1)">Voltar</button>
          <button type="button" v-if="activeIndex < nav.length - 1" 
          @click="setActiveStep(activeIndex + 1)">Avançar</button>
      </li>
    </ul>
  </div>
</template>

<style>
</style>
