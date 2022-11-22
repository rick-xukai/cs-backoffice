import { connectRouter } from 'connected-react-router';
import { combineReducers } from '@reduxjs/toolkit';

import layoutReducer from './layout.slice';
import menuReducer from './menu.slice';
import loginReducer from '../features/Authentication/Login/Login.slice';
import registerReducer from '../features/Authentication/Register/Register.slice';
import eventsReducer from '../features/Events/Events.slice';

const createRootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    layout: layoutReducer,
    menu: menuReducer,
    login: loginReducer,
    register: registerReducer,
    events: eventsReducer,
  });

export default createRootReducer;
