import React from 'react';
<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
=======
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
>>>>>>> 22c6864374de2f3bfed5682a435ad72b84907606

export default App;
