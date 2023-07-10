<template>
  <div class="delete-icon" :style="styles">
    <svg
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="DeleteOutlinedIcon"
      title="DeleteOutlined"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        fill="currentColor"
        d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"
      ></path>
    </svg>
  </div>
</template>

<script lang="ts">
import inlineStyles from '@hooks/inline-styles'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DeleteIcon',
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
.delete-icon {
  cursor: pointer;
  color: inherit;
  background-color: inherit;
  transition: all 0.3s ease;
}
</style>
