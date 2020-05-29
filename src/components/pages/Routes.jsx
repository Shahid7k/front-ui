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
import AllQAs from './QAs/AllQAs';
import SingleQues from './QAs/SingleQues';
import Footer from '../layout/Footer';
import {
  LANDING_ROUTE,
  SIGNIN_ROUTE,
  SIGNUP_ROUTE,
  HOME_ROUTE,
  DASHBOARD,
  ALLQA_ROUTE,
  SINGLEQUES_ROUTE,
  PROFILES,
  SINGLEPROFILE,
  EDITPROFILE,
  POST_BLOG,
  GET_BLOG,
} from '../../constants/routesNomenclature';
import { mode } from '../../utils/theme';

const Routes = () => {
  return (
    <div style={mode}>
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <div style={{ paddingTop: '55px', minWidth:'fit-content' }}>
            <Switch>
              <PrivateRoute path={HOME_ROUTE}>
                <Home />
              </PrivateRoute>
              <PrivateRoute path={ALLQA_ROUTE}>
                <AllQAs />
              </PrivateRoute>
              <PrivateRoute path={SINGLEQUES_ROUTE}>
                <SingleQues />
              </PrivateRoute>
              <PrivateRoute path={GET_BLOG}>
                <Blog />
              </PrivateRoute>
              <PrivateRoute path={DASHBOARD}>
                <Dashboard />
              </PrivateRoute>
              <PrivateRoute path={SINGLEPROFILE}>
                <SingleProfile />
              </PrivateRoute>
              <PrivateRoute path={POST_BLOG}>
                <PostBlog />
              </PrivateRoute>
              <PrivateRoute path={PROFILES}>
                <Profiles />
              </PrivateRoute>
              <PrivateRoute path={EDITPROFILE}>
                <EditProfile />
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
          <hr />
          <Footer />
        </Fragment>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
