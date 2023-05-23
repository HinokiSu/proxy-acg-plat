<template>
  <div class="torrent-card">
    <div class="torrent-title">
      {{ torrentObj.title }}
    </div>
    <torrent-tags :tags="torrentObj.tags"></torrent-tags>
    <div class="torrent-info">
      <div class="publish-info">
        <div class="publish-team">
          {{ torrentObj.publish_team }}
        </div>
        <div class="publish-time">
          发布于:
          <span>
            {{ torrentObj.publish_time }}
          </span>
        </div>
      </div>

      <div class="torrent-links">
        <v-tooltip>
          <a
            target="_blank"
            :href="torrentObj.links"
            class="text-decoration-none"
            >Torrent</a
          >
          <template #popper> {{ torrentObj.create_at }} </template>
        </v-tooltip>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { TTorrent } from '@interfaces/torrent.types'
import { computed, defineComponent, PropType } from 'vue'
import dayjs from 'dayjs'
import TorrentTags from '@components/torrent-tag/torrent-tags.vue'
export default defineComponent({
  name: 'TorrentCard',
  props: {
    torrent: Object as PropType<TTorrent>
  },
  components: {
    TorrentTags
  },
  setup(props) {
    const torrentObj = computed(() => {
      const _t = props.torrent as TTorrent
      if (_t) {
        _t.create_at = dayjs(_t.create_at).format('YYYY-MM-DD HH:mm:ss')
        _t.publish_time = dayjs(_t.publish_time).format('YYYY年M月D日')
      }
      return _t
    })

    return {
      torrentObj
    }
  }
})
</script>

<style lang="less" scoped>
.torrent-card {
  display: flex;
  justify-content: center;
  flex-direction: column;
  row-gap: 10px;
  margin: 12px 16px;
  padding: 12px;
  font-size: 0.875rem;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  transition: all 0.4s ease;

  &:hover {
    border-color: #c1c8cd;
  }

  .torrent-title {
    line-height: 1.5rem;
    font-size: 0.875rem;
    color: #2e2c2f;
  }
}

.torrent-info {
  display: flex;
  column-gap: 4px;
  padding: 8px 0px;
  justify-content: space-between;
  border-radius: 8px;

  .publish-info {
    display: flex;
    align-items: center;
    font-size: 0.75rem;
    color: #222;
    .publish-team {
      margin-right: 10px;
    }

    .publish-time {
      span {
        font-weight: 500;
        color: #00254d;
      }
    }
  }

  .torrent-links {
    margin: 2px;
    a {
      color: var(--acg-a-color);
      border-radius: 4px;
      border: 1px solid #b7d5f8;
      transition: all 0.3s ease;
      padding: 4px 6px;
      &:hover {
        color: var(--acg-a-hover-color);
        border-color: #cee4fe;
      }
    }
  }
}
</style>
