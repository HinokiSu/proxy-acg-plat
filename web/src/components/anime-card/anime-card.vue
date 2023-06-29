<template>
  <div class="anime-card">
    <div class="card-img-container">
      <img v-if="!isError" :src="anime?.img" alt="" @error="imgErrorHandle" />
      <empty-img v-else></empty-img>
    </div>
    <div class="card-header">
      <div class="anime-title" @click="clickAnime">
        {{ anime?.ja_name }}
      </div>
      <div class="anime-credit">{{ anime?.credit }}</div>

      <div class="show-time">
        <div class="start-time">{{ anime?.start_date }}</div>
        <span>~</span>
        <div class="end-time">{{ anime?.end_date }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { TAnime } from '@interfaces/anime.types'
import { defineComponent, PropType, ref } from 'vue'
import { useRouter } from 'vue-router'
import Skeleton from '@components/skeleton/skeleton.vue'

import EmptyImg from '@components/empty/empty-img.vue'
export default defineComponent({
  name: 'AnimeCard',
  props: {
    anime: Object as PropType<TAnime>
  },

  components: {
    Skeleton,
    EmptyImg
  },

  setup(props) {
    const router = useRouter()
    const isError = ref(false)
    const clickAnime = () => {
      router.push({
        name: 'torrent-search',
        params: {
          word: props.anime?._id
        }
      })
    }
    const imgErrorHandle = () => {
      isError.value = !isError.value
    }
    return { clickAnime, isError, imgErrorHandle }
  }
})
</script>

<style lang="less" scoped>
.anime-card {
  width: 250px;
  height: 250px;
  opacity: 1;
  position: relative;
  overflow: hidden;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  place-content: inherit;
  align-items: inherit;
  //   box-shadow: 1px 4px 12px 4px #eaeaea;
  /* filter: drop-shadow(0 12px 24px rgb(104 112 118 / 0.15))
    drop-shadow(0 12px 14px rgb(104 112 118 / 0.1));
    */
  transition: all 0.3s ease;

  border-radius: 14px;
  .card-header {
    display: flex;
    flex-direction: column;
    position: absolute;
    backdrop-filter: saturate(180%) blur(5px);
    background: rgba(255, 255, 255, 0.4);
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    bottom: 0px;
    z-index: 1;
    width: 100%;
    height: auto;
    padding: 0.75rem;
    display: flex;
    align-items: center;
    overflow: hidden;
    color: inherit;
    border-bottom-left-radius: 14px;
    border-bottom-right-radius: 14px;

    .anime-title {
      font-size: 0.875rem;
      cursor: pointer;
      padding: 2px 0px;
    }

    .anime-credit {
      font-size: 0.735rem;
    }

    .show-time {
      display: flex;
      font-size: 0.625rem;
    }
  }

  .card-img-container {
    position: relative;
    margin: 0px auto;
    overflow: hidden;
    width: 100%;
    height: 100%;
    max-width: 100%;
    transform: 250ms ease 0ms, opacity 200ms ease-in 0ms;

    img {
      display: block;
      max-width: 100%;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }

    .empty-img {
      background-color: #eaeaea;
    }
  }
}
</style>
