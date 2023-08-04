import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Col, Divider, Row, Image } from 'antd';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { CreateEventFormValueProps } from '../CreateEvent.slice';
import {
  Container,
  EventDetailCard,
  MyTicketItemContainer,
  MyTicketsEventDetailContainer,
  StatusContainer,
} from './Preview.component';
import { Colors, Images } from '../../../theme';
import {
  formatLocation,
  formatTimeStrByTimeStringPreview,
} from '../../../utils/func';
import { FormatTimeKeys } from '../../../constants/Keys';
import { getTicketListItemStatus } from './CreateTicket';

const EventStatus = [
  {
    text: 'UPCOMING',
    key: 1,
    bgColor: Colors.branding,
    color: Colors.white,
    icon: '',
  },
  {
    text: 'ENDED',
    key: 2,
    bgColor: Colors.blueGray,
    color: Colors.white,
    icon: '',
  },
  {
    text: 'CANCELLED',
    key: 3,
    bgColor: Colors.grayScale40,
    color: Colors.grayScale50,
    icon: '',
  },
];
const TicketStatus = [
  {
    text: 'UPCOMING',
    key: 0,
    bgColor: Colors.branding,
    color: Colors.white,
    icon: '',
  },
  {
    text: 'USED',
    key: 1,
    bgColor: Colors.blueGray,
    color: Colors.white,
    icon: '',
  },
  {
    text: 'CANCELLED',
    key: 2,
    bgColor: Colors.grayScale40,
    color: Colors.grayScale50,
    icon: '',
  },
  {
    text: 'EXPIRED',
    key: 3,
    bgColor: Colors.grayScale90,
    color: Colors.grayScale40,
    icon: '',
  },
  {
    text: 'UPCOMING',
    key: 4,
    bgColor: Colors.branding,
    color: Colors.white,
    icon: Images.OnSaleIcon,
  },
  {
    text: '',
    key: 5,
    bgColor: Colors.branding,
    color: Colors.white,
    icon: Images.SoldIcon,
  },
];
export const TicketSaleStatus = {
  unsale: {
    status: 0,
    text: 'UNSALE',
  },
  onsale: {
    status: 1,
    text: 'ONSALE',
  },
  sold: {
    status: 2,
    text: 'SOLD',
  },
};
const libraries: (
  | 'places'
  | 'drawing'
  | 'geometry'
  | 'localContext'
  | 'visualization'
)[] = ['places'];
const checkEventTicketsNameCol = (point: string, item: any) => {
  let colNum = 24;
  if (
    TicketStatus.find((status) => status.text === 'UPCOMING')?.key === 0 ||
    getTicketListItemStatus(item.sellStartTime, item.sellEndTime).code ===
      TicketSaleStatus.onsale.status
  ) {
    colNum = (point === 'xs' && 20) || 18;
  }
  return colNum;
};

export const DescriptionImagesSize = [
  {
    key: 8,
    text: 'small',
  },
  {
    key: 12,
    text: 'medium',
  },
  {
    key: 24,
    text: 'large',
  },
];

export enum SetRefundKey {
  refundable = 0,
  nonRefundable = 1,
}

