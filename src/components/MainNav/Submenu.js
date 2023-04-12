import React from 'react'
import Docs from './Submenus/Docs/index'
import Company from './Submenus/Company/index'
import Community from './Submenus/Community/index'
import UsingPostHog from './Submenus/UsingPostHog/index'
import Products from './Submenus/Products/index'

const submenus = {
    Docs,
    Company,
    Community,
    UsingPostHog,
    Products,
}

export default function Submenu({ referenceElement, menu, open, parentURL }) {
    const { component } = menu
    const variants = {
        hidden: { height: 0 },
        shown: { height: 'auto' },
    }
    return submenus[component]({ referenceElement })
}
