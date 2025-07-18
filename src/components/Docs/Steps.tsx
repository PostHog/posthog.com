import React, { useState } from 'react'
import { CopyAnchor } from 'components/Heading'
import Slugger from 'github-slugger'

const badgeClasses =
    'bg-gray-accent/50 text-primary/75 dark:text-primary-dark/60 dark:bg-gray-accent-dark text-xs m-[-2px] font-medium rounded-sm px-1 py-0.5 inline-block'
const requiredBadgeClasses =
    '!bg-orange/10 !text-orange !dark:text-white !dark:bg-orange/50 text-xs m-[-2px] font-medium rounded-sm px-1 py-0.5 inline-block'

const badgeMap: Record<string, { text: string; className: string }> = {
    required: { text: 'Required', className: requiredBadgeClasses },
    optional: { text: 'Optional', className: badgeClasses },
}

export interface StepProps {
    title: string
    subtitle?: string
    badge?: 'required' | 'optional'
    titleSize?: 'h2' | 'h3'
    children: React.ReactNode
}

export const Steps: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <section className="max-w-2xl mx-auto scroll-pt-[108px]">
        <ol className="ml-0">
            {React.Children.map(children, (child, i) =>
                React.isValidElement(child)
                    ? React.cloneElement(child as React.ReactElement<StepProps & { number?: number }>, {
                          number: i + 1,
                      })
                    : null
            )}
        </ol>
    </section>
)

export const Step: React.FC<StepProps & { number?: number }> = ({
    title,
    subtitle,
    badge,
    titleSize,
    children,
    number,
}) => {
    const [hovered, setHovered] = useState(false)
    const slugger = new Slugger()
    const anchorId = slugger.slug(title)

    return (
        <li
            className="mb-10 flex w-full group"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="flex items-start mr-4 relative">
                <span className="flex flex-col items-center relative">
                    <CopyAnchor id={anchorId} hovered={hovered} />
                    <span className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-accent-light dark:bg-gray-accent-dark text-primary dark:text-primary-dark font-bold text-base z-10 border border-light dark:border-dark border-b-4 border-b-gray-accent dark:border-b-gray-accent-dark">
                        {number}
                    </span>
                    <span className="mt-2 w-[1px] top-4 bg-gray-accent dark:bg-gray-accent-dark h-[calc(100%_-_3rem)]"></span>
                </span>
            </div>
            <div className="min-w-0 flex-1">
                <div className="relative">
                    <div className="flex items-center gap-2 font-semibold text-base text-primary dark:text-primary-dark">
                        {!titleSize || titleSize === 'h2' ? (
                            <h2 id={anchorId} className="!my-0 !text-2xl truncate">
                                {title}
                            </h2>
                        ) : (
                            <h3 id={anchorId} className="!my-0 !text-xl truncate">
                                {title}
                            </h3>
                        )}
                        {badge && badgeMap[badge] && (
                            <span className={`${badgeMap[badge].className} shrink-0`}>{badgeMap[badge].text}</span>
                        )}
                    </div>
                </div>
                {subtitle && subtitle.trim() && (
                    <div className="text-sm text-primary/75 dark:text-primary-dark/75 mt-1 mb-2">
                        <em>{subtitle}</em>
                    </div>
                )}
                <div className="mt-4 mb-4 overflow-x-auto overflow-y-hidden">{children}</div>
            </div>
        </li>
    )
}
