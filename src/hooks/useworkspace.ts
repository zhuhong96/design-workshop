import { App, Frame, Ellipse, Box } from 'leafer-ui';
import '@leafer-in/editor';
import { Ruler } from 'leafer-x-ruler';
import { onMounted, ref } from 'vue';

export default function useWorkspace() {
  const workspace = ref<Box>();

  const workspaceInit = (app: App) => {
    workspace.value = new Box({
      width: 1920,
      height: 1080,
      fill: '#fff',
      editable: false,
      x: 30,
      y: 60,
    });
    app.tree.add(workspace.value);
  };

  return {
    workspaceInit,
  };
}
