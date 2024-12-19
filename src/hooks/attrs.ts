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
  

  return {
    horizontal,
    changeColor
  }
}