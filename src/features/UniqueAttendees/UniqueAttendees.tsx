import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Input, Button, Space, Select } from 'antd';
import {
  CloseOutlined,
  SearchOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { CSVLink } from 'react-csv';
import { useParams } from 'react-router-dom';
import { debounce, isEmpty } from 'lodash';
import moment from 'moment';

import { UserRoutes } from '../../navigation/Routes';
import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import TableComponent from '../../components/Table/Table';
import Pagination from '../../components/Pagination';
import BallLoading from '../../components/BallLoading';
import {
  TicketsSoldContainer,
  ContainerTitle,
  ListTableContainer,
  TableFilterContainer,
  SelectButton,
} from './UniqueAttendeesComponent';

import { Images } from '../../theme';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  SourceType,
  getEventScannedAction,
  getUniqueAttendeesAction,
  getUniqueAttendeesSummaryAction,
  reset,
  selectEventScanned,
  selectLoading,
  selectUniqueAttendees,
  selectUniqueAttendeesSummary,
} from './UniqueAttendees.slice';
import {
  getListTicketTypeAction,
  selectListTicketType,
} from '../CreateEvent/CreateEvent.slice';

enum SelectOptions {
  uniqueAttendees = 'uniqueAttendees',
  ticketsScanned = 'ticketsScanned',
}

const sourceOptions = [
  {
    label: 'Primary Market',
    value: SourceType.primary,
  },
  {
    label: 'Secondary Market',
    value: SourceType.secondary,
  },
  {
    label: 'Manually Imported',
    value: SourceType.import,
  },
  {
    label: 'Transferred',
    value: SourceType.transferred,
  },
];

