<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import ContentSection from '../components/layout/ContentSection.vue';
import Loading from '../components/ui/Loading.vue';
import Modal from '../components/ui/Modal.vue';
import Gallery from '../components/ui/Gallery.vue';

defineProps({
  page: {
    type: [String, Number],
    default: 1
  },
  filename: {
    type: String,
    default: ''
  }
})

const isLoading = ref(true);
const mediaUrl = ref(import.meta.env.VITE_SERVER_URL + 'media/')
const showModal = ref(false)
const openedFile = ref('')
const index = ref(0)
const loadingMedia = ref(false)

// route parameters
const route = useRoute();

const files = ref([])
const limit = 30;
let page = parseInt(route.params.page) || 1;
let totalPages = 0
let totalFiles = 0

// lifecycle hooks to manage event listener
onMounted(async () => {
  try {
    for (let i = 1; i <= page; i++) {
      await loadMedia(i)
    }
    if (route.params.filename) {      
      openModal(files.value.find(f => f.filename.split('.').slice(0, -1).join('.') === route.params.filename))
    }
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
  }
  window.addEventListener('keydown', handleEscapePress);
  window.addEventListener('scroll', handleScroll);
  isLoading.value = false;
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscapePress);
  window.removeEventListener('scroll', handleScroll);
});

// load media
const loadMedia = async (currentPage) => {
  const reqFilename = route.params.filename ? '&filename=' + route.params.filename : ''
  const { data } = await axios.get(
    import.meta.env.VITE_SERVER_URL + 'get-files?page=' + currentPage + '&limit=' + limit + reqFilename)
  files.value = [].concat(files.value, data.files)
  totalPages = data.totalPages
  totalFiles = data.totalFiles

  // Update URL without navigating
  // router.replace('/album/' + page.value);
  history.pushState({}, '', '/album/' + currentPage)
}

// lazy load on scroll
async function handleScroll() {
  const nearBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1;
  
  if (nearBottom && page < totalPages && !loadMedia.value) {
    // load next page
    loadingMedia.value = true
    page++;
    await loadMedia(page)
    setTimeout(() => {
      loadingMedia.value = false
    }, 100)
  }
}

// modal nav
const openModal = (file) => {
  showModal.value = true
  // index.value = i
  index.value = files.value.indexOf(files.value.find(f => f.filename === file.filename))
  // openedFile.value = files.value[index.value]
  openedFile.value = file
  // remove extension and push to the url
  pushToUrl(openedFile.value)
}

// add to url
const pushToUrl = (file) => {
  const filename = file.filename.split('.').slice(0, -1).join('.')
  history.pushState({}, '', '/album/' + page + '/' + filename)
}

const closeModal = () => {
  showModal.value = false
  history.pushState({}, '', '/album/' + page);
}

const prev = () => {
  if (index.value > 0) {
    index.value--;
  }
  openedFile.value = files.value[index.value];
  pushToUrl(openedFile.value)
}

const next = async () => {
  if (index.value < files.value.length - 1) {
    index.value++;
  } 
  else if (index.value < totalFiles - 1) {
    page++;
    await loadMedia(page)
    index.value++;
  }
  openedFile.value = files.value[index.value];
  pushToUrl(openedFile.value)
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

// touch events
const startX = ref(0);
const endX = ref(0);

const handleTouchStart = (event) => {
  startX.value = event.touches[0].clientX;
};

const handleTouchMove = (event) => {
  endX.value = event.touches[0].clientX;
};

const handleTouchEnd = () => {
  const diffX = endX.value - startX.value;
  // threshold of 50 pixels for the slide to be considered a navigation gesture
  if (diffX > 50) {
    prev();
  } else if (diffX < -50) {
    next();
  }
};
</script>

<template>
  <ContentSection type="dark">
    <Loading v-if="isLoading">A carregar...</Loading>
    <Gallery v-else>
      <li v-for="file, index in files" :key="file" @click="openModal(file)" 
        :style="'background-image: url(' + mediaUrl + file.filename + ')'"> 
        <img :src="mediaUrl + file.filename">
      </li>
    </Gallery>
  </ContentSection>

  <Modal v-if="showModal" @close="closeModal">
    <div class="touch-target"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd">
      <button class="nav prev" @click="prev" :disabled="index === 0">&#8249;</button>
      <button class="nav next" @click="next" :disabled="index === totalFiles - 1">&#8250;</button>
      <transition name="fade">
        <img :src="mediaUrl + openedFile.filename" :key="openedFile.filename">
      </transition>
    </div>
  </Modal>
</template>

<style lang="scss" scoped>
.content-section {
  padding: 2rem;
}

.modal {
  .touch-target {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  
  button {
    &.nav {
      font-size: 3rem;
      top: 50%;
      transform: translateY(-50%);
      line-height: 3rem;
      padding-bottom: 4px;
      z-index: 1;
      width: 4rem;

      @media (max-width: 760px) {
        top: auto;
        bottom: 2rem;
      } 

      &:disabled {
        pointer-events: none;
        opacity: .5;
      }

      &.prev {
        left: 2rem;
      }

      &.next {
        right: 2rem;
      }
    }
  }

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: contain;
    z-index: 0;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 100ms ease-in-out;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
