<template>
  <div class="anime-list-card-item">
    <div class="card__container">
      <div class="card__header">
        <empty-img></empty-img>
        <div class="anime__name">
          <div class="anime__ja-name">
            {{ anime?.ja_name }}
          </div>
          <div class="anime__zh-name">
            {{ anime?.zh_name }}
          </div>
        </div>
      </div>
      <div class="card__content">
        <div class="anime__credit">
          <span>Credit: </span>
          {{ anime?.credit }}
        </div>
        <div class="anime__showtime">
          <span>Schedule:</span>
          <span class="start-date">
            {{ anime?.start_date }}
          </span>

          <span>~</span>
          <span class="end-date">
            {{ anime?.end_date }}
          </span>
        </div>
      </div>
      <div class="card__footer">
        <acg-button fill-wd="6px" color="error" h="2.2rem" @click="clickHandle">
          <template #preIcon>
            <draw-icon></draw-icon>
          </template>
        </acg-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { TAnime } from '@interfaces/anime.types'
import { PropType, defineComponent } from 'vue'
import AcgButton from '@components/button/index.vue'
import DrawIcon from '@icons/draw-icon.vue'
import EmptyImg from '@components/empty/empty-img.vue'
export default defineComponent({
  name: 'AnimeListCardItem',
  props: {
    anime: Object as PropType<TAnime>
  },
  components: {
    AcgButton,
    DrawIcon,
    EmptyImg
  },
  emits: ['modify'],
  setup(props, { emit }) {
    const clickHandle = () => {
      emit('modify', props.anime?._id)
    }
    return {
      clickHandle
    }
  }
})
</script>

<style lang="less" scoped>
.anime-list-card-item {
  padding: 8px;

  break-inside: avoid;
}

.card {
  &__container {
    min-width: 300px;
    max-width: 400px;
    width: 100%;
    position: relative;
    margin: 0px;
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    color: #11181c;
    border-radius: 14px;
    background: #fff;
    box-sizing: border-box;

    transform: translate(0px);
    backface-visibility: hidden;
    outline: none;
    filter: drop-shadow(0 12px 24px rgb(104 112 118 / 0.15))
      drop-shadow(0 12px 14px rgb(104 112 118 / 0.1));
    transition: transform 0.25s ease 0s, filter 0.25s ease 0s,
      box-shadow 0.25s ease 0s;

    &:hover {
      & .card__footer {
        opacity: 1;
      }
    }
  }

  &__header {
    width: 100%;
    display: flex;
    flex-shrink: 0;
    z-index: 100;
    justify-content: flex-start;
    align-items: flex-start;
    overflow: hidden;
    color: inherit;
    padding: 0.75rem;
    img {
      width: 100px;
      height: 100%;
      overflow: hidden;
      object-fit: cover;
    }

    .anime__name {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      box-sizing: border-box;
      margin: 0px;
      width: 100%;

      .anime__ja-name {
        display: inherit;
        flex-grow: 0;
        margin: 0px;
      }

      .anime__zh-name {
        display: inherit;
        flex-basis: 100%;
        max-width: 100%;
        padding-top: 8px;
        font-size: 0.625rem;
        color: #687076;
      }
    }
  }

  &__content {
    padding: 4px 12px;
    width: 100%;
    height: auto;
    position: relative;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    flex-wrap: wrap;
    text-align: left;
    color: #11181c;
    font-size: 0.875rem;
    text-transform: none;
    font-weight: 400;
    row-gap: 2px;

    .anime__credit {
      span {
        font-weight: 500;
      }
    }

    .anime__showtime {
      span {
        &:nth-child(1) {
          padding-right: 4px;
          font-weight: 500;
        }

        &:nth-child(3) {
          padding: 0px 2px;
        }
      }
    }
  }

  &__footer {
    display: flex;
    padding: 2px 12px;
    justify-content: flex-end;
    align-items: center;
    color: #111;
    opacity: 0;
    transition: all 0.5s ease;
  }
}
</style>
