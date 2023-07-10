import React, { useEffect, useState } from 'react';
import { useHistory, Prompt } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Form, message, Modal } from 'antd';
import _ from 'lodash';
import { ExclamationCircleOutlined } from '@ant-design/icons';

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

  const organizerData = useAppSelector(selectOrganizerData);

  const [steps, setSteps] = useState<number>(ComponentSteps.eventInfo);
  const [blockRouter, setBlockRouter] = useState<boolean>(true);
  const [showNotSaveConfirmModal, setShowNotSaveConfirmModal] =
    useState<boolean>(false);
  const [formValueSaved, setFormValueSaved] = useState<boolean>(false);
  const [whichPathUrlWillTo, setWhichPathUrlWillTo] = useState<string>('');
  const [createEventFormValue, setCreateEventFormValue] = useState({
    eventName: '',
    location: '',
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

  const saveAsDraft = () => {
    if (!createEventFormValue.eventName) {
      message.error(
        t('Please enter a name for your event before saving as a draft.'),
      );
    } else {
      message.success(t('Draft Saved Successfully!'));
    }
  };

  const handleFieldChange = (value: any, field: string) => {
    setCreateEventFormValue({
      ...createEventFormValue,
      [field]: value,
    });
  };

  const notSaveConfirm = () => {
    confirm({
      open: showNotSaveConfirmModal,
      centered: true,
      closable: false,
      okText: t('Save as Draft'),
      cancelText: t('Leave'),
      icon: <ExclamationCircleOutlined />,
      content: t('Leaving this page will result in losing your content.'),
      onOk() {
        saveAsDraft();
        setShowNotSaveConfirmModal(false);
        setBlockRouter(false);
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
    if (showNotSaveConfirmModal) {
      notSaveConfirm();
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
    setProgressItems(items);
  }, [steps]);

  useEffect(() => {
    window.addEventListener('beforeunload', notSaveAlert);
    dispatch(
      getOrganizerAction({
        page: defaultCurrentPage,
        size: defaultOrganizerPageSize,
      }),
    );
    return () => {
      window.removeEventListener('beforeunload', notSaveAlert);
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
          <Form name="create_event" onFinish={onFinish}>
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
            <Button onClick={saveAsDraft}>{t('Save as Draft')}</Button>
            <Button type="primary" onClick={() => setSteps(steps + 1)}>
              {t('Next')}
            </Button>
          </div>
        </div>
        {/* <Modal okText={t('Save as Draft')} cancelText={t('Leave')} centered open={showNotSaveConfirmModal}>
          {t('Leaving this page will result in losing your content.')}
        </Modal> */}
      </CreateEventContainer>
    </>
  );
};

export default CreateEvent;
