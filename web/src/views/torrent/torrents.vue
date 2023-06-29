<template>
  <div class="torrent-page">
    <title-navigation title="To Search" to="torrent-search"></title-navigation>
    <torrent-list
      :total="paginRef.total"
      :size="paginRef.pageSize"
      :loading="loading"
      :loading-more="loadingMore"
      v-model:current="paginRef.curPage"
      @loadMore="loadMoreClick"
    ></torrent-list>
  </div>
  <to-top></to-top>
</template>

<script lang="ts">
import { useTorrentStore } from '@stores/torrent.store'
import {
  computed,
  ref,
  defineComponent,
  onMounted,
  onUnmounted,
  reactive
} from 'vue'
import TorrentList from '@components/torrent-list/torrent-list.vue'
import ToTop from '@components/to-top/to-top.vue'
import TitleNavigation from '@components/title-navigation/title-navigation.vue'
import Toast from '@components/toast/toast.vue'
export default defineComponent({
  name: 'Torrent',
  components: {
    TorrentList,
    ToTop,
    TitleNavigation,
    Toast
  },
  setup() {
    const torrentStore = useTorrentStore()
    const paginRef = reactive({
      curPage: 1,
      pageSize: 20,
      total: computed(() => torrentStore.total)
    })

    const loading = ref(false)
    const loadingMore = ref(false)

    const torrentList = computed(() => torrentStore.torrentList)

    const getDataAndWait = async () => {
      loading.value = true
      await torrentStore
        .getTorrentByPagin(paginRef.curPage, paginRef.pageSize)
        .then(() => {
          loading.value = false
        })
    }

    const loadMoreClick = async () => {
      loadingMore.value = true
      paginRef.curPage = paginRef.curPage + 1
      setTimeout(async () => {
        await torrentStore
          .getTorrentByPagin(paginRef.curPage, paginRef.pageSize)
          .then(() => {
            loadingMore.value = false
          })
      }, 500)
    }

    onMounted(async () => {
      await getDataAndWait()
    })

    onUnmounted(() => {
      torrentStore.clearState()
      paginRef.curPage = 1
      paginRef.pageSize = 20
    })
    return {
      loading,
      paginRef,
      torrentList,
      loadingMore,
      getDataAndWait,
      loadMoreClick
    }
  }
})
</script>

<style lang="less" scoped>
.torrent-page {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.load-more-main {
  margin-top: 10px;
  margin-bottom: 15%;
}
</style>
