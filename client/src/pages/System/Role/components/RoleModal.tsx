import React, { useEffect } from 'react';
import { Form, Input, Modal } from 'antd';

import { addRole, updateRole } from '@/api/role';
import { checkOnly } from '@/api/base';

type RoleModalProps = {
  onCancel: () => void;
  onSuccess: () => void;
  visible: boolean;
  current: any;
};

const RoleModal: React.FC<RoleModalProps> = (props) => {
  const [form] = Form.useForm();

  // 回显表单的字段
  useEffect(() => {
    if (props.visible && props.current) {
      form.setFieldsValue(props.current);
    } else {
      form.resetFields();
    }
  }, [props.visible]);

  const onFinish = (values: any) => {
    if (props.current?.id) {
      updateRole({ ...values, id: props.current.id }).then(() => {
        props.onSuccess();
      });
    } else {
      addRole(values).then(() => {
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
          labelCol={{ span: 6 }}
          name="basic"
          onFinish={onFinish}
          initialValues={{}}
        >
          <Form.Item
            label="角色编码"
            name="roleCode"
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
              //       tableName: 'Role',
              //       fieldName: 'roleCode',
              //       fieldVal: value,
              //     }).then((res) => {
              //       if (res.code !== 2000) {
              //         throw new Error('角色编码已重复');
              //       }
              //     });
              //   },
              // },
            ]}
          >
            <Input readOnly={props.current} />
          </Form.Item>

          <Form.Item label="角色名称" name="roleName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RoleModal;
