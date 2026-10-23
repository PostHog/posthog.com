import React from 'react'
import { cn } from '../../../utils'
import { Card, CardVariantContext } from '../Card'
import { cardVariants, sectionSurface, surfacePaddings } from '../styles'

export type SectionPadding = keyof typeof surfacePaddings

export type SectionRootProps = React.HTMLAttributes<HTMLDivElement> & {
    padding?: SectionPadding
}

const Root = React.forwardRef<HTMLDivElement, SectionRootProps>(function SectionRoot(
    { padding = 'md', className, ...props },
    ref
) {
    const parentVariant = React.useContext(CardVariantContext)
    const cleanSurface = parentVariant === 'solid'
    return (
        <div
            ref={ref}
            className={cn(
                'flex flex-col text-primary',
                sectionSurface,
                cleanSurface && cardVariants.solid,
                surfacePaddings[padding],
                className
            )}
            {...props}
        />
    )
})

export const Section = {
    Root,
    Header: Card.Header,
    Title: Card.Title,
    Description: Card.Description,
    Footer: Card.Footer,
}
