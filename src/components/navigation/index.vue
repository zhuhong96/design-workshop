<template>
  <div class="navigation">
    <div class="navigation-left">
      <div class="navigation-list">
        <a href="https://github.com/zhuhong96/design-workshop" target="_blank">
          <jy-icon type="icon-github" size="24">Github</jy-icon>
        </a>
      </div>
      <div class="navigation-list">
        <jy-icon type="icon-Gitee" size="24">Gitee</jy-icon>
      </div>
    </div>
    <div class="navigation-box">
      <div class="navigation-model">
        <div class="navigation-list button-style">创建画布</div>
        <div class="navigation-list button-style">预览</div>
        <div class="navigation-list">
          <jy-icon type="icon-chexiao" size="24"></jy-icon>
        </div>
      </div>
      <div class="navigation-right">
        <el-switch
          v-model="themeValue"
          style="--el-switch-on-color: #191931; --el-switch-off-color: #191931"
          inline-prompt
          size="large"
          active-text="暗夜"
          inactive-text="日间"
          @change="setUseTheme"
        />
        <el-dropdown placement="bottom-end">
          <el-button type="primary" size="small"> 导出 </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>png 图片</el-dropdown-item>
              <el-dropdown-item>JSON 文件</el-dropdown-item>
              <!-- <el-dropdown-item>Action 3</el-dropdown-item> -->
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <!-- <div class="navigation-list button-style">导出</div> -->
        <!-- <div class="navigation-list button-style">登录/注册</div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import useTheme from '@/hooks/theme';
const { setUseTheme } = useTheme();

const themeValue = ref(true);
</script>

<style scoped lang="less">
.navigation {
  display: flex;
  align-items: center;
  height: 100%;
  // padding: 0 30px;

  .navigation-left {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 260px;
    gap: 32px;
  }

  .navigation-box {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px 0 0;

    .navigation-model {
      display: flex;
      gap: 16px;
    }
    .navigation-right {
      display: flex;
      align-items: center;
      gap: 16px;
    }
  }

  .navigation-list {
    display: flex;
    align-items: center;
  }
}
</style>
