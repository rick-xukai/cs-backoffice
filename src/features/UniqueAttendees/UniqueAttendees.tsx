import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Input, Button, Space, Select, Form } from 'antd';
import {
  CloseOutlined,
  SearchOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
// import { CSVLink } from 'react-csv';
import { useParams } from 'react-router-dom';
import { debounce } from 'lodash';
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
];

const UniqueAttendees = () => {
  const { t } = useTranslation();
  const params: any = useParams();
  const [searchKeywordState, setSearchKeywordState] = useState<string>('');
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
  const [form] = Form.useForm();
  const columns =
    option === SelectOptions.uniqueAttendees
      ? [
          {
            title: 'Attendee Name',
            dataIndex: 'name',
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
            title: 'Gender',
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
            title: 'Attendee Name',
            dataIndex: 'name',
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

  // const formatDownloadHeaders = () => {
  //   const headers: any = [];
  //   columns.map((headersItem) => {
  //     if (headersItem.title) {
  //       headers.push({
  //         label: headersItem.title,
  //         key: headersItem.dataIndex,
  //       });
  //     }
  //     return headersItem;
  //   });
  //   headers.shift();
  //   headers.unshift(
  //     { label: 'Attendee Name', key: 'attendeeName' },
  //     { label: 'Attendee Email', key: 'attendeeEmail' },
  //   );
  //   const downloadData = listData.map((dataItem: TicketSoldListItemProps) => ({
  //     ...dataItem,
  //     attendeeName: dataItem.user.name,
  //     attendeeEmail: dataItem.user.email,
  //     total: `${dataItem.total} ${priceUnit}`,
  //     price: `${dataItem.price} ${priceUnit}`,
  //     ticketType: dataItem.ticketType.name,
  //     discount: `${
  //       (dataItem.discount && `${dataItem.discount} ${priceUnit}`) || '/'
  //     }`,
  //     absorbFees: checkFees(dataItem).props.children,
  //     createdAt: `${formatTimeStrByTimeString(
  //       dataItem.createdAt,
  //       FormatTimeKeys.mdy,
  //     )}\n${formatTimeStrByTimeString(dataItem.createdAt, FormatTimeKeys.hm)}`,
  //     source: TicketSoldFilterSource.find((item) => item.id === dataItem.source)
  //       ?.name,
  //     status:
  //       dataItem.saleStatus === TicketSoldSaleStatus
  //         ? TicketSoldFilterStatus[5].name
  //         : TicketSoldFilterStatus.find((item) => item.id === dataItem.status)
  //             ?.name,
  //   }));
  //   return { headers, data: [] };
  // };

  useEffect(() => {
    dispatch(getUniqueAttendeesSummaryAction({ eventId: params.id }));
    dispatch(getListTicketTypeAction());
  }, []);

  useEffect(() => {
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
          keyword: searchKeywordState,
        }),
      );
    }
  }, [sourceState, ticketTypeState, searchKeywordState, statusState, option]);

  useEffect(() => {
    setTicketTypeState(undefined);
    setSourceState(undefined);
    setStatusState(undefined);
    setSearchKeywordState('');
    form.resetFields();
  }, [option]);

  const table = (
    <div>
      <TableComponent
        loading={loading}
        columns={columns}
        tableData={
          option === SelectOptions.uniqueAttendees
            ? uniqueAttendees
            : eventScanned
        }
        emptyText={
          <div className="table-empty-text">
            <img src={Images.NoDataIcon} alt="" />
            <p>{t('No data')}</p>
          </div>
        }
        showCustomPagination={false}
      />
      <Pagination
        current={1}
        pageSize={20}
        total={
          option === SelectOptions.uniqueAttendees
            ? uniqueAttendees.length
            : eventScanned.length
        }
        hideOnSinglePage
      />
    </div>
  );

  const searchInputChange = useCallback(
    debounce((e) => setSearchKeywordState(e.target.value), 300),
    [],
  );

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
            label: t('Attendees'),
          },
        ]}
      />
      <TicketsSoldContainer>
        <Space style={{ marginBottom: 16 }} size="middle">
          <SelectButton
            selected={option === SelectOptions.uniqueAttendees}
            onClick={() => setOption(SelectOptions.uniqueAttendees)}
          >
            Unique Attendees
          </SelectButton>
          <SelectButton
            selected={option === SelectOptions.ticketsScanned}
            onClick={() => setOption(SelectOptions.ticketsScanned)}
          >
            Tickets Scanned
          </SelectButton>
        </Space>
        <div className="page-main">
          <ContainerTitle>
            <Col span={12}>
              <div className="info-content">
                <div>
                  <p className="content-title">{t('Unique Attendees')}</p>
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
                      {uniqueAttendeesSummary.attendeesCount}
                    </span>
                  </p>
                  <p className="content-info">
                    <span>Tickets Scanned</span>
                    <span className="bold">
                      {uniqueAttendeesSummary.scannedCount}
                    </span>
                  </p>
                </div>
              </div>
            </Col>
          </ContainerTitle>
          <ListTableContainer>
            <Form form={form}>
              <TableFilterContainer>
                <Col lg={17} span={24}>
                  <Row className="filter-items" gutter={[16, 16]}>
                    <Col lg={9} span={24}>
                      <Form.Item noStyle name="keyword">
                        <Input
                          placeholder={t(
                            option === SelectOptions.uniqueAttendees
                              ? 'Search attendee name or email'
                              : 'Search attendee or ticket number',
                          )}
                          allowClear={{
                            clearIcon: <CloseOutlined />,
                          }}
                          suffix={!searchKeywordState && <SearchOutlined />}
                          onChange={searchInputChange}
                        />
                      </Form.Item>
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
                            options={listTicketType}
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
                  {/* <CSVLink
                  filename={`${params.name}_Tickets_Export.csv`}
                  headers={formatDownloadHeaders().headers}
                  data={formatDownloadHeaders().data}
                > */}
                  <Button className="action-button">
                    <DownloadOutlined />
                    {t('Export')}
                  </Button>
                  {/* </CSVLink> */}
                </Col>
              </TableFilterContainer>
            </Form>
            {(loading && <BallLoading />) || <>{table}</>}
          </ListTableContainer>
        </div>
      </TicketsSoldContainer>
    </>
  );
};

export default UniqueAttendees;
