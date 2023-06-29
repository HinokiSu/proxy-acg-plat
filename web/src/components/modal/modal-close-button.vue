<template>
  <button aria-label="Close" class="modal-close-button" type="button">
    <svg
      class="modal-close-icon-svg"
      @click="clickHandle"
      fill="none"
      height="18"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      width="18"
      aria-hidden="true"
    >
      <path d="M18 6L6 18M6 6l12 12"></path>
    </svg>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ModalCloseButton',
  emits: ['click'],
  setup(_props, { emit }) {
    const clickHandle = () => {
      emit('click')
    }
    return {clickHandle}
  }
})
</script>

<style lang="less" scoped>
.modal-close-button {
  position: absolute;
  background: transparent;
  border: none;
  z-index: 100;
  top: 0.375rem;
  right: 0.25rem;
  margin: 0px;
  display: inline-flex;
  align-items: center;
  height: auto;
  cursor: pointer;
  box-sizing: border-box;
  transition: all 250ms ease;
  padding: calc(0.75rem * 0.5);
  color: #d7dbdf;
  border-radius: 0.625rem;
  .modal-close-icon-svg {
    width: 24px;
    height: 24px;
  }
}
</style>
