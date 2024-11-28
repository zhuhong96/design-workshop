<template>
  <div class="element">
    <div class="element-list">
      <div class="element-rect" @click="createRect('rect')"></div>
    </div>
    <div class="element-list">
      <div class="element-rect-1" @click="createRect('rectRound')"></div>
    </div>
    <div class="element-list">
      <div class="element-rect-2" @click="createRect('rectDiamond')"></div>
    </div>
    <div class="element-list">
      <div class="element-circle" @click="createEllipse('ellipse')"></div>
    </div>
    <div class="element-list">
      <div class="element-circle-1" @click="createEllipse('ring')"></div>
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
import useSidebar from '@/hooks/usesidebar';
import { IFrame } from '@leafer-ui/interface';
const { createRect, createEllipse } = useSidebar();

const props = defineProps({
  workspace: {
    type: Object as () => IFrame,
    default: () => {},
  },
});
</script>

<style scoped lang="less">
@import './style/element.less';
</style>
