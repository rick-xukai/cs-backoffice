import React, { useState, useEffect } from 'react';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Row, Col, Select, Modal, Button, message } from 'antd';
import { useHistory } from 'react-router-dom';

import { useCookie } from '../../hooks';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Images, Colors } from '../../theme';
import { formatTimeStrByTimeString } from '../../utils/func';
import { FormatTimeKeys, CookieKeys } from '../../constants/Keys';
import { UserRoutes, AuthRoutes } from '../../navigation/Routes';
import {
  EmailStatus,
  EmailStatusKey,
  defaultCurrentPage,
  TokenExpireResponseCode,
} from '../../constants/General';
import { EventStatusBadge } from '../Events/EventsComponent';
import TableComponent from '../../components/Table/Table';
import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import BallLoading from '../../components/BallLoading';
import {
  EmailsContainer,
  EmailsListTableContainer,
  AddNewEmailContainer,
} from './EmailsComponent';
import {
  selectData,
  selectError,
  selectLoading,
  getEmailListAction,
  selectFilterStatus,
  selectPage,
  selectPageSize,
  selectSearchKeyword,
  selectTotal,
  setPage,
  setPageSize,
  setFilterStatus,
  setSearchKeyword,
  resetState,
  EmailListProps,
  selectEventReminderList,
  getReminderListAction,
  deleteEmailAction,
} from './Emails.slice';

const { Option } = Select;
const { confirm } = Modal;

enum Tabkey {
  announcements = 'Announcements',
  emailCampaign = 'Email Campaign',
}

