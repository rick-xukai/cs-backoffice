import React from 'react';
import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

const CreateTicket = () => {
  const { t } = useTranslation();

  return (
    <Row>
      <Col span={24} className="main-title">
        {t('Create Ticket')}
      </Col>
    </Row>
  );
};

export default CreateTicket;
