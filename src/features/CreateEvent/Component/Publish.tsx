import React from 'react';
import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

const Publish = () => {
  const { t } = useTranslation();

  return (
    <Row>
      <Col span={24} className="main-title">
        {t('Publish')}
      </Col>
    </Row>
  );
};

export default Publish;
