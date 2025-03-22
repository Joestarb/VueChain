import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '@/views/register/RegisterView.vue'
import LoginView from '@/views/login/LoginView.vue'
import DashboardView from '@/views/Dashboard/DashboardView.vue'
import HomeView from '@/views/Home/HomeView.vue'
import AboutView from '@/views/Nosotros/AboutView.vue'
import ContactView from '@/views/Contacto/ContactView.vue'
import MainLayout from '@/components/layout/MainLayout.vue'
import { useAuthStore } from '@/features/authSlice'
import { useTokenStore } from '@/stores/TokenStore'
import UserView from '@/views/admin/users/UserView.vue'

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
      component: MainLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: DashboardView,
        },
        {
          path: '/admin/users',
          name: 'Admin',
          component: UserView,
        },
      ],
    },
    {
      path: '/about',
      name: 'About',
      component: AboutView,
    },
    {
      path: '/contact',
      name: 'Contact',
      component: ContactView,
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const tokenStore = useTokenStore()
  const token = tokenStore.getToken()
  const currentDate = new Date().getTime()
  console.log('ROL USUARIO',token.role)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (token) {
      try {
        const response = await authStore.verifyToken(token.token)

        if (response.role === token.role || response.expiresAt > currentDate) {
          // Restricción específica para la ruta de admin
          if (to.path === "/admin/*" && token.role !== "admin") {
            next({ name: "Dashboard" }) // Redirige si no es admin
          } else {
            next() // Permite acceso si es admin o si la ruta no es restringida
          }
        } else {
          next({ name: "LoginView" })
        }
      } catch (error) {
        next({ name: "LoginView" })
      }
    } else {
      next({ name: "LoginView" })
    }
  } else {
    next()
  }
})


export default router
