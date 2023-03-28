import { RequestClientClass } from '../../../utils/requestClient';
import { API_SERVER } from '../../../constants/predicates';
import API from '../../../constants/API';

const requestClient = () => new RequestClientClass(API_SERVER);

const getTicketsList = async (payload: any) => {
  const uri = API.getTicketsList.get;
  const response = await requestClient()
    .setUri(uri)
    .setQueryParameter(payload)
    .setAuthorizationStatus()
    .doGet();
  return response;
};

const getTicketsDetail = async (payload: { userTicketId: string }) => {
  const uri = API.ticketsDetail.get.replace(
    '{userTicketId}',
    payload.userTicketId,
  );
  const response = await requestClient()
    .setUri(uri)
    .setAuthorizationStatus()
    .doGet();
  return response;
};

const updateTicketsDetail = async (payload: {
  userTicketId: string;
  data: { status: number };
}) => {
  const uri = API.ticketsDetail.put.replace(
    '{userTicketId}',
    payload.userTicketId,
  );
  const response = await requestClient()
    .setUri(uri)
    .setPayload(payload.data)
    .setAuthorizationStatus()
    .doPut();
  return response;
};

export default { getTicketsList, getTicketsDetail, updateTicketsDetail };
