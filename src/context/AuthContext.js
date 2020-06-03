import React, { createContext } from 'react';
import useAuthHandler, { defaultState } from '../customHooks/authHandler';
import getUserInfoFromLocalStorage from '../utils/getUserFromLocalStorage';
import axiosClient from '../utils/axiosClient';

const initialState = {
  userAuth: { ...defaultState },
  setAuthStatus: () => {},
  setUnAuthStatus: () => {},
  toggleDarkMode: () => {},
};

export const authContext = createContext(initialState);

const { Provider } = authContext;

const AuthContextProvider = ({ children }) => {
  const {
    userAuth,
    setAuthStatus,
    setUnAuthStatus,
    toggleDarkMode,
  } = useAuthHandler(getUserInfoFromLocalStorage());

  // React.useEffect(() => {
  //   console.log(userAuth);
  // }, [userAuth]);

  if (userAuth.token) {
    axiosClient.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${userAuth.token}`;
  }

  return (
    <Provider
      value={{ userAuth, setAuthStatus, setUnAuthStatus, toggleDarkMode }}
    >
      {children}
    </Provider>
  );
};

export default AuthContextProvider;
