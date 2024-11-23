// import { App, Frame, Ellipse, Box } from 'leafer-ui';
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import { Ruler } from 'leafer-x-ruler';
import useWorkspace from '@/hooks/useworkspace';

const useWorkspaceFn = useWorkspace();

class Init {
  private app: App;
  private ruler: Ruler;
  workspace: any;
  // private frame: Frame;
  // private box: Box;

  constructor(canvas: string | HTMLCanvasElement) {
    this.app = new App({
      view: canvas || 'canvas',
      ground: { type: 'draw' },
      tree: {},
      editor: {
        lockRatio: 'corner',
        // stroke: '#6f4593',
        // skewable: false,
        hover: true,
        // 选中框中间点
        middlePoint: {
          cornerRadius: 10,
          width: 10,
          height: 10,
        },
        // 选中框样式
        rotatePoint: {
          width: 10,
          height: 10,
          fill: '#fff',
        },
      },
      sky: { type: 'draw', usePartRender: false },
    });

    this.ruler = new Ruler(this.app, {
      enabled: true,
      theme: 'dark',
    });

    // 添加自定义主题
    // this.ruler.addTheme('dark', {
    //   backgroundColor: '#6cb0ab',
    //   textColor: '#a45454',
    //   borderColor: '#6f4593',
    //   highlightColor: 'rgba(22,93,255,0.75)',
    //   theme: 'light',
    // });

    useWorkspaceFn.workspaceInit(this.app);

    // this.ruler.changeTheme('dark');
  }

  getApp() {
    return this.app;
  }

  // 获取画布
  getWorkspace() {
    return useWorkspaceFn.workspace.value;
  }
}

export default Init;
