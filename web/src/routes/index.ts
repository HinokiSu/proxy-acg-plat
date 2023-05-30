import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    redirect: '/torrent/all'
  },
  {
    path: '/torrent',
    name: 'torrent',
    children: [
      {
        path: 'all',
        name: 'torrents',
        component: () => import('@views/torrent/torrents.vue')
      },
      {
        path: 'search',
        name: 'torrentSearch',
        component: () => import('@views/torrent/search-torrent.vue')
      }
    ]
  },
  {
    path: '/anime',
    name: 'anime',
    children: [
      {
        path: 'quarter',
        name: 'quarter',
        component: () => import('@views/anime/anime.vue')
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory('/acg/'),
  routes
})
