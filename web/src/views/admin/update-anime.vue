<template>
  <div class="update-anime-body">
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
      <file-upload
        class="upload-area"
        max-size="2MB"
        @submit="submitImg"
      ></file-upload>
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
export default defineComponent({
  name: 'UpdateAnime',
  components: {
    AcgModal,
    AnimeListCardItem,
    FileUpload,
    AcgInput
  },
  setup() {
    const isVisible = ref(false)
    const { proxy } = getCurrentInstance() as any
    const setVisible = () => {
      isVisible.value = !isVisible.value
    }
    const animeStore = useAnimeStore()
    const { anime: animeModalRef } = storeToRefs(useAnimeStore())

    const dataSource = computed(() => animeStore.animeList)

    const modifyHandle = async (val: any) => {
      animeModalRef.value = await animeStore.getAnimeById(val)
      setVisible()
    }

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
      setTimeout(() => {
        setVisible()
      }, 500)
    }

    const cancelHandle = () => {
      setVisible()
    }

    const submitImg = async (val: File) => {
      const filename = await animeStore.uploadImg(val)
      if (!filename) {
        return proxy.$toast({
          color: 'error',
          msg: `Error: image file upload failed`
        })
      }
      animeModalRef.value.img = `https://yukihinoki.top/images/${filename}`
    }
    onMounted(() => {
      animeStore.getQuarterAnime('2023/04/01')
    })

    onUnmounted(() => {
      animeStore.clearState()
    })
    return {
      isVisible,
      dataSource,
      animeModalRef,
      setVisible,
      modifyHandle,
      confirmHandle,
      cancelHandle,
      submitImg
    }
  }
})
</script>

<style lang="less" scoped>
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

  .upload-area {
    min-height: 200px;
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
