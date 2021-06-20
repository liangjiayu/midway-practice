import React, { useEffect, useState } from 'react';
import { Modal, Tree, message } from 'antd';

import { updateRole } from '@/api/role';
import { getApiPerm } from '@/api/base';

type ApiPermProps = {
  onCancel: () => void;
  onSuccess: () => void;
  visible: boolean;
  current: any;
};

const ApiPerm: React.FC<ApiPermProps> = (props) => {
  const { onCancel, onSuccess, visible, current } = props;
  const [apiTreeData, setApiTreeData] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);

  useEffect(() => {
    getApiPerm({}).then((res) => {
      const { data } = res;
      if (!data) {
        return;
      }

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
      const apiTree = handleApiTree(data);
      setApiTreeData(apiTree);
    });
  }, []);

  useEffect(() => {
    if (visible) {
      if (current?.apiPerm) {
        const apiPerm = JSON.parse(current.apiPerm);
        setCheckedKeys(apiPerm);
      } else {
        setCheckedKeys([]);
      }
    }
  }, [visible]);

  const onCheck = (keys) => {
    setCheckedKeys(keys);
  };

  const onSubmit = () => {
    updateRole({
      id: current.id,
      apiPerm: JSON.stringify(
        checkedKeys.filter((i: string) => {
          return i.includes(':');
        }),
      ),
    }).then(() => {
      message.success('提交成功');
      onSuccess();
    });
  };

  return (
    <>
      <Modal
        title="API管理"
        visible={visible}
        onOk={onSubmit}
        onCancel={onCancel}
        width={640}
        destroyOnClose
      >
        <div>
          <Tree
            checkable
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            treeData={apiTreeData}
            defaultExpandAll
          />
        </div>
      </Modal>
    </>
  );
};

export default ApiPerm;
