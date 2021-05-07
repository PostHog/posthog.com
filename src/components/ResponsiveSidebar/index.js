import { Spacer } from 'components/Spacer'
import React from 'react'
import SidebarContents from '../SidebarContents'

export const ResponsiveSidebar = () => {
    return (
        <div className="sidebarWrapper">
            <Spacer height={10} />
            <SidebarContents />
        </div>
    )
}
