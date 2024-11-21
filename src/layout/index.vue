<template>
  <div class="layout">
    <div class="layout-sidebar">456</div>
    <div class="layout-box">
      <div class="layout-header">123</div>
      <div class="layout-content">
        <router-view v-slot="{ Component }">
          <Transition name="fade" mode="out-in">
            <keep-alive>
              <component :is="Component" ref="main" />
            </keep-alive>
          </Transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="less"></style>
