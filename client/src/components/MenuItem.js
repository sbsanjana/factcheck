import React from 'react'
import { Breadcrumb } from 'semantic-ui-react'

export default class MenuItem extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Breadcrumb>
            <Breadcrumb.Section link>Home</Breadcrumb.Section>
            <Breadcrumb.Divider>/</Breadcrumb.Divider>
            <Breadcrumb.Section link>Something</Breadcrumb.Section>
            <Breadcrumb.Divider>/</Breadcrumb.Divider>
            <Breadcrumb.Section link>Something Else</Breadcrumb.Section>
          </Breadcrumb>
        )
    }
}



