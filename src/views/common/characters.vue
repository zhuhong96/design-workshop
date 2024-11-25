<template>
  <div class="characters">
    <div class="characters-list" @click="onCharactersClick">吉云设计</div>
    <div class="characters-list">吉云设计</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
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
