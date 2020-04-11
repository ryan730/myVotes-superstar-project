import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import React, { Suspense } from 'react';
import path from 'path';
import routes from '@/config/routes';
import PageLoading from '@/components/PageLoading';
///import CheckLogin from '@/components/CheckLogin';
import PrivateRoute from './PrivateRoute';

const RouteItem = (props) => {
  const { redirect, path: routePath, component, key } = props;
  ///console.log('------->>>', redirect, routePath ,component, key );
  if (redirect) {
    return (
      <Redirect
        exact
        key={key}
        from={routePath}
        to={redirect}
      />
    );
  }
  return (
    <PrivateRoute
      key={key}
      component={component}
      path={routePath}
    />
  );
};

const router = () => {
  return (
    <Router>
      <Switch>
        {routes.map((route, id) => {
          const { component: RouteComponent, children, ...others } = route;
          return (
            <Route
              key={id}
              {...others}
              component={(props) => {
                return (
                  children ? (
                    <RouteComponent key={id} {...props}>
                      <Suspense fallback={<PageLoading />}>
                        <Switch>
                          {children.map((routeChild, idx) => {
                            const { redirect, path: childPath, component } = routeChild;
                            const item = RouteItem({
                              key: `${id}-${idx}`,
                              redirect,
                              path: childPath && path.join(route.path, childPath),
                              component,
                            });
                            ///console.log('item==', item);
                            return item;
                          })}
                        </Switch>
                      </Suspense>
                    </RouteComponent>
                  ) : (
                    <Suspense fallback={<PageLoading />}>
                      {
                        RouteItem({
                          key: id,
                          ...route,
                        })
                      }
                    </Suspense>
                  )
                );
              }}
            />
          );
        })}
      </Switch>
    </Router>
  );
};

export default router;
