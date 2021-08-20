import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import MenuItem from './MenuItem'

export default function MainNav({ expanded }) {
    const data = useStaticQuery(graphql`
        query MainNavQuery {
            navsJson {
                main {
                    title
                    url
                    sub {
                        title
                        description
                        items {
                            title
                            link {
                                title
                                url
                            }
                            sections {
                                link {
                                    title
                                    url
                                }
                                title
                                items {
                                    icon
                                    title
                                    url
                                }
                            }
                            footerLinks {
                                title
                                url
                            }
                        }
                    }
                }
            }
        }
    `)
    const menu = data?.navsJson?.main

    return (
        <nav>
            <ul
                className={`z-50 lg:static absolute left-0 top-full flex-col lg:space-y-0 space-y-6 lg:w-auto w-full bg-[#220f3f] lg:bg-transparent flex lg:space-x-14 space-x-0 lg:flex lg:flex-row list-none justify-between lg:items-center items-start mb-0 font-nav lg:px-0 px-5 lg:py-0 py-5 text-white lg:dark:text-white lg:text-almost-black lg:visible ${
                    expanded ? 'visible' : 'invisible'
                }`}
            >
                {menu.map((menuItem, index) => (
                    <MenuItem key={index} menuItem={menuItem} />
                ))}
            </ul>
        </nav>
    )
}
