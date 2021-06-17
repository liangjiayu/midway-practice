import React, { useEffect } from 'react';
import { Form, Input, Modal } from 'antd';

import { addDictItem, updateDictItem } from '@/api/dictionary';

type DictModalProps = {
  onCancel: () => void;
  onSuccess: () => void;
  visible: boolean;
  current: any;
  info: { dictId: number };
};

const DictItemModal: React.FC<DictModalProps> = (props) => {
  const [form] = Form.useForm();

  // 回显表单的字段
  useEffect(() => {
    if (props.visible) {
      if (props.current) {
        form.setFieldsValue(props.current);
      } else {
        form.resetFields();
      }
    }
  }, [props.visible]);

  const onFinish = (values: any) => {
    if (props.current?.dictId) {
      updateDictItem({ ...values, dictItemId: props.current.dictItemId }).then(() => {
        props.onSuccess();
      });
    } else {
      addDictItem({ ...values, dictId: props.info.dictId }).then(() => {
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
        width={650}
        destroyOnClose
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          name="basic"
          onFinish={onFinish}
          initialValues={{}}
        >
          <Form.Item label="名称" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="值" name="value" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="描述" name="description">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default DictItemModal;
