import { App } from 'leafer-ui';
import { EditorEvent, EditorMoveEvent } from '@leafer-in/editor';
import { ref } from 'vue';

// 选中的元素
const selectData = ref<any>(null);

export default function (app:App) {
  
  // 选中的元素
  app.editor.on(EditorMoveEvent.SELECT, (e:EditorEvent) => { 
    console.log('移动',e);
    selectData.value = e;
    // if (Array.isArray(e.value)) {
    //   e.value.forEach(ui => ui.flip('y'));
    // } else {
    //   e.value.flip('y');
    // }
  });

  return {
    selectData,
  }
}