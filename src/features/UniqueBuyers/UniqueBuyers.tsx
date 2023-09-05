import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, Col, Row, Grid, Input, Select, Button, Pagination } from 'antd';
import { Column, Pie } from '@ant-design/plots';
import { CSVLink } from 'react-csv';
import moment from 'moment';
import {
  CloseOutlined,
  DownloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { debounce, isEmpty } from 'lodash';

import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import { UserRoutes } from '../../navigation/Routes';
import {
  PageContainer,
  PieContainer,
  PieTooltip,
  ProgressContent,
  SubTitle,
  Title,
} from './UniqueBuyers.component';
import {
  ContainerTitle,
  ListTableContainer,
  TableFilterContainer,
} from '../TicketsSold/TicketsSoldComponent';
import { ProgressBar, WorldMap } from './UniqueBuyers.components';
import { Colors } from '../../theme';
import TableComponent from '../../components/Table/Table';
import NoData from '../../components/NoData/NoData';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getUniqueBuyersAction,
  getUniqueBuyersChartsAction,
  reset,
  selectUniqueBuyers,
  selectUniqueBuyersChartsData,
  selectUniqueBuyersChartsLoading,
  selectUniqueBuyersLoading,
} from './UniqueBuyers.slice';
import { MMM_DD_YYYY_HH_MM } from '../../constants/constants';
import { FormatTimeKeys } from '../../constants/Keys';
import mapData from '../../data/country.json';
import BallLoading from '../../components/BallLoading/BallLoading';

const { useBreakpoint } = Grid;

