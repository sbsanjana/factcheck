import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import Breadcrumb from './components/MenuItem'
import TextEntry from './components/TextEntry'
import {Button, Input, Header} from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {header : ""}
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);


  }
  handleChange(e) {
    this.setState({header : e.target.value});
  }

  handleClick() {
        return fetch("http://127.0.0.1:5000/check", 
    {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({"header" : this.state.header})
    })
    .then(response => response.json())
    .then(data => {

      if(data === "1.0") {
        alert("Our data predits that this is true! As a disclaimer, we cannot validate whether this is the case.")

    
      
      } else {
        alert("Our data predicts that this is fake. As a disclaimer, we cannot validate whether this is the case.")

      }
    })
    .catch(function(res){ console.log(res) })
      }

  render() {
    return (
      <div className="App">
        <Breadcrumb />
        <br />
        <Header style={{fontSize: 50, fontFamily: 'Julius Sans One'}}>FactCheck</Header>
        <Input style={{paddingRight:10}}placeholder='Enter a news title...' value = {this.state.header} onChange={this.handleChange}/>
        <Button onClick={this.handleClick}>Check!</Button>
      </div>
    );
  }
} 