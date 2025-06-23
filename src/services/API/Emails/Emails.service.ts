/* eslint-disable */
import { RequestClientClass } from '../../../utils/requestClient';
import { API_SERVER } from '../../../constants/predicates';
import API from '../../../constants/API';
import { EmailListPayload } from '../../../features/Emails/Emails.slice';
import { CreateEmailPayload } from '../../../features/CreateEditEmail/CreateEditEmail.slice';

const requestClient = () => new RequestClientClass(API_SERVER);

const getEmailsList = async (payload: EmailListPayload) => {
  const uri = API.getEmailsList.get;
  const response = await requestClient()
    .setUri(uri)
    .setAuthorizationStatus()
    .setQueryParameter(payload)
    .doGet();
  return response;
};

const getEventReminderList = async (payload: any) => {
  const uri = API.getEventReminderList.get;
  const response = await requestClient()
    .setUri(uri)
    .setAuthorizationStatus()
    .setQueryParameter(payload)
    .doGet();
  return response;
};

const createEmail = async (payload: CreateEmailPayload) => {
  const uri = API.createEmail.post;
  const response = await requestClient()
    .setUri(uri)
    .setAuthorizationStatus()
    .setPayload(payload)
    .doPost();
  return response;
};

const getEventDetail = async (payload: string) => {
  const uri = API.getEmailDetail.get.replace('{id}', payload);
  const response = await requestClient()
    .setUri(uri)
    .setAuthorizationStatus()
    .doGet();
  return response;
};

const updateEmailDetail = async (payload: CreateEmailPayload, id: string) => {
  const uri = API.updateEmailDetail.put.replace('{id}', id);
  const response = await requestClient()
    .setUri(uri)
    .setAuthorizationStatus()
    .setPayload(payload)
    .doPut();
  return response;
};

const deleteEmail = async (id: string) => {
  const uri = API.deleteEmail.delete.replace('{id}', id);
  const response = await requestClient()
    .setUri(uri)
    .setAuthorizationStatus()
    .doDelete();
  return response;
};

export default {
  getEmailsList,
  getEventReminderList,
  createEmail,
  getEventDetail,
  updateEmailDetail,
  deleteEmail,
};
