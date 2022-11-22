import { RequestClientClass } from '../../../utils/requestClient';
import { API_SERVER } from '../../../constants/predicates';
import API from '../../../constants/API';

const requestClient = () => new RequestClientClass(API_SERVER);

const getEventsList = async (payload: any) => {
  const uri = API.getEventsList.get;
  const response = await requestClient()
    .setUri(uri)
    .setQueryParameter(payload)
    .doGet();
  return response;
};

export default { getEventsList };
