import { createRouter, createWebHistory } from 'vue-router'
import OverView from '@/pages/OverView.vue'
import { useAPIStore } from '@/stores/api'

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
    },
    {
      path: '/projects/:id',
      name: 'projectOverview',
      component: () => import('@/pages/ProjectOverview.vue'),
      beforeEnter: (to, from) => {
        useAPIStore().getProject(to.params?.id.toString()).then(() => {
          setPageTitle('Overview')
          return true
        })
      }
    }
  ]
})

export default router
