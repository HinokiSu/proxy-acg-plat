<template>
  <div class="anime">
    <week-tabs></week-tabs>
    <skeleton w="100%" v-if="loading" :num="1"></skeleton>
    <div v-else class="anime-quarter-container">
      <div class="anime-quarter-list">
        <div class="quarter-item" v-for="item in animeList" :key="item._id">
          <anime-card :anime="item"></anime-card>
        </div>
      </div>
      <empty v-show="animeList.length === 0" tips="Now, No Anime Data"></empty>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import AnimeCard from '@components/anime-card/anime-card.vue'
import { useAnimeStore } from '@stores/anime.store'
import Skeleton from '@components/skeleton/skeleton.vue'
import WeekTabs from '@components/week-tabs/week-tabs.vue'
import { storeToRefs } from 'pinia'
import Empty from '@components/empty/empty.vue'
export default defineComponent({
  name: 'Anime',
  components: {
    AnimeCard,
    Skeleton,
    WeekTabs,
    Empty
  },
  setup() {
    const animeStore = useAnimeStore()
    const { loading } = storeToRefs(useAnimeStore())
    const animeList = computed(() => animeStore.animeList)
    return {
      loading,
      animeList
    }
  }
})
</script>

<style lang="less" scoped>
.anime {
  width: 100%;
  .anime-quarter-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    margin-top: 20px;
    margin-bottom: 20%;
    column-gap: 30px;
    row-gap: 20px;

    @media screen and (min-width: 1400px) {
      grid-template-columns: repeat(4, 1fr);
      row-gap: 30px;
    }
    @media screen and (max-width: 1300px) {
      grid-template-columns: repeat(3, 1fr);
      row-gap: 30px;
    }

    @media screen and (max-width: 1000px) {
      grid-template-columns: repeat(2, 1fr);
      column-gap: 30px;
      row-gap: 20px;
    }

    @media screen and (max-width: 800px) {
      grid-template-columns: repeat(2, 1fr);
      column-gap: 25px;
      row-gap: 20px;
    }

    @media screen and (max-width: 680px) {
      grid-template-columns: 1fr;
      row-gap: 24px;
    }
  }
}
</style>
