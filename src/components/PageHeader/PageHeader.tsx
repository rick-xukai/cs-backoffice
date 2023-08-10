import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Row, Col, message, Image } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import { selectSidebarType } from '../../app/layout.slice';
import { useAppSelector } from '../../app/hooks';
import { AuthRoutes } from '../../navigation/Routes';
import { base64Decrypt } from '../../utils/func';
import { CookieKeys } from '../../constants/Keys';
import { Colors, Images } from '../../theme';
import { useToggleMenu, useCookie } from '../../hooks';
import Breadcrumb from './Breadcrumb.component';

const PageHeaderContainer = styled.div`
  padding-right: 24px;
  padding-left: 24px;
  z-index: 11;
  @media (min-width: 996px) {
    min-height: 60px;
  }
  &.children-header {
    padding-top: 16px;
    height: unset;
  }
  .back-page {
    cursor: pointer;
    .anticon {
      font-size: 15px;
      color: ${Colors.branding};
      margin-right: 5px;
    }
    .title {
      font-size: 15px;
      font-weight: 400;
      line-height: 21px;
      color: ${Colors.branding};
      font-family: Heebo;
    }
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
    &.mobile {
      margin-left: 0;
      margin-top: 10px;
      padding-left: 15px;
      padding-right: 15px;
      height: 45px;
      .title {
        font-size: 15px;
        font-family: Heebo;
        font-weight: 400;
        line-height: 21px;
      }
    }
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
  .image-content {
    text-align: center;
    position: relative;
    > :first-child {
      position: absolute;
      left: 0;
      top: 0;
    }
    .trigger-logo {
      width: 92px;
      height: 36px;
    }
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
  @media (max-width: 992px) {
    width: 100%;
    height: auto;
    left: 0;
    padding-right: 0px;
    padding-left: 0px;
    box-shadow: unset;
    .main-row {
      height: 53px;
      align-items: center;
      background: ${Colors.black};
      padding-right: 15px;
      padding-left: 15px;
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
      &.mobile {
        .no-back {
          color: ${Colors.black};
          font-size: 24px;
          font-weight: 700;
          line-height: 32px;
          text-transform: uppercase;
        }
      }
    }
    .breadcrumb-container-mobile {
      padding: 0 20px;
      background: ${Colors.white};
    }
  }
`;

const PageHeaderComponent = ({
  title,
  showBackArrow = false,
  clickBack,
  children,
  breadcrumb,
}: {
  title?: string;
  showBackArrow?: boolean;
  clickBack?: () => void;
  children?: React.ReactChild;
  breadcrumb?: { label: string; href?: string }[];
}) => {
  const { t } = useTranslation();
  const { toggleMenu } = useToggleMenu();
  const history = useHistory();
  const cookies = useCookie([CookieKeys.authUserName]);

  const sidebarType = useAppSelector(selectSidebarType);

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
        <Col lg={15} span={24} style={{ marginBottom: children && 16 }}>
          <Col lg={0} span={24} className="image-content">
            <Image
              src={Images.MenuTrigger}
              alt=""
              preview={false}
              onClick={(e) => {
                e.stopPropagation();
                toggleMenu();
              }}
            />
            <Image
              className="trigger-logo"
              src={Images.LogoWhiteColor}
              alt=""
              preview={false}
            />
          </Col>
          <Col lg={24} span={0}>
            {breadcrumb ? <Breadcrumb breadcrumb={breadcrumb} /> : null}
            {title ? (
              <div className="title-content">
                <span>
                  {(showBackArrow && (
                    <Col className="back-page" onClick={clickBack}>
                      <LeftOutlined />
                      <span className="title">{title}</span>
                    </Col>
                  )) || (
                    <span className="title">{title.toLocaleUpperCase()}</span>
                  )}
                </span>
              </div>
            ) : null}
          </Col>
        </Col>
        <Col lg={9} span={0}>
          <div className="content-text">
            <p>
              Welcome, <b>{userName}</b> user.
            </p>
          </div>
        </Col>
        {children && <Col span={24}>{children}</Col>}
      </Row>
      {sidebarType !== 'default' && (
        <Row>
          <Col lg={0} span={24} style={{ background: Colors.grey5 }}>
            {breadcrumb ? (
              <div className="breadcrumb-container-mobile">
                <Breadcrumb breadcrumb={breadcrumb} />
              </div>
            ) : null}
            {title ? (
              <div className="title-content mobile">
                <span>
                  {(showBackArrow && (
                    <Col className="back-page" onClick={clickBack}>
                      <LeftOutlined />
                      <span className="title">{title}</span>
                    </Col>
                  )) || (
                    <span className="title no-back">
                      {title?.toLocaleUpperCase()}
                    </span>
                  )}
                </span>
              </div>
            ) : null}
          </Col>
        </Row>
      )}
    </PageHeaderContainer>
  );
};

export default PageHeaderComponent;
