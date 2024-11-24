<template>
  <div class="jy-icon">
    <span
      :class="['iconfont', computedType]"
      :style="{
        fontSize: computedSize,
        color,
      }"
    ></span>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';

export default {
  name: 'JyIcon',
  props: {
    type: {
      type: String,
      default: 'tupian',
    },
    size: {
      type: String,
      default: '16px',
    },
    color: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    // 字体大小
    const computedSize = computed(() => {
      return props.size.indexOf('px') > -1 ? props.size : `${props.size}px`;
    });
    // 类型
    const computedType = computed(() => {
      return props.type.indexOf('icon-') > -1 ? props.type : `icon-${props.type}`;
    });

    return {
      computedSize,
      computedType,
    };
  },
};
</script>

<style scoped>
.jy-icon {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}
</style>
