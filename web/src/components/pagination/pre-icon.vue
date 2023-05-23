<template>
  <span>
    <svg
      class="pre-icon pagination-icon"
      fill="none"
      focusable="false"
      role="presentation"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.5 19l-7-7 7-7"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      ></path>
    </svg>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PreIcon',
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.pre-icon {
  z-index: 200;
}
</style>
