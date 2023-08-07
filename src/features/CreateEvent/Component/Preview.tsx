import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Col, Divider, Row, Image, Tooltip, Tabs } from 'antd';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import {
  DownOutlined,
  UpOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import {
  CreateEventFormValueProps,
  TicketListProps,
} from '../CreateEvent.slice';
import {
  Container,
  EventDetailCard,
  MyTicketsEventDetailContainer,
  StatusContainer,
  TicketTypeItem,
} from './Preview.component';
import { Colors, Images } from '../../../theme';
import {
  calculatePrice,
  formatLocation,
  formatTimeStrByTimeStringPreview,
} from '../../../utils/func';
import { FormatTimeKeys } from '../../../constants/Keys';
import { getTicketListItemStatus } from './CreateTicket';
import { SGD_UNIT } from '../../../constants/constants';

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
const checkIsOnSale = (item: TicketListProps) => {
  const { code } = getTicketListItemStatus(
    item.sellStartTime,
    item.sellEndTime,
  );
  return {
    onsale: code === TicketSaleStatus.onsale.status,
    unsale: code === TicketSaleStatus.unsale.status,
    sold: code === TicketSaleStatus.sold.status,
  };
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
  const { ticketTypes } = eventDetail;
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
  const hideMoreCondition =
    !eventDetail.description && !eventDetail.descriptionImages.length;
  useEffect(() => {
    if (!show) {
      if (detailContentRef.current.clientHeight > 57) {
        setNeedShowMore(true);
      } else {
        setNeedShowMore(false);
      }
    }
    if (hideMoreCondition) {
      setNeedShowMore(false);
    }
  }, [show]);
  const tabsItem: any = [
    {
      key: 'Primary Market',
      label: (
        <div>
          <span>Primary Market</span>
          <Tooltip title="Official Issued Tickets">
            <QuestionCircleOutlined />
          </Tooltip>
        </div>
      ),
      children: '',
    },
  ];

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
                        src={Images.PreviewLocationIcon}
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
                                : `${needShowMore ? 'content-area' : ''}`
                            }
                          >
                            {eventDetail.description && (
                              <p
                                className="detail-description"
                                dangerouslySetInnerHTML={{
                                  __html: eventDetail?.description?.replace(
                                    /\n/g,
                                    '<br/>',
                                  ),
                                }}
                              />
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
                      <div className="item-tabs">
                        <Tabs
                          defaultActiveKey="Primary Market"
                          items={tabsItem}
                        />
                        <Row>
                          <Col span={24} className="dividing-line" />
                        </Row>
                        <Row gutter={[16, 16]}>
                          {(ticketTypes.length && (
                            <>
                              {ticketTypes.map((item) => {
                                const calculatedPrice = calculatePrice(
                                  Number(
                                    item.price.toString().replace(/,/g, ''),
                                  ),
                                  item.absorbFees,
                                );
                                return (
                                  <TicketTypeItem
                                    xs={24}
                                    sm={12}
                                    md={12}
                                    xl={12}
                                    lg={12}
                                    key={item.id}
                                  >
                                    <Row>
                                      <Col
                                        className="type-img"
                                        xl={8}
                                        span={10}
                                      >
                                        <img
                                          src={item.thumbnailUrl}
                                          alt=""
                                          onError={(e: any) => {
                                            e.target.onerror = null;
                                            e.target.src =
                                              Images.BackgroundLogo;
                                          }}
                                        />
                                        {!checkIsOnSale(item).unsale &&
                                          item.visibility && (
                                            <div className="not-sale">
                                              NOT ON SALE YET
                                            </div>
                                          )}
                                        {(checkIsOnSale(item).onsale &&
                                          !item.stock) ||
                                          (checkIsOnSale(item).sold &&
                                            item.visibility && (
                                              <div className="out-stock-mask">
                                                OUT OF STOCK
                                              </div>
                                            ))}
                                      </Col>
                                      <Col
                                        xl={16}
                                        span={14}
                                        className="type-info"
                                      >
                                        <div className="line">
                                          <img
                                            src={Images.VerticalLineIcon}
                                            alt=""
                                          />
                                        </div>
                                        <div className="type-info-content">
                                          <div>
                                            <Col
                                              span={24}
                                              title={item.name}
                                              className="title"
                                            >
                                              {item.name}
                                            </Col>
                                            <Col
                                              span={24}
                                              className="description"
                                            >
                                              {item.description}
                                            </Col>
                                            <Col span={24} className="price">
                                              {calculatedPrice.userPay}{' '}
                                              {SGD_UNIT}
                                            </Col>
                                          </div>
                                        </div>
                                      </Col>
                                    </Row>
                                  </TicketTypeItem>
                                );
                              })}
                            </>
                          )) || (
                            <Col span={24} className="all-ticket-sold">
                              <div
                                style={{ textAlign: 'center', marginTop: 20 }}
                              >
                                <Image src={Images.AllTicketSold} alt="" />
                                <p>All tickets are sold.</p>
                              </div>
                            </Col>
                          )}
                        </Row>
                      </div>
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
                {/* //123 */}
              </div>
            </div>
          </div>
        </MyTicketsEventDetailContainer>
      </div>
    </Container>
  );
};

export default Preview;
