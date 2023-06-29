import React from 'react';
import { useTranslation } from 'react-i18next';

import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import { ProfileContainer } from './ProfileComponent';

const Profile = () => {
  const { t } = useTranslation();

  return (
    <ProfileContainer>
      <PageHeaderComponent title={t('Settings')} />
    </ProfileContainer>
  );
};

export default Profile;
