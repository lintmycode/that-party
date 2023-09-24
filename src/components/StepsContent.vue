<script setup>
import { ref } from 'vue'
import SectionTitle from './atoms/SectionTitle.vue'
import PrimaryButton from './ui/PrimaryButton.vue'

const props = defineProps({
  nav: Array,
  activeStep: {
    type: Number,
    default: 0
  }
})

const activeIndex = ref(props.activeStep)
const setActiveStep = (index) => {
  activeIndex.value = index
  emit('nav')
}

// submit
const emit = defineEmits(['submit', 'nav'])
const submit = () => {
  emit('submit')
}
</script>

<template>
  <section>
    <ul>
      <li v-for="(item, index) in nav" :key="index">
        <template v-if="activeIndex === index">
          <SectionTitle>{{ item.name }}</SectionTitle>
          <p v-if="item.note" class="note">{{ item.note }}</p>
          <slot :name="'step-' + index" />
        </template>
      </li>
    </ul>

    <nav>
      <PrimaryButton v-if="activeIndex > 0" @click="setActiveStep(activeIndex - 1)" class="prev"
        >&lt; {{ nav[activeIndex - 1].prev }}</PrimaryButton
      >
      <PrimaryButton
        v-if="activeIndex < nav.length - 1"
        :disabled="!nav[activeIndex + 1].condition"
        @click="setActiveStep(activeIndex + 1)"
        >{{ nav[activeIndex + 1].next }} &gt;</PrimaryButton
      >
      <PrimaryButton v-if="nav[activeIndex].submit" @click="submit">Enviar &gt;</PrimaryButton>
    </nav>
  </section>
</template>

<style lang="scss" scoped>
section {
  width: 80vw;
  max-width: 70rem;

  @media (max-width: 768px) {
    width: 90vw;
    max-width: 100vw;
  }

  ul {
    width: 100%;

    li {
      &:not([hidden]) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
      }

      h2 {
        font-size: 6rem;
        text-transform: uppercase;
        font-family: 'AnonymousPro';
        font-weight: 600;
        letter-spacing: 0.6rem;

        @media (max-width: 480px) {
          font-size: 4rem;
          letter-spacing: 0;
        }
      }

      .note {
        font-size: 1.8rem;
        line-height: 1.2;
        display: inline-block;
        font-weight: 700;
        letter-spacing: 0.2rem;
        text-transform: uppercase;
        margin-top: 2rem;
        margin-bottom: 4rem;
      }
    }
  }

  nav {
    display: flex;
    gap: 2rem;
    justify-content: center;
    margin-top: 6rem;

    @media (max-width: 600px) {
      gap: 1rem;
    }

    @media (max-width: 480px) {
      flex-direction: column;
    }

    button {
      flex: 1 1 0;
      max-width: 34rem;
      padding-left: 2rem;
      padding-right: 2rem;

      @media (max-width: 480px) {
        max-width: 100%;
      }

      &.prev {
        background-color: #fff;
        color: var(--color-secondary);
      }
    }
  }
}
</style>
