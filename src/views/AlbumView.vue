<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import Hammer from 'hammerjs';
import axios from 'axios'
import ContentSection from '../components/layout/ContentSection.vue'
import Loading from '../components/ui/Loading.vue'
import Modal from '../components/ui/Modal.vue'
import Gallery from '../components/ui/Gallery.vue'
import PrimaryButton from '../components/ui/PrimaryButton.vue'

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

const isLoading = ref(true)
const showModal = ref(false)
const openedFile = ref('')
const index = ref(0)
const loadingMedia = ref(false)
let hammerManager = null;
let mediaUrl = import.meta.env.VITE_SERVER_URL + 'media/'

// route parameters
const route = useRoute()

const files = ref([])
const limit = 30
const page = ref(parseInt(route.params.page) || 1)
let totalPages = 0
let totalFiles = 0

// lifecycle hooks to manage event listener
onMounted(async () => {
  try {
    // load filenames
    for (let i = 1; i <= page.value; i++) {
      await loadMedia(i)
    }

    // open image in modal?
    if (route.params.filename) {
      openModal(
        files.value.find(
          (f) => f.filename.split('.').slice(0, -1).join('.') === route.params.filename
        )
      )
    }
    
    // preload
    await (async (filenames) => {
      const promises = filenames.map(filename => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = mediaUrl + filename;
          img.onload = resolve;
          img.onerror = reject;
        });
      });
      return Promise.all(promises);
    })(files.value.slice(0, limit).map(f => f.filename))
  
  } catch (error) {
    console.error('An error occurred while fetching data:', error)
  }
  window.addEventListener('keydown', handleEscapePress)
  window.addEventListener('scroll', handleScroll)
  isLoading.value = false
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscapePress)
  window.removeEventListener('scroll', handleScroll)
})

// load media
const loadMedia = async (currentPage) => {
  const reqFilename = route.params.filename ? '&filename=' + route.params.filename : ''
  const { data } = await axios.get(
    import.meta.env.VITE_SERVER_URL +
      'get-files?page=' +
      currentPage +
      '&limit=' +
      limit +
      reqFilename
  )
  files.value = [].concat(files.value, data.files)
  totalPages = data.totalPages
  totalFiles = data.totalFiles

  // Update URL without navigating
  // router.replace('/album/' + page.value);
  history.pushState({}, '', '/album/' + currentPage)
}

// lazy load on scroll
async function handleScroll() {
  const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 1

  if (nearBottom && page.value < totalPages && !loadMedia.value) {
    // load next page
    loadingMedia.value = true
    page.value++
    await loadMedia(page.value)
    setTimeout(() => {
      loadingMedia.value = false
    }, 100)
  }
}

// modal nav
const openModal = (file) => {
  showModal.value = true
  // index.value = i
  index.value = files.value.indexOf(files.value.find((f) => f.filename === file.filename))
  // openedFile.value = files.value[index.value]
  openedFile.value = file
  // remove extension and push to the url
  pushToUrl(openedFile.value)
}

// add to url
const pushToUrl = (file) => {
  const filename = file.filename.split('.').slice(0, -1).join('.')
  history.pushState({}, '', '/album/' + page.value + '/' + filename)
}

const closeModal = () => {
  showModal.value = false
  history.pushState({}, '', '/album/' + page.value)
}

const prev = () => {
  if (index.value > 0) {
    index.value--
  }
  openedFile.value = files.value[index.value]
  pushToUrl(openedFile.value)
}

const next = async () => {
  if (index.value < files.value.length - 1) {
    index.value++
  } else if (index.value < totalFiles - 1) {
    page.value++
    await loadMedia(page.value)
    index.value++
  }
  openedFile.value = files.value[index.value]
  pushToUrl(openedFile.value)
}

const handleEscapePress = (event) => {
  if (event.key === 'Escape') {
    closeModal()
  } else if (event.key === 'ArrowLeft') {
    prev()
  } else if (event.key === 'ArrowRight') {
    next()
  }
}

// touch events
watch(() => showModal.value, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
    nextTick(() => {
      hammerManager = new Hammer(document.getElementById('touch-target'), {
        touchAction: 'auto',
      });
      // hammerManager.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });
      hammerManager.on('swipeleft', () => { next() })
      hammerManager.on('swiperight', () => { prev() })
    })
  } else {
    document.body.style.overflow = ''
    if (hammerManager) {
      hammerManager.destroy();
      hammerManager = null;
    }
  }
});

const manualLoad = () => {
  page.value++
  loadMedia(page.value)
}
</script>

<template>
  <ContentSection type="dark">
    <Loading v-if="isLoading">A carregar...</Loading>
    <Gallery v-else>
      <li
        v-for="file in files"
        :key="file"
        @click="openModal(file)"
        :style="'background-image: url(' + mediaUrl + file.filename + ')'"
      >
        <img :src="mediaUrl + file.filename" />
      </li>
    </Gallery>
    <PrimaryButton v-if="page < totalPages" @click="manualLoad">Carregar mais</PrimaryButton>
  </ContentSection>

  <Modal v-if="showModal" @close="closeModal">
    <div id="touch-target" class="touch-target">
      <button class="nav prev" @click="prev" :disabled="index === 0">&#8249;</button>
      <button class="nav next" @click="next" :disabled="index === totalFiles - 1">&#8250;</button>
      <transition name="fade">
        <img :src="mediaUrl + openedFile.filename" :key="openedFile.filename" />
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

      @media (max-width: 760px) {
        top: auto;
        bottom: 2rem;
      }

      &:disabled {
        pointer-events: none;
        opacity: 0.5;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 100ms ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
