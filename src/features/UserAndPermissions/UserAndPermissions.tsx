import React, { useEffect } from 'react';
import { Row, Col, Tooltip, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Messages from '../../constants/Message';
import { AuthRoutes } from '../../navigation/Routes';
import { UserRole, UserActiveStatus } from '../../constants/General';
import TableComponent from '../../components/Table/Table';
import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import { UserAndPermissionsContainer } from './UserAndPermissionsComponent';
import {
  getUserPermissionsListAction,
  selectLoading,
  selectData,
  selectError,
  reset,
} from './UserAndPermissions.slice';

const UserAndPermissions = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectLoading);
  const data = useAppSelector(selectData);
  const error = useAppSelector(selectError);

  const columns = [
    {
      title: 'User Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <p className="email">{text || '-'}</p>,
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
      render: (status: number) => {
        const text = UserRole.find((item) => item.key === status)?.text;
        return <p className="email">{text || '-'}</p>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => {
        const text = UserActiveStatus.find((item) => item.key === status)?.text;
        return <p className="email">{text || '-'}</p>;
      },
    },
  ];

  useEffect(() => {
    if (error) {
      if (error.code === Messages.userDeprecated.code) {
        history.push(AuthRoutes.login);
        message.error(t('User token is deprecated, please log in again.'));
        return;
      }
      message.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    dispatch(getUserPermissionsListAction());
    return () => {
      dispatch(reset());
    };
  }, []);

  return (
    <>
      <PageHeaderComponent title={t('Settings')} />
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
                loading={loading}
                currentPage={1}
                currentPageSize={20}
                columns={columns}
                tableData={data}
                tableDataTotal={data.length}
                showCustomPagination={false}
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
