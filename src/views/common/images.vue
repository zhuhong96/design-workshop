<template>
  <div class="images">
    <div class="images-update button-style">上传图片</div>
    <div class="images-box">45646</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
</script>

<style scoped lang="less">
.images {
  display: flex;
  flex-direction: column;
  padding: 20px;

  .images-box {
    flex: 1;
  }
}
</style>
