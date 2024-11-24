<template>
  <div class="navigation">
    <div class="navigation-left">
      <div class="navigation-list button-style">创建画布</div>
      <div class="navigation-list button-style">预览</div>
      <div class="navigation-list">
        <jy-icon type="icon-chexiao" size="24"></jy-icon>
      </div>
    </div>
    <div class="navigation-right">
      <div class="navigation-list">
        <jy-icon type="icon-github" size="24">Github</jy-icon>
      </div>
      <div class="navigation-list">
        <jy-icon type="icon-Gitee" size="24">Gitee</jy-icon>
      </div>
      <div class="navigation-list button-style">导出</div>
      <div class="navigation-list button-style">登录/注册</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
</script>

<style scoped lang="less">
.navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 30px;

  .navigation-left {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .navigation-right {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .navigation-list {
  }
}
</style>
