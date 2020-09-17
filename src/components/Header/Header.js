import React, { Component } from 'react'
import { Link } from 'gatsby'
import Menu from '../Menu'
import logo from '../../images/posthog-logo-150x29.svg'
import whiteLogo from '../../images/posthog-logo-white.svg'
import { getMenuState } from '../../store/selectors'
import { connect } from 'react-redux'
import { withPrefix } from 'gatsby-link'

const isHomePage = () => { return window.location.pathname === withPrefix("") }
const isDocsPage = () => { return window.location.pathname.split("/")[1] === "docs" }
const isBlogArticlePage = () => { 
  const parsedUrl = window.location.pathname.split("/")
  return parsedUrl[1] === "blog" && parsedUrl.length > 2
}

class Header extends Component {

  render() {

    const { sidebarDocked, onPostPage, sidebarHide, screenIsSmall, isBlogPage } = this.props

    return (
      <div className={"menuHeaderWrapper " + (!isBlogPage && !sidebarHide && !screenIsSmall && onPostPage && "noLogo")}>
        {/* Desktop Docs pages = (onPostPage && !screenIsSmall) 
            They already have a logo on the sidebar - skip adding the logo to navbar */}
        {!(onPostPage && !screenIsSmall && isDocsPage()) && (
          <Link
            id="logo"
            to="/">
            <img
              alt="logo"
              id="logo-image-header"
              src={
                (isHomePage() || isBlogArticlePage()) ? whiteLogo : logo
              }
            />
            <h1>{String(isBlogArticlePage())}</h1>
          </Link>
        )}
        <Menu
          sidebarDocked={sidebarDocked}
          sidebarHide={sidebarHide}
          isBlogPage={isBlogPage}
          screenIsSmall={screenIsSmall}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    menuOpen: getMenuState(state).open,
    nMenuItem: getMenuState(state).nItem,
  }
}

export default connect(mapStateToProps)(Header)
