import React from 'react'
import { Breadcrumb } from 'semantic-ui-react'

export default class MenuItem extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Breadcrumb style={{fontSize:20}}>
            <Breadcrumb.Section link><a href='/'>Home</a></Breadcrumb.Section>
            <Breadcrumb.Divider>/</Breadcrumb.Divider>
            <Breadcrumb.Section link><a href='/how'>How It Works</a></Breadcrumb.Section>
            {/* <Breadcrumb.Divider>/</Breadcrumb.Divider> */}
            {/* <Breadcrumb.Section link>Something Else</Breadcrumb.Section> */}
          </Breadcrumb>
        )
    }
}



