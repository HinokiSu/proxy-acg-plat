<template>
  <div class="title-navigation">
    <router-link
      :to="{
        name: to
      }"
    >
      <div class="nav-container">
        <span>
          {{ title }}
        </span>
        <west-arrow-icon class="icon"></west-arrow-icon>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import WestArrowIcon from '@icons/west-arrow-icon.vue'
export default defineComponent({
  name: 'TitleNavigation',
  components: {
    WestArrowIcon
  },
  props: {
    title: String,
    to: String
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.title-navigation {
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .nav-container {
    display: flex;
    align-items: center;
    column-gap: 10px;
    color: #687076;
    padding: 4px 0;
    transition: all 0.3s ease;

    &:hover {
      span {
        color: #11181c;
      }
    }
    span {
      font-size: 0.9rem;
    }

    .icon {
      transform: rotate(180deg);
    }
  }
}
</style>
