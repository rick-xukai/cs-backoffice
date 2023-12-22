import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Input, Select, message, Button, Modal, Form } from 'antd';
import type { UploadProps } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { cloneDeep, pickBy } from 'lodash';
import { useParams, useHistory } from 'react-router-dom';

import { Images } from '../../theme';
import { formatTimeStrByTimeString } from '../../utils/func';
import { isEmail, isImageLink, emailValidator } from '../../utils/validator';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import useTokenExpire from '../../hooks/useTokenExpire';
import {
  UploadFileAcceptType,
  WebSiteDomain,
  TokenExpireResponseCode,
  EmailExist,
} from '../../constants/General';
import {
  FilterOrganisersStatus,
  UserTypeStatus,
  FormatTimeKeys,
} from '../../constants/Keys';
import { UserRoutes } from '../../navigation/Routes';
import PageHeader from '../../components/PageHeader';
import UploadFileComponent from '../../components/UploadFile';
import DraggerUpload from '../../components/DraggerUpload';
import BallLoading from '../../components/BallLoading';
import { OrganiserStatusBadge } from '../Organisers/OrganisersComponent';
import {
  CreateOrganisersContainer,
  UsersListItem,
} from './CreateOrganisersComponent';
import {
  reset,
  selectLoading,
  selectError,
  UserAndPermissionsProps,
  uploadProfileFileAction,
  defaultCreateUserData,
  getOrganizerDetailAction,
  selectOrganiserDetail,
  CreateOrganiserPayload,
  createOrganizerAction,
  checkAdminUserExistAction,
  selectSaveButtonLoading,
  updateOrganizerAction,
  OrganiserStatusKeys,
} from './CreateOrganisers.slice';

const { Option } = Select;
const { TextArea } = Input;

enum IsActivatedKeys {
  active = 'Active',
  inactive = 'Inactive',
}

