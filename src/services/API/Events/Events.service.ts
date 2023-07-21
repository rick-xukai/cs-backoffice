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

const updateEvent = async ({ payload, id }: { payload: any; id: string }) => {
  const uri = API.updateEvent.put.replace('{eventId}', id);
  const response = await requestClient()
    .setUri(uri)
    .setAuthorizationStatus()
    .setPayload(payload)
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

export default {
  getEventsList,
  getEventDetail,
  createEvent,
  getOrganizer,
  uploadFile,
  updateEvent,
  openAiGenerator,
};
