<template>
  <skeleton w="100%" v-if="loading" :num="2"></skeleton>
  <div v-else class="anime">
    <!-- <div>Developing...</div> -->
    <div class="anime-quarter-list">
      <div class="quarter-item" v-for="item in animeList" :key="item._id">
        <anime-card :anime="item"></anime-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import AnimeCard from '@components/anime-card/anime-card.vue'
import { useAnimeStore } from '@stores/anime.store'
import getCurrentQuarter from '@utils/getCurrentQuarter'
import Skeleton from '@components/skeleton/skeleton.vue'

export default defineComponent({
  name: 'Anime',
  components: {
    AnimeCard,
    Skeleton
  },
  setup() {
    const animeStore = useAnimeStore()
    const loading = ref(true)
    const animeList = computed(() => animeStore.animeList)
    const currentQuarter = getCurrentQuarter()

    onMounted(async () => {
      loading.value = true
      await animeStore.getQuarterAnime(currentQuarter).then(() => {
        setTimeout(() => {
          loading.value = false
        }, 600)
      })
    })
    return {
      loading,
      animeList
    }
  }
})
</script>

<style lang="less" scoped>
.anime {
  .anime-quarter-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-top: 20px;
    margin-bottom: 20%;
    column-gap: 30px;
    row-gap: 20px;

    @media screen and (min-width: 1400px) {
      grid-template-columns: repeat(4, 1fr);
      row-gap: 30px;
    }

    @media screen and (max-width: 1280px) {
      grid-template-columns: repeat(3, 1fr);
      column-gap: 30px;
      row-gap: 20px;
    }

    @media screen and (max-width: 800px) {
      grid-template-columns: repeat(2, 1fr);
      column-gap: 25px;
      row-gap: 20px;
    }

    @media screen and (max-width: 500px) {
      grid-template-columns: 1fr;
      row-gap: 24px;
    }
  }
}
</style>
