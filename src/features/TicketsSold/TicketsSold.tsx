import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Row,
  Col,
  Input,
  Select,
  Button,
  Dropdown,
  Modal,
  Upload,
  message,
  Progress,
} from 'antd';
import type { MenuProps, UploadProps } from 'antd';
import {
  CloseOutlined,
  SearchOutlined,
  PlusOutlined,
  DownloadOutlined,
  ExclamationCircleOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { CSVLink } from 'react-csv';
import { useParams } from 'react-router-dom';
import Papa from 'papaparse';

import { UserRoutes } from '../../navigation/Routes';
import { isEmail } from '../../utils/validator';
import { Images } from '../../theme';
import {
  defaultCurrentPage,
  defaultPageSize,
  priceUnit,
  ImportTicketsTemplate,
  UploadCSVType,
} from '../../constants/General';
import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import TableComponent from '../../components/Table/Table';
import Pagination from '../../components/Pagination';
import {
  TicketsSoldContainer,
  ContainerTitle,
  ListTableContainer,
  TableFilterContainer,
} from './TicketsSoldComponent';

const { Option } = Select;
const { confirm } = Modal;
const { Dragger } = Upload;

const TicketsSold = ({ isComponent }: { isComponent?: boolean }) => {
  const { t } = useTranslation();
  const params: any = useParams();

  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [showImportModal, setShowImportModal] = useState<boolean>(false);
  const [showImportProgress, setShowImportProgress] = useState<boolean>(false);

  let data = [
    {
      id: 1,
      attendee: 'Christine',
      email: 'christine.xu@gmail.com',
      ticketType: 'VIP',
      paidPrice: 8,
      ticketPrice: 10,
      discount: -2,
      promoCode: 'Birthday',
      fees: 2,
      seatNumber: 'VIP-5',
      ticketNumber: 'K0J2947294759284',
      boughtAt: 'Jul 12, 2023',
      time: '21:30',
      source: 'Primary Market',
      status: 'Live',
    },
    {
      id: 2,
      attendee: 'Rick',
      email: 'rick.xu@imaginato.com',
      ticketType: 'VIP',
      paidPrice: 8,
      ticketPrice: 10,
      discount: -2,
      promoCode: 'Birthday',
      fees: 0,
      seatNumber: 'VIP-5',
      ticketNumber: 'K0J2947294759284',
      boughtAt: 'Jul 12, 2023',
      time: '21:30',
      source: 'Primary Market',
      status: 'Live',
    },
    {
      id: 3,
      attendee: 'Jack',
      email: 'jack.zhou@imaginato.com',
      ticketType: 'VIP',
      paidPrice: 8,
      ticketPrice: 10,
      discount: -2,
      promoCode: 'Birthday',
      fees: 0,
      seatNumber: 'VIP-5',
      ticketNumber: 'K0J2947294759284',
      boughtAt: 'Jul 12, 2023',
      time: '21:30',
      source: 'Primary Market',
      status: 'Live',
    },
    {
      id: 4,
      attendee: 'Simba',
      email: 'simba.luo@imaginato.com',
      ticketType: 'VIP',
      paidPrice: 8,
      ticketPrice: 10,
      discount: -2,
      promoCode: 'Birthday',
      fees: 0,
      seatNumber: 'VIP-5',
      ticketNumber: 'K0J2947294759284',
      boughtAt: 'Jul 12, 2023',
      time: '21:30',
      source: 'Primary Market',
      status: 'Live',
    },
  ];

  const columns = [
    {
      title: 'Attendee',
      dataIndex: 'attendee',
      key: 'attendee',
      width: 200,
      render: (attendee: string, record: any) => (
        <Row gutter={[0, 0]}>
          <Col span={24}>{attendee}</Col>
          <Col span={24} className="item-label">
            {record.email}
          </Col>
        </Row>
      ),
    },
    {
      title: 'Ticket Type',
      dataIndex: 'ticketType',
      key: 'ticketType',
      width: 140,
    },
    {
      title: 'Paid Price',
      dataIndex: 'paidPrice',
      key: 'paidPrice',
      render: (paidPrice: number) => <span>{`${paidPrice} ${priceUnit}`}</span>,
      width: 140,
    },
    {
      title: 'Ticket Price',
      dataIndex: 'ticketPrice',
      key: 'ticketPrice',
      width: 140,
      render: (ticketPrice: number) => (
        <span>{`${ticketPrice} ${priceUnit}`}</span>
      ),
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      width: 200,
      render: (discount: number, record: any) => (
        <>
          {(discount && (
            <Row gutter={[0, 0]}>
              <Col>{`${discount} ${priceUnit}`}</Col>
              <Col span={24} className="item-label">
                Promocode: {record.promoCode}
              </Col>
            </Row>
          )) ||
            '/'}
        </>
      ),
    },
    {
      title: 'Fees',
      dataIndex: 'fees',
      key: 'fees',
      width: 140,
      render: (fees: number) => (
        <Col
          span={24}
          className="item-action"
          onClick={() => {
            confirm({
              className: 'fees-detail-modal',
              centered: true,
              closable: false,
              maskClosable: true,
              content: (
                <Row>
                  <Col span={24} className="fees-detail-item">
                    <Row>
                      <Col span={12} className="label">
                        {t('Service Fee')}
                      </Col>
                      <Col span={12} className="value">{`1 ${priceUnit}`}</Col>
                    </Row>
                  </Col>
                  <Col span={24} className="fees-detail-item">
                    <Row>
                      <Col span={12} className="label">
                        {t('Royalty Fee')}
                      </Col>
                      <Col span={12} className="value">{`1 ${priceUnit}`}</Col>
                    </Row>
                  </Col>
                  <Col span={24} className="fees-detail-item">
                    <Row>
                      <Col span={12} className="label">
                        {t('Transaction Fee')}
                      </Col>
                      <Col span={12} className="value">{`1 ${priceUnit}`}</Col>
                    </Row>
                  </Col>
                  <Col span={24} className="fees-detail-item item-total">
                    <Row>
                      <Col span={12} className="label">
                        {t('Total')}
                      </Col>
                      <Col span={12} className="value">{`3 ${priceUnit}`}</Col>
                    </Row>
                  </Col>
                </Row>
              ),
            });
          }}
        >
          {(fees > 0 && `${fees} ${priceUnit}`) || fees}
        </Col>
      ),
    },
    {
      title: 'Seat Number',
      dataIndex: 'seatNumber',
      key: 'seatNumber',
      width: 160,
    },
    {
      title: 'Ticket Number',
      dataIndex: 'ticketNumber',
      key: 'ticketNumber',
      width: 250,
    },
    {
      title: 'Bought at',
      dataIndex: 'boughtAt',
      key: 'boughtAt',
      width: 150,
      render: (boughtAt: string, record: any) => (
        <Row gutter={[0, 0]}>
          <Col span={24}>{boughtAt}</Col>
          <Col span={24} className="item-label">
            {record.time}
          </Col>
        </Row>
      ),
    },
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
      width: 200,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
    },
    {
      title: '',
      dataIndex: '',
      key: 'action',
      width: 80,
      render: () => {
        const items: MenuProps['items'] = [
          {
            label: t('Cancel Ticket'),
            key: 'Cancel Ticket',
            onClick: () => {
              confirm({
                centered: true,
                closable: false,
                okText: t('Cancel Ticket'),
                cancelText: t('Back'),
                title: t('Cancel Ticket'),
                icon: <ExclamationCircleOutlined />,
                content: t(
                  'Are you sure you want to cancel this ticket? The ticket will be refunded deducting service fee.',
                ),
                onOk: () => {},
              });
            },
          },
        ];
        return (
          <div className="list-action">
            <div className="icon-content">
              <Dropdown
                menu={{ items }}
                trigger={['click']}
                overlayClassName="more-action"
              >
                <img src={Images.MoreOutlinedIcon} alt="" />
              </Dropdown>
            </div>
          </div>
        );
      },
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
    const downloadData = data.map((dataItem) => ({
      ...dataItem,
      attendeeName: dataItem.attendee,
      attendeeEmail: dataItem.email,
      paidPrice: `${dataItem.paidPrice} ${priceUnit}`,
      ticketPrice: `${dataItem.ticketPrice} ${priceUnit}`,
      discount: `${
        (dataItem.discount && `${dataItem.discount} ${priceUnit}`) || '/'
      }`,
      fees: `${dataItem.fees} ${priceUnit}`,
      boughtAt: `${dataItem.boughtAt}\n${dataItem.time}`,
    }));
    return { headers, data: downloadData };
  };

  const uploadCSVProps: UploadProps = {
    name: 'uploadCSV',
    multiple: false,
    fileList: [],
    beforeUpload: (file) => {
      let errorFlag = false;
      const { type, size } = file;
      const isLimit = size / 1024 / 1024 < 20;
      if (type !== UploadCSVType) {
        message.error(t('Wrong file type, please upload CSV file'));
      } else if (!isLimit) {
        message.error(
          t(
            'File size exceeds the allowed limit. Please upload a CSV file up to [size]',
            { size: '20M' },
          ),
        );
      } else {
        Papa.parse(file, {
          complete: (results: any) => {
            const jsonResult: object[] = [];
            const resultsBody: any = [];
            const resultsHeader = results.data[0];
            results.data.map((dataItem: string[]) => {
              if (dataItem.length !== 1) {
                resultsBody.push(dataItem);
              }
              return dataItem;
            });
            if (
              !resultsHeader.includes('Attendee Email') ||
              !resultsHeader.includes('Ticket Type')
            ) {
              errorFlag = true;
              message.error(
                t(
                  'Incorrect template used. Please upload the CSV file with our provided template',
                ),
              );
            } else {
              resultsBody.forEach((item: string[], index: number) => {
                if (index !== 0) {
                  const fieldObj: any = {};
                  item.forEach((field: string, fieldIndex: number) => {
                    if (resultsHeader[fieldIndex]) {
                      fieldObj[resultsHeader[fieldIndex]] = field;
                    }
                  });
                  jsonResult.push(fieldObj);
                }
              });
              jsonResult.some((obj: any) => {
                if (!obj['Attendee Email'] || !obj['Ticket Type']) {
                  errorFlag = true;
                  message.error(
                    t(
                      'The CSV file is missing some required fields. Please fill in all mandatory fields for each ticket.',
                    ),
                  );
                  return true;
                }
                if (!isEmail(obj['Attendee Email'])) {
                  errorFlag = true;
                  message.error(
                    t(
                      'Invalid data found in the CSV file. Please check for correct formatting and valid values in all ticket entries.',
                    ),
                  );
                  return true;
                }
                return false;
              });
            }
          },
        });
      }
      return isLimit && type === UploadCSVType && !errorFlag;
    },
    customRequest: () => {
      setShowImportProgress(true);
      setTimeout(() => {
        setShowImportModal(false);
        setShowImportProgress(false);
        message.success(
          t('[count] tickets are successfully issued.', { count: 10 }),
        );
      }, 1000);
    },
  };

  if (isComponent) {
    data = data.slice(0, 4);
  }

  const table = (
    <div style={{ minHeight: isComponent ? 'auto' : '250px' }}>
      <div className="table-overflow">
        <TableComponent
          loading={false}
          columns={columns}
          tableData={data}
          emptyText={
            <div className="table-empty-text">
              <img src={Images.NoDataIcon} alt="" />
              <p>{t('No data')}</p>
            </div>
          }
          showCustomPagination={false}
        />
      </div>
      {!isComponent && (
        <Pagination
          current={defaultCurrentPage}
          pageSize={defaultPageSize}
          total={data.length}
          onChange={() => {}}
          hideOnSinglePage
        />
      )}
    </div>
  );

  return isComponent ? (
    <ListTableContainer style={{ padding: 0 }}>{table}</ListTableContainer>
  ) : (
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
            label: t('Tickets sold'),
          },
        ]}
      />
      <TicketsSoldContainer>
        <div className="page-main">
          <ContainerTitle>
            <Col span={12}>
              <div className="info-content">
                <div>
                  <p className="content-title">{t('Tickets Sold')}</p>
                  <p className="content-name">{params.name}</p>
                </div>
              </div>
            </Col>
            <Col span={12} className="right">
              <div className="info-content">
                <div>
                  <p className="content-title">200</p>
                  <p className="content-info">
                    <span>Tickets Imported</span>
                    <span className="bold">2</span>
                  </p>
                  <p className="content-info">
                    <span>Ticket cancelled / refunded</span>
                    <span className="bold">0</span>
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
                      suffix={!searchKeyword && <SearchOutlined />}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                  </Col>
                  <Col lg={5} span={24}>
                    <Select
                      placeholder={t('Ticket Type')}
                      defaultActiveFirstOption={false}
                    >
                      <Option value="Paid">Paid</Option>
                    </Select>
                  </Col>
                  <Col lg={5} span={24} className="filter-status">
                    <Select
                      placeholder={t('Status')}
                      defaultActiveFirstOption={false}
                    >
                      <Option value="Paid">Paid</Option>
                    </Select>
                  </Col>
                  <Col lg={5} span={24} className="filter-status">
                    <Select
                      placeholder={t('Source')}
                      defaultActiveFirstOption={false}
                    >
                      <Option value="Paid">Paid</Option>
                    </Select>
                  </Col>
                </Row>
              </Col>
              <Col lg={7} span={24} className="export-action">
                <CSVLink
                  filename={`${'Test'}_Tickets_Export.csv`}
                  headers={formatDownloadHeaders().headers}
                  data={formatDownloadHeaders().data}
                >
                  <Button className="action-button" disabled={!data.length}>
                    <DownloadOutlined />
                    {t('Export')}
                  </Button>
                </CSVLink>
                <Button
                  className="action-button"
                  onClick={() => setShowImportModal(true)}
                >
                  <PlusOutlined />
                  {t('Import')}
                </Button>
              </Col>
            </TableFilterContainer>
            {table}
          </ListTableContainer>
          <Modal
            wrapClassName="import-modal"
            open={showImportModal}
            title={t('Import Tickets')}
            centered
            footer={null}
            onCancel={() => {
              setShowImportModal(false);
              setShowImportProgress(false);
            }}
          >
            <CSVLink
              filename="Tickets_Export_Template.csv"
              headers={ImportTicketsTemplate}
              data={[]}
            >
              <Col span={24} className="import-info">
                {t('To import tickets, use our')}
                <span>{t('CSV Template')}</span>
              </Col>
            </CSVLink>
            <Col span={24} className="import-content">
              {(!showImportProgress && (
                <Dragger {...uploadCSVProps}>
                  <p className="ant-upload-drag-icon">
                    <UploadOutlined />
                  </p>
                  <p className="ant-upload-text">
                    {t('Click or drag a CSV file to this area to upload')}
                  </p>
                </Dragger>
              )) || (
                <Col span={24} className="progress-content">
                  <Progress
                    percent={30}
                    showInfo={false}
                    strokeColor="#27272A"
                  />
                  <p className="file-name">Issued tickets.csv</p>
                </Col>
              )}
            </Col>
          </Modal>
        </div>
      </TicketsSoldContainer>
    </>
  );
};

export default TicketsSold;
