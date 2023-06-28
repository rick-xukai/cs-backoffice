import { RequestClientClass } from '../../../utils/requestClient';
import { API_SERVER } from '../../../constants/predicates';
import API from '../../../constants/API';

const requestClient = () => new RequestClientClass(API_SERVER);

const doLogin = async (payload: any) => {
  const uri = API.login.post;
  const response = await requestClient()
    .setUri(uri)
    .setPayload(payload)
    .doPost();
  return response;
};

const getUsersList = async (payload: any) => {
  const uri = API.getUsersList.get;
  const response = await requestClient()
    .setUri(uri)
    .setQueryParameter(payload)
    .setAuthorizationStatus()
    .doGet();
  return response;
};

const getUserDetail = async (payload: string) => {
  const uri = API.getUserDetail.get.replace('{userId}', payload);
  const response = await requestClient()
    .setUri(uri)
    .setAuthorizationStatus()
    .doGet();
  return response;
};

const getUserDetailTickets = async (payload: {
  userId: string;
  parameters: object;
}) => {
  const uri = API.getUserDetailTickets.get.replace('{userId}', payload.userId);
  const response = await requestClient()
    .setUri(uri)
    .setQueryParameter(payload.parameters)
    .setAuthorizationStatus()
    .doGet();
  return response;
};

const doChangePassword = async (payload: any) => {
  const uri = API.changePassword.put;
  const response = await requestClient()
    .setUri(uri)
    .setPayload(payload)
    .setAuthorizationStatus()
    .doPut();
  return response;
};

export default {
  getUsersList,
  getUserDetail,
  getUserDetailTickets,
  doLogin,
  doChangePassword,
};
