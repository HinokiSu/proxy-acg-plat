<template>
  <div class="acg-img" :style="styles" :class="loading ? 'loading' : ''">
    <span class="img-skeleton"> </span>
    <img class="img-main" :src="src" />
  </div>
</template>

<script lang="ts">
import inlineStyles from '@hooks/inline-styles'
import { defineComponent, ref, watchEffect } from 'vue'

export default defineComponent({
  name: 'AcgImg',
  props: {
    src: {
      type: String,
      require: true
    },
    maxH: {
      type: String,
      default: '200px'
    }
  },
  setup(props) {
    const loading = ref(true)
    const styles = inlineStyles({
      'max-height': props.maxH
    })

    watchEffect(() => {
      if (!props.src) {
        loading.value = true
      } else {
        setTimeout(() => {
          loading.value = false
        }, 1000)
      }
    })

    return {
      loading,
      styles
    }
  }
})
</script>

<style lang="less" scoped>
.acg-img {
  width: 100%;

  .img-skeleton {
    background-color: rgba(0, 0, 0, 0.11);
    min-height: 200px;
    min-width: 300px;
    visibility: hidden;
    animation: animation-load 1.5s ease-in-out 0.5s infinite;

    transition: all 1s ease;
  }

  .img-main {
    display: block;
    margin-bottom: 8px;
    max-height: 200px;
    max-width: 400px;
    object-fit: contain;
    visibility: visible;
    transition: all 0.6s ease;
  }

  &.loading {
    .img-skeleton {
      display: block;
      min-height: 200px;
      visibility: visible;
    }

    .img-main {
      visibility: hidden;
    }
  }
}

@keyframes animation-load {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}
</style>
