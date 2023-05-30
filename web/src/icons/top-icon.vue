<template>
  <div class="top-icon" :style="styles">
    <svg
      class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-zjt8k"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="NavigationOutlinedIcon"
      title="NavigationOutlined"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        fill="currentColor"
        d="m12 7.27 4.28 10.43-3.47-1.53-.81-.36-.81.36-3.47 1.53L12 7.27M12 2 4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z"
      ></path>
    </svg>
  </div>
</template>

<script lang="ts">
import inlineStyles from '@hooks/inline-styles'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TopIcon',
  props: {
    w: {
      type: Number,
      default: 30
    },
    h: {
      type: Number,
      default: 30
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
.top-icon {
  cursor: pointer;
  color: inherit;
  border-radius: 50%;
  background-color: inherit;
}
</style>
