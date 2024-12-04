<template>
  <div class="panel">
    <!-- <el-tabs v-model="activeName" type="border-card" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="基础" name="foundation">基础</el-tab-pane>
      <el-tab-pane label="混合" name="mix">混合</el-tab-pane>
    </el-tabs> -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
// import type { TabsPaneContext } from 'element-plus';

// const activeName = ref('foundation');

// const handleClick = (tab: TabsPaneContext, event: Event) => {
//   console.log(tab, event);
// };
</script>

<style scoped lang="less">
.panel {
  width: 100%;
  height: 100%;
  border-left: 1px solid #cbcbcb;
  // padding: 0 12px;
  border-top: 1px solid #cbcbcb;
  // background-color: #16161b;
  // background-color: #191930;
}
</style>
