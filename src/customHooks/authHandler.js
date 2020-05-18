import { useState } from 'react';
import LOCAL_STORAGE_KEYS from '../constants/localStorageKeys';

export const defaultState = {
  user: {
    _id: '',
  },
  token: '',
};

const useAuthHandler = userDetails => {
  const [userAuth, setUserAuth] = useState(userDetails);

  const setAuthStatus = currentUserAuth => {
    window.localStorage.setItem(
      LOCAL_STORAGE_KEYS.USER_AUTH,
      JSON.stringify(currentUserAuth)
    );
    setUserAuth(currentUserAuth);
  };

  const setUnAuthStatus = () => {
    window.localStorage.clear();
    setUserAuth(defaultState);
  };

  return {
    userAuth,
    setAuthStatus,
    setUnAuthStatus,
  };
};

export default useAuthHandler;
