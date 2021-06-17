import React, { useState, useEffect } from 'react';
import { Card, Table, Space, Button, Popconfirm } from 'antd';

import { getDictList, delDict } from '@/api/dictionary';
import DictModal from './components/DictModal';
import DictContent from './components/DictContent';

const listParams = {
  pageSize: 10,
  pageNum: 1,
};

const UserView = () => {
  const [currentRow, setCurrentRow] = useState<any>();

  // DictModal
  const [dictModalVisible, setDictModalVisible] = useState(false);

  // DictContent
  const [dictContentVisible, setDictContentVisible] = useState(false);

  // List
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState({ current: 1, pageSize: 10, total: 0 });

  const fetchList = () => {
    setLoading(true);
    getDictList({ ...listParams }).then((res) => {
      setLoading(false);
      const { data } = res;
      setList(data.rows);
      setPages({
        current: data.current,
        pageSize: data.size,
        total: data.total,
      });
    });
  };

  const onChangeTable = (pagination: any) => {
    listParams.pageSize = pagination.pageSize;
    listParams.pageNum = pagination.current;
    fetchList();
  };

  useEffect(() => {
    fetchList();
  }, []);

  const columns = [
    {
      title: '字典名称',
      dataIndex: 'dictName',
    },
    {
      title: '字典编码',
      dataIndex: 'dictCode',
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
              setDictModalVisible(true);
            }}
          >
            编辑
          </a>

          <a
            onClick={() => {
              setCurrentRow(record);
              setDictContentVisible(true);
            }}
          >
            内容
          </a>

          <Popconfirm
            title="确定删除吗?"
            onConfirm={() => {
              delDict({ dictId: record.dictId }).then(() => {
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
    <Card>
      <div className="site-toolbar">
        <Button
          type="primary"
          onClick={() => {
            setCurrentRow(undefined);
            setDictModalVisible(true);
          }}
        >
          新增字典
        </Button>
      </div>

      {/* 字典弹窗 */}
      <DictModal
        visible={dictModalVisible}
        onCancel={() => {
          setDictModalVisible(false);
        }}
        onSuccess={() => {
          setDictModalVisible(false);
          fetchList();
        }}
        current={currentRow}
      />

      {/* 子项详情 */}
      <DictContent
        visible={dictContentVisible}
        onClose={() => {
          setDictContentVisible(false);
        }}
        current={currentRow}
      />

      <Table
        columns={columns}
        dataSource={list}
        rowKey="dictId"
        pagination={pages}
        loading={loading}
        onChange={onChangeTable}
      />
    </Card>
  );
};

export default UserView;
