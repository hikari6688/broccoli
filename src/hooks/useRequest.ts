import React, { useState, useRef } from 'react';
import axios, { AxiosResponse } from 'axios';

interface IRequestConfig<TParams, TData> {
  defaultParams?: TParams;
  manual?: boolean;
  loadingDelay?: number;
  debounceTime?: number;
  throttleTime?: number;
  retryCount?: number;
  onBefore?: (params: TParams) => void;
  onSuccess?: (data: TData, params: TParams) => void;
  onError?: (e: Error, params: TParams) => void;
  onFinally?: (params: TParams, data?: TData, e?: Error) => void;
}

interface IResponse<T> extends AxiosResponse {
  [responseArg: string]: any;
  data: {
    [responseDataParams: string]: any;
    data: T;
  };
}

export function useRequest<TParams, TResponse>(
  request: (params: TParams | []) => Promise<IResponse<TResponse>>,
  requestConfig: IRequestConfig<TParams, TResponse> = {},
) {
  const { CancelToken } = axios;
  const source = CancelToken.source();
  const [state, setState] = useState<TResponse>();
  const [loading, setLoading] = useState<boolean>(false);
  const paramsRef = useRef<{ current: TParams }>();
  const {
    manual,
    defaultParams,
    loadingDelay,
    debounceTime,
    throttleTime,
    retryCount,
  } = requestConfig;

  async function run(...params: TParams): Promise<TResponse> {

  }

  function cancel(): void {
    source.cancel();
  }

  function refresh() {
    run(paramsRef.current);
  }
  if (!manual) {
    run(defaultParams);
  }
  return { state, loading, run, cancel, refresh };
}
