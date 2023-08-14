import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/pages/Auth/Member/MemberLogin.vue'
import { useAPIStore } from '@/stores/api'
import { useBookmarkStore } from '@/stores/api/bookmark'
import { userIsLoggedIn } from '@/utils/version/authentication'
import { useCurrentUserStore } from '@/stores/current-user'

const setPageTitle = (title: string) => {
  document.title = `DailyFlow \u2022 ${ title }`
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
      beforeEnter: ((to, from) => setPageTitle('Login to continue'))
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/pages/Auth/Member/MemberSignup.vue'),
      beforeEnter: ((to, from) => setPageTitle('Signup to continue'))
    },
    {
      path: '/',
      name: 'overview',
      component: () => import('@/pages/OverView.vue'),
      beforeEnter: ((to, from) => setPageTitle('Overview')),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/projects/:id/tasks/:taskId?',
      name: 'projectOverview',
      component: () => import('@/pages/ProjectOverview.vue'),
      beforeEnter: (to, from) => {
        useAPIStore().getProject(to.params?.id.toString()).then((data) => {
          setPageTitle(`${ data?.name }`)
          return true
        })
      },
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from) => {
  const user = JSON.parse(localStorage.getItem('__user__') as string)
  
  //- Prohibit user from navigating to unprotected route(s) when logged in
  if ( !to.meta.requiresAuth && user ) {
    useCurrentUserStore().setCurrentUser(user)
    return { name: 'overview' }
  }

  //- Continue with navigation to unprotected route(s)
  return true
})

router.afterEach((to, from) => {
  if ( userIsLoggedIn() ) {
    useBookmarkStore().listBookmark()
    return true
  }
})

export default router
