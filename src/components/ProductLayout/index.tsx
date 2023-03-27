import React from 'react'
import Nav from './Nav'
import { IProps } from './types'
import Footer from './Footer'

export default function ProductLayout({ title, children, showNav = true, showFooter = true }: IProps): JSX.Element {
    return (
        <div className="px-5 py-12">
            {showNav && <Nav />}
            <div>{children}</div>
            {showFooter && <Footer title={title} />}
        </div>
    )
}
