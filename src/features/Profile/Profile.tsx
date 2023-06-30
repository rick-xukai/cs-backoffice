import React, { useState } from 'react';
import { Row, Col, Input, Upload, message, Button } from 'antd';
import type { UploadProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { Images } from '../../theme';
import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import UploadFileComponent from '../../components/UploadFile/UploadFileComponent';
import { ProfileContainer } from './ProfileComponent';

const { TextArea } = Input;
const { Dragger } = Upload;

const Profile = () => {
  const { t } = useTranslation();

  const [fileList, setFileList] = useState<any>([]);

  const handleUploadChange = (info: any) => {
    setFileList(info.fileList);
  };

  const customRequest = async () => {};

  const handleFileRemove = () => {};

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop() {},
  };

  return (
    <>
      <PageHeaderComponent title={t('Settings').toLocaleUpperCase()} />
      <ProfileContainer>
        <div className="page-main">
          <Row>
            <Col span={24} className="main-title">
              {t('Profile')}
            </Col>
          </Row>
          <Row>
            <Col lg={14} span={24} className="profile-info-item">
              <Row>
                <Col span={24} className="item-title">
                  {t('Organizer Logo')}
                </Col>
                <Col span={24} className="item-value">
                  <UploadFileComponent
                    accept="image/png, image/jpeg, image/gif"
                    fileList={fileList}
                    previewImageUrl=""
                    previewType="image"
                    limitFileSize={15}
                    handleChange={handleUploadChange}
                    customRequest={customRequest}
                    handleFileRemove={handleFileRemove}
                    customUploadButton={
                      <>
                        <img src={Images.CompanyIcon} alt="" />
                        <div className="custom-upload-button">
                          <div className="upload-button-bg">
                            <div className="upload-button-content">
                              <PlusOutlined />
                              <div>Upload</div>
                            </div>
                          </div>
                        </div>
                      </>
                    }
                    description={{
                      type: t('PNG, JPEG or GIF files only'),
                      size: t('up to [size] MB in size', { size: '10' }),
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24} className="item-title">
                  {t('Organizer Name')}
                </Col>
                <Col span={24} className="item-value">
                  <Input disabled value="NFTASIA" />
                </Col>
              </Row>
              <Row>
                <Col span={24} className="item-title">
                  {t('Organizer Description')}
                </Col>
                <Col span={24} className="item-value">
                  <TextArea rows={4} showCount maxLength={2000} />
                </Col>
              </Row>
              <Row>
                <Col span={24} className="item-title">
                  {t('Banner Image')}
                </Col>
                <Col span={24} className="item-value">
                  <div>
                    <Dragger {...props}>
                      <p className="ant-upload-drag-icon">
                        <PlusOutlined />
                      </p>
                      <p className="ant-upload-text">
                        {t('Drag or click to upload image')}
                      </p>
                    </Dragger>
                  </div>
                  <p className="dragger-tips">
                    {t('Recommended image size 1440  x 260px')}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={24} className="item-title">
                  {t('Marketing Site')}
                </Col>
                <Col span={24} className="item-value">
                  <Input className="website-input" addonBefore="https://" />
                </Col>
              </Row>
            </Col>
            <Col lg={10} span={24} className="profile-tips">
              <div className="tips-content">
                <Row>
                  <Col span={24} className="tips-content-title">
                    {t('Profile Tips Title')}
                  </Col>
                  <Col span={24} className="tips-content-value">
                    {t('Profile Tips Value')}
                  </Col>
                  <Col span={24} className="tips-content-image">
                    <img src={Images.ProfileTipsBg} alt="" />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
        <div className="page-bottom">
          <Row>
            <Col span={24} className="item-title save-button">
              <Button>{t('Save')}</Button>
            </Col>
          </Row>
        </div>
      </ProfileContainer>
    </>
  );
};

export default Profile;
