import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from 'antd/lib/button'
import 'antd/lib/button/style/css'
import { getSidebarState, getAnchorState, getMenuState, isSidebarHide, isAnchorHide } from '../../store/selectors'
import { onSetAnchorOpen, onSetSidebarOpen } from '../../actions/layout'
import SidebarContents from '../SidebarContents'
import TableOfContents from '../TableOfContents'

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
        const { sidebarOpen, anchorOpen, menuOpen, nMenuItem, sidebarHide, anchorHide } = this.props

        return (
            <div>
                <div>
                    {!anchorOpen && !sidebarHide && (
                        <div className="sidebarButtonWrapper">
                            {sidebarOpen ? (
                                <Button className="sidebarButton" icon="close" onClick={this.onSetSidebarClose} />
                            ) : (
                                <Button className="sidebarButton" icon="bars" onClick={this.onSetSidebarOpen} />
                            )}
                        </div>
                    )}
                </div>
                {sidebarOpen && (
                    <div className="mobileSidebarWrapper">
                        <div className="mobileSidebar">
                            <SidebarContents />
                        </div>
                    </div>
                )}
                {anchorOpen && (
                    <div className="mobileSidebar">
                        <TableOfContents offsetTop={95} affix={false} />
                    </div>
                )}
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
    onSetAnchorOpen,
}

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveTopBar)
