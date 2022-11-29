import { RequestClientClass } from '../../../utils/requestClient';
import { API_SERVER } from '../../../constants/predicates';
import API from '../../../constants/API';

const requestClient = () => new RequestClientClass(API_SERVER);

const getTicketsList = async (payload: any) => {
  const uri = API.getTicketsList.get;
  const response = await requestClient()
    .setUri(uri)
    .setQueryParameter(payload)
    .doGet();
  return response;
};

const getTicketsDetail = async (payload: string) => {
  const uri = API.ticketsDetail.get;
  const response = await requestClient()
    .setUri(uri)
    .setQueryParameter(payload)
    .doGet();
  return response;
};

const updateTicketsDetail = async (payload: any) => {
  const uri = API.ticketsDetail.put;
  const response = await requestClient()
    .setUri(uri)
    .setPayload(payload)
    .doPut();
  return response;
};

export default { getTicketsList, getTicketsDetail, updateTicketsDetail };
