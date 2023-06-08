<template>
  <div class="info-icon" :style="styles">
    <svg
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="InfoOutlinedIcon"
      title="InfoOutlined"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        fill="currentColor"
        d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
      ></path>
    </svg>
  </div>
</template>

<script lang="ts">
import inlineStyles from '@hooks/inline-styles'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InfoIcon',
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
