import type { App } from 'vue';
import JyIcon from './index.vue';
import '../assets/icon/iconfont.css';

// 使用install方法，在app.use挂载
JyIcon.install = (app: App) => {
  app.component(JyIcon.name as string, JyIcon);
};

export default JyIcon;
