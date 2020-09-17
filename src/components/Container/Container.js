import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getMenuState, isSidebarHide, isAnchorHide } from '../../store/selectors'

class Container extends Component {
    render() {
        const { sidebarDocked, onPostPage, sidebarHide, anchorHide, className, containerStyle = {} } = this.props

        return (
            <div className={className + ' ' + (onPostPage && ' docs-container')}>
                <div
                    style={{
                        ...containerStyle,
                    }}
                >
                    {this.props.children}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        menuOpen: getMenuState(state).open,
        nMenuItem: getMenuState(state).nItem,
        sidebarHide: isSidebarHide(state),
        anchorHide: isAnchorHide(state),
    }
}

export default connect(mapStateToProps)(Container)
