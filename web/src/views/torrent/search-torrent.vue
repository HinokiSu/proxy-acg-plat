<template>
  <div class="search-torrent-page" :class="isCenter ? 'center' : ''">
    <div class="search-container">
      <acg-input
        class="input-self"
        placeholder="Enter Anime or Keywords..."
        v-model:value="searchVal"
      ></acg-input>
      <acg-button
        class="button-self"
        title="Search"
        color="gradient"
        @click="clickSearch"
      ></acg-button>
    </div>
    <torrent-list
      :total="paginRef.total"
      :size="paginRef.pageSize"
      :loading="loading"
      :loading-more="loadingMore"
      v-model:current="paginRef.curPage"
      @loadMore="loadMoreClick"
    ></torrent-list>
    <!-- <div class="loaded-over">Loaded All.</div> -->
  </div>
  <to-top v-show="!isCenter"></to-top>
</template>

<script lang="ts">
import { useTorrentStore } from '@stores/torrent.store'
import { computed, defineComponent, onUnmounted, reactive, ref } from 'vue'
import TorrentList from '@components/torrent-list/torrent-list.vue'
import AcgInput from '@components/input/index.vue'
import AcgButton from '@components/button/index.vue'
import ToTop from '@components/to-top/to-top.vue'
export default defineComponent({
  name: 'SearchTorrentPage',
  components: {
    TorrentList,
    AcgInput,
    AcgButton,
    ToTop
  },
  setup() {
    const torrentStore = useTorrentStore()
    const loading = ref(false)
    const paginRef = reactive({
      curPage: 1,
      pageSize: 20,
      total: computed(() => torrentStore.total)
    })
    const searchVal = ref('')
    // control search input whether center
    const isCenter = ref(true)
    const loadingMore = ref(false)

    const getDataAndWait = async () => {
      loading.value = true
      await torrentStore
        .searchFuzzyTitle(searchVal.value, paginRef.curPage, paginRef.pageSize)
        .then(() => {
          loading.value = false
        })
    }

    const clickSearch = async () => {
      torrentStore.clearState()
      if (!searchVal.value.trim()) {
        isCenter.value = true
        return console.log('Warn: Search value cannot be empty!')
      }
      await getDataAndWait().then(() => {
        isCenter.value = !isCenter.value
      })
    }

    const loadMoreClick = async () => {
      loadingMore.value = true
      paginRef.curPage = paginRef.curPage + 1
      setTimeout(async () => {
        await torrentStore
          .searchFuzzyTitle(
            searchVal.value,
            paginRef.curPage,
            paginRef.pageSize
          )
          .then(() => {
            loadingMore.value = false
          })
      }, 500)
    }

    onUnmounted(() => {
      torrentStore.clearState()
      paginRef.curPage = 1
      paginRef.pageSize = 20
    })

    return {
      paginRef,
      loading,
      loadingMore,
      searchVal,
      isCenter,
      loadMoreClick,
      clickSearch
    }
  }
})
</script>

<style lang="less" scoped>
.search-torrent-page {
  width: 100%;
  display: flex;
  flex-direction: column;

  justify-content: center;

  &.center {
    align-items: center;
  }
  .search-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 25px;
    margin-bottom: 10px;
    margin-right: 20px;

    .input-self {
      height: 35px;
    }
    .button-self {
      height: 35px;
      font-weight: 400;
      font-size: 0.9rem;
      padding: 2px;
    }
  }
}
</style>
