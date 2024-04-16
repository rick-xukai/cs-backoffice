/* eslint-disable */
import axios from 'axios';
import Cookies from 'universal-cookie';
import { message } from 'antd';

import { AuthorizationType } from '../constants/API';
import { CookieKeys } from '../constants/Keys';
import { PREFIX } from '../constants/predicates';

export const defaultHeaders = {
  'content-type': 'application/json',
  'x-api-key': process.env.REACT_APP_API_KEY,
};

const defaultOptions = {
  method: 'GET',
  headers: defaultHeaders,
};

/**
 * Construct URL based on provided URL and possible GET parameter.
 * @param baseUrl
 * @param params
 * @returns {string}
 */
export const constructUrlGetParameters = (baseUrl: string, params: any) => {
  const result = Object.keys(params).map((key) => {
    if (params[key]) {
      return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
    }
  });

  const queryString = result.length ? `?${result.join('&')}` : '';
  return `${baseUrl}${queryString}`;
};

export class RequestClientClass {
  baseUrl: string | undefined;
  fetch: typeof axios;
  headers: any;
  payload: any;
  uri: string;
  queryUrl: any;
  requireHeadersReturn: boolean;
  authorizationStatus: boolean;
  private readonly cookies: Cookies = new Cookies();

  constructor(baseUrl: string | undefined, fetch = axios) {
    this.baseUrl = baseUrl;
    this.fetch = fetch;
    this.headers = defaultOptions.headers;
    this.payload = '';
    this.uri = '';
    this.queryUrl = {};
    this.requireHeadersReturn = false;
    this.authorizationStatus = false;
  }

  /**
   * Trim up extra space, and leading slash
   * @param string
   */
  static clean(string: string | undefined) {
    if (typeof string === 'string') {
      return string.trim().replace(/\/$/, '');
    }
    return string;
  }

  setUri(uri: string) {
    this.uri = uri;
    return this;
  }

  setHeaders(headers: any) {
    this.headers = { ...this.headers, ...headers };
    return this;
  }

  setPayload(payload: any) {
    this.payload = payload;
    return this;
  }

  /**
   * Set Get Parameter
   * @param {Object} queryUrl
   * @returns {HttpClient}
   */
  setQueryParameter(queryUrl: any) {
    if (typeof queryUrl === 'object') {
      Object.keys(queryUrl).forEach((key) => {
        this.setQueryParameterUrl(key, queryUrl[key]);
      });
    }
    return this;
  }

  setQueryParameterUrl(key: string, value: string) {
    this.queryUrl[key] = value;
    return this;
  }

  constructFQDN() {
    const uri = [this.baseUrl, this.uri]
      .map(RequestClientClass.clean)
      .filter(Boolean)
      .join('/');

    return constructUrlGetParameters(uri, this.queryUrl);
  }

  setRequireHeadersReturn(value: boolean) {
    this.requireHeadersReturn = value;
    return this;
  }

  setAuthorizationStatus() {
    this.authorizationStatus = true;
    return this;
  }

  async doMethod(method = 'GET') {
    if (this.authorizationStatus) {
      const userToken = this.cookies.get(`${PREFIX}${CookieKeys.authUser}`);
      const userNotActiveToken = this.cookies.get(
        `${PREFIX}${CookieKeys.userNotActiveToken}`,
      );
      if (userToken) {
        this.setHeaders({
          authorization: `${AuthorizationType.bearer} ${userToken}`,
        });
      } else {
        this.setHeaders({
          authorization: `${AuthorizationType.bearer} ${userNotActiveToken}`,
        });
      }
      if (!userToken && !userNotActiveToken) {
        this.cookies.remove(`${PREFIX}${CookieKeys.authUser}`);
        this.cookies.remove(`${PREFIX}${CookieKeys.userNotActiveToken}`);
        message.error('The token has expired, please login again');
        return;
      }
    }
    const options: any = {
      baseURL: this.baseUrl,
      url: this.uri,
      ...defaultOptions,
      headers: {
        ...this.headers,
      },
      method,
    };

    if (method === 'GET') {
      options.params = this.queryUrl;
    }

    if (
      method === 'POST' ||
      method === 'PUT' ||
      method === 'DELETE' ||
      method === 'PATCH'
    ) {
      options.data = this.payload;
    }

    const response = await this.fetch(options);
    if (response.status >= 400) {
      throw new Error(`Response error: ${this.uri}`);
    }

    const finalResponse = response.data;
    if (this.requireHeadersReturn) {
      const finalHeaders = {
        ...response.headers,
        ...finalResponse.headers,
      };
      finalResponse.headers = finalHeaders;
    }
    return finalResponse;
  }

  doPost() {
    return this.doMethod('POST');
  }

  doPut() {
    return this.doMethod('PUT');
  }

  doGet() {
    return this.doMethod('GET');
  }

  doDelete() {
    return this.doMethod('DELETE');
  }

  doPatch() {
    return this.doMethod('PATCH');
  }
}
