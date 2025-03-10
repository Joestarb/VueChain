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
        const response = await authStore.verifyToken(token.token)
        console.log(response.username)
        console.log(token.username)
        if (response.role === token.role) {
          next()
        }
        else{
          next({ name: 'LoginView' })
        }
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
