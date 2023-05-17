import { MDXProvider } from '@mdx-js/react'
import { BorderWrapper } from 'components/BorderWrapper'
import { Caption } from 'components/Caption'
import { FloatedImage } from 'components/FloatedImage'
import { ImageBlock } from 'components/ImageBlock'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React, { useEffect, useState } from 'react'
import { shortcodes } from '../../mdxGlobalComponents'
import Link from 'components/Link'
import { animateScroll as scroll } from 'react-scroll'
import { ViewButton } from '../../templates/tutorials/Tutorial'
import { Video } from 'components/NotProductIcons'
import { motion } from 'framer-motion'
import { MenuContainer } from 'components/PostLayout/MobileNav'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'

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
    const [currentIndex, setCurrentIndex] = useState<number | null>(null)
    const [contentView, setContentView] = useState('Article')
    const currentContent = currentIndex !== null && content[currentIndex]
    const breakpoints = useBreakpoint()
    const ContentContainer = breakpoints.sm ? MenuContainer : React.Fragment
    const components = {
        ...shortcodes,
        BorderWrapper,
        Caption,
        ImageBlock,
        FloatedImage,
        a: A,
    }

    useEffect(() => {
        if (breakpoints.sm !== undefined) {
            setCurrentIndex(breakpoints.sm ? null : 0)
        }
    }, [breakpoints])

    return (
        <div className="grid md:grid-cols-5 gap-x-6 relative">
            <motion.div className="md:col-span-2">
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
            </motion.div>
            {currentContent && (
                <div className="z-[999999999999999] article-content md:col-span-3">
                    <ContentContainer {...(breakpoints.sm ? { setOpen: setCurrentIndex } : {})}>
                        <div className="max-h-[70vh] md:max-h-[initial] overflow-auto">
                            <h1 className="mb-6 md:text-4xl text-2xl">{currentContent.title}</h1>
                            {currentContent.video && (
                                <div className="mb-6 flex space-x-2">
                                    <ViewButton view={contentView} title="Article" setView={setContentView} />
                                    <ViewButton view={contentView} title="Video" setView={setContentView} />
                                </div>
                            )}
                            {currentContent.video && contentView === 'Video' ? (
                                <iframe src={currentContent.video} />
                            ) : (
                                <MDXProvider components={components}>
                                    <MDXRenderer>{currentContent.body}</MDXRenderer>
                                </MDXProvider>
                            )}
                        </div>
                    </ContentContainer>
                </div>
            )}
        </div>
    )
}
