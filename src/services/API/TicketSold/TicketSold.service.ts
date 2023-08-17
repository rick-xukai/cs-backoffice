import { RequestClientClass } from '../../../utils/requestClient';
import { API_SERVER } from '../../../constants/predicates';
import API from '../../../constants/API';
import {
  GetListParams,
  ImportTicketProps,
} from '../../../features/TicketsSold/TicketSold.slice';

const requestClient = () => new RequestClientClass(API_SERVER);

const getTicketSoldList = async (payload: {
  id: string;
  data: GetListParams;
}) => {
  const uri = API.getTicketSoldList.get.replace(':event_id', payload.id);
  const response = await requestClient()
    .setUri(uri)
    .setQueryParameter(payload.data)
    .setAuthorizationStatus()
    .doGet();
  return response;
};

const getTicketSoldCount = async (payload: string) => {
  const uri = API.getTicketSoldCount.get.replace(':eventId', payload);
  const response = await requestClient()
    .setUri(uri)
    .setAuthorizationStatus()
    .doGet();
  return response;
};

const updateTicketStatus = async (payload: {
  id: string;
  data: { status: number };
}) => {
  const uri = API.updateTicketStatus.put.replace(':userTicketId', payload.id);
  const response = await requestClient()
    .setUri(uri)
    .setAuthorizationStatus()
    .setPayload(payload.data)
    .doPut();
  return response;
};

const importTickets = async (payload: {
  id: string;
  data: ImportTicketProps[];
}) => {
  const uri = API.importTickets.post.replace(':eventId', payload.id);
  const response = await requestClient()
    .setUri(uri)
    .setAuthorizationStatus()
    .setPayload(payload.data)
    .doPost();
  return response;
};

export default {
  getTicketSoldList,
  getTicketSoldCount,
  updateTicketStatus,
  importTickets,
};
