import React from 'react';
import styled from 'styled-components';
import { Breadcrumb as AntdBreadcrumb } from 'antd';
import { useHistory } from 'react-router-dom';
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
      max-width: ${(props) => 100 / props.length}%;
      display: flex;
      .ant-breadcrumb-link {
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        white-space: nowrap;
        color: ${Colors.black};
        font-size: 13px;
        span {
          color: ${Colors.branding};
          cursor: pointer;
        }
        :hover {
          span {
            text-decoration: underline;
          }
        }
      }
      .ant-breadcrumb-separator {
        color: ${Colors.grey7};
      }
    }
  }
`;

const Breadcrumb = ({ breadcrumb }: { breadcrumb: BreadcrumbItemProps[] }) => {
  const history = useHistory();
  return (
    <BreadcrumbContainer length={breadcrumb.length}>
      {breadcrumb.map((item) => (
        <AntdBreadcrumbItem key={item.label}>
          {(item.href && (
            <span onClick={() => history.push(item.href || '')}>
              {item.label}
            </span>
          )) ||
            item.label}
        </AntdBreadcrumbItem>
      ))}
    </BreadcrumbContainer>
  );
};

export default Breadcrumb;
