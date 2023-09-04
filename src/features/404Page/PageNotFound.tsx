import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '../../app/hooks';
import { triggerMenuAction } from '../../app/menu.slice';
import { Colors, Images } from '../../theme';
import PageHeader from '../../components/PageHeader';

const LayoutNotFound = styled.div`
  @media (min-width: 992px) {
    .page-header {
      display: none;
    }
  }
`;

const PageNotFoundContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .page-main {
    text-align: center;
    width: 300px;
    img {
      margin-bottom: 16px;
    }
    p {
      color: ${Colors.grayScale70};
      text-align: center;
      font-size: 17px;
      font-weight: 500;
      line-height: 24px;
      margin-bottom: 20px;
    }
    .ant-btn {
      width: 140px;
      color: ${Colors.white};
      font-size: 15px;
      font-weight: 500;
    }
  }
`;

const PageNotFound = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(triggerMenuAction({ openKeys: '', selectedKeys: '' }));
  }, []);

  return (
    <LayoutNotFound>
      <PageHeader />
      <PageNotFoundContainer>
        <div className="page-main">
          <img src={Images.PageNotFoundIcon} alt="" />
          <p>{t('Whoops, the page you are looking for was not found.')}</p>
          <Link to="/">
            <Button type="primary">{t('Back to Home')}</Button>
          </Link>
        </div>
      </PageNotFoundContainer>
    </LayoutNotFound>
  );
};

export default PageNotFound;
