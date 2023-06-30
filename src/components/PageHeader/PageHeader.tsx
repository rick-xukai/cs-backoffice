import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Row, Col, message } from 'antd';
import { MenuOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import { AuthRoutes } from '../../navigation/Routes';
import { base64Decrypt } from '../../utils/func';
import { CookieKeys } from '../../constants/Keys';
import { Colors } from '../../theme';
import { useToggleMenu, useCookie } from '../../hooks';

const PageHeaderContainer = styled.div`
  padding-right: 24px;
  padding-left: 24px;
  height: 60px;
  z-index: 1;
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
    font-size: 24px;
    font-family: Oswald;
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
  @media (max-width: 576px) {
    .content-text {
      justify-content: start;
      p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  @media (max-width: 996px) {
    width: 100%;
    height: 70px;
    .main-row {
      height: 100%;
      align-items: center;
    }
    .title-content {
      height: unset;
    }
    .anticon-menu {
      position: absolute;
      left: 0px;
      top: 8px;
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
}: {
  title: string;
  showBackArrow?: boolean;
  clickBack?: () => void;
  children?: React.ReactChild;
}) => {
  const { t } = useTranslation();
  const { toggleMenu } = useToggleMenu();
  const history = useHistory();
  const cookies = useCookie([CookieKeys.authUserName]);

  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    if (cookies.getCookie(CookieKeys.authUserName)) {
      setUserName(
        base64Decrypt(
          cookies.getCookie(CookieKeys.authUserName),
        ).toLocaleUpperCase(),
      );
    } else {
      message.error(t('Please login again'));
      cookies.removeCookie(CookieKeys.authUser);
      history.push(AuthRoutes.login);
    }
  }, [cookies.getCookie(CookieKeys.authUserName)]);

  return (
    <PageHeaderContainer className={`${(children && 'children-header') || ''}`}>
      <Row className="main-row">
        <Col
          sm={12}
          xs={24}
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
        <Col sm={12} xs={24}>
          <div className="content-text">
            <p>
              Welcome, <b>{userName}</b> user.
            </p>
          </div>
        </Col>
        {children && <Col span={24}>{children}</Col>}
      </Row>
    </PageHeaderContainer>
  );
};

export default PageHeaderComponent;
