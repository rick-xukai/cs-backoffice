import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { ExclamationCircleOutlined } from '@ant-design/icons';
// eslint-disable-next-line import/no-cycle
import {
  AddDiscountDropDown,
  AddEditForm,
  EmptyState,
  PromoListItem,
} from './SettingsComponents';
import { PromoList } from '../CreateEventComponent';
import {
  ApplyCodeToType,
  CreateEventFormValueProps,
  DiscountType,
  MethodType,
  PromoListProps,
  PromoType,
} from '../CreateEvent.slice';

export enum CreatePromoStatus {
  list = 1,
  add = 2,
  edit = 3,
}

export enum CreatePromoType {
  code = PromoType.code,
  bundle = PromoType.bundle,
}

const initialValues = {
  promoCode: '',
  id: '',
  promoType: PromoType.code,
  discountValue: undefined,
  promocodeName: '',
  discountType: DiscountType.percentage,
  promoCodeAvailableQuantity: undefined,
  applyCodeTo: ApplyCodeToType.all,
  certainTicketList: [],
  method: MethodType.auto,
  discountName: '',
  customerBuysQuantity: undefined,
  customerGetsQuantity: undefined,
  customerBuysTicket: undefined,
  customerGetsTicket: undefined,
  customerBuysTicketName: '',
  customerGetsTicketName: '',
  discountCode: '',
};

const Settings = ({
  createPromoStatus,
  setCreatePromoStatus,
  formValue,
  fieldEdit,
  notSaveConfirm,
  setCreatePromoType,
  createPromoType,
}: {
  createPromoStatus: CreatePromoStatus;
  setCreatePromoStatus: any;
  formValue: CreateEventFormValueProps;
  fieldEdit: (value: any, field?: string) => void;
  notSaveConfirm: any;
  setCreatePromoType: any;
  createPromoType: CreatePromoType;
}) => {
  const { t } = useTranslation();
  const [pageTipsShow, setPageTipsShow] = useState<boolean>(true);
  const [onSave, setOnSave] = useState(false);
  const [promoValue, setPromoValue] = useState<PromoListProps>({
    ...initialValues,
  });
  const changePromoValues = (value: any, field?: string) => {
    if (field) {
      setPromoValue({
        ...promoValue,
        [field]: value,
      });
    } else {
      setPromoValue({
        ...promoValue,
        ...value,
      });
    }
  };
  const onDelete = (index: any, item: any) => {
    Modal.confirm({
      className: 'notSaveConfirmModal',
      centered: true,
      closable: false,
      okText: 'Delete',
      cancelText: 'Cancel',
      title: 'Delete Ticket',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to delete ${
        item.promocodeName || item.discountName
      }?`,
      onOk: () => {
        formValue.promoList.splice(index, 1);
        fieldEdit({
          promoList: [...formValue.promoList],
        });
      },
    });
  };

  const onEdit = (index: any, item: any) => {
    setPromoValue({
      ...item,
    });
    setCreatePromoType(item.promoType);
    setCreatePromoStatus(CreatePromoStatus.edit);
  };

  const codeClick = () => {
    setCreatePromoType(CreatePromoType.code);
    setCreatePromoStatus(CreatePromoStatus.add);
  };

  const bundleClick = () => {
    setCreatePromoType(CreatePromoType.bundle);
    setCreatePromoStatus(CreatePromoStatus.add);
  };

  const handleSave = () => {
    setOnSave(true);
    if (
      (createPromoType === CreatePromoType.bundle &&
        (!promoValue.method ||
          !promoValue.customerBuysQuantity ||
          !promoValue.customerGetsQuantity)) ||
      (createPromoType === CreatePromoType.code &&
        (!promoValue.promoCode || !promoValue.discountValue))
    ) {
      return;
    }
    if (
      formValue.promoList.find(
        (item) =>
          item.promoType === PromoType.code &&
          item.promoCode === promoValue.promoCode,
      )
    ) {
      message.error('promocode');
      return;
    }
    if (
      formValue.promoList.find(
        (item) =>
          item.promoType === PromoType.bundle &&
          item.method === MethodType.discount &&
          item.discountCode === promoValue.discountCode,
      )
    ) {
      message.error('discountCode');
      return;
    }
    if (createPromoStatus === CreatePromoStatus.edit) {
      const newPromoList = [...formValue.promoList];
      const findIndex = formValue.promoList.findIndex(
        (item) => item.id === promoValue.id,
      );
      newPromoList[findIndex] = { ...promoValue };
      fieldEdit(newPromoList, 'promoList');
    } else {
      fieldEdit(
        [
          ...formValue.promoList,
          {
            ...promoValue,
            id: `add_${new Date().getTime()}`,
            promoType: createPromoType,
          },
        ],
        'promoList',
      );
    }
    setCreatePromoStatus(CreatePromoStatus.list);
  };

  const handleCancelCreateTicket = () => {
    notSaveConfirm(
      () => {
        handleSave();
      },
      () => {
        setCreatePromoStatus(CreatePromoStatus.list);
      },
      'Save',
    );
  };

  const setTicketListData = (newList: any) => {
    fieldEdit({
      ticketList: newList,
    });
  };

  useEffect(() => {
    if (createPromoStatus === CreatePromoStatus.list) {
      setPromoValue({ ...initialValues });
    }
    setOnSave(false);
  }, [createPromoStatus]);

  const renderContent = () => {
    if (createPromoStatus === CreatePromoStatus.list) {
      if (!formValue.promoList.length) {
        return <EmptyState codeClick={codeClick} bundleClick={bundleClick} />;
      }
      return (
        <>
          <Row justify="space-between" align="middle" className="main-title">
            <Col>{t('Create Ticket')}</Col>
            <Col>
              <AddDiscountDropDown
                width={139}
                codeClick={codeClick}
                bundleClick={bundleClick}
              >
                <Button
                  style={{
                    width: 139,
                    height: 40,
                    borderRadius: 0,
                    lineHeight: '12px',
                  }}
                  type="primary"
                >
                  {t('Add Discount')}
                </Button>
              </AddDiscountDropDown>
            </Col>
          </Row>
          <PromoList>
            {formValue.promoList.map((item, index: number) => (
              <PromoListItem
                onDelete={onDelete}
                onEdit={onEdit}
                key={item.id}
                index={index}
                item={item}
              />
            ))}
          </PromoList>
        </>
      );
    }
    if (
      createPromoStatus === CreatePromoStatus.add ||
      createPromoStatus === CreatePromoStatus.edit
    ) {
      return (
        <>
          <Row>
            <Col span={24} className="main-title">
              {createPromoType === CreatePromoType.code
                ? t('Set Promo Code')
                : t('Set Bundle Promotion')}
            </Col>
          </Row>
          <AddEditForm
            promoValue={promoValue}
            changePromoValues={changePromoValues}
            onSave={onSave}
            setOnSave={setOnSave}
            pageTipsShow={pageTipsShow}
            setPageTipsShow={setPageTipsShow}
            ticketsListData={formValue.ticketList}
            setTicketListData={setTicketListData}
            createPromoType={createPromoType}
          />
          <div className="page-bottom">
            {createPromoStatus === CreatePromoStatus.add ||
            createPromoStatus === CreatePromoStatus.edit ? (
              <div className="bottom-btn">
                <Button onClick={handleCancelCreateTicket}>
                  {t('Cancel')}
                </Button>
                <Button type="primary" onClick={handleSave}>
                  {t('Save')}
                </Button>
              </div>
            ) : null}
          </div>
        </>
      );
    }
    return null;
  };
  return renderContent();
};

export default Settings;
