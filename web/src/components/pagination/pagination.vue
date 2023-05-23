<template>
  <div class="pagination">
    <div class="pagination-container">
      <div class="previous">
        <pre-icon @click="clickPre"></pre-icon>
      </div>
      <div class="page-select">
        <input
          class="page-input"
          type="text"
          value="1"
          @keyup.enter="enterInput"
        />
      </div>

      <div class="next">
        <next-icon @click="clickNext"></next-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import PreIcon from './pre-icon.vue'
import NextIcon from './next-icon.vue'
export default defineComponent({
  name: 'Pagination',
  components: {
    PreIcon,
    NextIcon
  },
  props: {
    curpage: Number
  },
  emits: ['pre', 'next', 'enter-input'],
  setup(props, { emit }) {
    const paginRef = reactive({
      curPage: props.curpage
    })
    const clickPre = () => {
      emit('pre')
    }
    const clickNext = () => {
      emit('next')
    }
    const enterInput = () => {
      emit('enter-input')
    }
    return {
      clickPre,
      clickNext,
      enterInput,
      paginRef
    }
  }
})
</script>

<style lang="less" scoped>
.pagination {
  width: 100%;
  margin: 20px 0px 20px 0px;
}

.pagination-container {
  display: flex;
  justify-content: center;

  .previous,
  .next {
    width: 20px;
    height: 30px;
    color: var(--acg-a-color);
    cursor: pointer;
    &:hover {
      color: var(--acg-a-hover-color);
    }
  }

  .previous {
  }

  .page-select {
    margin: 0px 10px;
    .page-input {
      border: 1px solid #eaeaea;
      padding: 2px 0;
      width: 36px;
      text-align: center;
      border-radius: 4px;
      transition: all 0.3s ease;

      &:focus-visible {
        outline: 1px solid #11181c;
      }
    }
  }
}
</style>
