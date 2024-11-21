import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [];

const moduleFiles: Record<
  string,
  {
    [key: string]: any;
  }
> = import.meta.glob('./*.ts', { eager: true });

Object.keys(moduleFiles).map((ele: any) => {
  const value = moduleFiles[ele].default || {};
  // 我们判断导出的是不是数组，是则进行拓展解构
  if (Array.isArray(value)) routes.push(...value);
  else routes.push(value);
});

export default routes;
