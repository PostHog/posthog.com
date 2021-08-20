import React, { useState, useEffect } from 'react'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import AnimateHeight from 'react-animate-height'
import { useStaticQuery, graphql } from 'gatsby'
import MenuItem from './MenuItem'

export default function MainNav({ expanded }) {
    const [height, setHeight] = useState(null)
    const breakpoints = useBreakpoint()
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
    useEffect(() => {
        setHeight(!breakpoints.md || expanded ? 'auto' : 0)
    }, [breakpoints, expanded])
    return (
        <nav>
            {height !== null && (
                <AnimateHeight
                    duration={150}
                    className={` z-50 lg:static absolute left-0 top-full w-full `}
                    height={height}
                >
                    <ul className="flex-col lg:space-y-0 space-y-6 lg:w-auto w-full bg-[#220f3f] lg:bg-transparent flex lg:space-x-14 space-x-0 lg:flex lg:flex-row list-none justify-between lg:items-center items-start mb-0 font-nav lg:px-0 px-5 lg:py-0 py-5 text-white lg:dark:text-white lg:text-almost-black">
                        {menu.map((menuItem, index) => (
                            <MenuItem key={index} menuItem={menuItem} />
                        ))}
                    </ul>
                </AnimateHeight>
            )}
        </nav>
    )
}
