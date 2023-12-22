import { RequestClientClass } from '../../../utils/requestClient';
import { API_SERVER } from '../../../constants/predicates';
import API from '../../../constants/API';
import { GetOrganizerListPayload } from '../../../features/Organisers/Organisers.slice';
import { CreateOrganiserPayload } from '../../../features/CreateOrganisers/CreateOrganisers.slice';

const requestClient = () => new RequestClientClass(API_SERVER);

const getOrganizerList = async (payload: GetOrganizerListPayload) => {
  const uri = API.getOrganizerList.get;
  const response = await requestClient()
    .setUri(uri)
    .setQueryParameter(payload)
    .setAuthorizationStatus()
    .setRequireHeadersReturn(true)
    .doGet();
  return response;
};

const createOrganizer = async (payload: CreateOrganiserPayload) => {
  const uri = API.createOrganizer.post;
  const response = await requestClient()
    .setUri(uri)
    .setAuthorizationStatus()
    .setPayload(payload)
    .doPost();
  return response;
};

const getOrganizerDetail = async (payload: string) => {
  const uri = API.getOrganizerDetail.get.replace('{id}', payload);
  const response = await requestClient()
    .setUri(uri)
    .setQueryParameter(payload)
    .setAuthorizationStatus()
    .doGet();
  return response;
};

const checkAdminUserExist = async (payload: any) => {
  const uri = API.checkAdminUserExist.post;
  const response = await requestClient()
    .setUri(uri)
    .setAuthorizationStatus()
    .setPayload(payload)
    .doPost();
  return response;
};

const updateOrganizer = async (payload: any, id: string) => {
  const uri = API.updateOrganizer.put.replace('{id}', id);
  const response = await requestClient()
    .setUri(uri)
    .setAuthorizationStatus()
    .setPayload(payload)
    .doPut();
  return response;
};

const deleteOrganizer = async (payload: string) => {
  const uri = API.deleteOrganizer.delete.replace('{id}', payload);
  const response = await requestClient()
    .setUri(uri)
    .setAuthorizationStatus()
    .setPayload({})
    .doDelete();
  return response;
};

export default {
  getOrganizerList,
  createOrganizer,
  getOrganizerDetail,
  checkAdminUserExist,
  updateOrganizer,
  deleteOrganizer,
};
