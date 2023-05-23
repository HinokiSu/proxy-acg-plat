<template>
  <div class="torrent-tag-item">
    <span class="tag-item-content">
      {{ tag }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TorrentTagItem',
  props: {
    tag: {
      type: String,
      default: ''
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.torrent-tag-item {
  margin: 2px 2px 2px 0px;
  text-align: center;
  overflow-wrap: break-word;
  .tag-item-content {
    padding: 3px 5px;
    border: 1px solid #eaeaea;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.7rem;
    color: #687076







;

    &:hover {
      border-color: #c7c7c7;
      color: #111;
    }
  }
}
</style>