const ImageSizeLayoutComponent = ({ images }: { images: any[] }) => (
  <Row gutter={[24, 24]}>
    {images.map((item, index: number) => (
      <Col
        key={`${item.response}-${index}`}
        span={item.column}
        className="image-item-content"
      >
        <Image width="100%" src={item.response} alt="" preview={false} />
      </Col>
    ))}
  </Row>
);
const Preview = ({
  eventDetail,
  show,
  onHide,
}: {
  eventDetail: CreateEventFormValueProps;
  show: boolean;
  onHide: any;
}) => {
  const { ticketTypes: ticketList } = eventDetail;
  const [showMap, setShowMap] = useState<boolean>(false);
  const onMapLoad = useCallback((map: any) => {
    if (map) {
      const { center } = map;
      const bounds = new window.google.maps.LatLngBounds({
        lat: center.lat(),
        lng: center.lng(),
      });
      map.fitBounds(bounds);
    }
  }, []);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOLE_MAP_API_KEY as string,
    libraries,
  });
  const [isExpanded, setExpanded] = useState<boolean>(false);
  const [needShowMore, setNeedShowMore] = useState<boolean>(false);
  const detailContentRef: any = useRef(null);
  useEffect(() => {
    if (!show) {
      if (detailContentRef.current.clientHeight > 57) {
        setNeedShowMore(true);
      } else {
        setNeedShowMore(false);
      }
    }
  }, [show]);
  return (
    <Container style={{ top: show ? 0 : '100%' }}>
      <div className="close" onClick={() => onHide(false)}>
        X
      </div>
      <div className="content">
        <MyTicketsEventDetailContainer>
          <div className="container-wrap">
            <div className="page-main">
              <Row>
                <Col span={24} className="detail-background">
                  <img
                    src={eventDetail.image}
                    alt=""
                    style={{ objectFit: 'contain' }}
                    onError={(e: any) => {
                      e.target.onerror = null;
                      e.target.src = Images.BackgroundLogo;
                      e.target.className = 'error-full-image';
                    }}
                  />
                </Col>
              </Row>
              <div className="event-detail-container">
                <div className="item-info">
                  <Row className="item-info-row">
                    <Col span={24} className="info-item-status">
                      {EventStatus.map((status) => {
                        if (status.key === eventDetail.status && status.text) {
                          return (
                            <StatusContainer
                              key={status.key}
                              bgColor={status.bgColor}
                              textColor={status.color}
                            >
                              {status.text}
                            </StatusContainer>
                          );
                        }
                        return null;
                      })}
                    </Col>
                    <Col span={24} className="info-title">
                      {eventDetail.name || '-'}
                    </Col>
                    <Col span={24} className="info-description-short">
                      {eventDetail.descriptionShort}
                    </Col>
                    <Col span={24} className="info-item">
                      <Image
                        className="info-item-icon"
                        src={Images.ClockIcon}
                        alt=""
                      />
                      <div className="info-description">
                        {(eventDetail.startTime &&
                          eventDetail.endTime &&
                          `${formatTimeStrByTimeStringPreview(
                            eventDetail.startTime,
                            FormatTimeKeys.norm,
                          )} - ${formatTimeStrByTimeStringPreview(
                            eventDetail.endTime,
                            FormatTimeKeys.norm,
                          )}`) ||
                          '-'}
                      </div>
                    </Col>
                    <Col span={24} className="info-item">
                      <Image
                        src={Images.OrganiserIcon}
                        alt=""
                        className="info-item-icon"
                      />
                      <span className="info-description organizer">
                        {eventDetail.organizerName || '-'}
                      </span>
                    </Col>
                    <Col
                      span={24}
                      className="info-item"
                      style={{ marginTop: 2 }}
                    >
                      <Image
                        src={Images.LocationIcon}
                        alt=""
                        className="info-item-icon"
                      />
                      <div className="info-description">
                        <span>
                          {formatLocation(
                            eventDetail.location,
                            eventDetail.address,
                          )}
                        </span>
                        {eventDetail.locationCoord && (
                          <span
                            className="show-map-action"
                            onClick={() => setShowMap(!showMap)}
                          >
                            {(!showMap && (
                              <>
                                SHOW MAP
                                <DownOutlined />
                              </>
                            )) || (
                              <>
                                HIDE MAP
                                <UpOutlined />
                              </>
                            )}
                          </span>
                        )}
                      </div>
                    </Col>
                    {showMap && isLoaded && (
                      <Col span={24}>
                        <div className="google-map-content">
                          <GoogleMap
                            mapContainerStyle={{
                              width: '100%',
                              height: '220px',
                              marginTop: '10px',
                            }}
                            options={{
                              disableDefaultUI: true,
                            }}
                            center={{
                              lat: Number(
                                eventDetail.locationCoord.split(',')[0],
                              ),
                              lng: Number(
                                eventDetail.locationCoord.split(',')[1],
                              ),
                            }}
                            zoom={10}
                            onLoad={onMapLoad}
                          />
                        </div>
                      </Col>
                    )}
                    <EventDetailCard span={24} className="event-detail-content">
                      <Col
                        span={24}
                        className="detail-title"
                        style={{
                          marginBottom: (!eventDetail.description && 24) || 0,
                        }}
                      >
                        Event Details
                      </Col>
                      <Col span={24} className="detail-show-more-box">
                        {needShowMore && (
                          <div
                            className={
                              (!isExpanded && 'show-more-box-action') ||
                              'show-more-box-action no-background'
                            }
                          >
                            <div onClick={() => setExpanded(!isExpanded)}>
                              <div className="action-button">
                                <span>
                                  {(!isExpanded && 'Show More') || 'Show Less'}
                                </span>
                                <span>
                                  {(!isExpanded && <DownOutlined />) || (
                                    <UpOutlined />
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                        <Col
                          span={24}
                          className={
                            (!needShowMore && 'show-box no-show-more') ||
                            'show-box'
                          }
                        >
                          <div
                            ref={detailContentRef}
                            className={
                              isExpanded
                                ? 'content-area auto-height'
                                : 'content-area'
                            }
                          >
                            {eventDetail.description && (
                              <p className="detail-description">
                                {eventDetail.description}
                              </p>
                            )}
                            <ImageSizeLayoutComponent
                              images={eventDetail.descriptionImages}
                            />
                            <p
                              className="refund-info"
                              style={{
                                marginTop:
                                  (eventDetail.descriptionImages &&
                                    eventDetail.descriptionImages.length &&
                                    24) ||
                                  0,
                              }}
                            >
                              {(eventDetail.refundPolicy ===
                                SetRefundKey.nonRefundable &&
                                '* Tickets are non-refundable. Please ensure your availability before making a purchase.') ||
                                '*  To request a refund, please contact the event organizer.'}
                            </p>
                          </div>
                        </Col>
                      </Col>
                    </EventDetailCard>
                    <Col
                      span={24}
                      className={
                        (needShowMore && 'divider-content show-more-divider') ||
                        'divider-content'
                      }
                    >
                      <Divider />
                    </Col>
                  </Row>
                </div>
                <div className="my-ticket-items">
                  <Row>
                    <Col span={24} className="title">
                      MY TICKETS
                    </Col>
                  </Row>
                  {(ticketList.length && (
                    <Row className="items-row" gutter={[20, 20]}>
                      {ticketList.map((item, index) => (
                        <Col
                          key={item.id + index}
                          xs={24}
                          sm={12}
                          md={8}
                          xl={6}
                        >
                          <MyTicketItemContainer>
                            <div className="item-background">
                              <img
                                src={item.image || Images.BackgroundLogo}
                                alt=""
                                onError={(e: any) => {
                                  e.target.onerror = null;
                                  e.target.src = Images.BackgroundLogo;
                                }}
                              />
                            </div>
                            <div className="item-detail">
                              <Row>
                                <Col
                                  xs={checkEventTicketsNameCol('xs', item)}
                                  sm={checkEventTicketsNameCol('sm', item)}
                                >
                                  <p className="item-detail-name">
                                    {item.name || '-'}
                                  </p>
                                  {TicketStatus.map((status) => {
                                    if (status.key === 0 && status.text) {
                                      return (
                                        <StatusContainer
                                          key={status.key}
                                          bgColor={status.bgColor}
                                          textColor={status.color}
                                        >
                                          {status.text}
                                        </StatusContainer>
                                      );
                                    }
                                    return null;
                                  })}
                                </Col>
                                {(TicketStatus.find(
                                  (status) => status.text === 'UPCOMING',
                                )?.key === 0 ||
                                  getTicketListItemStatus(
                                    item.sellStartTime,
                                    item.sellEndTime,
                                  ) === TicketSaleStatus.onsale.status) && (
                                  <>
                                    <Col xs={4} sm={0}>
                                      <div className="item-detail-status">
                                        {getTicketListItemStatus(
                                          item.sellStartTime,
                                          item.sellEndTime,
                                        ) ===
                                          TicketSaleStatus.unsale.status && (
                                          <div className="item-detail-icon">
                                            <Image
                                              src={Images.QrCodeButton}
                                              alt=""
                                            />
                                          </div>
                                        )}
                                        {getTicketListItemStatus(
                                          item.sellStartTime,
                                          item.sellEndTime,
                                        ) ===
                                          TicketSaleStatus.onsale.status && (
                                          <div className="item-detail-icon ticket-onsale">
                                            <Image
                                              src={Images.TicketsOnSaleIcon}
                                              alt=""
                                            />
                                          </div>
                                        )}
                                      </div>
                                    </Col>
                                    <Col sm={6} xs={0}>
                                      <div className="item-detail-status">
                                        {getTicketListItemStatus(
                                          item.sellStartTime,
                                          item.sellEndTime,
                                        ) ===
                                          TicketSaleStatus.unsale.status && (
                                          <div className="item-detail-icon">
                                            <Image
                                              src={Images.QrCodeButton}
                                              alt=""
                                            />
                                          </div>
                                        )}
                                        {getTicketListItemStatus(
                                          item.sellStartTime,
                                          item.sellEndTime,
                                        ) ===
                                          TicketSaleStatus.onsale.status && (
                                          <div className="item-detail-icon ticket-onsale">
                                            <Image
                                              src={Images.TicketsOnSaleIcon}
                                              alt=""
                                            />
                                          </div>
                                        )}
                                      </div>
                                    </Col>
                                  </>
                                )}
                              </Row>
                            </div>
                          </MyTicketItemContainer>
                        </Col>
                      ))}
                    </Row>
                  )) ||
                    null}
                </div>
              </div>
            </div>
          </div>
        </MyTicketsEventDetailContainer>
      </div>
    </Container>
  );
};

export default Preview;
