import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Select } from 'antd';

import { addUser, updateUser } from '@/api/user';

type UserModalProps = {
  onCancel: () => void;
  onSuccess: () => void;
  visible: boolean;
  current: any;
};

const UserModal: React.FC<UserModalProps> = (props) => {
  const [form] = Form.useForm();

  // 回显表单的字段
  useEffect(() => {
    if (!form) {
      return;
    }
    if (props.visible && props.current) {
      form.setFieldsValue(props.current);
    } else {
      form.resetFields();
    }
  }, [props.visible]);

  useEffect(() => {}, []);

  const onFinish = (values: any) => {
    if (props?.current?.id) {
      updateUser({ ...values, id: props.current.id }).then(() => {
        props.onSuccess();
      });
    } else {
      addUser(values).then(() => {
        props.onSuccess();
      });
    }
  };

  return (
    <>
      <Modal
        title={props.current ? '编辑' : '新增'}
        visible={props.visible}
        onOk={() => {
          form.submit();
        }}
        onCancel={props.onCancel}
        width={640}
      >
        <Form
          form={form}
          labelCol={{ span: 5 }}
          name="basic"
          onFinish={onFinish}
          initialValues={{}}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true },
              // {
              //   validator: async (rule, value) => {
              //     if (props.current) {
              //       return;
              //     }
              //     if (!value) {
              //       return;
              //     }
              //     await checkOnly({
              //       tableName: 'User',
              //       fieldName: 'username',
              //       fieldVal: value,
              //     }).then((res) => {
              //       if (res.code !== 2000) {
              //         throw new Error('用户名称已重复');
              //       }
              //     });
              //   },
              // },
            ]}
          >
            <Input />
          </Form.Item>

          {!props.current && (
            <Form.Item
              label="密码"
              name="password"
              rules={[
                {
                  required: true,
                  pattern: /^[a-zA-Z0-9]{6,12}$/,
                  message: '密码由数字或者字母组成，长度为6～12位',
                },
              ]}
            >
              <Input.Password autoComplete="new-password" />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default UserModal;
