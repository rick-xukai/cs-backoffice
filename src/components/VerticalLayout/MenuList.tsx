import React from 'react';
import {
  HomeOutlined,
  GlobalOutlined,
  UnorderedListOutlined,
  FormOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { MenuKeys } from './MenuKeys';
import { UserScreens } from '../../navigation/Screens';
import { IMenu } from '../../utils/menuRender';

const MenuList = (): IMenu[] => {
  const { t } = useTranslation();
  return [
    {
      key: MenuKeys.menu,
      title: t('Menu'),
      isGroup: true,
      children: [
        {
          key: MenuKeys.dashboard,
          title: t('Dashboard'),
          icon: <HomeOutlined />,
          children: [
            {
              key: MenuKeys.dashboardDefault,
              title: t('Default'),
              path: UserScreens.Dashboard.path,
            },
            {
              key: MenuKeys.dashboardSaas,
              title: t('Saas'),
              path: UserScreens.Dashboard.path,
            },
          ],
        },
      ],
    },
    {
      key: MenuKeys.components,
      title: t('Components'),
      isGroup: true,
      children: [
        {
          key: MenuKeys.uiElements,
          title: t('UI Elements'),
          icon: <UnorderedListOutlined />,
          children: [
            {
              key: MenuKeys.uiElementsAlerts,
              title: t('Alerts'),
              path: UserScreens.UIAlerts.path,
            },
            {
              key: MenuKeys.uiElementsCards,
              title: t('Cards'),
              path: UserScreens.UICards.path,
            },
            {
              key: MenuKeys.uiElementsProgress,
              title: t('Progress Bars'),
              path: UserScreens.UIProgress.path,
            },
            {
              key: MenuKeys.uiElementsTypography,
              title: t('Typography'),
              path: UserScreens.UITypography.path,
            },
            {
              key: MenuKeys.uiElementsRates,
              title: t('Rating'),
              path: UserScreens.UIRates.path,
            },
            {
              key: MenuKeys.uiElementsNotification,
              title: t('Notifications'),
              path: UserScreens.UINotification.path,
            },
          ],
        },
        {
          key: MenuKeys.forms,
          title: t('Forms'),
          icon: <FormOutlined />,
          children: [
            {
              key: MenuKeys.formsColors,
              title: t('Form Colors'),
              path: UserScreens.FormsColors.path,
            },
            {
              key: MenuKeys.formsElements,
              title: t('Form Elements'),
              path: UserScreens.FormsElements.path,
            },
            {
              key: MenuKeys.formsLayouts,
              title: t('Form Layouts'),
              path: UserScreens.FormsLayouts.path,
            },
            {
              key: MenuKeys.formsValidation,
              title: t('Form Validation'),
              path: UserScreens.FormsValidation.path,
            },
            {
              key: MenuKeys.formsUpload,
              title: t('Form File Upload'),
              path: UserScreens.FormsUpload.path,
            },
            {
              key: MenuKeys.formsWizard,
              title: t('Form Wizard'),
              path: UserScreens.FormsWizard.path,
            },
          ],
        },
        {
          key: MenuKeys.tables,
          title: t('Tables'),
          icon: <GlobalOutlined />,
          children: [
            {
              key: MenuKeys.tablesBasic,
              title: t('Basic Tables'),
              path: UserScreens.TablesBasic.path,
            },
            {
              key: MenuKeys.tablesResponsive,
              title: t('Responsive Table'),
              path: UserScreens.TablesResponsive.path,
            },
            {
              key: MenuKeys.tablesControlColumn,
              title: t('Control Column'),
              path: UserScreens.TablesControlColumn.path,
            },
          ],
        },
      ],
    },
  ];
};

export default MenuList;
