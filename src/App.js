import React from 'react';
import Routes from './components/pages/Routes';
import './App.css';

const App = () => {
  return <Routes />;
};
const light={
  backgroundSize:"cover",
  background:`url(${images})`,
  color:"black"
}
const dark={
  // background:"rgb(40,40,40)",
  backgroundImage:`url(${images1})`,
  backgroundSize:"cover",
  color:"white"
}
export default App;
