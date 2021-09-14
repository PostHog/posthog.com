import React from 'react'
import { Menu as AntMenu } from 'antd'

function Menu() {
    return (
        <div className="flex justify-between items-center">
            <AntMenu.Item className="header-key main-nav-cta-wrapper">
                <a href="https://app.posthog.com/signup?src=menu">
                    <span>Get started now</span>
                </a>
            </AntMenu.Item>
        </div>
    )
}

export default Menu
export { Menu }
