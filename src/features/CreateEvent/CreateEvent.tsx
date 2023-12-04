import React, { useEffect, useState } from 'react';
import { useHistory, Prompt, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Form, message, Modal } from 'antd';
import _, { isEmpty } from 'lodash';
import moment from 'moment';
import { ExclamationCircleOutlined, CloseOutlined } from '@ant-design/icons';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  defaultCurrentPage,
  defaultOrganizerPageSize,
  SetRefundKey,
  DescriptionImagesSize,
  DeleteTicket,
} from '../../constants/General';
import { useCookie } from '../../hooks';
import { Images } from '../../theme';
import { CookieKeys, UserRoleKeys } from '../../constants/Keys';
import { validatUnfinishedSteps } from '../../utils/func';
import { UserRoutes } from '../../navigation/Routes';
import ProgressBarComponent from '../../components/ProgressBar';
import PageHeaderComponent from '../../components/PageHeader';
import { CreateEventContainer, LoadingContainer } from './CreateEventComponent';
import EventInfo from './Component/EventInfo';
import CreateTicket from './Component/CreateTicket';
import Settings, {
  CreatePromoStatus,
  CreatePromoType,
} from './Component/Settings';
import Publish from './Component/Publish';
import BallLoading from '../../components/BallLoading';
import {
  reset,
  selectError,
  createEventAction,
  selectOrganizerData,
  getOrganizerAction,
  selectLoading,
  CreateEventFormValueProps,
  selectPublishLoading,
  selectSaveDraftLoading,
  createEventSaveDraftAction,
  selectListTicketType,
  getListTicketTypeAction,
  updateEventAction,
  selectNeedUpdateEventId,
  selectNeedUpdateTicketsId,
  selectNeedUpdateDiscountsId,
  CreateEventActionType,
  updateNeedUpdateEventId,
  selectShowLoadingMessage,
} from './CreateEvent.slice';
import { CreateTicketStatus } from './Component/CreateTicketComponents';
import { getEventDetailAction } from '../EventDetail/EventDetail.slice';
import { EventStatusKeys } from '../Events/Events.slice';

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
  const publishLoading = useAppSelector(selectPublishLoading);
  const saveDraftLoading = useAppSelector(selectSaveDraftLoading);
  const error = useAppSelector(selectError);
  const organizerData = useAppSelector(selectOrganizerData);
  const listTicketType = useAppSelector(selectListTicketType);
  const needUpdateEventId = useAppSelector(selectNeedUpdateEventId);
  const needUpdateDiscountsId = useAppSelector(selectNeedUpdateDiscountsId);
  const needUpdateTicketsId = useAppSelector(selectNeedUpdateTicketsId);
  const showLoadingMessage = useAppSelector(selectShowLoadingMessage);
  const [steps, setSteps] = useState<number>(ComponentSteps.eventInfo);
  const [previousStep, setPreviousStep] = useState<number>(
    ComponentSteps.eventInfo,
  );
  const [blockRouter, setBlockRouter] = useState<boolean>(true);
  const [showNotSaveConfirmModal, setShowNotSaveConfirmModal] =
    useState<boolean>(false);
  const [showMissingFieldsModal, setShowMissingFieldsModal] =
    useState<boolean>(false);
  const [eventInfoFormEdit, setEventInfoFormEdit] = useState<boolean>(false);
  const [ticketFormEdit, setTicketFormEdit] = useState<boolean>(false);
  const [settingsFormEdit, setSettingsFormEdit] = useState<boolean>(false);

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
      ticketTypes: [],
      refundPolicy: SetRefundKey.nonRefundable,
      discounts: [],
    });
  const [originDetailData, setOriginDetailData] =
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
      ticketTypes: [],
      refundPolicy: SetRefundKey.nonRefundable,
      discounts: [],
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

  const params: { id: string } = useParams();
  const { id } = params;
  const isEdit = !!id;
  const isDraft = createEventFormValue.status === EventStatusKeys.draft;
  const formatRequestPayload = (
    type: number,
    anotherPayload?: {
      discounts?: CreateEventFormValueProps['discounts'];
      ticketTypes?: CreateEventFormValueProps['ticketTypes'];
    },
  ) => {
    const discounts =
      anotherPayload?.discounts || createEventFormValue.discounts;
    const originTicketTypes =
      anotherPayload?.ticketTypes || createEventFormValue.ticketTypes;
    const payload: CreateEventFormValueProps = {
      ...createEventFormValue,
      publish: type,
      startTime: moment(createEventFormValue.startTime).format(),
      endTime: moment(createEventFormValue.endTime).format(),
      descriptionImages: createEventFormValue.descriptionImages.map(
        (item: any) => ({
          image: item.response,
          size:
            DescriptionImagesSize.find((sizes) => sizes.key === item.column)
              ?.text || '',
        }),
      ),
      discounts: discounts.map((discount) => {
        const applyItems = {
          ...discount,
          discount: {
            ...discount.discount,
            value:
              (discount.discount.value &&
                Number(discount.discount.value.toString().replace(/,/g, ''))) ||
              0,
          },
          quantity: discount.quantity || 0,
          apply: {
            ...discount.apply,
            ticketTypeIds: discount.apply.ticketTypeIds
              .map((ticketTypeId) => ticketTypeId)
              .filter((item) => !!item),
          },
        };
        return applyItems;
      }),
      ticketTypes: originTicketTypes.map((ticket) => {
        const items = {
          ...ticket,
          connectedTickets: ticket.connectedTickets.filter(
            (item) => !isEmpty(item),
          ),
        };
        return items;
      }),
    };
    const ticketTypes = _.cloneDeep(payload.ticketTypes).map((item) => {
      const types = {
        ...item,
        price: Number(`${item.price}`.replace(/,/g, '')),
        stock: Number(item.stock),
        ceilingPrice: Number(item.ceilingPrice),
        royaltiesFee: Number(item.royaltiesFee),
        sellStartTime: moment(item.sellStartTime).format(),
        sellEndTime: moment(item.sellEndTime).format(),
        connectedTickets: item.connectedTickets.map((connectedTicket: any) => ({
          ticketTypeId: connectedTicket.id || connectedTicket.ticketTypeId,
        })),
      };
      return types;
    });
    if (!createEventFormValue.startTime) {
      delete payload.startTime;
    }
    if (!createEventFormValue.endTime) {
      delete payload.endTime;
    }
    if (!createEventFormValue.organizerId) {
      delete payload.organizerId;
    }
    return { ...payload, ticketTypes };
  };

  useEffect(() => {
    if (needUpdateTicketsId.length) {
      setCreateEventFormValue({
        ...createEventFormValue,
        ticketTypes: createEventFormValue.ticketTypes.map((item, index) => ({
          ...item,
          id: needUpdateTicketsId[index].id,
        })),
      });
    }
  }, [needUpdateTicketsId]);

  useEffect(() => {
    if (needUpdateDiscountsId.length) {
      setCreateEventFormValue({
        ...createEventFormValue,
        discounts: createEventFormValue.discounts.map((item, index) => ({
          ...item,
          id: needUpdateDiscountsId[index].id,
        })),
      });
    }
  }, [needUpdateDiscountsId]);

  const saveAsDraft = async (type?: string) => {
    if (publishLoading || saveDraftLoading) return;
    if (!createEventFormValue.name) {
      message.error(
        t('Please enter a name for your event before saving as a draft.'),
      );
    } else {
      let response: any = {};
      if (needUpdateEventId || createEventFormValue.id) {
        const payload: any = {
          ...formatRequestPayload(CreateEventActionType.saveAsDraft),
          id: needUpdateEventId || createEventFormValue.id,
        };
        response = await dispatch(updateEventAction(payload));
      } else {
        response = await dispatch(
          createEventSaveDraftAction(
            formatRequestPayload(CreateEventActionType.saveAsDraft),
          ),
        );
      }

      if (
        response.type ===
        (
          (needUpdateEventId && updateEventAction) ||
          createEventSaveDraftAction
        ).fulfilled.toString()
      ) {
        message.success(t('Draft Saved Successfully!'));
        setEventInfoFormEdit(false);
        setTicketFormEdit(false);
        setSettingsFormEdit(false);
        if (type && type === 'blockRouter') {
          setBlockRouter(false);
        }
        setEventInfoFormEdit(false);
      }
    }
  };

  const fetchDetailData = async (
    afterPublish?: boolean,
    redirectTo?: () => void,
  ) => {
    const response: any = await dispatch(getEventDetailAction(id));
    if (
      response.type === getEventDetailAction.fulfilled.toString() &&
      response.payload?.data
    ) {
      const { data } = response.payload;
      const payload = {
        ...data,
        descriptionImages: data.descriptionImages.map((item: any) => ({
          column: DescriptionImagesSize.find((size) => size.text === item.size)
            ?.key,
          response: item.image,
          type: 'image/jpeg',
          size: 1,
          name: item.image,
        })),
        ticketTypes: data.ticketTypes.map((item: any) => ({
          ...item,
          connectedTickets: item.connectedTickets.map((ticket: any) => ({
            ...ticket,
            ...listTicketType.find((type) => type.id === ticket.ticketTypeId),
          })),
        })),
      };
      setCreateEventFormValue(payload);
      setOriginDetailData(payload);
      if (data.status === EventStatusKeys.draft) {
        dispatch(updateNeedUpdateEventId(data.id));
      }
      if (steps !== ComponentSteps.publish && afterPublish) {
        if (redirectTo) {
          redirectTo();
        } else {
          history.push(UserRoutes.events);
        }
      }
    }
  };

  const createEventPublish = async (anotherPayload?: {
    type?: string;
    discounts?: CreateEventFormValueProps['discounts'];
    ticketTypes?: CreateEventFormValueProps['ticketTypes'];
    redirectTo?: () => void;
    publish?: CreateEventActionType;
  }) => {
    if (publishLoading || saveDraftLoading) return;
    const currentTime = new Date().getTime();
    const endTime = new Date(createEventFormValue.endTime || '').getTime();

    const validate: any = validatUnfinishedSteps(
      (anotherPayload && {
        ...createEventFormValue,
        ticketTypes:
          anotherPayload.ticketTypes || createEventFormValue.ticketTypes,
        discounts: anotherPayload.discounts || createEventFormValue.discounts,
      }) ||
        createEventFormValue,
    );

    const unfinishedSteps = () => {
      if (anotherPayload?.type !== DeleteTicket) {
        if (validate || validate === ComponentSteps.eventInfo) {
          return validate;
        }
      }
      return '';
    };
    if (unfinishedSteps() === '' || (isDraft && !anotherPayload?.publish)) {
      if (currentTime > endTime) {
        message.error(t('Event end time can not be in the past.'));
      } else if (isEdit) {
        const payload: any = {
          ...formatRequestPayload(
            isDraft && !anotherPayload?.publish
              ? CreateEventActionType.saveAsDraft
              : CreateEventActionType.publish,
            anotherPayload,
          ),
          id: createEventFormValue.id,
        };
        const handleUpdate = async () => {
          setShowNotSaveConfirmModal(false);
          setEventInfoFormEdit(false);
          setTicketFormEdit(false);
          setSettingsFormEdit(false);
          dispatch(updateNeedUpdateEventId(''));
          const response = await dispatch(updateEventAction(payload));
          if (response.type === updateEventAction.fulfilled.toString()) {
            fetchDetailData(true, anotherPayload?.redirectTo);
            if (anotherPayload?.redirectTo) {
              anotherPayload.redirectTo();
            }
            message.success(t(`Event is successfully updated.`));
          }
        };
        if (
          originDetailData.address !== createEventFormValue.address ||
          originDetailData.startTime !== createEventFormValue.startTime ||
          originDetailData.endTime !== createEventFormValue.endTime ||
          originDetailData.location !== createEventFormValue.location ||
          originDetailData.locationCoord !== createEventFormValue.locationCoord
        ) {
          setShowNotSaveConfirmModal(false);
          setEventInfoFormEdit(false);
          setTicketFormEdit(false);
          setSettingsFormEdit(false);
          confirm({
            className: 'notSaveConfirmModal',
            onOk: handleUpdate,
            okText: isDraft ? t('Save') : t('Save and Publish'),
            title: t('Key Info Changed'),
            content: t(
              'Are you sure you gonna change the event key info? Make sure you have informed your attendees.',
            ),
            icon: <ExclamationCircleOutlined />,
            centered: true,
            closable: false,
          });
          return;
        }
        handleUpdate();
      } else {
        let response: any = {};
        if (needUpdateEventId) {
          const payload: any = {
            ...formatRequestPayload(CreateEventActionType.publish),
            id: needUpdateEventId,
          };
          response = await dispatch(updateEventAction(payload));
        } else {
          response = await dispatch(
            createEventAction(
              formatRequestPayload(CreateEventActionType.publish),
            ),
          );
        }
        if (
          response.type ===
          (
            (needUpdateEventId && updateEventAction) ||
            createEventAction
          ).fulfilled.toString()
        ) {
          message.success(
            t(
              `Congrats! You have successfully published your event. Let's rock n rol!`,
            ),
          );
          if (anotherPayload?.redirectTo) {
            anotherPayload.redirectTo();
          } else {
            setWhichPathUrlWillTo(UserRoutes.events);
          }
          setBlockRouter(false);
          setShowNotSaveConfirmModal(false);
          setEventInfoFormEdit(false);
        }
      }
    } else {
      confirm({
        open: showMissingFieldsModal,
        centered: true,
        closable: false,
        okText: t('Go Complete'),
        cancelText: t('Cancel'),
        title:
          (createEventFormValue.discounts.length &&
            unfinishedSteps() === 2 &&
            t('Discount Field Missing')) ||
          t('Missing Fields'),
        icon: <ExclamationCircleOutlined />,
        content:
          (createEventFormValue.discounts.length &&
            unfinishedSteps() === 2 &&
            t('Please select [type] tickets for the discount.', {
              type: `"Apply To"`,
            })) ||
          t('Please complete all required fields before publishing.'),
        onOk() {
          setSteps(Number(unfinishedSteps()));
        },
        onCancel() {
          setShowMissingFieldsModal(false);
        },
      });
    }
  };

  /**
   *
   * @param value Form data
   * @param field Field name, required!
   */
  const handleFieldChange = (value: any, field: string) => {
    if (
      field !== 'ticketTypes' &&
      field !== 'discounts' &&
      field !== 'locationCoord'
    ) {
      setEventInfoFormEdit(true);
    }
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
    } else if (field === 'ticketTypesAndDiscount') {
      setCreateEventFormValue({
        ...createEventFormValue,
        ticketTypes: value.ticketTypes,
        discounts: value.discounts,
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
    const getOkText = () => {
      if (okText) return okText;
      if (isEdit && !isDraft) {
        return steps !== ComponentSteps.publish
          ? t('Save and Leave')
          : t('Publish');
      }
      return t('Save as Draft');
    };
    confirm({
      className: 'notSaveConfirmModal',
      centered: true,
      closable: false,
      okText: getOkText(),
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
        setShowNotSaveConfirmModal(false);
        if (onOk) {
          onOk();
        } else if (isEdit && !isDraft) {
          createEventPublish();
          if (steps !== ComponentSteps.publish) {
            setEventInfoFormEdit(false);
            setTicketFormEdit(false);
            setSettingsFormEdit(false);
          }
        } else {
          saveAsDraft('blockRouter');
        }
      },
      onCancel() {
        setShowNotSaveConfirmModal(false);
        if (onCancel) {
          onCancel();
        } else {
          setBlockRouter(false);
        }
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
    if (eventInfoFormEdit || ticketFormEdit || settingsFormEdit) {
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
        if (createEventFormValue.ticketTypes.length) {
          currentIcon = Images.SuccessIcon;
        }
        items[ComponentSteps.createTicket].icon = (
          <StatusImage src={currentIcon} />
        );
      } else if (previousStep === ComponentSteps.settings) {
        if (createEventFormValue.discounts.length) {
          currentIcon = Images.SuccessIcon;
        }
        items[ComponentSteps.settings].icon = <StatusImage src={currentIcon} />;
      } else {
        items[previousStep].icon = <StatusImage src={Images.NotStartedIcon} />;
      }
    }
    setProgressItems(items);
    setPreviousStep(steps);
  }, [steps]);

  useEffect(() => {
    const items = _.cloneDeep(progressItems);
    items[steps].icon = <StatusImage src={Images.EditingIcon} />;
    if (
      steps !== ComponentSteps.eventInfo &&
      createEventFormValue.organizerId &&
      createEventFormValue.name &&
      createEventFormValue.startTime &&
      createEventFormValue.endTime &&
      createEventFormValue.location &&
      createEventFormValue.locationCoord &&
      createEventFormValue.locationCoord &&
      createEventFormValue.image &&
      createEventFormValue.descriptionShort
    ) {
      items[0].icon = <StatusImage src={Images.SuccessIcon} />;
    }
    if (
      steps !== ComponentSteps.createTicket &&
      createEventFormValue.ticketTypes.length
    ) {
      items[1].icon = <StatusImage src={Images.SuccessIcon} />;
    }
    if (
      steps !== ComponentSteps.settings &&
      createEventFormValue.discounts.length
    ) {
      items[2].icon = <StatusImage src={Images.SuccessIcon} />;
    }
    setProgressItems(items);
    setPreviousStep(steps);
  }, [createEventFormValue]);

  useEffect(() => {
    if (!isEdit) {
      setCreateEventFormValue({
        ...createEventFormValue,
        organizerId: checkOrganizerDefaultValue().defaultId,
      });
    }
  }, [organizerData]);

  useEffect(() => {
    if (error) {
      message.error(error.message);
    }
  }, [error]);

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
    dispatch(getListTicketTypeAction());
    return () => {
      window.removeEventListener('beforeunload', notSaveAlert);
      document.removeEventListener('gesturestart', notSaveAlert);
      dispatch(reset());
    };
  }, []);

  const blockStep = () => {
    if (
      (steps === ComponentSteps.createTicket &&
        createTicketStatus !== CreateTicketStatus.list &&
        ticketFormEdit) ||
      (steps === ComponentSteps.settings &&
        createPromoStatus !== CreatePromoStatus.list &&
        settingsFormEdit)
    )
      return true;

    return false;
  };

  useEffect(() => {
    if (isEdit) {
      fetchDetailData();
    }
  }, []);

  const handleCancel = () => {
    history.push(UserRoutes.events);
  };

  const showSaveAndPublishCondition =
    (isEdit && steps === ComponentSteps.eventInfo) ||
    (isEdit && steps === ComponentSteps.publish);
  const hideBottomCondition =
    (steps === ComponentSteps.createTicket &&
      (createTicketStatus === CreateTicketStatus.add ||
        createTicketStatus === CreateTicketStatus.edit)) ||
    (steps === ComponentSteps.settings &&
      (createPromoStatus === CreatePromoStatus.add ||
        createPromoStatus === CreatePromoStatus.edit));

  const showSaveAndPublishButtonText = () => {
    if (steps === ComponentSteps.publish) return t('Publish');
    if (isDraft) return t('Next');
    return t('Save and Publish');
  };

  const Loading = (
    <LoadingContainer>
      <BallLoading />
      {showLoadingMessage && (
        <div className="loading-message">
          <p>
            {t(`We're currently handling your data, this process may take a few
          minutes. Kindly remain on this page and refrain from refreshing it!`)}
          </p>
        </div>
      )}
    </LoadingContainer>
  );

  return (
    <>
      <Prompt when={blockRouter} message={handleRouterHoldUp} />
      <PageHeaderComponent
        title={t('Events')}
        showBackArrow
        clickBack={() => history.push(UserRoutes.events)}
      />
      <CreateEventContainer>
        {publishLoading || saveDraftLoading ? Loading : null}
        {(loading && <BallLoading />) || (
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
              <Form name="create_event">
                {steps === ComponentSteps.eventInfo && (
                  <EventInfo
                    organizerData={organizerData}
                    formValue={createEventFormValue}
                    fieldEdit={handleFieldChange}
                    isEdit={isEdit}
                    isDraft={isDraft}
                    setCreateEventFormValue={setCreateEventFormValue}
                  />
                )}
                {steps === ComponentSteps.createTicket && (
                  <CreateTicket
                    createTicketStatus={createTicketStatus}
                    setCreateTicketStatus={setCreateTicketStatus}
                    formValue={createEventFormValue}
                    fieldEdit={handleFieldChange}
                    ticketFormEdit={ticketFormEdit}
                    setTicketFormEdit={setTicketFormEdit}
                    isEdit={isEdit}
                    createEventPublish={createEventPublish}
                    isDraft={isDraft}
                    id={id}
                  />
                )}
                {steps === ComponentSteps.settings && (
                  <Settings
                    createPromoStatus={createPromoStatus}
                    setCreatePromoStatus={setCreatePromoStatus}
                    formValue={createEventFormValue}
                    fieldEdit={handleFieldChange}
                    settingsFormEdit={settingsFormEdit}
                    setSettingsFormEdit={setSettingsFormEdit}
                    setCreatePromoType={setCreatePromoType}
                    createPromoType={createPromoType}
                    isEdit={isEdit}
                    createEventPublish={createEventPublish}
                    isDraft={isDraft}
                    id={id}
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
            {showSaveAndPublishCondition ? (
              <div className="page-bottom">
                <div className="bottom-btn">
                  <Button
                    onClick={() => (isDraft ? saveAsDraft() : handleCancel())}
                  >
                    {isDraft ? t('Save as Draft') : t('Cancel')}
                  </Button>
                  <Button
                    type="primary"
                    onClick={() =>
                      isDraft && steps !== ComponentSteps.publish
                        ? setSteps(steps + 1)
                        : createEventPublish({
                            redirectTo: () => {},
                            publish: CreateEventActionType.publish,
                          })
                    }
                    disabled={
                      isEdit &&
                      !isDraft &&
                      !eventInfoFormEdit &&
                      !ticketFormEdit &&
                      !settingsFormEdit
                    }
                  >
                    {showSaveAndPublishButtonText()}
                  </Button>
                </div>
              </div>
            ) : (
              (steps !== ComponentSteps.publish && (
                <>
                  {hideBottomCondition ? null : (
                    <div className="page-bottom">
                      <div className="bottom-btn">
                        <Button
                          onClick={() =>
                            isEdit && !isDraft ? handleCancel() : saveAsDraft()
                          }
                        >
                          {isEdit && !isDraft
                            ? t('Cancel')
                            : t('Save as Draft')}
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
                    <Button
                      onClick={() => (isEdit ? handleCancel() : saveAsDraft())}
                    >
                      {isEdit && !isDraft ? t('Cancel') : t('Save as Draft')}
                    </Button>
                    <Button type="primary" onClick={() => createEventPublish()}>
                      {t('Publish')}
                    </Button>
                  </div>
                </div>
              )
            )}
          </>
        )}
      </CreateEventContainer>
    </>
  );
};

export default CreateEvent;
