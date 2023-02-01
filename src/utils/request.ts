import axios, { AxiosRequestConfig } from 'axios';
import { tokenKey } from '@/conf/index';
import useLocalStorage from '@/hooks/useLocalStorage';
const baseURL = '/api';
const instance = axios.create({
  baseURL,
  timeout: 15 * 1000,
});

instance.interceptors.request.use(function (config: AxiosRequestConfig) {
  const [token] = useLocalStorage<string>(tokenKey);
  if (!config.headers) config.headers = {};
  config.headers[tokenKey] = token;
  return config;
});

instance.interceptors.response.use(function (response) {
  return response;
});

export default instance.request;
