<script setup>
import { ref } from 'vue'
import SectionTitle from './atoms/SectionTitle.vue';
import BigYellowButton from './ui/BigYellowButton.vue';

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
    <!-- <ul>
      <li v-for="(item, index) in nav" :key="index" :class="{ active: activeIndex === index }">
        <button @click="setActiveStep(index)" v-if="index < activeIndex">{{ item }}</button>
        <span v-else>{{ item }}</span>
      </li>
    </ul> -->

    <ul>
      <li v-for="(item, index) in nav" :key="index" :hidden="activeIndex !== index">
        <SectionTitle>{{ item.name }}</SectionTitle>
        <slot :name="'step-' + index" />
        
      </li>
    </ul>

    <nav>
      <BigYellowButton v-if="activeIndex > 0" 
        @click="setActiveStep(activeIndex - 1)">&lt; {{ nav[activeIndex - 1].nav }}</BigYellowButton>
      <BigYellowButton v-if="activeIndex < nav.length - 1" :disabled="!nav[activeIndex + 1].condition" 
        @click="setActiveStep(activeIndex + 1)">{{ nav[activeIndex + 1].nav }} &gt;</BigYellowButton>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
ul {
  li {
    &:not([hidden]) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 8rem;
    }
  }
}

nav {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-top: 6rem;
}
</style>
