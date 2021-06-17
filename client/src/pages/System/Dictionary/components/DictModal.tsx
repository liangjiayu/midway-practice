import React, { useEffect } from 'react';
import { Form, Input, Modal } from 'antd';

import { addDict, updateDict } from '@/api/dictionary';

type DictModalProps = {
  onCancel: () => void;
  onSuccess: () => void;
  visible: boolean;
  current: any;
};

const DictModal: React.FC<DictModalProps> = (props) => {
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
      updateDict({ ...values, dictId: props.current.dictId }).then(() => {
        props.onSuccess();
      });
    } else {
      addDict(values).then(() => {
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
          <Form.Item label="字典名称" name="dictName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="字典编码" name="dictCode" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="描述" name="description" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default DictModal;
