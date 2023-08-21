<script setup>
import { ref } from 'vue'
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

// rm a guest
const removeAttendee = (index) => {
  attendees.value.splice(index, 1);
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
    
      <span class="age">
        <input type="radio" v-model="attendee.isChild" :value="false" :id="'adult-' + index"><label :for="'adult-' + index">Adulto</label>
        <input type="radio" v-model="attendee.isChild" :value="true" :id="'child-' + index"><label :for="'child-' + index">Criança</label>
      </span>
      <button @click.prevent="removeAttendee(index)" class="remove" title="Remover" :disabled="index === 0">&#x2715;</button>
      
    </div>
    <div class="form-item message" v-if="message" v-html="message"></div>
    <SecondaryButton @click="plusOne" class="add">+ adicionar acompanhante</SecondaryButton>
  </form>
</template>

<style lang="scss" scoped>
button {
  &.add {
    margin-top: 2rem;
  }

  &.remove {
    background-color: transparent;
    color: var(--c-red);
    border: 0;
    font-size: 2rem;
    cursor: pointer;
    padding: 0;
    flex: 0 0 1.2rem;

    &:disabled {
      visibility: hidden;
    }
  }
} 

.age {
  display: flex;
  height: 40px;

  input {
    display: none;

    &:checked {
      & + label {
        background-color: var(--color-secondary);
        color: var(--color-background);
        opacity: 1;
        font-weight: 700;
      }
    }

    & + label {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--color-text);
      padding: 0 1rem;
      color: var(--color-text-soft);
      opacity: .5;
      cursor: pointer;
      transition: 100ms all;
      text-transform: uppercase;
      font-size: 1.6rem;

      @media (max-width: 480px) {
        font-size: 1.4rem;
        padding: 0 .5rem;
      }
    }

    &:first-of-type {
      & + label {
        border-radius: .5rem 0 0 .5rem;
      }
    }
    
    &:last-of-type {
      & + label {
        border-radius: 0 .5rem .5rem 0;
        margin-left: -1px;
      }
    }
  }
}

.form-item {
  &:hover {
    .remove {
      display: block;
    }
  }

  input {
    &[type=text] {
      flex: 1 0 50%;
    }
  }
}
</style>
