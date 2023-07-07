<template>
  <skeleton w="100%" v-if="loading" :num="2"></skeleton>
  <div v-else class="update-anime__body">
    <div class="update-anime__header">
      <div class="pick-date-box">
        <date-picker v-model:value="datePickerVal"></date-picker>
        <acg-button
          title="Go!"
          @click="searchAnimeHandler"
          color="primary"
        ></acg-button>
      </div>
      <add-anime></add-anime>
    </div>
    <div class="anime-list">
      <anime-list-card-item
        v-for="item in dataSource"
        :key="item._id"
        :anime="item"
        @modify="modifyHandle"
      ></anime-list-card-item>
    </div>
  </div>
  <acg-modal
    title="Update Anime Info"
    max-wd="800px"
    :visible="isVisible"
    @confirm="confirmHandle"
    @cancel="cancelHandle"
  >
    <div class="anime-modify__form">
      <div class="form__modify-img">
        <div class="origin-modify" v-if="animeModalRef.img">
          <acg-img :src="animeModalRef.img"></acg-img>
          <acg-button
            v-show="animeModalRef.img"
            title="Delete"
            color="error"
            @click="deleteImgHandle"
          ></acg-button>
        </div>
        <file-upload
          v-else
          class="upload-area"
          max-size="2MB"
          @submit="submitImg"
        ></file-upload>
      </div>
      <div class="form__name-container">
        <div class="name__zh">
          <acg-input
            label="Chinese Name"
            placeholder="Simplified Chinese name"
            v-model:value="animeModalRef.zh_name"
          ></acg-input>
        </div>
        <div class="name__ja">
          <acg-input
            label="Japanese Name"
            placeholder="Japanese name"
            v-model:value="animeModalRef.ja_name"
          ></acg-input>
        </div>
        <div class="name__en">
          <acg-input
            label="English Name"
            placeholder="English name"
            v-model:value="animeModalRef.en_name"
          ></acg-input>
        </div>
      </div>
    </div>
  </acg-modal>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  getCurrentInstance
} from 'vue'
import { useAnimeStore } from '@stores/anime.store'
import AnimeListCardItem from '@components/list/anime-list-card-item.vue'
import AcgModal from '@components/modal/modal.vue'
import FileUpload from '@components/file-upload/file-upload.vue'
import AcgInput from '@components/input/index.vue'
import { storeToRefs } from 'pinia'
import DatePicker from '@components/date-picker/date-picker.vue'
import AcgButton from '@components/button/index.vue'
import dayjs from 'dayjs'
import getCurrentQuarter from '@utils/getCurrentQuarter'
import Skeleton from '@components/skeleton/skeleton.vue'
import AcgImg from '@components/acg-img/acg-img.vue'
import AddAnime from './add-anime.vue'
export default defineComponent({
  name: 'UpdateAnime',
  components: {
    AcgModal,
    AnimeListCardItem,
    FileUpload,
    AcgInput,
    AcgButton,
    DatePicker,
    Skeleton,
    AcgImg,
    AddAnime
  },
  setup() {
    const isVisible = ref(false)
    const { proxy } = getCurrentInstance() as any
    const loading = ref(true)
    const { anime: animeModalRef, quarter: datePickerVal } = storeToRefs(
      useAnimeStore()
    )
    const setVisible = () => {
      isVisible.value = !isVisible.value
    }
    const animeStore = useAnimeStore()

    const dataSource = computed(() => animeStore.animeList)

    const getDataAndWait = async () => {
      loading.value = true
      await animeStore.getQuarterAnime().then(() => {
        setTimeout(() => {
          loading.value = false
        }, 400)
      })
    }

    // Modify Modal
    const modifyHandle = async (val: any) => {
      // get anime data for modal
      animeModalRef.value = await animeStore.getAnimeById(val)
      setVisible()
    }

    // modal confirm button
    const confirmHandle = async () => {
      const fetchRes = await animeStore.updateAnime()
      if (!fetchRes) {
        proxy.$toast({
          color: 'error',
          msg: `Error: Update Anime failed`
        })
      }

      proxy.$toast({
        color: 'success',
        msg: `Update Anime successfully`
      })
      await getDataAndWait()
      setTimeout(() => {
        setVisible()
        animeStore.clearAnime()
      }, 500)
    }

    // modal cancel button
    const cancelHandle = () => {
      setVisible()
      animeStore.clearAnime()
    }

    // submit image button
    const submitImg = async (val: File) => {
      const filename = await animeStore.uploadImg(val)
      if (!filename) {
        return proxy.$toast({
          color: 'error',
          msg: `Error: image file upload failed`
        })
      }
      // TODO: Modify file location
      animeModalRef.value.img = filename
    }

    // delete image button
    const deleteImgHandle = async () => {
      // TODO: anime store to delete img
      const result = await animeStore.updateAnimeImg(
        '',
        animeModalRef.value._id
      )
      if (!result) {
        animeModalRef.value.img = ''
        return proxy.$toast({
          color: 'error',
          msg: `Error: Anime image updated failed`
        })
      }
      proxy.$toast({
        color: 'success',
        msg: `Info: Anime image updated successfully`
      })
      // setVisible()

      animeStore.anime.img = ''
    }

    const searchAnimeHandler = async () => {
      await getDataAndWait()
    }

    onMounted(() => {
      datePickerVal.value = dayjs(getCurrentQuarter()).format('YYYY-MM')
      getDataAndWait()
    })

    onUnmounted(() => {
      animeStore.clearState()
    })
    return {
      isVisible,
      loading,
      dataSource,
      animeModalRef,
      datePickerVal,
      setVisible,
      modifyHandle,
      confirmHandle,
      cancelHandle,
      submitImg,
      searchAnimeHandler,
      deleteImgHandle
    }
  }
})
</script>

<style lang="less" scoped>
.update-anime {
  &__body {
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .pick-date-box {
      display: flex;
      align-items: center;
    }
  }
}
.anime-list {
  //   width: 100%;
  list-style: none;
  column-gap: 0;
  padding: 0;
  column-count: 3;
  margin-bottom: 20%;

  @media screen and (max-width: 1200px) {
    column-count: 3;
  }
  @media screen and (max-width: 950px) {
    column-count: 2;
  }

  @media screen and (max-width: 750px) {
    column-count: 2;
  }

  @media screen and (max-width: 700px) {
    column-count: 1;
  }
}

.anime-modify__form {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 8%;
  padding-left: 14px;
  padding-right: 14px;

  .form__modify-img {
    .origin-modify {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .upload-area {
      min-height: 200px;
    }
  }

  .form__name-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 20px;
    width: 80%;

    div {
      width: 100%;
    }
  }
}
</style>
