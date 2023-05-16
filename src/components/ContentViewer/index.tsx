import { ImageDataLike, getImageData } from 'gatsby-plugin-image'

import { MDXProvider } from '@mdx-js/react'
import { BorderWrapper } from 'components/BorderWrapper'
import { Caption } from 'components/Caption'
import { FloatedImage } from 'components/FloatedImage'
import { ImageBlock } from 'components/ImageBlock'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React, { useState } from 'react'
import { shortcodes } from '../../mdxGlobalComponents'
import Link from 'components/Link'
import { animateScroll as scroll } from 'react-scroll'

const A = (props) => <Link {...props} className="text-red hover:text-red font-semibold" />

const components = {
    ...shortcodes,
    BorderWrapper,
    Caption,
    ImageBlock,
    FloatedImage,
    a: A,
}

interface IProps {
    content: {
        title: string
        image?: string
        body: string
        author?: string
    }[]
}

export default function ContentViewer({ content }: IProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    return (
        <div className="grid grid-cols-5 gap-x-6">
            <div className="col-span-2">
                <ul className="list-none m-0 p-0 sticky top-16 grid gap-y-2">
                    {content.map(({ title, author, image }, index) => {
                        const active = currentIndex === index

                        return (
                            <li key={title + index}>
                                <button
                                    onClick={() => {
                                        setCurrentIndex(index)
                                        scroll.scrollToTop()
                                    }}
                                    className={`p-2 rounded-md w-full text-left ${
                                        active ? 'bg-gray-accent-light' : ''
                                    }`}
                                >
                                    {image && <img className="w-[140px] mb-2" src={image} />}
                                    <p className="m-0 font-semibold">{title}</p>
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className={'article-content col-span-3'}>
                <MDXProvider components={components}>
                    <MDXRenderer>{content[currentIndex].body}</MDXRenderer>
                </MDXProvider>
            </div>
        </div>
    )
}
