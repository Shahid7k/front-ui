import React, { createContext } from 'react';
import useAuthHandler, { defaultState } from '../customHooks/authHandler';
import getUserInfoFromLocalStorage from '../utils/getUserFromLocalStorage';

const initialState = {
  userAuth: { ...defaultState },
  setAuthStatus: () => {},
  setUnAuthStatus: () => {},
};

export const authContext = createContext(initialState);

const { Provider } = authContext;

const AuthContextProvider = ({ children }) => {
  const { userAuth, setAuthStatus, setUnAuthStatus } = useAuthHandler(
    getUserInfoFromLocalStorage()
  );

  // React.useEffect(() => {
  //   console.log(userAuth);
  // }, [userAuth]);

  return (
    <Provider value={{ userAuth, setAuthStatus, setUnAuthStatus }}>
      {children}
    </Provider>
  );
};

export default AuthContextProvider;
