<template>
  <div class="sidebar">
    <div class="sidebar-login">
      <pencilLoading />
    </div>
    <div class="sidebar-box">
      <div v-for="(item, index) in sidebarList" :key="index" class="sidebar-box-list">
        <!-- <img
          class="sidebar-box-list-img"
          src="https://ts1.cn.mm.bing.net/th/id/R-C.a60ec11ec3652480060d44cb4cc08358?rik=B7v9eGWD68F1OA&riu=http%3a%2f%2fpic.616pic.com%2fys_bnew_img%2f00%2f21%2f11%2fZ2HX8XOP1N.jpg&ehk=qxn5WB0Z1KYULzmbU9NeYy%2fGvcPYPYcSomU5utOpucA%3d&risl=&pid=ImgRaw&r=0"
          alt=""
        /> -->
        <i class="iconfont icon-tupian"></i>
        <span>{{ item.title }} </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import pencilLoading from '@/components/uiverse/pencil-loading.vue';

const sidebarList = ref([
  {
    title: '文字',
    icon: '',
    path: '',
  },
  {
    title: '元素',
    icon: '',
    path: '',
  },
  {
    title: '图片',
    icon: '',
    path: '',
  },
  {
    title: '背景',
    icon: '',
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
    .sidebar-box-list {
      width: 100%;
      height: 60px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      color: #fff;
      cursor: pointer;

      .sidebar-box-list-img {
        width: 30px;
        height: 30px;
      }
    }
  }
}
</style>
