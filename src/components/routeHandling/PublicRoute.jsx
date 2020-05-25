import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authContext } from '../../context/AuthContext';
import { HOME_ROUTE } from '../../constants/routesNomenclature';

const PublicRoute = ({ path, restricted, children, ...rest }) => {
  const {
    userAuth: { user, token },
  } = useContext(authContext);

  const REDIRECT_URL = HOME_ROUTE;

  if (user._id && token && restricted) {
    return <Redirect to={{ pathname: REDIRECT_URL }} />;
  }

  return (
    <Route {...rest} path={path}>
      {children}
    </Route>
  );
};

export default PublicRoute;
