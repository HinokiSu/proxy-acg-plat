<template>
  <footer class="right-footer">
    <span> Origin from <a href="https://bangumi.moe/">bangumi.moe</a> </span>
    <span>
      Created by
      <a href="https://github.com/HinokiSu">Hinoki</a>
    </span>
    <auth-page></auth-page>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AuthPage from '@views/admin/auth.vue'
export default defineComponent({
  name: 'RightFooter',
  components: {
    AuthPage
  },
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
  font-size: 0.725rem;
  color: #889096;
  z-index: 900;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  a {
    color: #ffa3e5;
  }
}
</style>
