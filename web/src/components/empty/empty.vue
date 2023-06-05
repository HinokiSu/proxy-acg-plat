<template>
  <div class="empty">
    {{ tips }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Empty',
  props: {
    tips: {
      type: String,
      default: 'Empty'
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.empty {
    margin: auto;
}
</style>
