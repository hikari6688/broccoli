import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { tokenKey } from '@/config/index';
import useLocalStorage from '@/hooks/useLocalStorage';

export interface Response<T> {
  [restArgs: string]: any;
  data: T;
}

const baseURL = '/';
const instance = axios.create({
  baseURL,
  timeout: 15 * 1000,
});

instance.interceptors.request.use(function (config: AxiosRequestConfig) {
  // const [token] = useLocalStorage<string>(tokenKey);
  // if (!config.headers) config.headers = {};
  // config.headers[tokenKey] = token;
  return config;
});

instance.interceptors.response.use(function (response) {
  return response;
});


export function request<T>(config: AxiosRequestConfig) {
  return instance.request<Response<T>>(config);
}
