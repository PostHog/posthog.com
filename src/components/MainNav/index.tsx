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
        <div className="border-b border-[#4d4e52] bg-[#202228] mb-5">
            <div className="grid grid-cols-3 max-w-screen-3xl mx-auto px-5">
                <Link className="py-4" to="/">
                    <Logo color={'white'} />
                </Link>

                <ul className="flex list-none m-0 p-0 justify-center items-center">
                    {menu.map(({ title, url }) => {
                        const active = typeof window !== 'undefined' && window.location.pathname === url
                        return (
                            <li className="h-full" key={title}>
                                <Link
                                    to={url}
                                    className={`text-base py-4 inline-block relative h-full ${
                                        active ? 'px-[30px]' : 'px-5'
                                    }`}
                                >
                                    {active && (
                                        <span
                                            className={`bg-[#1d1f27] absolute w-full h-[calc(100%+1px)] left-0 inset-0
                                            before:absolute before:border-r before:top-0 before:h-full before:border-[#4d4e52] before:w-[10px] before:rounded-br-lg before:border-b before:left-0 before:bg-[#202228] before:z-10
                                            after:absolute after:border-l after:top-0 after:h-full after:border-[#4d4e52] after:w-[10px] after:rounded-bl-lg after:border-b after:right-0 after:bg-[#202228]`}
                                        >
                                            <span className="absolute bottom-0 left-0 border-b border-[#1d1f27] w-full" />
                                        </span>
                                    )}
                                    <span className="relative">{title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                <div className="self-center flex justify-end items-center space-x-4">
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
