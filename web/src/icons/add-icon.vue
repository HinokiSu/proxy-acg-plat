<template>
  <div  class="add-icon" :style="styles">
    <svg
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="AddOutlinedIcon"
      title="AddOutlined"
    >
      <path  fill-rule="evenodd" clip-rule="evenodd" fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
    </svg>
  </div>
</template>

<script lang="ts">
import inlineStyles from '@hooks/inline-styles'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AddIcon',
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

<style lang="less" scoped></style>
