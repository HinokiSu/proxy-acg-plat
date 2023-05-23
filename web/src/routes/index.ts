import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'

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
  history: createWebHashHistory('/acg/'),
  routes
})
