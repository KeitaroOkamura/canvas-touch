import React, { Component } from "react"
import { Col, Form } from "react-bootstrap"
import { fabric } from "fabric"

import Layout from "../components/layout"
import SEO from "../components/seo"
import FabricCanvas from "../components/FabricCanvas"
import { marklist, baselist } from "../images/templates/templatelist"

class IndexPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeProperty: null,
      increment: 0,
      baseOptions: [],
      markOptions: [],
      isDisabled: false,
      size: {
        width: 600,
        height: 380,
      },
    }
  }

  componentDidMount() {
    this.createBaseOptions(baselist, []).catch(e => {
      console.error("create base option error", e)
    })
    this.createMarkOptions(marklist, [])
      .then(res => {
        const mark = document.getElementById("mark")
        this.triggerEvent(mark, "change")
      })
      .catch(e => {
        console.error("create mark option error", e)
      })

    // global
    window.localAddToCanvas = (src, type) => {
      this.localAddToCanvas(src, type)
    }
  }

  localAddToCanvas = (value, type = "bases") => {
    this.loadImage(value, type)
      .then(res => {
        const zIndex = type === "bases" ? -9999 : null
        this.addToCanvas(res, type, zIndex)
      })
      .catch(e => {
        console.error("onload error", e)
      })
  }

  addToCanvas = (imgElement, property_type, z_Index) => {
    const width = property_type === "bases" ? 600 : 25,
      height = property_type === "bases" ? 380 : 25
    const imgInstance = new fabric.Image(imgElement, {
      width: width,
      height: height,
      the_type: property_type,
    })

    this.setState({ activeProperty: imgInstance })
  }

  createBaseOptions(results) {
    return new Promise((resolve, reject) => {
      let options = results.map((item, index) => (
        <option key={item.name} value={item.path}>
          {item.name}
        </option>
      ))
      this.setState({ baseOptions: options })
      resolve()
    })
  }

  createMarkOptions(results, disableList) {
    return new Promise((resolve, reject) => {
      let options = results.map((item, index) => (
        <option
          key={item.name}
          value={item.path}
          disabled={disableList.indexOf(item.name) >= 0}
        >
          {item.name}
        </option>
      ))
      this.setState({ isDisabled: marklist.length === disableList.length })
      this.setState({ markOptions: options })
      resolve()
    })
  }

  triggerEvent(element, event) {
    if (document.createEvent) {
      const evt = document.createEvent("HTMLEvents")
      evt.initEvent(event, true, true)
      return element.dispatchEvent(evt)
    } else {
      // IE
      const evt = document.createEventObject()
      return element.fireEvent("on" + event, evt)
    }
  }

  setSize(size) {
    this.setState({ size: size })
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
          this.setSize({ width: img.width, height: img.height })
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
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <div className="row">
          <Col md={4}>
            <Form.Group controlId="base">
              <Form.Label>ベース選択</Form.Label>
              <Form.Control as="select">{this.state.baseOptions}</Form.Control>
            </Form.Group>
            <Form.Group controlId="mark">
              <Form.Label>マーク選択</Form.Label>
              <Form.Control as="select">{this.state.markOptions}</Form.Control>
            </Form.Group>
          </Col>

          <Col md={8}>
            <FabricCanvas
              activeProperty={this.state.activeProperty}
              createMarkOptions={this.createMarkOptions.bind(this)}
              available={this.state.isDisabled}
              triggerEvent={this.triggerEvent}
              size={this.state.size}
              loadImage={this.loadImage.bind(this)}
            />
          </Col>
        </div>
      </Layout>
    )
  }
}
export default IndexPage
