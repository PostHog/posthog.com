import { Heading } from 'components/Heading'
import GithubSlugger from 'github-slugger'
import React from 'react'

const responsive = (divider) => ({
    wrapper: {
        1: '',
        2: `grid-cols-1 sm:grid-cols-2 ${divider ? '' : ''}`,
        3: `grid-cols-1 md:grid-cols-3 ${divider ? '' : ''}`,
        5: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 ${divider ? '' : ''}`,
        4: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ${divider ? '' : ''}`,
    },
})

const headingSize = {
    sm: 'text-2xl md:text-[30px]',
    md: 'text-3xl md:text-[48px]',
    lg: 'text-4xl md:text-[64px]',
}

const contentSize = {
    full: 'w-full',
    sm: 'max-w-[600px]',
    md: 'max-w-[800px]',
    lg: 'max-w-[1200px]',
}

export const Section = ({
    children,
    cols = 1,
    title,
    titleSize = 'sm',
    className = '',
    size = 'full',
    divider = true,
    style,
}: {
    children: JSX.Element[]
    cols: number
    title?: string
    titleSize?: 'sm' | 'md' | 'lg'
    className?: string
    size?: 'full' | 'sm' | 'md' | 'lg'
    divider?: boolean
    style?: any
}): JSX.Element => {
    const slugger = new GithubSlugger()
    const id = slugger.slug(title)
    return (
        <section style={style} className={`my-10 sm:mt-12 sm:mb-20 ${className}`}>
            {title && (
                <Heading id={id} hideCopy as="h2" className={`text-center mb-16 ${headingSize[titleSize]}`}>
                    {title}
                </Heading>
            )}
            <div
                className={`grid ${divider ? '' : ''} template-section-content mx-auto ${
                    responsive(divider).wrapper[cols]
                } ${contentSize[size]}`}
            >
                {children}
            </div>
        </section>
    )
}
