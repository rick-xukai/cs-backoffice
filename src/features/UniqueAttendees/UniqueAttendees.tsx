import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Input, Button, Space } from 'antd';
import {
  CloseOutlined,
  SearchOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { CSVLink } from 'react-csv';
import { useParams } from 'react-router-dom';
import { debounce } from 'lodash';

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
enum SelectOptions {
  uniqueAttendees = 'uniqueAttendees',
  ticketsScanned = 'ticketsScanned',
}
const UniqueAttendees = () => {
  const { t } = useTranslation();
  const params: any = useParams();
  const loading = false;
  const [searchKeywordState, setSearchKeywordState] = useState<string>('');
  const [option, setOption] = useState(SelectOptions.uniqueAttendees);
  const columns = [
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
      dataIndex: 'tickets',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'absorbFees',
    },
  ];

  const formatDownloadHeaders = () => {
    const headers: any = [];
    columns.map((headersItem) => {
      if (headersItem.title) {
        headers.push({
          label: headersItem.title,
          key: headersItem.dataIndex,
        });
      }
      return headersItem;
    });
    headers.shift();
    headers.unshift(
      { label: 'Attendee Name', key: 'attendeeName' },
      { label: 'Attendee Email', key: 'attendeeEmail' },
    );
    // const downloadData = listData.map((dataItem: TicketSoldListItemProps) => ({
    //   ...dataItem,
    //   attendeeName: dataItem.user.name,
    //   attendeeEmail: dataItem.user.email,
    //   total: `${dataItem.total} ${priceUnit}`,
    //   price: `${dataItem.price} ${priceUnit}`,
    //   ticketType: dataItem.ticketType.name,
    //   discount: `${
    //     (dataItem.discount && `${dataItem.discount} ${priceUnit}`) || '/'
    //   }`,
    //   absorbFees: checkFees(dataItem).props.children,
    //   createdAt: `${formatTimeStrByTimeString(
    //     dataItem.createdAt,
    //     FormatTimeKeys.mdy,
    //   )}\n${formatTimeStrByTimeString(dataItem.createdAt, FormatTimeKeys.hm)}`,
    //   source: TicketSoldFilterSource.find((item) => item.id === dataItem.source)
    //     ?.name,
    //   status:
    //     dataItem.saleStatus === TicketSoldSaleStatus
    //       ? TicketSoldFilterStatus[5].name
    //       : TicketSoldFilterStatus.find((item) => item.id === dataItem.status)
    //           ?.name,
    // }));
    return { headers, data: [] };
  };

  const tableData = [
    {
      name: 'Christine',
      email: 'christine.xu@gmail.com',
      tickets: '1',
      gender: 'Female',
      age: '99',
      status: 'Active',
    },
  ];

  const table = (
    <div>
      <TableComponent
        loading={loading}
        columns={columns}
        tableData={tableData}
        emptyText={
          <div className="table-empty-text">
            <img src={Images.NoDataIcon} alt="" />
            <p>{t('No data')}</p>
          </div>
        }
        showCustomPagination={false}
      />
      <Pagination current={1} pageSize={20} total={1} hideOnSinglePage />
    </div>
  );

  const searchInputChange = useCallback(
    debounce((e) => console.log(e.target.value), 300),
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
                      1
                    </span>
                  </p>
                  <p className="content-info">
                    <span>Tickets Scanned</span>
                    <span className="bold">{1}</span>
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
                    <Input
                      placeholder={t('Search attendee name or email')}
                      allowClear={{
                        clearIcon: <CloseOutlined />,
                      }}
                      suffix={!searchKeywordState && <SearchOutlined />}
                      onChange={(e) => {
                        setSearchKeywordState(e.target.value);
                        searchInputChange(e);
                      }}
                    />
                  </Col>
                </Row>
              </Col>
              <Col lg={7} span={24} className="export-action single">
                <CSVLink
                  filename={`${params.name}_Tickets_Export.csv`}
                  headers={formatDownloadHeaders().headers}
                  data={formatDownloadHeaders().data}
                >
                  <Button className="action-button">
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
