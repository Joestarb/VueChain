import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '@/views/register/RegisterView.vue'
import LoginView from '@/views/login/LoginView.vue'
import DashboardView from '@/views/Dashboard/DashboardView.vue'
import HomeView from '@/views/Home/HomeView.vue'
import AboutView from '@/views/Nosotros/AboutView.vue'
import ContactView from '@/views/Contacto/ContactView.vue'
import P2PSellersView from '@/views/P2P/P2PSellersView.vue' // Nueva vista de vendedores P2P
import P2PBuySimulationView from '@/views/P2P/P2PBuySimulationView.vue' // Nueva vista para simular compra
import MainLayout from '@/components/layout/MainLayout.vue'
import { useAuthStore } from '@/features/authSlice'
import { useTokenStore } from '@/stores/TokenStore'
import UserView from '@/views/admin/users/UserView.vue'
import BuyandSellView from '@/views/Binance/BuyandSellView.vue'

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
          path: 'buyandasell', //nueva ruta para la vista de compra y venta
          name: 'BuyAndSell',
          component: BuyandSellView,
        },
        {
          path: '/sellers',
          name: 'Sellers',  // Ruta para vendedores P2P
          component: P2PSellersView,
        },
        {
          path: '/p2pbuy',
          name: 'P2PBuy', // Ruta para simular compra
          component: P2PBuySimulationView,
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
          if (to.path === "/admin/users" && token.role !== "admin") {
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
