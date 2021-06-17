/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Button, Space, Form, Row, Col, Input } from 'antd';

export type SearchMoreProp = {
  onSearch: (values) => void;
  formData?: any;
};

const SearchMore: React.FC<SearchMoreProp> = (props) => {
  const { onSearch, formData } = props;

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    onSearch(values);
  };

  const initForm = () => {
    if (!formData) {
      return;
    }
    form.setFieldsValue(formData);
  };

  const onReset = () => {
    form.resetFields();
    form.submit();
  };

  useEffect(() => {
    initForm();
  }, []);

  return (
    <Form form={form} name="SearchMore" onFinish={onFinish}>
      <Row gutter={24}>
        <Col>
          <Form.Item label="关键字" name="keyword">
            <Input placeholder="placeholder" />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button onClick={onReset}>重置</Button>
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchMore;
