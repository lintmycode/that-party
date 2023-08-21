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
const openCategory = ref(-1)
const toggleCategory = (index) => {
  openCategory.value = openCategory.value === index ? -1 : index
}

//
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

// add an item to the contributions array
// const add = (catIndex, itemIndex) => {
//   categories.value[catIndex].contributions[itemIndex].availableQty--

//   // add item to contributions array
//   const item = categories.value[catIndex].contributions[itemIndex]
//   const existingIndex = contributions.value.findIndex((i) => i.name === item.name)
//   if (existingIndex === -1) {
//     // if it doesn't exist, add it with qty 1
//     contributions.value.push({ ...item, qty: 1 })
//   } else {
//     // else increment the qty
//     contributions.value[existingIndex].qty++
//   }
// }

// remove an item from the contributions array
// const removeItem = (item) => {
//   const catIndex = categories.value.findIndex((cat) =>
//     cat.contributions.some((i) => i.name === item.name)
//   )
//   const itemIndex = categories.value[catIndex].contributions.findIndex(
//     (i) => i.name === item.name
//   )

//   // increment the quantity of the item in available contributions
//   categories.value[catIndex].contributions[itemIndex].availableQty++

//   // remove or decrease the quantity of the item in contributions
//   const itemName = categories.value[catIndex].contributions[itemIndex].name
//   const existingIndex = contributions.value.findIndex((i) => i.name === itemName)
//   if (existingIndex !== -1) {
//     if (contributions.value[existingIndex].qty > 1) {
//       contributions.value[existingIndex].qty--
//     } else {
//       contributions.value.splice(existingIndex, 1)
//     }
//   }
// }
</script>

<template>
  <template v-if="!loading">
    <!-- <div class="my-contribution">
      <template v-if="contributions.length > 0">        
        *** Vou levar
        <template v-for="(item, index) in contributions" :key="'item-' + index">
          <strong>
            {{ item.name }}
            {{ item.qty > 1 ? ' x' + item.qty + ' ' : ' ' }}
          </strong>
          <button type="button" @click="removeItem(item)">(cancelar)</button>
          <template v-if="index !== contributions.length - 1">, </template>
        </template>
      </template>
    </div> -->

    
    <ul class="categories">
      <template v-for="(cat, catIndex) in categories" :key="'cat-' + catIndex">
        <!-- <li
          v-if="cat.contributions.some((i) => i.availableQty > 0)"
          :class="['category', openCategory === catIndex ? 'active' : '']"
        > -->
          <!-- <button type="button" @click="toggleCategory(catIndex)">{{ cat.name }}</button> -->
          <!-- <ul v-if="openCategory === catIndex"> -->
        
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
                <!-- <button type="button" @click="add(catIndex, itemIndex)">+ {{ item.name }}</button> -->
                <!-- <span class="qty">({{ item.availableQty }} disponíveis)</span> -->
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
    // width: 100rem;
    // left: -15rem;

    //@media (max-width: 1024px) {
      width: 100%;
      left: 0;
    //}
  }

  .category {
    display: flex;
    width: 100%;
    gap: 1rem;

    //@media (max-width: 1024px) {
      flex-direction: column;
    //}

    &.active {
      & > button {
        background-color: var(--color-primary);
      }

      //@media (max-width: 1024px) {
        //margin-bottom: 2rem;
      //}
    }

    /*
    & > button {
      flex: 0 0 50%;
      text-align: left;
      border: 0;
      font-size: 2rem;
      padding: 1rem 2rem;
      background-color: var(--color-background);
      color: var(--color-text);
      position: relative;
      transition: 100ms all;
      cursor: pointer;
      font-weight: 700;

      //@media (max-width: 1024px) {
        flex-basis: auto;
      //}

      &:after {
        content: '>';
        margin-left: 1rem;
      }

      &:hover {
        background-color: var(--color-primary);
      }
    }
    */

    h3 {
      font-size: 2rem;
      padding: 1rem 2rem;
      background-color: var(--color-primary);
      color: var(--color-text);
      font-weight: 700;
    }

    ul {
      margin: 0 1rem;
      .item {
        /*
        &:hover {
          .qty {
            display: inline;
            margin-left: 1rem;
            
            @media (max-width: 480px) {
              display: block;
              margin-left: 0;
            }
          }
        }
        */

        /*
        button {
          border: 0;
          background-color: transparent;
          border-bottom: 0.3rem solid var(--color-text);
          font-size: 2rem;
          transition: 100ms all;
          cursor: pointer;
          text-align: left;
          color: var(--color-text);

          &:hover {
            background-color: var(--color-primary);
          }

          &:active {
            background-color: var(--color-secondary);
          }
        }

        .qty {
          display: none;
        }
        */
      }
    }
  }
}

.my-contribution {
  font-size: 1.8rem;
  min-height: 3rem;
  margin-top: -4rem;
  margin-bottom: 3rem;
  /*
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background-color: var(--color-background);
  */

  button {
    background-color: transparent;
    border: 0;
    color: var(--c-red);
    padding: 0;
    cursor: pointer;
  }
}
</style>
