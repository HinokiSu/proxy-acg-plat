<template>
  <div
    class="input-container"
    :class="[classes, isEmpty ? 'inactive' : 'active']"
  >
    <label class="input-label">
      <div class="label-name" v-if="isHasLabel">{{ label }}</div>
      <div class="input-wrapper">
        <div v-if="hasPreIconSlot" class="pre-icon__container">
          <slot name="preIcon"></slot>
        </div>
        <input
          :readonly="readOnly"
          :disabled="disable"
          class="input-body"
          :type="type"
          :placeholder="isLabelPlaceholder ? '' : placeholder"
          v-model="inputVal"
          @input="changeValue"
        />
      </div>
      <span v-if="isLabelPlaceholder" class="input-placeholder">
        {{ labelPlaceholder }}
      </span>
    </label>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'AcgInput',
  props: {
    value: {
      type: String,
      default: ''
    },
    disable: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: 'Please Input'
    },
    labelPlaceholder: {
      type: String,
      default: ''
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  emits: ['update:value'],
  setup(props, { emit, slots }) {
    const inputVal = ref('')
    inputVal.value = props.value
    const isHasLabel = computed(() => props.label !== '')
    const isLabelPlaceholder = computed(() => props.labelPlaceholder !== '')
    const changeValue = () => {
      emit('update:value', inputVal.value)
    }
    const isEmpty = computed(() => (inputVal.value === '' ? true : false))
    const hasPreIconSlot = computed(() => {
      return !!slots['preIcon']
    })
    const classes = computed(() => ({
      'is-label': isHasLabel.value,
      'is-label-placeholder': isLabelPlaceholder.value && !isHasLabel.value
    }))

    return {
      inputVal,
      isEmpty,
      isLabelPlaceholder,
      isHasLabel,
      classes,
      hasPreIconSlot,
      changeValue
    }
  }
})
</script>

<style lang="less" scoped>
.input-container {
  width: inherit;
  height: 2rem;
  margin: 4px 0px;
  .input-wrapper {
    width: 100%;
    transition: all 250ms ease;
    display: flex;
    align-items: center;
    flex: 1 1 0%;
    vertical-align: middle;
    background-color: #fff;
  }

  .pre-icon__container {
    padding-left: 6px;
  }

  .input-body {
    -webkit-appearance: none;
    -ms-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: #f2f2f2;
    padding: 0 0.375rem;
    outline: none;
    font-size: 0.875rem;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 8px;
  }

  &.is-label-placeholder {
    height: 2rem;

    &.active {
      .input-placeholder {
        top: -65%;
        left: 0.25rem;
        cursor: inherit;
        color: #555;
      }
    }

    .input-body {
      background: none;
      transition: border-color 0.3s ease;

      &:focus {
        border-color: #555;
      }
    }

    .input-label {
      position: relative;
      vertical-align: middle;
      user-select: none;
      height: 100%;

      // border-radius: 8px;

      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      box-sizing: border-box;
      -webkit-box-align: center;

      transition: all 0.25ms ease;
    }

    .input-placeholder {
      position: absolute;
      padding: 0px;
      z-index: 100;
      top: 20%;
      left: 0.7rem;

      margin-bottom: 0px;
      cursor: text;
      transition: left 0.25s ease 0s, color 0.25s ease 0s, top 0.25s ease 0s;
      color: #737375;
      font-size: 0.82rem;
    }

    .input-wrapper {
      border: 2px solid #ddd;
      border-radius: 8px;
      &:focus-within {
        border-color: #000;

        & + .input-placeholder {
          top: -65%;
          left: 0.25rem;
          cursor: inherit;
          color: #555;
        }
      }
    }
    .input-wrapper:has(.pre-icon__container) {
      &:focus-within ~ .input-placeholder {
        top: -65%;
        left: 0.2rem;
        cursor: inherit;
        color: #555;
      }
      & ~ .input-placeholder {
        left: 2rem;
      }
    }
  }

  &.is-label {
    height: 100%;
    .input-label {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .label-name {
        font-size: 0.625rem;
        color: #000;
        padding-left: 0.25rem;
        margin-bottom: 0.375rem;
        line-height: 1.5;
      }

      .input-wrapper {
        background-color: #f1f3f5;
        border-radius: 8px;
        .input-body {
          height: 2rem;
          border: none;
          background: transparent;
          transition: all 250ms ease;
        }
      }
    }
  }

  &.active {
    & .input-wrapper:has(.pre-icon__container) ~ .input-placeholder {
      left: 0.2rem;
    }

    &.input-label {
      .input-body {
        margin: 0.25rem 0.625rem;
      }
    }
  }
}
</style>
