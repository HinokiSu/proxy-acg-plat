<template>
  <div class="acg-toast" :class="classes">
    <div class="toast__icon">
      <component :w="20" :h="20" :is="iconName"></component>
    </div>
    <div class="toast__msg">
      {{ msg }}
    </div>
  </div>
</template>

<script lang="ts">
type TColor = 'info' | 'success' | 'warning' | 'error'
import { computed, defineComponent, PropType } from 'vue'
import infoIcon from '@icons/toast-icons/info-icon.vue'
import successIcon from '@icons/toast-icons/success-icon.vue'
import warningIcon from '@icons/toast-icons/warning-icon.vue'
import errorIcon from '@icons/toast-icons/error-icon.vue'
export default defineComponent({
  name: 'AcgToast',
  components: {
    infoIcon,
    successIcon,
    warningIcon,
    errorIcon
  },
  props: {
    color: {
      type: String as PropType<TColor>,
      default: 'info'
    },
    msg: {
      type: String,
      default: 'Toast Message'
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  setup(props) {
    const classes = computed(() => ({
      [`${props.color}`]: true
    }))

    const iconName = computed(() => {
      return `${props.color}Icon`
    })

    // TODO: set timer delay close toast

    return { classes, iconName }
  }
})
</script>

<style lang="less" scoped>
.acg-toast {
  z-index: 1100;
  position: fixed;
  top: 5px;
  right: 1%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 24px;
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;
  animation: anim 0.8s ease;

  .toast {
    &__icon {
      padding-right: 4px;
    }

    &__msg {
      font-size: 0.875rem;
      max-width: max-content;
      border-radius: 4px;
      text-align: center;
    }
  }

  &.info {
    background: #e1efff;
    color: #0072f5;
  }

  &.success {
    background: var(--acg-bg-success);
    color: var(--acg-colors-success);
  }

  &.warning {
    background: var(--acg-bg-warning);
    color: var(--acg-colors-warning);
  }

  &.error {
    background: var(--acg-bg-error);
    color: var(--acg-colors-error);
  }
}

@keyframes anim {
  0% {
    transform: translateX(30px);
    opacity: 0;
  }

  60% {
    transform: translateX(-5px);
    opacity: 0.7;
  }

  100% {
    transform: translate(0px);
    opacity: 1;
  }
}
</style>
