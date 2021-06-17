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

const MenuPerm = (props) => {
  const [checkedKeys, setCheckedKeys] = useState([]);

  const onCheck = (keys) => {
    setCheckedKeys(keys.checked);
  };

  useEffect(() => {
    if (props.visible) {
      if (props.current && props.current.menuPerm) {
        const menuPerm = props.current.menuPerm.split(',');
        setCheckedKeys(menuPerm);
      } else {
        setCheckedKeys([]);
      }
    }
  }, [props.visible]);

  return (
    <>
      <Drawer
        title="菜单授权"
        placement="right"
        onClose={props.onCancel}
        visible={props.visible}
        width="600"
        destroyOnClose
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={props.onCancel} style={{ marginRight: 8 }}>
              取消
            </Button>
            <Button
              onClick={() => {
                props.onSuccess(checkedKeys);
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
