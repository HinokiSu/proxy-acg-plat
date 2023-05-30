<template>
  <div class="side-bar">
    <menus></menus>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Menus from '@components/menu/menus.vue'
export default defineComponent({
  name: 'SideBar',
  components: {
    Menus
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.side-bar {
  position: fixed;
  top: 30%;
  z-index: 200;
}
</style>
