<template>
  <div class="anime">
    <!-- <div>Developing...</div> -->
    <div class="anime-quarter-list">
      <div class="quarter-item" v-for="item in animeList" :key="item._id">
        <anime-card :anime="item"></anime-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import AnimeCard from '@components/anime-card/anime-card.vue'
import { useAnimeStore } from '@stores/anime.store'
import getCurrentQuarter from '@utils/getCurrentQuarter'
export default defineComponent({
  name: 'Anime',
  components: {
    AnimeCard
  },
  setup() {
    const animeStore = useAnimeStore()
    const animeList = computed(() => animeStore.animeList)
    const currentQuarter = getCurrentQuarter() 
    console.log(currentQuarter)
    onMounted(async () => {
      await animeStore.getQuarterAnime(currentQuarter)
    })
    return {
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
