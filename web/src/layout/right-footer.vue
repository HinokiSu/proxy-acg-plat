<template>
  <footer class="right-footer">
    Created by <a href="https://github.com/HinokiSu">Hinoki </a>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RightFooter',
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.right-footer {
  position: absolute;
  right: 8px;
  bottom: 2px;
  font-size: 0.8rem;
  color: #7e868c;
}
</style>
