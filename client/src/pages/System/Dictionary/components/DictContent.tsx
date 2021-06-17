import React, { useState, useEffect } from 'react';
import { Drawer, Button, Table, Space, Popconfirm } from 'antd';

import { getDictItemAll, delDictItem } from '@/api/dictionary';
import DictItemModal from './DictItemModal';

type DictContentProps = {
  onClose: () => void;
  visible: boolean;
  current: any;
};

const DictContent: React.FC<DictContentProps> = (props) => {
  const [currentRow, setCurrentRow] = useState<any>();

  // List
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  // DictItemModal
  const [dictItemModalVisible, setDictItemModalVisible] = useState(false);

  const fetchList = (params = { dictId: props.current.dictId }) => {
    setLoading(true);
    getDictItemAll({ ...params }).then((res) => {
      setLoading(false);
      const { data } = res;
      setList(data);
    });
  };

  // 打开的回调
  useEffect(() => {
    if (props.visible) {
      fetchList();
    }
  }, [props.visible]);

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '值',
      dataIndex: 'value',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
    {
      title: '更新时间',
      dataIndex: 'createdAt',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              setCurrentRow(record);
              setDictItemModalVisible(true);
            }}
          >
            编辑
          </a>

          <Popconfirm
            title="确定删除吗?"
            onConfirm={() => {
              delDictItem({ dictItemId: record.dictItemId }).then(() => {
                fetchList();
              });
            }}
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Drawer
        title="字典详情"
        placement="right"
        onClose={props.onClose}
        visible={props.visible}
        width="850"
        destroyOnClose
      >
        <div>
          <div className="site-toolbar">
            <Button
              type="primary"
              onClick={() => {
                setCurrentRow(undefined);
                setDictItemModalVisible(true);
              }}
            >
              添加子项
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={list}
            rowKey="dictItemId"
            pagination={false}
            loading={loading}
          />
        </div>
      </Drawer>

      {/* 字典子项弹窗 */}
      {props.current && (
        <DictItemModal
          visible={dictItemModalVisible}
          onSuccess={() => {
            fetchList();
            setDictItemModalVisible(false);
          }}
          onCancel={() => {
            setDictItemModalVisible(false);
          }}
          current={currentRow}
          info={{ dictId: props.current?.dictId }}
        />
      )}
    </>
  );
};

export default DictContent;
