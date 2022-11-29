import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'antd';
import { isEmpty } from 'lodash';

import { EventDetailDataType } from '../EventDetail.slice';
import { EventInfoContainer } from '../EventDetailComponent';

const EventInfo = ({ data }: { data: EventDetailDataType }) => {
  const { t } = useTranslation();

  if (!data) {
    return null;
  }

  return (
    <div>
      <EventInfoContainer>
        <div>
          <Col span={24} className="title">
            Lorem ipsum
          </Col>
          <Row className="item">
            <Col span={8} className="item-key">
              {t('Event Name')}
            </Col>
            <Col span={16}>{data.event_name}</Col>
          </Row>
          <Row className="item">
            <Col span={8} className="item-key">
              {t('Organizer')}
            </Col>
            <Col span={16}>{data.organizer}</Col>
          </Row>
          <Row className="item">
            <Col span={8} className="item-key">
              {t('Event Description')}
            </Col>
            <Col span={16}>{data.event_description}</Col>
          </Row>
          <Row className="item">
            <Col span={8} className="item-key">
              {t('Location')}
            </Col>
            <Col span={16}>{data.location}</Col>
          </Row>
          <Row className="item">
            <Col span={8} className="item-key">
              {t('Date')}
            </Col>
            <Col span={16}>{data.date}</Col>
          </Row>
          <Row className="item">
            <Col span={8} className="item-key">
              {t('Time')}
            </Col>
            <Col span={16}>{data.time}</Col>
          </Row>
        </div>
      </EventInfoContainer>
      {!isEmpty(data.ticketInfo) && (
        <EventInfoContainer style={{ marginTop: 24 }}>
          <div className="ticket-info">
            <Col span={24} className="title">
              Lorem ipsum
            </Col>
            {data.ticketInfo.map((item) => (
              <div className="item-main" key={item.ticket_type}>
                <Row className="item">
                  <Col span={8} className="item-key">
                    {t('Ticket Type')}
                  </Col>
                  <Col span={16}>{item.ticket_type}</Col>
                </Row>
                <Row className="item">
                  <Col span={8} className="item-key">
                    {t('NFT Image')}
                  </Col>
                  <Col span={16}>
                    <img className="nft-img" src={item.nft_image} alt="" />
                  </Col>
                </Row>
                <Row className="item">
                  <Col span={8} className="item-key">
                    {t('NFT Description')}
                  </Col>
                  <Col span={16}>{item.nft_description}</Col>
                </Row>
              </div>
            ))}
          </div>
        </EventInfoContainer>
      )}
    </div>
  );
};

export default EventInfo;
