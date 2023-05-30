<template>
  <div class="menu-item" :class="classes" @click="goTo">
    <div class="menu-item-icon">
      <component :is="item!.icon" />
    </div>
    <div class="menu-item-title">
      {{ item?.title }}
    </div>
  </div>
</template>

<script lang="ts">
import { TMenuItem } from '@interfaces/menu.types'
import { computed, defineComponent, PropType } from 'vue'
import ForeverRingIcon from '@icons/forever-ring-icon.vue'
import MovieIcon from '@icons/movie-icon.vue'
export default defineComponent({
  name: 'MenuItem',
  components: {
    ForeverRingIcon,
    MovieIcon
  },
  props: {
    item: Object as PropType<TMenuItem>,
    collapse: Boolean
  },
  emits: ['go'],
  setup(props, { emit }) {
    const goTo = () => {
      emit('go', {
        name: props.item?.routeName,
        key: props.item?.key
      })
    }

    const classes = computed(() => [
      props.item?.status ? 'active' : '',
      props.collapse ? 'collapse' : ''
    ])

    return { classes, goTo }
  }
})
</script>

<style lang="less" scoped>
@--menu-font-color: #11181c;
@--menu-hover-color: #fff0fb;
@--menu-bg-color: #fff;
@--menu-bg-color-active: #ffe5f8;
.menu-item {
  padding: 10px 12px;
  text-align: center;
  background-color: @--menu-bg-color;
  border-radius: 0px 4px 4px 0px;
  cursor: pointer;
  transition: all 0.5s ease;
  color: #889096;
  font-size: 0.9rem;
  border: 1px solid #eaeaea;
  box-shadow:  0px 6px 30px 4px #eaeaea;

  display: flex;
  flex-direction: row;
  align-items: center;

  &-icon {
    padding-right: 4px;
  }

  &-title {
    transition: all 0.4s ease;
  }

  &:hover {
    background-color: @--menu-hover-color;
    color: #11181c;
  }

  &.active {
    // background-color: @--menu-bg-color-active;
    background: linear-gradient(90deg, #ffe5f8, #ffd6f3, #ffc2ee);
    border-color: #eaeaea;
    color: #11181c;
  }

  &.collapse {
    .menu-item-title {
      display: none;
    }
  }
}
</style>
