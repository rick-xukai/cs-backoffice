import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Input,
  Upload,
  message,
  Button,
  Spin,
  Modal,
  Image,
} from 'antd';
import type { UploadProps } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useCookie } from '../../hooks';
import { isImageLink } from '../../utils/validator';
import { CookieKeys, UserRoleKeys } from '../../constants/Keys';
import { AuthRoutes } from '../../navigation/Routes';
import Messages from '../../constants/Message';
import { Images } from '../../theme';
import { WebSiteDomain } from '../../constants/General';
import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import UploadFileComponent from '../../components/UploadFile/UploadFileComponent';
import { ProfileContainer } from './ProfileComponent';
import {
  reset,
  getProfileInfoAction,
  selectLoading,
  selectData,
  selectError,
  updateProfileInfoAction,
  UpdateProfilePayload,
  uploadProfileFileAction,
} from './Profile.slice';

const { TextArea } = Input;
const { Dragger } = Upload;

const Profile = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const cookies = useCookie([CookieKeys.authUserRole]);
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectLoading);
  const data = useAppSelector(selectData);
  const error = useAppSelector(selectError);

  const [logoFile, setLogoFile] = useState<string>('');
  const [bannerFile, setBannerFile] = useState<string>('');
  const [showPreviewBanner, setShowPreviewBanner] = useState<boolean>(false);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState<boolean>(true);
  const [profileValue, setProfileValue] = useState<UpdateProfilePayload>({
    description: '',
    banner: '',
    logo: '',
    marketingSite: '',
  });

  const customRequest = async (e: any, type?: string) => {
    const formData = new FormData();
    formData.append('file', e.file);
    const response: any = await dispatch(uploadProfileFileAction(formData));
    if (response.type === uploadProfileFileAction.fulfilled.toString()) {
      if (type === 'banner') {
        setBannerFile(response.payload.url);
        setProfileValue({ ...profileValue, banner: response.payload.url });
      } else {
        setLogoFile(response.payload.url);
        setProfileValue({ ...profileValue, logo: response.payload.url });
      }
      e.onSuccess();
      message.success(t('Upload successful.'));
    } else {
      e.onError();
      message.error(t('Upload failed, please try again.'));
    }
  };

  const handleFileRemove = () => {
    setProfileValue({ ...profileValue, logo: '' });
  };

  const bannerUploadProps: UploadProps = {
    accept: 'image/png, image/jpeg',
    name: 'banner',
    multiple: false,
    fileList: [],
    customRequest: (e) => customRequest(e, 'banner'),
  };

  const logoUploadProps = {
    accept: 'image/png, image/jpeg, image/gif',
    previewImageUrl: '',
    previewType: 'image',
    limitFileSize: 10,
    handleChange: () => {},
    customRequest,
    handleFileRemove,
    showPreviewIcon: false,
    description: {
      type: t('PNG, JPEG or GIF files only'),
      size: t('up to [size] MB in size', { size: '10' }),
    },
  };

  const hanldeUpdateProfile = async () => {
    const response = await dispatch(updateProfileInfoAction(profileValue));
    if (response.type === updateProfileInfoAction.fulfilled.toString()) {
      message.success(t('Organizer profile has been updated.'));
    }
  };

  useEffect(() => {
    if (
      profileValue.banner !== data.banner ||
      profileValue.description !== data.description ||
      profileValue.logo !== data.logo ||
      profileValue.marketingSite !== data.marketingSite
    ) {
      setSaveButtonDisabled(false);
    }
  }, [profileValue]);

  useEffect(() => {
    if (data) {
      setProfileValue({
        banner: data.banner,
        description: data.description,
        logo: data.logo,
        marketingSite: data.marketingSite,
      });
      setBannerFile(data.banner);
    }
  }, [data]);

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
    const userRole = cookies.getCookie(CookieKeys.authUserRole);
    if (
      (userRole && userRole === UserRoleKeys.organizerAdmin) ||
      userRole === UserRoleKeys.organizerUser
    ) {
      dispatch(getProfileInfoAction());
    }
    return () => {
      dispatch(reset());
    };
  }, []);

  return (
    <>
      <PageHeaderComponent title={t('Settings')} />
      <ProfileContainer>
        {(loading && (
          <Spin
            spinning={loading}
            indicator={<LoadingOutlined spin />}
            size="large"
          />
        )) || (
          <>
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
                      {(logoFile && (
                        <UploadFileComponent
                          {...logoUploadProps}
                          customUploadButton={
                            <>
                              <img
                                src={logoFile}
                                alt=""
                                className="logo-preview"
                              />
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
                        />
                      )) || (
                        <UploadFileComponent
                          {...logoUploadProps}
                          customUploadButton={
                            <>
                              {(!data.logo && (
                                <img src={Images.CompanyIcon} alt="" />
                              )) || (
                                <>
                                  {(isImageLink(data.logo) && (
                                    <div className="org-logo">
                                      <img src={data.logo} alt="" />
                                    </div>
                                  )) || (
                                    <div className="logo-text">
                                      {data.logo.charAt(0)}
                                    </div>
                                  )}
                                </>
                              )}
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
                        />
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} className="item-title">
                      {t('Organizer Name')}
                    </Col>
                    <Col span={24} className="item-value">
                      <Input disabled defaultValue={data.name} />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} className="item-title">
                      {t('Organizer Description')}
                    </Col>
                    <Col span={24} className="item-value">
                      <TextArea
                        rows={4}
                        showCount
                        maxLength={2000}
                        onChange={(e) =>
                          setProfileValue({
                            ...profileValue,
                            description: e.target.value,
                          })
                        }
                        value={profileValue.description}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} className="item-title">
                      {t('Banner Image')}
                    </Col>
                    <Col span={24} className="item-value">
                      <div>
                        <Dragger
                          {...bannerUploadProps}
                          className="dragger-banner"
                        >
                          {(bannerFile && (
                            <Col
                              className="banner-preview"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <img src={bannerFile} alt="" />
                              <div className="banner-action-icon">
                                <Image
                                  src={Images.PreviewEye}
                                  alt=""
                                  preview={false}
                                  onClick={() => setShowPreviewBanner(true)}
                                />
                                <Image
                                  src={Images.DeleteIcon}
                                  alt=""
                                  preview={false}
                                  onClick={() => setBannerFile('')}
                                />
                              </div>
                            </Col>
                          )) || (
                            <>
                              <p className="ant-upload-drag-icon">
                                <PlusOutlined />
                              </p>
                              <p className="ant-upload-text">
                                {t('Drag or click to upload image')}
                              </p>
                            </>
                          )}
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
                      <Input
                        className="website-input"
                        value={profileValue.marketingSite || WebSiteDomain}
                        onChange={(e) =>
                          setProfileValue({
                            ...profileValue,
                            marketingSite:
                              (profileValue.marketingSite && e.target.value) ||
                              `${WebSiteDomain}${e.target.value}`,
                          })
                        }
                      />
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
                  <Button
                    disabled={saveButtonDisabled}
                    onClick={hanldeUpdateProfile}
                  >
                    {t('Save')}
                  </Button>
                </Col>
              </Row>
            </div>
          </>
        )}
        <Modal
          open={showPreviewBanner}
          title={t('Banner Image')}
          footer={null}
          onCancel={() => setShowPreviewBanner(false)}
        >
          <img alt="" className="preview-img" src={bannerFile} />
        </Modal>
      </ProfileContainer>
    </>
  );
};

export default Profile;
