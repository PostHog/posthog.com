import React, { useState } from 'react'
import { CopyAnchor } from 'components/Heading'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Slugger from 'github-slugger'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as Icons from '@posthog/icons'

const badgeClasses = (color: string) =>
    `!bg-${color}/10 !text-${color} !dark:text-white !dark:bg-${color}/50 text-xs m-[-2px] font-medium rounded-sm px-1 py-0.5 inline-block`

const badgeMap: Record<string, { text: string; color: string }> = {
    required: { text: 'Required', color: 'orange' },
    optional: { text: 'Optional', color: 'blue' },
    recommended: { text: 'Recommended', color: 'purple' },
    checkpoint: { text: 'Checkpoint', color: 'green' },
}

export interface StepProps {
    title: string
    subtitle?: string
    badge?: 'required' | 'optional' | 'recommended'
    titleSize?: 'h2' | 'h3'
    checkpoint?: boolean
    children: React.ReactNode
}

export const Steps: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    let numberCounter = 1

    return (
        <section className="max-w-2xl mx-auto scroll-pt-[108px]">
            <ol className="ml-0">
                {React.Children.map(children, (child) => {
                    if (!React.isValidElement(child)) return null

                    const stepChild = child as React.ReactElement<StepProps & { number?: number }>
                    const hasCheckpoint = Boolean(stepChild.props.checkpoint)

                    return React.cloneElement(stepChild, {
                        number: hasCheckpoint ? undefined : numberCounter++,
                    })
                })}
            </ol>
        </section>
    )
}

export const Step: React.FC<StepProps & { number?: number }> = ({
    title,
    subtitle,
    badge,
    titleSize,
    checkpoint,
    children,
    number,
}) => {
    const [hovered, setHovered] = useState(false)
    const slugger = new Slugger()
    const isCheckpoint = Boolean(checkpoint)
    const hasCheckmark = isCheckpoint // If checkpoint is true, we show a checkmark (flag icon)
    const anchorId = slugger.slug(title)

    return (
        <li
            className="mb-10 flex w-full group relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Vertical line positioned absolutely relative to li - only show on lg+ */}
            <div className="hidden lg:block absolute left-4 w-[1px] border-l border-light dark:border-dark h-full opacity-70"></div>

            {/* Number/flag column - only show on lg+ */}
            <div className="hidden lg:flex items-start mr-4 relative z-10">
                <div className="flex flex-col items-center relative">
                    <CopyAnchor id={anchorId} hovered={hovered} />
                    <div className="bg-tan dark:bg-dark py-2">
                        <span className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-accent-light dark:bg-gray-accent-dark text-primary dark:text-primary-dark font-bold text-base border border-light dark:border-dark border-b-4 border-b-gray-accent dark:border-b-dark">
                            {isCheckpoint ? <Icons.IconFlag className="w-4 h-4" /> : number}
                        </span>
                    </div>
                </div>
            </div>
            <div className="min-w-0 flex-1">
                <div className="relative">
                    <div className="flex items-center gap-2 font-semibold text-base text-primary dark:text-primary-dark pt-2">
                        {!titleSize || titleSize === 'h2' ? (
                            <h2 id={anchorId} className="!my-0 !text-2xl truncate">
                                {title}
                            </h2>
                        ) : (
                            <h3 id={anchorId} className="!my-0 !text-xl truncate">
                                {title}
                            </h3>
                        )}
                        {badge && badgeMap[badge] ? (
                            <span className={`${badgeClasses(badgeMap[badge].color)} shrink-0`}>
                                {badgeMap[badge].text}
                            </span>
                        ) : hasCheckmark ? (
                            <span className={`${badgeClasses(badgeMap.checkpoint.color)} shrink-0`}>
                                {badgeMap.checkpoint.text}
                            </span>
                        ) : null}
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
