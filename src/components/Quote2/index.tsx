import cntl from 'cntl'
import React from 'react'

const base = {
    section: cntl`
        !max-w-screen-lg
        mx-auto
        font-bold
        bg-black
        text-white
        grid
        grid-cols-[minmax(200px,_1fr)_4fr]

        -mx-12 mt-6 xl:mx-0
    `,
    quote: cntl`
        text-xl
        m-0
        quote
        flex 
        justify-center 
        items-center 
        p-8 
        border-b 
        border-dashed 
        border-gray-accent-light/50
    `,
    tagline: cntl`
        flex
        justify-center
        items-center
        text-center
        border-r
        border-dashed
        border-gray-accent-light/50
        font-semibold
        text-white/50
        leading-tight
        px-8
        py-6
    `,
    footer: cntl`
        flex
        items-center
        px-8
        py-6
        space-x-3
    `,
    image: cntl`
        rounded-full
        w-10
        h-10
    `,
    name: cntl`
        not-italic
        text-lg
    `,
    title: cntl`
        not-italic
        text-sm
        opacity-50
        font-normal
    `,
}

const sizes = {
    md: {
        section: cntl`
        `,
        quote: cntl`
            !text-2xl
            px-12
            xl:px-16
        `,
        tagline: cntl`
            py-12
        `,
        footer: cntl`
            px-12
            xl:px-16
        `,
        image: cntl`
        `,
        name: cntl`
            text-xl
        `,
        title: cntl`
            text-base
        `,
    },
    lg: {
        section: cntl`
        `,
        quote: cntl`
            !text-2xl
        `,
        footer: cntl`
        `,
        image: cntl`
        `,
        name: cntl`
        `,
        title: cntl`
        `,
    },
}

const classes = (type, size = 'lg', className = '') => cntl`
    ${base[type]}
    ${sizes[size][type]}
    ${className}
`

interface Props {
    className?: string
    size?: string
    logo?: string
    quote: string | JSX.Element
    companyTagline?: string
    image: JSX.Element
    imageSource?: string
    name: string | JSX.Element
    title: string | JSX.Element
}

export const Quote2 = ({ className = '', size = 'md', logo, quote, companyTagline, image, imageSource, name, title }: Props) => {
    return (
        <section className={classes('section', size, className)}>
            <div className="flex justify-center items-center p-8 border-b border-r border-dashed border-gray-accent-light/50">
                {logo && <img src={logo} />}
            </div>
            <blockquote className={classes('quote', size)}>
                {quote}
            </blockquote>
            <div className={classes('tagline', size)}>
                {companyTagline}
            </div>
            <div className={classes('footer', size)}>
                {imageSource ? <img className={classes('image', size)} src={imageSource} /> : image}
                <span className="flex items-baseline space-x-2">
                    <cite className={classes('name', size)}>{name}</cite>
                    <cite className={classes('title', size)}>{title}</cite>
                </span>
            </div>
        </section>
    )
}
