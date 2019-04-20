import React, { Component } from "react"
import { Col, Tabs, Tab } from "react-bootstrap"
import { fabric } from "fabric"

import Layout from "../components/layout"
import SEO from "../components/seo"
import FabricCanvas from "../components/FabricCanvas"
import TemplateList from "../components/TemplateList"
import {
  animallist,
  foodlist,
  humanlist,
  itemlist,
  otherlist,
} from "../images/templates/templatelist"

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
            <Tabs defaultActiveKey={1} id="main_tabs">
              <Tab eventKey={1} title="商品選択">
                <TemplateList
                  data={itemlist}
                  property_type="items"
                  zIndex={-9999}
                  addtocanvas={this.addToCanvas}
                  xs={6}
                  md={4}
                />
              </Tab>
              <Tab eventKey={2} title="動物">
                <TemplateList
                  data={animallist}
                  property_type="animals"
                  zIndex={0}
                  addtocanvas={this.addToCanvas}
                  xs={0}
                  md={0}
                />
              </Tab>
              <Tab eventKey={3} title="食べ物">
                <TemplateList
                  data={foodlist}
                  property_type="boods"
                  zIndex={1}
                  addtocanvas={this.addToCanvas}
                  xs={0}
                  md={0}
                />
              </Tab>
              <Tab eventKey={4} title="人物">
                <TemplateList
                  data={humanlist}
                  property_type="humans"
                  zIndex={2}
                  addtocanvas={this.addToCanvas}
                  xs={0}
                  md={0}
                />
              </Tab>
              <Tab eventKey={5} title="その他">
                <TemplateList
                  data={otherlist}
                  property_type="others"
                  zIndex={3}
                  addtocanvas={this.addToCanvas}
                  xs={0}
                  md={0}
                />
              </Tab>
            </Tabs>
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
