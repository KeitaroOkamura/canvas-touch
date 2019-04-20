import React, { Component } from "react"
import TemplateListItem from "./TemplateListItem"

export default class TemplateList extends Component {
  render() {
    const results = this.props.data

    let templates = results.map(item => (
      <TemplateListItem
        url={item}
        property_type={this.props.property_type}
        zIndex={this.props.zIndex}
        addToCanvas={this.props.addtocanvas}
        key={item}
        xs={this.props.xs}
        md={this.props.md}
      />
    ))

    return <div className="row">{templates}</div>
  }
}
