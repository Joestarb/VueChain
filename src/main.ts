import './assets/main.css'
import axios from 'axios';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

axios.defaults.baseURL = 'http://localhost:5245'; // Reemplaza con la URL de tu API
axios.defaults.headers.post['Content-Type'] = 'application/json';

app.use(createPinia())
app.use(router)

app.mount('#app')
