import React from 'react';
import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

const Settings = () => {
  const { t } = useTranslation();

  return (
    <Row>
      <Col span={24} className="main-title">
        {t('Settings')}
      </Col>
    </Row>
  );
};

export default Settings;
