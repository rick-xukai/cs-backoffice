import React, { useEffect, useState, useRef, useMemo } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useTranslation } from 'react-i18next';
import { useParams, useHistory, Prompt } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import {
  Row,
  Col,
  Button,
  Input,
  Select,
  Radio,
  DatePicker,
  Space,
  message,
  Modal,
  Upload,
} from 'antd';
import { ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons';
import moment from 'moment';

import { useCookie } from '../../hooks';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { isEmail } from '../../utils/validator';
import {
  SendingTime,
  MaxEditorLength,
  SizeWhiteList,
  EmailStatus,
  UploadFileAcceptType,
  EmailTemplateDearUser,
  TokenExpireResponseCode,
} from '../../constants/General';
import { FormatTimeKeys, CookieKeys } from '../../constants/Keys';
import { UserRoutes, AuthRoutes } from '../../navigation/Routes';
import PageHeader from '../../components/PageHeader';
import BallLoading from '../../components/BallLoading';
import {
  isUrl,
  fileToBase64,
  formatTimeStrByTimeString,
} from '../../utils/func';
import { CreateEditEmailContainer } from './CreateEditEmailComponent';
import {
  createEmailAction,
  selectError,
  selectLoading,
  CreateEmailPayload,
  selectEventReminderList,
  getReminderListAction,
  reset,
  getEmailDetailAction,
  EmailDetailProps,
  updateEmailDetailAction,
  uploadProfileFileAction,
  selectUploadFileLoading,
  checkAnyFieldChanged,
  selectAnyFieldChanged,
  selectEmailDetail,
} from './CreateEditEmail.slice';
import EmailTemplateContent, {
  EmailTemplate,
} from './Component/EmailTemplateContent';
import TemplateSocialMedia from './Component/TemplateSocialMedia';

const { Option } = Select;
const { confirm } = Modal;
const Size = Quill.import('attributors/style/size');
Size.whitelist = SizeWhiteList;

Quill.register(Size, true);
Quill.register(Quill.import('attributors/style/direction'), true);
Quill.register(Quill.import('attributors/style/align'), true);

const CreateEditEmail = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const params: { id: string } = useParams();
  const { id } = params;
  const isEdit = !!id;
  const dispatch = useAppDispatch();
  const quillRef = useRef<any>(null);
  const uploadFileRef = useRef<any>(null);
  const cookie = useCookie([
    CookieKeys.authUser,
    CookieKeys.authUserName,
    CookieKeys.userNotActiveToken,
  ]);

  const loading = useAppSelector(selectLoading);
  const uploadFileLoading = useAppSelector(selectUploadFileLoading);
  const error = useAppSelector(selectError);
  const eventReminderList = useAppSelector(selectEventReminderList);
  const anyFieldChanged = useAppSelector(selectAnyFieldChanged);
  const emailDetail = useAppSelector(selectEmailDetail);

  const [editorHtmlValue, setEditorHtmlValue] = useState<string>('');
  const [sendingTimeRadioValue, setSendingTimeRadioValue] = useState<string>(
    SendingTime.limited,
  );
  const [editorText, setEditorText] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [facebookLinkError, setFacebookLinkError] = useState<boolean>(false);
  const [instagramLinkError, setInstagramLinkError] = useState<boolean>(false);
  const [websiteLinkError, setWebsiteLinkError] = useState<boolean>(false);
  const [disabledAllField, setDisabledAllField] = useState<boolean>(false);
  const [uploadFileLocalState, setUploadFileLocalState] = useState<string>('');
  const [uploadFileLink, setUploadFileLocalLink] = useState<string>('');
  const [whichPathUrlWillTo, setWhichPathUrlWillTo] = useState<string>('');
  const [formFieldValue, setFormFieldValue] = useState<CreateEmailPayload>({
    eventId: 0,
    subject: '',
    html: '',
    organiserEmail: '',
    facebookLink: '',
    instagramLink: '',
    websiteLink: '',
    sendTime: '',
    socialMediaHtml: '',
  });

  const fieldChanged = (name: string, value: any, htmlSource?: string) => {
    if (name === 'organiserEmail') {
      if (isEmail(value)) {
        setEmailError(false);
      } else {
        setEmailError(!!value);
      }
      setFormFieldValue({
        ...formFieldValue,
        organiserEmail: value,
      });
    } else if (name === 'facebookLink') {
      if (isUrl(value)) {
        setFacebookLinkError(false);
      } else {
        setFacebookLinkError(!!value);
      }
      setFormFieldValue({
        ...formFieldValue,
        facebookLink: value,
      });
    } else if (name === 'instagramLink') {
      if (isUrl(value)) {
        setInstagramLinkError(false);
      } else {
        setInstagramLinkError(!!value);
      }
      setFormFieldValue({
        ...formFieldValue,
        instagramLink: value,
      });
    } else if (name === 'websiteLink') {
      if (isUrl(value)) {
        setWebsiteLinkError(false);
      } else {
        setWebsiteLinkError(!!value);
      }
      setFormFieldValue({
        ...formFieldValue,
        websiteLink: value,
      });
    } else {
      setFormFieldValue({
        ...formFieldValue,
        [name]: value,
      });
    }
    if (!htmlSource || htmlSource === 'user') {
      dispatch(checkAnyFieldChanged(true));
    }
  };

  const imageHandler = (url: string) => {
    if (quillRef && quillRef.current) {
      const quill = quillRef.current.getEditor();
      const cursorPosition = quill.getSelection().index;
      const range = quill.getSelection();
      quill.insertEmbed(range.index, 'image', url);
      quill.setSelection(cursorPosition + 1);
      const content = quill.root.innerHTML;
      fieldChanged(
        'html',
        content.replaceAll(
          '<img',
          '<img style="max-width: 100%; max-height: 100%;"',
        ),
        'user',
      );
    }
  };

  const customRequest = async (e: any) => {
    const base64String: any = await fileToBase64(e.file);
    const formData = new FormData();
    formData.append('file', e.file);
    setUploadFileLocalState(base64String);
    const response: any = await dispatch(uploadProfileFileAction(formData));
    if (response.type === uploadProfileFileAction.fulfilled.toString()) {
      imageHandler(response.payload.url);
      setUploadFileLocalLink(response.payload.url);
      e.onSuccess();
    } else {
      e.onError();
      message.error(t('Upload failed, please try again.'));
    }
  };

  const uploadProps = {
    accept: UploadFileAcceptType.toString(),
    handleChange: () => {},
    customRequest,
    handleFileRemove: () => {},
    showPreviewIcon: false,
  };

  const quillModules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'],
          [{ color: [] }],
          [{ align: [] }],
          [{ size: SizeWhiteList }],
          ['link', 'image'],
          ['clean'],
        ],
        handlers: {
          image: () => {
            if (uploadFileRef && uploadFileRef.current) {
              uploadFileRef.current.click();
            }
          },
        },
      },
    }),
    [],
  );

  const handleEditorChange = async (
    content: string,
    _: any,
    source: string,
    editor: any,
  ) => {
    if (editor.getLength() <= MaxEditorLength) {
      setEditorHtmlValue(content);
      if (content === '<p><br></p>') {
        fieldChanged('html', '');
      } else if (source === 'user') {
        fieldChanged(
          'html',
          content
            .replaceAll(
              '<img',
              '<img style="max-width: 100%; max-height: 100%;"',
            )
            .replace(uploadFileLink, uploadFileLocalState),
          source,
        );
      }
      setEditorText(editor.getText());
    }
  };

  const createEditEmail = async () => {
    const templateContentHtmlString = ReactDOMServer.renderToStaticMarkup(
      <EmailTemplate htmlValue={formFieldValue.html} />,
    );
    const templateSocialMediaHtmlString = ReactDOMServer.renderToStaticMarkup(
      <TemplateSocialMedia
        userName={
          (!isEdit &&
            eventReminderList.find((item) => item.id === formFieldValue.eventId)
              ?.organizerName) ||
          emailDetail.event.organizer.name
        }
        formFieldValue={formFieldValue}
      />,
    );
    const htmlString = `${EmailTemplateDearUser}${templateContentHtmlString}${templateSocialMediaHtmlString}`;
    if (isEdit) {
      const response = await dispatch(
        updateEmailDetailAction({
          data: {
            ...formFieldValue,
            html: htmlString.replace(uploadFileLocalState, uploadFileLink),
          },
          id,
        }),
      );
      if (response.type === updateEmailDetailAction.fulfilled.toString()) {
        dispatch(checkAnyFieldChanged(false));
        setWhichPathUrlWillTo('');
        message.success('Email updated successfully');
        history.push(UserRoutes.emails);
      }
    } else {
      const response = await dispatch(
        createEmailAction({
          ...formFieldValue,
          html: htmlString.replace(uploadFileLocalState, uploadFileLink),
        }),
      );
      if (response.type === createEmailAction.fulfilled.toString()) {
        dispatch(checkAnyFieldChanged(false));
        setWhichPathUrlWillTo('');
        message.success('Email created successfully');
        history.push(UserRoutes.emails);
      }
    }
  };

  const showCreateEditReminders = () => {
    const { sendTime } = formFieldValue;
    confirm({
      centered: true,
      closable: false,
      okText: t('Ok'),
      cancelText: t('Cancel'),
      title: (sendTime && t('Right on schedule')) || t('Send now'),
      icon: <ExclamationCircleOutlined />,
      content:
        (sendTime &&
          t(`You're sending your notification on [time].`, {
            time: formatTimeStrByTimeString(sendTime, FormatTimeKeys.norm),
          })) ||
        t(`You're about to send your notification now.`),
      onOk: createEditEmail,
    });
  };

  const requestEmailDetail = async () => {
    const response: any = await dispatch(getEmailDetailAction(id));
    if (response.type === getEmailDetailAction.fulfilled.toString()) {
      const { payload }: { payload: EmailDetailProps } = response;
      if (payload) {
        const htmlSource = payload.html.replace(EmailTemplateDearUser, '');
        const splitStart = htmlSource.indexOf('<div class="social-media-item"');
        const templateContentHtmlString = htmlSource.substring(0, splitStart);
        const templateSocialMediaHtmlString = htmlSource.substring(
          splitStart,
          payload.html.length,
        );
        setFormFieldValue({
          eventId: payload.event.id,
          subject: payload.subject,
          html: templateContentHtmlString,
          socialMediaHtml: templateSocialMediaHtmlString,
          organiserEmail: payload.organiserEmail,
          facebookLink: payload.facebookLink,
          instagramLink: payload.instagramLink,
          websiteLink: payload.websiteLink,
          sendTime: payload.sendTime,
        });
        if (payload.sendTime) {
          setSendingTimeRadioValue(SendingTime.limited);
        } else {
          setSendingTimeRadioValue(SendingTime.send);
        }
        if (payload.status === EmailStatus.sent) {
          setDisabledAllField(true);
        }
        setEditorHtmlValue(templateContentHtmlString);
      }
    }
  };

  const handleRouterHoldUp = (location: any) => {
    const pathUrl = `${location.pathname}${location.search}`;
    if (anyFieldChanged && location.pathname !== AuthRoutes.login) {
      setWhichPathUrlWillTo(pathUrl);
      confirm({
        centered: true,
        closable: false,
        okText: t('Stay'),
        cancelText: t('Leave'),
        title: t('Unsaved Content'),
        icon: <ExclamationCircleOutlined />,
        content: t(`Leaving this page will result in losing your content.`),
        onCancel: () => {
          dispatch(checkAnyFieldChanged(false));
        },
      });
    }
    return false;
  };

  const checkInputWords = () => {
    let length = 0;
    if (editorText.length - 1 < 0) {
      length = 0;
    } else if (editorText.length === MaxEditorLength) {
      length = MaxEditorLength;
    } else {
      length = editorText.length - 1;
    }
    return length;
  };

  useEffect(() => {
    if (error) {
      if (error.code === TokenExpireResponseCode) {
        cookie.removeCookie(CookieKeys.authUser, { path: '/' });
        cookie.removeCookie(CookieKeys.authUserName, { path: '/' });
        cookie.removeCookie(CookieKeys.userNotActiveToken, { path: '/' });
        history.push(AuthRoutes.login);
        message.error(t('User token is deprecated, please log in again.'));
        return;
      }
      message.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (isEdit) {
      requestEmailDetail();
    }
  }, [isEdit]);

  useEffect(() => {
    if (!anyFieldChanged && whichPathUrlWillTo) {
      history.push(whichPathUrlWillTo);
    }
    const handleBeforeUnload = (event: any) => {
      if (anyFieldChanged) {
        const warningText = t(
          `Leaving this page will result in losing your content.`,
        );
        // eslint-disable-next-line
        event.returnValue = warningText;
        return warningText;
      }
      return '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [anyFieldChanged]);

  useEffect(() => {
    dispatch(getReminderListAction());
    return () => {
      dispatch(reset());
    };
  }, []);

  return (
    <>
      <Prompt when={anyFieldChanged} message={handleRouterHoldUp} />
      <CreateEditEmailContainer>
        <PageHeader
          breadcrumb={[
            {
              label: t('Emails'),
              href: UserRoutes.emails,
            },
            {
              label: (!isEdit && t('Create Email')) || t('Edit Email'),
            },
          ]}
        />
        <div className="page-main">
          {uploadFileLoading && (
            <div className="upload-img-loading">
              <BallLoading />
            </div>
          )}
          {(loading && <BallLoading />) || (
            <Row gutter={[16, 16]}>
              <Col lg={12} span={24} className="email-form">
                <div className="content">
                  <Row>
                    <Col span={24} className="main-title">
                      <div className="basic-info">{t('Basic Info')}</div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} className="basic-info-item">
                      <Row>
                        <Col span={24} className="item-title requied">
                          {t('Select Event')}
                        </Col>
                        <Col span={24} className="item-value">
                          <Select
                            disabled={disabledAllField || isEdit}
                            value={
                              (isEdit && emailDetail.event.name) ||
                              (formFieldValue.eventId === 0
                                ? null
                                : formFieldValue.eventId)
                            }
                            defaultActiveFirstOption={false}
                            onChange={(e) => fieldChanged('eventId', e)}
                          >
                            {eventReminderList.map((item) => (
                              <Option key={item.id} value={item.id}>
                                {item.name}
                              </Option>
                            ))}
                          </Select>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24} className="item-title requied">
                          {t('Email Subject')}
                        </Col>
                        <Col span={24} className="item-value">
                          <Input
                            disabled={disabledAllField}
                            showCount
                            maxLength={100}
                            value={formFieldValue.subject}
                            onChange={(e) =>
                              fieldChanged('subject', e.target.value)
                            }
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24} className="item-title requied">
                          {t('Email Content')}
                        </Col>
                        <Col span={24} className="item-value">
                          <ReactQuill
                            ref={quillRef}
                            readOnly={disabledAllField}
                            theme="snow"
                            value={editorHtmlValue}
                            onChange={handleEditorChange}
                            modules={quillModules}
                          />
                          <div className="show-editor-length">
                            {`${checkInputWords()}/${MaxEditorLength}`}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24} className="item-title requied">
                          {t('Select sending time')}
                        </Col>
                        <Col span={24} className="item-value">
                          <Radio.Group
                            disabled={disabledAllField}
                            onChange={(e) => {
                              setSendingTimeRadioValue(e.target.value);
                              if (e.target.value === SendingTime.send) {
                                fieldChanged('sendTime', '');
                              }
                            }}
                            value={sendingTimeRadioValue}
                          >
                            <Space direction="vertical">
                              <Radio value={SendingTime.send}>
                                {SendingTime.send}
                              </Radio>
                              <Radio value={SendingTime.limited}>
                                {SendingTime.limited}
                              </Radio>
                            </Space>
                          </Radio.Group>
                          {sendingTimeRadioValue === SendingTime.limited && (
                            <div className="date-time-picker">
                              <DatePicker
                                disabledDate={(current: any) =>
                                  current && current < moment().startOf('day')
                                }
                                disabled={disabledAllField}
                                showTime
                                format={FormatTimeKeys.norm1}
                                value={
                                  formFieldValue.sendTime
                                    ? moment(formFieldValue.sendTime)
                                    : null
                                }
                                onChange={(date) =>
                                  fieldChanged(
                                    'sendTime',
                                    date !== null ? moment(date).format() : '',
                                  )
                                }
                              />
                            </div>
                          )}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} className="main-title">
                      <div className="basic-info">{t('Footer')}</div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} className="basic-info-item">
                      <Row>
                        <Col span={24} className="item-title">
                          {t('Event Organiser Name')}
                        </Col>
                        <Col span={24} className="item-value">
                          <Input
                            disabled
                            value={
                              (!isEdit &&
                                eventReminderList.find(
                                  (item) => item.id === formFieldValue.eventId,
                                )?.organizerName) ||
                              emailDetail.event.organizer.name
                            }
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24} className="item-title">
                          {t('Event Organiser Contact Email')}
                        </Col>
                        <Col span={24} className="item-value">
                          <Input
                            disabled={disabledAllField}
                            value={formFieldValue.organiserEmail}
                            onChange={(e) =>
                              fieldChanged('organiserEmail', e.target.value)
                            }
                          />
                          {emailError && (
                            <span className="error-message">
                              Please enter a valid email address
                            </span>
                          )}
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24} className="item-title">
                          {t('Hyperlinks for Facebook')}
                        </Col>
                        <Col span={24} className="item-value">
                          <Input
                            disabled={disabledAllField}
                            value={formFieldValue.facebookLink}
                            onChange={(e) =>
                              fieldChanged('facebookLink', e.target.value)
                            }
                          />
                          {facebookLinkError && (
                            <span className="error-message">
                              Please enter a valid link
                            </span>
                          )}
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24} className="item-title">
                          {t('Hyperlinks for Instagram')}
                        </Col>
                        <Col span={24} className="item-value">
                          <Input
                            disabled={disabledAllField}
                            value={formFieldValue.instagramLink}
                            onChange={(e) =>
                              fieldChanged('instagramLink', e.target.value)
                            }
                          />
                          {instagramLinkError && (
                            <span className="error-message">
                              Please enter a valid link
                            </span>
                          )}
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24} className="item-title">
                          {t('Hyperlink for Website')}
                        </Col>
                        <Col span={24} className="item-value">
                          <Input
                            disabled={disabledAllField}
                            value={formFieldValue.websiteLink}
                            onChange={(e) =>
                              fieldChanged('websiteLink', e.target.value)
                            }
                          />
                          {websiteLinkError && (
                            <span className="error-message">
                              Please enter a valid link
                            </span>
                          )}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col lg={12} span={24} className="email-review">
                <div className="content">
                  <div className="content-container">
                    <Row className="review-subject">
                      <Col span={24} className="subject-content">
                        <span className="label">Subject:</span>
                        <span className="value">{formFieldValue.subject}</span>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="dear-user-name">{`Dear {User Name},`}</Col>
                    </Row>
                    <EmailTemplateContent formFieldValue={formFieldValue} />
                    <TemplateSocialMedia
                      userName={
                        (!isEdit &&
                          eventReminderList.find(
                            (item) => item.id === formFieldValue.eventId,
                          )?.organizerName) ||
                        emailDetail.event.organizer.name
                      }
                      formFieldValue={formFieldValue}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </div>
        <div className="page-bottom">
          <Row>
            <Col span={24} className="item-title save-button">
              <Button onClick={() => history.push(UserRoutes.emails)}>
                {t('Cancel')}
              </Button>
              {!disabledAllField && (
                <Button
                  type="primary"
                  disabled={
                    loading ||
                    !formFieldValue.eventId ||
                    !formFieldValue.subject ||
                    !formFieldValue.html ||
                    emailError ||
                    facebookLinkError ||
                    instagramLinkError ||
                    websiteLinkError ||
                    (sendingTimeRadioValue === SendingTime.limited &&
                      !formFieldValue.sendTime)
                  }
                  onClick={showCreateEditReminders}
                >
                  {(isEdit && t('Save')) || t('Create')}
                </Button>
              )}
            </Col>
          </Row>
        </div>
        <div style={{ display: 'none' }}>
          <Upload {...uploadProps}>
            <Button ref={uploadFileRef} icon={<UploadOutlined />}>
              Click to Upload
            </Button>
          </Upload>
        </div>
      </CreateEditEmailContainer>
    </>
  );
};

export default CreateEditEmail;
