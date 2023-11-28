import React, { useEffect, useState } from 'react';
import { Row, Col, Input, message, Button, Modal } from 'antd';
import type { UploadProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useCookie } from '../../hooks';
import { isImageLink, isEmail } from '../../utils/validator';
import { CookieKeys, UserRoleKeys } from '../../constants/Keys';
import { AuthRoutes } from '../../navigation/Routes';
import Messages from '../../constants/Message';
import { Images } from '../../theme';
import { WebSiteDomain, UploadFileAcceptType } from '../../constants/General';
import PageHeaderComponent from '../../components/PageHeader';
import UploadFileComponent from '../../components/UploadFile';
import DraggerUploadComponent from '../../components/DraggerUpload';
import BallLoading from '../../components/BallLoading';
import { ProfileContainer, TipContent } from './ProfileComponent';
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
import Tips from '../../components/Tips/Tips';
import { TOKEN_EXPIRED_MESSAGE } from '../../constants/constants';

const { TextArea } = Input;

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
  const [isEditItem, setIsEditItem] = useState<boolean>(false);
  const [showPreviewBanner, setShowPreviewBanner] = useState<boolean>(false);
  const [profileValue, setProfileValue] = useState<UpdateProfilePayload>({
    description: '',
    banner: '',
    logo: '',
    marketingSite: '',
    contactEmail: '',
  });
  const [pageTipsShow, setPageTipsShow] = useState<boolean>(true);
  const [inputContactEmailError, setInputContactEmailError] =
    useState<boolean>(false);

  const customRequest = async (e: any, type?: string) => {
    const formData = new FormData();
    formData.append('file', e.file);
    const response: any = await dispatch(uploadProfileFileAction(formData));
    if (response.type === uploadProfileFileAction.fulfilled.toString()) {
      setIsEditItem(true);
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

  const bannerUploadProps: UploadProps = {
    name: 'banner',
    multiple: false,
    fileList: [],
    customRequest: (e) => customRequest(e, 'banner'),
    beforeUpload: (file) => {
      const { type, size } = file;
      const isLimit =
        size / 1024 / 1024 < 10 && UploadFileAcceptType.includes(type);
      if (!isLimit) {
        message.error(
          t(
            'Invalid file format or size. Please upload a PNG, JPEG, or GIF image that is up to [size] MB in size.',
            { size: 10 },
          ),
        );
      }
      return isLimit;
    },
  };

  const logoUploadProps = {
    accept: UploadFileAcceptType.toString(),
    previewImageUrl: '',
    previewType: 'image',
    limitFileSize: 10,
    handleChange: () => {},
    customRequest,
    handleFileRemove: () => {},
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
      dispatch(getProfileInfoAction());
      setIsEditItem(false);
    }
  };

  const draggerUploadDeleteAction = () => {
    setIsEditItem(true);
    setBannerFile('');
    setProfileValue({
      ...profileValue,
      banner: '',
    });
  };

  const contactEmailChange = (value: string) => {
    let contactEmail = '';
    if (value) {
      if (isEmail(value)) {
        setIsEditItem(true);
        setInputContactEmailError(false);
        contactEmail = value;
      } else {
        setIsEditItem(false);
        setInputContactEmailError(true);
      }
    } else {
      setInputContactEmailError(false);
    }
    setProfileValue({
      ...profileValue,
      contactEmail,
    });
  };

  useEffect(() => {
    if (data) {
      setProfileValue({
        banner: data.banner,
        description: data.description,
        logo: data.logo,
        marketingSite: data.marketingSite,
        contactEmail: data.contactEmail,
      });
      setBannerFile(data.banner);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      if (error.code === Messages.userDeprecated.code) {
        history.push(AuthRoutes.login);
        message.error(t(TOKEN_EXPIRED_MESSAGE));
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
        {(loading && <BallLoading />) || (
          <>
            <div className="page-main">
              <Row>
                <Col span={24} className="main-title">
                  {t('Profile')}
                </Col>
              </Row>
              <Row>
                <Col
                  lg={(pageTipsShow && 14) || 21}
                  span={24}
                  className="profile-info-item"
                >
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
                      {t('Contact Email')}
                    </Col>
                    {inputContactEmailError && (
                      <Col className="contact-email-error">
                        {t('Please enter a valid email address.')}
                      </Col>
                    )}
                    <Col span={24} className="item-value">
                      <Input
                        defaultValue={data.contactEmail}
                        onChange={(e) => contactEmailChange(e.target.value)}
                      />
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
                        onChange={(e) => {
                          setIsEditItem(true);
                          setProfileValue({
                            ...profileValue,
                            description: e.target.value,
                          });
                        }}
                        value={profileValue.description}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} className="item-title">
                      {t('Banner Image')}
                    </Col>
                    <Col span={24} className="item-value">
                      <DraggerUploadComponent
                        draggerUploadProps={bannerUploadProps}
                        draggerUploadFile={bannerFile}
                        previewAction={() => setShowPreviewBanner(true)}
                        deleteAction={draggerUploadDeleteAction}
                      />
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
                        onChange={(e) => {
                          setIsEditItem(true);
                          setProfileValue({
                            ...profileValue,
                            marketingSite:
                              (profileValue.marketingSite && e.target.value) ||
                              `${WebSiteDomain}${e.target.value}`,
                          });
                        }}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col span={(pageTipsShow && 10) || 3}>
                  <Tips
                    title={t('Profile Tips Title')}
                    content={
                      <TipContent>
                        <p>{t('Built an identity')}:</p>
                        <p>
                          {t(
                            'Organizers with a captivating logo and an eye-catching banner generally have stronger credibility with attendees.',
                          )}
                        </p>
                        <p>
                          {t(
                            'Use this to build a strong identity to help attendees understand you better and ultimately increase your ticket sales!',
                          )}
                        </p>
                      </TipContent>
                    }
                    image={Images.ProfileTipsBg}
                    onSizeChange={setPageTipsShow}
                  />
                </Col>
              </Row>
            </div>
            <div className="page-bottom">
              <Row>
                <Col span={24} className="item-title save-button">
                  <Button disabled={!isEditItem} onClick={hanldeUpdateProfile}>
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
