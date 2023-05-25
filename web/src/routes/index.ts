import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    redirect: '/torrent'
  },
  {
    path: '/torrent',
    name: 'torrent',
    component: () => import('@views/torrent.vue')
  }
]

export const router = createRouter({
  history: createWebHistory('/acg/'),
  routes
})
