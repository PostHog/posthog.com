import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { usePopper } from 'react-popper'
import type { Placement } from '@popperjs/core'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import CallToAction from './CallToAction'

export const Block = ({
    title,
    children,
    cta,
}: {
    title: string
    children: React.ReactNode
    cta: { url: string; label: string }
}) => {
    return (
        <div className="py-6 md:px-6 xl:px-12 flex flex-col">
            <div className="mb-4">
                <h3 className="text-[18px] font-bold mt-0 mb-2 text-black/70">{title}</h3>
                <div>{children}</div>
            </div>
            <CallToAction to={cta.url} className="mt-auto !w-full">
                {cta.label}
            </CallToAction>
        </div>
    )
}

interface IColumnProps {
    title: string
    cta: {
        url: string
        label: string
    }
    children: React.ReactNode
}

export const TwoCol = ({ left, right }: { left: IColumnProps; right: IColumnProps }) => {
    return (
        <div className="border-t border-gray-accent-light border-dashed">
            <div className="grid sm:grid-cols-2 sm:divide-x sm:divide-y-0 divide-y divide-dashed divide-gray-accent-light max-w-3xl mx-auto xl:max-w-auto">
                <Block title={left.title} cta={left.cta}>
                    {left.children}
                </Block>
                <Block title={right.title} cta={right.cta}>
                    {right.children}
                </Block>
            </div>
        </div>
    )
}

export function Wrapper({
    className = '',
    children,
    placement = 'bottom-start',
    referenceElement,
    borderRadius = '0.375rem',
}: {
    className?: string
    children: React.ReactNode
    placement: Placement
    referenceElement: HTMLDivElement
    borderRadius?: string | number
}) {
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
    const breakpoints = useBreakpoint()
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement,
    })
    const variants = {
        hidden: { height: 0 },
        shown: { height: 'auto' },
    }
    return (
        <div
            className={className}
            ref={setPopperElement}
            style={!breakpoints.md ? styles.popper : {}}
            {...attributes.popper}
        >
            <div className="z-10 lg:block text-almost-black relative top-0">
                <motion.div
                    style={{ borderRadius }}
                    className="lg:bg-white lg:shadow-lg lg:dark:bg-gray-accent-dark overflow-hidden lg:my-0 md:mt-6"
                    variants={variants}
                    initial="hidden"
                    animate="shown"
                >
                    {children}
                </motion.div>
            </div>
        </div>
    )
}
