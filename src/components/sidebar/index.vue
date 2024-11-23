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
        class="sidebar-box-list"
        @click="onSidebarClick(item.value)"
      >
        <img v-if="item.value === 'text'" src="@/assets/sidebar/icon-wenzi.png" class="sidebar-box-list-img" alt="JY" />
        <img
          v-if="item.value === 'element'"
          src="@/assets/sidebar/icon-yuansu-lengxing.png"
          class="sidebar-box-list-img"
          alt="JY"
        />
        <img
          v-if="item.value === 'image'"
          src="@/assets/sidebar/icon-tupian.png"
          class="sidebar-box-list-img"
          alt="JY"
        />
        <img
          v-if="item.value === 'background'"
          src="@/assets/sidebar/icon-a-celanicon.png"
          class="sidebar-box-list-img"
          alt="JY"
        />
        <span>{{ item.title }} </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { IFrame } from '@leafer-ui/interface';
import useSidebar from '@/hooks/usesidebar';
import pencilLoading from '@/components/uiverse/pencil-loading.vue';

const props = defineProps({
  workspace: {
    type: Object as () => IFrame,
    default: () => {},
  },
});
// 注册
const useSidebarFn = useSidebar(props.workspace);

const onSidebarClick = (type: string) => {
  switch (type) {
    case 'text':
      useSidebarFn.createText();
      break;
    case 'element':
      useSidebarFn.createRect();
      break;

    default:
      break;
  }
};

const sidebarList = ref([
  {
    title: '文字',
    value: 'text',
    path: '',
  },
  {
    title: '元素',
    value: 'element',
    path: '',
  },
  {
    title: '图片',
    value: 'image',
    path: '',
  },
  {
    title: '背景',
    value: 'background',
    path: '',
  },
]);
</script>

<style scoped lang="less">
.sidebar {
  width: 100%;

  .sidebar-login {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
  }

  .sidebar-box {
    padding: 16px 0 0;

    .sidebar-box-list {
      width: 100%;
      height: 60px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      // color: #fff;
      cursor: pointer;
      gap: 2px;

      .sidebar-box-list-img {
        width: 30px;
        height: 30px;
      }

      & > span {
        font-size: 14px;
      }
    }
  }
}
</style>
