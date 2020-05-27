import React from 'react';
import Routes from './components/pages/Routes';
import './App.css';
import AlertProvider from './context/AlertContext';
import Alert from './components/commonComponents/Alert';

const App = () => {
  return (
    <AlertProvider>
      <Alert />
      <Routes />
    </AlertProvider>
  );
};

export default App;
