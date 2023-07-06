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
  color: #f881ab;
  font-size: 1.2rem;
  padding: 1rem 1.2rem;
  // border: 1px solid #eaeaea;
  // border-radius: 1rem;
  cursor: pointer;
  text-align: center;
}
</style>
