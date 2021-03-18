import React from 'react'
import { Menu as AntMenu } from 'antd'
import { layoutLogic } from '../../logic/layoutLogic'
import { useActions } from 'kea'

function Menu() {
    const { setIsGetStartedModalOpen } = useActions(layoutLogic)
    return (
        <div className="flex justify-between items-center">
            <AntMenu.Item className="header-key main-nav-cta-wrapper">
                <a onClick={() => setIsGetStartedModalOpen(true)}>
                    <span>Get started now</span>
                </a>
            </AntMenu.Item>
        </div>
    )
}

export default Menu
export { Menu }
