import { UserRoutes, AuthRoutes } from './Routes';
// User features
import Dashboard from '../features/Dashboard/Loadable';
import Events from '../features/Events/Loadable';
import EventTickets from '../features/EventTickets/Loadable';
import EventTicketsDetail from '../features/EventTicketsDetail/Loadable';
import Tickets from '../features/Tickets/Loadable';
import EventDetail from '../features/EventDetail/Loadable';
import TicketDetail from '../features/TicketDetail/Loadable';
import Transactions from '../features/Transactions/Loadable';
import TransactionsDetail from '../features/TransactionsDetail/Loadable';
import UsersList from '../features/Users/Loadable';
import UserDetail from '../features/UserDetail/Loadable';
import CreateEvent from '../features/CreateEvent/Loadable';
import Profile from '../features/Profile/Loadable';
import UserAndPermissions from '../features/UserAndPermissions/Loadable';
// Auth features
import Login from '../features/Authentication/Login/Loadable';
import Register from '../features/Authentication/Register/Loadable';
import ForgotPassword from '../features/Authentication/ForgotPassword/Loadable';
import ChangePassword from '../features/Authentication/ChangePassword/Loadable';

import { MenuKeys as vMenuKeys } from '../components/VerticalLayout/MenuKeys';
import { UserRoleKeys } from '../constants/Keys';

export const UserScreens = {
  Dashboard: {
    title: 'Dashboard - CrowdServe BO',
    path: UserRoutes.dashboard,
    component: Dashboard,
    subMenuKeys: [],
    menuKeys: [vMenuKeys.dashboard],
    guard: true,
    role: [],
  },
  Events: {
    title: 'Events - CrowdServe BO',
    path: UserRoutes.events,
    component: Events,
    subMenuKeys: [],
    menuKeys: [vMenuKeys.events],
    guard: true,
    role: [UserRoleKeys.admin, UserRoleKeys.guest],
  },
  CreateEvent: {
    title: 'Create Event - CrowdServe BO',
    path: UserRoutes.createEvent,
    component: CreateEvent,
    subMenuKeys: [],
    menuKeys: [vMenuKeys.events],
    guard: true,
    role: [UserRoleKeys.admin, UserRoleKeys.guest],
  },
  EventInfo: {
    title: 'Event Info - CrowdServe BO',
    path: UserRoutes.eventInfo,
    component: EventDetail,
    subMenuKeys: [],
    menuKeys: [vMenuKeys.events],
    guard: true,
    role: [UserRoleKeys.admin, UserRoleKeys.guest],
  },
  EventTickets: {
    title: 'Event Tickets - CrowdServe BO',
    path: UserRoutes.eventTickets,
    component: EventTickets,
    subMenuKeys: [],
    menuKeys: [vMenuKeys.events],
    guard: true,
    role: [UserRoleKeys.admin, UserRoleKeys.guest],
  },
  EventTicketsDetail: {
    title: 'Event Tickets Detail - CrowdServe BO',
    path: UserRoutes.eventTicketsDetail,
    component: EventTicketsDetail,
    subMenuKeys: [],
    menuKeys: [vMenuKeys.events],
    guard: true,
    role: [UserRoleKeys.admin, UserRoleKeys.guest],
  },
  Tickets: {
    title: 'Tickets - CrowdServe BO',
    path: UserRoutes.tickets,
    component: Tickets,
    subMenuKeys: [],
    menuKeys: [vMenuKeys.tickets],
    guard: true,
    role: [UserRoleKeys.admin, UserRoleKeys.guest],
  },
  TicketDetail: {
    title: 'Tickets Details - CrowdServe BO',
    path: UserRoutes.ticketDetail,
    component: TicketDetail,
    subMenuKeys: [],
    menuKeys: [vMenuKeys.tickets],
    guard: true,
    role: [UserRoleKeys.admin, UserRoleKeys.guest],
  },
  Users: {
    title: 'Users - CrowdServe BO',
    path: UserRoutes.users,
    component: UsersList,
    subMenuKeys: [],
    menuKeys: [vMenuKeys.users],
    guard: true,
    role: [UserRoleKeys.admin, UserRoleKeys.guest],
  },
  UserDetail: {
    title: 'User Detail - CrowdServe BO',
    path: UserRoutes.userDetail,
    component: UserDetail,
    subMenuKeys: [],
    menuKeys: [vMenuKeys.users],
    guard: true,
    role: [UserRoleKeys.admin, UserRoleKeys.guest],
  },
  UserTicketDetail: {
    title: 'User Ticket Detail - CrowdServe BO',
    path: UserRoutes.userTicketDetail,
    component: TicketDetail,
    subMenuKeys: [],
    menuKeys: [vMenuKeys.users],
    guard: true,
    role: [UserRoleKeys.admin, UserRoleKeys.guest],
  },
  Profile: {
    title: 'Profile - CrowdServe BO',
    path: UserRoutes.profile,
    component: Profile,
    subMenuKeys: [vMenuKeys.settings],
    menuKeys: [vMenuKeys.profile],
    guard: true,
    role: [],
  },
  UserAndPermissions: {
    title: 'UserAndPermissions - CrowdServe BO',
    path: UserRoutes.userAndPermissions,
    component: UserAndPermissions,
    subMenuKeys: [vMenuKeys.settings],
    menuKeys: [vMenuKeys.userAndPermissions],
    guard: true,
    role: [],
  },
  Transactions: {
    title: 'Transactions - CrowdServe BO',
    path: UserRoutes.transactions,
    component: Transactions,
    subMenuKeys: [],
    menuKeys: [vMenuKeys.transactions],
    guard: true,
    role: [UserRoleKeys.admin, UserRoleKeys.guest],
  },
  TransactionsDetail: {
    title: 'Transactions Detail - CrowdServe BO',
    path: UserRoutes.transactionsDetail,
    component: TransactionsDetail,
    subMenuKeys: [],
    menuKeys: [vMenuKeys.transactions],
    guard: true,
    role: [UserRoleKeys.admin, UserRoleKeys.guest],
  },
};

export const AuthScreens = {
  Home: {
    title: 'Home - CrowdServe BO',
    path: UserRoutes.home,
    component: null,
    guard: false,
    exact: true,
    role: undefined,
  },
  Login: {
    title: 'Login - CrowdServe BO',
    path: AuthRoutes.login,
    component: Login,
    guard: false,
    role: undefined,
  },
  register: {
    title: 'Register - CrowdServe BO',
    path: AuthRoutes.register,
    component: Register,
    guard: false,
    role: undefined,
  },
  ForgotPassword: {
    title: 'Forgot Password - CrowdServe BO',
    path: AuthRoutes.forgotPassword,
    component: ForgotPassword,
    guard: false,
    role: undefined,
  },
  ChangePassword: {
    title: 'Change Password - CrowdServe BO',
    path: AuthRoutes.changePassword,
    component: ChangePassword,
    guard: false,
    role: undefined,
  },
};
