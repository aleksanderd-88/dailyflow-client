import { createRouter, createWebHistory } from 'vue-router'
import OverView from '@/pages/OverView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'overview',
      component: OverView
    }
  ]
})

export default router
