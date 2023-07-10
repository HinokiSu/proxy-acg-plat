<template>
  <div class="week-tabs">
    <div class="week-tabs__container">
      <week-tab-item
        v-for="(item, index) in weekList"
        :key="index"
        :week="item"
        @click="clickHandler"
      ></week-tab-item>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import WeekTabItem from './week-tab-item.vue'
import { storeToRefs } from 'pinia'
import { useAnimeStore } from '@stores/anime.store'
import dayjs from 'dayjs'
export default defineComponent({
  name: 'WeekTabs',
  components: {
    WeekTabItem
  },

  setup() {
    const animeStore = useAnimeStore()

    const { week: weekList, loading } = storeToRefs(useAnimeStore())

    const getWeekAnimeAndWait = async (key: number) => {
      animeStore.changeWeekTab(key)
      loading.value = true
      await animeStore.getWeekAnime(key)
      setTimeout(() => {
        loading.value = false
      }, 600)
    }

    const clickHandler = async (key: number) => {
      // ALL
      if (key === -1) {
        animeStore.changeWeekTab(key)
        loading.value = true
        await animeStore.getQuarterAnime().then(() => {
          setTimeout(() => {
            loading.value = false
          }, 600)
        })
      } else {
        await getWeekAnimeAndWait(key)
      }
    }

    onMounted(async () => {
      animeStore.getWeekTabs()
      const currentKey = dayjs().get('day')
      await getWeekAnimeAndWait(currentKey)
    })
    return { weekList, clickHandler }
  }
})
</script>

<style lang="less" scoped>
.week-tabs {
  &__container {
    margin-top: 6px;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
  }
}
</style>
