import React, { useEffect, useState } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Spin, message, Row, Col, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { defaultCurrentPage, defaultPageSize } from '../../constants/General';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { UserRoutes } from '../../navigation/Routes';
import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import { EventDetailContainer } from './EventDetailComponent';
import {
  getEventDetailAction,
  selectDetailLoading,
  selectDetailData,
  EventDetailDataType,
  selectError,
  reset,
} from './EventDetail.slice';
import EventInfo from './Component/EventInfo';
import CreateEvent from '../CreateEvent';

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

  const error = useAppSelector(selectError);
  const loadingForDetail = useAppSelector(selectDetailLoading);
  const detailData: EventDetailDataType = useAppSelector(selectDetailData);

  const [editEvent, setEditEvent] = useState<boolean>(false);

  // eslint-disable-next-line
  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    if (error) {
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
        {(loadingForDetail && (
          <Spin
            spinning={loadingForDetail}
            indicator={<LoadingOutlined spin />}
            size="large"
          />
        )) || (
          <>
            {(editEvent && (
              <CreateEvent
                isEdit
                editEventID={id}
                setEditEvent={setEditEvent}
                eventData={detailData}
              />
            )) || (
              <>
                <Row>
                  <Col span={24} className="edit-event">
                    <Button
                      disabled={detailData.status === 2}
                      onClick={() => setEditEvent(true)}
                    >
                      {t('Edit')}
                    </Button>
                  </Col>
                </Row>
                <EventInfo data={detailData} />
              </>
            )}
          </>
        )}
      </div>
    </EventDetailContainer>
  );
};

export default EventDetail;
