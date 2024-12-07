<template>
  <div class="panel theme-border-left theme-border-top">
    <div class="panel-tabs">
      <div
        :class="['panel-tabs-pane', 'theme-color', { active: activeName === 'foundation' }]"
        @click="changeTabs('foundation')"
      >
        基础
        <div v-if="activeName === 'foundation'" class="panel-tabs-pane-border"></div>
      </div>
      <div :class="['panel-tabs-pane', 'theme-color', { active: activeName === 'mix' }]" @click="changeTabs('mix')">
        混合
        <div v-if="activeName === 'mix'" class="panel-tabs-pane-border"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const activeName = ref<'foundation' | 'mix'>('foundation');

// 切换tabs
const changeTabs = (name: 'foundation' | 'mix') => {
  activeName.value = name;
};
</script>

<style scoped lang="less">
.panel {
  width: 100%;
  height: 100%;
  // border-left: 1px solid #2c2c3a;
  // border-top: 1px solid #2c2c3a;
}

.panel-tabs {
  display: flex;
  align-items: center;
  height: 48px;

  .panel-tabs-pane {
    position: relative;
    padding: 0 12px;
    height: 100%;
    line-height: 48px;
    cursor: pointer;

    .panel-tabs-pane-border {
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
      bottom: 0;
      width: 12px;
      border-radius: 4px;
      height: 4px;
      background-color: #a93df1;
    }
  }

  .active {
    font-weight: bold;
    color: #a93df1;
  }
}
</style>
