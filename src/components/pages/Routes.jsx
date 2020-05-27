import React, { Fragment } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import LandingPage from '../pages/LandingPage/LandingPage';
import SignUp from '../pages/SignUp/SignUp';
import SignIn from '../pages/SignIn/SignIn';
import Home from '../pages/Home/Home';
import Blog from './Blog/Blog';
import Dashboard from '../pages/Dashboard/Dashboard';
import Profiles from '../pages/Profiles/Profiles';
import EditProfile from '../pages/Profiles/EditProfile';
import SingleProfile from '../pages/Profiles/SingleProfile';
import PostBlog from '../pages/Dashboard/PostBlog/PostBlog';
import PrivateRoute from '../routeHandling/PrivateRoute';
import PublicRoute from '../routeHandling/PublicRoute';
import AllQAs from '../pages/AllQAs/AllQAs';
import {
  LANDING_ROUTE,
  SIGNIN_ROUTE,
  SIGNUP_ROUTE,
  HOME_ROUTE,
  DASHBOARD,
  ALLQA_ROUTE,
  ALLPROFILES,
  USERPROFILE,
  EDITPROFILE,
  POST_BLOG,
  GET_BLOG,
} from '../../constants/routesNomenclature';
import {mode} from '../../utils/theme';

const Routes = () => {
  return (
    <div style={mode}>
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <div style={{ paddingTop: '55px', minHeight: '720px' }}>
            <Switch>
              <PublicRoute path={HOME_ROUTE}>
                <Home />
              </PublicRoute>
              <PublicRoute path={ALLQA_ROUTE}>
                <AllQAs />
              </PublicRoute>
              <PublicRoute path={GET_BLOG}>
                <Blog />
              </PublicRoute>
              <PublicRoute path={DASHBOARD}>
                <Dashboard />
              </PublicRoute>
              <PublicRoute path={ALLPROFILES}>
                <Profiles />
              </PublicRoute>
              <PublicRoute path={ ALLQA_ROUTE}>
                <AllQAs />
              </PublicRoute>
              <PublicRoute path={ USERPROFILE}>
                <SingleProfile />
              </PublicRoute>
              <PublicRoute path={POST_BLOG}>
                <PostBlog />
              </PublicRoute>
              <PublicRoute path={ALLPROFILES}>
                <Profiles />
              </PublicRoute>
              <PublicRoute path={EDITPROFILE}>
                <EditProfile />
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
