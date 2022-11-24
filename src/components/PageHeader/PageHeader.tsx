import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import { MenuOutlined, ArrowLeftOutlined } from '@ant-design/icons';

import { Colors } from '../../theme';
import { useToggleMenu } from '../../hooks';

const PageHeaderContainer = styled(Row)`
  padding-left: 24px;
  padding-right: 24px;
  height: 60px;
  background: ${Colors.white};
  align-items: center;
  position: fixed;
  width: 100%;
  z-index: 1;
  box-shadow: 0px 1px 2px rgb(0 0 0 / 4%);
  .title,
  .top-menu-btn {
    font-weight: 700;
    font-size: 20px;
  }
  .top-menu-btn {
    display: none;
    @media (max-width: 996px) {
      display: inline-block;
      margin-right: 15px;
    }
  }
  .anticon-arrow-left {
    font-size: 18px;
    margin-right: 16px;
  }
`;

const PageHeaderComponent = ({
  title,
  showBackArrow = false,
}: {
  title: string;
  showBackArrow?: boolean;
}) => {
  const { toggleMenu } = useToggleMenu();

  return (
    <PageHeaderContainer className="page-header">
      <Col>
        {React.createElement(MenuOutlined, {
          className: 'top-menu-btn',
          onClick: toggleMenu,
        })}
        {showBackArrow && <ArrowLeftOutlined />}
        <span className="title">{title}</span>
      </Col>
    </PageHeaderContainer>
  );
};

export default PageHeaderComponent;
