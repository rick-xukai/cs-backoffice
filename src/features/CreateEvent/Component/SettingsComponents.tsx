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
  CreateEventFormValueProps,
  DiscountType,
  MethodType,
  PromoListProps,
  PromoType,
} from '../CreateEvent.slice';
import {
  requiredValidateForm,
  thousandsSeparator,
  validatePromoCode,
} from '../../../utils/func';
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
                <Button
                  style={{ width: 240, fontWeight: 500, fontSize: 15 }}
                  type="primary"
                >
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
  formValue,
}: {
  onDelete: any;
  onEdit: any;
  index: number;
  item: PromoListProps;
  formValue: CreateEventFormValueProps;
}) => {
  const { t } = useTranslation();
  const {
    type,
    name,
    quantity,
    apply,
    method,
    condition,
    gift,
    discount,
    code,
    usageCount,
  } = item;
  const findTicket = (id: any) =>
    formValue.ticketTypes.find((ticket) => `${ticket.id}` === `${id}`);
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

  const conditionName = formValue.ticketTypes.find(
    (ticket) => ticket.id === condition.ticketTypeId,
  )?.name;
  const giftName = formValue.ticketTypes.find(
    (ticket) => ticket.id === gift.ticketTypeId,
  )?.name;

  return type === PromoType.code ? (
    <PromoListCode>
      <div className="badge">{t('Promocode')}</div>
      <div className="more-icon">{more}</div>
      <p className="title">{code}</p>
      <LabelAndValueArea gutter={16}>
        <LabelAndValue {...labelAndValueColumn}>
          <div className="label">{t('Promocode Name')}</div>
          <div className="value">{name || '-'}</div>
        </LabelAndValue>
        <LabelAndValue {...labelAndValueColumn}>
          <div className="label">{t('Discount Value')}</div>
          <div className="value">
            {discount.value && Number(discount.value).toFixed(2)}{' '}
            {discount.type === DiscountType.amount ? SGD_UNIT : '%'}
          </div>
        </LabelAndValue>
        <LabelAndValue {...labelAndValueColumn}>
          <div className="label">{t('Promocode Available Quantity')}</div>
          <div className="value">
            {usageCount || 0} / {quantity || 'Unlimited'}
          </div>
        </LabelAndValue>

        <LabelAndValue span={24}>
          <div className="label">{t('Apply Code To')}</div>
          <div className="value">
            {apply.type === ApplyCodeToType.certain ? (
              <div className="table">
                <div className="head">
                  <div className="head-item">{t('Ticket Name')}</div>
                  <div className="head-item">{t('Price')}</div>
                </div>
                {apply.ticketTypeIds.map((id) => (
                  <div className="body" key={findTicket(id)?.id}>
                    <div className="body-item">{findTicket(id)?.name}</div>
                    <div className="body-item">
                      {findTicket(id)?.price.toLocaleString()} {SGD_UNIT}
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
      {method === MethodType.discount ? <p className="title">{code}</p> : null}
      <LabelAndValueArea
        style={{ marginTop: method === MethodType.auto ? -16 : 0 }}
        gutter={16}
      >
        <LabelAndValue {...labelAndValueColumn}>
          <div className="label">{t('Discount Name')}</div>
          <div className="value">{name || '-'}</div>
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
            {usageCount || 0} / {quantity || 'Unlimited'}
          </div>
        </LabelAndValue>
        <LabelAndValue {...labelAndValueColumn}>
          <div className="label">{t('Customer Buys')}</div>
          {(condition.quantity && conditionName && (
            <div className="value">
              {condition.quantity} <span>X</span> {conditionName}
            </div>
          )) ||
            '-'}
        </LabelAndValue>
        <LabelAndValue {...labelAndValueColumn}>
          <div className="label">{t('Customer Gets')}</div>
          {(gift.quantity && giftName && (
            <div className="value">
              {gift.quantity} <span>X</span> {giftName}
            </div>
          )) ||
            '-'}
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
    name: string;
    id: number;
    price: number | string;
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
                <Col span={15}>{item.name}</Col>
                <Col span={7}>{item.price}</Col>
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
  formValue,
  disabled,
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
  formValue: CreateEventFormValueProps;
  disabled: boolean;
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
      apply: {
        ...promoValue.apply,
        ticketTypeIds: ticketsList
          .filter((item) => item.checked)
          .map((item) => item.id),
      },
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

  const findTicket = (id: any) =>
    formValue.ticketTypes.find((ticket) => `${ticket.id}` === `${id}`);

  const handleDeleteTicket = (index: number) => {
    Modal.confirm({
      className: 'notSaveConfirmModal',
      centered: true,
      closable: false,
      okText: 'Delete',
      cancelText: 'Cancel',
      title: 'Remove Ticket',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to remove ${
        findTicket(promoValue.apply.ticketTypeIds[index])?.name
      }?`,
      onOk: () => {
        const newTicketTypeIds = [...promoValue.apply.ticketTypeIds];
        newTicketTypeIds.splice(index, 1);
        changePromoValues({
          apply: {
            ...promoValue.apply,
            ticketTypeIds: [...newTicketTypeIds],
          },
        });
      },
    });
  };
  useEffect(() => {
    setTicketListData(
      ticketsListData.map((item: any) => ({
        ...item,
        checked: !!promoValue.apply.ticketTypeIds.find(
          (ticket: any) => `${item.id}` === `${ticket}`,
        ),
      })),
    );
  }, [promoValue.apply.ticketTypeIds]);

  const ticketOptions = ticketsListData.map((item: any) => ({
    label: item.name,
    value: item.id,
  }));

  return (
    <CreateEventFormContainer>
      <Row>
        <Col lg={(pageTipsShow && 14) || 21} span={24}>
          <div className="main-box">
            {createPromoType === CreatePromoType.code && (
              <Form.Item
                label="Promocode Name"
                required
                {...requiredValidateForm(
                  promoValue.name,
                  'Promocode Name',
                  onSave,
                )}
              >
                <Input
                  showCount
                  maxLength={100}
                  onChange={(e) => changePromoValues(e.target.value, 'name')}
                  value={promoValue.name}
                />
              </Form.Item>
            )}
            {createPromoType === CreatePromoType.code && (
              <Form.Item
                label="Promocode"
                required
                {...requiredValidateForm(promoValue.code, 'Promocode', onSave)}
              >
                <Input
                  onChange={(e) => {
                    const val = e.target.value;
                    if (validatePromoCode(val)) changePromoValues(val, 'code');
                  }}
                  value={promoValue.code}
                  maxLength={100}
                  showCount
                  disabled={disabled}
                />
              </Form.Item>
            )}

            {createPromoType === CreatePromoType.code && (
              <Form.Item
                label="Discount Value"
                required
                {...requiredValidateForm(
                  promoValue.discount.value,
                  'Discount Value',
                  onSave,
                )}
              >
                <Row gutter={16}>
                  <Col>
                    <Radio.Group
                      value={promoValue.discount.type}
                      onChange={(e) =>
                        changePromoValues(
                          {
                            type: e.target.value,
                            value: '',
                          },
                          'discount',
                        )
                      }
                    >
                      <Radio.Button name="type" value={DiscountType.percentage}>
                        {t('Percentage')}
                      </Radio.Button>
                      <Radio.Button name="type" value={DiscountType.amount}>
                        {t('Amount')}
                      </Radio.Button>
                    </Radio.Group>
                  </Col>
                  <Col flex="auto">
                    <Input
                      onChange={(e) => {
                        const val = e.target.value;
                        if (
                          (val && Number.isNaN(Number(val))) ||
                          val.includes(' ')
                        ) {
                          return;
                        }
                        if (
                          Number(val) >= PRICE_LIMIT &&
                          promoValue.discount.type === DiscountType.amount
                        )
                          return;
                        if (
                          Number(val) > PERCENT_LIMIT &&
                          promoValue.discount.type === DiscountType.percentage
                        )
                          return;
                        changePromoValues(
                          {
                            ...promoValue.discount,
                            value: e.target.value,
                          },
                          'discount',
                        );
                      }}
                      onBlur={(e) => {
                        const val = e.target.value;
                        if (promoValue.discount.type === DiscountType.amount) {
                          if (val && Number(val) < 0)
                            return changePromoValues(
                              {
                                ...promoValue.discount,
                                value: '',
                              },
                              'discount',
                            );
                          return changePromoValues(
                            {
                              ...promoValue.discount,
                              value: thousandsSeparator(val),
                            },
                            'discount',
                          );
                        }
                        return changePromoValues(
                          {
                            ...promoValue.discount,
                            value: Number(val).toFixed(2),
                          },
                          'discount',
                        );
                      }}
                      onFocus={(e) => {
                        changePromoValues(
                          {
                            ...promoValue.discount,
                            value: e.target.value.replace(/,/g, ''),
                          },
                          'discount',
                        );
                      }}
                      value={promoValue.discount.value}
                      suffix={
                        promoValue.discount.type === DiscountType.amount
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
                <Form.Item
                  label="Discount Name"
                  required
                  {...requiredValidateForm(
                    promoValue.name,
                    'Discount Name',
                    onSave,
                  )}
                >
                  <Input
                    showCount
                    maxLength={100}
                    onChange={(e) => changePromoValues(e.target.value, 'name')}
                    value={promoValue.name}
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
                        disabled={disabled}
                      >
                        <Space size="small" direction="vertical">
                          <Radio name="method" value={MethodType.auto} disabled>
                            {t('Automatic discount(coming soon)')}
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
                      promoValue.code,
                      'Discount Code',
                      onSave,
                    )}
                  >
                    <Input
                      showCount
                      maxLength={100}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (validatePromoCode(val))
                          changePromoValues(val, 'code');
                      }}
                      value={promoValue.code}
                    />
                  </Form.Item>
                )}

                <Row gutter={16} wrap={false}>
                  <Col>
                    <Form.Item
                      label="Customer Buys"
                      required
                      {...requiredValidateForm(
                        promoValue.condition.quantity,
                        'Customer Buys',
                        onSave,
                      )}
                    >
                      <InputNumber
                        onChange={(e) => {
                          if (`${e}`.includes('.')) return;
                          changePromoValues(
                            {
                              ...promoValue.condition,
                              quantity: e,
                            },
                            'condition',
                          );
                        }}
                        style={{ width: 160 }}
                        min={1}
                        step={1}
                        value={promoValue.condition.quantity}
                      />
                    </Form.Item>
                  </Col>
                  <Col flex="auto">
                    <Form.Item
                      label={<div>&nbsp;</div>}
                      {...requiredValidateForm(
                        promoValue.condition.ticketTypeId,
                        'Customer Ticket',
                        onSave,
                      )}
                    >
                      <Select
                        options={ticketOptions}
                        onChange={(e) =>
                          changePromoValues(
                            {
                              ...promoValue.condition,
                              ticketTypeId: e,
                            },
                            'condition',
                          )
                        }
                        value={promoValue.condition.ticketTypeId}
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
                        promoValue.gift.quantity,
                        'Customer Gets',
                        onSave,
                      )}
                    >
                      <InputNumber
                        onChange={(e) => {
                          if (`${e}`.includes('.')) return;
                          changePromoValues(
                            {
                              ...promoValue.gift,
                              quantity: e,
                            },
                            'gift',
                          );
                        }}
                        min={1}
                        step={1}
                        style={{ width: 160 }}
                        value={promoValue.gift.quantity}
                      />
                    </Form.Item>
                  </Col>

                  <Col flex="auto">
                    <Form.Item
                      label={<div>&nbsp;</div>}
                      {...requiredValidateForm(
                        promoValue.gift.ticketTypeId,
                        'Customer Gets Ticket',
                        onSave,
                      )}
                    >
                      <Select
                        options={ticketOptions}
                        onChange={(e) =>
                          changePromoValues(
                            {
                              ...promoValue.gift,
                              ticketTypeId: e,
                            },
                            'gift',
                          )
                        }
                        value={promoValue.gift.ticketTypeId}
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
                  <b>{promoValue.usageCount || 0}</b> Used /
                </Col>
                <Col flex="auto">
                  <Input
                    onChange={(e) => {
                      const val = e.target.value;
                      changePromoValues(
                        `${Number(val.replace(/[^0-9]/g, '')) || ''}`,
                        'quantity',
                      );
                    }}
                    value={promoValue.quantity || ''}
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
                  promoValue.apply.type === ApplyCodeToType.certain
                    ? promoValue.apply.ticketTypeIds.length
                    : true,
                  'Certain tickets',
                  onSave,
                )}
              >
                <Row justify="space-between" align="bottom">
                  <Col>
                    <Radio.Group
                      onChange={(e) =>
                        changePromoValues(
                          {
                            ...promoValue.apply,
                            type: e.target.value,
                          },
                          'apply',
                        )
                      }
                      value={promoValue.apply.type}
                      style={{ marginTop: 5 }}
                    >
                      <Space size="small" direction="vertical">
                        <Radio name="apply" value={ApplyCodeToType.all}>
                          {t('All tickets')}
                        </Radio>
                        <Radio name="apply" value={ApplyCodeToType.certain}>
                          {t('Certain tickets')}
                        </Radio>
                      </Space>
                    </Radio.Group>
                  </Col>
                  {promoValue.apply.type === ApplyCodeToType.certain && (
                    <Col>
                      <Row align="bottom">
                        <Col>
                          <ActionTextButton onClick={() => setOpen(true)}>
                            {promoValue.apply.ticketTypeIds.length
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
            {promoValue.apply.type === ApplyCodeToType.certain && (
              <ConnectTicketsList>
                {promoValue.apply.ticketTypeIds.map((item, index) => (
                  <ConnectTicketItem key={item}>
                    <div>
                      <p className="title">{findTicket(item)?.name}</p>
                      <p className="sub-title">
                        {findTicket(item)?.price} {SGD_UNIT}
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
