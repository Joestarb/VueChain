import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '@/views/register/RegisterView.vue'
import LoginView from '@/views/login/LoginView.vue'
import DashboardView from '@/views/Dashboard/DashboardView.vue'
import { useAuthStore } from '@/features/authSlice'
import { useTokenStore } from '@/stores/TokenStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LoginView',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'RegisterView',
      component: RegisterView,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const tokenStore = useTokenStore()
  const token = tokenStore.getToken()

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (token) {
      try {
        await authStore.verifyToken(token)
        next()
      } catch (error) {
        next({ name: 'LoginView' })
      }
    } else {
      next({ name: 'LoginView' })
    }
  } else {
    next()
  }
})

export default router
