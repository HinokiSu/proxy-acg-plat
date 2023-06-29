<template>
  <div class="anime-list wrapper">
   
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import { TAnime } from '@interfaces/anime.types'

export default defineComponent({
  name: 'AnimeList',
  components: {
  },
  props: {
    data: Array as PropType<Array<TAnime>>
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
</style>
