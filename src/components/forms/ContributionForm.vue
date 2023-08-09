<script setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useContributionStore } from '@/stores/contributionStore.js'

const contributionStore = useContributionStore()
// const { contributions } = storeToRefs(contributionStore)

// get available contributions
const contributions = ref([]);
(async () => {
  contributions.value = await contributionStore.getAvailableContributions()
})()

// toggle visible category
const openCategories = ref([])
const toggleCategory = (index) => {
  const existingIndex = openCategories.value.indexOf(index);
  if (existingIndex === -1) {
    openCategories.value.push(index);
  } else {
    openCategories.value.splice(existingIndex, 1);
  }
}

// 
const myContribution = ref([])
const add = (catIndex, itemIndex) => {
  // remove item from array
  contributions.value[catIndex].items[itemIndex].qty--
  
  // add item to mycontribution array
  // Get the item
  const item = contributions.value[catIndex].items[itemIndex];
  const existingIndex = myContribution.value.findIndex(i => i.name === item.name)
  if (existingIndex === -1) {
    // If it doesn't exist, add it with qty 1
    myContribution.value.push({ ...item, qty: 1 });
  } else {
    // If it does exist, increment the qty
    myContribution.value[existingIndex].qty++;
  }
}
</script>

<template>

  <ul>
    <template v-for="cat, catIndex in contributions" :key="'cat-' + catIndex">
      <li v-if="cat.items.some(i => i.qty > 0)">
        <button type="button" @click="toggleCategory(catIndex)">{{ cat.name }}</button>
        <ul>
          <template v-for="item, itemIndex in cat.items" :key="'cat-' + catIndex + '-' + itemIndex">
            <li v-if="openCategories.indexOf(catIndex) > -1 && item.qty > 0">
              <button type="button" 
              @click="add(catIndex, itemIndex)">+ {{ item.name }}</button>
              ({{ item.qty }})
            </li>
          </template>
          
        </ul>

        <hr>
      </li>
    </template>
  </ul>
  <p>Vou levar {{ myContribution.map(item => item.name + ' (' + item.qty + ')' ).join(', ') }} </p>
  
</template>