<script setup>
import { useSlots } from 'vue'
const slots = useSlots()

defineProps({
  type: {
    type: String, 
  }
})
</script>

<template>
  <section :class="['content-section', type]">
    <slot />
    <div class="content" v-if="slots.content">
      <slot name="content" />
    </div>
    <div class="cta" v-if="slots.cta">
      <slot name="cta" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/mixins/padding.scss';
.content-section {
  @include padding-section;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8rem;
  background-color: var(--color-background-soft);

  @media (max-width: 1200px) {
    gap: 6rem;
  }

  & + .content-section {
    border-top: 1px dashed var(--color-secondary);
  }

  &.light {
    background-color: var(--color-primary);
  }

  &.dark {
    background-color: var(--c-terciary);
    color: var(--color-primary);

    :slotted(p) {
      footer {
        color: var(--color-secondary);
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 4rem;
    position: relative;
    max-width: 110rem;

    @media (max-width: 1300px) {
      max-width: 80vw;
    }

    &:before {
      content: '';
      position: absolute;
      top: -4rem;
      bottom: -3rem;
      left: -5rem;
      width: 2px;
      background-color: var(--color-secondary);

      @media (max-width: 800px) {
        left: -3rem;
      }     
    }

    :slotted(p) {
      font-size: 2.2rem;

      @media (max-width: 768px) {
        font-size: 2rem;
      }
      
      strong {
        font-weight: 700;
      }
      
      footer {
        font-size: 1.6rem;
        line-height: 1.2;
        display: inline-block;
        font-weight: 700;
        letter-spacing: .2rem;
      } 
    }
  }

  .cta {
    display: flex;
    gap: 2rem;
    justify-content: center;
    max-width: 110rem;

    @media (max-width: 480px) {
      max-width: 100%;
      width: 100%;
      flex-direction: column;
    }
  }
}
</style>
