import React from 'react';
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
export default App;
