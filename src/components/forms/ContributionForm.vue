<script setup>
import { storeToRefs } from 'pinia'
import { ref, onMounted, watch } from 'vue'
import { usePartyStore } from '@/stores/partyStore.js'
import Loading from '../ui/Loading.vue';

const partyStore = usePartyStore()
const { contributions, loading } = storeToRefs(partyStore)

// get available contributions by category
const categories = ref([])
const myContributions = ref([])
onMounted(async () => {
  categories.value = await partyStore.getAvailableContributions()
  myContributions.value = contributions.value.map(c => c.id)
})

// toggle visible category
// const openCategory = ref(-1)
// const toggleCategory = (index) => {
//   openCategory.value = openCategory.value === index ? -1 : index
// }

// move local contributions to store
watch(myContributions, (val) => {
  contributions.value = []
  val.forEach(c => {
    categories.value.forEach(cat => {
      cat.contributions.forEach(contrib => {
        if (c === contrib.id) {
          contributions.value.push({...contrib, qty: 1})
        }
      })
    })
  })
});
</script>

<template>
  <template v-if="!loading">    
    <ul class="categories">
      <template v-for="(cat, catIndex) in categories" :key="'cat-' + catIndex">
        <li class="category">
          <h3>{{ cat.name }}</h3>
          <ul>
            <template
              v-for="(item, itemIndex) in cat.contributions"
              :key="'cat-' + catIndex + '-' + itemIndex"
            >
              <li v-if="item.availableQty > 0" class="item form-item">
                <input type="checkbox" name="" :value="item.id" v-model="myContributions" :id="'check-' + item.id">
                <label :for="'check-' + item.id">{{ item.name }}</label>
              </li>
            </template>
          </ul>
        </li>
      </template>
    </ul>
    
  </template>
  
  <template v-else>
    <Loading>a pensar...</Loading>
  </template>
</template>

<style lang="scss" scoped>
ul {
  display: flex;
  flex-direction: column;
  
  &.categories {
    gap: 2rem;
    width: 100%;
    left: 0;
  }

  .category {
    display: flex;
    width: 100%;
    gap: 1rem;
    flex-direction: column;

    &.active {
      & > button {
        background-color: var(--color-primary);
      }
    }

    h3 {
      font-size: 2rem;
      padding: 1rem 2rem;
      background-color: var(--color-primary);
      color: var(--color-text);
      font-weight: 700;
    }

    ul {
      margin: 0 1rem;
    }
  }
}

.my-contribution {
  font-size: 1.8rem;
  min-height: 3rem;
  margin-top: -4rem;
  margin-bottom: 3rem;

  button {
    background-color: transparent;
    border: 0;
    color: var(--c-red);
    padding: 0;
    cursor: pointer;
  }
}
</style>
