// 基础路由
const baseRoutes = [
  {
    path: '/login',
    layout: false,
    component: './Login',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '/welcome',
    name: '首页',
    icon: 'smile',
    component: './Welcome',
  },
];

// 需要权限控制对路由
const AuthRoutes = [
  {
    name: '高级表格',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/article',
    name: '文章',
    routes: [
      { path: '/article', redirect: '/article/list' },
      {
        path: '/article/list',
        name: '文章列表',
        component: './Article/ArticleList',
      },
      {
        path: '/article/add',
        hideInMenu: true,
        name: '新增文章',
        component: './Article/ArticleAdd',
      },
    ],
  },
  {
    path: '/System',
    name: '系统管理',
    routes: [
      {
        path: '/System/User',
        name: '用户管理',
        component: './System/User',
      },
      {
        path: '/System/Role',
        name: '角色管理',
        component: './System/Role',
      },
      {
        path: '/System/Dictionary',
        name: '字典管理',
        component: './System/Dictionary',
      },
    ],
  },
  {
    path: '/demo',
    name: '测试菜单',
    routes: [
      {
        path: '/demo/one',
        name: '测试菜单ONE',
        component: './demo/one',
      },
    ],
  },
];

/**
 * 对路由统一添加权限
 * @param routes
 */
const handleAuthRoutes = (routes) => {
  const result: any[] = [];
  routes.forEach((item) => {
    const row: any = {
      ...item,
      access: 'roleAuth'
    };

    if (item.routes && item.routes.length) {
      row.routes = handleAuthRoutes(item.routes);
    }
    result.push(row);
  });

  return result;
};

export default [
  ...baseRoutes,
  ...handleAuthRoutes(AuthRoutes),
  {
    component: './404',
  },
];
