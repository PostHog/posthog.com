import Link from 'components/Link'
import Logo from 'components/Logo'
import React from 'react'
import './style.scss'

const Nav = () => {
    const nav = ['Home', 'Product', 'Customers', 'Pricing']
    const nav2 = ['Docs', 'API', 'Blog', 'Tutorials', 'User guides']
    const nav3 = ['Our story', 'Handbook', 'Community', 'Careers']
    return (
        <>
            <Link
                className="text-primary hover:text-primary dark:text-primary-dark dark:hover:text-primary-dark block"
                to="/"
            >
                <Logo />
            </Link>

            <div className="mt-8">
                <ul className="list-none p-0 m-0 flex flex-col space-y-3">
                    {nav.map((item) => {
                        return (
                            <li key={item}>
                                <Link
                                    className="text-base text-black hover:text-black hover:opacity-100 opacity-50 transition-opacity font-semibold"
                                    to="/"
                                >
                                    {item}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="mt-8">
                <p className="text-[14px] font-semibold text-primary opacity-25 m-0 mb-3">Resources</p>
                <ul className="list-none p-0 m-0 flex flex-col space-y-3 ">
                    {nav2.map((item) => {
                        return (
                            <li key={item}>
                                <Link
                                    className="text-base text-black hover:text-black hover:opacity-100 opacity-50 transition-opacity font-semibold"
                                    to="/"
                                >
                                    {item}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="mt-auto">
                <p className="text-[14px] font-semibold text-primary opacity-25 m-0 mb-3">Company</p>
                <ul className="list-none p-0 m-0 flex flex-col space-y-3 ">
                    {nav3.map((item) => {
                        return (
                            <li key={item}>
                                <Link
                                    className="text-base text-black hover:text-black hover:opacity-100 opacity-50 transition-opacity font-semibold"
                                    to="/"
                                >
                                    {item}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export const Header = (): JSX.Element => {
    return (
        <header className="flex flex-col h-full">
            <Nav />
        </header>
    )
}
