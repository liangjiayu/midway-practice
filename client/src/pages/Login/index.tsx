import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { history, useModel } from 'umi';
import styles from './index.less';

import { setStore } from '@/utils/session';
import { userLogin, getInfoByToken } from '@/api/user';

const LoginView = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const onFinish = async (values: any) => {
    const { data: tokenData } = await userLogin({ ...values });
    setStore('TOKEN', tokenData.token);

    const { data: userData } = await getInfoByToken({});
    setInitialState({
      ...initialState,
      token: tokenData.token,
      userInfo: userData.user,
      roleInfo: userData.role,
    });

    setTimeout(() => {
      history.push('/');
    }, 10);
  };

  return (
    <div className={styles.container}>
      <div></div>
      <div className={styles.containerBox}>
        <div className={styles.containerLogo}>MIN系统</div>
        <Form onFinish={onFinish} size="large">
          <Form.Item name="username" rules={[{ required: true, message: '请输入邮箱!' }]}>
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: '请输入密码！' }]}>
            <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div></div>
    </div>
  );
};

export default LoginView;
