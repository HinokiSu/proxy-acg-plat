<template>
  <div class="to-top" :class="isTop ? 'active' : 'inactive'" @click="backTop">
    <top-icon :w="36" :h="36" class="icon"></top-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import TopIcon from '@icons/top-icon.vue'
export default defineComponent({
  name: 'ToTop',
  components: {
    TopIcon
  },
  setup() {
    const isTop = ref(false)
    const backTop = () => {
      let top = document.documentElement.scrollTop //获取点击时页面的滚动条纵坐标位置
      const timeTop = setInterval(() => {
        document.documentElement.scrollTop = top -= 50 //一次减50往上滑动
        if (top <= 0) {
          clearInterval(timeTop)
        }
      }, 5) //定时调用函数使其更顺滑
    }
    const handleScroll = () => {
      if (document.documentElement.scrollTop > 20) {
        isTop.value = true
      } else {
        isTop.value = false
      }
      //往下滑超过20则显示 否则则不显示按钮
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      isTop,
      backTop
    }
  }
})
</script>

<style lang="less" scoped>
.to-top {
  position: fixed;
  right: 10px;
  bottom: 8%;

  .icon {
    color: #c1c8cd;
    border-radius: 50%;
    background-color: #f1f3f5;
    opacity: 0.9;
    transition: all 0.4s ease-out;
    padding: 4px;
    &:hover {
      color: #5ea2ef;
      background-color: #edf5ff;
    }
  }
}
</style>
