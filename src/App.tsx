import React from 'react';
import { Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import { MOCK } from './constants/predicates';
import MockAPI from './helpers/mock-api';
import { useAppSelector } from './app/hooks';
import Authmiddleware from './navigation/Middleware/Authmiddleware';
import history from './utils/history';
import { UserScreens, AuthScreens } from './navigation/Screens';
import VerticalLayout from './components/VerticalLayout';
import HorizontalLayout from './components/HorizontalLayout';
import NonAuthLayout from './components/NonAuthLayout';
import { selectLayoutType } from './app/layout.slice';
import './style/theme.scss';

if (MOCK === 'true') {
  MockAPI();
}

declare global {
  interface Window {
    timer: any;
    headerCounter: any;
  }
}

const renderPage = (
  routeProps: any,
  Layout: React.ElementType,
  Component: React.ElementType,
) => (
  <Layout>
    <Component {...routeProps} />
  </Layout>
);

const getUserRoutes = (layout: React.ElementType) => {
  const routes = Object.entries(UserScreens).map((item) => {
    const [name, props] = item;
    const { path, component, guard, title, ...optProps } = props;
    return (
      <Authmiddleware
        key={name}
        path={path}
        title={title}
        guard={guard}
        layout={layout}
        component={component}
        renderPage={renderPage}
        {...optProps}
      />
    );
  });
  return routes;
};

const getAuthRoutes = (layout: React.ElementType) => {
  const routes = Object.entries(AuthScreens).map((item) => {
    const [name, props] = item;
    const { path, component, guard, title, ...optProps } = props;
    return (
      <Authmiddleware
        key={name}
        path={path}
        title={title}
        guard={guard}
        layout={layout}
        component={component}
        renderPage={renderPage}
        {...optProps}
      />
    );
  });
  return routes;
};

const App = () => {
  const layoutType = useAppSelector(selectLayoutType);
  const getLayout = () => {
    let layoutCls = VerticalLayout;
    switch (layoutType) {
      case 'horizontal': {
        layoutCls = HorizontalLayout;
        break;
      }
      default: {
        layoutCls = VerticalLayout;
        break;
      }
    }
    return layoutCls;
  };
  const layout = getLayout();
  return (
    <ConnectedRouter history={history}>
      <Switch>
        {getAuthRoutes(NonAuthLayout)}
        {getUserRoutes(layout)}
      </Switch>
    </ConnectedRouter>
  );
};

export default App;
