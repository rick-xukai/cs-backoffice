import React from 'react';
import { Col, Row, Table } from 'antd';
import styled from 'styled-components';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { TablePaginationConfig } from 'antd/lib/table';
import { PanelRender, RowClassName } from 'rc-table/lib/interface';

import DescriptionsList from './DescriptionsList';

/* eslint-disable no-nested-ternary, complexity */
interface ColorType {
  text?: string;
  bg?: string;
  hoverText?: string;
  hoverBg?: string;
}
interface TableBoxType {
  rowKey: string;
  columns: object[];
  dataSource: object[];
  className?: string;
  color?: ColorType;
  dark?: boolean;
  bordered?: boolean;
  neat?: boolean;
  disableHover?: boolean;
  pagination?: false | TablePaginationConfig;
  size?: SizeType;
  scroll?: {
    x?: number | true | string;
    y?: number | string;
  } & {
    scrollToFirstRowOnChange?: boolean;
  };
  rowClassName?: string | RowClassName<object>;
  title?: PanelRender<object>;
  footer?: PanelRender<object>;
}
interface TableType extends TableBoxType {
  responsive?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
}

const TableContainer = styled(Table)<{
  color?: ColorType;
  dark?: boolean;
  neat?: boolean;
  disableHover?: boolean;
}>`
  .ant-table table {
    tr:hover > td {
      color: ${(props) =>
        props.disableHover
          ? props.color && props.color.text
            ? props.color.text
            : 'unset'
          : props.color && props.color.hoverText
          ? props.color.hoverText
          : props.dark
          ? '#fff'
          : '#001529'};
      background: ${(props) =>
        props.disableHover
          ? props.color && props.color.bg
            ? props.color.bg
            : 'unset'
          : props.color && props.color.hoverBg
          ? props.color.hoverBg
          : props.dark
          ? '#343a40'
          : '#fafafa'};
    }
  }
  .ant-table-thead > tr > th {
    color: ${(props) =>
      props.color && props.color.text
        ? props.color.text
        : props.dark
        ? '#fff'
        : '#001529'};
    background: ${(props) =>
      props.color && props.color.bg
        ? props.color.bg
        : props.dark
        ? '#001529'
        : '#fff'};
    &::before {
      display: none;
    }
  }
  .ant-table-tbody > tr > td {
    color: ${(props) =>
      props.color && props.color.text
        ? props.color.text
        : props.dark
        ? '#fff'
        : '#001529'};
    background: ${(props) =>
      props.color && props.color.bg
        ? props.color.bg
        : props.dark
        ? '#001529'
        : '#fff'};
  }
  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    border-bottom: ${(props) => (props.neat ? 0 : '1px solid #f0f0f0')};
  }
  .ant-table-title {
    padding: 0;
  }
`;

const TableBox = (props: TableBoxType) => {
  const {
    rowKey,
    columns,
    dataSource,
    className,
    color,
    dark,
    bordered,
    neat,
    disableHover,
    pagination,
    size,
    scroll,
    rowClassName,
    title,
    footer,
  } = props;
  return (
    <TableContainer
      rowKey={rowKey}
      size={size}
      className={className}
      columns={columns}
      dataSource={dataSource}
      color={color}
      dark={dark}
      bordered={bordered}
      neat={neat}
      disableHover={disableHover}
      pagination={pagination}
      scroll={scroll}
      rowClassName={rowClassName}
      title={title}
      footer={footer}
    />
  );
};

const CustomTable = (props: TableType) => {
  const { responsive, columns, dataSource } = props;
  if (responsive) {
    const colProps = { span: 0, [responsive]: 24 };
    const smallColProps = { span: 24, [responsive]: 0 };
    return (
      <Row>
        <Col {...colProps}>
          <TableBox {...props} />
        </Col>
        <Col {...smallColProps}>
          <DescriptionsList columns={columns} dataSource={dataSource} />
        </Col>
      </Row>
    );
  }
  return <TableBox {...props} />;
};

export default CustomTable;
