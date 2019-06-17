import React, { Component } from "react"
import { Col } from "react-bootstrap"
import { fabric } from "fabric"

import Layout from "../components/layout"
import SEO from "../components/seo"
import FabricCanvas from "../components/FabricCanvas"
import SelectImage from "../components/SelectImage"
import { marklist, baselist } from "../images/templates/templatelist"

class IndexPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeProperty: null,
    }
  }

  addToCanvas = (imgElement, property_type, z_Index) => {
    const width = property_type === "items" ? 400 : 48
    const height = property_type === "items" ? 400 : 48
    const imgInstance = new fabric.Image(imgElement, {
      width: width,
      height: height,
      the_type: property_type,
    })

    this.setState({ activeProperty: imgInstance })
  }

  render() {
    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <div className="row">
          <Col md={6}>
            <SelectImage
              data={baselist}
              property_type="items"
              controlId="base"
              label="ベース選択"
              zIndex={-9999}
              addToCanvas={this.addToCanvas}
              xs={6}
              md={4}
            />
            <SelectImage
              data={marklist}
              property_type="marks"
              controlId="mark"
              label="マーク選択"
              zIndex={0}
              addToCanvas={this.addToCanvas}
              xs={6}
              md={4}
            />
          </Col>

          <Col md={6}>
            <FabricCanvas activeProperty={this.state.activeProperty} />
          </Col>
        </div>
      </Layout>
    )
  }
}
export default IndexPage
