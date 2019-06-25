import React, { Component } from "react"
import { fabric } from "fabric"
import { ButtonToolbar, Button, Form } from "react-bootstrap"
import { marklist } from "../images/templates/templatelist"

class FabricCanvas extends Component {
  constructor(props) {
    super(props)

    this.state = {
      add: true,
      isDisabled: false,
      trim: false,
    }
  }

  componentDidMount() {
    // Make a New Canvas
    this.the_canvas = new fabric.Canvas("main-canvas", {
      selection: true,
      preserveObjectStacking: false,
      height: 380,
      width: 600,
    })

    // Canvas Event Handler
    this.the_canvas.on({
      "object:selected": this.onSelected,
      "mouse:up": this.onMouseUp,
    })

    // Init Status
    this.setState({ isDisabled: true })
  }

  componentWillReceiveProps = newprops => {
    this.setState({ isDisabled: this.the_canvas.getObjects().length <= 0 })
    // If Updated Item is not the same as the old one
    // 		=> Update the canvas with newer item
    if (newprops.activeProperty !== this.props.activeProperty) {
      this.updateCanvasforBaseImage(
        this.props.activeProperty,
        newprops.activeProperty
      )
    }
  }

  updateCanvasforBaseImage = (prev, next) => {
    if (next) {
      if (next.the_type === "bases") {
        this.the_canvas.setBackgroundImage(next)
        this.the_canvas.renderAll()
        // Trigger Event
        this.resetMarkSelect()
        return
      }

      // Add Image Flg Changed
      this.setState({ add: true })
    }
  }

  saveToCanvas = () => {
    const link = document.createElement("a")
    // TODO: resize
    // this.the_canvas.width = this.props.size.width
    // this.the_canvas.height = this.props.size.height
    let dataUrl = this.the_canvas.toDataURL("image/jpeg")
    if (this.state.trim) {
      const base64 = this.the_canvas.toDataURL("image/jpeg", 0.1),
        blob = this.base64toBlob(base64),
        url = window.URL || window.webkitURL
      dataUrl = url.createObjectURL(blob)
    }
    link.href = dataUrl
    link.download = "new_create_image.jpg"
    link.click()
  }

  previousCanvas = () => {
    if (this.state.isDisabled) return
    let to_remove
    // Find the Previous of Element
    const lastCacheKey = this.the_canvas.getObjects().length - 1
    this.the_canvas.forEachObject((object, key) => {
      if (object.cacheKey === `${lastCacheKey}`) {
        to_remove = object
      }
    })

    this.the_canvas.remove(to_remove)
    // Trigger Event
    this.setOption()
    // Add Image Flg Changed
    this.setState({ add: true })
    // Back Button Status Changed
    this.setState({ isDisabled: this.the_canvas.getObjects().length <= 0 })
  }

  resetCanvas = () => {
    this.the_canvas.clear()
    // Trigger Event
    this.setOption()
  }

  onMouseUp = options => {
    if (
      (this.props.activeProperty &&
        this.props.activeProperty.the_type === "bases") ||
      options.target !== null ||
      !this.state.add ||
      this.props.available
    )
      return
    // Set Property
    const pointer = this.the_canvas.getPointer(),
      left = pointer.x - this.props.activeProperty.width / 2,
      top = pointer.y - this.props.activeProperty.height / 2
    this.props.activeProperty.cacheKey = `${this.the_canvas.getObjects()
      .length++}`
    this.props.activeProperty.set({ left: left, top: top })
    this.the_canvas.add(this.props.activeProperty)
    // Lock Rotation and Scaling
    const length = this.the_canvas.getObjects().length,
      index = length - 1
    this.the_canvas.item(index).hasControls = this.the_canvas.item(
      index
    ).hasBorders = false
    this.the_canvas.item(index).lockRotation = true
    this.the_canvas.item(index).lockScalingX = this.the_canvas.item(
      index
    ).lockScalingY = true
    // Trigger Event
    this.setOption(true)
    // Add Image Flg Changed
    this.setState({ add: true })
    // Back Button Status Changed
    this.setState({ isDisabled: length <= 0 })
  }

  onSelected = options => {
    options.target.bringToFront()
  }

  base64toBlob = base64 => {
    const bin = atob(base64.replace(/^.*,/, "")),
      buffer = new Uint8Array(bin.length)
    for (let i = 0; i < bin.length; i++) {
      buffer[i] = bin.charCodeAt(i)
    }
    return new Blob([buffer.buffer], {
      type: "image/jpeg",
    })
  }

  setTrim = e => {
    this.setState({ trim: e.target.checked })
  }

  setOption = (changed = false) => {
    const disableList = []
    let result = []
    for (let key in marklist) {
      result = this.the_canvas.getObjects().filter(x => {
        return x.the_type === marklist[key].name
      })
      if (result.length > 1) {
        disableList.push(marklist[key].name)
      }
    }
    this.props
      .createMarkOptions(marklist, disableList)
      .then(res => {
        if (changed) {
          this.resetMarkSelect(disableList)
        }
      })
      .catch(e => {
        console.error("create mark option error", e)
      })
  }

  resetMarkSelect = (disableList = []) => {
    const mark = document.getElementById("mark")
    if (disableList.length) {
      let defaultValue = 0
      marklist.some((value, index) => {
        defaultValue = index
        return disableList.indexOf(value.name) === -1
      })
      mark.selectedIndex = defaultValue
    }
    this.props.triggerEvent(mark, "change")
  }

  render() {
    return (
      <div className="main-canvas-container">
        <canvas id="main-canvas" />
        <Form.Group>
          <Form.Check type="checkbox" onClick={this.setTrim} label="blob変換" />
        </Form.Group>
        <ButtonToolbar
          style={{
            marginTop: `15px`,
          }}
        >
          <Button variant="info" onClick={this.saveToCanvas} size="lg">
            ダウンロード
          </Button>
          <Button
            variant="light"
            onClick={this.resetCanvas}
            size="lg"
            style={{
              marginLeft: `15px`,
            }}
          >
            クリア
          </Button>
          <Button
            variant="light"
            onClick={this.previousCanvas}
            size="lg"
            style={{
              marginLeft: `15px`,
            }}
            disabled={this.state.isDisabled}
          >
            戻る
          </Button>
        </ButtonToolbar>
      </div>
    )
  }
}

export default FabricCanvas
