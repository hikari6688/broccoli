import React, { useEffect, useState } from 'react';
import { request } from './utils/request';
import useRequest from '@/hooks/useRequest';
import './index.css'
function getUserList(name: string, age: number) {
  console.log({ name, age });
  return request<string>({
    url: '/api/blade-system/getSystemInfo',
    method: 'get',
    data: {
      name,
      age,
    },
  });
}

function App() {
  const { data, run, loading } = useRequest<string, [string, number]>(
    getUserList,
    {
      retryCount: 3,
      manual: true,
      loadingDelay: 500000,
    },
  );
  const [value, setValue] = useState<number>(0);
  return (
    <div id='app'>
      {/* <p>{JSON.stringify(loading)}</p>
      <button onClick={() => {
        setValue( Math.random() );
        run('name',0)
      }}>x</button> */}
      {/* <iframe
        style={{ width: '100%', height: '100%', border: 'none' }}
        src="http://10.113.229.57:1888"
      ></iframe> */}
      <div className='p1'></div>
      <div className='p2'></div>
    </div>
  );
}

export default App;
