import React, { useEffect, useState } from 'react';
import { Modal, Tree, message } from 'antd';

import { updateRole } from '@/api/role';
import ApiAuth from '../ApiAuth.json';

type ApiPermProps = {
  onCancel: () => void;
  onSuccess: () => void;
  visible: boolean;
  current: any;
};

const handleApiTree = (data) => {
  const tree = data.map((item) => {
    return {
      title: item.name,
      key: item.value,
      children: item.children ? handleApiTree(item.children) : [],
    };
  });

  return tree;
};

const apiTree = handleApiTree(ApiAuth);

const ApiPerm: React.FC<ApiPermProps> = (props) => {
  const [checkedKeys, setCheckedKeys] = useState([]);

  const onCheck = (keys) => {
    setCheckedKeys(keys);
  };

  const onSubmit = () => {
    updateRole({
      roleId: props.current.roleId,
      apiPerm: checkedKeys
        .filter((i: string) => {
          return i.includes(':');
        })
        .join(),
    }).then(() => {
      message.success('提交成功');
      props.onSuccess();
    });
  };

  useEffect(() => {
    if (props.visible) {
      if (props.current && props.current.apiPerm) {
        const apiPerm = props.current.apiPerm.split(',');
        setCheckedKeys(apiPerm);
      } else {
        setCheckedKeys([]);
      }
    }
  }, [props.visible]);

  return (
    <>
      <Modal
        title="API管理"
        visible={props.visible}
        onOk={onSubmit}
        onCancel={props.onCancel}
        width={640}
        destroyOnClose
      >
        <div>
          <Tree
            checkable
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            treeData={apiTree}
            defaultExpandAll
          />
        </div>
      </Modal>
    </>
  );
};

export default ApiPerm;
