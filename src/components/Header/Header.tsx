import Link from 'components/Link'
import Logo from 'components/Logo'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import './style.scss'

const Nav = () => {
    const { navsJson } = useStaticQuery(query)

    return (
        <>
            <Link
                className="text-primary hover:text-primary dark:text-primary-dark dark:hover:text-primary-dark block"
                to="/"
            >
                <Logo />
            </Link>
            <nav className="h-full flex flex-col">
                {navsJson?.main.map(({ title, children }, index) => {
                    return (
                        <div key={index} className="mt-8 last:mt-auto">
                            {title && (
                                <p className="text-[14px] font-semibold text-primary opacity-25 m-0 mb-3">{title}</p>
                            )}
                            <ul className="list-none p-0 m-0 flex flex-col space-y-3">
                                {children.map(({ title, url }) => {
                                    return (
                                        <li key={title}>
                                            <Link
                                                className="text-base text-black hover:text-black hover:opacity-100 opacity-50 transition-opacity font-semibold"
                                                to={url}
                                            >
                                                {title}
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })}
            </nav>
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

const query = graphql`
    query NavQuery {
        navsJson {
            main {
                title
                children {
                    title
                    url
                }
            }
        }
    }
`
