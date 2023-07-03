<template>
  <div class="date-picker__wrapper">
    <input
      class="date-picker__body"
      :type="way"
      :step="step"
      :readonly="readonly"
      :value="dateVal"
      @change="changeHandler($event)"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'DatePicker',
  props: {
    way: {
      type: String,
      default: 'month'
    },
    step: {
      type: Number,
      default: 3
    },
    readonly: {
      type: Boolean,
      default: false
    },
    value: {
      type: String
    }
  },
  emits: ['update:value'],
  setup(_props, { emit }) {
    const dateVal = computed(() => _props.value)
    const changeHandler = (e: any) => {
      emit('update:value', e.target.value)
    }
    return {
      dateVal,
      changeHandler
    }
  }
})
</script>

<style lang="less" scoped>
.date-picker {
  &__wrapper {
    padding: 10px;
  }

  &__body {
    border-color: #d7dbdf;
    border-width: 1px;
    border-style: solid;
    padding: 0.625rem 1.2rem;
    box-shadow: none;
    transition: all 0.4s ease;
    font-size: 0.825rem;
    font-family: inherit;
    letter-spacing: 1px;
    border-radius: 0.375rem;

    &:hover {
      border-color: #889096;
    }
  }
}
</style>
