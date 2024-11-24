<template>
  <router-view v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </router-view>
</template>

<style scoped lang="less">
:root {
  /* 滚动条整体部分，必须要设置 */
  ::-webkit-scrollbar {
    width: 3px;
    height: 10px;
    overflow-y: overlay;
  }

  /* 滚动条里面轨道，能向上向下移动 */
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  /* 滚动条里面轨道，能向上向下移动 */
  ::-webkit-scrollbar-track-piece {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    display: none;
    border-radius: 3px;
  }

  /* 滚动条里面的小方块，能向上向下移动 */
  *:hover::-webkit-scrollbar-thumb {
    display: flex;
    background-color: #fff;
    border-radius: 3px;
  }

  *:hover::-webkit-scrollbar-track-piece {
    background-color: #6b7280;
  }
}
</style>
