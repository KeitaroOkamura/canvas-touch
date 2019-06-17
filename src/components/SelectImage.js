import React, { Component } from "react"
import { Form } from "react-bootstrap"

export default class SelectImage extends Component {
  localAddToCanvas = e => {
    // e.preventDefault()
    this.loadImage(e.target.value)
      .then(res => {
        const zIndex =
          this.props.property_type === "items" ? this.props.zIndex : null
        this.props.addToCanvas(res, this.props.property_type, zIndex)
      })
      .catch(e => {
        console.error("onload error", e)
      })
  }

  loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = e => reject(e)
      img.src = src
    })
  }

  render() {
    const results = this.props.data

    let options = results.map(item => (
      <option key={item.name} value={item.path}>
        {item.name}
      </option>
    ))

    return (
      <Form.Group controlId={this.props.controlId}>
        <Form.Label>{this.props.label}</Form.Label>
        <Form.Control as="select" onChange={this.localAddToCanvas}>
          {options}
        </Form.Control>
      </Form.Group>
    )
  }
}
