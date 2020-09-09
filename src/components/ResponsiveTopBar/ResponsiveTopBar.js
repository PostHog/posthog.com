import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from 'antd/lib/button'
import 'antd/lib/button/style/css'
import { getSidebarState, getAnchorState, getMenuState, isSidebarHide, isAnchorHide } from '../../store/selectors';
import { onSetAnchorOpen, onSetSidebarOpen } from '../../actions/layout'
import SidebarContents from '../SidebarContents';
import TableOfContents from '../TableOfContents';

const getCurrentSidebar = () => {
  let pathSections = window.location.pathname.split('/')
  return pathSections.length > 3 ? parseSidebarName(window.location.pathname.split('/')[2]) : "PostHog Docs"
}

const parseSidebarName = (sidebarPath) => {
    const regex = /(^|\s)\S/g
    return sidebarPath === "api" ? "API" : sidebarPath.replace(/-/g, ' ').replace(regex, letter => letter.toUpperCase())
}

const isDocsPage = () => {return window.location.pathname.split('/')[1] === "docs"}

class ResponsiveTopBar extends Component {
  onSetSidebarOpen = () => {
    this.props.onSetSidebarOpen(true)
  }

  onSetSidebarClose = () => {
    this.props.onSetSidebarOpen(false)
  }

  onSetAnchorOpen = () => {
    this.props.onSetAnchorOpen(true)
  }

  onSetAnchorClose = () => {
    this.props.onSetAnchorOpen(false)
  }

  render() {
    const { 
      sidebarOpen,
      anchorOpen,
      menuOpen,
      nMenuItem,
      sidebarHide,
      anchorHide,
      pageTitle,
    } = this.props

    return (
      <div className={"redTopbar " + (sidebarOpen && "redTopbarOpen")}>
        <div className="redTopbarText">
          <h2 style={{color: 'white'}}>{pageTitle}</h2>
            {isDocsPage() && <p>{getCurrentSidebar()}</p>}
        </div>
        {!anchorOpen && !sidebarHide &&
          <div>
            {sidebarOpen ?
              <Button className="redTopbarButton" icon="up" type="link" onClick={this.onSetSidebarClose} /> :
              <Button className="redTopbarButton" icon="down" type="link" onClick={this.onSetSidebarOpen} />
            }
          </div>}

        {/*{!sidebarOpen && !anchorHide &&
          <div style={{
            position: "absolute",
            right: 8,
          }}>
            {anchorOpen ?
              <Button icon="close" onClick={this.onSetAnchorClose} /> :
              <Button icon="ellipsis" onClick={this.onSetAnchorOpen} />
            }
          </div>*/}
      {sidebarOpen &&
        <div className="sidebarMenuMobile">
            <SidebarContents/>
        </div>
      }
      {anchorOpen &&
        <div style={{
          position: "absolute",
          top: menuOpen ? nMenuItem*32 + 90 : 105,
          left: 0,
          right: 0,
          bottom: 0,
          overflowY: "auto",
          backgroundColor: 'white',
          WebkitOverflowScrolling: "touch",
          transition: "left .3s ease-out, right .3s ease-out",
          zIndex: 99999
        }}>
          <TableOfContents offsetTop={95} affix={false}/>
        </div>
      }

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sidebarOpen: getSidebarState(state).open,
    anchorOpen: getAnchorState(state).open,
    menuOpen: getMenuState(state).open,
    nMenuItem: getMenuState(state).nItem,
    sidebarHide: isSidebarHide(state),
    anchorHide: isAnchorHide(state),
  }
}

const mapDispatchToProps = {
  onSetSidebarOpen,
  onSetAnchorOpen
}

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveTopBar)