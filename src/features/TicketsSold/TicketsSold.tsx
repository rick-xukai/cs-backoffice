import React, { useEffect, useState, useCallback } from 'react';
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
import { useParams, useHistory } from 'react-router-dom';
import Papa from 'papaparse';
import { debounce, cloneDeep } from 'lodash';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { UserRoutes, AuthRoutes } from '../../navigation/Routes';
import { isEmail } from '../../utils/validator';
import { Images } from '../../theme';
import {
  formatTimeStrByTimeString,
  thousandsSeparator,
} from '../../utils/func';
import { FormatTimeKeys } from '../../constants/Keys';
import {
  priceUnit,
  ImportTicketsTemplate,
  UploadCSVType,
  TicketSoldFilterStatus,
  TicketSoldFilterSource,
  TokenExpireResponseCode,
  TicketSoldSaleStatus,
  defaultCurrentPage,
  defaultPageSize,
} from '../../constants/General';
import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import TableComponent from '../../components/Table/Table';
import Pagination from '../../components/Pagination';
import BallLoading from '../../components/BallLoading';
import {
  TicketsSoldContainer,
  ContainerTitle,
  ListTableContainer,
  TableFilterContainer,
} from './TicketsSoldComponent';
import {
  getTicketSoldListAction,
  selectLoading,
  selectListData,
  selectListTotal,
  selectError,
  resetState,
  setPage,
  setPageSize,
  setFilterSource,
  setFilterStatus,
  setFilterTicketType,
  setSearchKeyword,
  setSaleStatus,
  selectPage,
  selectPageSize,
  selectFilterStatus,
  selectFilterTicketType,
  selectFilterSource,
  selectSearchKeyword,
  selectSaleStatus,
  selectTicketSoldCount,
  getTicketSoldCountAction,
  TicketSoldListItemProps,
  updateTicketStatusAction,
  importTicketsAction,
} from './TicketSold.slice';

const { Option } = Select;
const { confirm } = Modal;
const { Dragger } = Upload;
enum TicketStatus {
  cancel = 2,
}
let timer: NodeJS.Timer | null = null;

