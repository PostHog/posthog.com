import Link from 'components/Link'
import { Logo } from '@posthog/brand/logo'
import React from 'react'
import { heading, section } from './classes'

export default function Intro({ title, children = null }) {
    return (
        <div className={section()}>
            <Link to="/">
                <Logo className="mx-auto" width="auto" />
            </Link>
            <h1 className={heading('mt-6')}>{title}</h1>
            {children}
        </div>
    )
}
