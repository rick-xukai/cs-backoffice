import React, { Fragment, memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Drawer,
  Row,
  Col,
  Typography,
  Radio,
  Divider,
  RadioChangeEvent,
} from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import _ from 'lodash';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectLayoutType,
  selectSidebarType,
  selectSidebarTheme,
  selectTopbarTheme,
  switchLayoutAction,
  switchSidebarTypeAction,
  switchSidebarThemeAction,
  switchTopbarThemeAction,
} from '../../app/layout.slice';
import {
  LayoutTypes,
  SidebarTypes,
  SidebarThemes,
  TopbarThemes,
} from '../../constants/Layout';

const { Text } = Typography;

const layoutOptions = _.map(Object.keys(LayoutTypes), (key: string) => ({
  label: _.upperFirst(_.get(LayoutTypes, `${key}`)),
  value: _.get(LayoutTypes, `${key}`),
}));

const sidebarTypesOptions = _.map(
  _.filter(
    Object.keys(SidebarTypes),
    (key: string) => key !== SidebarTypes.condensed,
  ),
  (key: string) => ({
    label: _.upperFirst(_.get(SidebarTypes, `${key}`)),
    value: _.get(SidebarTypes, `${key}`),
  }),
);

const sidebarThemesOptions = _.map(
  Object.keys(SidebarThemes),
  (key: string) => ({
    label: _.upperFirst(_.get(SidebarThemes, `${key}`)),
    value: _.get(SidebarThemes, `${key}`),
  }),
);

const topbarThemesOptions = _.map(Object.keys(TopbarThemes), (key: string) => ({
  label: _.upperFirst(_.get(TopbarThemes, `${key}`)),
  value: _.get(TopbarThemes, `${key}`),
}));

const SettingsDrawer = ({
  visible,
  toggleRightbar,
}: {
  visible: boolean;
  toggleRightbar: () => void;
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const layoutType = useAppSelector(selectLayoutType);
  const sidebarType = useAppSelector(selectSidebarType);
  const sidebarTheme = useAppSelector(selectSidebarTheme);
  const topbarTheme = useAppSelector(selectTopbarTheme);
  const onSwitchLayoutType = (e: RadioChangeEvent) => {
    dispatch(switchLayoutAction(e.target.value));
  };
  const onSwitchSidebarTheme = (e: RadioChangeEvent) => {
    dispatch(switchSidebarThemeAction(e.target.value));
  };
  const onSwitchSidebarType = (e: RadioChangeEvent) => {
    dispatch(switchSidebarTypeAction(e.target.value));
  };
  const onSwitchTopbarTheme = (e: RadioChangeEvent) => {
    dispatch(switchTopbarThemeAction(e.target.value));
  };
  return (
    <Drawer
      title={
        <Row justify="space-between" align="middle">
          <span>{t('Settings')}</span>
          <Button
            className="icon-btn"
            size="large"
            icon={<CloseCircleFilled />}
            onClick={toggleRightbar}
          />
        </Row>
      }
      placement="right"
      closable={false}
      onClose={toggleRightbar}
      visible={visible}
      width={280}
    >
      <Row justify="start" align="middle" gutter={[0, 8]}>
        <Col span={24}>
          <Text>{t('Layouts')}</Text>
        </Col>
        <Col span={24}>
          <Radio.Group
            options={layoutOptions}
            onChange={onSwitchLayoutType}
            value={layoutType}
            optionType="button"
            buttonStyle="solid"
          />
        </Col>
      </Row>
      <Divider />
      <Row justify="start" align="middle" gutter={[0, 8]}>
        <Col span={24}>
          <Text>{t('Topbar Theme')}</Text>
        </Col>
        <Col span={24}>
          <Radio.Group
            options={topbarThemesOptions}
            onChange={onSwitchTopbarTheme}
            value={topbarTheme}
            optionType="button"
            buttonStyle="solid"
          />
        </Col>
      </Row>
      {layoutType === LayoutTypes.veritical && (
        <Fragment>
          <Divider />
          <Row justify="start" align="middle" gutter={[0, 8]}>
            <Col span={24}>
              <Text>{t('Left Sidebar Type')}</Text>
            </Col>
            <Col span={24}>
              <Radio.Group
                options={sidebarTypesOptions}
                onChange={onSwitchSidebarType}
                value={sidebarType}
                optionType="button"
                buttonStyle="solid"
              />
            </Col>
          </Row>
          <Divider />
          <Row justify="start" align="middle" gutter={[0, 8]}>
            <Col span={24}>
              <Text>{t('Left Sidebar Color')}</Text>
            </Col>
            <Col span={24}>
              <Radio.Group
                options={sidebarThemesOptions}
                onChange={onSwitchSidebarTheme}
                value={sidebarTheme}
                optionType="button"
                buttonStyle="solid"
              />
            </Col>
          </Row>
        </Fragment>
      )}
    </Drawer>
  );
};

export default memo(SettingsDrawer);
