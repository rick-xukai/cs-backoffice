import React from 'react';
import { Row, Col, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';

import TableComponent from '../../components/Table/Table';
import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import { UserAndPermissionsContainer } from './UserAndPermissionsComponent';

const UserAndPermissions = () => {
  const { t } = useTranslation();

  const columns = [
    {
      title: 'User Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Tooltip title={text}>
          <p className="email">{text || '-'}</p>
        </Tooltip>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text: string) => (
        <Tooltip title={text}>
          <p className="email">{text || '-'}</p>
        </Tooltip>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (text: string) => (
        <Tooltip title={text}>
          <p className="email">{text || '-'}</p>
        </Tooltip>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => (
        <Tooltip title={text}>
          <p className="email">{text || '-'}</p>
        </Tooltip>
      ),
    },
  ];

  const data = [
    {
      id: 1,
      name: 'Christine',
      email: 'christine@crowdserve.xyz',
      role: 'Admin',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Jennifer',
      email: 'jennifer@crowdserve.xyz',
      role: 'Admin',
      status: 'Pending activation',
    },
  ];

  return (
    <>
      <PageHeaderComponent title={t('Settings').toLocaleUpperCase()} />
      <UserAndPermissionsContainer>
        <div className="page-main">
          <Row>
            <Col span={24} className="main-title">
              {t('User and permissions')}
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <TableComponent
                loading={false}
                currentPage={1}
                currentPageSize={20}
                columns={columns}
                tableData={data}
                tableDataTotal={data.length}
                paginationChange={() => {}}
              />
            </Col>
          </Row>
        </div>
      </UserAndPermissionsContainer>
    </>
  );
};

export default UserAndPermissions;
