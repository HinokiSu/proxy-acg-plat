import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { router } from './routes'
import {
  // Directives
  Tooltip
} from 'floating-vue'
import 'floating-vue/dist/style.css'
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.component('v-tooltip', Tooltip)
app.mount('#app')
