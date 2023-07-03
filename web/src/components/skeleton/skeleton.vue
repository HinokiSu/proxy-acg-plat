<template>
  <div
    class="skeleton box-root"
    :style="styles"
    v-for="(_item, index) in num"
    :key="index"
  >
    <span class="skeleton-rectangular"> </span>
    <div class="skeleton-footer box-root">
      <span class="skeleton-text"></span>
      <span class="skeleton-text"></span>
      <span class="skeleton-text"></span>
    </div>
  </div>
</template>

<script lang="ts">
import inlineStyles from '@hooks/inline-styles'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Skeleton',
  props: {
    w: {
      type: String,
      default: '400px'
    },
    filling: {
      type: String,
      default: '40px'
    },
    num: {
      type: Number,
      default: 1
    }
  },
  setup(props) {
    const styles = inlineStyles({
      width: props.w,
      padding: props.filling
    })
    return { styles }
  }
})
</script>

<style lang="less" scoped>
.skeleton {
  width: 400px;
  margin: 10px 0;

  &-rectangular {
    display: block;
    width: 50%;
    height: 118px;
    background-color: rgba(0, 0, 0, 0.11);
    animation: animation-load 1.5s ease-in-out 0.5s infinite;
  }

  &-footer {
    padding-top: 4px;
  }

  &-text {
    display: block;
    background-color: rgba(0, 0, 0, 0.11);
    height: auto;
    margin-top: 0;
    margin-bottom: 0;
    transform-origin: 0 55%;
    transform: scale(1, 0.6);
    border-radius: 4px/6.7px;
    animation: animation-load 1.5s ease-in-out 0.5s infinite;

    &::before {
      content: '\00a0';
    }
    &:nth-child(1) {
      width: 100%;
    }
    &:nth-child(2) {
      width: 85%;
    }
    &:nth-child(3) {
      width: 70%;
    }
  }
}

@keyframes animation-load {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}
</style>
