import { RequestClientClass } from '../../../utils/requestClient';
import { API_SERVER } from '../../../constants/predicates';
import API from '../../../constants/API';

const requestClient = () => new RequestClientClass(API_SERVER);

const getTransactionsList = async (payload: any) => {
  const uri = API.getTransactionsList.get;
  const response = await requestClient()
    .setUri(uri)
    .setQueryParameter(payload)
    .setAuthorizationStatus()
    .doGet();
  return response;
};

const getTransactionDetail = async (payload: string) => {
  const uri = API.transactions.get.replace('{transactionId}', payload);
  const response = await requestClient()
    .setUri(uri)
    .setAuthorizationStatus()
    .doGet();
  return response;
};

const changeTransactionsStatus = async (payload: any) => {
  const uri = API.transactions.post;
  const response = await requestClient()
    .setUri(uri)
    .setPayload(payload)
    .setAuthorizationStatus()
    .doPost();
  return response;
};

export default {
  getTransactionsList,
  changeTransactionsStatus,
  getTransactionDetail,
};
