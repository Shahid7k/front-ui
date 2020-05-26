import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// export interface AlertInterface {
//   id: string;
//   msg: string;
//   alertType: string;
// }

// interface AlertContextInterface {
//   alerts: Array<AlertInterface>;
//   addAlert: (msg: string, alertType: string) => void;
//   clearAlerts: () => void;
// }

const initialState = {
  alerts: [],
  addAlert: () => {},
  clearAlerts: () => {},
};

export const alertContext = React.createContext(initialState);

const MAX_ALERTS = 2;
const TIMEOUT = 3000;

const { Provider } = alertContext;

const AlertContextProvider = ({ children }) => {
  const [alerts, setAlerts] = React.useState([]);

  useEffect(() => {
    if (alerts.length > 0) {
      const updatedAlerts = [...alerts];
      updatedAlerts.shift();
      const timer = setTimeout(() => setAlerts(updatedAlerts), TIMEOUT);
      return () => clearTimeout(timer);
    }
  }, [alerts]);

  function addAlert(msg, alertType) {
    const id = uuidv4();
    const updatedAlerts = [...alerts, { id, msg, alertType }];
    setAlerts(updatedAlerts.slice(-MAX_ALERTS));
  }

  function clearAlerts() {
    setAlerts([]);
  }

  return (
    <Provider value={{ alerts, addAlert, clearAlerts }}>{children}</Provider>
  );
};

export default AlertContextProvider;
