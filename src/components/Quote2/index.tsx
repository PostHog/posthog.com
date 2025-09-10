import cntl from 'cntl'
import React from 'react'

const base = {
    section: cntl`
        mx-auto
        font-bold
        text-white
        max-w-5xl
        grid
        md:grid-cols-[minmax(200px,_1fr)_4fr]
    `,
    quote: cntl`
        text-xl
        m-0
        quote
        flex 
        justify-center 
        items-center 
        p-8
    `,
    tagline: cntl`
        hidden
        md:flex
        justify-center
        items-center
        text-center
        border-r
        border-dashed
        
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
    quote: string
    companyTagline?: string
    image: JSX.Element
    imageSource?: string
    name: string | JSX.Element
    title: string | JSX.Element
    offset?: number
}

export const Quote2 = ({
    className = '',
    size = 'md',
    logo,
    quote,
    companyTagline,
    image,
    imageSource,
    name,
    title,
    offset,
}: Props) => {
    return (
        <section style={offset ? { marginTop: -(offset / 3) * 2 } : {}} className="bg-black">
            <div className={classes('section', size, className)}>
                <div
                    style={offset ? { paddingTop: offset } : {}}
                    className="hidden md:flex justify-center items-center p-8 border-r border-dashed "
                >
                    {logo && <img src={logo} />}
                </div>

                <blockquote style={offset ? { paddingTop: offset } : {}} className={classes('quote', size)}>
                    <div>
                        <div className="md:hidden mb-6">{logo && <img src={logo} />}</div>
                        <div dangerouslySetInnerHTML={{ __html: quote }} />
                    </div>
                </blockquote>
            </div>
            <hr className="w-full border-0 border-t  border-dashed m-0" />
            <div className={classes('section', size, className)}>
                <div className={classes('tagline', size)}>{companyTagline}</div>
                <div className={classes('footer', size)}>
                    {imageSource ? <img className={classes('image', size)} src={imageSource} /> : image}
                    <span className="flex items-baseline space-x-2">
                        <cite className={classes('name', size)}>{name}</cite>
                        <cite className={classes('title', size)}>{title}</cite>
                    </span>
                </div>
            </div>
        </section>
    )
}
