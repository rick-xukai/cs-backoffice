import { UserRoutes, AuthRoutes } from './Routes';
// User features
import Dashboard from '../features/Dashboard/Loadable';
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
import Events from '../features/Events/Loadable';
import Tickets from '../features/Tickets/Loadable';
// Auth features
import Login from '../features/Authentication/Login/Loadable';
import Register from '../features/Authentication/Register/Loadable';
import { MenuKeys as hMenuKeys } from '../components/HorizontalLayout/MenuKeys';
import { MenuKeys as vMenuKeys } from '../components/VerticalLayout/MenuKeys';

export const UserScreens = {
  Dashboard: {
    title: 'Dashboard - CrowdServe BO',
    headerBarTitle: 'Dashboard',
    path: UserRoutes.dashboard,
    component: Dashboard,
    subMenuKeys: [vMenuKeys.menu, vMenuKeys.dashboard],
    menuKeys: [vMenuKeys.dashboardDefault],
    hMenuKeys: [hMenuKeys.dashboardDefault],
    guard: true,
  },
  DashboardSaas: {
    title: 'Saas Dashboard - CrowdServe BO',
    path: UserRoutes.dashboardSaas,
    component: Dashboard,
    subMenuKeys: [vMenuKeys.menu, vMenuKeys.dashboard],
    menuKeys: [vMenuKeys.dashboardSaas],
    hMenuKeys: [hMenuKeys.dashboardSaas],
    guard: true,
  },
  FormsColors: {
    title: 'Form Colors - Forms - CrowdServe BO',
    path: UserRoutes.forms.colors,
    component: FormsColors,
    subMenuKeys: [vMenuKeys.components, vMenuKeys.forms],
    menuKeys: [vMenuKeys.formsColors],
    hMenuKeys: [hMenuKeys.formsColors],
    guard: true,
  },
  FormsElements: {
    title: 'Form Elements - Forms - CrowdServe BO',
    path: UserRoutes.forms.elements,
    component: FormsElements,
    subMenuKeys: [vMenuKeys.components, vMenuKeys.forms],
    menuKeys: [vMenuKeys.formsElements],
    hMenuKeys: [hMenuKeys.formsElements],
    guard: true,
  },
  FormsLayouts: {
    title: 'Form Layouts - Forms - CrowdServe BO',
    path: UserRoutes.forms.layouts,
    component: FormsLayouts,
    subMenuKeys: [vMenuKeys.components, vMenuKeys.forms],
    menuKeys: [vMenuKeys.formsLayouts],
    hMenuKeys: [hMenuKeys.formsLayouts],
    guard: true,
  },
  FormsValidation: {
    title: 'Form Validation - Forms - CrowdServe BO',
    path: UserRoutes.forms.validation,
    component: FormsValidation,
    subMenuKeys: [vMenuKeys.components, vMenuKeys.forms],
    menuKeys: [vMenuKeys.formsValidation],
    hMenuKeys: [hMenuKeys.formsValidation],
    guard: true,
  },
  FormsUpload: {
    title: 'Form Upload - Forms - CrowdServe BO',
    path: UserRoutes.forms.upload,
    component: FormsUpload,
    subMenuKeys: [vMenuKeys.components, vMenuKeys.forms],
    menuKeys: [vMenuKeys.formsUpload],
    hMenuKeys: [hMenuKeys.formsUpload],
    guard: true,
  },
  FormsWizard: {
    title: 'Form Wizard - Forms - CrowdServe BO',
    path: UserRoutes.forms.wizard,
    component: FormsWizard,
    subMenuKeys: [vMenuKeys.components, vMenuKeys.forms],
    menuKeys: [vMenuKeys.formsWizard],
    hMenuKeys: [hMenuKeys.formsWizard],
    guard: true,
  },
  UIAlerts: {
    title: 'UI Alerts - UI Elements - CrowdServe BO',
    path: UserRoutes.uielements.uiAlerts,
    component: UIAlerts,
    subMenuKeys: [vMenuKeys.components, vMenuKeys.uiElements],
    menuKeys: [vMenuKeys.uiElementsAlerts],
    hMenuKeys: [hMenuKeys.uiElementsAlerts],
    guard: true,
  },
  UICards: {
    title: 'UI Cards - UI Elements - CrowdServe BO',
    path: UserRoutes.uielements.uiCards,
    component: UICards,
    subMenuKeys: [vMenuKeys.components, vMenuKeys.uiElements],
    menuKeys: [vMenuKeys.uiElementsCards],
    hMenuKeys: [hMenuKeys.uiElementsCards],
    guard: true,
  },
  UIProgress: {
    title: 'UI Progress - UI Elements - CrowdServe BO',
    path: UserRoutes.uielements.uiProgress,
    component: UIProgress,
    subMenuKeys: [vMenuKeys.components, vMenuKeys.uiElements],
    menuKeys: [vMenuKeys.uiElementsProgress],
    hMenuKeys: [hMenuKeys.uiElementsProgress],
    guard: true,
  },
  UITypography: {
    title: 'UI Typography - UI Elements - CrowdServe BO',
    path: UserRoutes.uielements.uiTypography,
    component: UITypography,
    subMenuKeys: [vMenuKeys.components, vMenuKeys.uiElements],
    menuKeys: [vMenuKeys.uiElementsTypography],
    hMenuKeys: [hMenuKeys.uiElementsTypography],
    guard: true,
  },
  UIRates: {
    title: 'UI Rates - UI Elements - CrowdServe BO',
    path: UserRoutes.uielements.uiRates,
    component: UIRates,
    subMenuKeys: [vMenuKeys.components, vMenuKeys.uiElements],
    menuKeys: [vMenuKeys.uiElementsRates],
    hMenuKeys: [hMenuKeys.uiElementsRates],
    guard: true,
  },
  UINotification: {
    title: 'UI Notification - UI Elements - CrowdServe BO',
    path: UserRoutes.uielements.uiNotification,
    component: UINotification,
    subMenuKeys: [vMenuKeys.components, vMenuKeys.uiElements],
    menuKeys: [vMenuKeys.uiElementsNotification],
    hMenuKeys: [hMenuKeys.uiElementsNotification],
    guard: true,
  },
  Home: {
    title: 'Home - CrowdServe BO',
    path: UserRoutes.home,
    component: null,
    guard: false,
    exact: true,
  },
  Events: {
    title: 'Events - CrowdServe BO',
    headerBarTitle: 'Events',
    path: UserRoutes.events,
    component: Events,
    subMenuKeys: [vMenuKeys.menu, vMenuKeys.events],
    menuKeys: [vMenuKeys.events],
    guard: true,
  },
  Tickets: {
    title: 'Tickets - CrowdServe BO',
    headerBarTitle: 'Tickets',
    path: UserRoutes.tickets,
    component: Tickets,
    subMenuKeys: [vMenuKeys.menu, vMenuKeys.tickets],
    menuKeys: [vMenuKeys.tickets],
    guard: true,
  },
};

export const AuthScreens = {
  Login: {
    title: 'Login - CrowdServe BO',
    path: AuthRoutes.login,
    component: Login,
    guard: false,
  },
  register: {
    title: 'Register - CrowdServe BO',
    path: AuthRoutes.register,
    component: Register,
    guard: false,
  },
};
