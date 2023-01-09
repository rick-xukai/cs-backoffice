import { RequestClientClass } from '../../../utils/requestClient';
import { API_SERVER } from '../../../constants/predicates';
import API from '../../../constants/API';

const requestClient = () => new RequestClientClass(API_SERVER);

const getUsersList = async (payload: any) => {
  const uri = API.getUsersList.get;
  const response = await requestClient()
    .setUri(uri)
    .setQueryParameter(payload)
    .doGet();
  return response;
};

const getUserDetail = async (payload: string) => {
  const uri = API.getUserDetail.get.replace('{userId}', payload);
  const response = await requestClient().setUri(uri).doGet();
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
    .doGet();
  return response;
};

export default { getUsersList, getUserDetail, getUserDetailTickets };
