<template>
  <div class="main-layout">
    <div class="left-sidebar"></div>
    <div class="right-content">
      <router-view></router-view>
    </div>
    <right-footer></right-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RightFooter from './right-footer.vue'
export default defineComponent({
  name: 'MainLayout',
  components: {
    RightFooter
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.main-layout {
  width: inherit;
  position: relative;
}
.right-content {
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: center;
}
</style>
