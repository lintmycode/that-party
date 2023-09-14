<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import axios from 'axios';
import ContentSection from '../components/layout/ContentSection.vue';
import Loading from '../components/ui/Loading.vue';

const files = ref([]);
const isLoading = ref(true);
const mediaUrl = ref(import.meta.env.VITE_SERVER_URL + 'media/')
const showModal = ref(false)
const openedFile = ref('')
const index = ref(0)

onMounted(async () => {
  try {
    const { data } = await axios.get(import.meta.env.VITE_SERVER_URL + 'getFiles');
    files.value = data;
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
  }
  isLoading.value = false;
});

// modal nav
const openModal = (i) => {
  showModal.value = true
  index.value = i
  openedFile.value = files.value[index.value]
}

const closeModal = () => {
  showModal.value = false
}

const prev = () => {
  if (index.value > 0) {
    index.value--;
  }
  openedFile.value = files.value[index.value];
}

const next = () => {
  if (index.value < files.value.length - 1) {
    index.value++;
  }
  openedFile.value = files.value[index.value];
}

const handleEscapePress = (event) => {
  if (event.key === 'Escape') {
    closeModal();
  } else if (event.key === 'ArrowLeft') {
    prev()
  } else if (event.key === 'ArrowRight') {
    next()
  }
};

// lifecycle hooks to manage event listener
onMounted(() => {
  window.addEventListener('keydown', handleEscapePress);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscapePress);
});
</script>

<template>
  <ContentSection type="light">
    <Loading v-if="isLoading">A carregar...</Loading>
    <ul v-else>
      <li v-for="file, index in files" :key="file" @click="openModal(index)"> 
        <img :src="mediaUrl + file" />
      </li>
    </ul>

    <Teleport to="body">
      <div class="modal" v-if="showModal">
        <button class="close" @click="closeModal">&#x2715;</button>
        <button class="nav prev" @click="prev">&#8249;</button>
        <button class="nav next" @click="next">&#8250;</button>
        <img :src="mediaUrl + openedFile" />
      </div>
    </Teleport>
  </ContentSection>
</template>

<style lang="scss" scoped>
ul {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;

  li {
    height: 200px;
    
    img {
      cursor: pointer;
      max-width: 200px;
      height: 100%;
      object-fit: cover;
      opacity: .9;
      transition: all 100ms ease-in;
      border: 1px solid transparent;

      &:hover {
        opacity: 1;
        border-color: var(--color-secondary);
      }
    }
  }
}

.modal {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-terciary);

  button {
    position: absolute;
    width: 4rem;
    height: 4rem;
    border-radius: 2rem;
    border: 0;
    background-color: var(--color-primary);
    font-family: arial, sans-serif;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    
    &.close {
      font-size: 2rem;
      top: 2rem;
      right: 2rem;
    }

    &.nav {
      font-size: 3rem;
      top: 50%;
      transform: translateY(-50%);
      line-height: 3rem;
      padding-bottom: 4px;

      &.prev {
        left: 2rem;
      }

      &.next {
        right: 2rem;
      }
    }
  }
 

  img {
    max-width: 90vw;
    max-height: 90vh;
  }
}
</style>
