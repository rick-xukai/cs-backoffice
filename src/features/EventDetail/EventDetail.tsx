import React, { useEffect } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { message, Row, Col, Button } from 'antd';

import { useCookie } from '../../hooks';
import { CookieKeys } from '../../constants/Keys';
import { logoutAction } from '../Authentication/Login/Login.slice';
import {
  defaultCurrentPage,
  defaultPageSize,
  TokenExpireResponseCode,
} from '../../constants/General';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { UserRoutes, AuthRoutes } from '../../navigation/Routes';
import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import { EventDetailContainer } from './EventDetailComponent';
import {
  getEventDetailAction,
  selectDetailData,
  EventDetailDataType,
  selectError,
  reset,
} from './EventDetail.slice';

interface RouteConfigType {
  state: {
    currentPage: number;
    currentPageSize: number;
    eventTicketsPage: number;
    eventTicketsPageSize: number;
  };
}

const EventDetail = () => {
  const { t } = useTranslation();
  const { id }: { id: string } = useParams();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const location: RouteConfigType = useLocation();
  const cookies = useCookie([CookieKeys.authUser]);

  const error = useAppSelector(selectError);
  const detailData: EventDetailDataType = useAppSelector(selectDetailData);

  const onLogout = async () => {
    cookies.removeCookie(CookieKeys.authUser);
    await dispatch(logoutAction());
    history.push(AuthRoutes.login);
  };

  // eslint-disable-next-line
  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    if (error) {
      if (error.code === TokenExpireResponseCode) {
        onLogout();
        message.error(t('User token is deprecated, please log in again.'));
        return;
      }
      message.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    dispatch(getEventDetailAction(id));
  }, []);

  return (
    <EventDetailContainer>
      <PageHeaderComponent
        title={t('Event Details')}
        showBackArrow
        clickBack={() =>
          history.push(
            `${UserRoutes.events}?page=${
              (location.state && location.state.currentPage) ||
              defaultCurrentPage
            }&pageSize=${
              (location.state && location.state.currentPageSize) ||
              defaultPageSize
            }`,
          )
        }
      />
      <div className="page-main">
        <Row>
          <Col span={24} className="edit-event">
            <Button disabled={detailData && detailData.status !== 1}>
              {t('Edit')}
            </Button>
          </Col>
        </Row>
      </div>
    </EventDetailContainer>
  );
};

export default EventDetail;
