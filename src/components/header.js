import PropTypes from "prop-types"
import React from "react"
import { Jumbotron } from "react-bootstrap"

const Header = ({ siteTitle }) => (
  <Jumbotron>
    <h1>{siteTitle}</h1>
  </Jumbotron>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
