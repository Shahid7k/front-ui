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
import AllQAs from './AllQAs/AllQAs';
// import BlogComponent from './BlogComponent/BlogComponent';
import PublicRoute from '../routeHandling/PublicRoute';
import {
  LANDING_ROUTE,
  SIGNIN_ROUTE,
  SIGNUP_ROUTE,
  HOME_ROUTE,
  DASHBOARD,
  PROFILE,
  ALLQA_ROUTE
} from '../../constants/routesNomenclature';
import {mode} from '../../utils/theme';


const Routes = () => {
  return (
    <div style={mode}>
      <BrowserRouter>
        <Fragment >
          <Navbar />
          <div style={{paddingTop:"55px",minHeight:"720px"}}>
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
              <PublicRoute path={ALLQA_ROUTE}>
                <AllQAs />
              </PublicRoute>

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
          </div>
        </Fragment>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
