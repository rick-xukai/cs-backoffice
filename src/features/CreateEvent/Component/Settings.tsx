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
  code: '',
  id: '',
  type: PromoType.code,
  name: '',
  quantity: undefined,
  method: MethodType.auto,
  condition: {
    ticketTypeId: undefined,
    quantity: undefined,
  },
  gift: {
    ticketTypeId: undefined,
    quantity: undefined,
  },
  discount: {
    type: DiscountType.percentage,
    value: undefined,
  },
  apply: {
    type: ApplyCodeToType.all,
    ticketTypeIds: [],
  },
};

const Settings = ({
  createPromoStatus,
  setCreatePromoStatus,
  formValue,
  fieldEdit,
  setCreatePromoType,
  createPromoType,
  settingsFormEdit,
  setSettingsFormEdit,
  isEdit,
  createEventPublish,
}: {
  createPromoStatus: CreatePromoStatus;
  setCreatePromoStatus: any;
  formValue: CreateEventFormValueProps;
  fieldEdit: (value: any, field: string) => void;
  setCreatePromoType: any;
  createPromoType: CreatePromoType;
  settingsFormEdit: boolean;
  setSettingsFormEdit: (status: boolean) => void;
  isEdit: boolean;
  createEventPublish: any;
}) => {
  const { t } = useTranslation();
  const [pageTipsShow, setPageTipsShow] = useState<boolean>(true);
  const [onSave, setOnSave] = useState(false);
  const [promoValue, setPromoValue] = useState<PromoListProps>({
    ...initialValues,
  });
  const changePromoValues = (value: any, field?: string) => {
    setSettingsFormEdit(true);
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
  const onDelete = (index: any) => {
    Modal.confirm({
      className: 'notSaveConfirmModal',
      centered: true,
      closable: false,
      okText: 'Delete',
      cancelText: 'Cancel',
      title: 'Delete Discount',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to delete this discount?`,
      onOk: () => {
        formValue.discounts.splice(index, 1);
        fieldEdit(formValue.discounts, 'discounts');
      },
    });
  };

  const onEdit = (index: any, item: any) => {
    setPromoValue({
      ...item,
    });
    setCreatePromoType(item.type);
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
        (!promoValue.condition.quantity ||
          !promoValue.gift.quantity ||
          !promoValue.condition.ticketTypeId ||
          !promoValue.gift.ticketTypeId ||
          !promoValue.name)) ||
      (createPromoType === CreatePromoType.code &&
        (!promoValue.code ||
          !promoValue.discount.value ||
          (promoValue.apply.type === ApplyCodeToType.certain &&
            !promoValue.apply.ticketTypeIds.length) ||
          !promoValue.name))
    ) {
      return;
    }
    if (createPromoStatus === CreatePromoStatus.edit) {
      if (
        formValue.discounts.find(
          (item) =>
            item.id !== promoValue.id &&
            promoValue.code &&
            item.code === promoValue.code,
        )
      ) {
        message.error({
          content: t(
            'This Discount Code already exists. Please use another name and try again.',
          ),
          key: 'error',
        });
        return;
      }
      const newPromoList = [...formValue.discounts];
      const findIndex = formValue.discounts.findIndex(
        (item) => item.id === promoValue.id,
      );
      newPromoList[findIndex] = { ...promoValue };
      fieldEdit(newPromoList, 'discounts');
      if (isEdit) {
        createEventPublish({
          discounts: newPromoList,
        });
      }
    } else {
      if (
        formValue.discounts.find(
          (item) => promoValue.code && item.code === promoValue.code,
        )
      ) {
        message.error({
          content: t(
            'This Discount Code already exists. Please use another name and try again.',
          ),
          key: 'error',
        });
        return;
      }
      fieldEdit(
        [
          ...formValue.discounts,
          {
            ...promoValue,
            id: `add_${new Date().getTime()}`,
            type: createPromoType,
          },
        ],
        'discounts',
      );
      if (isEdit) {
        createEventPublish({
          discounts: [
            ...formValue.discounts,
            {
              ...promoValue,
              id: `add_${new Date().getTime()}`,
              type: createPromoType,
            },
          ],
        });
      }
    }
    if (!isEdit) {
      setCreatePromoStatus(CreatePromoStatus.list);
    }
  };

  const handleCancelCreatePromo = () => {
    if (settingsFormEdit) {
      Modal.confirm({
        className: 'notSaveConfirmModal',
        centered: true,
        closable: false,
        okText: isEdit ? t('Save and Publish') : t('Save'),
        cancelText: t('Leave'),
        title: t('Unsaved Content'),
        icon: <ExclamationCircleOutlined />,
        content: t('Leaving this page will result in losing your content.'),
        onOk: () => {
          handleSave();
        },
        onCancel: () => {
          setCreatePromoStatus(CreatePromoStatus.list);
          setSettingsFormEdit(false);
        },
      });
    } else {
      setCreatePromoStatus(CreatePromoStatus.list);
    }
  };

  const setTicketListData = (newList: any) => {
    fieldEdit(newList, 'ticketTypes');
  };

  useEffect(() => {
    if (createPromoStatus === CreatePromoStatus.list) {
      setPromoValue({ ...initialValues });
    }
    setOnSave(false);
  }, [createPromoStatus]);

  useEffect(
    () => () => {
      setCreatePromoStatus(CreatePromoStatus.list);
      setSettingsFormEdit(false);
    },
    [],
  );

  useEffect(() => {
    if (
      createPromoStatus === CreatePromoStatus.add ||
      createPromoStatus === CreatePromoStatus.edit
    ) {
      window.scrollTo({ top: 0 });
    }
  }, [createPromoStatus]);

  const renderContent = () => {
    if (createPromoStatus === CreatePromoStatus.list) {
      if (!formValue.discounts.length) {
        return <EmptyState codeClick={codeClick} bundleClick={bundleClick} />;
      }
      return (
        <>
          <Row justify="space-between" align="middle" className="main-title">
            <Col>{t('Settings')}</Col>
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
            {formValue.discounts.map((item, index: number) => (
              <PromoListItem
                onDelete={onDelete}
                onEdit={onEdit}
                key={item.id}
                index={index}
                item={item}
                formValue={formValue}
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
            ticketsListData={formValue.ticketTypes}
            setTicketListData={setTicketListData}
            createPromoType={createPromoType}
            formValue={formValue}
          />
          {isEdit ? (
            <div className="page-bottom">
              <div className="bottom-btn">
                <Button onClick={handleCancelCreatePromo}>
                  {/* {saveDraftLoading && <LoadingOutlined spin />} */}
                  {t('Cancel')}
                </Button>
                <Button type="primary" onClick={handleSave}>
                  {/* {publishLoading && <LoadingOutlined spin />} */}
                  {t('Save and Publish')}
                </Button>
              </div>
            </div>
          ) : (
            <div className="page-bottom">
              {createPromoStatus === CreatePromoStatus.add ||
              createPromoStatus === CreatePromoStatus.edit ? (
                <div className="bottom-btn">
                  <Button onClick={handleCancelCreatePromo}>
                    {t('Cancel')}
                  </Button>
                  <Button type="primary" onClick={handleSave}>
                    {t('Save')}
                  </Button>
                </div>
              ) : null}
            </div>
          )}
        </>
      );
    }
    return null;
  };
  return renderContent();
};

export default Settings;
