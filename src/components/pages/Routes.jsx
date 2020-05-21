import React, { Fragment } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import LandingPage from '../pages/LandingPage/LandingPage';
import SignUp from '../pages/SignUp/SignUp';
import SignIn from '../pages/SignIn/SignIn';
import Home from '../pages/Home/Home';
import Dashboard from '../pages/Dashboard/Dashboard';
import Profile from '../pages/Profile/Profile';
import PrivateRoute from '../routeHandling/PrivateRoute';
import PublicRoute from '../routeHandling/PublicRoute';
import {
  LANDING_ROUTE,
  SIGNIN_ROUTE,
  SIGNUP_ROUTE,
  HOME_ROUTE,
  DASHBOARD,
  PROFILE,
} from '../../constants/routesNomenclature';

const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <Switch>
            <PrivateRoute path={HOME_ROUTE}>
              <Home />
            </PrivateRoute>
            <PrivateRoute path={DASHBOARD}>
              <Dashboard />
            </PrivateRoute>
            <PrivateRoute path={PROFILE}>
              <Profile />
            </PrivateRoute>

            <PublicRoute exact={true} path={LANDING_ROUTE}>
              <LandingPage />
            </PublicRoute>
            <PublicRoute path={SIGNIN_ROUTE} restricted={true}>
              <SignIn />
            </PublicRoute>
            <PublicRoute path={SIGNUP_ROUTE} restricted={true}>
              <SignUp />
            </PublicRoute>
          </Switch>
        </Fragment>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
