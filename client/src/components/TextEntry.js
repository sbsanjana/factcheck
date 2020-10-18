import React from 'react'
import { Input, Button } from 'semantic-ui-react'

export default class MenuItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {'header' : ''}
        this.handleChange = this.handleChange.bind(this);
        // this.handleClick = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({"header" : event.target.value});
    }

    handleClick() {
        const dataBody = this.state
        return fetch("http://127.0.0.1:5000/check", 
        {
            headers: {
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(dataBody)
        })
        .then(response => response.json())
        .then(data => {
          console.log(data)
        })
        .catch(function(res){ console.log(res) })
        }

    render() {
        return (
            <div>
            <Input placeholder='Enter a news title...' onChange={this.handleChange}/>
            <Button onClick={this.handleClick}>Search</Button>
            </div>
        )
    }
}



