import React from 'react'
import { Breadcrumb, Header } from 'semantic-ui-react'

export default class How extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <p style={{fontSize:20}}> We used a multinomial naive bayes classifier trained on a dataset of news articles, both fake and real. This model is then used to predict the credibility of any news headlines you enter!</p>
        )
    }
}



