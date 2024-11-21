const routes = [
  {
    path: '/',
    name: 'juyun',
    component: () => import('@/layout/index.vue'), //路由懒加载
    redirect: '/draw',
    children: [
      {
        path: '/draw',
        name: 'draw',
        component: () => import('@/views/draw/index.vue'), //路由懒加载
      },
    ],
  },
];

export default routes;
