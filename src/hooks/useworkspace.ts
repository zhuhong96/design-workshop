import { App, Frame, Rect } from 'leafer-ui';
import '@leafer-in/editor';
import { ref } from 'vue';
import { IFrame } from '@leafer-ui/interface';
import { IWorkspaceSize } from '@/types/workspace';
import initEvent from './event';

const workspace = ref<IFrame>();
const appLeafer = ref<App>();
const scaleRatio = ref(1);
// 画布大小
const workspaceSize = ref<IWorkspaceSize>({ width: 1920, height: 1080 });

export default function useWorkspace() {
  // 初始化画布
  const workspaceInit = (app: App, size: IWorkspaceSize = workspaceSize.value) => {
    if (!app.width || !app.height) return;
    // 画布大小
    workspaceSize.value = size;
    // 保存app
    appLeafer.value = app;
    // 初始化画布
    workspace.value = new Frame({
      width: workspaceSize.value.width,
      height: workspaceSize.value.height,
      // overflow: 'hide',
      editable: false,
      lockRatio: true,
      x: 0,
      y: 0,
      id: 'workspace',
      resizeChildren: true,
    });
    // 添加画布到app
    app.tree.add(workspace.value);

    // 缩放画布
    workspaceScale();
    // 注册事件
    initEvent(app);
    // const rect = new Rect({
    //   width: 300,
    //   height: 300,
    //   editable: true,
    //   fill: 'rgb(50,205,121)',
    // });
    // // rect.moveWorld(100, 100);
    // workspace.value.add(rect);
    // rect.move(getElementXY(rect));
  };

  // 画布缩放以及移动
  const workspaceScale = (App?: App) => {
    const app = App || (appLeafer.value as App);
    if (!app.width || !app.height || !workspace.value) return;
    // 缩放比列
    const workspaceScaledWidth = (app.width - 100) / workspaceSize.value.width;
    const workspaceScaledHeight = (app.height - 100) / workspaceSize.value.height;
    // 画布缩放比例
    scaleRatio.value = workspaceScaledWidth < workspaceScaledHeight ? workspaceScaledWidth : workspaceScaledHeight;
    // 画布移动距离
    const moveLeft = app.width / 2 - (workspaceSize.value.width / 2) * scaleRatio.value;
    const moveTop = app.height / 2 - (workspaceSize.value.height / 2) * scaleRatio.value;
    // 画布缩放->自身缩放比例
    const scale = workspace.value.scale as number;
    // 画布缩放->缩放比列
    workspace.value.scaleOf('top-left', scaleRatio.value / scale);
    // 获取画布原始位置->移动距离
    const x = app.tree.x ? moveLeft - app.tree.x : moveLeft;
    const y = app.tree.y ? moveTop - app.tree.y : moveTop;
    // app.tree.moveWorld(0, 0);
    // 移动画布
    app.tree.move({ x: x + 10, y: y + 10 });
  };

  // 计算x和y坐标
  const getElementXY = (element: any): { x: number; y: number } => {
    if (!workspace.value || !workspace.value.width || !workspace.value.height) return { x: 0, y: 0 };
    // const width = workspace.value.width * scaleRatio.value;
    // const height = workspace.value.height * scaleRatio.value;
    const x = (workspace.value.width - element.width) / 2;
    const y = (workspace.value.height - element.height) / 2;
    return { x, y };
  };

  // 修改画布大小
  const editCanvasResize = (size: IWorkspaceSize) => {
    if (!appLeafer.value) return;
    appLeafer.value.resize({
      width: size.width,
      height: size.height,
    });
    workspaceScale(appLeafer.value);
    // setTimeout(() => workspaceScale(appLeafer.value), 1000);
  };

  // 修改画布颜色
  const editCanvasColor = (color?: string) => {
    if (!workspace.value) return;
    workspace.value.fill = color || 'rgba(255,255,255,0)';
  };

  // 更新辅助线
  const updateGuides = (theme: string) => {
    if (!workspace.value || !appLeafer.value) return;
    workspace.value.move({ x: theme == 'dark' ? 1 : -1, y: theme == 'dark' ? 1 : -1 });
    workspaceScale(appLeafer.value);
  };

  return {
    workspaceInit,
    workspaceScale,
    editCanvasResize,
    getElementXY,
    editCanvasColor,
    updateGuides,
    workspace,
    appLeafer,
  };
}
