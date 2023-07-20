import React, { useEffect, useState } from 'react';
import { useHistory, Prompt } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Form, message, Modal, Spin } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import {
  ExclamationCircleOutlined,
  CloseOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  defaultCurrentPage,
  defaultOrganizerPageSize,
  SetRefundKey,
} from '../../constants/General';
import { useCookie } from '../../hooks';
import { Images } from '../../theme';
import { CookieKeys, UserRoleKeys } from '../../constants/Keys';
import { validatUnfinishedSteps } from '../../utils/func';
import { UserRoutes } from '../../navigation/Routes';
import ProgressBarComponent from '../../components/ProgressBar';
import PageHeaderComponent from '../../components/PageHeader';
import { CreateEventContainer } from './CreateEventComponent';
import EventInfo from './Component/EventInfo';
import CreateTicket from './Component/CreateTicket';
import Settings, {
  CreatePromoStatus,
  CreatePromoType,
} from './Component/Settings';
import Publish from './Component/Publish';
import {
  reset,
  selectOrganizerData,
  getOrganizerAction,
  selectLoading,
  CreateEventFormValueProps,
} from './CreateEvent.slice';
import { CreateTicketStatus } from './Component/CreateTicketComponents';

const { confirm } = Modal;

export enum ComponentSteps {
  eventInfo = 0,
  createTicket = 1,
  settings = 2,
  publish = 3,
}

export const StatusImage = ({ src }: { src: string }) => (
  <div>
    <img src={src} alt="" className="status-img" />
  </div>
);

