import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import { MenuOutlined, ArrowLeftOutlined } from '@ant-design/icons';

import { Colors } from '../../theme';
import { useToggleMenu } from '../../hooks';

const PageHeaderContainer = styled.div`
  padding-right: 24px;
  padding-left: 24px;
  height: 60px;
  z-index: 10;
  &.children-header {
    padding-top: 16px;
    height: unset;
  }
  background: ${Colors.white};
  align-items: center;
  position: fixed;
  width: calc(100% - 240px);
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
  .ant-tabs {
    margin-top: -5px;
  }
  .ant-tabs-nav {
    margin: 0;
  }
  .ant-tabs-tab {
    font-weight: 500;
    font-size: 15px;
    color: ${Colors.black5};
  }
  .title-content {
    height: 60px;
    display: flex;
    align-items: center;
  }
  .content-text {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: end;
    p {
      margin: 0;
      font-size: 17px;
      color: ${Colors.black6};
    }
  }
  .cursor-pointer {
    cursor: pointer;
  }
  @media (max-width: 996px) {
    .title-content {
      height: unset;
    }
    .anticon-menu {
      position: absolute;
      left: 24px;
      top: 5px;
    }
    .title-content {
      margin-left: 48px;
    }
  }
`;

const PageHeaderComponent = ({
  title,
  showBackArrow = false,
  clickBack,
  children,
  showRightContent = null,
}: {
  title: string;
  showRightContent?: React.ReactChild | null;
  showBackArrow?: boolean;
  clickBack?: () => void;
  children?: React.ReactChild;
}) => {
  const { toggleMenu } = useToggleMenu();

  return (
    <PageHeaderContainer className={`${(children && 'children-header') || ''}`}>
      <Row>
        <Col
          span={(!showRightContent && 24) || 12}
          style={{ marginBottom: children && 16 }}
          onClick={clickBack}
        >
          {React.createElement(MenuOutlined, {
            className: 'top-menu-btn',
            onClick: (e) => {
              e.stopPropagation();
              toggleMenu();
            },
          })}
          <div
            className={
              (showBackArrow && 'title-content cursor-pointer') ||
              'title-content'
            }
          >
            <span>
              {showBackArrow && <ArrowLeftOutlined />}
              <span className="title">{title}</span>
            </span>
          </div>
        </Col>
        {showRightContent && (
          <Col span={12}>
            <div className="content-text">{showRightContent}</div>
          </Col>
        )}
        {children && <Col span={24}>{children}</Col>}
      </Row>
    </PageHeaderContainer>
  );
};

export default PageHeaderComponent;
