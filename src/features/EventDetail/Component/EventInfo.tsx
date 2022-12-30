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
    <EventInfoContainer gutter={[24, 24]}>
      <Col span={12}>
        <div className="main-box">
          <div>
            <Row className="item">
              <Col span={24} className="item-key">
                {t('Event Name')}
              </Col>
              <Col span={24}>{data.event_name}</Col>
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
              <Col span={24}>{data.time}</Col>
            </Row>
            <Row className="item">
              <Col span={24} className="item-key">
                {t('Date')}
              </Col>
              <Col span={24}>{data.date}</Col>
            </Row>
            <Row className="item">
              <Col span={24} className="item-key">
                {t('Event Description')}
              </Col>
              <Col span={24}>{data.event_description}</Col>
            </Row>
          </div>
        </div>
      </Col>
      <Col span={12}>
        {!isEmpty(data.ticketInfo) && (
          <div className="main-box">
            <div className="ticket-info">
              {data.ticketInfo.map((item) => (
                <div className="item-main" key={item.ticket_type}>
                  <Row className="item">
                    <Col span={9} className="item-key">
                      {t('Ticket Type')}
                    </Col>
                    <Col span={15}>{item.ticket_type}</Col>
                  </Row>
                  <Row className="item">
                    <Col span={9} className="item-key">
                      {t('NFT Image')}
                    </Col>
                    <Col span={15}>
                      <img className="nft-img" src={item.nft_image} alt="" />
                    </Col>
                  </Row>
                  <Row className="item">
                    <Col span={9} className="item-key">
                      {t('NFT Description')}
                    </Col>
                    <Col span={15}>{item.nft_description}</Col>
                  </Row>
                </div>
              ))}
            </div>
          </div>
        )}
      </Col>
    </EventInfoContainer>
  );
};

export default EventInfo;
