import { IconChevronDown, IconLogomark } from '@posthog/icons'
import React, { useRef } from 'react'
import OSButton from 'components/OSButton'

type CardProps = {
    top: string
    bottom: React.ReactNode
    Image: React.ReactNode
    imageClassName?: string
    color?: string
}

const Card = ({ top, bottom, Image, imageClassName, color }: CardProps) => {
    const encodedQuestion = encodeURIComponent(top)
    const maxUrl = `https://app.posthog.com/#panel=max:!${encodedQuestion}`

    return (
        <li
            style={{ backgroundColor: color || 'white' }}
            className="h-[643px] w-[500px] @2xl:h-[411px] @2xl:w-[320px] flex flex-col justify-between p-10 @2xl:p-6 gap-8 @2xl:gap-4 rounded-md relative even:rotate-3 odd:-rotate-3 flex-shrink-0 snap-center overflow-hidden shadow-xl"
        >
            <div>
                <h5 className="mt-0 mb-4 @2xl:mb-2 text-4xl @2xl:text-2xl text-black relative">"{top}"</h5>
                <p className="text-3xl @2xl:text-lg text-black m-0 relative leading-normal">{bottom}</p>
            </div>
            <figure
                className={`flex-1 flex w-full justify-center items-center scale-[2] @2xl:scale-110 mb-8 ${imageClassName}`}
            >
                {Image}
            </figure>
            <div className="absolute bottom-4 left-8 right-8">
                <OSButton
                    asLink
                    to={maxUrl}
                    variant="secondary"
                    size="lg"
                    width="full"
                    className="flex items-center gap-2"
                    external
                >
                    <IconLogomark className="size-6" />
                    <span className="text-lg">Ask PostHog AI</span>
                </OSButton>
            </div>
        </li>
    )
}

export default function Cards({ data, buttons = true }: { data: CardProps[]; buttons?: boolean }) {
    const listRef = useRef<HTMLUListElement>(null)

    const getScrollDistance = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 768) return 300
            if (window.innerWidth < 1024) return 600
            return 900
        }
        return 300 // Default value if window is not available
    }

    return (
        <div className="relative overflow-hidden px-8">
            {buttons && (
                <>
                    <div className="absolute z-10 -left-10 top-64 bottom-32 w-48 bg-gradient-radial from-light/30 via-light/0 to-light/0 dark:from-dark/30 dark:via-dark/0 dark:to-dark/0" />
                    <div className="absolute z-20 top-1/2 -left-6 md:left-0 -translate-y-1/2 mt-12">
                        <button
                            onClick={() =>
                                listRef?.current?.scrollBy({ left: -getScrollDistance(), behavior: 'smooth' })
                            }
                            className="relative hover:scale-[1.01] hover:top-[-1px] active:top-[.5px] active:scale-[.99] md:z-30 p-8"
                        >
                            <IconChevronDown className="prose-invert w-12 h-12 rounded-sm text-primary bg-primary rotate-90 hover:backdrop-blur-sm active:backdrop-blur-sm" />
                        </button>
                    </div>
                </>
            )}

            <ul
                ref={listRef}
                className="list-none m-0 p-0 flex space-x-12 w-full px-5 snap-x overflow-x-auto overflow-y-hidden py-6 lg:py-12"
            >
                {data.map((card, index) => {
                    return <Card {...card} key={index} />
                })}
            </ul>
            {buttons && (
                <>
                    <div className="absolute -right-10 top-64 bottom-32 w-48 bg-gradient-radial from-light/30 via-light/0 to-light/0 dark:from-dark/30 dark:via-dark/0 dark:to-dark/0" />
                    <div className="absolute top-1/2 -right-6 md:right-0 -translate-y-1/2 mt-12">
                        <button
                            onClick={() =>
                                listRef?.current?.scrollBy({ left: getScrollDistance(), behavior: 'smooth' })
                            }
                            className="relative hover:scale-[1.01] hover:top-[-1px] active:top-[.5px] active:scale-[.99] md:z-30 p-8"
                        >
                            <IconChevronDown className="prose-invert w-12 h-12 rounded-sm bg-primary border border-primary -rotate-90 hover:backdrop-blur-sm active:backdrop-blur-sm" />
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}
