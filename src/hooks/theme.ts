import { ref } from 'vue';
import { App } from 'leafer-ui';
import { Ruler } from 'leafer-x-ruler';
import useWorkspace from '@/hooks/useworkspace';
const { updateGuides } = useWorkspace();

const theme = ref('dark'); // light
const ruler = ref<Ruler>();
const app = ref<App>();
export default function useTheme() {
  /**
   * 初始化主题
   * @param Ruler
   */
  const initTheme = (Ruler: Ruler, App: App) => {
    const el = document.documentElement;
    el.className = theme.value;
    ruler.value = Ruler;
    app.value = App;
  };

  const setUseTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
    const el = document.documentElement;
    // const el = document.getElementById('xxx')
    // 获取 css 变量
    // getComputedStyle(el).getPropertyValue(`--el-color-primary`);
    // // 设置 css 变量
    // el.style.setProperty('--el-color-primary', 'red');
    el.className = theme.value;
    // el.className = 'dark';
    setTheme();
    app.value && updateGuides(theme.value);
  };

  const setTheme = () => {
    if (theme.value === 'dark') {
      ruler.value &&
        ruler.value.addTheme('dark', {
          backgroundColor: '#242424',
          textColor: '#ccc',
          borderColor: '#3d3d3d',
          highlightColor: 'rgba(22,93,255,0.75)',
        });
    } else {
      ruler.value &&
        ruler.value.addTheme('dark', {
          backgroundColor: '#fff',
          textColor: '#000',
          borderColor: '#cbcbcb',
          highlightColor: 'rgba(22,93,255,0.75)',
        });
    }
  };

  return {
    theme,
    initTheme,
    setUseTheme,
  };
}
