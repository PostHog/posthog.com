import React, { useEffect, useRef, useState } from 'react'
import Menu from './Menu'

export default function MainSidebar({ slug, menu, className, mainEl, height, sticky, top = 0 }) {
    const [navHeight, setNavHeight] = useState(height)
    const navEl = useRef()
    useEffect(() => {
        const isBrowser = typeof window !== 'undefined'
        if (!height && mainEl && isBrowser) {
            const offset = top * 2
            const navHeight = Math.min(window.innerHeight - offset, mainEl.current.getBoundingClientRect().height)
            setNavHeight(navHeight)
        }
    }, [])
    return (
        <aside style={sticky ? { position: 'sticky', top: '1rem' } : {}} className={className}>
            <nav
                ref={navEl}
                //style={{ maxHeight: navHeight || 'auto' }}
                style={{ height: 'calc(100vh - 2rem)' }}
                className="w-[224px] overflow-y-auto overflow-x-hidden"
            >
                <Menu menu={menu} slug={slug} topLevel />
            </nav>
        </aside>
    )
}

export const query = graphql`
    fragment DocsSidebar on Query {
        docsSidebar: file(absolutePath: { regex: "//sidebars/sidebars.json$/" }) {
            childSidebarsJson {
                docs {
                    children {
                        children {
                            children {
                                children {
                                    children {
                                        name
                                        url
                                    }
                                    name
                                    url
                                }
                                name
                                url
                            }
                            name
                            url
                        }
                        name
                        url
                    }
                    name
                    url
                }
            }
        }
    }

    fragment HandbookSidebar on Query {
        handbookSidebar: file(absolutePath: { regex: "//sidebars/sidebars.json$/" }) {
            childSidebarsJson {
                handbook {
                    children {
                        children {
                            children {
                                children {
                                    children {
                                        name
                                        url
                                    }
                                    name
                                    url
                                }
                                name
                                url
                            }
                            name
                            url
                        }
                        name
                        url
                    }
                    name
                    url
                }
            }
        }
    }
`
