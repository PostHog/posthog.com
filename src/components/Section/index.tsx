import { Heading } from 'components/Heading'
import React from 'react'
import GithubSlugger from 'github-slugger'

const responsive = {
    wrapper: {
        1: '',
        2: 'grid-cols-1 sm:grid-cols-2 sm:divide-x',
        3: 'grid-cols-1 md:grid-cols-3 md:divide-x',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x',
        5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 lg:divide-x',
    },
}

const headingSize = {
    sm: 'text-[30px]',
    md: 'text-[48px]',
    lg: 'text-4xl md:text-[64px]',
}

export const Section = ({
    children,
    cols = 1,
    title,
    titleSize = 'sm',
    className = '',
}: {
    children: JSX.Element[]
    cols: number
    title?: string
    titleSize?: string
    className?: string
}): JSX.Element => {
    const slugger = new GithubSlugger()
    const id = slugger.slug(title)
    return (
        <section className={`my-10 sm:my-20 lg:my-[140px] ${className}`}>
            {title && (
                <Heading
                    id={id}
                    hideCopy
                    as="h2"
                    className={`leading-normal text-center mb-9 ${headingSize[titleSize]}`}
                >
                    {title}
                </Heading>
            )}
            <div
                className={`grid divide-dashed divide-gray-accent-light template-section-content ${responsive.wrapper[cols]}`}
            >
                {React.Children.map(children, (child) =>
                    React.cloneElement(child, {
                        className: `${child.props.className || ''} px-0 sm:px-7`,
                    })
                )}
            </div>
        </section>
    )
}
