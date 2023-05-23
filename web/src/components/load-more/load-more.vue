<template>
  <div class="load-more-wrapper">
    <div class="load-more-container" v-if="!over">
      <div v-if="!propsRef.loading" class="load-more-button" @click="clickEmit">
        <span>Load More</span>
      </div>
      <div v-else class="load-more-loading">
        <span>
          Loading
          <dot-loading class="dot-loading-body" color="#FFD6F3"></dot-loading>
        </span>
      </div>
    </div>
    <div v-else class="loaded-over">Loaded over</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import DotLoading from '@components/dot-loading/dot-loading.vue'
export default defineComponent({
  name: 'LoadMore',
  components: {
    DotLoading
  },
  props: {
    loading: Boolean,
    over: Boolean
  },
  emits: ['click'],
  setup(props, { emit }) {
    const propsRef = computed(() => props)
    const clickEmit = () => {
      emit('click')
    }
    return { propsRef, clickEmit }
  }
})
</script>

<style lang="less" scoped>
.load-more {
  &-wrapper {
    width: 100%;
    padding: 12px 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &-button {
    padding: 8px 12px;
    border: 1px solid #eaeaea;
    border-radius: 8px;
    transition: all 0.4s ease;
    cursor: pointer;
    font-size: 1rem;
    color: #889096;
    &:hover {
      border-color: #ffd6f3;
      color: #687076;
    }
  }

  &-loading {
    position: relative;

    color: #ffa3e5;
    font-size: 1rem;
    .dot-loading-body {
      width: 40px;
    }
  }
}

.loaded-over {
  font-size: 1rem;
  color: #889096;
}
</style>
