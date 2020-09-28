import React from 'react'
import Button from 'antd/lib/button'
import 'antd/lib/button/style/css'
import SidebarContents from '../SidebarContents'
import TableOfContents from '../TableOfContents'
import { useActions, useValues } from 'kea'
import { layoutLogic } from '../../logic/layoutLogic'

function ResponsiveTopBar() {
    const { anchorOpen, sidebarOpen, sidebarHide } = useValues(layoutLogic)
    const { setSidebarOpen } = useActions(layoutLogic)

    return (
        <div>
            <div>
                {!anchorOpen && !sidebarHide && (
                    <div className="sidebarButtonWrapper">
                        {sidebarOpen ? (
                            <Button className="sidebarButton" icon="close" onClick={() => setSidebarOpen(false)} />
                        ) : (
                            <Button className="sidebarButton" icon="bars" onClick={() => setSidebarOpen(true)} />
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

export default ResponsiveTopBar
