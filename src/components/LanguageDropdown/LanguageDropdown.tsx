import React, { useState, useEffect, useMemo } from 'react';
import { Menu, Dropdown, Space } from 'antd';
import _ from 'lodash';

import { LocalStorageKeys } from '../../constants/Keys';
import i18n from '../../i18n';
import Languages from '../../constants/Languages';
import { useLocalStorage } from '../../hooks';

const LanguageDropdown = () => {
  const localStorage = useLocalStorage();
  const [lang, setLang] = useState('');
  useEffect(() => {
    const currentLanguage =
      localStorage.getItem(LocalStorageKeys.i18nLanguage) || '';
    setLang(currentLanguage);
  }, []);

  const changeLanguageAction = (l: string) => {
    i18n.changeLanguage(l);
    localStorage.setItem(LocalStorageKeys.i18nLanguage, l);
    setLang(l);
  };

  const menu = useMemo(
    () => (
      <Menu>
        {_.map(Object.keys(Languages), (key: string) => (
          <Menu.Item
            className="flag-item"
            key={key}
            onClick={() => changeLanguageAction(key)}
          >
            <Space size={4}>
              <img
                src={_.get(Languages, `${key}.flag`)}
                alt={`flag-${key}`}
                height="12"
              />
              <span>{_.get(Languages, `${key}.label`)}</span>
            </Space>
          </Menu.Item>
        ))}
      </Menu>
    ),
    [Languages],
  );
  return (
    <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
      <div className="lang-dropdown">
        <img
          src={_.get(Languages, `${lang}.flag`)}
          alt={`flag-${lang}`}
          height="16"
        />
        <span>{_.get(Languages, `${lang}.label`)}</span>
      </div>
    </Dropdown>
  );
};

export default LanguageDropdown;
