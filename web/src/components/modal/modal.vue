<template>
  <teleport to="body">
    <div class="acg-modal" v-if="visible">
      <div class="acg-modal-backdrop">
        <div class="acg-modal-backdrop__layer"></div>
        <div class="acg-modal-backdrop__content" :style="styles">
          <section class="acg-modal__wrapper">
            <modal-close-button @click="cancelClick"></modal-close-button>
            <div class="acg-modal__header">
              <span class="acg-modal-title">
                {{ title }}
              </span>
            </div>
            <div class="acg-modal__body">
              <slot></slot>
            </div>
            <div class="acg-modal-footer">
              <acg-button :title="cancel" @click="cancelClick"></acg-button>
              <acg-button
                color="secondary"
                :title="confirm"
                @click="confirmClick"
              ></acg-button>
            </div>
          </section>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AcgButton from '@components/button/index.vue'
import ModalCloseButton from '@components/modal/modal-close-button.vue'
import inlineStyles from '@hooks/inline-styles'
export default defineComponent({
  name: 'AcgModal',
  components: {
    AcgButton,
    ModalCloseButton
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Modal Title'
    },
    confirm: {
      type: String,
      default: 'Enter'
    },
    cancel: {
      type: String,
      default: 'Cancel'
    },
    maxWd: {
        type: String,
        default: '400px'
    }
  },
  emits: ['confirm', 'cancel'],
  setup(props, { emit }) {
    const confirmClick = () => {
      emit('confirm')
    }
    const cancelClick = () => {
      emit('cancel')
    }

    const styles = inlineStyles({
        'max-width': props.maxWd
    })

    return { styles,confirmClick, cancelClick }
  }
})
</script>

<style lang="less" scoped>
.acg-modal {
  &-backdrop {
    position: fixed;
    inset: 0px;
    overflow: hidden;
    z-index: 999;
    box-sizing: border-box;
    text-align: center;

    &::before {
      content: '';
      display: inline-block;
      width: 0px;
      height: 100%;
      vertical-align: middle;
    }

    &__layer {
      opacity: 1;
      backdrop-filter: saturate(180%) blur(20px);
      background: rgba(0, 0, 0, 0.1);

      animation-name: backdrop-layer-on, backdrop-layer-open;
      animation-duration: 0.2s;
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      position: fixed;
      inset: 0px;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
    }

    &__content {
    //   max-width: 400px;
      animation-name: backdrop-content-show;
      animation-duration: 200ms;
      animation-timing-function: ease-in;
      animation-direction: normal;

      position: relative;
      display: inline-block;
      z-index: 9999;
      outline: none;
      width: 100%;
      margin: 1.25rem auto;
      vertical-align: middle;
    }
  }

  &__wrapper {
    max-width: 100%;
    position: relative;
    vertical-align: middle;
    overflow: hidden;
    max-height: inherit;
    display: flex;
    outline: none;
    flex-direction: column;
    box-sizing: border-box;
    color: #000;
    border-radius: 14px;
    box-shadow: 0 12px 34px 6px rgb(104 112 118 / 0.18);
    background: #fff;

    animation-name: modal-wrapper-show;
    animation-duration: 200ms;
    animation-timing-function: ease-in;
    animation-direction: normal;
    animation-fill-mode: forwards;
  }

  &__header {
    padding: 12px 16px;
  }

  &__body {
    padding: 20px 16px;
  }

  &-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: wrap;
    // column-gap: 4px;
    overflow: hidden;
    padding: 0.75rem 1rem;
    font-size: 0.75rem;
    color: inherit;
  }
}

@keyframes backdrop-layer-on {
  0% {
    backdrop-filter: saturate(0%) blur(0px);
  }
}

@keyframes backdrop-layer-open {
  0% {
    opacity: 0;
  }
}

@keyframes backdrop-content-show {
  0% {
    opacity: 0;
  }
  60% {
    opacity: 0.75;
  }
  100% {
    opacity: 1;
  }
}

@keyframes modal-wrapper-show {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }

  60% {
    opacity: 0.75;
    transform: scale(1.02);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
