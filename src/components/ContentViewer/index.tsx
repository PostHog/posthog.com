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
import { ViewButton } from '../../templates/tutorials/Tutorial'
import { Video } from 'components/NotProductIcons'

const A = (props) => <Link {...props} className="text-red hover:text-red font-semibold" />

interface IProps {
    content: {
        title: string
        image?: string
        body: string
        author?: string
        tags?: string[]
        video?: string
    }[]
}

export default function ContentViewer({ content }: IProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [view, setView] = useState('Article')
    const currentContent = content[currentIndex]

    const components = {
        ...shortcodes,
        BorderWrapper,
        Caption,
        ImageBlock,
        FloatedImage,
        a: A,
    }

    return (
        <div className="grid grid-cols-5 gap-x-6">
            <div className="col-span-2">
                <ul className="list-none m-0 p-0 sticky top-16 grid gap-y-2">
                    {content.map(({ title, author, image, tags, video }, index) => {
                        const active = currentIndex === index
                        const hasTags = tags && tags.length
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
                                    {(hasTags || video) && (
                                        <div className="flex justify-between lg:space-x-2 lg:space-y-0 space-y-2 space-y-reverse lg:flex-row flex-col-reverse items-start">
                                            {hasTags && (
                                                <ul className="list-none m-0 p-0 flex space-x-2 items-center flex-wrap">
                                                    {tags.map((tag) => {
                                                        return (
                                                            <li
                                                                className="rounded-full px-2 border border-gray-accent-light text-sm whitespace-nowrap my-1"
                                                                key={tag}
                                                            >
                                                                {tag}
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            )}
                                            {video && <Video className="w-4 flex-shrink-0" />}
                                        </div>
                                    )}

                                    <p className="m-0 font-semibold">{title}</p>
                                    {author && <p className="text-sm font-semibold m-0 opacity-60 mt-1">by {author}</p>}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className={'article-content col-span-3'}>
                <h1 className="mb-6">{currentContent.title}</h1>
                {currentContent.video && (
                    <div className="mb-6 flex space-x-2">
                        <ViewButton view={view} title="Article" setView={setView} />
                        <ViewButton view={view} title="Video" setView={setView} />
                    </div>
                )}
                {currentContent.video && view === 'Video' ? (
                    <iframe src={currentContent.video} />
                ) : (
                    <MDXProvider components={components}>
                        <MDXRenderer>{currentContent.body}</MDXRenderer>
                    </MDXProvider>
                )}
            </div>
        </div>
    )
}
