import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { CookieKeys } from '../../constants/Keys';
import { UserRoutes, AuthRoutes } from '../Routes';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useCookie } from '../../hooks';
import { triggerMenuAction } from '../../app/menu.slice';
import { selectLayoutType } from '../../app/layout.slice';

/* eslint-disable complexity */
const Authmiddleware = ({
  path,
  title,
  component: Component,
  layout: Layout,
  guard,
  renderPage,
  ...optProps
}: {
  path: string;
  title: string;
  component: React.ElementType | null;
  layout: React.ElementType;
  guard: boolean;
  renderPage: Function;
}) => {
  const dispatch = useAppDispatch();
  const layoutType = useAppSelector(selectLayoutType);
  const cookies = useCookie([CookieKeys.authUser]);
  const payload = {
    openKeys: (optProps as any).subMenuKeys,
    selectedKeys:
      layoutType === 'horizontal'
        ? (optProps as any).hMenuKeys
        : (optProps as any).menuKeys,
  };

  useEffect(() => {
    if (payload.selectedKeys) {
      dispatch(triggerMenuAction(payload));
    }
  }, [path]);
  return (
    <Route
      path={path}
      {...optProps}
      render={(routeProps: any) => {
        if (
          guard &&
          (!cookies.getCookie(CookieKeys.authUser) ||
            !cookies.getCookie(CookieKeys.authUserRole))
        ) {
          return (
            <Redirect
              to={{
                pathname: AuthRoutes.login,
                state: { from: routeProps.location },
              }}
            />
          );
        }
        if (path === UserRoutes.home) {
          return (
            <Redirect
              to={{
                pathname: UserRoutes.dashboard,
              }}
            />
          );
        }
        return (
          Component && (
            <Layout {...optProps}>
              <Helmet>
                <title>{title}</title>
              </Helmet>
              <Component {...routeProps} />
            </Layout>
          )
        );
      }}
    />
  );
};

export default Authmiddleware;
