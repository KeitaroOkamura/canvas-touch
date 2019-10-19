import React, { Component } from "react"
import { fabric } from "fabric"
// import { ButtonToolbar, Button, Form } from "react-bootstrap"

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

    // global
    window.saveToCanvas = () => {
      return this.saveToCanvas()
    }
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

  saveToCanvas() {
    return new Promise((resolve, reject) => {
      // canvas から DataURL で画像を出力
      let beforeDataUrl = this.the_canvas.toDataURL("image/jpeg")
      this.props.loadImage(beforeDataUrl, "")
      .then(res => {
        // 画像生成
        const imgInstance = new fabric.Image(res, {
          width: this.props.size.width,
          height: this.props.size.height
        })
        // 指定のサイズに変換
        const beforeDataUrl = imgInstance.toDataURL("image/jpeg", 0.1)
        // minetypeは不要なため削除
        const base64 = beforeDataUrl.replace(/^.*,/, "")
        // Base64のまま送信
        resolve(base64)
        // TODO: 削除
          // blob = this.base64toBlob(base64), // blob変換
          // dataUrl = url.createObjectURL(blob) // blobを参照するための一時的なURLを作成（ダウンロード用）
      })
      .catch(e => {
        console.error("save error", e)
        reject(e)
      })
    })
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
    this.setOption(true)
    // Add Image Flg Changed
    this.setState({ add: true })
    // Back Button Status Changed
    this.setState({ isDisabled: this.the_canvas.getObjects().length <= 0 })
  }

  resetCanvas = () => {
    // All reset
    // this.the_canvas.clear()
    // Reset everything image except the background image
    this.the_canvas.remove(...this.the_canvas.getObjects().concat())
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
    // マーク一覧取得
    const mark = document.querySelector("#mark")
    let marklist = []
    for (let i = 0; i < mark.options.length; i++) {
      marklist.push({
        name: mark.options[i].text,
        path: mark.options[i].value
      })
    }

    // エラー回避
    if(!marklist){
      return true
    }

    for (let key in marklist) {
      result = this.the_canvas.getObjects().filter(x => {
        return x.value === marklist[key].path
      })
      if (result.length > 1) {
        disableList.push(marklist[key].name)
      }
    }
    this.props
      .createMarkOptions(marklist, disableList)
      .then(res => {
        if (changed) {
          this.resetMarkSelect(marklist, disableList)
        }
      })
      .catch(e => {
        console.error("create mark option error", e)
      })
  }

  resetMarkSelect = (marklist, disableList = []) => {
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
      </div>
    )
  }
}

export default FabricCanvas
