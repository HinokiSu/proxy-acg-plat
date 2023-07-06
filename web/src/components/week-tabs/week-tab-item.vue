<template>
  <div class="week-tab-item" :class="classes" @click="activeClick">
    <div class="week-name">
      {{ week?.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { TWeekItem } from '@interfaces/anime.types'
import { defineComponent, PropType, computed } from 'vue'

export default defineComponent({
  name: 'WeekTabItem',
  props: {
    week: Object as PropType<TWeekItem>
  },
  emits: ['click'],
  setup(props, { emit }) {
    const activeClick = () => {
      emit('click', props.week?.flag)
    }

    const classes = computed(() => [props.week?.status ? 'active' : ''])
    return { classes, activeClick }
  }
})
</script>

<style lang="less" scoped>
.week-tab-item {
  max-width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  padding-bottom: 4px;
  color: #687076;
  cursor: pointer;
  transition: all 0.3s ease-in;
  position: relative;
  &::after {
    position: absolute;
    content: '';
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 2px;
    border-radius: 6px;
    transform: scaleX(0.75);
    background-color: #111;
    transition: all 0.15s ease-in;
    opacity: 0;
  }
  .week-name {
    padding: 8px 12px;
    border-radius: 4px;
    transition: all 0.4s ease;
    text-align: center;
    &:hover {
      background: #eaeaea;
    }
  }

  &.active {
    &::after {
      opacity: 1;
    }
  }
}
</style>
