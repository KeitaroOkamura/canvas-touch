import React, { Component } from "react"
import { Col } from "react-bootstrap"

export default class TemplateListItem extends Component {
  localAddToCanvas = e => {
    e.preventDefault()
    this.props.addToCanvas(
      e.target,
      this.props.property_type,
      this.props.zIndex
    )
  }

  render() {
    return (
      <Col
        xs={6}
        md={4}
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