const UniqueAttendees = () => {
  const { t } = useTranslation();
  const params: any = useParams();
  const [searchKeywordState, setSearchKeywordState] = useState<string>('');
  const [searchScannedKeywordState, setSearchScannedKeywordState] =
    useState<string>('');
  const [ticketTypeState, setTicketTypeState] = useState<undefined | number>(
    undefined,
  );
  const [sourceState, setSourceState] = useState<undefined | number>(undefined);
  const [statusState, setStatusState] = useState<undefined | boolean>(
    undefined,
  );

  const [option, setOption] = useState(SelectOptions.uniqueAttendees);
  const dispatch = useAppDispatch();
  const uniqueAttendeesSummary = useAppSelector(selectUniqueAttendeesSummary);
  const uniqueAttendees = useAppSelector(selectUniqueAttendees);
  const eventScanned = useAppSelector(selectEventScanned);
  const loading = useAppSelector(selectLoading);
  const listTicketType = useAppSelector(selectListTicketType);
  const columns: any =
    option === SelectOptions.uniqueAttendees
      ? [
          {
            title: 'Attendee First Name',
            dataIndex: 'firstName',
            render: (firstName: string) => firstName || '-',
          },
          {
            title: 'Attendee Last Name',
            dataIndex: 'lastName',
            render: (lastName: string) => lastName || '-',
          },
          {
            title: 'Attendee Email',
            dataIndex: 'email',
          },
          {
            title: 'Owned Tickets',
            dataIndex: 'ownedTickets',
          },
          {
            title: 'Sex',
            dataIndex: 'gender',
            render: (gender: string) => gender || '-',
          },
          {
            title: 'Age',
            dataIndex: 'birthday',
            render: (birthday: string) =>
              birthday ? moment().diff(birthday, 'years') : '-',
          },
          {
            title: 'Status',
            dataIndex: 'isActivated',
            render: (isActivated: boolean) =>
              isActivated ? 'Active' : 'Inactive',
          },
        ]
      : [
          {
            title: 'Attendee First Name',
            dataIndex: 'firstName',
          },
          {
            title: 'Attendee Last Name',
            dataIndex: 'lastName',
          },
          {
            title: 'Attendee Email',
            dataIndex: 'email',
          },
          {
            title: 'Ticket Number',
            dataIndex: 'ticketNo',
          },
          {
            title: 'Ticket Type',
            dataIndex: 'ticketType',
          },
          {
            title: 'Seat Number',
            dataIndex: 'seat',
          },
          {
            title: 'Source',
            dataIndex: 'source',
            render: (source: number) =>
              sourceOptions.find((item) => item.value === source)?.label || '-',
          },
        ];

  const formatDownloadHeaders = () => {
    const headers: any = [];
    columns.map((item: any) => {
      if (item.title) {
        headers.push({
          label: item.title,
          key: item.dataIndex,
        });
      }
      return item;
    });
    let data: any = [];

    if (option === SelectOptions.uniqueAttendees) {
      data = Array.isArray(uniqueAttendees)
        ? uniqueAttendees.map((item) => ({
            ...item,
            birthday: item.birthday
              ? moment().diff(item.birthday, 'years')
              : '-',
            isActivated: item.isActivated ? 'Active' : 'Inactive',
          }))
        : [];
    } else {
      data = Array.isArray(eventScanned)
        ? eventScanned.map((item) => ({
            ...item,
            source:
              sourceOptions.find((opt) => opt.value === item.source)?.label ||
              '-',
          }))
        : [];
    }

    return { headers, data };
  };

  useEffect(() => {
    dispatch(getUniqueAttendeesSummaryAction({ eventId: params.id }));
    dispatch(getListTicketTypeAction());
    return () => {
      dispatch(reset());
    };
  }, []);

  const fetchData = useCallback(
    debounce(() => {
      if (option === SelectOptions.uniqueAttendees) {
        dispatch(
          getUniqueAttendeesAction({
            eventId: params.id,
            keyword: searchKeywordState,
            isActivated: statusState,
          }),
        );
      } else {
        dispatch(
          getEventScannedAction({
            eventId: params.id,
            source: sourceState,
            ticketTypeId: ticketTypeState,
            keyword: searchScannedKeywordState,
          }),
        );
      }
    }, 300),
    [
      sourceState,
      ticketTypeState,
      searchKeywordState,
      searchScannedKeywordState,
      statusState,
      option,
    ],
  );
  useEffect(() => {
    fetchData();
  }, [
    sourceState,
    ticketTypeState,
    searchKeywordState,
    statusState,
    option,
    searchKeywordState,
    searchScannedKeywordState,
  ]);

  useEffect(() => {
    setTicketTypeState(undefined);
    setSourceState(undefined);
    setStatusState(undefined);
  }, [option]);

  const getTableData = () => {
    if (option === SelectOptions.uniqueAttendees) {
      return Array.isArray(uniqueAttendees) ? uniqueAttendees : [];
    }
    return Array.isArray(eventScanned) ? eventScanned : [];
  };

  const getDataLength = () => {
    if (option === SelectOptions.uniqueAttendees) {
      return Array.isArray(uniqueAttendees) ? uniqueAttendees.length : 0;
    }
    return Array.isArray(eventScanned) ? eventScanned.length : 0;
  };

  const table = (
    <div>
      <TableComponent
        loading={loading}
        columns={columns}
        tableData={getTableData()}
        emptyText={
          <div className="table-empty-text">
            <img src={Images.NoDataIcon} alt="" />
            <p>{t('No data')}</p>
          </div>
        }
        showCustomPagination={false}
      />
      <Pagination
        pageSize={getDataLength()}
        total={getDataLength()}
        hideOnSinglePage
      />
    </div>
  );

  const handleChangeOption = (param: SelectOptions) => {
    setOption(param);
    setSearchKeywordState('');
    setSearchScannedKeywordState('');
  };

  return (
    <>
      <PageHeaderComponent
        breadcrumb={[
          {
            label: t('Events'),
            href: UserRoutes.events,
          },
          {
            label: params.name,
            href: UserRoutes.eventDashboard
              .replace(':id', params.id)
              .replace(':name', params.name),
          },
          {
            label:
              (option === SelectOptions.uniqueAttendees &&
                t('Total Ticket Holders')) ||
              t('Tickets Scanned'),
          },
        ]}
      />
      <TicketsSoldContainer>
        <Space style={{ marginBottom: 16 }} size="middle">
          <SelectButton
            selected={option === SelectOptions.uniqueAttendees}
            onClick={() => handleChangeOption(SelectOptions.uniqueAttendees)}
          >
            Total Ticket Holders
          </SelectButton>
          <SelectButton
            selected={option === SelectOptions.ticketsScanned}
            onClick={() => handleChangeOption(SelectOptions.ticketsScanned)}
          >
            Tickets Scanned
          </SelectButton>
        </Space>
        <div className="page-main">
          <ContainerTitle>
            <Col span={12}>
              <div className="info-content">
                <div>
                  <p className="content-title">
                    {t(
                      option === SelectOptions.uniqueAttendees
                        ? 'Total Ticket Holders'
                        : 'Tickets Scanned',
                    )}
                  </p>
                  <p className="content-name">{params.name}</p>
                </div>
              </div>
            </Col>
            <Col span={12} className="right">
              <div className="info-content">
                <div>
                  <p className="content-info">
                    <span></span>
                    <span className="bold content-title-sold large-text">
                      {option === SelectOptions.uniqueAttendees
                        ? uniqueAttendeesSummary.attendeesCount
                        : uniqueAttendeesSummary.scannedCount}
                    </span>
                  </p>
                  <p className="content-info">
                    <span>
                      {option === SelectOptions.uniqueAttendees
                        ? 'Tickets Scanned'
                        : 'Total Ticket Holders'}
                    </span>
                    <span className="bold">
                      {option === SelectOptions.uniqueAttendees
                        ? uniqueAttendeesSummary.scannedCount
                        : uniqueAttendeesSummary.attendeesCount}
                    </span>
                  </p>
                </div>
              </div>
            </Col>
          </ContainerTitle>
          <ListTableContainer>
            <TableFilterContainer>
              <Col lg={17} span={24}>
                <Row className="filter-items" gutter={[16, 16]}>
                  <Col lg={9} span={24}>
                    {option === SelectOptions.uniqueAttendees ? (
                      <Input
                        placeholder={t('Search attendee name or email')}
                        allowClear={{
                          clearIcon: <CloseOutlined />,
                        }}
                        suffix={!searchKeywordState && <SearchOutlined />}
                        onChange={(e) => setSearchKeywordState(e.target.value)}
                        value={searchKeywordState}
                      />
                    ) : (
                      <Input
                        placeholder={t('Search attendee or ticket number')}
                        allowClear={{
                          clearIcon: <CloseOutlined />,
                        }}
                        suffix={!searchKeywordState && <SearchOutlined />}
                        onChange={(e) =>
                          setSearchScannedKeywordState(e.target.value)
                        }
                        value={searchScannedKeywordState}
                      />
                    )}
                  </Col>
                  {option === SelectOptions.uniqueAttendees ? (
                    <Col lg={7} span={24}>
                      <Select
                        allowClear
                        placeholder={t('Status')}
                        defaultActiveFirstOption={false}
                        onChange={(e) => {
                          setStatusState(e);
                        }}
                        value={statusState}
                        options={[
                          {
                            label: t('Active'),
                            value: true,
                          },
                          {
                            label: t('Inactive'),
                            value: false,
                          },
                        ]}
                      />
                    </Col>
                  ) : (
                    <>
                      <Col lg={7} span={24}>
                        <Select
                          allowClear
                          placeholder={t('Ticket Type')}
                          defaultActiveFirstOption={false}
                          onChange={(e) => {
                            setTicketTypeState(e);
                          }}
                          value={ticketTypeState}
                          options={
                            Array.isArray(listTicketType)
                              ? listTicketType.filter(
                                  (item) => item.eventName === params.name,
                                )
                              : []
                          }
                          fieldNames={{
                            label: 'name',
                            value: 'id',
                          }}
                        />
                      </Col>
                      <Col lg={7} span={24}>
                        <Select
                          allowClear
                          placeholder={t('Source')}
                          defaultActiveFirstOption={false}
                          onChange={(e) => {
                            setSourceState(e);
                          }}
                          options={sourceOptions}
                          value={sourceState}
                        />
                      </Col>
                    </>
                  )}
                </Row>
              </Col>
              <Col lg={7} span={24} className="export-action single">
                <CSVLink
                  filename={`${params.name}_${
                    option === SelectOptions.uniqueAttendees
                      ? 'Total_Ticket_Holders'
                      : 'Tickets_Scanned'
                  }_Export.csv`}
                  headers={formatDownloadHeaders().headers}
                  data={formatDownloadHeaders().data}
                >
                  <Button
                    className="action-button"
                    disabled={(() => {
                      if (option === SelectOptions.uniqueAttendees) {
                        return isEmpty(
                          Array.isArray(uniqueAttendees) ? uniqueAttendees : [],
                        );
                      }
                      return isEmpty(
                        Array.isArray(eventScanned) ? eventScanned : [],
                      );
                    })()}
                  >
                    <DownloadOutlined />
                    {t('Export')}
                  </Button>
                </CSVLink>
              </Col>
            </TableFilterContainer>
            {(loading && <BallLoading />) || <>{table}</>}
          </ListTableContainer>
        </div>
      </TicketsSoldContainer>
    </>
  );
};

export default UniqueAttendees;
