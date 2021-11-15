import React from 'react'
import { Menu as AntMenu } from 'antd'
import Link from '../Link'

function Menu() {
    return (
        <div className="flex justify-between items-center">
            <AntMenu.Item className="header-key main-nav-cta-wrapper">
                <Link to="https://app.posthog.com/signup?src=menu" addGclid>
                    <span>Get started now</span>
                </Link>
            </AntMenu.Item>
        </div>
    )
}

export default Menu
export { Menu }
