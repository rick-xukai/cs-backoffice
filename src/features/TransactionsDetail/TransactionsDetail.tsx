import React, { useState, useEffect } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Row, Col, Button, Select, Modal, Spin, message, Badge } from 'antd';
import {
  EditOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

import {
  decimalPlaces,
  defaultCurrentPage,
  defaultPageSize,
  TokenExpireResponseCode,
} from '../../constants/General';
import { useCookie } from '../../hooks';
import { formatTimeStrByTimeString } from '../../utils/func';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { UserRoutes, AuthRoutes } from '../../navigation/Routes';
import { StatusKeys, FormatTimeKeys, CookieKeys } from '../../constants/Keys';
import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import {
  reset,
  selectError,
  updateTransactionsStatusAction,
  getTransactionDetailAction,
  selectLoading,
  selectData,
  selectchangeStatusSuccess,
  setTransactionIdAction,
} from './TransactionsDetail.slice';
import { TransactionsDetailContainer } from './TransactionsDetailComponent';

const { Option } = Select;
const { confirm } = Modal;

interface RouteConfigType {
  state: {
    currentPage: number;
    currentPageSize: number;
  };
}

const TransactionsDetail = () => {
  const { t } = useTranslation();
  const { transactionsId }: { transactionsId: string } = useParams();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location: RouteConfigType = useLocation();
  const cookies = useCookie([
    CookieKeys.authUser,
    CookieKeys.authUserName,
    CookieKeys.userNotActiveToken,
  ]);

  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const data = useAppSelector(selectData);
  const changeStatusSuccess = useAppSelector(selectchangeStatusSuccess);

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
            note: '',
            ids: [transactionsId],
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
    if (data) {
      if (data.status === StatusKeys.completed.key) {
        setTransactionStatus(StatusKeys.completed.text);
      }
      setTransactionStatus(StatusKeys.pending.text);
    }
  }, [data]);

  useEffect(() => {
    dispatch(setTransactionIdAction(transactionsId));
    dispatch(getTransactionDetailAction());
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    if (error) {
      if (error.code === TokenExpireResponseCode) {
        cookies.removeCookie(CookieKeys.authUser, { path: '/' });
        cookies.removeCookie(CookieKeys.authUserName, { path: '/' });
        cookies.removeCookie(CookieKeys.userNotActiveToken, { path: '/' });
        history.push(AuthRoutes.login);
        message.error(t('User token is deprecated, please log in again.'));
        return;
      }
      message.error(error.message);
    }
  }, [error]);

  return (
    <TransactionsDetailContainer>
      <PageHeaderComponent
        title={t('Transactions Details')}
        showBackArrow
        clickBack={() =>
          history.push(
            `${UserRoutes.transactions}?page=${
              (location.state && location.state.currentPage) ||
              defaultCurrentPage
            }&pageSize=${
              (location.state && location.state.currentPageSize) ||
              defaultPageSize
            }`,
          )
        }
      />
      {(!loading && (
        <div className="page-main">
          <Row>
            <Col span={24} className="edit-status">
              {(!edit && (
                <Button
                  disabled={data.status === StatusKeys.completed.key}
                  type="primary"
                  danger
                  onClick={() => setEdit(true)}
                >
                  <EditOutlined />
                  {t('Edit')}
                </Button>
              )) || (
                <div>
                  <Button
                    onClick={() => {
                      setEdit(false);
                      setTransactionStatus(
                        (data.status === StatusKeys.completed.key &&
                          StatusKeys.completed.text) ||
                          StatusKeys.pending.text,
                      );
                    }}
                  >
                    {t('Cancel')}
                  </Button>
                  <Button
                    type="primary"
                    disabled={transactionStatus === StatusKeys.pending.text}
                    danger
                    onClick={showConfirmModal}
                  >
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
                <p className="value">{data.userEmail}</p>
              </Col>
              <Col span={12}>
                <p className="item">{t('Status')}</p>
                {(!edit && (
                  <p className="value">
                    <Badge
                      status={
                        (data.status === StatusKeys.pending.key && 'warning') ||
                        'success'
                      }
                      text={
                        (data.status === StatusKeys.pending.key &&
                          StatusKeys.pending.text) ||
                        StatusKeys.completed.text
                      }
                    />
                  </p>
                )) || (
                  <Select
                    defaultValue={
                      (data.status === StatusKeys.pending.key &&
                        StatusKeys.pending.text) ||
                      StatusKeys.completed.text
                    }
                    defaultActiveFirstOption={false}
                    onChange={(status: any) => setTransactionStatus(status)}
                  >
                    {Object.values(StatusKeys).map((item) => {
                      if (item.key !== StatusKeys.all.key) {
                        return (
                          <Option key={item.text} value={item.text}>
                            {item.text}
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
                <p className="value">{data.bankName}</p>
              </Col>
              <Col span={12}>
                <p className="item">{t('Amount')}</p>
                <p className="value">{`${data.amount.toFixed(decimalPlaces)} ${
                  data.currency
                }`}</p>
              </Col>
            </Row>
            <Row className="item-row">
              <Col span={12}>
                <p className="item">{t('Card Holder')}</p>
                <p className="value">{data.cardHolder}</p>
              </Col>
              <Col span={12}>
                <p className="item">{t('Bank Account')}</p>
                <p className="value">{data.cardNo}</p>
              </Col>
            </Row>
            <Row className="item-row">
              <Col span={12}>
                <p className="item">{t('Submitted At')}</p>
                <p className="value">
                  {(data.createdAt &&
                    formatTimeStrByTimeString(
                      data.createdAt,
                      FormatTimeKeys.norm,
                    )) ||
                    '-'}
                </p>
              </Col>
              <Col span={12}>
                <p className="item">{t('Last Action At')}</p>
                <p className="value">
                  {(data.updatedAt &&
                    formatTimeStrByTimeString(
                      data.updatedAt,
                      FormatTimeKeys.norm,
                    )) ||
                    '-'}
                </p>
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
