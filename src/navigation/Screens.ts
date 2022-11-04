import { UserRoutes, AuthRoutes } from './Routes';
// User featuers
import Dashboard from '../features/Dashboard';
import TablesBasic from '../features/Tables/Basic';
import TablesResponsive from '../features/Tables/Responsive';
import TablesControlColumn from '../features/Tables/ControlColumn';
import FormsColors from '../features/Forms/Colors';
import FormsElements from '../features/Forms/Elements';
import FormsLayouts from '../features/Forms/Layouts';
import FormsValidation from '../features/Forms/Validation';
import FormsUpload from '../features/Forms/Upload';
import FormsWizard from '../features/Forms/Wizard';
import UIAlerts from '../features/UIElements/UIAlerts';
import UICards from '../features/UIElements/UICards';
import UIProgress from '../features/UIElements/UIProgress';
import UITypography from '../features/UIElements/UITypography';
import UIRates from '../features/UIElements/UIRates';
import UINotification from '../features/UIElements/UINotification';
// Auth features
import Login from '../features/Authentication/Login';
import Register from '../features/Authentication/Register';
import { MenuKeys as hMenuKeys } from '../components/HorizontalLayout/MenuKeys';
import { MenuKeys as vMenuKeys } from '../components/VerticalLayout/MenuKeys';

