<template>
  <div class="characters">
    <div class="characters-list theme-card" @click="onCharactersClick">吉云设计</div>
    <div class="characters-list theme-card" @click="createText({
      shadow: {
        x: 10,
        y: 0,
        blur: 30,
        color: randomColor(),
        box: true
      }
    })">吉云设计</div>
    <div class="characters-list theme-card">吉云设计</div>
  </div>
</template>

<script lang="ts" setup>
import { randomColor } from '@/utils/color';
import useSidebar from '@/hooks/usesidebar';
const { createText } = useSidebar();

const onCharactersClick = () => {
  createText();
};
</script>

<style scoped lang="less">
.characters {
  display: flex;
  flex-wrap: wrap;
  gap: 20px 12px;
  padding: 20px;

  .characters-list {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    width: 100px;
    height: 100px;
    font-size: 16px;
    cursor: pointer;
    color: #fff;

    &:nth-child(2) {
      // 文本阴影
      text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #ff00de, 0 0 70px #ff00de, 0 0 80px #ff00de, 0 0 100px #ff00de, 0 0 150px #ff00de;
    }
  }
}
</style>
