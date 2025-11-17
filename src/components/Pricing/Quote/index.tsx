import cntl from 'cntl'
import React from 'react'

const sizes = {
    sm: {
        quote: cntl`
            font-semibold
            @2xl:text-base
            @2xl:leading-snug
            m-0
        `,
        name: cntl`
            @2xl:text-sm
            @2xl:leading-tight
        `,
        title: cntl`
            @2xl:text-xs
        `,
        image: cntl`
            w-[60px]
            h-[60px]
        `,
        footer: cntl`
            mt-[20px]
            space-x-[14px]
        `,
    },
    md: {
        quote: cntl`
            font-bold
            @2xl:text-lg
            @2xl:leading-[33.6px]
            m-0
        `,
        name: cntl`
            @2xl:text-base
            @2xl:leading-[21.88px]
        `,
        title: cntl`
            @2xl:text-sm
        `,
        image: cntl`
            w-[80px]
            h-[80px]
        `,
        footer: cntl`
            mt-[20px]
            space-x-[14px]
        `,
    },
    lg: {
        quote: cntl`
            font-bold
            @2xl:text-xl
            @2xl:leading-tight
        `,
        name: cntl`
            @2xl:text-lg
        `,
        title: cntl`
            @2xl:text-base
        `,
        image: cntl`
            w-[100px]
            h-[100px]
        `,
        footer: cntl`
            space-x-4
            mt-4
        `,
    },
}

const base = {
    quote: cntl`
        text-xl
        text-primary
        dark:text-primary-dark
        m-0
        quote
    `,
    name: cntl`
        not-italic
        text-lg
    `,
    title: cntl`
        not-italic
        text-lg
        opacity-50
    `,
    footer: cntl`
        flex
        items-center
    `,
    section: cntl`
        !max-w-screen-lg
        mx-auto
        text-primary
    `,
    image: cntl`
        rounded-full
    `,
}

const classes = (type, size = 'lg', className = '') => cntl`
    ${base[type]}
    ${sizes[size][type]}
    ${className}
`

interface Props {
    quote: string | JSX.Element
    name: string | JSX.Element
    title: string | JSX.Element
    image: JSX.Element
    className?: string
    imageSource?: string
    size?: string
    logo?: string
}

export const Quote = ({ quote, name, title, image, className = '', imageSource, size = 'lg', logo }: Props) => {
    return (
        <section className={` ${classes('section', size, className)}`}>
            {logo && <img src={logo} className="mb-9" />}
            <blockquote className={classes('quote', size)}>
                {quote}
                <footer className={classes('footer', size)}>
                    {imageSource ? <img className={classes('image', size)} src={imageSource} /> : image}
                    <span className="flex flex-col">
                        <cite className={classes('name', size)}>{name}</cite>
                        <cite className={classes('title', size)}>{title}</cite>
                    </span>
                </footer>
            </blockquote>
        </section>
    )
}
