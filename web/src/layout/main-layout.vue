<template>
  <div class="main-layout">
    <side-bar></side-bar>
    <div class="right-content">
      <router-view></router-view>
      <right-footer></right-footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue'
import RightFooter from './right-footer.vue'
import sideBar from './side-bar/side-bar.vue'
import { useMenuStore } from '@stores/menu.store'
export default defineComponent({
  name: 'MainLayout',

  components: {
    RightFooter,
    sideBar
  },
  setup() {
    const menuStore = useMenuStore()
    onMounted(() => {
      menuStore.getMenuList()
    })

    onUnmounted(() => {
      menuStore.clearState()
    })
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

  @media (max-width: 500px) {
    width: 100%;
  }
}
</style>
