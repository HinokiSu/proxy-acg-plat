<template>
  <div class="west-arrow-icon" :style="styles">
    <svg
      class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-zjt8k"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="WestOutlinedIcon"
      title="WestOutlined"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        fill="currentColor"
        d="m9 19 1.41-1.41L5.83 13H22v-2H5.83l4.59-4.59L9 5l-7 7 7 7z"
      ></path>
    </svg>
  </div>
</template>

<script lang="ts">
import inlineStyles from '@hooks/inline-styles'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WestArrowIcon',
  props: {
    w: {
      type: Number,
      default: 20
    },
    h: {
      type: Number,
      default: 20
    }
  },
  setup(props) {
    const styles = inlineStyles({
      width: `${props.w}px`,
      height: `${props.h}px`
    })
    return { styles }
  }
})
</script>

<style lang="less" scoped>
.west-arrow-icon {
  cursor: pointer;
  transition: all 0.3s ease;
  color: inherit;
  background-color: inherit;
}
</style>
