<template>
  <div class="error-icon" :style="styles">
    <svg
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="HighlightOffOutlinedIcon"
      title="HighlightOffOutlined"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        fill="currentColor"
        d="M14.59 8 12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
      ></path>
    </svg>
  </div>
</template>

<script lang="ts">
import inlineStyles from '@hooks/inline-styles'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ErrorIcon',
  props: {
    w: {
      type: Number,
      default: 24
    },
    h: {
      type: Number,
      default: 24
    }
  },
  setup(props) {
    const styles = inlineStyles({
      width: `${props.w}px`,
      height: `${props.h}px`
    })
    return {
      styles
    }
  }
})
</script>

<style lang="less" scoped>
.error-icon {
  cursor: pointer;
  color: inherit;
  background-color: inherit;
  transition: all 0.3s ease;
}
</style>
