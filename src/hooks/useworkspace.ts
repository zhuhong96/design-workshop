import { App, Frame, Box, Rect } from 'leafer-ui';
import '@leafer-in/editor';
import { ref } from 'vue';
import { IFrame } from '@leafer-ui/interface';

export default function useWorkspace() {
  const workspace = ref<IFrame>();
  const scaleRatio = ref(1);

  const workspaceInit = (app: App) => {
    if (!app.width || !app.height) return;
    // console.log('app', app, app.width, app.height);

    // 缩放比列
    const workspaceScaledWidth = (app.width - 100) / 1920;
    const workspaceScaledHeight = (app.height - 100) / 1080;
    // 画布缩放比例
    scaleRatio.value = workspaceScaledWidth < workspaceScaledHeight ? workspaceScaledWidth : workspaceScaledHeight;
    // 画布移动距离
    const moveLeft = app.width / 2 - (1920 / 2) * scaleRatio.value;
    const moveRight = app.height / 2 - (1080 / 2) * scaleRatio.value;
    // 初始化画布
    workspace.value = new Frame({
      width: 1920,
      height: 1080,
      // overflow: 'hide',
      editable: false,
      lockRatio: true,
      x: 0,
      y: 0,
      resizeChildren: true,
    });
    // 添加画布到app
    app.tree.add(workspace.value);
    // 画布缩放->自身缩放比例
    const scale = workspace.value.scale as number;
    // 画布缩放->缩放比列
    workspace.value.scaleOf('top-left', scaleRatio.value / scale);
    // workspace.value.moveWorld(300, 10);
    // 移动画布
    app.tree.move({ x: Math.abs(moveLeft) + 10, y: moveRight + 10 });

    const rect = new Rect({
      width: 300,
      height: 300,
      editable: true,
      fill: 'rgb(50,205,121)',
    });
    // rect.moveWorld(100, 100);
    // rect.move({ x: 100, y: 100 });
    workspace.value.add(rect);
  };

  return {
    workspaceInit,
    workspace,
  };
}
