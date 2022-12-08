import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Row, Col, Button, Select, Modal, Spin, message, Badge } from 'antd';
import {
  EditOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { UserRoutes } from '../../navigation/Routes';
import { StatusKeys } from '../../constants/Keys';
import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import {
  reset,
  updateTransactionsStatusAction,
  getTransactionDetailAction,
  selectLoading,
  selectDetailData,
  selectChangeStatusSuccess,
} from '../Transactions/Transactions.slice';
import { TransactionsDetailContainer } from './TransactionsDetailComponent';

const { Option } = Select;
const { confirm } = Modal;

const TransactionsDetail = () => {
  const { t } = useTranslation();
  const { transactionsId }: { transactionsId: string } = useParams();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const loading = useAppSelector(selectLoading);
  const data = useAppSelector(selectDetailData);
  const changeStatusSuccess = useAppSelector(selectChangeStatusSuccess);

  const [edit, setEdit] = useState<boolean>(false);
  const [transactionStatus, setTransactionStatus] = useState<string>('');

  const showConfirmModal = () => {
    confirm({
      centered: true,
      title: t('Transactions completed'),
      okText: t('Yes'),
      cancelText: t('No'),
      icon: <ExclamationCircleOutlined />,
      content: t(
        'Are you sure these transactions have been completed? This action cannot be undone',
      ),
      onOk() {
        dispatch(
          updateTransactionsStatusAction({
            status: transactionStatus,
            transactions: [Number(transactionsId)],
          }),
        );
      },
    });
  };

  useEffect(() => {
    if (changeStatusSuccess) {
      message.success(t('TransactionCompleted'));
      setEdit(false);
    }
  }, [changeStatusSuccess]);

  useEffect(() => {
    dispatch(getTransactionDetailAction({ id: transactionsId }));
    return () => {
      dispatch(reset());
    };
  }, []);

  return (
    <TransactionsDetailContainer>
      <PageHeaderComponent
        title={t('Transactions Details')}
        showBackArrow
        clickBack={() => history.push(UserRoutes.transactions)}
      />
      {(!loading && (
        <div className="page-main">
          <Row>
            <Col span={24} className="edit-status">
              {(!edit && (
                <Button
                  disabled={data.status === StatusKeys.completed}
                  type="primary"
                  danger
                  onClick={() => setEdit(true)}
                >
                  <EditOutlined />
                  {t('Edit')}
                </Button>
              )) || (
                <div>
                  <Button onClick={() => setEdit(false)}>{t('Cancel')}</Button>
                  <Button type="primary" danger onClick={showConfirmModal}>
                    {t('Save')}
                  </Button>
                </div>
              )}
            </Col>
          </Row>
          <div className="main-container">
            <Row className="item-row">
              <Col span={12}>
                <p className="item">{t('User Email')}</p>
                <p className="value">{data.user_email}</p>
              </Col>
              <Col span={12}>
                <p className="item">{t('Status')}</p>
                {(!edit && (
                  <p className="value">
                    <Badge
                      status={
                        (data.status === StatusKeys.pending && 'warning') ||
                        'success'
                      }
                      text={data.status}
                    />
                  </p>
                )) || (
                  <Select
                    defaultValue={data.status}
                    defaultActiveFirstOption={false}
                    onChange={(status) => setTransactionStatus(status)}
                  >
                    {Object.values(StatusKeys).map((item) => {
                      if (item !== StatusKeys.all) {
                        return (
                          <Option key={item} value={item}>
                            {item}
                          </Option>
                        );
                      }
                      return null;
                    })}
                  </Select>
                )}
              </Col>
            </Row>
            <Row className="item-row">
              <Col span={12}>
                <p className="item">{t('Bank Name')}</p>
                <p className="value">{data.bank_name}</p>
              </Col>
              <Col span={12}>
                <p className="item">{t('Amount')}</p>
                <p className="value">{data.amount}</p>
              </Col>
            </Row>
            <Row className="item-row">
              <Col span={12}>
                <p className="item">{t('Bank Holder')}</p>
                <p className="value">{data.bank_holder}</p>
              </Col>
              <Col span={12}>
                <p className="item">{t('Bank Account')}</p>
                <p className="value">{data.bank_account}</p>
              </Col>
            </Row>
            <Row className="item-row">
              <Col span={12}>
                <p className="item">{t('Submitted At')}</p>
                <p className="value">{data.submitted_at}</p>
              </Col>
              <Col span={12}>
                <p className="item">{t('Last Action At')}</p>
                <p className="value">{data.last_action_at || '-'}</p>
              </Col>
            </Row>
          </div>
        </div>
      )) || (
        <Spin
          spinning={loading}
          indicator={<LoadingOutlined spin />}
          size="large"
        />
      )}
    </TransactionsDetailContainer>
  );
};

export default TransactionsDetail;
