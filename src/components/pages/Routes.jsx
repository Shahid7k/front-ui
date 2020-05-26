import React, { Fragment } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import LandingPage from '../pages/LandingPage/LandingPage';
import SignUp from '../pages/SignUp/SignUp';
import SignIn from '../pages/SignIn/SignIn';
import Home from '../pages/Home/Home';
import Dashboard from '../pages/Dashboard/Dashboard';
import Profiles from '../pages/Profiles/Profiles';
import SingleProfile from '../pages/Profiles/SingleProfile';
import PrivateRoute from '../routeHandling/PrivateRoute';
import PublicRoute from '../routeHandling/PublicRoute';
import {
  LANDING_ROUTE,
  SIGNIN_ROUTE,
  SIGNUP_ROUTE,
  HOME_ROUTE,
  DASHBOARD,
  ALLQA_ROUTE,
  ALLPROFILES,
  USERPROFILE
  
} from '../../constants/routesNomenclature';
import {mode} from '../../utils/theme';
import AllQAs from './AllQAs/AllQAs';


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
              <PublicRoute path={ALLPROFILES}>
                <Profiles />
              </PublicRoute>
              <PublicRoute path={ ALLQA_ROUTE}>
                <AllQAs />
              </PublicRoute>
              <PublicRoute path={ USERPROFILE}>
                <SingleProfile />
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
