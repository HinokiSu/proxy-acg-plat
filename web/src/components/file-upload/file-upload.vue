<template>
  <div class="file-upload">
    <label v-show="!fileRef.isUploaded" class="upload-input">
      <input type="file" @change="handleFileChange($event)" />
      Upload
    </label>
    <div v-if="fileRef.isUploaded" class="file-upload__preview">
      <img :src="fileRef.url" alt="" class="file-img" />
      <div class="file-name">
        {{ fileRef.name }}
      </div>
      <div class="file__feature">
        <acg-button
          :w="'24px'"
          h="2rem"
          :fill-wd="'4px'"
          color="primary"
          title="Submit"
          @click="submitHandle"
        ></acg-button>
        <acg-button
          title="Reset"
          :w="'24px'"
          h="2rem"
          :fill-wd="'4px'"
          color="warning"
          @click="resetHandle"
        ></acg-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  reactive,
  ref
} from 'vue'
import AcgButton from '@components/button/index.vue'
export default defineComponent({
  name: 'FileUpload',
  components: {
    AcgButton
  },
  props: {
    maxSize: {
      type: String,
      default: '1MB',
      required: true
    },

    accept: {
      type: Array<string>,
      default: ['jpg', 'jpeg', 'png', 'gif']
    }
  },
  emits: ['submit'],
  setup(props, { emit }) {
    const initFileRes = () => ({
      name: '',
      size: 0,
      type: '',
      fileExtension: '',
      url: '',
      isImage: false,
      isUploaded: false
    })
    let file: File | null
    const fileRef = ref(initFileRes())
    const isLoading = ref(false)
    const uploadRead = ref(true)
    const resetHandle = () => {
      fileRef.value = initFileRes()
      file = null
    }

    const { proxy } = getCurrentInstance() as any
    const maxSizeRef = computed(() => {
      if (props.maxSize.includes('MB') || props.maxSize.includes('mb')) {
        const size =
          Number.parseFloat(props.maxSize.replace(/mb/gi, '')) * 1024 * 1024
        return size
      }
      if (props.maxSize.includes('KB') || props.maxSize.includes('kb')) {
        const size = Number.parseFloat(props.maxSize.replace(/kb/gi, '')) * 1024
        return size
      }
      console.log('Error: Max Size props is InValid')
      return 0
    })

    const errorsRef = reactive<Array<string>>([])

    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      if (target.files && target.files[0]) {
        // Get file
        file = target.files[0]

        if (!isFileValid(file)) {
          return proxy.$toast({
            color: 'error',
            duration: 5000,
            msg: `Error: ${errorsRef.join(',')}`
          })
        }

        fileRef.value.size = Math.round((file.size / 1024) * 100) / 10
        fileRef.value.fileExtension = file.name.split('.').pop() || ''
        fileRef.value.name = file.name || ''
        fileRef.value.isImage = props.accept.includes(
          fileRef.value.fileExtension
        )
        let reader = new FileReader()
        reader.addEventListener(
          'load',
          () => {
            fileRef.value.url = reader.result as string
            fileRef.value.isUploaded = true
          },
          false
        )
        reader.readAsDataURL(file)
        // uploadImg()
      }
    }

    /* valid */
    const isFileSizeValid = (fileSize: number) => {
      if (fileSize <= maxSizeRef.value) {
        console.log(`Valid: File size valid success`)
      } else {
        errorsRef.push(`File size should be less than [${props.maxSize}]`)
      }
    }

    const isFileTypeValid = (extension: string) => {
      if (props.accept.includes(extension)) {
        console.log(`Valid: File extension valid success`)
      } else {
        errorsRef.push(`File type should be ${props.accept}`)
      }
    }

    const isFileValid = (file: File) => {
      isFileSizeValid(file.size)
      isFileTypeValid(file.name.split('.').pop() || '')
      if (errorsRef.length === 0) return true
      return false
    }

    const submitHandle = () => {
      emit('submit', file)
    }
    return {
      fileRef,
      isLoading,
      uploadRead,
      submitHandle,
      resetHandle,
      handleFileChange
    }
  }
})
</script>

<style lang="less" scoped>
.file-upload {
  min-width: 200px;
  width: 100%;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  border: 2px dashed #ccc;

  .upload-input {
    min-width: max-content;
    height: 2rem;
    position: relative;
    text-align: center;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    cursor: pointer;
    padding-left: 16px;
    padding-right: 16px;
    background: transparent;
    color: #7e868c;
    transform: none;
    border: 2px solid #d7dbdf;
    border-radius: 12px;
    font-size: 0.875rem;
    font-weight: 500;

    transition: background 0.25s ease 0s, color 0.25s ease 0s,
      border-color 0.25s ease 0s, box-shadow 0.25s ease 0s,
      transform 0.25s ease 0s, opacity 0.25s ease 0s;

    &:hover {
      color: #111;
      border-color: #7e868c;
    }
    input {
      display: none;
    }
  }

  &__preview {
    display: flex;
    flex-direction: column;
    align-items: center;
    .file-img {
      width: 100%;
      height: 200px;
      object-fit: contain;
    }

    .file-name {
      font-size: 0.625rem;
    }

    .file__feature {
      padding-top: 10px;
      display: flex;
    }
  }
}
</style>
