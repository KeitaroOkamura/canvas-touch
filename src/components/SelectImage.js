import React, { Component } from "react"
import { Form } from "react-bootstrap"

export default class SelectImage extends Component {
  localAddToCanvas = e => {
    const index = e.target.selectedIndex,
      value = e.target.value,
      label = e.target.options[index].text
    this.props.loadImage(value, this.props.property_type)
      .then(res => {
        const type =
            this.props.property_type === "bases"
              ? this.props.property_type
              : label,
          zIndex =
            this.props.property_type === "bases" ? this.props.zIndex : null
        this.props.addToCanvas(res, type, zIndex)
      })
      .catch(e => {
        console.error("onload error", e)
      })
  }

  render() {
    return (
      <Form.Group controlId={this.props.controlId}>
        <Form.Label>{this.props.label}</Form.Label>
        <Form.Control
          as="select"
          onChange={this.localAddToCanvas}
          disabled={this.props.disabled}
        >
          {this.props.options}
        </Form.Control>
      </Form.Group>
    )
  }
}
