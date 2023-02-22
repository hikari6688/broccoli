import React, { useState, useRef, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Response } from '@/utils/request';

interface Options<TData, TParams> {
  defaultParams?: TParams;
  manual?: boolean;
  loadingDelay?: number;
  debounceTime?: number;
  throttleTime?: number;
  retryCount?: number;
  onSuccess?: (data: TData | undefined, params: TParams | undefined) => void;
  onError?: (e: any, params: TParams | undefined) => void;
  onFinally?: (params: TParams | undefined, data?: TData, err?: any) => void;
}

interface PromiseResponse<T> extends AxiosResponse {
  data: Response<T>;
}

function useRequest<TData, TParams extends any[]>(
  request: (...params: TParams) => Promise<PromiseResponse<TData>>,
  options?: Options<TData, TParams>,
) {

  const { CancelToken } = axios;
  const source = CancelToken.source();
  const [data, setData] = useState<TData>();
  const [loading, setLoading] = useState<boolean>(false);
  const requestRef = useRef(request);
  const paramsRef = useRef<TParams>();
  const errorRef = useRef<any>();
  const timerRef = useRef<NodeJS.Timer>();
  const retryTimes = useRef<number>(0);
  const pendingRef = useRef<number>(0);
  if (!options) options = {};
  const {
    manual,
    defaultParams,
    loadingDelay,
    debounceTime,
    throttleTime,
    retryCount,
    onSuccess,
    onError,
    onFinally,
  } = options;
  async function run(...params: TParams): Promise<PromiseResponse<TData>> {
    let timer: NodeJS.Timer;
    return new Promise(async (resolve, reject) => {
      try {
        paramsRef.current = params;
        if (loadingDelay) {
          timerRef.current = setInterval(() => {
            pendingRef.current++;
          }, 1000);
        } else {
          setLoading(true);
        }
        const result = await requestRef.current(...params);
        timerRef.current && clearInterval(timerRef.current);

        if (loadingDelay && pendingRef.current > loadingDelay) {
          setLoading(true);
        }

        setData(result?.data?.data);
        onSuccess && onSuccess(data, params);
        return resolve(result);
      } catch (error) {
        errorRef.current = error;
        onError && onError(error, paramsRef.current);
        if (retryCount && retryTimes.current < retryCount) {
          retryTimes.current++;
          return run(...params);
        } else {
          retryTimes.current = 0;
          return reject(error);
        }
      } finally {
        setLoading(false);
        onFinally && onFinally(paramsRef.current, data, errorRef.current);
        timer && clearInterval(timer);
      }
    });
  }

  function cancel() {
    source.cancel();
    setLoading(false);
  }

  function refresh() {
    run(...(paramsRef.current as TParams));
  }

  useEffect(() => {
    if (!manual) {
      run(...((defaultParams || []) as TParams));
    }
  }, []);

  return { data, loading, run, cancel, refresh };
}

export default useRequest;
