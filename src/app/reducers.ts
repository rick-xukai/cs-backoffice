import { connectRouter } from 'connected-react-router';
import { combineReducers } from '@reduxjs/toolkit';

import layoutReducer from './layout.slice';
import menuReducer from './menu.slice';
import loginReducer from '../features/Authentication/Login/Login.slice';
import registerReducer from '../features/Authentication/Register/Register.slice';
import eventsReducer from '../features/Events/Events.slice';
import ticketsReducer from '../features/Tickets/Tickets.slice';
import eventsDetailReducer from '../features/EventDetail/EventDetail.slice';
import ticketsDetailReducer from '../features/TicketDetail/TicketDetail.slice';
import transactionsListReducer from '../features/Transactions/Transactions.slice';
import transactionsDetailReducer from '../features/TransactionsDetail/TransactionsDetail.slice';
import usersListReducer from '../features/Users/Users.slice';
import userDetailReducer from '../features/UserDetail/UserDetail.slice';
import createEventReducer from '../features/CreateEvent/CreateEvent.slice';
import forgotPasswordReducer from '../features/Authentication/ForgotPassword/ForgotPassword.slice';
import changePasswordReducer from '../features/Authentication/ChangePassword/ChangePassword.slice';
import profileReducer from '../features/Profile/Profile.slice';
import userPermissionsReducer from '../features/UserAndPermissions/UserAndPermissions.slice';
import eventDashboardReducer from '../features/EventDashboard/EventDashboard.slice';
import ticketSoldReducer from '../features/TicketsSold/TicketSold.slice';
import eventPageViewsReducer from '../features/EventPageViews/EventPageViews.slice';
import uniqueBuyersReducer from '../features/UniqueBuyers/UniqueBuyers.slice';

const createRootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    layout: layoutReducer,
    menu: menuReducer,
    login: loginReducer,
    register: registerReducer,
    events: eventsReducer,
    tickets: ticketsReducer,
    eventDetail: eventsDetailReducer,
    ticketsDetail: ticketsDetailReducer,
    transactionsList: transactionsListReducer,
    transactionsDetail: transactionsDetailReducer,
    usersList: usersListReducer,
    userDetail: userDetailReducer,
    createEvent: createEventReducer,
    forgotPassword: forgotPasswordReducer,
    changePassword: changePasswordReducer,
    profile: profileReducer,
    userPermissions: userPermissionsReducer,
    eventDashboard: eventDashboardReducer,
    ticketSold: ticketSoldReducer,
    eventPageViews: eventPageViewsReducer,
    uniqueBuyers: uniqueBuyersReducer,
  });

export default createRootReducer;
