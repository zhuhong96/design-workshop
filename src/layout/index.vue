<template>
  <div class="layout">
    <router-view v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <keep-alive>
          <component :is="Component" ref="main" />
        </keep-alive>
      </Transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="less"></style>
