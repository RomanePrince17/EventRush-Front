import { createApp } from 'vue'
import 'leaflet/dist/leaflet.css';
import './style.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'
axios.defaults.baseURL = 'https://digitstage.online/api'
 axios.defaults.withCredentials = true // si l’API utilise des cookies (Sanctum)
createApp(App).use(router).mount('#app')
