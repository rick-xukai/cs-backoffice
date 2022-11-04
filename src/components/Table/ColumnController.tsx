import React, { useEffect, useState, useMemo, memo } from 'react';
import { Checkbox, Space, Popconfirm, Button, Divider } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { MenuOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import { IOption } from '../../constants/types';

const SpaceBox = styled(Space)`
  margin-left: -22px;
`;
const DividerBox = styled(Divider)`
  margin: 0;
`;
const CheckBoxGroup = styled(Checkbox.Group)`
  display: flex;
  flex-direction: column;
  .ant-popover-message-title {
    padding-left: 0;
  }
  .ant-checkbox-group-item {
    margin-bottom: 5px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const getAllColumnOption = (
  columns: object[],
  key: 'key' | 'dataIndex',
  ignore?: string[],
) => {
  const result: IOption[] = [];
  let newColumns = [...columns];
  if (ignore && ignore.length) {
    newColumns = columns.filter(
      (item: ColumnType<object>) =>
        item[key] && !ignore.includes(item[key] as string),
    );
  }
  newColumns.forEach(
    (item: ColumnType<object>) =>
      item[key] &&
      result.push({
        label: item.title as string,
        value: item[key] as string,
      }),
  );
  return result;
};

const ColumnController = ({
  columns,
  columnKey,
  ignoreColumnKeys,
  values,
  onChange,
}: {
  columns: object[];
  columnKey: 'key' | 'dataIndex';
  ignoreColumnKeys?: string[];
  values: string[];
  onChange: (keys: string[]) => void;
}) => {
  const allColumnsOption = getAllColumnOption(
    columns,
    columnKey,
    ignoreColumnKeys,
  );
  const allColumnsKey = allColumnsOption.map((item) => item.value);
  const [selectedColumnKey, setSelectedColumnKey] = useState<string[]>([]);
  const onFilterColumns = () => {
    onChange(selectedColumnKey);
  };
  const onSelectColumns = (value: any) => {
    setSelectedColumnKey(value);
  };
  const onSelectAllColumns = () => {
    setSelectedColumnKey(allColumnsKey);
  };
  const onClearAllColumns = () => {
    setSelectedColumnKey([]);
  };
  const resetSelectedColumns = (visible: boolean) => {
    if (visible) {
      setSelectedColumnKey(values);
    }
  };
  useEffect(() => {
    setSelectedColumnKey(values);
  }, []);
  const controllerBox = useMemo(
    () => (
      <SpaceBox direction="vertical">
        Show Columns:
        <div>
          <Button size="small" type="link" onClick={onSelectAllColumns}>
            All
          </Button>
          <Button size="small" type="link" onClick={onClearAllColumns}>
            Clear
          </Button>
        </div>
        <DividerBox />
        <CheckBoxGroup
          options={allColumnsOption}
          value={selectedColumnKey}
          onChange={onSelectColumns}
        />
        <DividerBox />
      </SpaceBox>
    ),
    [selectedColumnKey],
  );
  return (
    <Popconfirm
      icon={null}
      placement="bottomRight"
      title={controllerBox}
      onConfirm={onFilterColumns}
      onVisibleChange={resetSelectedColumns}
    >
      <Button size="small" type="text" icon={<MenuOutlined />} />
    </Popconfirm>
  );
};

export default memo(ColumnController);
