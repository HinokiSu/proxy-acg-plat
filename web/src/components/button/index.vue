<template>
  <button
    class="acg-button"
    :disabled="isDisabled"
    @click="clickHandler"
    :class="classes"
    :style="styles"
  >
    <div
      class="button-prefix-icon"
      v-if="hasPreIconSlot"
      :class="isOnlyIcon ? 'only' : ''"
    >
      <slot name="preIcon"></slot>
    </div>
    <span v-if="!isOnlyIcon" class="acg-button__text">
      {{ title }}
    </span>
  </button>
</template>

<script lang="ts">
import inlineStyles from '@hooks/inline-styles'
import { PropType, computed, defineComponent } from 'vue'

type TColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'gradient'
export default defineComponent({
  name: 'AcgButton',
  props: {
    title: {
      type: String,
      default: ''
    },
    color: {
      type: String as PropType<TColor>,
      default: 'default'
    },
    w: {
      type: String,
      default: 'auto'
    },
    h: {
      type: String,
      default: '2.5rem'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    flat: {
      type: Boolean,
      default: false
    },
    fillWd: {
      type: String,
      default: '0.875rem'
    }
  },
  emits: ['click'],
  setup(props, { emit, slots }) {
    const propsRef = computed(() => props)
    const clickHandler = () => {
      emit('click')
    }
    const isDisabled = computed(() => props.disabled)
    const classes = computed(() => {
      const _a = []
      if (propsRef.value.disabled) {
        _a.push('is-disabled')
      } else {
        _a.push(propsRef.value.color)
      }
      if (propsRef.value.active) {
        _a.push('is-active')
      }
      if (propsRef.value.flat) {
        _a.push('flat')
      }
      return _a
    })

    const styles = inlineStyles({
      width: propsRef.value.w,
      height: propsRef.value.h,
      'padding-left': propsRef.value.fillWd,
      'padding-right': propsRef.value.fillWd
    })

    const isOnlyIcon = computed(() => {
      return propsRef.value.title === '' ? true : false
    })

    const hasPreIconSlot = computed(() => (slots.preIcon ? true : false))

    return {
      clickHandler,
      isOnlyIcon,
      styles,
      classes,
      isDisabled,
      hasPreIconSlot
    }
  }
})
</script>

<style lang="less" scoped>
@--acg-icon-bg: #777;
@--acg-icon-bg-hover: #111;
/* Reference to: NextUI */

/* Primary */
@--acg-bg-primary: #cee4fe;
@--acg-bg-primaryHover: #b7d5f8;
@--acg-colors-primary: #0072f5;

/* Secondary */
@--acg-bg-secondary: #eadcf8;
@--acg-bg-secondaryHover: #e0cbf5;
@--acg-colors-secondary: #7828c8;

@--acg-colors-text: #11181c;
@--acg-colors-border: rgb(0, 0, 0, 0.15);
@--acg-color-gradient: linear-gradient(
  112deg,
  #06b7db -63.59%,
  #ff4ecd -20.3%,
  #0072f5 70.46%
);
@--acg-fonts-sans: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI',
  'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
  'Helvetica Neue', sans-serif;

.acg-button {
  min-width: min-content;
  width: auto;

  padding-left: 0.875rem;
  padding-right: 0.875rem;

  height: 2.5rem;

  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  color: #fff;

  display: flex;
  align-items: center;
  justify-content: center;
  appearance: none;
  box-sizing: border-box;
  user-select: none;
  white-space: nowrap;
  transition: background 0.25s ease 0s, color 0.25s ease 0s,
    border-color 0.25s ease 0s, box-shadow 0.25s ease 0s,
    transform 0.25s ease 0s, opacity 0.25s ease 0s;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  pointer-events: auto;
  padding: 0px;

  border: none;
  border-radius: 12px;

  min-width: min-content;

  min-width: min-content;
  padding-left: 0.875rem;
  padding-right: 0.875rem;
  margin: 0.25rem;

  &.is-disabled {
    background: #efeef0;
    color: #7e868c;
    transform: none;
    box-shadow: none;
    pointer-events: none;
  }

  &.default {
    background: #eceef0;
    color: #7e868c;
    &:hover {
      background: #dfe3e6;
    }
  }

  &.primary {
    color: @--acg-colors-primary;
    background: @--acg-bg-primary;

    &:hover {
      background: @--acg-bg-primaryHover;
    }
  }

  &.gradient {
    padding: 2px;
    background-position: initial;
    background-size: initial;
    background-repeat: initial;
    background-attachment: initial;
    background-origin: initial;
    background-color: transparent;
    color: #444;
    background-clip: content-box, border-box;
    background-image: linear-gradient(#fff, #fff), @--acg-color-gradient;
    border: none;

    &:hover {
      background: @--acg-color-gradient;
      color: #fff;
    }

    &.is-active {
      background: @--acg-color-gradient;
      color: #fff;
    }
  }

  &.secondary {
    color: @--acg-colors-secondary;
    background: @--acg-bg-secondary;

    &:hover {
      background: @--acg-bg-secondaryHover;
    }
  }

  &.success {
    color: var(--acg-colors-success);
    background: var(--acg-bg-success);

    &:hover {
      background: var(--acg-bg-successHover);
    }
  }

  &.warning {
    color: var(--acg-colors-warning);
    background: var(--acg-bg-warning);

    &:hover {
      background: var(--acg-bg-warningHover);
    }
  }

  &.error {
    color: var(--acg-colors-error);
    background: var(--acg-bg-error);

    &:hover {
      background: var(--acg-bg-errorHover);
    }
  }
}

.button-prefix-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  z-index: 100;
  padding-left: 8px;
  &.only {
    padding: 0px;
  }
}

.acg-button__text {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding-left: 2px;
  padding-right: 2px;
  // line-height: 2.5rem;

  font-size: inherit;
  color: inherit;
  font-weight: inherit;
  font-family: @--acg-fonts-sans;
}
</style>
