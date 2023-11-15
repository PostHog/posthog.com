import { IconChevronDown } from '@posthog/icons'
import React, { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useLocation } from '@reach/router'

export default function Slider({ className = '', activeIndex, children }) {
    const ref = useRef<HTMLUListElement>(null)
    const [firstRef, firstInView] = useInView({ threshold: 0.9 })
    const [lastRef, lastInView] = useInView({ threshold: 0.9 })
    const [overflowing, setOverflowing] = useState(false)
    const menuItemsRef = useRef(null)
    const { pathname } = useLocation()

    const scrollToIndex = (index) => {
        const map = getMap()
        const node = map.get(index)
        node?.scrollIntoView({
            block: 'nearest',
            inline: 'center',
        })
    }

    const getMap = () => {
        if (!menuItemsRef.current) {
            menuItemsRef.current = new Map()
        }
        return menuItemsRef.current
    }

    function handleResize() {
        setOverflowing((ref?.current && ref?.current.scrollWidth > ref?.current.clientWidth) || false)
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        handleResize()
    }, [pathname])

    useEffect(() => {
        if (overflowing) scrollToIndex(activeIndex)
    }, [overflowing])

    return children?.length > 0 ? (
        <div className={`relative ${overflowing ? '' : ''}`}>
            {overflowing && (
                <button
                    onDoubleClick={(e) => e.preventDefault()}
                    onClick={() => ref.current?.scrollBy({ left: -75, behavior: 'smooth' })}
                    className={`absolute top-0 -left-4 md:left-0 h-[calc(100%-2px)] flex justify-end items-center w-8 pl-2 bg-gradient-to-l from-transparent to-light via-light dark:via-dark dark:to-dark ${
                        firstInView ? '-z-10 opacity-0' : 'z-10'
                    }`}
                >
                    <IconChevronDown className="w-8 h-8 rounded-sm text-primary/60 hover:text-primary/100 dark:text-primary-dark/60 dark:hover:text-primary-dark/100 rotate-90 hover:bg-accent/25 dark:hover:bg-accent-dark/25 hover:backdrop-blur-sm active:backdrop-blur-sm border-transparent hover:border hover:border-light dark:hover:border-dark relative hover:scale-[1.02] active:top-[.5px] active:scale-[.99]" />
                </button>
            )}
            <ul
                ref={ref}
                className={`list-none p-0 flex space-x-0.5 snap-x overflow-y-hidden overflow-x-auto justify-start ${className}`}
            >
                {children.map((child, index) => {
                    return (
                        <li
                            className="snap-start"
                            key={index}
                            ref={(node) => {
                                const map = getMap()
                                if (node) {
                                    map.set(index, node)
                                } else {
                                    map.delete(index)
                                }
                            }}
                        >
                            <div
                                className="h-full"
                                ref={index === 0 ? firstRef : index === children.length - 1 ? lastRef : null}
                            >
                                {child}
                            </div>
                        </li>
                    )
                })}
            </ul>
            {overflowing && (
                <button
                    onDoubleClick={(e) => e.preventDefault()}
                    onClick={() => ref.current?.scrollBy({ left: 75, behavior: 'smooth' })}
                    className={`absolute top-0 -right-4 md:right-0 h-[calc(100%-2px)] flex justify-end items-center w-8 pr-2 bg-gradient-to-r from-transparent to-light via-light dark:via-dark dark:to-dark ${
                        lastInView ? '-z-10 opacity-0' : 'z-10'
                    }`}
                >
                    <IconChevronDown className="w-8 h-8 rounded-sm text-primary/60 hover:text-primary/100 dark:text-primary-dark/60 dark:hover:text-primary-dark/100 -rotate-90 hover:bg-accent/25 dark:hover:bg-accent-dark/25 hover:backdrop-blur-sm active:backdrop-blur-sm border-transparent hover:border hover:border-light dark:hover:border-dark relative hover:scale-[1.02] active:top-[.5px] active:scale-[.99]" />
                </button>
            )}
        </div>
    ) : null
}
