import React, { Component } from "react"
import { fabric } from "fabric"
import { ButtonToolbar, Button } from "react-bootstrap"

class FabricCanvas extends Component {
  componentDidMount() {
    // Make a New Canvas
    this.the_canvas = new fabric.Canvas("main-canvas", {
      selection: true,
      preserveObjectStacking: false,
      height: 400,
      width: 400,
    })

    // Canvas Event Handler
    this.the_canvas.on({
      "object:selected": this.onSelected,
      // "object:moving": this.onChange,
      // "object:scaling": this.onChange,
      // "object:rotating": this.onChange,
    })
  }

  componentWillReceiveProps = newprops => {
    // If Updated Item is not the same as the old one
    // 		=> Update the canvas with newer item
    if (newprops.activeProperty !== this.props.activeProperty) {
      this.updateCanvasforImage(
        this.props.activeProperty,
        newprops.activeProperty
      )
    }
  }

  updateCanvasforImage = (prev, next) => {
    if (next) {
      let to_remove
      // Find the same kind of element
      this.the_canvas.forEachObject(object => {
        if (object.the_type === next.the_type) {
          to_remove = object
        }
      })

      this.the_canvas.remove(to_remove)

      if (next.the_type === "items") {
        this.the_canvas.setBackgroundImage(next)
        this.the_canvas.renderAll()
        return
      }

      this.the_canvas.add(next)
      // this.the_canvas.moveTo(next, next.zIndex)
    }
  }

  saveToCanvas = () => {
    let link = document.createElement("a")
    link.href = this.the_canvas.toDataURL({ format: "jpg" })
    link.download = "new_create_image.jpg"
    link.click()
  }

  resetCanvas = () => {
    this.the_canvas.clear()
  }

  // onChange = options => {
  //   options.target.setCoords()
  //   this.the_canvas.forEachObject(object => {
  //     if (object === options.target) return
  //     object.set(
  //       "opacity",
  //       options.target.intersectsWithObject(object) ? 0.5 : 1
  //     )
  //   })
  // }

  onSelected = options => {
    options.target.bringToFront()
  }

  render() {
    return (
      <div className="main-canvas-container">
        <canvas id="main-canvas" />

        <ButtonToolbar
          style={{
            marginTop: `15px`,
          }}
        >
          <Button variant="success" onClick={this.saveToCanvas} size="lg">
            ダウンロード
          </Button>
          <Button
            variant="secondary"
            onClick={this.resetCanvas}
            size="lg"
            style={{
              marginLeft: `15px`,
            }}
          >
            クリア
          </Button>
        </ButtonToolbar>
      </div>
    )
  }
}

export default FabricCanvas
