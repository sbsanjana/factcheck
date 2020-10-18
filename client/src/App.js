import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import Breadcrumb from './components/MenuItem'
import How from './components/How'
import TextEntry from './components/TextEntry'
import {Button, Input, Header, Popup, Grid, GridRow, Icon} from 'semantic-ui-react'
import Sky from 'react-sky';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter
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
    
        <Header style={{fontSize: 50, fontFamily: 'Carrois Gothic SC'}}>FactCheck</Header>
        <p style={{fontSize: 20}}> Enter the title of a news article below. Upon clicking the check button, you can find out if it's fake or real!</p>
        <Input style={{paddingRight:10, width: 400}}placeholder='Enter a news title...' value = {this.state.header} onChange={this.handleChange}/>
        <Button color='green' onClick={this.handleClick}>Check!</Button>

        <br/>
        <Grid>
          <GridRow centered style={{marginTop:30}}>
          <Popup on='click' content='We used a multinomial naive bayes classifier trained on a dataset of news articles, both fake and real. This model is then used to predict the credibility of any news headlines you enter!' trigger={<Icon style={{fontSize: 45}}name ='info' />} />
          <Icon style={{fontSize: 45}} name ='github' onClick={() => window.location.href = "https://github.com/sbsanjana/factcheck"}/>
          </GridRow>
        </Grid>

      </div>
    );
  }
} 