const CreateEvent = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const cookies = useCookie([CookieKeys.authUserRole]);

  const loading = useAppSelector(selectLoading);
  const organizerData = useAppSelector(selectOrganizerData);

  const [steps, setSteps] = useState<number>(ComponentSteps.eventInfo);
  const [previousStep, setPreviousStep] = useState<number>(
    ComponentSteps.eventInfo,
  );
  const [blockRouter, setBlockRouter] = useState<boolean>(true);
  const [showNotSaveConfirmModal, setShowNotSaveConfirmModal] =
    useState<boolean>(false);
  const [showMissingFieldsModal, setShowMissingFieldsModal] =
    useState<boolean>(false);
  const [formValueSaved, setFormValueSaved] = useState<boolean>(true);
  const [whichPathUrlWillTo, setWhichPathUrlWillTo] = useState<string>('');
  const [clickConfirmModalCloseIcon, setClickConfirmModalCloseIcon] =
    useState<boolean>(false);
  const [createEventFormValue, setCreateEventFormValue] =
    useState<CreateEventFormValueProps>({
      name: '',
      location: '',
      locationCoord: '',
      organizerId: '',
      address: '',
      startTime: '',
      endTime: '',
      image: '',
      descriptionShort: '',
      description: '',
      descriptionImages: [],
      images: [],
      ticketList: [],
      refundAndCancellation: SetRefundKey.nonRefund,
      promoList: [],
    });

  const [progressItems, setProgressItems] = useState([
    {
      title: 'Create Event',
      icon: <StatusImage src={Images.EditingIcon} />,
    },
    {
      title: 'Create Ticket',
      icon: <StatusImage src={Images.NotStartedIcon} />,
    },
    {
      title: 'Settings',
      icon: <StatusImage src={Images.NotStartedIcon} />,
    },
    {
      title: 'Publish',
      icon: <StatusImage src={Images.NotStartedIcon} />,
    },
  ]);
  const [createTicketStatus, setCreateTicketStatus] = useState(
    CreateTicketStatus.list,
  );

  const [createPromoStatus, setCreatePromoStatus] = useState(
    CreatePromoStatus.list,
  );

  const [createPromoType, setCreatePromoType] = useState(
    CreatePromoType.bundle,
  );

  const onFinish = () => {
    setFormValueSaved(true);
  };

  const saveAsDraft = (type?: string) => {
    if (!createEventFormValue.name) {
      message.error(
        t('Please enter a name for your event before saving as a draft.'),
      );
    } else {
      message.success(t('Draft Saved Successfully!'));
      if (type && type === 'blockRouter') {
        setBlockRouter(false);
      }
    }
  };

  const handleFieldChange = (value: any, field?: string) => {
    setFormValueSaved(false);
    if (field === 'eventTime') {
      setCreateEventFormValue({
        ...createEventFormValue,
        startTime: value[0],
        endTime: value[1],
      });
    } else if (field === 'locationLatLng') {
      setCreateEventFormValue({
        ...createEventFormValue,
        locationCoord: `${value.lat},${value.lng}`,
        location: value.location,
      });
    } else if (field) {
      setCreateEventFormValue({
        ...createEventFormValue,
        [field]: value,
      });
    } else {
      setCreateEventFormValue({
        ...createEventFormValue,
        ...value,
      });
    }
  };

  const notSaveConfirm = (
    onOk?: any,
    onCancel?: any,
    okText?: string,
    cancelText?: string,
    title?: string,
    content?: string,
  ) => {
    confirm({
      className: 'notSaveConfirmModal',
      open: showNotSaveConfirmModal,
      centered: true,
      closable: false,
      okText: okText || t('Save as Draft'),
      cancelText: cancelText || t('Leave'),
      title: title || (
        <div className="notSaveModalTitle">
          {title || t('Unsaved Content')}
          <CloseOutlined onClick={() => setClickConfirmModalCloseIcon(true)} />
        </div>
      ),
      icon: <ExclamationCircleOutlined />,
      content:
        content || t('Leaving this page will result in losing your content.'),
      onOk() {
        if (onOk) {
          onOk();
        } else {
          saveAsDraft('blockRouter');
        }
        setShowNotSaveConfirmModal(false);
      },
      onCancel() {
        if (onCancel) {
          onCancel();
        } else {
          setBlockRouter(false);
        }
        setShowNotSaveConfirmModal(false);
      },
    });
  };

  const notSaveAlert = (e: any) => {
    e.preventDefault();
    e.returnValue = '';
  };

  const handleRouterHoldUp = (location: any) => {
    const pathUrl = `${location.pathname}${location.search}`;
    setWhichPathUrlWillTo(pathUrl);
    if (!formValueSaved) {
      setShowNotSaveConfirmModal(true);
    } else {
      setBlockRouter(false);
    }
    return false;
  };

  const checkOrganizerDefaultValue = () => {
    let defaultValue = '';
    let defaultId = '';
    if (organizerData.length) {
      if (createEventFormValue.organizerId) {
        defaultValue =
          organizerData.find(
            (item) => item.id.toString() === createEventFormValue.organizerId,
          )?.name || '';
        defaultId =
          organizerData
            .find(
              (item) => item.id.toString() === createEventFormValue.organizerId,
            )
            ?.id.toString() || '';
      } else {
        const userRole = cookies.getCookie(CookieKeys.authUserRole);
        if (
          userRole === UserRoleKeys.organizerAdmin ||
          userRole === UserRoleKeys.organizerUser
        ) {
          defaultValue = _.head(organizerData)?.name || '';
          defaultId = _.head(organizerData)?.id.toString() || '';
        }
      }
    }
    return { defaultValue, defaultId };
  };

  const createEventPublish = () => {
    const currentTime = new Date().getTime();
    const endTime = new Date(createEventFormValue.endTime).getTime();
    if (validatUnfinishedSteps(createEventFormValue) === '') {
      if (currentTime > endTime) {
        message.error(t('Event end time can not be in the past.'));
      } else {
        message.success(
          t(
            `Congrats! You have successfully published your event. Let's rock n rol!`,
          ),
        );
        setWhichPathUrlWillTo(UserRoutes.events);
        setBlockRouter(false);
        setShowNotSaveConfirmModal(false);
      }
    } else {
      confirm({
        open: showMissingFieldsModal,
        centered: true,
        closable: false,
        okText: t('Go Complete'),
        cancelText: t('Cancel'),
        title: t('Missing Fields'),
        icon: <ExclamationCircleOutlined />,
        content: t('Please complete all required fields before publishing.'),
        onOk() {
          setSteps(Number(validatUnfinishedSteps(createEventFormValue)));
        },
        onCancel() {
          setShowMissingFieldsModal(false);
        },
      });
    }
  };

  useEffect(() => {
    if (clickConfirmModalCloseIcon) {
      setShowNotSaveConfirmModal(false);
      Modal.destroyAll();
    }
  }, [clickConfirmModalCloseIcon]);

  useEffect(() => {
    if (showNotSaveConfirmModal) {
      notSaveConfirm();
    } else {
      setClickConfirmModalCloseIcon(false);
    }
  }, [showNotSaveConfirmModal]);

  useEffect(() => {
    if (!blockRouter) {
      history.push(whichPathUrlWillTo);
      setBlockRouter(true);
    }
  }, [blockRouter]);

  useEffect(() => {
    const items = _.cloneDeep(progressItems);
    items[steps].icon = <StatusImage src={Images.EditingIcon} />;
    if (steps !== previousStep) {
      let currentIcon = Images.NotStartedIcon;
      if (previousStep === ComponentSteps.eventInfo) {
        if (validatUnfinishedSteps(createEventFormValue) !== 0) {
          currentIcon = Images.SuccessIcon;
        } else {
          currentIcon = Images.NotFinishedIcon;
        }
        items[ComponentSteps.eventInfo].icon = (
          <StatusImage src={currentIcon} />
        );
      } else if (previousStep === ComponentSteps.createTicket) {
        if (createEventFormValue.ticketList.length) {
          currentIcon = Images.SuccessIcon;
        } else {
          currentIcon = Images.NotFinishedIcon;
        }
        items[ComponentSteps.createTicket].icon = (
          <StatusImage src={currentIcon} />
        );
      } else {
        items[previousStep].icon = <StatusImage src={Images.NotStartedIcon} />;
      }
    }
    setProgressItems(items);
    setPreviousStep(steps);
  }, [steps]);

  useEffect(() => {
    setCreateEventFormValue({
      ...createEventFormValue,
      organizerId: checkOrganizerDefaultValue().defaultId,
    });
  }, [organizerData]);

  useEffect(() => {
    window.addEventListener('beforeunload', notSaveAlert);
    window.onload = () => {
      document.addEventListener('gesturestart', notSaveAlert);
    };
    dispatch(
      getOrganizerAction({
        page: defaultCurrentPage,
        size: defaultOrganizerPageSize,
      }),
    );
    return () => {
      window.removeEventListener('beforeunload', notSaveAlert);
      document.removeEventListener('gesturestart', notSaveAlert);
      dispatch(reset());
    };
  }, []);

  const blockStep = () => {
    if (
      (steps === ComponentSteps.createTicket &&
        createTicketStatus !== CreateTicketStatus.list) ||
      (steps === ComponentSteps.settings &&
        createPromoStatus !== CreatePromoStatus.list)
    )
      return true;

    return false;
  };

  return (
    <>
      <Prompt when={blockRouter} message={handleRouterHoldUp} />
      <PageHeaderComponent
        title={t('Events')}
        showBackArrow
        clickBack={() => history.push(UserRoutes.events)}
      />
      <CreateEventContainer>
        {(loading && (
          <Spin
            spinning={loading}
            indicator={<LoadingOutlined spin />}
            size="large"
          />
        )) || (
          <>
            <ProgressBarComponent
              currentStep={steps}
              currentStepName={progressItems[steps].title}
              setSteps={setSteps}
              items={progressItems}
              mobileItems={progressItems.map((item) => {
                const mobileItems = { ...item, title: '' };
                return mobileItems;
              })}
              notSaveConfirm={notSaveConfirm}
              blockStep={blockStep}
            />
            <div className="page-main">
              <Form
                name="create_event"
                onFinish={onFinish}
                initialValues={{
                  ...createEventFormValue,
                  organizerId: checkOrganizerDefaultValue().defaultValue,
                  eventTime:
                    (createEventFormValue.startTime &&
                      createEventFormValue.endTime && [
                        moment(createEventFormValue.startTime),
                        moment(createEventFormValue.endTime),
                      ]) ||
                    null,
                }}
              >
                {steps === ComponentSteps.eventInfo && (
                  <EventInfo
                    organizerData={organizerData}
                    formValue={createEventFormValue}
                    fieldEdit={handleFieldChange}
                  />
                )}
                {steps === ComponentSteps.createTicket && (
                  <CreateTicket
                    createTicketStatus={createTicketStatus}
                    setCreateTicketStatus={setCreateTicketStatus}
                    formValue={createEventFormValue}
                    fieldEdit={handleFieldChange}
                    notSaveConfirm={notSaveConfirm}
                  />
                )}
                {steps === ComponentSteps.settings && (
                  <Settings
                    createPromoStatus={createPromoStatus}
                    setCreatePromoStatus={setCreatePromoStatus}
                    formValue={createEventFormValue}
                    fieldEdit={handleFieldChange}
                    notSaveConfirm={notSaveConfirm}
                    setCreatePromoType={setCreatePromoType}
                    createPromoType={createPromoType}
                  />
                )}
                {steps === ComponentSteps.publish && (
                  <Publish
                    formValue={createEventFormValue}
                    fieldEdit={handleFieldChange}
                  />
                )}
              </Form>
            </div>
            {(steps !== ComponentSteps.publish && (
              <>
                {(steps === ComponentSteps.createTicket &&
                  (createTicketStatus === CreateTicketStatus.add ||
                    createTicketStatus === CreateTicketStatus.edit)) ||
                (steps === ComponentSteps.settings &&
                  (createPromoStatus === CreatePromoStatus.add ||
                    createPromoStatus === CreatePromoStatus.edit)) ? null : (
                  <div className="page-bottom">
                    <div className="bottom-btn">
                      <Button onClick={() => saveAsDraft()}>
                        {t('Save as Draft')}
                      </Button>
                      <Button
                        type="primary"
                        onClick={() => setSteps(steps + 1)}
                      >
                        {t('Next')}
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )) || (
              <div className="page-bottom">
                <div className="bottom-btn">
                  <Button onClick={() => saveAsDraft()}>
                    {t('Save as Draft')}
                  </Button>
                  <Button type="primary" onClick={createEventPublish}>
                    {t('Publish')}
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CreateEventContainer>
    </>
  );
};

export default CreateEvent;
