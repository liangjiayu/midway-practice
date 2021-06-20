export default [
  {
    name: '用户管理',
    value: 'user',
    children: [
      {
        name: '新增用户',
        value: 'user:create',
      },
      {
        name: '编辑用户',
        value: 'user:update',
      },
      {
        name: '删除用户',
        value: 'user:del',
      },
    ],
  },
  {
    name: '角色管理',
    value: 'role',
    children: [
      {
        name: '新增角色',
        value: 'role:create',
      },
      {
        name: '编辑角色',
        value: 'role:update',
      },
      {
        name: '删除角色',
        value: 'role:del',
      },
    ],
  },
];
