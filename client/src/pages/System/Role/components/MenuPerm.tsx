import React, { useState, useEffect } from 'react';
import { Drawer, Button, Tree } from 'antd';
import routes from '../../../../../config/routes';

const transferMenu = (data: any[] = []) => {
  const treeData: any[] = [];
  data.forEach((item) => {
    if (!item.name || !item.path) {
      return;
    }
    if (item.access !== 'roleAuth') {
      return;
    }
    // if (item.hideInMenu) {
    //   return;
    // }
    const row: any = {
      title: item.name,
      key: item.path,
    };
    if (item.routes && item.routes.length) {
      row.children = transferMenu(item.routes);
    }
    treeData.push(row);
  });

  return treeData;
};

const treeData = transferMenu(routes);

type MenuPermProps = {
  visible: boolean;
  current: any;
  onSuccess: (keys: any[]) => void;
  onCancel: () => void;
};

const MenuPerm: React.FC<MenuPermProps> = (props) => {
  const { visible, current, onSuccess, onCancel } = props;
  const [checkedKeys, setCheckedKeys] = useState([]);

  const onCheck = (checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue.checked);
  };

  useEffect(() => {
    if (visible) {
      if (current?.menuPerm) {
        const menuPerm = JSON.parse(current.menuPerm);
        setCheckedKeys(menuPerm);
      } else {
        setCheckedKeys([]);
      }
    }
  }, [visible]);

  return (
    <>
      <Drawer
        title="菜单授权"
        placement="right"
        onClose={onCancel}
        visible={visible}
        width="600"
        // destroyOnClose
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={onCancel} style={{ marginRight: 8 }}>
              取消
            </Button>
            <Button
              onClick={() => {
                onSuccess(checkedKeys);
              }}
              type="primary"
            >
              保存
            </Button>
          </div>
        }
      >
        <div>
          <Tree
            checkable
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            treeData={treeData}
            defaultExpandAll
            checkStrictly
          />
        </div>
      </Drawer>
    </>
  );
};

export default MenuPerm;
