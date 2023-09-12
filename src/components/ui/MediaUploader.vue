<script setup>
import { ref } from 'vue';
import axios from 'axios';
import PrimaryButton from './PrimaryButton.vue';
import SecondaryButton from './SecondaryButton.vue';

const email = ref("");
const emailRef = ref("");
const files = ref([]);
const message = ref('')

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
  if (!email.value) {
    message.value = 'O email é obrigatório para receberes o link para o album'
    emailRef.value.focus()
    return;
  }

  const formData = new FormData();
  files.value.forEach((fileObj) => {
    formData.append('files', fileObj.data);
  });
  formData.append('name', name.value);

  try {
    // Assuming your Node.js server is running on http://localhost:3000
    await axios.post('http://localhost:3000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    alert('Upload successful');
  } catch (err) {
    alert('Upload failed');
  }
};

</script>

<template>
  <div class="wrapper">
    <div class="form-item">
      <input type="email" v-model="email" ref="emailRef" placeholder="Email *" />
    </div>
    <div class="form-item message" v-if="message" v-html="message"></div>

    <div class="form-item">
      <PrimaryButton @click="triggerFileInput">Escolher fotos</PrimaryButton>
      <input type="file" @change="handleFiles" ref="fileInput" multiple accept="image/*,video/*" hidden/>
    </div>

    <!-- Preview Area -->
    <div class="form-item gallery">
      <ul>
        <li v-for="file in files" :key="file.name" class="preview">
          <img v-if="file.type.includes('image')" :src="file.preview" />
          <video v-if="file.type.includes('video')" controls>
            <source :src="file.preview" :type="file.type">
          </video>
        </li>
      </ul>
    </div>

    <div class="form-item">
      <PrimaryButton @click="uploadFiles" :hidden="files.length === 0">Enviar -&gt;</PrimaryButton>
    </div>
    
    
  </div>
</template>

<style lang="scss" scoped>

.wrapper {
  width: 100%;

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
    
    img {
      height: 200px;
      max-width: 200px;
      object-fit: cover;
    }
  }
}
</style>