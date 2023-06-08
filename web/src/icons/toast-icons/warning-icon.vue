<template>
  <div class="warning-icon" :style="styles">
    <svg
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="WarningAmberOutlinedIcon"
      title="WarningAmberOutlined"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        fill="currentColor"
        d="M12 5.99 19.53 19H4.47L12 5.99M12 2 1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"
      ></path>
    </svg>
  </div>
</template>

<script lang="ts">
import inlineStyles from '@hooks/inline-styles'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WarningIcon',
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
.warning-icon {
  cursor: pointer;
  color: inherit;
  background-color: inherit;
  transition: all 0.3s ease;
}
</style>
