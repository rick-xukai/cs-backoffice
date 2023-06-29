import React from 'react';
import { useTranslation } from 'react-i18next';

import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import { UserAndPermissionsContainer } from './UserAndPermissionsComponent';

const UserAndPermissions = () => {
  const { t } = useTranslation();

  return (
    <UserAndPermissionsContainer>
      <PageHeaderComponent title={t('Settings')} />
    </UserAndPermissionsContainer>
  );
};

export default UserAndPermissions;
