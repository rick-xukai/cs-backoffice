import { useTranslation } from 'react-i18next';

import { MenuKeys } from './MenuKeys';
import { UserScreens } from '../../navigation/Screens';
import { IMenu } from '../../utils/menuRender';

const MenuList = (): IMenu[] => {
  const { t } = useTranslation();
  return [
    {
      key: MenuKeys.dashboard,
      title: t('Dashboard'),
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
    {
      key: MenuKeys.components,
      title: t('Components'),
      children: [
        {
          key: MenuKeys.uiElements,
          title: t('UI Elements'),
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
      ],
    },
  ];
};

export default MenuList;
