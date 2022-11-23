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

export default { getTicketsList };
