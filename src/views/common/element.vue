<template>
  <div class="element">
    <div class="element-list">
      <div class="element-rect"></div>
    </div>
    <div class="element-list">
      <div class="element-rect-1"></div>
    </div>
    <div class="element-list">
      <div class="element-rect-2"></div>
    </div>
    <div class="element-list">
      <div class="element-circle"></div>
    </div>
    <div class="element-list">
      <div class="element-circle-1"></div>
    </div>
    <div class="element-list">
      <div class="element-line"></div>
    </div>
    <div class="element-list">
      <div class="element-m">M</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import useSidebar from '@/hooks/usesidebar';
import { IFrame } from '@leafer-ui/interface';

const props = defineProps({
  workspace: {
    type: Object as () => IFrame,
    default: () => {},
  },
});
// 注册
let useSidebarFn = useSidebar(props.workspace);

const onCharactersClick = () => {
  useSidebarFn?.createText();
};
</script>

<style scoped lang="less">
@import './style/element.less';
</style>
