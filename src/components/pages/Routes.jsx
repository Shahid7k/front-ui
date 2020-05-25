import React, { Fragment } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import LandingPage from '../pages/LandingPage/LandingPage';
import SignUp from '../pages/SignUp/SignUp';
import SignIn from '../pages/SignIn/SignIn';
import Home from '../pages/Home/Home';
import Blog from './Blog/Blog';
import Dashboard from '../pages/Dashboard/Dashboard';
import PostBlog from '../pages/Dashboard/PostBlog/PostBlog';
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
  POST_BLOG,
  GET_BLOG,
} from '../../constants/routesNomenclature';
import { light, dark, condition } from '../../utils/theme';

const mode = condition ? dark : light;

const Routes = () => {
  return (
    <div style={mode}>
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <div style={{ paddingTop: '55px', minHeight: '720px' }}>
            <Switch>
              <PrivateRoute path={HOME_ROUTE}>
                <Home />
              </PrivateRoute>
              <PublicRoute path={ALLQA_ROUTE}>
                <AllQAs />
              </PublicRoute>
              <PrivateRoute path={GET_BLOG}>
                <Blog />
              </PrivateRoute>
              <PrivateRoute path={DASHBOARD}>
                <Dashboard />
              </PrivateRoute>
              <PrivateRoute path={POST_BLOG}>
                <PostBlog />
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
          </div>
        </Fragment>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
