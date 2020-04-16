import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from 'antd/lib/button'
import 'antd/lib/button/style/css'
import { getSidebarState, getAnchorState, getMenuState, isSidebarHide, isAnchorHide } from '../../store/selectors';
import { onSetAnchorOpen, onSetSidebarOpen } from '../../actions/layout'
import SidebarContents from '../SidebarContents';
import TableOfContents from '../TableOfContents';

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
    } = this.props

    return (
      <div
        style={{
          height: 20,
        }}
      >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: 40,
          background: 'aliceblue',
          marginTop: '-20px',
        }}
      >
        {!anchorOpen && !sidebarHide &&
          <div style={{
            position: "absolute",
            left: 8,
            top: 4
          }}>
            {sidebarOpen ?
              <Button icon="close" onClick={this.onSetSidebarClose} /> :
              <Button icon="bars" onClick={this.onSetSidebarOpen} />
            }
          </div>}
        {!sidebarOpen && !anchorHide &&
          <div style={{
            position: "absolute",
            right: 8,
            top: 4
          }}>
            {anchorOpen ?
              <Button icon="close" onClick={this.onSetAnchorClose} /> :
              <Button icon="ellipsis" onClick={this.onSetAnchorOpen} />
            }
          </div>
        }
      </div>
      {sidebarOpen &&
        <div style={{
          position: "fixed",
          top: menuOpen ? nMenuItem*32 + 90 : 95,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'white',
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            transition: "left .3s ease-out, right .3s ease-out",
            overscrollBehaviorY: 'contain',
          }}>
            <SidebarContents/>
          </div>
        </div>
      }
      {anchorOpen &&
        <div style={{
          position: "fixed",
          top: menuOpen ? nMenuItem*32 + 90 : 95,
          left: 0,
          right: 0,
          bottom: 0,
          overflowY: "auto",
          backgroundColor: 'white',
          WebkitOverflowScrolling: "touch",
          transition: "left .3s ease-out, right .3s ease-out",
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