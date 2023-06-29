<template>
  <div class="menus wrapper">
    <div class="menu-control-icon" @click="changeCollapseStatus">
      <menu-icon></menu-icon>
    </div>
    <div class="menus-list">
      <menu-item
        v-for="item in menusRef"
        :key="item.key"
        :item="item"
        :collapse="isCollapse"
        @go="clickItem"
      ></menu-item>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue'
import MenuItem from './menu-item.vue'
import { useMenuStore } from '@stores/menu.store'
import { useRouter } from 'vue-router'
import MenuIcon from '@icons/menu-icon.vue'
export default defineComponent({
  name: 'Menus',
  components: {
    MenuItem,
    MenuIcon
  },
  setup() {
    const router = useRouter()
    const menuStore = useMenuStore()
    const menusRef = computed(() => menuStore.menuList)
    const isCollapse = ref(false)
    const clickItem = (val: any) => {
      // change menu item status
      menuStore.changeMenuItemStatus(val.key)
      sessionStorage.setItem('menu_key', val.key)
      router.push({
        name: val.name
      })
    }

    const changeCollapseStatus = () => {
      isCollapse.value = !isCollapse.value
    }

    onMounted(() => {
      menuStore.getMenuList()
      const menuKey = menuStore.getMenuKey
      menuStore.changeMenuItemStatus(menuKey)
    })

    onUnmounted(() => {
      menuStore.clearState()
    })

    return {
      menusRef,
      isCollapse,
      clickItem,
      changeCollapseStatus
    }
  }
})
</script>

<style lang="less" scoped>
.menus {
  &.wrapper {
    // border: 1px solid #eaeaea;
    padding-right: 4px;
    border-radius: 8px;

    .menu-control-icon {
      background-color: #fff;

      cursor: pointer;
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #eaeaea;
      margin-bottom: 6px;
      color: #889096;
      display: flex;
      justify-content: center;
      // border-radius: 0px 4px 4px 0px;
      border-top-right-radius: 7px;
      border-bottom-right-radius: 7px;

      @media screen and(max-width:500px) {
        padding: 6px 8px;
      }
      &:hover {
        color: #11181c;
      }
    }
  }

  &-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 6px;
  }
}
</style>
