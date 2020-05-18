import LOCAL_STORAGE_KEYS from '../constants/localStorageKeys';
import { defaultState } from '../customHooks/authHandler';

const getUserFromLocalStorage = () => {
  const userInfo = window.localStorage.getItem(LOCAL_STORAGE_KEYS.USER_AUTH);
  // console.log(JSON.parse(userInfo));
  if (userInfo) {
    const updatedDetails = JSON.parse(userInfo);
    return updatedDetails;
  }
  return defaultState;
};

export default getUserFromLocalStorage;
