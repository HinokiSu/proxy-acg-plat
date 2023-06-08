<template>
  <div class="skeleton box-root">
    <span class="skeleton-rectangular"> </span>
    <div class="skeleton-footer box-root">
      <span class="skeleton-text"></span>
      <span class="skeleton-text"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Skeleton',
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.skeleton {
  width: 210px;
  margin-right: 4px;
  margin-top: 40px;
  margin-bottom: 40px;

  &-rectangular {
    display: block;
    width: 210px;
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

    &:nth-last-child(1) {
      width: 60%;
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
