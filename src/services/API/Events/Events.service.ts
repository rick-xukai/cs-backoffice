import { RequestClientClass } from '../../../utils/requestClient';
import { API_SERVER } from '../../../constants/predicates';
import API from '../../../constants/API';

import { CreateEventFormValueProps } from '../../../features/CreateEvent/CreateEvent.slice';

const requestClient = () => new RequestClientClass(API_SERVER);

const getEventsList = async (payload: any) => {
  const uri = API.getEventsList.get;
  const response = await requestClient()
    .setUri(uri)
    .setQueryParameter(payload)
    .setAuthorizationStatus()
    .doGet();
  return response;
};

const getEventDetail = async (payload: string) => {
  const uri = API.getEventsDetail.get.replace('{eventId}', payload);
  const response = await requestClient()
    .setUri(uri)
    .setAuthorizationStatus()
    .doGet();
  return response;
};

const createEvent = async (payload: CreateEventFormValueProps) => {
  const uri = API.createEvent.post;
  const response = await requestClient()
    .setUri(uri)
    .setAuthorizationStatus()
    .setPayload(payload)
    .doPost();
  return response;
};

const updateEvent = async ({ id, ...opt }: any) => {
  const uri = API.updateEvent.put.replace('{eventId}', id);
  const response = await requestClient()
    .setUri(uri)
    .setAuthorizationStatus()
    .setPayload(opt)
    .doPut();
  return response;
};

const getOrganizer = async (payload: any) => {
  const uri = API.getOrganizer.get;
  const response = await requestClient()
    .setUri(uri)
    .setAuthorizationStatus()
    .setQueryParameter(payload)
    .doGet();
  return response;
};

const uploadFile = async (payload: any) => {
  const uri = API.uploadFile.post;
  const response = await requestClient()
    .setUri(uri)
    .setAuthorizationStatus()
    .setPayload(payload)
    .doPost();
  return response;
};

const openAiGenerator = async (payload: any) => {
  const uri = API.fetchOpenAi.post;
  const response = await requestClient()
    .setUri(uri)
    .setAuthorizationStatus()
    .setPayload(payload)
    .doPost();
  return response;
};

const getListTicketType = async () => {
  const uri = API.getListTicketType.get;
  const response = await requestClient()
    .setUri(uri)
    .setAuthorizationStatus()
    .doGet();
  return response;
};

const cancelEvent = async (id: string) => {
  const uri = API.cancelEvent.put.replace(':eventId', id);
  const response = await requestClient()
    .setUri(uri)
    .setPayload({})
    .setAuthorizationStatus()
    .doPut();
  return response;
};

const deleteEvent = async (id: string) => {
  const uri = API.deleteEvent.put.replace(':eventId', id);
  const response = await requestClient()
    .setUri(uri)
    .setPayload({})
    .setAuthorizationStatus()
    .doPut();
  return response;
};

const checkDiscountCode = async (payload: {
  code: string;
  eventId: number;
}) => {
  const uri = API.checkDiscountCode.post;
  const response = await requestClient()
    .setUri(uri)
    .setPayload(payload)
    .setAuthorizationStatus()
    .doPost();
  return response;
};

const checkConnectTicket = async ({
  eventId,
  ticketTypeId,
  targetTypeId,
}: {
  ticketTypeId: number;
  eventId: number;
  targetTypeId: number;
}) => {
  const uri = API.checkConnectTicket.post
    .replace(':eventId', `${eventId}`)
    .replace(':ticketTypeId', `${ticketTypeId}`);
  const response = await requestClient()
    .setUri(uri)
    .setPayload({ targetTypeId })
    .setAuthorizationStatus()
    .doPost();
  return response;
};

const getEventDashboard = async ({ eventId }: { eventId: string | number }) => {
  const uri = API.getEventDashboard.get.replace(':event_id', `${eventId}`);
  const response = await requestClient()
    .setUri(uri)
    .setAuthorizationStatus()
    .doGet();
  return response;
};

const getEventPageViews = async ({ eventId }: { eventId: string | number }) => {
  const uri = API.getEventPageView.get.replace(':eventId', `${eventId}`);
  const response = await requestClient()
    .setUri(uri)
    .setAuthorizationStatus()
    .doGet();
  return response;
};

const getEventPageViewsAnalysis = async ({
  eventId,
  ...opt
}: {
  eventId: string | number;
}) => {
  const uri = API.getEventPageViewAnalysis.get.replace(
    ':eventId',
    `${eventId}`,
  );
  const response = await requestClient()
    .setUri(uri)
    .setQueryParameter(opt)
    .setAuthorizationStatus()
    .doGet();
  return response;
};

const getUnqiueBuyers = async ({
  eventId,
  ...opt
}: {
  eventId: string | number;
  keyword: string;
  isActivated?: boolean;
}) => {
  const uri = API.getUnqiueBuyers.get.replace(':eventId', `${eventId}`);
  const response = await requestClient()
    .setUri(uri)
    .setQueryParameter(opt)
    .setAuthorizationStatus()
    .doGet();
  return response;
};

const getUnqiueAttendees = async ({
  eventId,
  ...opt
}: {
  eventId: string | number;
  keyword: string;
  isActivated: boolean;
}) => {
  const uri = API.getUnqiueAttendees.get.replace(':eventId', `${eventId}`);
  const response = await requestClient()
    .setUri(uri)
    .setQueryParameter(opt)
    .setAuthorizationStatus()
    .doGet();
  return response;
};

const getUnqiueAttendeesSummary = async ({
  eventId,
}: {
  eventId: string | number;
}) => {
  const uri = API.getUnqiueAttendeesSummary.get.replace(
    ':eventId',
    `${eventId}`,
  );
  const response = await requestClient()
    .setUri(uri)
    .setAuthorizationStatus()
    .doGet();
  return response;
};

const getEventScanned = async ({
  eventId,
  ...opt
}: {
  eventId: string | number;
  keyword: string;
  ticketTypeId: number;
  source: number;
}) => {
  const uri = API.getEventScanned.get.replace(':eventId', `${eventId}`);
  const response = await requestClient()
    .setUri(uri)
    .setQueryParameter(opt)
    .setAuthorizationStatus()
    .doGet();
  return response;
};

export default {
  getEventsList,
  getEventDetail,
  createEvent,
  getOrganizer,
  uploadFile,
  updateEvent,
  openAiGenerator,
  getListTicketType,
  cancelEvent,
  deleteEvent,
  checkDiscountCode,
  checkConnectTicket,
  getEventDashboard,
  getEventPageViews,
  getEventPageViewsAnalysis,
  getUnqiueBuyers,
  getUnqiueAttendees,
  getUnqiueAttendeesSummary,
  getEventScanned,
};
