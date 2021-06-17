import React, { useState, useEffect } from 'react';
import { Card, Table, Space, Button, Popconfirm } from 'antd';

import RoleModal from './components/RoleModal';
import MenuPerm from './components/MenuPerm';
import ApiPerm from './components/ApiPerm';

import { getRoleAll, updateRole, delRole } from '@/api/role';

const RoleView = () => {
  const [currentRow, setCurrentRow] = useState<any>();

  // RoleModal
  const [roleModalVisible, setRoleModalVisible] = useState(false);

  // MenuPerm
  const [menuPermVisible, setMenuPermVisible] = useState(false);

  // ApiPerm
  const [apiPermVisible, setApiPermVisible] = useState(false);

  // List
  const [list, setList] = useState([]);

  const fetchList = () => {
    getRoleAll({}).then((res) => {
      const { data } = res;
      setList(data);
    });
  };

  useEffect(() => {
    fetchList();
  }, []);

  const columns = [
    {
      title: '角色编码',
      dataIndex: 'roleCode',
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
    {
      title: '修改时间',
      dataIndex: 'updatedAt',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              setCurrentRow(record);
              setRoleModalVisible(true);
            }}
          >
            编辑
          </a>
          <a
            onClick={() => {
              setCurrentRow(record);
              setMenuPermVisible(true);
            }}
          >
            菜单授权
          </a>
          <a
            onClick={() => {
              setCurrentRow(record);
              setApiPermVisible(true);
            }}
          >
            接口授权
          </a>
          <Popconfirm
            title="确定删除吗?"
            onConfirm={() => {
              delRole({ roleId: record.roleId }).then(() => {
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
            setRoleModalVisible(true);
          }}
        >
          新增角色
        </Button>
      </div>

      {/* 角色详情 */}
      <RoleModal
        visible={roleModalVisible}
        onCancel={() => {
          setCurrentRow(undefined);
          setRoleModalVisible(false);
        }}
        onSuccess={() => {
          setRoleModalVisible(false);
          fetchList();
        }}
        current={currentRow}
      />

      {/* 菜单授权 */}
      <MenuPerm
        visible={menuPermVisible}
        onCancel={() => {
          setCurrentRow(undefined);
          setMenuPermVisible(false);
        }}
        onSuccess={(keys) => {
          setMenuPermVisible(false);
          updateRole({ roleId: currentRow.roleId, menuPerm: keys.join() }).then(() => {
            fetchList();
          });
        }}
        current={currentRow}
      />

      <ApiPerm
        visible={apiPermVisible}
        onCancel={() => {
          setApiPermVisible(false);
        }}
        onSuccess={() => {
          setApiPermVisible(false);
          fetchList();
        }}
        current={currentRow}
      ></ApiPerm>

      <Table columns={columns} dataSource={list} rowKey="roleId" />
    </Card>
  );
};

export default RoleView;
