<script setup>
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import { usePartyStore } from '@/stores/partyStore.js'

const partyStore = usePartyStore()
const { contributions, loading } = storeToRefs(partyStore)

// get available contributions
const categories = ref([])
onMounted(async () => {
  categories.value = await partyStore.getAvailableContributions()
})

// toggle visible category
const openCategory = ref(-1)
const toggleCategory = (index) => {
  // if its opened already close; otherwise open
  openCategory.value = openCategory.value === index ? -1 : index
}

// add an item to the contributions array
const add = (catIndex, itemIndex) => {
  categories.value[catIndex].contributions[itemIndex].qty--

  // add item to contributions array
  const item = categories.value[catIndex].contributions[itemIndex]
  const existingIndex = contributions.value.findIndex((i) => i.name === item.name)
  if (existingIndex === -1) {
    // if it doesn't exist, add it with qty 1
    contributions.value.push({ ...item, qty: 1 })
  } else {
    // else increment the qty
    contributions.value[existingIndex].qty++
  }
}

// remove an item from the contributions array
const removeItem = (item) => {
  const catIndex = categories.value.findIndex((cat) =>
    cat.contributions.some((i) => i.name === item.name)
  )
  const itemIndex = categories.value[catIndex].contributions.findIndex(
    (i) => i.name === item.name
  )

  // increment the quantity of the item in available contributions
  categories.value[catIndex].contributions[itemIndex].qty++

  // remove or decrease the quantity of the item in contributions
  const itemName = categories.value[catIndex].contributions[itemIndex].name
  const existingIndex = contributions.value.findIndex((i) => i.name === itemName)
  if (existingIndex !== -1) {
    if (contributions.value[existingIndex].qty > 1) {
      contributions.value[existingIndex].qty--
    } else {
      contributions.value.splice(existingIndex, 1)
    }
  }
}
</script>

<template>
  <template v-if="!loading">
    <ul>
      <template v-for="(cat, catIndex) in categories" :key="'cat-' + catIndex">
        <li
          v-if="cat.contributions.some((i) => i.qty > 0)"
          :class="['category', openCategory === catIndex ? 'active' : '']"
        >
          <button type="button" @click="toggleCategory(catIndex)">{{ cat.name }}</button>
          <ul v-if="openCategory === catIndex">
            <template
              v-for="(item, itemIndex) in cat.contributions"
              :key="'cat-' + catIndex + '-' + itemIndex"
            >
              <li v-if="item.qty > 0" class="item">
                <button type="button" @click="add(catIndex, itemIndex)">+ {{ item.name }}</button>
                ({{ item.qty }})
              </li>
            </template>
          </ul>
        </li>
      </template>
    </ul>
    
    <div class="my-contribution" v-if="contributions.length > 0">
      Vou levar
      <template v-for="(item, index) in contributions" :key="'item-' + index">
        <strong>
          {{ item.name }}
          {{ item.qty > 1 ? ' x' + item.qty + ' ' : ' ' }}
        </strong>
        <button type="button" @click="removeItem(item)">(remover)</button>
        <template v-if="index !== contributions.length - 1">, </template>
      </template>
    </div>
  </template>
  
  <template v-else>
    a pensar....
  </template>
</template>

<style lang="scss" scoped>
ul {
  width: 50vw;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 1200px) {
    width: 70vw;
  }

  @media (max-width: 768px) {
    width: 90vw;
  }

  .category {
    display: flex;
    width: 100%;
    gap: 1rem;

    @media (max-width: 1024px) {
      flex-direction: column;
    }

    &.active {
      & > button {
        background-color: var(--color-primary);
      }

      @media (max-width: 1024px) {
        margin-bottom: 2rem;
      }
    }

    & > button {
      flex: 0 0 40rem;
      text-align: left;
      border: 0;
      font-size: 2rem;
      padding: 1rem 2rem;
      background-color: var(--color-background-soft);
      position: relative;
      transition: 100ms all;

      @media (max-width: 1024px) {
        flex-basis: auto;
      }

      &:after {
        content: '>';
        margin-left: 1rem;
      }

      &:hover {
        background-color: var(--color-primary);
      }
    }

    ul {
      .item {
        button {
          border: 0;
          background-color: transparent;
          border-bottom: 0.3rem solid var(--color-text);
          font-size: 2rem;
          transition: 100ms all;
          cursor: pointer;

          &:hover {
            background-color: var(--color-primary);
          }

          &:active {
            background-color: var(--color-secondary);
          }
        }
      }
    }
  }
}

.my-contribution {
  font-size: 1.8rem;
  
  button {
    background-color: transparent;
    border: 0;
    color: var(--c-red);
    padding: 0;
    cursor: pointer;
  }
}
</style>
