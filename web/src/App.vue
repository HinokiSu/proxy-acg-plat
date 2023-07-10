<template>
  <main-layout></main-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MainLayout from './layout/main-layout.vue'
import { useAnimeStore } from '@stores/anime.store'
import { storeToRefs } from 'pinia'
import getCurrentQuarter from '@utils/getCurrentQuarter'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'App',
  components: {
    MainLayout
  },
  setup() {
    const { quarter } = storeToRefs(useAnimeStore())
    quarter.value = dayjs(getCurrentQuarter()).format('YYYY-MM')
    return {}
  }
})
</script>

<style lang="less"></style>