const parseAgesData = (data: { name: string; count: number }[]) => {
  const lessThanEighteen = data.filter((item) => Number(item.name) < 18);
  const eighteenToTwentyFive = data.filter(
    (item) => Number(item.name) >= 18 && Number(item.name) <= 25,
  );
  const tweentySixToTthirtyFive = data.filter(
    (item) => Number(item.name) >= 26 && Number(item.name) <= 35,
  );
  const thirtySixToFifty = data.filter(
    (item) => Number(item.name) >= 36 && Number(item.name) <= 50,
  );
  const moreThanFifty = data.filter((item) => Number(item.name) > 50);
  const result = [
    !isEmpty(lessThanEighteen)
      ? {
          type: '<18',
          value: lessThanEighteen.reduce((a, b) => a + b.count, 0),
        }
      : {},
    {
      type: '18 - 25',
      value: eighteenToTwentyFive.reduce((a, b) => a + b.count, 0),
    },
    {
      type: '26 - 35',
      value: tweentySixToTthirtyFive.reduce((a, b) => a + b.count, 0),
    },
    {
      type: '36 - 50',
      value: thirtySixToFifty.reduce((a, b) => a + b.count, 0),
    },
    {
      type: '>50',
      value: moreThanFifty.reduce((a, b) => a + b.count, 0),
    },
  ];
  return result.filter((item) => !isEmpty(item));
};
const pieColors = [
  Colors.red6,
  Colors.red3,
  Colors.red4,
  Colors.branding,
  Colors.red5,
];
const UniqueBuyers = () => {
  const params: any = useParams();
  const { t } = useTranslation();
  const { lg } = useBreakpoint();
  const dispatch = useAppDispatch();
  const uniqueBuyersLoading = useAppSelector(selectUniqueBuyersLoading);
  const uniqueBuyersData = useAppSelector(selectUniqueBuyers);
  const { genders, ages, summary, countries } = useAppSelector(
    selectUniqueBuyersChartsData,
  );
  const chartsLoading = useAppSelector(selectUniqueBuyersChartsLoading);

  const [filter, setFilter] = useState<{
    keyword: string;
    isActivated?: boolean;
  }>({
    keyword: '',
  });
  const config = {
    data: genders.map((item) => ({
      type: 'Gender',
      ...item,
    })),
    xField: 'name',
    yField: 'count',
    point: {
      size: 2,
    },
    xAxis: {
      label: {
        autoRotate: !lg,
        autoHide: false,
        style: {
          fill: Colors.black4,
        },
      },
    },
    maxColumnWidth: 45,
    legend: undefined,
    height: 148,
    color: Colors.branding,
    yAxis: {
      label: {
        style: {
          fill: Colors.black4,
        },
      },
    },
    tooltip: {
      domStyles: {
        'g2-tooltip': {
          background: 'none',
          boxShadow: 0,
        },
      },
      customContent: (a: any, b: any) => (
        <PieTooltip>
          {a}: {b[0]?.value || 0}
        </PieTooltip>
      ),
    },
  };
  const pieData = parseAgesData(ages);
  const totalPieCount = pieData.reduce(
    (acc: any, item: any) => acc + item.value,
    0,
  );
  const pieConfig: any = useMemo(
    () => ({
      appendPadding: 10,
      hieght: 140,
      data: parseAgesData(ages),
      color: pieColors,
      angleField: 'value',
      colorField: 'type',
      radius: 1,
      innerRadius: 0.6,
      label: false,
      interactions: [
        {
          type: 'element-selected',
        },
        {
          type: 'element-active',
        },
      ],
      statistic: {
        title: false,
        content: false,
      },
      legend: {
        position: lg ? 'right' : 'bottom',
        padding: [0, lg ? 80 : 0, 0, 0],
        itemName: {
          formatter: (seriesField: any, item: any, index: any) =>
            `${seriesField}    ${pieData[index].value || '-'}`,
        },
      },
      height: 159,
      tooltip: {
        domStyles: {
          'g2-tooltip': {
            background: 'none',
            boxShadow: 0,
          },
        },
        customContent: (a: any, b: any) => (
          <PieTooltip>
            {a}: {(((b[0]?.value || 0) / totalPieCount) * 100).toFixed(2)}%
          </PieTooltip>
        ),
      },
    }),
    [pieData],
  );

  const columns = [
    {
      title: 'Buyer Name',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: 'Buyer Email',
      dataIndex: 'email',
      width: 220,
    },
    {
      title: 'Owned Tickets',
      dataIndex: 'ownedTickets',
      width: 120,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      render: (gender: string) => gender || '-',
    },
    {
      title: 'Birthday',
      dataIndex: 'birthday',
      render: (_: any) => (_ ? moment(_).format(FormatTimeKeys.mDy) : '-'),
    },
    {
      title: 'Last Action',
      dataIndex: 'updatedAt',
      width: 200,
      render: (_: any) => moment(_).format(MMM_DD_YYYY_HH_MM),
    },
    {
      title: 'Status',
      dataIndex: 'isActivated',
      render: (_: any) => (_ ? 'Active' : 'Inactive'),
    },
  ];

  useEffect(() => {
    dispatch(
      getUniqueBuyersAction({
        eventId: params.id,
        ...filter,
      }),
    );
  }, [filter]);
  useEffect(() => {
    dispatch(
      getUniqueBuyersChartsAction({
        eventId: params.id,
      }),
    );
    return () => {
      dispatch(reset());
    };
  }, []);

  const searchInputChange = useCallback(
    debounce(
      (e) =>
        setFilter({
          ...filter,
          keyword: e.target.value,
        }),
      300,
    ),
    [],
  );
  const countriesCount = countries.reduce((a, b) => a + b.count, 0);

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
    const data: any = uniqueBuyersData.map((item) => ({
      ...item,
      birthday: item.birthday
        ? moment(item.birthday).format(FormatTimeKeys.mDy)
        : '-',
      updatedAt: moment(item.updatedAt).format(MMM_DD_YYYY_HH_MM),
      isActivated: item.isActivated ? 'Active' : 'Inactive',
      gender: item.gender || '-',
    }));
    return { headers, data };
  };

  const matchCountires: any = useMemo(() => {
    const newList: any = [];
    const others: any = [];
    for (let index = 0; index < countries.length; index += 1) {
      const item = countries[index];
      if (
        mapData.features.find(
          (feature) => feature.properties.name === item.name,
        )
      ) {
        newList.push(item);
      } else {
        others.push(item);
      }
    }
    return others.length
      ? [
          ...newList,
          {
            name: 'Others',
            count: others.reduce((a: any, b: any) => a + b.count, 0),
          },
        ]
      : newList;
  }, [countries]);

  return chartsLoading ? (
    <BallLoading />
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
            label: t('Unique Buyers'),
          },
        ]}
      />
      <PageContainer>
        <Row gutter={[16, 0]}>
          <Col span={24}>
            <ContainerTitle>
              <Col span={12}>
                <div className="info-content">
                  <div>
                    <p className="content-title">{t('Unique Buyers')}</p>
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
                        {summary.userCount}
                      </span>
                    </p>
                    <p className="content-info">
                      <span>Conversion Rate</span>
                      <span className="bold">
                        {(summary.conversionRate * 100).toFixed(2)}%
                      </span>
                    </p>
                  </div>
                </div>
              </Col>
            </ContainerTitle>
          </Col>
          <Col span={24}>
            <Row gutter={[16, 16]}>
              <Col span={24} lg={12}>
                <Card bodyStyle={{ padding: 20 }} bordered={false}>
                  <Title>
                    <p>Users by Country</p>
                  </Title>
                  <SubTitle>*Data only comes from primary market</SubTitle>
                  <WorldMap
                    data={countries.map((item) => ({
                      name: item.name,
                      value: item.count,
                    }))}
                  />
                  <ProgressContent style={{ marginTop: 12 }}>
                    <Row gutter={[0, 18]}>
                      {matchCountires.length ? (
                        matchCountires.map((item: any) => (
                          <Col span={24} key={item.name}>
                            <ProgressBar
                              name={item.name}
                              percent={(
                                (item.count / countriesCount) *
                                100
                              ).toFixed(2)}
                              count={item.count}
                            />
                          </Col>
                        ))
                      ) : (
                        <Col span={24}>
                          <ProgressBar name="-" percent={0} count="-" empty />
                        </Col>
                      )}
                    </Row>
                  </ProgressContent>
                </Card>
              </Col>
              <Col span={24} lg={12}>
                <Row gutter={[0, 16]}>
                  <Col span={24}>
                    <Card
                      bodyStyle={{ padding: 20 }}
                      bordered={false}
                      loading={chartsLoading}
                    >
                      <Title>
                        <p>Users by Gender</p>
                      </Title>
                      <SubTitle>
                        *Data only comes from already activated accounts
                      </SubTitle>
                      <Column {...config} />
                    </Card>
                  </Col>
                  <Col span={24}>
                    <Card bodyStyle={{ padding: 20 }} bordered={false}>
                      <Title>
                        <p>Users by Age</p>
                      </Title>
                      <SubTitle>
                        *Data only comes from already activated accounts
                      </SubTitle>
                      <PieContainer style={{ width: lg ? '100%' : '100%' }}>
                        <Pie {...pieConfig} />
                      </PieContainer>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={24} style={{ marginTop: 16 }}>
            <ListTableContainer>
              <TableFilterContainer justify="space-between">
                <Col lg={17} span={24}>
                  <Row className="filter-items" gutter={[16, 16]}>
                    <Col lg={9} span={24}>
                      <Input
                        placeholder={t('Search name or email')}
                        suffix={<SearchOutlined />}
                        allowClear={{
                          clearIcon: <CloseOutlined />,
                        }}
                        onChange={searchInputChange}
                      />
                    </Col>
                    <Col lg={5} span={24}>
                      <Select
                        allowClear
                        placeholder={t('Status')}
                        defaultActiveFirstOption={false}
                        options={[
                          {
                            label: 'Active',
                            value: true,
                          },
                          {
                            label: 'Inactive',
                            value: false,
                          },
                        ]}
                        onChange={(e) => {
                          if (!e && e !== false) {
                            setFilter({
                              keyword: filter.keyword,
                            });
                          } else {
                            setFilter({
                              ...filter,
                              isActivated: e,
                            });
                          }
                        }}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col className="export-action single">
                  <CSVLink
                    filename={`${params.name}_Unique_Buyers_Export.csv`}
                    headers={formatDownloadHeaders().headers}
                    data={formatDownloadHeaders().data}
                  >
                    <Button
                      className="action-button"
                      style={{ marginRight: 0 }}
                      disabled={isEmpty(uniqueBuyersData)}
                    >
                      <DownloadOutlined />
                      {t('Export')}
                    </Button>
                  </CSVLink>
                </Col>
              </TableFilterContainer>
              <TableComponent
                loading={uniqueBuyersLoading}
                columns={columns}
                tableData={uniqueBuyersData}
                emptyText={<NoData />}
                showCustomPagination={false}
              />
              <Pagination
                current={1}
                pageSize={20}
                total={0}
                hideOnSinglePage
              />
            </ListTableContainer>
          </Col>
        </Row>
      </PageContainer>
    </>
  );
};
export default UniqueBuyers;
