import React from 'react'
import Breadcrumbs from 'components/Breadcrumbs'
import Logo from 'components/Logo'
import Link from 'components/Link'

export default function Layout({ children, crumbs = [] }) {
    return (
        <>
            <header className="px-10">
                <Breadcrumbs crumbs={crumbs} />
            </header>
            <main>{children}</main>
            <footer className="px-10 mt-16 md:mt-32 pb-8">
                <div className="flex items-center justify-between py-3 border-t border-b border-dashed border-gray-accent-light">
                    <Logo color="black" noText className="opacity-20" />
                    <Link to="/support" className="opacity-50 text-base text-black hover:text-black">
                        Support
                    </Link>
                </div>
            </footer>
        </>
    )
}
