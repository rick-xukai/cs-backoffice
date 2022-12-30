import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'antd';
import { isEmpty } from 'lodash';

import { FormatTimeKeys } from '../../../constants/Keys';
import { formatTimeStrByTimeString } from '../../../utils/func';
import { EventDetailDataType } from '../EventDetail.slice';
import {
  EventInfoContainer,
  TicketTypesContainer,
} from '../EventDetailComponent';

const EventInfo = ({ data }: { data: EventDetailDataType }) => {
  const { t } = useTranslation();
  const mainBoxLeft = useRef(null);

  const [ticketTypesContainerHeight, setTicketTypesContainerHeight] =
    useState<string>('0px');

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setTicketTypesContainerHeight(`${mainBoxLeft.current.clientHeight}px`);
  }, []);

  if (!data) {
    return null;
  }

  return (
    <EventInfoContainer gutter={[24, 24]}>
      <Col span={12}>
        <div className="main-box" ref={mainBoxLeft}>
          <div>
            <Row className="item">
              <Col span={24} className="item-key">
                {t('Event Name')}
              </Col>
              <Col span={24}>{data.eventName}</Col>
            </Row>
            <Row className="item">
              <Col span={24} className="item-key">
                {t('Organizer')}
              </Col>
              <Col span={24}>{data.organizer}</Col>
            </Row>
            <Row className="item">
              <Col span={24} className="item-key">
                {t('Location')}
              </Col>
              <Col span={24}>{data.location}</Col>
            </Row>
            <Row className="item">
              <Col span={24} className="item-key">
                {t('Time')}
              </Col>
              <Col span={24}>
                {(data.eventStartTime &&
                  data.eventEndTime &&
                  `${formatTimeStrByTimeString(
                    data.eventStartTime,
                    FormatTimeKeys.hm,
                  )}~${formatTimeStrByTimeString(
                    data.eventEndTime,
                    FormatTimeKeys.hm,
                  )}`) ||
                  '-'}
              </Col>
            </Row>
            <Row className="item">
              <Col span={24} className="item-key">
                {t('Date')}
              </Col>
              <Col span={24}>
                {(data.eventStartTime &&
                  formatTimeStrByTimeString(
                    data.eventStartTime,
                    FormatTimeKeys.mdy,
                  )) ||
                  '-'}
              </Col>
            </Row>
            <Row className="item" style={{ marginBottom: 0 }}>
              <Col span={24} className="item-key">
                {t('Event Description')}
              </Col>
              <Col span={24}>{data.eventDesc}</Col>
            </Row>
          </div>
        </div>
      </Col>
      <Col span={12}>
        {!isEmpty(data.ticketTypes) && (
          <TicketTypesContainer containerHight={ticketTypesContainerHeight}>
            <div className="ticket-info">
              {data.ticketTypes.map((item) => (
                <div className="item-main" key={item.id}>
                  <Row className="item">
                    <Col span={9} className="item-key">
                      {t('Ticket Type')}
                    </Col>
                    <Col span={15}>{item.name}</Col>
                  </Row>
                  <Row className="item">
                    <Col span={9} className="item-key">
                      {t('NFT Image')}
                    </Col>
                    <Col span={15}>
                      <img className="nft-img" src={item.image} alt="" />
                    </Col>
                  </Row>
                  <Row className="item">
                    <Col span={9} className="item-key">
                      {t('NFT Description')}
                    </Col>
                    <Col span={15}>{item.description || '-'}</Col>
                  </Row>
                </div>
              ))}
            </div>
          </TicketTypesContainer>
        )}
      </Col>
    </EventInfoContainer>
  );
};

export default EventInfo;