const TicketsSold = ({ isComponent }: { isComponent?: boolean }) => {
  const { t } = useTranslation();
  const params: any = useParams();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const listData = useAppSelector(selectListData);
  const listTotal = useAppSelector(selectListTotal);
  const page = useAppSelector(selectPage);
  const pageSize = useAppSelector(selectPageSize);
  const filterStatus = useAppSelector(selectFilterStatus);
  const filterTicketType = useAppSelector(selectFilterTicketType);
  const filterSource = useAppSelector(selectFilterSource);
  const searchKeyword = useAppSelector(selectSearchKeyword);
  const saleStatus = useAppSelector(selectSaleStatus);
  const ticketSoldCount = useAppSelector(selectTicketSoldCount);

  const [searchKeywordState, setSearchKeywordState] = useState<string>('');
  const [showImportModal, setShowImportModal] = useState<boolean>(false);
  const [showImportProgress, setShowImportProgress] = useState<boolean>(false);
  const [importTicketItems, setImportTicketItems] = useState([]);
  const [importProgress, setImportProgress] = useState<number>(0);
  const [importTicketFileName, setImportTicketFileName] = useState<string>('');

  const clearTimerFuction = () => {
    if (timer) {
      clearInterval(Number(timer));
    }
  };

  const loadTicketSoldPageData = () => {
    const getSaleStatus = () => {
      if (filterStatus === TicketSoldFilterStatus[5].id) return saleStatus;
      if (filterStatus === TicketSoldFilterStatus[4].id) return undefined;
      if (filterStatus === undefined) return undefined;
      return 0;
    };
    dispatch(
      getTicketSoldListAction({
        id: params.id,
        data: {
          page,
          size: pageSize,
          status: filterStatus,
          source: filterSource,
          ticketTypeId: filterTicketType,
          keyword: searchKeyword,
          saleStatus: getSaleStatus(),
        },
      }),
    );
  };

  const checkFees = (recordValue: TicketSoldListItemProps) => {
    if (
      recordValue.source ===
      TicketSoldFilterSource.find((item) => item.name === 'Primary Market')?.id
    ) {
      return (
        <>
          {(recordValue.absorbFees > 0 &&
            `${recordValue.absorbFees.toFixed(2)} ${priceUnit}`) ||
            recordValue.absorbFees}
        </>
      );
    }
    if (
      recordValue.source ===
      TicketSoldFilterSource.find((item) => item.name === 'Secondary Market')
        ?.id
    ) {
      return (
        <>
          {(recordValue.paymentFees > 0 &&
            `${recordValue.paymentFees.toFixed(2)} ${priceUnit}`) ||
            recordValue.paymentFees}
        </>
      );
    }
    return (
      <>
        {(recordValue.absorbFees > 0 &&
          `${recordValue.absorbFees.toFixed(2)} ${priceUnit}`) ||
          recordValue.absorbFees}
      </>
    );
  };

  const columns = [
    {
      title: 'Attendee',
      dataIndex: 'user',
      key: 'attendee',
      width: 200,
      render: (_: {}, record: TicketSoldListItemProps) => (
        <Row gutter={[0, 0]}>
          <Col span={24}>{record.user.name}</Col>
          <Col span={24} className="item-label">
            {record.user.email}
          </Col>
        </Row>
      ),
    },
    {
      title: 'Ticket Type',
      dataIndex: 'ticketType',
      key: 'ticketType',
      width: 140,
      render: (_: {}, record: TicketSoldListItemProps) => (
        <span title={record.ticketType.name}>{record.ticketType.name}</span>
      ),
    },
    {
      title: 'Paid Price',
      dataIndex: 'total',
      key: 'total',
      render: (paidPrice: number) => (
        <span>{`${thousandsSeparator(`${paidPrice}`)} ${priceUnit}`}</span>
      ),
      width: 140,
    },
    {
      title: 'Ticket Price',
      dataIndex: 'price',
      key: 'price',
      width: 140,
      render: (ticketPrice: number) => (
        <span>{`${thousandsSeparator(`${ticketPrice}`)} ${priceUnit}`}</span>
      ),
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      width: 200,
      render: (discount: number, record: TicketSoldListItemProps) => (
        <>
          {(discount && (
            <Row gutter={[0, 0]}>
              <Col>{`-${discount} ${priceUnit}`}</Col>
              {record.promoCode && (
                <Col span={24} className="item-label">
                  Promocode: {record.promoCode}
                </Col>
              )}
            </Row>
          )) ||
            '/'}
        </>
      ),
    },
    {
      title: 'Fees',
      dataIndex: 'absorbFees',
      key: 'absorbFees',
      width: 140,
      render: (_: number, record: TicketSoldListItemProps) => (
        <Col
          span={24}
          // onClick={() => {
          //   confirm({
          //     className: 'fees-detail-modal',
          //     centered: true,
          //     closable: false,
          //     maskClosable: true,
          //     content: (
          //       <Row>
          //         <Col span={24} className="fees-detail-item">
          //           <Row>
          //             <Col span={12} className="label">
          //               {t('Service Fee')}
          //             </Col>
          //             <Col span={12} className="value">{`1 ${priceUnit}`}</Col>
          //           </Row>
          //         </Col>
          //         <Col span={24} className="fees-detail-item">
          //           <Row>
          //             <Col span={12} className="label">
          //               {t('Royalty Fee')}
          //             </Col>
          //             <Col span={12} className="value">{`1 ${priceUnit}`}</Col>
          //           </Row>
          //         </Col>
          //         <Col span={24} className="fees-detail-item">
          //           <Row>
          //             <Col span={12} className="label">
          //               {t('Transaction Fee')}
          //             </Col>
          //             <Col span={12} className="value">{`1 ${priceUnit}`}</Col>
          //           </Row>
          //         </Col>
          //         <Col span={24} className="fees-detail-item item-total">
          //           <Row>
          //             <Col span={12} className="label">
          //               {t('Total')}
          //             </Col>
          //             <Col span={12} className="value">{`3 ${priceUnit}`}</Col>
          //           </Row>
          //         </Col>
          //       </Row>
          //     ),
          //   });
          // }}
        >
          {checkFees(record)}
        </Col>
      ),
    },
    {
      title: 'Seat Number',
      dataIndex: 'seat',
      key: 'seat',
      width: 160,
    },
    {
      title: 'Ticket Number',
      dataIndex: 'ticketNo',
      key: 'ticketNo',
      width: 250,
    },
    {
      title: 'Bought at',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      render: (createdAt: string) => (
        <Row gutter={[0, 0]}>
          <Col span={24}>
            {formatTimeStrByTimeString(createdAt, FormatTimeKeys.mdy)}
          </Col>
          <Col span={24} className="item-label">
            {formatTimeStrByTimeString(createdAt, FormatTimeKeys.hm)}
          </Col>
        </Row>
      ),
    },
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
      width: 200,
      render: (source: number) => (
        <span>
          {TicketSoldFilterSource.find((item) => item.id === source)?.name}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: number, record: TicketSoldListItemProps) => (
        <>
          {(record.saleStatus === TicketSoldSaleStatus && (
            <span>
              {TicketSoldFilterStatus.find((item) => item.id === null)?.name}
            </span>
          )) || (
            <span>
              {TicketSoldFilterStatus.find((item) => item.id === status)?.name}
            </span>
          )}
        </>
      ),
    },
    {
      title: '',
      dataIndex: '',
      key: 'action',
      width: 80,
      render: (_: string, record: TicketSoldListItemProps) => {
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
                onOk: async () => {
                  const response = await dispatch(
                    updateTicketStatusAction({
                      id: record.id.toString(),
                      data: {
                        status: TicketStatus.cancel,
                      },
                    }),
                  );
                  if (
                    response.type ===
                    updateTicketStatusAction.fulfilled.toString()
                  ) {
                    loadTicketSoldPageData();
                    dispatch(getTicketSoldCountAction(params.id));
                  }
                },
              });
            },
          },
        ];
        return (
          <div
            className="list-action"
            style={{
              display:
                record.status !== TicketSoldFilterStatus[0].id
                  ? 'none'
                  : 'block',
            }}
          >
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
    const downloadData = listData.map((dataItem: TicketSoldListItemProps) => ({
      ...dataItem,
      attendeeName: dataItem.user.name,
      attendeeEmail: dataItem.user.email,
      total: `${dataItem.total} ${priceUnit}`,
      price: `${dataItem.price} ${priceUnit}`,
      ticketType: dataItem.ticketType.name,
      discount: `${
        (dataItem.discount && `${dataItem.discount} ${priceUnit}`) || '/'
      }`,
      absorbFees: checkFees(dataItem).props.children,
      createdAt: `${formatTimeStrByTimeString(
        dataItem.createdAt,
        FormatTimeKeys.mdy,
      )}\n${formatTimeStrByTimeString(dataItem.createdAt, FormatTimeKeys.hm)}`,
      source: TicketSoldFilterSource.find((item) => item.id === dataItem.source)
        ?.name,
      status:
        dataItem.saleStatus === TicketSoldSaleStatus
          ? TicketSoldFilterStatus[5].name
          : TicketSoldFilterStatus.find((item) => item.id === dataItem.status)
              ?.name,
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
        message.error(t('Invalid file format. Please upload a CSV file.'));
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
                  if (fieldObj['Attendee Email'] || fieldObj['Ticket Type']) {
                    jsonResult.push(fieldObj);
                  }
                }
              });
              if (jsonResult.length) {
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
                  if (
                    !ticketSoldCount.ticketTypes.find(
                      (item) => item.name === obj['Ticket Type'],
                    )
                  ) {
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
              } else {
                errorFlag = true;
                message.error(
                  t(
                    'The CSV file is missing some required fields. Please fill in all mandatory fields for each ticket.',
                  ),
                );
              }
            }
            if (isLimit && type === UploadCSVType && !errorFlag) {
              setImportTicketFileName(file.name);
              const formatTicketItems: any = cloneDeep(jsonResult).map(
                (item: any) => ({
                  email: item['Attendee Email'],
                  ticketType: item['Ticket Type'],
                }),
              );
              setImportTicketItems(formatTicketItems);
            }
          },
        });
      }
      return isLimit && type === UploadCSVType && !errorFlag;
    },
    customRequest: () => {},
  };

  const importTicketsRequest = async () => {
    setImportProgress(0);
    if (importTicketItems.length) {
      setShowImportProgress(true);
      clearTimerFuction();
      timer = setInterval(() => {
        setImportProgress((progress: number) => {
          if (progress < 90) {
            return progress + 10;
          }
          return 90;
        });
      }, 1000);
      const response = await dispatch(
        importTicketsAction({ id: params.id, data: importTicketItems }),
      );
      if (response.type === importTicketsAction.fulfilled.toString()) {
        setImportProgress(100);
      }
    }
  };

  const resetImportTicket = () => {
    clearTimerFuction();
    setShowImportModal(false);
    setShowImportProgress(false);
    setImportTicketItems([]);
  };

  const table = (
    <div style={{ minHeight: isComponent ? 'auto' : '250px' }}>
      <TableComponent
        loading={false}
        columns={columns}
        tableData={(isComponent && listData.slice(0, 4)) || listData}
        emptyText={
          <div className="table-empty-text">
            <img src={Images.NoDataIcon} alt="" />
            <p>{t('No data')}</p>
          </div>
        }
        showCustomPagination={false}
      />
      {!isComponent && (
        <Pagination
          current={page}
          pageSize={pageSize}
          total={listTotal}
          onChange={(currentPage, currentPageSize) => {
            dispatch(setPage(currentPage));
            dispatch(setPageSize(currentPageSize));
          }}
          hideOnSinglePage
        />
      )}
    </div>
  );

  const searchInputChange = useCallback(
    debounce((e) => dispatch(setSearchKeyword(e.target.value)), 300),
    [],
  );

  useEffect(() => {
    importTicketsRequest();
  }, [importTicketItems]);

  useEffect(() => {
    if (importProgress === 100) {
      let issuedCount = '';
      setTimeout(() => {
        resetImportTicket();
        loadTicketSoldPageData();
        dispatch(getTicketSoldCountAction(params.id));
        if (importTicketItems.length > 1) {
          issuedCount = `${importTicketItems.length} tickets are`;
        } else {
          issuedCount = `${importTicketItems.length} ticket is`;
        }
        message.success(`${issuedCount} successfully issued.`);
      }, 500);
    }
  }, [importProgress]);

  useEffect(() => {
    if (error) {
      if (error.code === TokenExpireResponseCode) {
        history.push(AuthRoutes.login);
        message.error(t('User token is deprecated, please log in again.'));
        return;
      }
      clearTimerFuction();
      setShowImportProgress(false);
      message.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (!isComponent) {
      loadTicketSoldPageData();
    } else {
      dispatch(
        getTicketSoldListAction({
          id: params.id,
          data: {
            page: defaultCurrentPage,
            size: defaultPageSize,
          },
        }),
      );
    }
  }, [
    page,
    pageSize,
    searchKeyword,
    filterSource,
    filterStatus,
    filterTicketType,
    saleStatus,
  ]);

  useEffect(() => {
    dispatch(getTicketSoldCountAction(params.id));
    return () => {
      dispatch(resetState());
      clearTimerFuction();
    };
  }, []);

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
            label: ticketSoldCount.name,
            href: UserRoutes.eventDashboard
              .replace(':id', params.id)
              .replace(':name', ticketSoldCount.name),
          },
          {
            label: t('Tickets'),
          },
        ]}
      />
      <TicketsSoldContainer>
        <div className="page-main">
          <ContainerTitle>
            <Col span={12}>
              <div className="info-content">
                <div>
                  <p className="content-title">{t('Tickets')}</p>
                  <p className="content-name">{ticketSoldCount.name}</p>
                </div>
              </div>
            </Col>
            <Col span={12} className="right">
              <div className="info-content">
                <div>
                  <p className="content-info">
                    <span>Tickets Sold</span>
                    <span className="bold content-title-sold">
                      {ticketSoldCount.stocks.soldTotal}
                    </span>
                  </p>
                  <p className="content-info">
                    <span>Tickets Imported</span>
                    <span className="bold">
                      {ticketSoldCount.stocks.importTotal}
                    </span>
                  </p>
                  <p className="content-info">
                    <span>Ticket cancelled</span>
                    <span className="bold">
                      {ticketSoldCount.stocks.cancelTotal}
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
                    <Input
                      defaultValue={searchKeyword}
                      placeholder={t('Search attendee name or email')}
                      allowClear={{
                        clearIcon: <CloseOutlined />,
                      }}
                      suffix={!searchKeywordState && <SearchOutlined />}
                      onChange={(e) => {
                        setSearchKeywordState(e.target.value);
                        searchInputChange(e);
                        dispatch(setPage(1));
                      }}
                    />
                  </Col>
                  <Col lg={5} span={24}>
                    <Select
                      allowClear
                      defaultValue={filterTicketType}
                      placeholder={t('Ticket Type')}
                      defaultActiveFirstOption={false}
                      onClear={() => {
                        dispatch(setFilterTicketType(undefined));
                      }}
                      onChange={(e) => {
                        dispatch(setFilterTicketType(e));
                        dispatch(setPage(1));
                      }}
                    >
                      {ticketSoldCount.ticketTypes.map((item) => (
                        <Option key={item.id} value={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                  <Col lg={5} span={24} className="filter-status">
                    <Select
                      allowClear
                      defaultValue={filterStatus}
                      placeholder={t('Status')}
                      defaultActiveFirstOption={false}
                      onClear={() => {
                        dispatch(setFilterStatus(undefined));
                      }}
                      onChange={(e: number | string) => {
                        dispatch(setFilterStatus(e));
                        if (e === null) {
                          dispatch(setSaleStatus(TicketSoldSaleStatus));
                        } else {
                          dispatch(setSaleStatus(undefined));
                        }
                        dispatch(setPage(1));
                      }}
                    >
                      {TicketSoldFilterStatus.map((item) => (
                        <Option key={item.id} value={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                  <Col lg={5} span={24} className="filter-status">
                    <Select
                      allowClear
                      defaultValue={filterSource}
                      placeholder={t('Source')}
                      defaultActiveFirstOption={false}
                      onClear={() => {
                        dispatch(setFilterSource(undefined));
                      }}
                      onChange={(e) => {
                        dispatch(setFilterSource(e));
                        dispatch(setPage(1));
                      }}
                    >
                      {TicketSoldFilterSource.map((item) => (
                        <Option key={item.id} value={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                </Row>
              </Col>
              <Col lg={7} span={24} className="export-action">
                <CSVLink
                  filename={`${ticketSoldCount.name}_Tickets_Export.csv`}
                  headers={formatDownloadHeaders().headers}
                  data={formatDownloadHeaders().data}
                >
                  <Button className="action-button" disabled={!listData.length}>
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
            {(loading && <BallLoading />) || <>{table}</>}
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
              filename="Tickets_Import_Template.csv"
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
                    percent={importProgress}
                    showInfo={false}
                    strokeColor="#27272A"
                  />
                  <p className="file-name">Issued {importTicketFileName}</p>
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
