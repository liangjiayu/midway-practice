import React from 'react';
import { Menu, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { history, useModel } from 'umi';
import { removeStore } from '@/utils/session';

const UserMenu = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const loginOut = () => {
    removeStore('TOKEN');
    removeStore('USER_INFO');
    setInitialState({ ...initialState, token: undefined });
    history.push('/login');
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={loginOut}>
        <div>退出登录</div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <UserOutlined style={{ padding: '12px', cursor: 'pointer' }} />
    </Dropdown>
  );
};

export default UserMenu;
