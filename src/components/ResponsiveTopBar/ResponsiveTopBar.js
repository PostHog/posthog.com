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
      >
      <div
        style={{
          position: "static",
          width: "100%",
          height: 40,
          lineHeight: '40px'
        }}
      >
        {!anchorOpen && !sidebarHide &&
          <div style={{
            position: "absolute",
            margin: 8
          }}>
            {sidebarOpen ?
              <Button icon="close" onClick={this.onSetSidebarClose} /> :
              <Button icon="bars" onClick={this.onSetSidebarOpen} />
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
      </div>
      {sidebarOpen &&
        <div style={{
          marginTop: '2vh',
          position: "absolute",
          top: menuOpen ? nMenuItem*32 + 90 : 105,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'white',
          zIndex: 9999,
          width: '100%'
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