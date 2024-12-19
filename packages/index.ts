// // package/index.ts
import type { App } from 'vue';
import JyIcon from './jy-icon/index.ts';

// 所有组件列表
const components = [JyIcon];

// 定义 install 方法
const install = (app: App): void => {
  components.map((component: any) => app.use(component));
};

export { JyIcon };

const DesignWorkshopUI = {
  install,
};

export default DesignWorkshopUI;
