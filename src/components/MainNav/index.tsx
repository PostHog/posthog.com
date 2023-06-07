import Logo from 'components/Logo'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { useValues } from 'kea'
import { layoutLogic } from '../../logic/layoutLogic'
import Link from 'components/Link'
import { CallToAction } from 'components/CallToAction'
import { Search } from 'components/Icons'
import { Person } from 'components/NotProductIcons'
import { useSearch } from 'components/Search/SearchContext'
import Tooltip from 'components/Tooltip'

export default function MainNav() {
    const { websiteTheme } = useValues(layoutLogic)
    const data = useStaticQuery(graphql`
        query MainNavQuery {
            navsJson {
                main {
                    title
                    url
                }
            }
        }
    `)
    const { open } = useSearch()

    const menu = data?.navsJson?.main

    return (
        <div className="border-b border-light dark:border-dark bg-accent dark:bg-accent-dark mb-5">
            <div className="flex max-w-screen-3xl mx-auto px-5 justify-between">
                <Link className="py-4 grow-0 shrink-0 basis-[auto]" to="/">
                    <Logo color={'white'} className="h-[20px]" />
                </Link>

                <ul className="flex list-none m-0 p-0">
                    {menu.map(({ title, url }) => {
                        const active = typeof window !== 'undefined' && window.location.pathname === url
                        return (
                            <li className="h-full" key={title}>
                                <Link
                                    to={url}
                                    className={`text-sm flex h-full items-center relative p-4 ${
                                        active ? 'px-[calc(1rem_+_10px)] mx-[-10px]' : ''
                                    }`}
                                >
                                    {active && (
                                        <span
                                            className={`bg-light dark:bg-dark absolute w-full h-[calc(100%+1px)] left-0 inset-0
                                            before:absolute before:border-r before:top-0 before:h-full before:border-light dark:before:border-dark before:w-[10px] before:rounded-br-lg before:border-b before:left-0 before:bg-accent dark:before:bg-accent-dark before:z-10
                                            after:absolute after:border-l after:top-0 after:h-full after:border-light dark:after:border-dark after:w-[10px] after:rounded-bl-lg after:border-b after:right-0 after:bg-accent dark:after:bg-accent-dark`}
                                        >
                                            <span className="absolute bottom-0 left-0 border-b border-bg-light dark:border-bg-dark w-full" />
                                        </span>
                                    )}
                                    <span className="relative">{title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                <div className="flex items-center justify-end space-x-4">
                    <CallToAction size="xs">Get started</CallToAction>
                    <button onClick={() => open('header')}>
                        <Search className="opacity-50" />
                    </button>
                    <button>
                        <Tooltip
                            placement="bottom-end"
                            title="Login"
                            content={() => (
                                <ul className="list-none m-0 p-0 grid gap-y-2 w-[200px]">
                                    <li className="w-full">
                                        <Link
                                            className="text-sm px-2 py-2 rounded-sm hover:bg-black"
                                            to="https://app.posthog.com"
                                        >
                                            PostHog app
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="text-sm px-2 py-2 rounded-sm hover:bg-black" to="/community">
                                            Community
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        >
                            <span className="relative">
                                <Person className="opacity-50" />
                            </span>
                        </Tooltip>
                    </button>
                </div>
            </div>
        </div>
    )
}
