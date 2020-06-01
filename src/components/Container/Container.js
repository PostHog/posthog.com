import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  getMenuState,
  isSidebarHide,
  isAnchorHide,
} from '../../store/selectors'

class Container extends Component {
  render() {
    const {
      sidebarDocked,
      onPostPage,
      menuOpen,
      nMenuItem,
      sidebarHide,
      anchorHide,
      className
    } = this.props

    return (
      <div
        className={className}
      >
        <div
          style={{
            margin: onPostPage ? 0 : '0 auto',
            maxWidth: 960,
            padding: '0px 1.0875rem 1.45rem',
            marginTop:
              !sidebarDocked && onPostPage && (!sidebarHide || !anchorHide)
                ? 20
                : 0,
          }}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    menuOpen: getMenuState(state).open,
    nMenuItem: getMenuState(state).nItem,
    sidebarHide: isSidebarHide(state),
    anchorHide: isAnchorHide(state),
  }
}

export default connect(mapStateToProps)(Container)
