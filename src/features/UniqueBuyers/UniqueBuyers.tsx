import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, Col, Row, Grid, Input, Select, Button, Pagination } from 'antd';
import { Column, Pie } from '@ant-design/plots';
import { CSVLink } from 'react-csv';

import {
  CloseOutlined,
  DownloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
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

const { useBreakpoint } = Grid;

const UniqueBuyers = () => {
  const params: any = useParams();
  const { t } = useTranslation();
  const { lg } = useBreakpoint();
  const config = {
    data: [
      { type: 'Gender', name: 'Male', value: 1390.5 },
      { type: 'Gender', name: 'Female', value: 1469.5 },
      { type: 'Gender', name: 'Non-binary', value: 1521.7 },
      { type: 'Gender', name: 'Transgender', value: 1615.9 },
      { type: 'Gender', name: 'Prefer not to say', value: 1703.7 },
      { type: 'Gender', name: 'Others', value: 1767.8 },
    ],
    xField: 'name',
    yField: 'value',
    color: ['#056790', '#FCA119', '#FC0006'],
    point: {
      size: 2,
    },
  };
  const pieData = [
    {
      type: '18 - 25',
      value: 108,
    },
    {
      type: '26 - 35',
      value: 42,
    },
    {
      type: '36 - 50',
      value: 6,
    },
    {
      type: '50+',
      value: 6,
    },
  ];
  const pieConfig: any = {
    appendPadding: 10,
    hieght: 140,
    data: pieData,
    color: [Colors.red3, Colors.red4, Colors.branding, Colors.red5],
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
    // toolTip: {
    //   customContent: (title: string, item: any[]) => {
    //     console.log(item);
    //     return <PieTooltip>{item[0].value}</PieTooltip>;
    //   },
    // },
  };

  const columns = [
    {
      title: 'User Name',
      dataIndex: 'user_name',
    },
    {
      title: 'User Email',
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
      title: 'Birthday',
      dataIndex: 'birthday',
    },
    {
      title: 'Last Action',
      dataIndex: 'lastAction',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ];
  const totalPieCount = pieData.reduce(
    (acc: any, item: any) => acc + item.value,
    0,
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
                        1
                      </span>
                    </p>
                    <p className="content-info">
                      <span>Conversion Rate</span>
                      <span className="bold">2%</span>
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
                    data={[
                      { name: 'China', value: 1 },
                      { name: 'Singapore', value: 10000 },
                    ]}
                  />
                  <ProgressContent style={{ marginTop: 12 }}>
                    <Row gutter={[0, 18]}>
                      <Col span={24}>
                        <ProgressBar
                          name="Singapore"
                          percent={90}
                          count={100}
                        />
                      </Col>
                      <Col span={24}>
                        <ProgressBar name="China" percent={90} count={100} />
                      </Col>
                      <Col span={24}>
                        <ProgressBar name="USA" percent={90} count={100} />
                      </Col>
                    </Row>
                  </ProgressContent>
                </Card>
              </Col>
              <Col span={24} lg={12}>
                <Row gutter={[0, 16]}>
                  <Col span={24}>
                    <Card bodyStyle={{ padding: 20 }} bordered={false}>
                      <Title>
                        <p>Users by Gender</p>
                      </Title>
                      <SubTitle>
                        *Data only comes from already activated accounts
                      </SubTitle>
                      <Column
                        {...config}
                        legend={false}
                        height={148}
                        color={Colors.branding}
                        xAxis={{
                          label: {
                            autoRotate: !lg,
                            autoHide: false,
                            style: {
                              fill: Colors.black4,
                            },
                          },
                        }}
                      />
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
                        <Pie
                          {...pieConfig}
                          height={159}
                          tooltip={{
                            domStyles: {
                              'g2-tooltip': {
                                background: 'none',
                                boxShadow: 0,
                              },
                            },
                            customContent: (a: any, b: any) => (
                              <PieTooltip>
                                {(
                                  ((b[0]?.value || 0) / totalPieCount) *
                                  100
                                ).toFixed(2)}
                                %
                              </PieTooltip>
                            ),
                          }}
                        />
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
                      />
                    </Col>
                    <Col lg={5} span={24}>
                      <Select
                        allowClear
                        placeholder={t('Status')}
                        defaultActiveFirstOption={false}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col className="export-action single">
                  <CSVLink
                    filename={`${params.name}_Unique_Buyers_Export.csv`}
                    headers={[]}
                    data={[]}
                  >
                    <Button
                      className="action-button"
                      style={{ marginRight: 0 }}
                    >
                      <DownloadOutlined />
                      {t('Export')}
                    </Button>
                  </CSVLink>
                </Col>
              </TableFilterContainer>
              <TableComponent
                loading={false}
                columns={columns}
                tableData={[
                  {
                    user_name: 'John Doe',
                    email: 'johndoe@me.com',
                    tickets: 1,
                    gender: 'Male',
                    birthday: 'Jul 12, 2000',
                    lastAction: 'Jul 12, 2023 21:30',
                    status: 'Active',
                    id: 1,
                  },
                  {
                    user_name: 'John Doe',
                    email: 'johndoe@me.com',
                    tickets: 2,
                    gender: 'Female',
                    birthday: 'Jul 12, 2000',
                    lastAction: 'Jul 12, 2023 21:30',
                    status: 'Inactive',
                    id: 1,
                  },
                ]}
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
