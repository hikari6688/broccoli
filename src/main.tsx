import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { I18nProvider } from '@/context/i18n';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider>
      <I18nProvider>
        <iframe
          style={{ width: '100%', height: '100%', border: 'none' }}
          src="http://10.113.229.57:1888"
        ></iframe>
      </I18nProvider>
    </ConfigProvider>
  </React.StrictMode>,
);
