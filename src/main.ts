import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router/index';
import DesignWorkshopUI from '../package/index';

const app = createApp(App);
app.use(router);
app.use(DesignWorkshopUI);
app.mount('#app');
