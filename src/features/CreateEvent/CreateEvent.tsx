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
} from '../../constants/General';
import { Images } from '../../theme';
import { UserRoutes } from '../../navigation/Routes';
import ProgressBarComponent from '../../components/ProgressBar';
import PageHeaderComponent from '../../components/PageHeader';
import { CreateEventContainer } from './CreateEventComponent';
import EventInfo from './Component/EventInfo';
import CreateTicket from './Component/CreateTicket';
import Settings from './Component/Settings';
import Publish from './Component/Publish';
import {
  reset,
  selectOrganizerData,
  getOrganizerAction,
  selectLoading,
} from './CreateEvent.slice';

const { confirm } = Modal;

export enum ComponentSteps {
  eventInfo = 0,
  createTicket = 1,
  settings = 2,
  publish = 3,
}

const CreateEvent = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectLoading);
  const organizerData = useAppSelector(selectOrganizerData);

  const [steps, setSteps] = useState<number>(ComponentSteps.eventInfo);
  const [previousStep, setPreviousStep] = useState<number>(
    ComponentSteps.eventInfo,
  );
  const [blockRouter, setBlockRouter] = useState<boolean>(true);
  const [showNotSaveConfirmModal, setShowNotSaveConfirmModal] =
    useState<boolean>(false);
  const [formValueSaved, setFormValueSaved] = useState<boolean>(true);
  const [whichPathUrlWillTo, setWhichPathUrlWillTo] = useState<string>('');
  const [clickConfirmModalCloseIcon, setClickConfirmModalCloseIcon] =
    useState<boolean>(false);
  const [createEventFormValue, setCreateEventFormValue] = useState({
    eventName: '',
    location: '',
    addMyLocation: '',
    currentLat: 0,
    currentLng: 0,
    organizerId: '',
    address: '',
    startTime: '',
    endTime: '',
    banner: '',
    eventShortDescription: '',
    description: '',
    detailImage: '',
    images: [],
  });
  const [progressItems, setProgressItems] = useState([
    {
      title: 'Create Event',
      icon: (
        <div>
          <img src={Images.EditingIcon} alt="" className="status-img" />
        </div>
      ),
    },
    {
      title: 'Create Ticket',
      icon: (
        <div>
          <img src={Images.NotStartedIcon} alt="" className="status-img" />
        </div>
      ),
    },
    {
      title: 'Settings',
      icon: (
        <div>
          <img src={Images.NotStartedIcon} alt="" className="status-img" />
        </div>
      ),
    },
    {
      title: 'Publish',
      icon: (
        <div>
          <img src={Images.NotStartedIcon} alt="" className="status-img" />
        </div>
      ),
    },
  ]);

  const onFinish = () => {
    setFormValueSaved(true);
  };

  const saveAsDraft = (type?: string) => {
    if (!createEventFormValue.eventName) {
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

  const handleFieldChange = (value: any, field: string) => {
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
        currentLat: value.lat(),
        currentLng: value.lng(),
      });
    } else {
      setCreateEventFormValue({
        ...createEventFormValue,
        [field]: value,
      });
    }
  };

  const notSaveConfirm = () => {
    confirm({
      className: 'notSaveConfirmModal',
      open: showNotSaveConfirmModal,
      centered: true,
      closable: false,
      okText: t('Save as Draft'),
      cancelText: t('Leave'),
      title: (
        <div className="notSaveModalTitle">
          {t('Unsaved Content')}
          <CloseOutlined onClick={() => setClickConfirmModalCloseIcon(true)} />
        </div>
      ),
      icon: <ExclamationCircleOutlined />,
      content: t('Leaving this page will result in losing your content.'),
      onOk() {
        saveAsDraft('blockRouter');
        setShowNotSaveConfirmModal(false);
      },
      onCancel() {
        setShowNotSaveConfirmModal(false);
        setBlockRouter(false);
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
    items[steps].icon = (
      <div>
        <img src={Images.EditingIcon} alt="" className="status-img" />
      </div>
    );
    if (steps !== previousStep) {
      let currentIcon = Images.NotStartedIcon;
      if (previousStep === ComponentSteps.eventInfo) {
        if (
          createEventFormValue.eventName &&
          createEventFormValue.organizerId &&
          createEventFormValue.location &&
          createEventFormValue.startTime &&
          createEventFormValue.endTime &&
          createEventFormValue.banner &&
          createEventFormValue.eventShortDescription
        ) {
          currentIcon = Images.SuccessIcon;
        } else {
          currentIcon = Images.NotFinishedIcon;
        }
        items[ComponentSteps.eventInfo].icon = (
          <div>
            <img src={currentIcon} alt="" className="status-img" />
          </div>
        );
      } else {
        items[previousStep].icon = (
          <div>
            <img src={Images.NotStartedIcon} alt="" className="status-img" />
          </div>
        );
      }
    }
    setProgressItems(items);
    setPreviousStep(steps);
  }, [steps]);

  const gesturestart = (event: any) => {
    event.preventDefault();
  };

  useEffect(() => {
    window.addEventListener('beforeunload', notSaveAlert);
    window.onload = () => {
      document.addEventListener('gesturestart', gesturestart);
    };
    dispatch(
      getOrganizerAction({
        page: defaultCurrentPage,
        size: defaultOrganizerPageSize,
      }),
    );
    return () => {
      window.removeEventListener('beforeunload', notSaveAlert);
      document.removeEventListener('gesturestart', gesturestart);
      dispatch(reset());
    };
  }, []);

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
              setSteps={setSteps}
              items={progressItems}
              mobileItems={progressItems.map((item) => {
                const mobileItems = { ...item, title: '' };
                return mobileItems;
              })}
            />
            <div className="page-main">
              <Form
                name="create_event"
                onFinish={onFinish}
                initialValues={{
                  ...createEventFormValue,
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
                {steps === ComponentSteps.createTicket && <CreateTicket />}
                {steps === ComponentSteps.settings && <Settings />}
                {steps === ComponentSteps.publish && <Publish />}
              </Form>
            </div>
            <div className="page-bottom">
              <div className="bottom-btn">
                <Button onClick={() => saveAsDraft()}>
                  {t('Save as Draft')}
                </Button>
                <Button type="primary" onClick={() => setSteps(steps + 1)}>
                  {t('Next')}
                </Button>
              </div>
            </div>
          </>
        )}
      </CreateEventContainer>
    </>
  );
};

export default CreateEvent;
