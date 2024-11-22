// import { App, Frame, Ellipse, Box } from 'leafer-ui';
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import { Ruler } from 'leafer-x-ruler';
import useWorkspace from '@/hooks/useworkspace';

class Init {
  private app: App;
  private ruler: Ruler;
  // private frame: Frame;
  // private box: Box;
  // private ellipse: Ellipse;

  constructor(canvas: string | HTMLCanvasElement) {
    this.app = new App({
      view: canvas || 'canvas',
      ground: { type: 'draw' },
      tree: {},
      editor: {},
      sky: { type: 'draw', usePartRender: false },
    });

    this.ruler = new Ruler(this.app);
    // 添加自定义主题
    this.ruler.addTheme('dark', {
      backgroundColor: '#6cb0ab',
      textColor: '#a45454',
      borderColor: '#6f4593',
      highlightColor: 'rgba(22,93,255,0.75)',
    });

    useWorkspace().workspaceInit(this.app);

    // this.ruler.changeTheme('dark');
  }

  getApp() {
    return this.app;
  }
}

export default Init;
