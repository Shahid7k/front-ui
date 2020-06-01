import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authContext } from '../../context/AuthContext';
import { LANDING_ROUTE } from '../../constants/routesNomenclature';

const PrivateRoute = ({ path, children }) => {
  const { userAuth } = useContext(authContext);

  const REDIRECT_URL = LANDING_ROUTE;

  if (userAuth.user !== undefined && userAuth.user._id && userAuth.token) {
    return (
      <Route exact path={path}>
        {children}
      </Route>
    );
  }

  return <Redirect to={{ pathname: REDIRECT_URL }} />;
};

export default PrivateRoute;
