<template>
  <div class="panel theme-border-left theme-border-top">
    <div class="panel-tabs">
      <div
        :class="['panel-tabs-pane', 'theme-color', { active: activeName === 'foundation' }]"
        @click="changeTabs('foundation')"
      >
        基础
        <div v-if="activeName === 'foundation'" class="panel-tabs-pane-border"></div>
      </div>
      <div :class="['panel-tabs-pane', 'theme-color', { active: activeName === 'mix' }]" @click="changeTabs('mix')">
        混合
        <div v-if="activeName === 'mix'" class="panel-tabs-pane-border"></div>
      </div>
    </div>

    <div class="panel-box">
      <div class="panel-box-list">
        <div class="panel-box-title theme-color">快捷操作</div>
        <div class="panel-box-content">
          <el-tooltip content="水平翻转" placement="top">
            <jy-icon size="18" type="icon-chuizhifanzhuan"
            @click="handleFlip('horizontal')"
            ></jy-icon>
          </el-tooltip>
          <el-tooltip content="垂直翻转" placement="top">
            <jy-icon size="18" type="icon-chuizhifanzhuan1"
            @click="handleFlip('vertical')"></jy-icon>
          </el-tooltip>
          <el-tooltip content="拷贝" placement="top">
            <jy-icon size="18" type="icon-kaobei"></jy-icon>
          </el-tooltip>
        </div>
      </div>
      <div class="panel-box-list">
        <div class="panel-box-title theme-color">文本</div>
        <div class="panel-box-content">
          <el-input v-model="attrsParams.textarea" style="width: 100%" :rows="4" type="textarea" placeholder="请输入文本" />
        </div>

        <div class="panel-box-text-attr">
          <!-- <span>字体大小：</span> -->
          <el-input-number v-model="attrsParams.fontSize"
          :min="12" :max="200"
          controls-position="right">
            <template #prefix>
              <span>PX</span>
            </template>
          </el-input-number>

          <!-- <jy-icon size="18" type="icon-kaobei"></jy-icon> -->
        </div>
      </div>
      <div class="panel-box-list">
        <div class="panel-box-title theme-color">文字颜色</div>
        <div class="panel-box-content">
          <div v-for="(item, index) in COLOR" @click="changeColor(item)" :key="index" class="color-list" :style="{ backgroundColor: item }"></div>
          <el-color-picker v-model="attrsParams.textColor"
          @change="(e:string)=> changeColor(e)"
          show-alpha :predefine="predefineColors" />
        </div>
      </div>
      <div class="panel-box-list">
        <div class="panel-box-title theme-color">描边</div>
        <div class="panel-box-content">
          <el-input-number v-model="attrsParams.fontSizeStroke"
          :min="1" :max="100"
          @change="(e:number)=> handleStroke(color, e)"
          controls-position="right">
            <template #prefix>
              <span>PX</span>
            </template>
          </el-input-number>
          <el-color-picker v-model="attrsParams.strokeColor"
          @change="(e:string)=> handleStroke(e, attrsParams.fontSizeStroke)"
          show-alpha :predefine="predefineColors" />
        </div>
      </div>
      <div class="panel-box-list">
        <div class="panel-box-title theme-color">圆角</div>
        <div class="panel-box-content">456</div>
      </div>
      <div class="panel-box-list">
        <div class="panel-box-title theme-color">阴影</div>
        <div class="panel-box-content">456</div>
      </div>
      <div class="panel-box-list">
        <div class="panel-box-title theme-color">透明度</div>
        <div class="panel-box-content">
          <el-slider v-model="attrsParams.opacity"
          show-input :min="0" :max="100" />
        </div>
      </div>
      <div class="panel-box-list">
        <div class="panel-box-title theme-color">位置</div>
        <div class="panel-box-content">
          <el-input-number v-model="attrsParams.fontSizeStroke"
          controls-position="right"
          :min="1" :max="100">
            <template #prefix>
              <span>X</span>
            </template>
          </el-input-number>
          <el-input-number v-model="attrsParams.fontSizeStroke"
          controls-position="right"
          :min="1" :max="100">
            <template #prefix>
              <span>Y</span>
            </template>
          </el-input-number>
        </div>
      </div>
      <div class="panel-box-list">
        <div class="panel-box-title theme-color">尺寸</div>
        <div class="panel-box-content">456</div>
      </div>
      <div class="panel-box-list">
        <div class="panel-box-title theme-color">旋转</div>
        <div class="panel-box-content">
          <el-slider v-model="attrsParams.rotate" show-input :min="0" :max="360" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { COLOR } from '@/config/color';
import { IFlipKeys, IAttrsParams } from "@/types/attrs";
import editorEvent from '@/hooks/editorEvent';
import useAttrs from '@/hooks/attrs';
const activeName = ref<'foundation' | 'mix'>('foundation');
const { horizontal, changeColor, handleStroke, handleFontSize } = useAttrs();
const { selectData } = editorEvent();

const initParams = (): IAttrsParams => {
  return {
    fontSize: 16,
    opacity: 1,
    rotate: 0,
    fontSizeStroke: 1,
    strokeColor: 'rgba(126, 200, 29, 1)',
    textarea: '',
    textColor: 'rgba(126, 200, 29, 1)',
  }
}

watch(()=>selectData.value, (val:any) => {
  if (val && val.value) {
    attrsParams.value.textarea = val.value.text || '';
    attrsParams.value.fontSizeStroke = val.value.strokeWidth;
    attrsParams.value.fontSize = val.value.fontSize;
  } else {
    attrsParams.value = initParams();
  }
})

const attrsParams = ref<IAttrsParams>(initParams())

// 文本
const textarea = ref<string>('');
// 字体大小-描边
const fontSizeStroke = ref<string>('16');
// 透明度
const opacity = ref(1);
// 旋转
const rotate = ref(0);
// 颜色
const color = ref('rgba(126, 200, 29, 1)');
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

// 切换tabs
const changeTabs = (name: 'foundation' | 'mix') => {
  activeName.value = name;
};

// 翻转
const handleFlip = (type: IFlipKeys) => {
  // appLeafer.value?.editor.flipx(true)
  horizontal(type);
};
</script>

<style scoped lang="less">
@import './style/panel.less';
</style>
