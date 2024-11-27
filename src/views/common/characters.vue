<template>
  <div class="characters">
    <div class="characters-list" @click="onCharactersClick">吉云设计</div>
    <div class="characters-list">吉云设计</div>
  </div>
</template>

<script lang="ts" setup>
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
    background-color: #0a0b10;
  }
}
</style>
