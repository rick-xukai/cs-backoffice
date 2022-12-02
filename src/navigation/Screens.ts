import { UserRoutes, AuthRoutes } from './Routes';
// User features
import Dashboard from '../features/Dashboard/Loadable';
import Events from '../features/Events/Loadable';
import Tickets from '../features/Tickets/Loadable';
import EventDetail from '../features/EventDetail/Loadable';
import TicketDetail from '../features/TicketDetail/Loadable';
// Auth features
import Login from '../features/Authentication/Login/Loadable';
import Register from '../features/Authentication/Register/Loadable';
import { MenuKeys as vMenuKeys } from '../components/VerticalLayout/MenuKeys';
import { UserRoleKeys } from '../constants/Keys';

export const UserScreens = {
  Dashboard: {
    title: 'Dashboard - CrowdServe BO',
    path: UserRoutes.dashboard,
    component: Dashboard,
    subMenuKeys: [vMenuKeys.menu, vMenuKeys.dashboard],
    menuKeys: [vMenuKeys.dashboardDefault],
    guard: true,
    role: [UserRoleKeys.admin, UserRoleKeys.guest],
  },
  Events: {
    title: 'Events - CrowdServe BO',
    path: UserRoutes.events,
    component: Events,
    subMenuKeys: [vMenuKeys.menu, vMenuKeys.events],
    menuKeys: [vMenuKeys.events],
    guard: true,
    role: [UserRoleKeys.admin],
  },
  EventInfo: {
    title: 'Event Info - CrowdServe BO',
    path: UserRoutes.eventDetail,
    component: EventDetail,
    subMenuKeys: [vMenuKeys.menu, vMenuKeys.events],
    menuKeys: [vMenuKeys.events],
    guard: true,
    role: [UserRoleKeys.admin],
  },
  Tickets: {
    title: 'Tickets - CrowdServe BO',
    path: UserRoutes.tickets,
    component: Tickets,
    subMenuKeys: [vMenuKeys.menu, vMenuKeys.tickets],
    menuKeys: [vMenuKeys.tickets],
    guard: true,
    role: [UserRoleKeys.admin],
  },
  TicketDetail: {
    title: 'Tickets Details - CrowdServe BO',
    path: UserRoutes.ticketDetail,
    component: TicketDetail,
    subMenuKeys: [vMenuKeys.menu, vMenuKeys.tickets],
    menuKeys: [vMenuKeys.tickets],
    guard: true,
    role: [UserRoleKeys.admin],
  },
  Users: {
    title: 'Users - CrowdServe BO',
    path: UserRoutes.dashboard,
    component: Dashboard,
    subMenuKeys: [vMenuKeys.menu, vMenuKeys.users],
    menuKeys: [vMenuKeys.users],
    guard: true,
    role: [UserRoleKeys.admin, UserRoleKeys.guest],
  },
  Settings: {
    title: 'Settings - CrowdServe BO',
    path: UserRoutes.dashboard,
    component: Dashboard,
    subMenuKeys: [vMenuKeys.menu, vMenuKeys.settings],
    menuKeys: [vMenuKeys.settings],
    guard: true,
    role: [UserRoleKeys.admin, UserRoleKeys.guest],
  },
};

export const AuthScreens = {
  Login: {
    title: 'Login - CrowdServe BO',
    path: AuthRoutes.login,
    component: Login,
    guard: false,
    role: [UserRoleKeys.admin, UserRoleKeys.guest],
  },
  register: {
    title: 'Register - CrowdServe BO',
    path: AuthRoutes.register,
    component: Register,
    guard: false,
    role: [UserRoleKeys.admin, UserRoleKeys.guest],
  },
};
