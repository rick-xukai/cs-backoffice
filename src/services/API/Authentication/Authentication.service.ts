import { RequestClientClass } from '../../../utils/requestClient';
import { API_SERVER } from '../../../constants/predicates';
import API from '../../../constants/API';
import { LoginPayload } from '../../../features/Authentication/Login/Login.slice';
import { RegisterPayload } from '../../../features/Authentication/Register/Register.slice';

const requestClient = () => new RequestClientClass(API_SERVER);

const doLogin = async (payload: LoginPayload) => {
  const uri = API.login.post;
  const response = await requestClient()
    .setUri(uri)
    .setPayload(payload)
    .doPost();
  return response;
};

const doRegister = async (payload: RegisterPayload) => {
  const uri = API.register.post;
  const response = await requestClient()
    .setUri(uri)
    .setPayload(payload)
    .doPost();
  return response;
};
export default {
  doLogin,
  doRegister,
};
