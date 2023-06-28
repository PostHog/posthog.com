import Breadcrumbs from 'components/Breadcrumbs'
import Link from 'components/Link'
import Logo from 'components/Logo'
import React from 'react'

export default function Layout({ children, crumbs = [] }) {
    return (
        <>
            <main>{children}</main>
            <footer className="px-4 mt-16 md:mt-32 pb-8">
                <div className="flex items-center justify-between py-3 border-t border-b border-dashed border-gray-accent-light">
                    <Logo color="black" noText className="opacity-20" />
                    <Link to="/questions" className="opacity-50 font-semibold text-black hover:text-black">
                        Questions?
                    </Link>
                </div>
            </footer>
        </>
    )
}
