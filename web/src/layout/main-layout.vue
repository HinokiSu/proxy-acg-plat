<template>
  <div class="main-layout">
    <div class="right-content">
      <router-view></router-view>
      <right-footer></right-footer>
    </div>
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
  min-height: 100vh;
  margin: auto;
  display: flex;
  justify-content: center;
}
</style>
