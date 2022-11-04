import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Row, Col, PageHeader, Space } from 'antd';
import { Helmet } from 'react-helmet';

import { UserRoutes } from '../../../navigation/Routes';
import UploadBasic from './Upload.Basic';
import UploadFileList from './Upload.FileList';
import UploadDirectory from './Upload.Directory';
import UploadLimit from './Upload.Limit';
import UploadWatermark from './Upload.Watermark';
import UploadProgress from './Upload.Progress';
import UploadMaxCount from './Upload.MaxCount';
import UploadMultiple from './Upload.Multiple';
import UploadAvatar from './Upload.Avatar';
import UploadDragger from './Upload.Dragger';

const FormsUpload = () => {
  const { t } = useTranslation();
  const routes = [
    {
      path: UserRoutes.forms.layouts,
      breadcrumbName: t('Forms'),
    },
    {
      path: '',
      breadcrumbName: t('Form File Upload'),
    },
  ];
  return (
    <>
      <Helmet>
        <title>{`${t('Form File Upload')} | CrowdServe BO`}</title>
      </Helmet>
      <Row justify="start">
        <Col span={24}>
          <PageHeader title={t('Form File Upload')} breadcrumb={{ routes }} />
        </Col>
      </Row>
      <div className="page-container">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Row gutter={[24, 24]}>
            <Col span={24} md={12}>
              <Card>
                <UploadBasic />
              </Card>
            </Col>
            <Col span={24} md={12}>
              <Card>
                <UploadDirectory />
              </Card>
            </Col>
            <Col span={24} md={12}>
              <Card>
                <UploadLimit />
              </Card>
            </Col>
            <Col span={24} md={12}>
              <Card>
                <UploadProgress />
              </Card>
            </Col>
            <Col span={24} md={12}>
              <Card>
                <UploadMaxCount />
              </Card>
            </Col>
            <Col span={24} md={12}>
              <Card>
                <UploadMultiple />
              </Card>
            </Col>
            <Col span={24} md={12}>
              <Card>
                <UploadAvatar />
              </Card>
            </Col>
            <Col span={24} md={12}>
              <Card>
                <UploadFileList />
              </Card>
            </Col>
            <Col span={24} md={12}>
              <Card>
                <UploadDragger />
              </Card>
            </Col>
            <Col span={24} md={12}>
              <Card>
                <UploadWatermark />
              </Card>
            </Col>
          </Row>
        </Space>
      </div>
    </>
  );
};

export default FormsUpload;
