import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { router } from './routes'

import Toast from '@components/toast/index'
const app = createApp(App)

app.config.globalProperties.$toast = Toast
app.use(router)
const pinia = createPinia()
app.use(pinia)
app.mount('#app')
