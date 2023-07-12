import { createRouter, createWebHistory } from 'vue-router'
import OverView from '@/pages/OverView.vue'

const setPageTitle = (title: string) => {
  document.title = `DailyFlow \u2022 ${ title }`
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'overview',
      component: OverView,
      beforeEnter: ((to, from) => setPageTitle('Start'))
    }
  ]
})

export default router
