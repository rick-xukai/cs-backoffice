import React from 'react';
import { Descriptions } from 'antd';

interface DescriptionItemType {
  key: string;
  value: string;
}
interface DescriptionListType {
  columns: object[];
  dataSource: object[];
}

const DescriptionsList = ({ columns, dataSource }: DescriptionListType) => {
  const data: Array<any> = [];
  dataSource.forEach((item: any, index: number) => {
    const columnsData: Array<any> = [];
    columns.forEach((column: any) => {
      let columnValue =
        column.dataIndex && item[column.dataIndex]
          ? item[column.dataIndex]
          : '';
      if (column.render) {
        columnValue = column.render(columnValue, item, index);
      }
      columnsData.push({
        key: column.title,
        value: columnValue,
      });
    });
    data.push(columnsData);
  });
  return (
    <>
      {data.map((item, index) => (
        <Descriptions
          key={`descriptions_list_${index}`}
          bordered
          layout="vertical"
          size="small"
          style={{ marginBottom: 20 }}
        >
          {item.map((v: DescriptionItemType, i: number) => (
            <Descriptions.Item key={`descriptions_item_${i}`} label={v.key}>
              {v.value}
            </Descriptions.Item>
          ))}
        </Descriptions>
      ))}
    </>
  );
};

export default DescriptionsList;
