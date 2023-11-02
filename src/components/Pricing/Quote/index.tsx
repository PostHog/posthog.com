import cntl from 'cntl'
import React from 'react'

const sizes = {
    sm: {
        quote: cntl`
            font-semibold
            md:text-lg
            md:leading-snug
            m-0
        `,
        name: cntl`
            md:text-base
            md:leading-tight
        `,
        title: cntl`
            md:text-sm
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
            md:text-[24px]
            md:leading-[33.6px]
            m-0
        `,
        name: cntl`
            md:text-[20px]
            md:leading-[21.88px]
        `,
        title: cntl`
            md:text-[18px]
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
            md:text-4xl
            md:leading-tight
        `,
        name: cntl`
            md:text-xl
        `,
        title: cntl`
            md:text-lg
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
