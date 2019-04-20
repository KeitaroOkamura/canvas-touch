import React, { Component } from "react"
import { Col } from "react-bootstrap"

export default class TemplateListItem extends Component {
  localAddToCanvas = e => {
    e.preventDefault()
    const zIndex =
      this.props.property_type === "items" ? this.props.zIndex : null
    this.props.addToCanvas(e.target, this.props.property_type, zIndex)
  }

  render() {
    return (
      <Col
        xs={this.props.xs}
        md={this.props.md}
        style={{
          marginBottom: `15px`,
        }}
      >
        <a
          href={this.props.url}
          className="thumbnail"
          onClick={this.localAddToCanvas}
        >
          <img
            style={{
              width: `100%`,
            }}
            alt=""
            src={this.props.url}
          />
        </a>
      </Col>
    )
  }
}
