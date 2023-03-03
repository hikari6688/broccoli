import React, { useState, useEffect, FC, PropsWithChildren } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
declare type lan = 'cn' | 'en' | 'jp';

export const I18nProvider: FC = (props: PropsWithChildren) => {
  const [lan, setLan] = useState<lan>('cn');
  const [i18nJson, setI18nJson] = useState<Record<string, any>>();
  const I18nContext = React.createContext(i18nJson);
  async function fetchI18n() {
    const i18nJson = await import('@/config/i18n/cn.json');
    console.log(i18nJson)
    setI18nJson(i18nJson);
  }

  function translate(key: string, slot?: Record<string, string>) {
    if(slot){
    }
  }

  useEffect(() => {
    fetchI18n();
    translate('name');
  }, [lan]);

  return (
    <I18nContext.Provider value={{ setLan, lan, $t: translate }}>
      {props.children}
    </I18nContext.Provider>
  );
};

/**
 * $t('name',{ age:'22' })
 */
