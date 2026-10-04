import Breadcrumbs from 'components/Breadcrumbs'
import Link from 'components/Link'
import { Logo } from '@posthog/brand/logo'
import React from 'react'

export default function Layout({ children, crumbs = [] }) {
    return (
        <>
            <main>{children}</main>
            <footer className="px-4 mt-16 md:mt-32 pb-8">
                <div className="flex items-center justify-between py-3 border-t border-b border-dashed border-primary">
                    <Logo
                        variant="mono"
                        color="currentColor"
                        layout="logomark"
                        className="text-primary opacity-20"
                        width="auto"
                    />
                    <Link to="/questions" className="opacity-50 font-semibold text-black hover:text-black">
                        Questions?
                    </Link>
                </div>
            </footer>
        </>
    )
}
