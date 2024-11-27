<template>
  <div class="sidebar">
    <div class="sidebar-login">
      <pencilLoading />
      <!-- <jy-icon size="36" type="tupian"></jy-icon> -->
    </div>
    <div class="sidebar-box">
      <div
        v-for="(item, index) in sidebarList"
        :key="index"
        :class="['sidebar-box-list', modelValue === item.value ? 'sidebar-box-list-active' : '']"
        @click="onSidebarClick(item.value)"
      >
        <jy-icon size="24" :type="item.icon" :color="modelValue === item.value ? '#fff' : ''"></jy-icon>
        <span>{{ item.title }} </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import pencilLoading from '@/components/uiverse/pencil-loading.vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: () => 'text',
  },
});
const emits = defineEmits(['update:modelValue']);

const onSidebarClick = (type: string) => {
  emits('update:modelValue', type);
  // switch (type) {
  //   case 'text':
  //     useSidebarFn.createText();
  //     break;
  //   case 'element':
  //     useSidebarFn.createRect();
  //     break;
  //   case 'image':
  //     useSidebarFn.createImage();
  //     break;

  //   default:
  //     break;
  // }
};

const sidebarList = ref([
  {
    title: '文字',
    value: 'text',
    icon: 'icon-wenzi1',
    path: '',
  },
  {
    title: '元素',
    value: 'element',
    icon: 'icon-cryo',
    path: '',
  },
  {
    title: '图片',
    value: 'image',
    icon: 'icon-tupian',
    path: '',
  },
  {
    title: '背景',
    value: 'background',
    icon: 'icon-beijing',
    path: '',
  },
]);
</script>

<style scoped lang="less">
.sidebar {
  width: 100%;
  height: 100%;
  z-index: 9;
  background-color: #16161a;

  .sidebar-login {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
  }

  .sidebar-box {
    padding: 16px 0 0;
    border-right: 1px solid #2c2c3a;
    height: calc(100% - 76px);

    .sidebar-box-list {
      width: 100%;
      height: 60px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #8b8b8b;
      cursor: pointer;
      gap: 4px;

      & > span {
        font-size: 13px;
      }
    }

    .sidebar-box-list-active {
      color: #fff;
    }
  }
}
</style>
