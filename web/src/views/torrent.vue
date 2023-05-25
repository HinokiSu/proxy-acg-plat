<template>
  <div class="torrent-page">
    <div class="torrent-list">
      <div
        class="torrent-list-item"
        v-for="item in torrentList"
        :key="item._id"
      >
        <torrent-card :torrent="item"></torrent-card>
      </div>
    </div>
    <!-- <pagination></pagination> -->
    <load-more
      @click="loadMoreClick"
      class="load-more-main"
      :loading="moreLoading"
      :over="loadedOver"
    ></load-more>
  </div>
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
import TorrentCard from '@components/torrent-card/index.vue'
import Pagination from '@components/pagination/pagination.vue'
import LoadMore from '@components/load-more/load-more.vue'
export default defineComponent({
  name: 'Torrent',
  components: {
    TorrentCard,
    Pagination,
    LoadMore
  },
  setup() {
    const torrentStore = useTorrentStore()
    const paginRef = reactive({
      curPage: 1,
      pageSize: 20,
      total: computed(() => torrentStore.total)
    })

    const loading = ref(false)
    const moreLoading = ref(false)
    const loadedOver = computed(() => {
      if (!paginRef.total) return true

      if (paginRef.total === torrentList.value.length) {
        return true
      }
      return false
    })

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
      moreLoading.value = true
      paginRef.curPage = paginRef.curPage + 1
      setTimeout(async () => {
        await torrentStore
          .getTorrentByPagin(paginRef.curPage, paginRef.pageSize)
          .then(() => {
            moreLoading.value = false
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
      getDataAndWait,
      loadMoreClick,
      moreLoading,
      loadedOver
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
  margin-bottom: 10%;
}
</style>
