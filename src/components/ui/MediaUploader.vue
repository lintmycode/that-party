<script setup>
import { ref } from 'vue';
import axios from 'axios';
import PrimaryButton from './PrimaryButton.vue';
import SectionTitle from '../atoms/SectionTitle.vue';
import emailjs from '@emailjs/browser';
import Loading from './Loading.vue';

const email = ref("");
const emailRef = ref("");
const message = ref("")
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
</script>

<template>
  <div class="wrapper">
    <template v-if="!uploaded">
      <SectionTitle>Carrega aqui as tuas fotos</SectionTitle>
      <div class="form-item">
        <form>
          <input type="email" v-model="email" ref="emailRef" name="email" placeholder="Email *">
        </form>
      </div>
      <div class="form-item message" v-if="message" v-html="message"></div>

      <div class="form-item">
        <PrimaryButton @click="triggerFileInput">Escolher fotos</PrimaryButton>
        <input type="file" @change="handleFiles" ref="fileInput" multiple accept="image/*" hidden>
      </div>

      <!-- Preview Area -->
      <div class="form-item gallery">
        <ul>
          <li v-for="file in files" :key="file.name" class="preview">
            <img v-if="file.type.includes('image')" :src="file.preview" />
          </li>
        </ul>
      </div>

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

ul {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  .preview {
    
    img,
    video {
      height: 200px;
      max-width: 200px;
      object-fit: cover;
    }
  }
}
</style>