<template>
  <div class="add-anime">
    <acg-button @click="AddAnimeHandle">
      <template #preIcon>
        <add-icon></add-icon>
      </template>
    </acg-button>
  </div>
  <acg-modal
    max-wd="600px"
    title="Create Anime"
    :visible="isVisible"
    confirm="Create"
    @confirm="confirmHandle"
    @cancel="cancelHandle"
  >
    <div class="add-modal__container">
      <acg-input
        label="Chinese Name"
        placeholder="Chinese name"
        v-model:value="anime.zh_name"
      ></acg-input>
      <acg-input
        label="Japanese Name"
        placeholder="Japanese name"
        v-model:value="anime.ja_name"
      ></acg-input>
      <acg-input
        label="English Name"
        placeholder="English name"
        v-model:value="anime.en_name"
      ></acg-input>
      <acg-input
        label="Credit"
        placeholder="Anime Company"
        v-model:value="anime.credit"
      ></acg-input>
      <div class="anime-pick-time">
        <div class="anime-time start-date">
          <span> Start playing date</span>
          <date-picker
            way="datetime-local"
            v-model:value="playDateRef.start"
          ></date-picker>
        </div>
        <div class="anime-time end-date">
          <span>End playing date</span>
          <date-picker
            way="datetime-local"
            v-model:value="playDateRef.end"
          ></date-picker>
        </div>
      </div>
    </div>
  </acg-modal>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, ref } from 'vue'
import AcgButton from '@components/button/index.vue'
import AddIcon from '@icons/add-icon.vue'
import AcgModal from '@components/modal/modal.vue'
import { storeToRefs } from 'pinia'
import { useAnimeStore } from '@stores/anime.store'
import AcgInput from '@components/input/index.vue'
import getNowISO from '@utils/getNowISO'
import dayjs from 'dayjs'
import DatePicker from '@components/date-picker/date-picker.vue'
import { getFormattedDate } from '@utils/getFmtDate'
export default defineComponent({
  name: 'AddAnime',
  components: {
    AcgButton,
    AddIcon,
    AcgModal,
    AcgInput,
    DatePicker
  },
  setup() {
    const { anime, quarter } = storeToRefs(useAnimeStore())
    const animeStore = useAnimeStore()
    const { proxy } = getCurrentInstance() as any

    const playDateRef = reactive({
      start: getFormattedDate(quarter.value),
      end: getFormattedDate(quarter.value, 'YYYY-MM-DDTHH:mm:ss', {
        step: 3,
        unit: 'month'
      })
    })
    const isVisible = ref(false)

    const changeVisible = () => {
      isVisible.value = !isVisible.value
      animeStore.clearAnime()
    }
    const confirmHandle = async () => {
      if (!anime.value.ja_name)
        return proxy.$toast({
          color: 'error',
          msg: `Error: Anime japanese name isn't empty!`
        })
      if (!playDateRef.start) {
        return proxy.$toast({
          color: 'error',
          msg: `Error: Anime start date isn't empty!`
        })
      }
      console.log(dayjs(playDateRef.start) >= dayjs(playDateRef.end))
      if (dayjs(playDateRef.start) >= dayjs(playDateRef.end)) {
        return proxy.$toast({
          color: 'error',
          msg: `Error: Anime start date not > end date!`
        })
      }
      anime.value.create_at = getNowISO()
      anime.value.start_date = getFormattedDate(
        playDateRef.start,
        'YYYY/MM/DD HH:mm:ss'
      )
      anime.value.end_date = getFormattedDate(
        playDateRef.end,
        'YYYY/MM/DD HH:mm:ss'
      )
      anime.value.start_week = dayjs(anime.value.start_date).get('day')

      await animeStore.createNewAnime().then(() => {
        proxy.$toast({
          color: 'success',
          msg: `Anime create successfully!`
        })
      })
      animeStore.getQuarterAnime()
      changeVisible()
    }

    const AddAnimeHandle = () => {
      changeVisible()
    }
    const cancelHandle = () => {
      changeVisible()
    }
    return {
      isVisible,
      anime,
      playDateRef,
      AddAnimeHandle,
      confirmHandle,
      cancelHandle
    }
  }
})
</script>

<style lang="less" scoped>
.add-anime {
  padding: 2px;
}

.add-modal__container {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  padding: 0 10px;

  .anime-pick-time {
    display: flex;
    flex-direction: row;
    padding-top: 8px;
    margin-left: -10px;
    justify-content: space-between;
    @media screen and (max-width: 600px) {
      flex-direction: column;
      justify-content: none;
      row-gap: 8px;
      align-items: flex-start;
    }
    .anime-time {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      span {
        padding-left: 20px;
        font-family: inherit;
        font-size: 0.625rem;
      }
    }
  }
}
</style>
