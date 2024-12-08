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

    <div class="panel-box">
      <div class="panel-box-list">
        <div class="panel-box-title theme-color">快捷操作</div>
        <div class="panel-box-content">
          <el-tooltip content="水平翻转" placement="top">
            <jy-icon size="18" type="icon-chuizhifanzhuan"></jy-icon>
          </el-tooltip>
          <el-tooltip content="垂直翻转" placement="top">
            <jy-icon size="18" type="icon-chuizhifanzhuan1"></jy-icon>
          </el-tooltip>
          <el-tooltip content="拷贝" placement="top">
            <jy-icon size="18" type="icon-kaobei"></jy-icon>
          </el-tooltip>
        </div>
      </div>
      <div class="panel-box-list">
        <div class="panel-box-title theme-color">文本</div>
        <div class="panel-box-content">
          <el-input v-model="textarea" style="width: 100%" :rows="4" type="textarea" placeholder="请输入文本" />
        </div>

        <div class="panel-box-text-attr">
          <!-- <span>字体大小：</span> -->
          <el-input-number v-model="fontSize" size="small" :min="10" :max="100">
            <template #suffix>
              <span>PX</span>
            </template>
          </el-input-number>

          <jy-icon size="18" type="icon-kaobei"></jy-icon>
        </div>
      </div>
      <div class="panel-box-list">
        <div class="panel-box-title theme-color">文字颜色</div>
        <div class="panel-box-content">456</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const activeName = ref<'foundation' | 'mix'>('foundation');
// 文本
const textarea = ref('');
// 字体大小
const fontSize = ref(16);

// 切换tabs
const changeTabs = (name: 'foundation' | 'mix') => {
  activeName.value = name;
};
</script>

<style scoped lang="less">
@import './style/panel.less';
</style>
