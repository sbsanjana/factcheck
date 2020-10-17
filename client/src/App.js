import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import Breadcrumb from './components/MenuItem'
import {Button} from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClick() {
    return fetch("http://127.0.0.1:5000/check", 
    {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({'header': 'jello my name is trump'})
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
    .catch(function(res){ console.log(res) })
      }

  render() {
    return (
      <div className="App">
        <Breadcrumb />
        <Button onClick={this.handleClick}>Check</Button>
      </div>
    );
  }
} 

