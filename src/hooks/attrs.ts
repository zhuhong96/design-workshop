// import { EditorEvent, EditorMoveEvent } from '@leafer-in/editor';
import { IFlipKeys } from "@/types/attrs";
import editorEvent from '@/hooks/editorEvent';
const { selectData } = editorEvent();

export default function useAttrs() {

  // 水平翻转
  const horizontal = (type: IFlipKeys) => {
    if (!selectData.value?.value) return;
    if (Array.isArray(selectData?.value.value)) {
      selectData.value.value.forEach((ui:any) => ui.flip(type == 'horizontal' ? 'x' : 'y'));
    } else {
      selectData.value.value.flip(type == 'horizontal' ? 'x' : 'y');
    }
  }

  // 修改颜色
  const changeColor = (color: string) => {
    if (!selectData.value?.value || !color) return;
    if (Array.isArray(selectData?.value.value)) {
      selectData.value.value.forEach((ui:any) => ui.fill = color);
    } else {
      selectData.value.value.fill = color;
    }
  }

  // 描边
  const handleStroke = (color: string, width: number = 1) => {
    if (!selectData.value?.value || !color) return;
    if (Array.isArray(selectData?.value.value)) {
      selectData.value.value.forEach((ui:any) => {
        ui.stroke = color;
        ui.strokeWidth = width;
      });
    } else {
      selectData.value.value.stroke = color;
      selectData.value.value.strokeWidth = width;
    }
  }
  
  // 文字大小
  const handleFontSize = (size: number) => {
    if (!selectData.value?.value || !size) return;
    if (Array.isArray(selectData?.value.value)) {
      selectData.value.value.forEach((ui:any) => ui.fontSize = size);
    } else {
      // @ts-ignore
      selectData.value.value.fontSize = size;
    }
  }
  

  return {
    horizontal,
    changeColor,
    handleStroke,
    handleFontSize
  }
}