const CreateOrganisers = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { tokenExpireFunction } = useTokenExpire();
  const params: { organiserId: string } = useParams();
  const { organiserId } = params;
  const isEdit = !!organiserId;

  const loading = useAppSelector(selectLoading);
  const saveButtonLoading = useAppSelector(selectSaveButtonLoading);
  const error = useAppSelector(selectError);
  const organiserDetail = useAppSelector(selectOrganiserDetail);

  const [logoFile, setLogoFile] = useState<string>('');
  const [bannerFile, setBannerFile] = useState<string>('');
  const [inputContactEmailError, setInputContactEmailError] =
    useState<boolean>(false);
  const [showPreviewBanner, setShowPreviewBanner] = useState<boolean>(false);
  const [showUserAddEditModal, setShowUserAddEditModal] =
    useState<boolean>(false);
  const [notAllUsersDelete, setNotAllUsersDelete] = useState<
    UserAndPermissionsProps[]
  >([]);
  const [emailExist, setEmailExist] = useState<boolean>(false);
  const [formFieldChanged, setFormFieldChanged] = useState<boolean>(!isEdit);
  const [isEditUserItemIndex, setIsEditUserItemIndex] = useState<number | null>(
    null,
  );
  const [createUserPermissionsField, setCreateUserPermissionsField] =
    useState<UserAndPermissionsProps>(defaultCreateUserData);
  const [createOrganiserPayload, setCreateOrganiserPayload] =
    useState<CreateOrganiserPayload>({
      name: '',
      description: '',
      banner: '',
      logo: '',
      contactEmail: '',
      marketingSite: '',
      status: OrganiserStatusKeys.active,
      users: [],
    });

  const fieldChanged = (name: string, value: any) => {
    if (name === 'users') {
      const renderUsers = cloneDeep(createOrganiserPayload.users);
      if (isEditUserItemIndex !== null) {
        renderUsers.splice(isEditUserItemIndex, 1, value);
      } else {
        renderUsers.push(value);
      }
      setCreateOrganiserPayload({
        ...createOrganiserPayload,
        users: renderUsers,
      });
      setShowUserAddEditModal(false);
    } else {
      setCreateOrganiserPayload({
        ...createOrganiserPayload,
        [name]: value,
      });
    }
    setFormFieldChanged(true);
  };

  const inputEmailFieldChange = (value: string) => {
    if (value) {
      if (isEmail(value)) {
        setInputContactEmailError(false);
      } else {
        setInputContactEmailError(true);
      }
    } else {
      setInputContactEmailError(false);
    }
    fieldChanged('contactEmail', value);
  };

  const customRequest = async (e: any, type?: string) => {
    const formData = new FormData();
    formData.append('file', e.file);
    const response: any = await dispatch(uploadProfileFileAction(formData));
    if (response.type === uploadProfileFileAction.fulfilled.toString()) {
      if (type === 'banner') {
        setBannerFile(response.payload.url);
        fieldChanged('banner', response.payload.url);
      } else {
        setLogoFile(response.payload.url);
        fieldChanged('logo', response.payload.url);
      }
      e.onSuccess();
      message.success(t('Upload successful.'));
    } else {
      e.onError();
      message.error(t('Upload failed, please try again.'));
    }
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

  const bannerUploadProps: UploadProps = {
    name: 'banner',
    accept: UploadFileAcceptType.toString(),
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

  const getBadge = (status: boolean) => {
    const background =
      (status && FilterOrganisersStatus[0].background) ||
      FilterOrganisersStatus[1].background;
    const color =
      (status && FilterOrganisersStatus[0].color) ||
      FilterOrganisersStatus[1].color;

    return (
      <OrganiserStatusBadge color={color} background={background}>
        {(status && 'Active') || 'Inactive'}
      </OrganiserStatusBadge>
    );
  };

  const removeUser = (index: number, id: string | null) => {
    const usersFormat = cloneDeep(createOrganiserPayload.users);
    usersFormat.splice(index, 1);
    setCreateOrganiserPayload({
      ...createOrganiserPayload,
      users:
        (!id && usersFormat) ||
        createOrganiserPayload.users.map((item) => ({
          ...item,
          delete:
            (item.id === id && true) ||
            (item.delete !== undefined && item.delete) ||
            false,
        })),
    });
    setFormFieldChanged(true);
  };

  const hanldeCreateEditOrganiser = async () => {
    const adminItem = createOrganiserPayload.users.filter(
      (item) => item.role === UserTypeStatus[0].key && item.delete !== true,
    );
    const allUsersEmail = createOrganiserPayload.users.map(
      (item) => item.email,
    );
    const payload: any = pickBy(
      createOrganiserPayload,
      (_, key) => key !== 'createdAt' && key !== 'uuid',
    );
    if (!adminItem.length) {
      message.error('At least 1 admin user is required.');
      return;
    }
    if (new Set(allUsersEmail).size !== allUsersEmail.length) {
      message.error(t('User email duplication'));
      return;
    }
    if (isEdit) {
      const response = await dispatch(
        updateOrganizerAction({
          id: organiserId,
          data: payload,
        }),
      );
      if (response.type === updateOrganizerAction.fulfilled.toString()) {
        message.success(t('Organiser updated successfully'));
        setFormFieldChanged(false);
        dispatch(getOrganizerDetailAction({ id: organiserId }));
      }
    } else {
      const response = await dispatch(createOrganizerAction(payload));
      if (response.type === createOrganizerAction.fulfilled.toString()) {
        message.success(t('New organiser created.'));
        history.push(UserRoutes.organisers);
      }
    }
  };

  const handleAddEditUser = async (values: UserAndPermissionsProps) => {
    let checkUserPayload: any = { email: values.email };
    if (createUserPermissionsField.id) {
      checkUserPayload = {
        ...checkUserPayload,
        excludeId: createUserPermissionsField.id,
      };
    }
    const response: any = await dispatch(
      checkAdminUserExistAction(checkUserPayload),
    );
    if (response.type === checkAdminUserExistAction.fulfilled.toString()) {
      let userItemValues = values;
      if (createUserPermissionsField.id) {
        userItemValues = {
          ...userItemValues,
          id: createUserPermissionsField.id,
          createdAt: createUserPermissionsField.createdAt,
        };
      }
      fieldChanged('users', userItemValues);
    } else {
      const { code } = response.payload;
      if (code === EmailExist) {
        setEmailExist(true);
      }
    }
  };

  const draggerUploadDeleteAction = () => {
    setBannerFile('');
    fieldChanged('banner', '');
  };

  useEffect(() => {
    const { users } = createOrganiserPayload;
    const notAllRemove = users.filter((item) => !item.delete);
    setNotAllUsersDelete(notAllRemove);
  }, [createOrganiserPayload]);

  useEffect(() => {
    if (!showUserAddEditModal) {
      setCreateUserPermissionsField(defaultCreateUserData);
      setEmailExist(false);
      setIsEditUserItemIndex(null);
    }
  }, [showUserAddEditModal]);

  useEffect(() => {
    if (isEdit) {
      dispatch(getOrganizerDetailAction({ id: organiserId }));
    }
  }, [organiserId]);

  useEffect(() => {
    setCreateOrganiserPayload(organiserDetail);
    setBannerFile(organiserDetail.banner);
  }, [organiserDetail]);

  useEffect(() => {
    if (error) {
      if (error.code === TokenExpireResponseCode) {
        tokenExpireFunction();
      }
      if (error.code !== EmailExist) {
        message.error(error.message);
      }
    }
  }, [error]);

  // eslint-disable-next-line
  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

  const userPermissions = createOrganiserPayload.users;

  return (
    <CreateOrganisersContainer>
      <PageHeader
        breadcrumb={[
          {
            label: t('Organisers'),
            href: UserRoutes.organisers,
          },
          {
            label: (isEdit && t('Edit Organiser')) || t('Create Organiser'),
          },
        ]}
      />
      {(!loading && (
        <>
          <div className="page-main">
            <Row gutter={[16, 16]}>
              <Col lg={12} span={24} className="profile-form">
                <div className="content">
                  <Row>
                    <Col span={24} className="main-title">
                      <div className="profile">{t('Profile')}</div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} className="profile-info-item">
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
                                  {(!createOrganiserPayload.logo && (
                                    <img src={Images.CompanyIcon} alt="" />
                                  )) || (
                                    <>
                                      {(isImageLink(
                                        createOrganiserPayload.logo,
                                      ) && (
                                        <div className="org-logo">
                                          <img
                                            src={createOrganiserPayload.logo}
                                            alt=""
                                          />
                                        </div>
                                      )) || (
                                        <div className="logo-text">
                                          {createOrganiserPayload.logo.charAt(
                                            0,
                                          )}
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
                        <Col span={24} className="item-title requied">
                          {t('Organizer Name')}
                        </Col>
                        <Col span={24} className="item-value">
                          <Input
                            showCount
                            maxLength={100}
                            value={createOrganiserPayload.name}
                            onChange={(e) =>
                              fieldChanged('name', e.target.value)
                            }
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24} className="item-title requied">
                          {t('Status')}
                        </Col>
                        <Col span={24} className="item-value">
                          <Select
                            defaultValue={
                              FilterOrganisersStatus.find(
                                (item) => item.key === organiserDetail.status,
                              )?.text
                            }
                            defaultActiveFirstOption={false}
                            onChange={(e) =>
                              fieldChanged(
                                'status',
                                FilterOrganisersStatus.find(
                                  (item) => item.text === e,
                                )?.key,
                              )
                            }
                          >
                            {FilterOrganisersStatus.map((item) => (
                              <Option key={item.text} value={item.text}>
                                {item.text}
                              </Option>
                            ))}
                          </Select>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24} className="item-title">
                          {t('Contact Email')}
                        </Col>
                        {inputContactEmailError && (
                          <Col className="input-email-error">
                            {t('Please enter a valid email address.')}
                          </Col>
                        )}
                        <Col span={24} className="item-value">
                          <Input
                            value={createOrganiserPayload.contactEmail}
                            onChange={(e) =>
                              inputEmailFieldChange(e.target.value)
                            }
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24} className="item-title">
                          {t('Organizer Description')}
                        </Col>
                        <Col span={24} className="item-value">
                          <TextArea
                            value={createOrganiserPayload.description}
                            rows={4}
                            showCount
                            maxLength={500}
                            onChange={(e) =>
                              fieldChanged('description', e.target.value)
                            }
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24} className="item-title">
                          {t('Banner Image')}
                        </Col>
                        <Col span={24} className="item-value">
                          <DraggerUpload
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
                            value={
                              createOrganiserPayload.marketingSite ||
                              WebSiteDomain
                            }
                            onChange={(e) =>
                              fieldChanged('marketingSite', e.target.value)
                            }
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col lg={12} span={24} className="users-permissions">
                <div className="content">
                  <Row>
                    <Col span={24} className="main-title">
                      <Row className="title-action">
                        <Col sm={16} span={24}>
                          {t('Users and Permissions')}
                        </Col>
                        {(userPermissions.length && (
                          <Col sm={8} span={24} className="button-content">
                            <span>
                              <Button
                                type="primary"
                                onClick={() => setShowUserAddEditModal(true)}
                              >
                                <PlusOutlined />
                                {t('Add New User')}
                              </Button>
                            </span>
                          </Col>
                        )) ||
                          null}
                      </Row>
                    </Col>
                  </Row>
                  {(userPermissions.length && notAllUsersDelete.length && (
                    <div className="users-list-content">
                      {userPermissions.map(
                        (item: UserAndPermissionsProps, index: number) => {
                          if (!item.delete) {
                            return (
                              <UsersListItem key={item.id || index}>
                                <Row className="item">
                                  <Col span={18}>
                                    <span className="user-name">
                                      {item.name}
                                    </span>
                                    <span className="user-type">
                                      <img
                                        src={
                                          UserTypeStatus.find(
                                            (type) => type.key === item.role,
                                          )?.icon
                                        }
                                        alt=""
                                      />
                                      {
                                        UserTypeStatus.find(
                                          (type) => type.key === item.role,
                                        )?.text
                                      }
                                    </span>
                                  </Col>
                                  <Col span={6}>
                                    <div className="user-item-action">
                                      <div
                                        className="icon-content"
                                        onClick={() => {
                                          setIsEditUserItemIndex(index);
                                          setCreateUserPermissionsField(item);
                                          setShowUserAddEditModal(true);
                                        }}
                                      >
                                        <img src={Images.Editor} alt="" />
                                      </div>
                                      <div
                                        className="icon-content"
                                        onClick={() =>
                                          removeUser(index, item.id)
                                        }
                                      >
                                        <img
                                          src={Images.DeleteOutlinedIcon}
                                          alt=""
                                        />
                                      </div>
                                    </div>
                                  </Col>
                                </Row>
                                <Row className="item">
                                  <Col span={24}>
                                    <span className="item-icon">
                                      <img
                                        src={Images.MailOutlinedIcon}
                                        alt=""
                                      />
                                    </span>
                                    <span className="item-value">
                                      {item.email}
                                    </span>
                                  </Col>
                                </Row>
                                <Row className="item">
                                  <Col span={12}>
                                    <span className="item-icon time">
                                      <img src={Images.TimeIcon} alt="" />
                                    </span>
                                    <span className="item-value">
                                      {(item.createdAt &&
                                        formatTimeStrByTimeString(
                                          item.createdAt,
                                          FormatTimeKeys.mdy,
                                        )) ||
                                        '-'}
                                    </span>
                                  </Col>
                                  <Col span={12} className="status">
                                    {getBadge(item.isActivated)}
                                  </Col>
                                </Row>
                              </UsersListItem>
                            );
                          }
                          return null;
                        },
                      )}
                    </div>
                  )) || (
                    <div className="users-list-content-empty">
                      <div className="empty-content">
                        <div>
                          <img src={Images.AddNewUserIcon} alt="" />
                        </div>
                        <div className="title">{t('Add New User')}</div>
                        <div className="info">
                          {t(`Ensure there's at least 1 admin user.`)}
                        </div>
                        <div className="add-button">
                          <Button
                            type="primary"
                            onClick={() => setShowUserAddEditModal(true)}
                          >
                            <PlusOutlined />
                            {t('Add New User')}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </div>
          <div className="page-bottom">
            <Row>
              <Col span={24} className="item-title save-button">
                <Button onClick={() => history.push(UserRoutes.organisers)}>
                  {t('Cancel')}
                </Button>
                <Button
                  type="primary"
                  onClick={hanldeCreateEditOrganiser}
                  disabled={
                    !formFieldChanged ||
                    !createOrganiserPayload.name ||
                    !createOrganiserPayload.users.length ||
                    inputContactEmailError
                  }
                >
                  {(isEdit && t('Save')) || t('Create')}
                </Button>
              </Col>
            </Row>
          </div>
        </>
      )) || <BallLoading />}
      <Modal
        open={showPreviewBanner}
        title={t('Banner Image')}
        footer={null}
        onCancel={() => setShowPreviewBanner(false)}
      >
        <img alt="" className="preview-img" src={bannerFile} />
      </Modal>
      <Modal
        open={showUserAddEditModal}
        title={t('Organiser User')}
        closable={false}
        centered
        footer={null}
        getContainer={false}
        destroyOnClose
      >
        <div className="organiser-user-form-content">
          <Form
            onFinish={handleAddEditUser}
            initialValues={{
              ...createUserPermissionsField,
              role:
                UserTypeStatus.find(
                  (item) => item.key === createUserPermissionsField.role,
                )?.key || null,
            }}
          >
            <Row className="form-item" gutter={[20, 20]}>
              <Col span={12}>
                <div className="item-label">User Name</div>
                <div className="item-field">
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: 'Please input user name!',
                      },
                    ]}
                  >
                    <Input showCount maxLength={150} />
                  </Form.Item>
                </div>
              </Col>
              <Col span={12}>
                <div className="item-label">User Email</div>
                <div className="item-field">
                  <Form.Item
                    name="email"
                    rules={[{ validator: emailValidator }]}
                  >
                    <Input onChange={() => setEmailExist(false)} />
                  </Form.Item>
                </div>
                {emailExist && (
                  <div className="input-email-error">
                    {t('Email already exists in CrowdServe Backoffice System')}
                  </div>
                )}
              </Col>
            </Row>
            <Row className="form-item" gutter={[20, 20]}>
              <Col span={12}>
                <div className="item-label">User Role</div>
                <div className="item-field">
                  <Form.Item
                    name="role"
                    rules={[
                      {
                        required: true,
                        message: 'Please select user role!',
                      },
                    ]}
                  >
                    <Select defaultActiveFirstOption={false}>
                      {UserTypeStatus.map((item) => (
                        <Option key={item.key} value={item.key}>
                          {item.text}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </Col>
              <Col span={12}>
                <div className="item-label">User Status</div>
                <div className="item-field">
                  <Form.Item
                    name="isActivated"
                    rules={[
                      {
                        required: true,
                        message: 'Please select user status!',
                      },
                    ]}
                  >
                    <Select
                      disabled={!createUserPermissionsField.id}
                      defaultActiveFirstOption={false}
                    >
                      {FilterOrganisersStatus.map((item) => (
                        <Option
                          key={item.key}
                          value={item.text === IsActivatedKeys.active}
                        >
                          {item.text}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row className="form-item">
              <Col span={24}>
                <div className="item-label no-requied">Notes</div>
                <div className="item-field">
                  <Form.Item name="notes">
                    <TextArea
                      className="notes"
                      rows={6}
                      showCount
                      maxLength={500}
                    />
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <div className="form-footer-button">
              <Form.Item>
                <Button onClick={() => setShowUserAddEditModal(false)}>
                  {t('Cancel')}
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={saveButtonLoading}
                >
                  {saveButtonLoading && <LoadingOutlined />}
                  {t('Save')}
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>
    </CreateOrganisersContainer>
  );
};

export default CreateOrganisers;
