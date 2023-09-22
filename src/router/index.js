import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UploadView from '../views/UploadView.vue'
import AlbumView from '../views/AlbumView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/carrega',
      name: 'upload',
      component: UploadView
    },
    {
      path: '/album',
      name: 'album-landing',
      redirect: '/album/1'
    },
    {
      path: '/album/:page/:filename?',
      name: 'album',
      component: AlbumView,
      props: true
    },
  ]
})

export default router
