import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { cloneDeep } from 'lodash';
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
  checkDiscountCodeAction,
  selectPublishLoading,
} from '../CreateEvent.slice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

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
  method: MethodType.discount,
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
  usageCount: 0,
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
  isDraft,
  id,
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
  isDraft: boolean;
  id: any;
}) => {
  const { t } = useTranslation();
  const [pageTipsShow, setPageTipsShow] = useState<boolean>(true);
  const [onSave, setOnSave] = useState(false);
  const [promoValue, setPromoValue] = useState<PromoListProps>({
    ...initialValues,
  });
  const publishLoading = useAppSelector(selectPublishLoading);
  const okButtonTextConfirm =
    isEdit && !isDraft ? t('Save and Leave') : t('Save');
  const okButtonText = isEdit && !isDraft ? t('Save and Publish') : t('Save');
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
  const dispatch = useAppDispatch();

  const validPromos = formValue.discounts.filter((item) => !item.delete);

  const onDelete = (index: any, item: any) => {
    if (item.usageCount) {
      Modal.confirm({
        className: 'notSaveConfirmModal',
        centered: true,
        closable: false,
        okText: 'OK',
        cancelButtonProps: { style: { display: 'none' } },
        title: t('Unable to Delete Discount'),
        icon: <ExclamationCircleOutlined />,
        content: t(
          `This Discount has been used by an attendee before and cannot be deleted.`,
        ),
      });
      return;
    }
    Modal.confirm({
      className: 'notSaveConfirmModal',
      centered: true,
      closable: false,
      okText: 'Delete',
      cancelText: 'Cancel',
      title: t('Delete Discount'),
      icon: <ExclamationCircleOutlined />,
      content: t(`Are you sure you want to delete this discount?`),
      okButtonProps: {
        loading: publishLoading,
      },
      onOk: async () => {
        const newDiscount = cloneDeep(formValue.discounts);
        if (isEdit && !newDiscount[index].id.includes('add_')) {
          newDiscount[index].delete = true;
        } else {
          newDiscount.splice(index, 1);
        }
        if (isEdit && !isDraft) {
          await createEventPublish({
            discounts: newDiscount,
            redirectTo: () => {},
          });
        } else {
          fieldEdit(newDiscount, 'discounts');
        }
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

  const handleSave = async () => {
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
    if (promoValue?.quantity && promoValue.quantity < promoValue.usageCount) {
      message.error({
        content: t('Quantity must be greater than usage count.'),
        key: 'error',
      });
      return;
    }
    const checkResponse: any = await dispatch(
      checkDiscountCodeAction({
        code: promoValue.code,
        eventId: Number(id) || 0,
      }),
    );
    if (checkResponse.type === checkDiscountCodeAction.fulfilled.toString()) {
      if (!checkResponse.payload?.data?.canUse) {
        message.error({
          content: t(
            'This Discount Code already exists. Please use another name and try again.',
          ),
          key: 'error',
        });
        return;
      }
    } else {
      message.error({
        content: t(
          'This Discount Code already exists. Please use another name and try again.',
        ),
        key: 'error',
      });
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
      if (isEdit && !isDraft) {
        createEventPublish({
          discounts: newPromoList,
          redirectTo: () => {
            setCreatePromoStatus(CreatePromoStatus.list);
          },
        });
        setOnSave(false);
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
      if (isEdit && !isDraft) {
        createEventPublish({
          discounts: [
            ...formValue.discounts,
            {
              ...promoValue,
              id: `add_${new Date().getTime()}`,
              type: createPromoType,
            },
          ],
          redirectTo: () => {
            setCreatePromoStatus(CreatePromoStatus.list);
          },
        });
      }
    }
    if (!isEdit || isDraft) {
      setCreatePromoStatus(CreatePromoStatus.list);
    }
  };

  const handleCancelCreatePromo = () => {
    if (settingsFormEdit) {
      Modal.confirm({
        className: 'notSaveConfirmModal',
        centered: true,
        closable: false,
        okText: okButtonTextConfirm,
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
      if (!validPromos.length) {
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
            {validPromos.map((item, index: number) => (
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
            disabled={
              isEdit && !isDraft && createPromoStatus === CreatePromoStatus.edit
            }
          />
          {isEdit ? (
            <div className="page-bottom">
              <div className="bottom-btn">
                <Button onClick={handleCancelCreatePromo}>{t('Cancel')}</Button>
                <Button
                  type="primary"
                  onClick={handleSave}
                  loading={publishLoading}
                  disabled={isEdit && !isDraft && !settingsFormEdit}
                >
                  {okButtonText}
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
