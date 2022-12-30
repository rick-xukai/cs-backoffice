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
  });

export default createRootReducer;
