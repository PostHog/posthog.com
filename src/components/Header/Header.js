import React, { Component } from 'react'
import { Link } from 'gatsby'
import Menu from '../Menu'
import logo from '../../images/posthog-logo-150x29.svg'
import whiteLogo from '../../images/posthog-logo-white.svg'
import { getMenuState } from '../../store/selectors'
import { connect } from 'react-redux'
import docsearch from 'docsearch.js'
import 'docsearch.js/dist/cdn/docsearch.min.css/'
import { SearchOutlined } from '@ant-design/icons'

const isDocsPage = () => { return window.location.pathname.split('/')[1] === "docs" }

class Header extends Component {
  componentDidMount() {
    docsearch({ apiKey: '45e80dec3e5b55c400663a5cba911c4c', indexName: 'posthog', inputSelector: '#doc-search' })
  }
  render() {
    const { sidebarDocked, onPostPage, sidebarHide, screenIsSmall, isBlogPage } = this.props

    return (

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 100

      }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'none'
          }}>
          {sidebarHide || !onPostPage ? (
            <Link
              id="logo"
              to="/"
              style={{
                //color: '#FFF',
                textDecoration: 'none',
                verticalAlign: 'center'
              }}>
              {screenIsSmall ? (
                <img alt="logo" src={logo} id="logo-image" style={{
                  display: 'flex',
                  top: 0,
                  left: 8
                }} />
              ) : (
                  <img alt="logo" src={logo} id="logo-image" />
                )}
            </Link>
          ) : (
              isBlogPage ? (
                <Link
                  id="logo"
                  to="/"
                  style={{
                    //color: '#FFF',
                    textDecoration: 'none',
                    verticalAlign: 'center'
                  }}>
                  {screenIsSmall ? (<img alt="logo" src={logo} id="logo-image" style={{
                    display: 'flex',
                    top: 0,
                    left: 8
                  }} />
                  ) : (
                      <img alt="logo" src={whiteLogo} id="logo-image" />
                    )}
                </Link>
              ) : (
                  <div style={{ height: 64, width: 0 }}></div>
                )
            )}
          <Menu
            sidebarDocked={sidebarDocked}
            sidebarHide={sidebarHide}
            isBlogPage={isBlogPage} />
        </div>
        {isDocsPage() && (
          <form className="docSearchWrapper">
            <input
              placeholder="Search our Docs"
              id="doc-search" />
            <SearchOutlined className="docSearchIcon" type="submit" />
          </form>
        )}
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
