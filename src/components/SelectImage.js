import React, { Component } from "react"
import { Form } from "react-bootstrap"

export default class SelectImage extends Component {
  localAddToCanvas = e => {
    const index = e.target.selectedIndex,
      value = e.target.value,
      label = e.target.options[index].text
    this.loadImage(value, this.props.property_type)
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

  loadImage(src, type) {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()
      img.onload = () => {
        // Base Image Resize
        if (type === "bases") {
          const dstWidth = 600
          const dstHeight = 380
          canvas.width = dstWidth
          canvas.height = dstHeight
          ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            0,
            0,
            dstWidth,
            dstHeight
          )
          // Infinite loop cancel
          this.props.setSize({ width: img.width, height: img.height })
          img.onload = null
          img.src = canvas.toDataURL("image/png")
        }
        resolve(img)
      }
      img.onerror = e => reject(e)
      img.src = src
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
