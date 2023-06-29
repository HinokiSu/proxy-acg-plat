<template>
  <div class="torrent-list">
    <div class="torrent-list-item" v-for="item in torrents" :key="item._id">
      <torrent-card :torrent="item"></torrent-card>
    </div>
    <load-more
      @click="loadMoreClick"
      class="load-more-main"
      :loading="loadingMore"
      :over="loadedOver"
    ></load-more>
  </div>
  <!-- <pagination></pagination> -->
</template>

<script lang="ts">
import { useTorrentStore } from '@stores/torrent.store'
import { computed, defineComponent, reactive } from 'vue'
import TorrentCard from '@components/torrent-card/index.vue'
import Pagination from '@components/pagination/pagination.vue'
import LoadMore from '@components/load-more/load-more.vue'
export default defineComponent({
  name: 'TorrentList',
  components: {
    TorrentCard,
    Pagination,
    LoadMore
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    loadingMore: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: 20
    },
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:current', 'load-more'],
  setup(props, { emit }) {
    const torrentStore = useTorrentStore()
    const torrents = computed(() => torrentStore.torrentList)
    const paginRef = reactive({
      curPage: computed(() => props.current),
      pageSize: computed(() => props.size),
      total: computed(() => props.total)
    })

    const loading = computed(() => props.loading)
    const loadedOver = computed(() => torrentStore.isCompleted)

    const loadMoreClick = () => {
      emit('load-more')
    }

    return {
      loading,
      paginRef,
      loadedOver,
      torrents,
      loadMoreClick
    }
  }
})
</script>

<style lang="less" scoped>
.torrent-list {
  display: flex;
  flex-direction: column;
}
.load-more-main {
  margin-top: 10px;
  margin-bottom: 10%;
}
</style>
