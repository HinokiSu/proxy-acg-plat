<template>
  <main-layout></main-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MainLayout from './layout/main-layout.vue'

export default defineComponent({
  name: 'App',
  components: {
    MainLayout
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less">

</style>
