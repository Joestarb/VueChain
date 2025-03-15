import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '@/views/register/RegisterView.vue'
import LoginView from '@/views/login/LoginView.vue'
import DashboardView from '@/views/Dashboard/DashboardView.vue'
import HomeView from '@/views/Home/HomeView.vue'
import { useAuthStore } from '@/features/authSlice'
import { useTokenStore } from '@/stores/TokenStore'
import AboutView from '@/views/Nosotros/AboutView.vue'
import ContactView from '@/views/Contacto/ContactView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView, 
    },
    {
      path: '/login',
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
    {
      path: '/about',
      name: 'About',
      component: AboutView,
      meta: { requiresAuth: true },
    },
    {
      path: '/contact',
      name: 'Contact',
      component: ContactView,
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
        if (response.role === token.role) {
          next()
        } else {
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
