import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import AppLogin from '@/views/AppLogin.vue'
import UserDashboard from '@/views/UserDashboard.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: AppLogin,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: UserDashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/',
    redirect: '/login',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated']

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
