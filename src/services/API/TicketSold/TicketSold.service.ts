import { RequestClientClass } from '../../../utils/requestClient';
import { API_SERVER } from '../../../constants/predicates';
import API from '../../../constants/API';

const requestClient = () => new RequestClientClass(API_SERVER);

const getTicketSoldList = async (payload: any) => {
  const uri = API.getTicketSoldList.get.replace(':event_id', payload.id);
  const response = await requestClient()
    .setUri(uri)
    .setQueryParameter(payload)
    .setAuthorizationStatus()
    .doGet();
  return response;
};

export default {
  getTicketSoldList,
};
