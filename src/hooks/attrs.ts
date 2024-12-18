// import { EditorEvent, EditorMoveEvent } from '@leafer-in/editor';
import { IFlipKeys } from "@/types/attrs";
import editorEvent from '@/hooks/editorEvent';
const { selectData } = editorEvent();

export default function useAttrs() {

  // 水平翻转
  const horizontal = (type: IFlipKeys) => {
    console.log(selectData.value);
    if (!selectData.value) return;
    if (Array.isArray(selectData?.value.value)) {
      selectData.value.value.forEach((ui:any) => ui.flip(type == 'horizontal' ? 'y' : 'x'));
    } else {
      selectData.value.value.flip(type == 'horizontal' ? 'y' : 'x');
    }
  }
  

  return {
    horizontal
  }
}