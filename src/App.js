import React from 'react';
<<<<<<< HEAD
import Routes from './components/pages/Routes';
import './App.css';

const App = () => {
  return <Routes />;
};
=======
import './App.css';
const light={
  background:"white",
  color:"black"
}
const dark={
  background:"rgb(40,40,40)",
  color:"white"
}
class App extends React.Component{
  constructor(){
    super()
    this.state={
      dark:false,
      name:""
    }
  }
  toggle=()=>{
    localStorage.setItem("darkMode",(!this.state.dark));
    this.setState({dark:JSON.parse(localStorage.getItem("darkMode"))})
  }
  render(){
    return (
      <div style={(this.state.dark)?dark:light}>
          <button  className="btn" onClick={this.toggle}>{this.state.dark?"Light":"Dark"}</button>
          <hr />
          <h1>Text Here!!!</h1>
      </div>
    )
  }
}
>>>>>>> 76d555922ded3ec31fc6f39b79c46f608f773e7b
export default App;