const Emails = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const cookie = useCookie([
    CookieKeys.authUser,
    CookieKeys.authUserName,
    CookieKeys.userNotActiveToken,
  ]);

  const emailList = useAppSelector(selectData);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const filterStatus = useAppSelector(selectFilterStatus);
  const page = useAppSelector(selectPage);
  const pageSize = useAppSelector(selectPageSize);
  const searchKeyword = useAppSelector(selectSearchKeyword);
  const total = useAppSelector(selectTotal);
  const emailReminderList = useAppSelector(selectEventReminderList);

  const [selectTab, setSelectTab] = useState<string>(Tabkey.announcements);
  const [showNoSearchData, setShowNoSearchData] = useState<boolean>(false);
  const [reviewDefauleEmail, setReviewDefauleEmail] = useState<boolean>(false);
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false);

  const cancelEmail = (emailId: string, isDefault: boolean) => {
    setDeleteSuccess(false);
    confirm({
      centered: true,
      closable: false,
      okText: t('Confirm'),
      cancelText: t('Cancel'),
      title:
        (isDefault && t('Cancel default reminder email')) || t('Delete Email'),
      icon: <ExclamationCircleOutlined />,
      content:
        (isDefault &&
          t(
            `CrowdServe will not send out a default event reminder email to the attendees 24 hours before the event starts if you click 'Confirm'.`,
          )) ||
        t('Are you sure you want to delete this email?'),
      onOk: async () => {
        const response = await dispatch(deleteEmailAction({ id: emailId }));
        if (response.type === deleteEmailAction.fulfilled.toString()) {
          message.success(t('Deleted successfully'));
          setDeleteSuccess(true);
        }
      },
    });
  };

  const columns = [
    {
      title: 'Event',
      dataIndex: 'event',
      key: 'event',
      width: 400,
      render: (_: string, record: EmailListProps) => (
        <Row>
          <Col span={6}>
            <div
              className={
                (record.event.image.includes('.gif') && 'event-img type-gif') ||
                'event-img'
              }
            >
              <img src={record.event.image || Images.NoEventBanner} alt="" />
            </div>
          </Col>
          <Col span={18} className="table-event">
            <Row>
              <Col span={24} className="event-name">
                {record.event.name}
              </Col>
              <Col span={24} className="event-date">
                <span>
                  {formatTimeStrByTimeString(
                    record.event.startTime,
                    FormatTimeKeys.norm,
                  )}{' '}
                  -{' '}
                  {formatTimeStrByTimeString(
                    record.event.endTime,
                    FormatTimeKeys.norm,
                  )}
                </span>
              </Col>
            </Row>
          </Col>
        </Row>
      ),
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      width: 340,
      render: (subject: string, record: EmailListProps) => (
        <div className="email-subject-content">
          <span className="email-subject">{subject}</span>
          {record.isDefault && (
            <EventStatusBadge color={Colors.navy1} background={Colors.navy}>
              Default
            </EventStatusBadge>
          )}
          <div className="time-info">
            Scheduled for{' '}
            {formatTimeStrByTimeString(record.sendTime, FormatTimeKeys.norm)}
          </div>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 180,
      render: (status: number) => (
        <div>
          {(status === EmailStatus.scheduled && (
            <EventStatusBadge
              color={Colors.orange3}
              background={Colors.orange2}
            >
              Scheduled
            </EventStatusBadge>
          )) || (
            <EventStatusBadge color={Colors.white} background={Colors.grey7}>
              Sent
            </EventStatusBadge>
          )}
        </div>
      ),
    },
    {
      title: '',
      dataIndex: '',
      key: '',
      width: 100,
      render: (_: any, record: EmailListProps) => {
        if (record.status !== EmailStatus.sent) {
          if (record.isDefault) {
            return (
              <div className="action-content">
                <div className="content">
                  <div
                    className="icon-content"
                    onClick={() => setReviewDefauleEmail(true)}
                  >
                    <img src={Images.EyeIcon} alt="" />
                  </div>
                  <div
                    className="icon-content"
                    onClick={() =>
                      cancelEmail(record.id.toString(), record.isDefault)
                    }
                  >
                    <img src={Images.DeleteOutlinedIcon} alt="" />
                  </div>
                </div>
              </div>
            );
          }
          return (
            <div className="action-content">
              <div className="content">
                <div
                  className="icon-content"
                  onClick={() =>
                    history.push(
                      UserRoutes.editEmail.replace(':id', record.id.toString()),
                    )
                  }
                >
                  <img src={Images.Editor} alt="" />
                </div>
                <div
                  className="icon-content"
                  onClick={() =>
                    cancelEmail(record.id.toString(), record.isDefault)
                  }
                >
                  <img src={Images.DeleteOutlinedIcon} alt="" />
                </div>
              </div>
            </div>
          );
        }
        return (
          <div className="action-content">
            <div
              className="icon-content"
              onClick={() => {
                if (record.isDefault) {
                  setReviewDefauleEmail(true);
                } else {
                  history.push(
                    UserRoutes.editEmail.replace(':id', record.id.toString()),
                  );
                }
              }}
            >
              <img src={Images.EyeIcon} alt="" />
            </div>
          </div>
        );
      },
    },
  ];

  const handleSelectEvent = (e: string) => {
    let value: string | null = e;
    if (e === 'All') {
      value = null;
    }
    dispatch(setSearchKeyword(value));
    dispatch(setPage(defaultCurrentPage));
  };

  const handleSelectStatus = (e: number | string) => {
    dispatch(setFilterStatus(e));
    dispatch(setPage(defaultCurrentPage));
  };

  const requestEmailList = async () => {
    const response: any = await dispatch(
      getEmailListAction({
        page,
        size: pageSize,
        status: filterStatus,
        keyword: searchKeyword,
      }),
    );
    if (response.type === getEmailListAction.fulfilled.toString()) {
      if (
        (searchKeyword !== null || filterStatus !== null) &&
        !response.payload.list.length
      ) {
        setShowNoSearchData(true);
      } else {
        setShowNoSearchData(false);
      }
    }
  };

  useEffect(() => {
    if (deleteSuccess) {
      requestEmailList();
    }
  }, [deleteSuccess]);

  useEffect(() => {
    requestEmailList();
  }, [page, pageSize, filterStatus, searchKeyword]);

  useEffect(() => {
    if (error) {
      if (error.code === TokenExpireResponseCode) {
        cookie.removeCookie(CookieKeys.authUser, { path: '/' });
        cookie.removeCookie(CookieKeys.authUserName, { path: '/' });
        cookie.removeCookie(CookieKeys.userNotActiveToken, { path: '/' });
        history.push(AuthRoutes.login);
        message.error(t('User token is deprecated, please log in again.'));
        return;
      }
      message.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    dispatch(getReminderListAction());
    return () => {
      dispatch(resetState());
    };
  }, []);

  return (
    <EmailsContainer>
      <PageHeaderComponent title={t('Emails')} />
      <div className="page-main">
        <div className="main-header">
          <div
            className={
              (selectTab === Tabkey.announcements && 'tab-item active') ||
              'tab-item'
            }
            onClick={() => setSelectTab(Tabkey.announcements)}
          >
            {t('Announcements')}
          </div>
          <div
            className={
              (selectTab === Tabkey.emailCampaign && 'tab-item active') ||
              'tab-item'
            }
            // onClick={() => setSelectTab(Tabkey.emailCampaign)}
          >
            {t('Email Campaign')}
          </div>
        </div>
        <Row className="event-filter-container">
          <Col span={24} lg={14}>
            <Row className="content">
              <Col lg={14} span={24}>
                <div className="filter-select-content">
                  <div>
                    <span>{t('Event')}:</span>
                  </div>
                  <Select
                    allowClear
                    placeholder="Select event"
                    defaultActiveFirstOption={false}
                    defaultValue="All"
                    onChange={handleSelectEvent}
                    showSearch
                    filterOption={(input, option: any) =>
                      (option?.children || '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    <Option key="All" value="All">
                      All
                    </Option>
                    {emailReminderList.map((item) => (
                      <Option key={item.id} value={item.name}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                </div>
              </Col>
              <Col lg={10} span={24} className="filter-status">
                <div className="filter-select-content">
                  <div>
                    <span>{t('Status')}:</span>
                  </div>
                  <div>
                    <Select
                      onChange={handleSelectStatus}
                      defaultActiveFirstOption={false}
                      defaultValue="All"
                    >
                      {EmailStatusKey.map((item) => (
                        <Option key={item.key} value={item.key}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col lg={10} span={24}>
            <Button
              type="primary"
              onClick={() => history.push(UserRoutes.createEmail)}
              className="create-new"
            >
              <PlusOutlined />
              Create New
            </Button>
          </Col>
        </Row>
        <EmailsListTableContainer>
          {(loading && <BallLoading />) || (
            <>
              {(emailList.length && (
                <Col lg={24} span={24}>
                  <TableComponent
                    loading={loading}
                    columns={columns}
                    tableData={emailList}
                    currentPage={page}
                    currentPageSize={pageSize}
                    tableDataTotal={total}
                    paginationChange={(currentPage, currentPageSize) => {
                      dispatch(setPage(currentPage));
                      dispatch(setPageSize(currentPageSize));
                    }}
                  />
                </Col>
              )) || (
                <AddNewEmailContainer>
                  <div>
                    <img
                      src={
                        (!showNoSearchData && Images.AddNewEventIcon) ||
                        Images.NoSearchDataIcon
                      }
                      alt=""
                    />
                    <p className="title">
                      {(!showNoSearchData && t('Create New Email')) ||
                        t('No Matching Results')}
                    </p>
                  </div>
                </AddNewEmailContainer>
              )}
            </>
          )}
        </EmailsListTableContainer>
      </div>
      <Modal
        open={reviewDefauleEmail}
        onCancel={() => setReviewDefauleEmail(false)}
        footer={null}
      >
        <div style={{ padding: 24 }}>
          <img style={{ maxWidth: '100%' }} src={Images.ReminderEmail} alt="" />
        </div>
      </Modal>
    </EmailsContainer>
  );
};

export default Emails;
