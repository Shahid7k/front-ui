import React from 'react';
import images from './images.jpg';
import images1 from './images1.jpg';
import './App.css';
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
          <img src={this.state.dark?images1:images}  alt="ALTERNATE"/>
      </div>
    )
  }
}
export default App;
