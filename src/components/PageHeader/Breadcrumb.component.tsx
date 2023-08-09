import React from 'react';
import styled from 'styled-components';
import { Breadcrumb as AntdBreadcrumb } from 'antd';
import { Colors } from '../../theme';

export type BreadcrumbItemProps = {
  label: string;
  href?: string;
};

const { Item: AntdBreadcrumbItem } = AntdBreadcrumb;

const BreadcrumbContainer = styled(AntdBreadcrumb)<{ length: number }>`
  &.ant-breadcrumb ol {
    height: 60px;
    align-items: center;
    display: flex;
    flex-wrap: nowrap;
    li {
      max-width: ${(props) => 100 / props.length + 10}%;
      display: flex;
      .ant-breadcrumb-link {
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        white-space: nowrap;
        color: ${Colors.black};
        a {
          color: ${Colors.branding};
        }
      }
      .ant-breadcrumb-separator {
        color: ${Colors.grey7};
      }
    }
  }
`;

const Breadcrumb = ({ breadcrumb }: { breadcrumb: BreadcrumbItemProps[] }) => (
  <BreadcrumbContainer length={breadcrumb.length}>
    {breadcrumb.map((item) => (
      <AntdBreadcrumbItem key={item.label}>
        {item.href ? <a href={item.href}>{item.label}</a> : item.label}
      </AntdBreadcrumbItem>
    ))}
  </BreadcrumbContainer>
);

export default Breadcrumb;
