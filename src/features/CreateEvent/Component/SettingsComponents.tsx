import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Col,
  Dropdown,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Select,
  Space,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { ExclamationCircleOutlined } from '@ant-design/icons';
import ListEmpty from '../../../components/ListEmpty';
import { Images } from '../../../theme';
import Tips from '../../../components/Tips/Tips';
import {
  ActionTextButton,
  ConnectTicketItem,
  ConnectTicketsList,
  CreateEventFormContainer,
  LabelAndValue,
  LabelAndValueArea,
  ModalFooterButton,
  PromoListBundle,
  PromoListCode,
  SelectEventsTable,
} from '../CreateEventComponent';
import MoreIcon from '../../../components/MoreIcon/MoreIcon';
import {
  ApplyCodeToType,
  DiscountType,
  MethodType,
  PromoListProps,
  PromoType,
} from '../CreateEvent.slice';
import { requiredValidateForm, thousandsSeparator } from '../../../utils/func';
import {
  PERCENT_LIMIT,
  PRICE_LIMIT,
  SGD_UNIT,
} from '../../../constants/constants';
import NoData from '../../../components/NoData/NoData';
// eslint-disable-next-line import/no-cycle
import { CreatePromoType } from './Settings';

export const AddDiscountDropDown = ({
  children,
  width,
  codeClick,
  bundleClick,
}: {
  children: React.ReactNode;
  width?: number;
  codeClick: any;
  bundleClick: any;
}) => {
  const items = [
    {
      label: 'Promo Code',
      key: 'code',
      style: { padding: '10px 12px' },
      onClick: codeClick,
    },
    {
      label: 'Bundle Promotion',
      key: 'bundle',
      style: { padding: '10px 12px' },
      onClick: bundleClick,
    },
  ];
  return (
    <Dropdown menu={{ items }} overlayStyle={{ width }} trigger={['click']}>
      {children}
    </Dropdown>
  );
};

export const EmptyState = ({
  codeClick,
  bundleClick,
}: {
  codeClick: any;
  bundleClick: any;
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Row>
        <Col span={24} className="main-title">
          {t('Settings')}
        </Col>
      </Row>
      <Row style={{ height: '100%' }}>
        <Col span={24}>
          <ListEmpty
            image={Images.CreateNewPromoIcon}
            title={t('Add New Discount')}
            description={t(
              `Start creating discounts that can't be resisted and watch your event thrive.`,
            )}
            actions={
              <AddDiscountDropDown
                width={240}
                codeClick={codeClick}
                bundleClick={bundleClick}
              >
                <Button style={{ width: 240 }} type="primary">
                  {t('Add Discount')}
                </Button>
              </AddDiscountDropDown>
            }
          />
        </Col>
      </Row>
    </>
  );
};

export const TipsCmp = ({ setPageTipsShow }: { setPageTipsShow: any }) => {
  const { t } = useTranslation();
  return (
    <Tips
      title={t('Promocode Tips')}
      image={Images.PromoTipsIcon}
      onSizeChange={setPageTipsShow}
      content={
        <Row>
          <Col span={24} className="content-text">
            {t(`(1) Set Promo Codes that are unique and not easily guessable.`)}
          </Col>
          <Col span={24} className="content-text">
            {t(
              `(2) Promo Codes can be used to incentivise sales through discounts, but also help to track ticket sales through promoters or others.`,
            )}
          </Col>
          <Col span={24} className="content-text">
            {t(
              `(3) Ticket bundle promotions are highly effective for social events. Nobody likes going to events alone. Using bundle promotions effectively will help to drive ticket sales!`,
            )}
          </Col>
        </Row>
      }
    />
  );
};

const labelAndValueColumn = {
  lg: 8,
  md: 8,
  sm: 12,
  xs: 24,
};

