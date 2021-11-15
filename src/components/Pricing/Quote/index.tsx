import cntl from 'cntl'
import React from 'react'

const sizes = {
    md: {
        quote: cntl`
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
            md:text-[32px]
            md:leading-[48px]
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
            space-x-8
            mt-9
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
        text-base
    `,
    title: cntl`
        not-italic
        text-base
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
        font-bold
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

export const Quote = ({ quote, name, title, image, className = '', imageSource, size = 'lg', logo }) => {
    return (
        <section className={classes('section', size, className)}>
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
