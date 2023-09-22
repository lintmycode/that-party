<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import PrimaryButton from './PrimaryButton.vue';
import SectionTitle from '../atoms/SectionTitle.vue';
import emailjs from '@emailjs/browser';
import Loading from './Loading.vue';
import Gallery from './Gallery.vue';

const email = ref("");
const emailRef = ref("");
const message = ref("")
const status = ref("")
const files = ref([]);
const uploaded = ref(false)
const loading = ref(false)

const handleFiles = (event) => {
  const selectedFiles = event.target.files;
  
  for (const file of selectedFiles) {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      files.value.push({ name: file.name, type: file.type, data: file, preview: e.target.result });
    };
    
    if (file.type.includes('image')) {
      reader.readAsDataURL(file);
    } else if (file.type.includes('video')) {
      reader.readAsDataURL(file);
    }
  }
};

// fake file input
const fileInput = ref(null);

const triggerFileInput = () => {
  fileInput.value.click();
};

// upload
const uploadFiles = async () => {
  message.value = '';

  if (!email.value) {
    message.value = 'O email é obrigatório para receberes o link para o album'
    emailRef.value.focus()
    return;
  }

  loading.value = true 

  const formData = new FormData();
  files.value.forEach((fileObj) => {
    formData.append('files', fileObj.data);
  });
  formData.append('email', email.value);

  try {
    await axios.post(import.meta.env.VITE_SERVER_URL + 'upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // send email
    try {
      emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, 
        import.meta.env.VITE_EMAILJS_TEMPLATE_ALBUM_ID,
        { to_email: email.value, album_link: import.meta.env.VITE_BASE_URL + 'album' },
        import.meta.env.VITE_EMAILJS_KEY)
        .then((result) => {
          uploaded.value = true
          loading.value = false 
        }, (error) => {});
    } catch (error) {
      console.error("Email failed:", error);
      throw error
    }
  } catch (err) {
    loading.value = false 
    message.value = 'Ocorreu um erro... tenta outra vez.'
  }
};

// email check
const isValidEmail = () => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email.value);
}

// live cycle events
onMounted(() => {
  fileInput.value.addEventListener('change', function(e) {
    const files = e.target.files;
    const maxSize = 20 * 1024 * 1024
    let totalSize = 0;
    for (let i = 0; i < files.length; i++) {
      totalSize += files[i].size;
    }
    if (totalSize > maxSize) {
      status.value = "O tamanho total não pode ultrapassar 20MB"
      e.target.value = '';
    }
    const availableSize = ((maxSize - totalSize) / (1024 * 1024)).toFixed(2);
    status.value = `Espaço disponível: ${availableSize} MB`;
    
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      })
    }, 200)
  });
})
</script>

<template>
  <div class="wrapper">
    <template v-if="!uploaded">
      <SectionTitle>Carrega aqui as tuas fotos</SectionTitle>
      <div class="form-item">
        <form>
          <input type="email" v-model="email" ref="emailRef" name="email" placeholder="Email *" required>
        </form>
      </div>
      
      <div class="form-item">
        <PrimaryButton @click="triggerFileInput" :disabled="!isValidEmail()">Escolher fotos</PrimaryButton>
        <input type="file" @change="handleFiles" ref="fileInput" multiple accept="image/*" hidden>
      </div>

      <!-- Preview Area -->
      <div class="form-item gallery">
        <Gallery>
          <li v-for="file in files" :key="file.name" class="preview"
            :style="'background-image: url(' + file.preview + ')'">
            <img v-if="file.type.includes('image')" :src="file.preview" />
          </li>
        </Gallery>
      </div>

      <div class="form-item message" v-if="message" v-html="message"></div>
      <div class="form-item message" v-if="status" v-html="status"></div>
      <div class="form-item">
        <PrimaryButton @click="uploadFiles" :hidden="files.length === 0" :disabled="loading">Enviar -&gt;</PrimaryButton>
      </div>
      <div class="form-item" v-if="loading">
        <Loading>a enviar...</Loading>
      </div>
    </template>

    <template v-else>
      <SectionTitle>Obrigado!</SectionTitle>
      <p>Irás receber um link para o álbum no email indicado.</p>
      <a href="/">Voltar</a>
    </template>
  </div>
</template>

<style lang="scss" scoped>

.wrapper {
  width: 100%;

  h2 {
    font-family: 'AnonymousPro';
    font-size: 4rem;
    margin-bottom: 2rem;
  }

  .form-item {
    max-width: 50rem;
    
    &.gallery {
      max-width: 100%;
    }
  }
}
</style>