export const UserScreens = {
  Dashboard: {
    title: 'Dashboard - Imaginato UI',
    path: UserRoutes.dashboard,
    component: Dashboard,
    subMenuKeys: [vMenuKeys.menu, vMenuKeys.dashboard],
    menuKeys: [vMenuKeys.dashboardDefault],
    hMenuKeys: [hMenuKeys.dashboardDefault],
    guard: true,
  },
  DashboardSaas: {
    title: 'Saas Dashboard - Imaginato UI',
    path: UserRoutes.dashboardSaas,
    component: Dashboard,
    subMenuKeys: [vMenuKeys.menu, vMenuKeys.dashboard],
    menuKeys: [vMenuKeys.dashboardSaas],
    hMenuKeys: [hMenuKeys.dashboardSaas],
    guard: true,
  },
  FormsColors: {
    title: 'Form Colors - Forms - Imaginato UI',
    path: UserRoutes.forms.colors,
    component: FormsColors,
    subMenuKeys: [vMenuKeys.components, vMenuKeys.forms],
    menuKeys: [vMenuKeys.formsColors],
    hMenuKeys: [hMenuKeys.formsColors],
    guard: true,
  },
  FormsElements: {
    title: 'Form Elements - Forms - Imaginato UI',
    path: UserRoutes.forms.elements,
    component: FormsElements,
    subMenuKeys: [vMenuKeys.components, vMenuKeys.forms],
    menuKeys: [vMenuKeys.formsElements],
    hMenuKeys: [hMenuKeys.formsElements],
    guard: true,
  },
  FormsLayouts: {
    title: 'Form Layouts - Forms - Imaginato UI',
    path: UserRoutes.forms.layouts,
    component: FormsLayouts,
    subMenuKeys: [vMenuKeys.components, vMenuKeys.forms],
    menuKeys: [vMenuKeys.formsLayouts],
    hMenuKeys: [hMenuKeys.formsLayouts],
    guard: true,
  },
  FormsValidation: {
    title: 'Form Validation - Forms - Imaginato UI',
    path: UserRoutes.forms.validation,
    component: FormsValidation,
    subMenuKeys: [vMenuKeys.components, vMenuKeys.forms],
    menuKeys: [vMenuKeys.formsValidation],
    hMenuKeys: [hMenuKeys.formsValidation],
    guard: true,
  },
  FormsUpload: {
    title: 'Form Upload - Forms - Imaginato UI',
    path: UserRoutes.forms.upload,
    component: FormsUpload,
    subMenuKeys: [vMenuKeys.components, vMenuKeys.forms],
    menuKeys: [vMenuKeys.formsUpload],
    hMenuKeys: [hMenuKeys.formsUpload],
    guard: true,
  },
  FormsWizard: {
    title: 'Form Wizard - Forms - Imaginato UI',
    path: UserRoutes.forms.wizard,
    component: FormsWizard,
    subMenuKeys: [vMenuKeys.components, vMenuKeys.forms],
    menuKeys: [vMenuKeys.formsWizard],
    hMenuKeys: [hMenuKeys.formsWizard],
    guard: true,
  },
  TablesBasic: {
    title: 'Basic Tables - Imaginato UI',
    path: UserRoutes.tablesBasic,
    component: TablesBasic,
    subMenuKeys: [vMenuKeys.components, vMenuKeys.tables],
    menuKeys: [vMenuKeys.tablesBasic],
    hMenuKeys: [hMenuKeys.tablesBasic],
    guard: true,
  },
  TablesResponsive: {
    title: 'Responsive Tables - Imaginato UI',
    path: UserRoutes.tablesResponsive,
    component: TablesResponsive,
    subMenuKeys: [vMenuKeys.components, vMenuKeys.tables],
    menuKeys: [vMenuKeys.tablesResponsive],
    hMenuKeys: [hMenuKeys.tablesResponsive],
    guard: true,
  },
  TablesControlColumn: {
    title: 'Control Column Tables - Imaginato UI',
    path: UserRoutes.tablesControlColumn,
    component: TablesControlColumn,
    subMenuKeys: [vMenuKeys.components, vMenuKeys.tables],
    menuKeys: [vMenuKeys.tablesControlColumn],
    hMenuKeys: [hMenuKeys.tablesControlColumn],
    guard: true,
  },
  UIAlerts: {
    title: 'UI Alerts - UI Elements - Imaginato UI',
    path: UserRoutes.uielements.uiAlerts,
    component: UIAlerts,
    subMenuKeys: [vMenuKeys.components, vMenuKeys.uiElements],
    menuKeys: [vMenuKeys.uiElementsAlerts],
    hMenuKeys: [hMenuKeys.uiElementsAlerts],
    guard: true,
  },
  UICards: {
    title: 'UI Cards - UI Elements - Imaginato UI',
    path: UserRoutes.uielements.uiCards,
    component: UICards,
    subMenuKeys: [vMenuKeys.components, vMenuKeys.uiElements],
    menuKeys: [vMenuKeys.uiElementsCards],
    hMenuKeys: [hMenuKeys.uiElementsCards],
    guard: true,
  },
  UIProgress: {
    title: 'UI Progress - UI Elements - Imaginato UI',
    path: UserRoutes.uielements.uiProgress,
    component: UIProgress,
    subMenuKeys: [vMenuKeys.components, vMenuKeys.uiElements],
    menuKeys: [vMenuKeys.uiElementsProgress],
    hMenuKeys: [hMenuKeys.uiElementsProgress],
    guard: true,
  },
  UITypography: {
    title: 'UI Typography - UI Elements - Imaginato UI',
    path: UserRoutes.uielements.uiTypography,
    component: UITypography,
    subMenuKeys: [vMenuKeys.components, vMenuKeys.uiElements],
    menuKeys: [vMenuKeys.uiElementsTypography],
    hMenuKeys: [hMenuKeys.uiElementsTypography],
    guard: true,
  },
  UIRates: {
    title: 'UI Rates - UI Elements - Imaginato UI',
    path: UserRoutes.uielements.uiRates,
    component: UIRates,
    subMenuKeys: [vMenuKeys.components, vMenuKeys.uiElements],
    menuKeys: [vMenuKeys.uiElementsRates],
    hMenuKeys: [hMenuKeys.uiElementsRates],
    guard: true,
  },
  UINotification: {
    title: 'UI Notification - UI Elements - Imaginato UI',
    path: UserRoutes.uielements.uiNotification,
    component: UINotification,
    subMenuKeys: [vMenuKeys.components, vMenuKeys.uiElements],
    menuKeys: [vMenuKeys.uiElementsNotification],
    hMenuKeys: [hMenuKeys.uiElementsNotification],
    guard: true,
  },
  Home: {
    title: 'Home - Imaginato UI',
    path: UserRoutes.home,
    component: null,
    guard: false,
    exact: true,
  },
};

export const AuthScreens = {
  Login: {
    title: 'Login - Imaginato UI',
    path: AuthRoutes.login,
    component: Login,
    guard: false,
  },
  register: {
    title: 'Register - Imaginato UI',
    path: AuthRoutes.register,
    component: Register,
    guard: false,
  },
};
