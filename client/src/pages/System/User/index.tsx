import React, { useState, useEffect } from 'react';
import { Card, Table, Space, Button, Popconfirm } from 'antd';

import UserModal from './components/UserModal';
import { getUserList, delUser } from '@/api/user';

const listParams = {
  pageSize: 10,
  pageNum: 1,
};

const UserView = () => {
  const [currentRow, setCurrentRow] = useState<any>();

  // UserModal
  const [userModalVisible, setUserModalVisible] = useState(false);

  // List
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState({ current: 1, pageSize: 10, total: 0 });

  const fetchList = () => {
    setLoading(true);
    getUserList({ ...listParams }).then((res) => {
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
      title: '用户名称',
      dataIndex: 'username',
    },
    // {
    //   title: '角色名称',
    //   dataIndex: 'roleId',
    // },
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
              setUserModalVisible(true);
            }}
          >
            编辑
          </a>

          <Popconfirm
            title="确定删除吗?"
            onConfirm={() => {
              delUser({ userId: record.userId }).then(() => {
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
            setUserModalVisible(true);
          }}
        >
          新增用户
        </Button>
      </div>

      {/* 用户弹窗 */}
      <UserModal
        visible={userModalVisible}
        onCancel={() => {
          setUserModalVisible(false);
        }}
        onSuccess={() => {
          setUserModalVisible(false);
          fetchList();
        }}
        current={currentRow}
      ></UserModal>

      <Table
        columns={columns}
        dataSource={list}
        rowKey="userId"
        pagination={pages}
        loading={loading}
        onChange={onChangeTable}
      />
    </Card>
  );
};

export default UserView;
