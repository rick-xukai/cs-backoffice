import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Tabs } from 'antd';
import { isEmpty } from 'lodash';

import { FormatTimeKeys } from '../../../constants/Keys';
import { WebAppScannerLinkDev } from '../../../constants/General';
import { formatTimeStrByTimeString } from '../../../utils/func';
import { EventDetailDataType, TicketTypesItemType } from '../EventDetail.slice';
import {
  EventInfoContainer,
  TicketTypesContainer,
} from '../EventDetailComponent';

const TicketListTab = ({ ticketData }: { ticketData: TicketTypesItemType }) => {
  const { t } = useTranslation();

  return (
    <TicketTypesContainer>
      <Row className="ticket-item-row">
        <Col span={24} className="ticket-item-key">
          {t('Ticket Type')}
        </Col>
        <Col span={24} className="ticket-item-value">
          {ticketData.name}
        </Col>
      </Row>
      <Row gutter={[16, 16]} className="ticket-item-row">
        <Col span={12}>
          <Row>
            <Col span={24} className="ticket-item-key">
              {t('Ticket Price')}
            </Col>
            <Col span={24} className="ticket-item-value">
              {ticketData.price}
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={24} className="ticket-item-key">
              {t('Ticket Ceiling Price')}
            </Col>
            <Col span={24} className="ticket-item-value">
              {ticketData.ceilingPrice || '-'}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className="ticket-item-row">
        <Col span={12}>
          <Row>
            <Col span={24} className="ticket-item-key">
              {t('Stock')}
            </Col>
            <Col span={24} className="ticket-item-value">
              {ticketData.stock}
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={24} className="ticket-item-key">
              {t('Ticket Purchase Limts')}
            </Col>
            <Col span={24} className="ticket-item-value">
              {ticketData.purchaseLimit || '-'}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="ticket-item-row">
        <Col span={24} className="ticket-item-key">
          {t('NFT Image')}
        </Col>
        <Col span={24} className="ticket-item-value">
          <div className="ticket-img">
            <img src={ticketData.image} alt="" />
          </div>
        </Col>
      </Row>
      <Row className="ticket-item-row">
        <Col span={24} className="ticket-item-key">
          {t('NFT Description')}
        </Col>
        <Col span={24} className="ticket-item-value">
          {ticketData.description}
        </Col>
      </Row>
      <Row className="ticket-item-row">
        <Col span={24} className="ticket-item-key">
          {t('Ticket PDP Link')}
        </Col>
        <Col span={24} className="ticket-item-value">
          {(ticketData.externalLink && (
            <a
              href={ticketData.externalLink}
              target="_blank"
              className="external-link"
            >
              {ticketData.externalLink}
            </a>
          )) ||
            '-'}
        </Col>
      </Row>
    </TicketTypesContainer>
  );
};

const EventInfo = ({ data }: { data: EventDetailDataType }) => {
  const { t } = useTranslation();
  const mainBoxLeft = useRef(null);

  const [items, setItems] = useState<any>([]);
  const [activeKey, setActiveKey] = useState<string>('0');
  const [scannerLink, setScannerLink] = useState<string>('');
  const [ticketTypesContainerHeight, setTicketTypesContainerHeight] =
    useState<string>('0px');

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setTicketTypesContainerHeight(`${mainBoxLeft.current.clientHeight}px`);
  }, []);

  useEffect(() => {
    if (data && data.ticketTypes && data.ticketTypes.length) {
      let newActiveKey = activeKey;
      const newPanes: any = [];
      data.ticketTypes.forEach((item, index) => {
        newActiveKey = (index + 1).toString();
        newPanes.push({
          label: `Ticket ${newActiveKey}`,
          children: <TicketListTab ticketData={item} />,
          key: newActiveKey,
          closable: false,
        });
      });
      const originName = window.location.origin;
      if (originName.includes('localhost')) {
        setScannerLink(`${WebAppScannerLinkDev}${data.uuid}`);
      } else {
        const scannerLinkDomain = originName.replace('admin', 'app');
        setScannerLink(`${scannerLinkDomain}/scan-qr-code/${data.uuid}`);
      }
      setItems(newPanes);
      setActiveKey('1');
    }
  }, [data]);

  if (!data) {
    return null;
  }

  return (
    <EventInfoContainer containerHight={ticketTypesContainerHeight}>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <div className="main-box" ref={mainBoxLeft}>
            <div>
              <Row className="item">
                <Col span={24} className="item-key">
                  {t('Event Name')}
                </Col>
                <Col span={24}>{data.name}</Col>
              </Row>
              <Row className="item">
                <Col span={24} className="item-key">
                  {t('Organizer')}
                </Col>
                <Col span={24}>{data.organizerName}</Col>
              </Row>
              <Row className="item">
                <Col span={24} className="item-key">
                  {t('Location')}
                </Col>
                <Col span={24}>{data.location}</Col>
              </Row>
              <Row className="item">
                <Col span={24} className="item-key">
                  {t('Event Time')}
                </Col>
                <Col span={24}>
                  {(data.startTime &&
                    data.endTime &&
                    `${formatTimeStrByTimeString(
                      data.startTime,
                      FormatTimeKeys.norm,
                    )} - ${formatTimeStrByTimeString(
                      data.endTime,
                      FormatTimeKeys.norm,
                    )}`) ||
                    '-'}
                </Col>
              </Row>
              <Row className="item">
                <Col span={24} className="item-key">
                  {t('Event Description')}
                </Col>
                <Col span={24}>{data.description}</Col>
              </Row>
              <Row className="item">
                <Col span={24} className="item-key">
                  {t('Event Image')}
                </Col>
                <Col span={24}>
                  <div className="event-img">
                    <img src={data.image} alt="" />
                  </div>
                </Col>
              </Row>
              <Row className="item">
                <Col span={24} className="item-key">
                  {t('Royalty Fee')}
                </Col>
                <Col span={24}>
                  {(data.ticketTypes &&
                    data.ticketTypes.length &&
                    (data.ticketTypes[0].royaltiesFee ||
                      data.ticketTypes[0].royaltiesFee === 0) &&
                    `${data.ticketTypes[0].royaltiesFee * 100}%`) ||
                    '-'}
                </Col>
              </Row>
              <Row className="item" style={{ marginBottom: 0 }}>
                <Col span={24} className="item-key">
                  {t('Scanner Link')}
                </Col>
                <Col span={24}>
                  {(data.uuid && (
                    <a
                      href={scannerLink}
                      target="_blank"
                      className="scanner-link"
                    >
                      {scannerLink}
                    </a>
                  )) ||
                    '-'}
                </Col>
              </Row>
            </div>
          </div>
        </Col>
        <Col span={12}>
          {!isEmpty(data.ticketTypes) && (
            <Tabs
              type="editable-card"
              hideAdd
              onChange={onChange}
              activeKey={activeKey}
              items={items}
            />
          )}
        </Col>
      </Row>
    </EventInfoContainer>
  );
};

export default EventInfo;
