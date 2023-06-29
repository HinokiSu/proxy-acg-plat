import { useUserStore } from '@stores/user.store'
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
        component: () => import('@views/torrent/torrents.vue'),
        meta: {
          title: 'Torrents',
          isNoLogin: true
        }
      },
      {
        // /:name?  , ? 可选是否传参
        path: 'search/:word?',
        name: 'torrent-search',
        component: () => import('@views/torrent/search-torrent.vue'),
        meta: {
          title: 'Search',
          isNoLogin: true
        }
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
        component: () => import('@views/anime/anime.vue'),
        meta: {
          title: 'Quarter',
          isNoLogin: true
        }
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    children: [
      {
        path: 'anime/update',
        name: 'update-anime',
        component: () => import('@views/admin/update-anime.vue'),
        meta: {
          title: 'Update Anime',
          isNoLogin: false
        }
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory('/acg/'),
  routes
})

router.beforeEach((to, _from, next) => {
  const userStore = useUserStore()
  if (to.meta.isNoLogin) {
    next()
  } else {
    if (userStore.isLogin) {
      next()
    } else {
      router.push({
        name: 'torrents'
      })
    }
  }
})