export const PromoListItem = ({
  onDelete,
  onEdit,
  index,
  item,
}: {
  onDelete: any;
  onEdit: any;
  index: number;
  item: PromoListProps;
}) => {
  const { t } = useTranslation();
  const {
    promoType,
    promocodeName,
    promoCode,
    discountValue,
    promoCodeAvailableQuantity,
    certainTicketList,
    discountName,
    method,
    customerBuysQuantity,
    customerGetsQuantity,
    customerBuysTicket,
    customerGetsTicket,
  } = item;

  const more = (
    <MoreIcon
      trigger={['click']}
      menu={{
        items: [
          {
            label: 'Edit',
            key: 'edit',
            onClick: () => onEdit(index, item),
          },
          {
            label: 'Delete',
            key: 'delete',
            onClick: () => onDelete(index, item),
          },
        ],
      }}
    />
  );
  return promoType === PromoType.code ? (
    <PromoListCode>
      <div className="badge">{t('Promocode')}</div>
      <div className="more-icon">{more}</div>
      <p className="title">{promocodeName}</p>
      <LabelAndValueArea>
        <LabelAndValue {...labelAndValueColumn}>
          <div className="label">{t('Promocode')}</div>
          <div className="value">{promoCode}</div>
        </LabelAndValue>
        <LabelAndValue {...labelAndValueColumn}>
          <div className="label">{t('Discount Value')}</div>
          <div className="value">
            {discountValue} {SGD_UNIT}
          </div>
        </LabelAndValue>
        <LabelAndValue {...labelAndValueColumn}>
          <div className="label">{t('Promocode Available Quantity')}</div>
          <div className="value">
            0 / {promoCodeAvailableQuantity || 'Unlimited'}
          </div>
        </LabelAndValue>

        <LabelAndValue span={24}>
          <div className="label">{t('Apply Code To')}</div>
          <div className="value">
            {certainTicketList.length ? (
              <div className="table">
                <div className="head">
                  <div className="head-item">{t('Ticket Name')}</div>
                  <div className="head-item">{t('Price')}</div>
                </div>
                {certainTicketList.map((ticket) => (
                  <div className="body" key={ticket.id}>
                    <div className="body-item">{ticket.ticketName}</div>
                    <div className="body-item">
                      {ticket.ticketPrice} {SGD_UNIT}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              'All Tickets'
            )}
          </div>
        </LabelAndValue>
      </LabelAndValueArea>
    </PromoListCode>
  ) : (
    <PromoListBundle>
      <div className="badge">{t('Bundle Promotion')}</div>
      <div className="more-icon">{more}</div>
      <p className="title">{discountName}</p>
      <LabelAndValueArea>
        <LabelAndValue {...labelAndValueColumn}>
          <div className="label">{t('Discount Name')}</div>
          <div className="value">{discountName || '-'}</div>
        </LabelAndValue>
        <LabelAndValue {...labelAndValueColumn}>
          <div className="label">{t('Method')}</div>
          <div className="value">
            {method === MethodType.auto
              ? 'Automatic discount'
              : 'Discount code'}
          </div>
        </LabelAndValue>
        <LabelAndValue {...labelAndValueColumn}>
          <div className="label">{t('Promocode Available Quantity')}</div>
          <div className="value">
            0 / {promoCodeAvailableQuantity || 'Unlimited'}
          </div>
        </LabelAndValue>
        <LabelAndValue {...labelAndValueColumn}>
          <div className="label">{t('Customer Buys')}</div>
          <div className="value">
            {customerBuysQuantity} X {customerBuysTicket}
          </div>
        </LabelAndValue>
        <LabelAndValue {...labelAndValueColumn}>
          <div className="label">{t('Customer Gets')}</div>
          <div className="value">
            {customerGetsQuantity} X {customerGetsTicket}
          </div>
        </LabelAndValue>
      </LabelAndValueArea>
    </PromoListBundle>
  );
};

export const SelectTicketsModal = ({
  doneHandle,
  ticketsListData,
  setOpen,
  open,
  hanldleCheckAll,
  handleSelectTickets,
}: {
  doneHandle: any;
  ticketsListData: {
    ticketName: string;
    id: number;
    ticketPrice: number | string;
    checked?: boolean;
  }[];
  setOpen: any;
  open: boolean;
  hanldleCheckAll: any;
  handleSelectTickets: any;
}) => {
  const { t } = useTranslation();
  return (
    <Modal
      title="Select Tickets"
      footer={[
        <ModalFooterButton key="done" type="primary" onClick={doneHandle}>
          {t('Done')}
        </ModalFooterButton>,
      ]}
      centered
      onCancel={() => setOpen(false)}
      open={open}
    >
      <SelectEventsTable>
        <Col className="header" span={24}>
          <Row>
            <Col span={2}>
              <Checkbox
                checked={
                  !!ticketsListData.length &&
                  ticketsListData.length ===
                    ticketsListData.filter((item) => item.checked).length
                }
                disabled={!ticketsListData.length}
                onChange={(e) => hanldleCheckAll(e.target.checked)}
              />
            </Col>
            <Col span={15}>{t('Ticket Name')}</Col>
            <Col span={7}>{t('Price')}</Col>
          </Row>
        </Col>
        {ticketsListData.length ? (
          ticketsListData.map((item, index) => (
            <Col className="item" span={24} key={item.id}>
              <Row>
                <Col span={2}>
                  <Checkbox
                    onChange={(e) =>
                      handleSelectTickets(e.target.checked, index)
                    }
                    checked={item.checked}
                  />
                </Col>
                <Col span={15}>{item.ticketName}</Col>
                <Col span={7}>{item.ticketPrice}</Col>
              </Row>
            </Col>
          ))
        ) : (
          <NoData />
        )}
      </SelectEventsTable>
    </Modal>
  );
};

export const AddEditForm = ({
  changePromoValues,
  promoValue,
  onSave,
  pageTipsShow,
  setPageTipsShow,
  ticketsListData,
  setTicketListData,
  createPromoType,
  setOnSave,
}: {
  changePromoValues: any;
  promoValue: PromoListProps;
  onSave: boolean;
  pageTipsShow: any;
  setPageTipsShow: any;
  ticketsListData: any;
  setTicketListData: any;
  createPromoType: CreatePromoType;
  setOnSave: any;
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ticketsList = [...ticketsListData];
  const handleSelectTickets = (checked: boolean, index: number) => {
    ticketsList[index].checked = checked;
    setTicketListData([...ticketsList]);
  };
  const doneHandle = () => {
    changePromoValues({
      certainTicketList: ticketsList.filter((item) => item.checked),
    });
    setOpen(false);
  };

  const hanldleCheckAll = (value: boolean) => {
    setTicketListData(
      ticketsList.map((item) => ({
        ...item,
        checked: value,
      })),
    );
  };

  const handleDeleteTicket = (index: number) => {
    Modal.confirm({
      className: 'notSaveConfirmModal',
      centered: true,
      closable: false,
      okText: 'Delete',
      cancelText: 'Cancel',
      title: 'Remove Ticket',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to remove ${promoValue.certainTicketList[index].ticketName}?`,
      onOk: () => {
        promoValue.certainTicketList.splice(index, 1);
        changePromoValues({
          certainTicketList: [...promoValue.certainTicketList],
        });
      },
    });
  };
  useEffect(() => {
    setTicketListData(
      ticketsListData.map((item: any) => ({
        ...item,
        checked: !!promoValue.certainTicketList.find(
          (ticket) => item.id === ticket.id,
        ),
      })),
    );
  }, [promoValue]);

  const ticketOptions = ticketsListData.map((item: any) => ({
    label: item.ticketName,
    value: item.id,
  }));

  return (
    <CreateEventFormContainer>
      <Row>
        <Col lg={(pageTipsShow && 14) || 21} span={24}>
          <div className="main-box">
            {createPromoType === CreatePromoType.code && (
              <Form.Item label="Promocode Name">
                <Input
                  showCount
                  maxLength={100}
                  onChange={(e) =>
                    changePromoValues(e.target.value, 'promocodeName')
                  }
                  value={promoValue.promocodeName}
                />
              </Form.Item>
            )}
            {createPromoType === CreatePromoType.code && (
              <Form.Item
                label="Promocode"
                required
                {...requiredValidateForm(
                  promoValue.promoCode,
                  'Promocode',
                  onSave,
                )}
              >
                <Input
                  onChange={(e) =>
                    changePromoValues(e.target.value, 'promoCode')
                  }
                  value={promoValue.promoCode}
                />
              </Form.Item>
            )}

            {createPromoType === CreatePromoType.code && (
              <Form.Item
                label="Discount Value"
                required
                {...requiredValidateForm(
                  promoValue.discountValue,
                  'Discount Value',
                  onSave,
                )}
              >
                <Row gutter={16}>
                  <Col>
                    <Radio.Group
                      value={promoValue.discountType}
                      onChange={(e) =>
                        changePromoValues({
                          discountType: e.target.value,
                          discountValue: '',
                        })
                      }
                    >
                      <Radio.Button
                        name="discountType"
                        value={DiscountType.percentage}
                      >
                        {t('Percentage')}
                      </Radio.Button>
                      <Radio.Button
                        name="discountType"
                        value={DiscountType.amount}
                      >
                        {t('Amount')}
                      </Radio.Button>
                    </Radio.Group>
                  </Col>
                  <Col flex="auto">
                    <Input
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val && Number.isNaN(Number(val))) return false;
                        if (
                          Number(val) >= PRICE_LIMIT &&
                          promoValue.discountType === DiscountType.amount
                        )
                          return false;
                        if (
                          Number(val) >= PERCENT_LIMIT &&
                          promoValue.discountType === DiscountType.percentage
                        )
                          return false;
                        return changePromoValues(
                          e.target.value,
                          'discountValue',
                        );
                      }}
                      onBlur={(e) => {
                        const val = e.target.value;
                        if (promoValue.discountType === DiscountType.amount) {
                          if (val && Number(val) <= 0)
                            return changePromoValues('', 'discountValue');
                          return changePromoValues(
                            thousandsSeparator(val),
                            'discountValue',
                          );
                        }
                        return changePromoValues(
                          `${Number(val)}`,
                          'discountValue',
                        );
                      }}
                      onFocus={(e) => {
                        changePromoValues(
                          e.target.value.replace(/,/g, ''),
                          'discountValue',
                        );
                      }}
                      value={promoValue.discountValue || undefined}
                      suffix={
                        promoValue.discountType === DiscountType.amount
                          ? SGD_UNIT
                          : '%'
                      }
                      style={{ width: '100%' }}
                    />
                  </Col>
                </Row>
              </Form.Item>
            )}
            {createPromoType === CreatePromoType.bundle && (
              <>
                <Form.Item label="Discount Name">
                  <Input
                    showCount
                    maxLength={100}
                    onChange={(e) =>
                      changePromoValues(e.target.value, 'discountName')
                    }
                    value={promoValue.discountName}
                  />
                </Form.Item>
                <Form.Item label="Method" required>
                  <Row justify="space-between" align="bottom">
                    <Col>
                      <Radio.Group
                        onChange={(e) => {
                          changePromoValues(e.target.value, 'method');
                          setOnSave(false);
                        }}
                        value={promoValue.method}
                        style={{ marginTop: 5 }}
                      >
                        <Space size="small" direction="vertical">
                          <Radio name="method" value={MethodType.auto}>
                            {t('Automatic discount')}
                          </Radio>
                          <Radio name="method" value={MethodType.discount}>
                            {t('Discount code')}
                          </Radio>
                        </Space>
                      </Radio.Group>
                    </Col>
                  </Row>
                </Form.Item>
                {promoValue.method === MethodType.discount && (
                  <Form.Item
                    label="Discount Code"
                    required
                    {...requiredValidateForm(
                      promoValue.discountCode,
                      'Discount Code',
                      onSave,
                    )}
                  >
                    <Input
                      showCount
                      maxLength={100}
                      onChange={(e) =>
                        changePromoValues(e.target.value, 'discountCode')
                      }
                      value={promoValue.discountCode}
                    />
                  </Form.Item>
                )}

                <Row gutter={16} wrap={false}>
                  <Col>
                    <Form.Item
                      label="Customer Buys"
                      required
                      {...requiredValidateForm(
                        promoValue.customerBuysQuantity,
                        'Customer Buys',
                        onSave,
                      )}
                    >
                      <InputNumber
                        onChange={(e) =>
                          changePromoValues(e, 'customerBuysQuantity')
                        }
                        min={1}
                        style={{ width: 160 }}
                        value={promoValue.customerBuysQuantity}
                      />
                    </Form.Item>
                  </Col>
                  <Col flex="auto">
                    <Form.Item
                      label={<div>&nbsp;</div>}
                      {...requiredValidateForm(
                        promoValue.customerBuysTicket,
                        'Customer Ticket',
                        onSave,
                      )}
                    >
                      <Select
                        options={ticketOptions}
                        onChange={(e) =>
                          changePromoValues(e, 'customerBuysTicket')
                        }
                        value={promoValue.customerBuysTicket}
                        placeholder="Select Ticket"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16} wrap={false}>
                  <Col>
                    <Form.Item
                      label="Customer Gets"
                      required
                      {...requiredValidateForm(
                        promoValue.customerGetsQuantity,
                        'Customer Gets',
                        onSave,
                      )}
                    >
                      <InputNumber
                        onChange={(e) =>
                          changePromoValues(e, 'customerGetsQuantity')
                        }
                        min={1}
                        style={{ width: 160 }}
                        value={promoValue.customerGetsQuantity}
                      />
                    </Form.Item>
                  </Col>

                  <Col flex="auto">
                    <Form.Item
                      label={<div>&nbsp;</div>}
                      {...requiredValidateForm(
                        promoValue.customerGetsTicket,
                        'Customer Gets Ticket',
                        onSave,
                      )}
                    >
                      <Select
                        options={ticketOptions}
                        onChange={(e) =>
                          changePromoValues(e, 'customerGetsTicket')
                        }
                        value={promoValue.customerGetsTicket}
                        placeholder="Select Ticket"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </>
            )}
            <Form.Item label="Promocode Available Quantity">
              <Row gutter={6} align="middle" wrap={false}>
                <Col style={{ flexShrink: 0 }}>
                  <b>0</b> Used /
                </Col>
                <Col flex="auto">
                  <Input
                    onChange={(e) => {
                      const val = e.target.value;
                      if (
                        !val.includes('.') &&
                        !Number.isNaN(Number(val)) &&
                        Number(val) >= 0
                      ) {
                        changePromoValues(
                          `${val ? Number(val) : ''}`,
                          'promoCodeAvailableQuantity',
                        );
                      }
                    }}
                    value={promoValue.promoCodeAvailableQuantity}
                    placeholder="Unlimiteded"
                  />
                </Col>
              </Row>
            </Form.Item>
            {createPromoType === CreatePromoType.code && (
              <Form.Item
                label="Apply Code To"
                required
                {...requiredValidateForm(
                  promoValue.applyCodeTo === ApplyCodeToType.certain
                    ? promoValue.certainTicketList.length
                    : true,
                  'Certain tickets',
                  onSave,
                )}
              >
                <Row justify="space-between" align="bottom">
                  <Col>
                    <Radio.Group
                      onChange={(e) =>
                        changePromoValues(e.target.value, 'applyCodeTo')
                      }
                      value={promoValue.applyCodeTo}
                      style={{ marginTop: 5 }}
                    >
                      <Space size="small" direction="vertical">
                        <Radio name="applyCodeTo" value={ApplyCodeToType.all}>
                          {t('All tickets')}
                        </Radio>
                        <Radio
                          name="applyCodeTo"
                          value={ApplyCodeToType.certain}
                        >
                          {t('Certain tickets')}
                        </Radio>
                      </Space>
                    </Radio.Group>
                  </Col>
                  {promoValue.applyCodeTo === ApplyCodeToType.certain && (
                    <Col>
                      <Row align="bottom">
                        <Col>
                          <ActionTextButton onClick={() => setOpen(true)}>
                            {promoValue.certainTicketList.length
                              ? 'Edit'
                              : 'Select'}
                          </ActionTextButton>
                        </Col>
                      </Row>
                    </Col>
                  )}
                </Row>
              </Form.Item>
            )}
            {promoValue.applyCodeTo === ApplyCodeToType.certain && (
              <ConnectTicketsList>
                {promoValue.certainTicketList.map((item, index) => (
                  <ConnectTicketItem key={item.id}>
                    <div>
                      <p className="title">{item.ticketName}</p>
                      <p className="sub-title">
                        {item.ticketPrice} {SGD_UNIT}
                      </p>
                    </div>
                    <img
                      src={Images.DeleteOutlinedIcon}
                      alt=""
                      onClick={() => handleDeleteTicket(index)}
                    />
                  </ConnectTicketItem>
                ))}
              </ConnectTicketsList>
            )}
          </div>
        </Col>
        <Col span={(pageTipsShow && 10) || 3}>
          <TipsCmp setPageTipsShow={setPageTipsShow} />
        </Col>
      </Row>
      <SelectTicketsModal
        ticketsListData={ticketsList}
        doneHandle={doneHandle}
        setOpen={setOpen}
        open={open}
        hanldleCheckAll={hanldleCheckAll}
        handleSelectTickets={handleSelectTickets}
      />
    </CreateEventFormContainer>
  );
};
