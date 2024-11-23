import { createApp } from 'vue';
import './style.css';
import './assets/icon/index.less';
import App from './App.vue';
import router from './router/index';

const app = createApp(App);
app.use(router);
app.mount('#app');
