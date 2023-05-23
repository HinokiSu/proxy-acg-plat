<template>
  <div class="torrent-tags">
    <div class="tags-list">
      <torrent-tag
        :tag="tag"
        v-for="(tag, index) in tags"
        :key="index"
      ></torrent-tag>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TorrentTag from './torrent-tag.vue'
export default defineComponent({
  name: 'TorrentTags',
  props: {
    tags: {
      type: Array<string>,
      default: []
    }
  },
  components: {
    TorrentTag
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.torrent-tags {
  .tags-list {
    display: flex;
    column-gap: 6px;
    row-gap: 6px;
    flex-wrap: wrap;
  }
}
</style>
