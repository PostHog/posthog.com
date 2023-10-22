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
import { InlineCode } from 'components/InlineCode'
import { Blockquote } from 'components/BlockQuote'
import { MdxCodeBlock } from 'components/CodeBlock'
import { ZoomImage } from 'components/ZoomImage'
import Markdown from 'components/Squeak/components/Markdown'
import KeyboardShortcut from 'components/KeyboardShortcut'

const A = (props) => <Link {...props} className="text-red hover:text-red font-semibold" />

interface IProps {
    content: {
        title: string
        image?: string
        body: string | (() => React.ReactNode)
        author?: string
        tags?: string[]
        code?: string[]
        video?: string
        type?: string
        bodyType?: 'markdown' | 'mdx' | 'component'
    }[]
    title?: string
    initialIndex?: number
    scrollToTop?: boolean
    sticky?: boolean
}

export default function ContentViewer({ content, title, initialIndex, scrollToTop = true, sticky = true }: IProps) {
    const [currentIndex, setCurrentIndex] = useState<number | null>(initialIndex ?? null)
    const [contentView, setContentView] = useState('Article')
    const currentContent = currentIndex !== null && content[currentIndex]
    const components = {
        ...shortcodes,
        BorderWrapper,
        Caption,
        ImageBlock,
        FloatedImage,
        a: A,
        inlineCode: InlineCode,
        blockquote: Blockquote,
        pre: MdxCodeBlock,
        MultiLanguage: MdxCodeBlock,
        img: ZoomImage,
    }

    useEffect(() => {
        setCurrentIndex(0)
    }, [content])

    return (
        <div className="flex md:flex-row flex-col md:space-y-0 space-y-12 gap-x-6 lg:gap-x-12 relative">
            <motion.div className="flex-shrink-0 w-auto md:max-w-[350px] -mx-5 md:mx-0">
                <div className={`${sticky ? 'reasonable:sticky reasonable:top-[108px]' : ''} pl-5 md:px-0`}>
                    {title && <h3 className="text-lg mb-2">{title}</h3>}
                    <ul className="list-none m-0 p-0 flex md:space-x-0 space-x-2 md:grid md:gap-y-1 snap-x overflow-x-auto">
                        {content.map(({ title, author, image, tags, code, video, type }, index) => {
                            const active = currentIndex === index
                            const hasTags = tags && tags.length
                            const hasCode = code && code.length
                            return (
                                <li className="flex-shrink-0" key={title + index}>
                                    <button
                                        onClick={(e) => {
                                            setCurrentIndex(index)
                                            e.target.scrollIntoView({ block: 'nearest', inline: 'center' })
                                            scrollToTop && scroll.scrollToTop()
                                        }}
                                        className={`w-full text-left group items-center relative px-4 pt-2.5 pb-2 rounded border border-b-3 hover:border-light dark:hover:border-dark ${
                                            active
                                                ? 'bg-accent dark:bg-accent-dark border-light dark:border-dark hover:top-[0px] hover:scale-[1]'
                                                : 'border-transparent hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all'
                                        }`}
                                    >
                                        {image && <img className="max-h-[30px] mb-2" src={image} />}

                                        <p className="!m-0 font-semibold !leading-tight !text-[15px]">{title}</p>
                                        {(author || type) && (
                                            <p className="!text-[13px] font-semibold !m-0 opacity-60 !mt-0.5">
                                                {type} {author && `by ${author}`}
                                            </p>
                                        )}

                                        {(hasTags || hasCode || video) && (
                                            <div className="flex justify-between space-y-2 lg:space-x-2 lg:space-y-0 space-y-reverse lg:flex-row flex-col-reverse items-start mt-1">
                                                {hasTags && (
                                                    <ul className="list-none m-0 mb-1 p-0 flex items-center flex-wrap">
                                                        {tags.map((tag) => {
                                                            return (
                                                                <li
                                                                    className="rounded-full px-2 py-1 mr-1 bg-red/10 text-red !text-xs whitespace-nowrap mb-1"
                                                                    key={tag}
                                                                >
                                                                    {tag}
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                )}
                                                {hasCode && (
                                                    <ul className="list-none m-0 mb-1 p-0 gap-2 flex items-center flex-wrap">
                                                        {code.map((code) => {
                                                            return <KeyboardShortcut key={code} text={code} size="xs" />
                                                        })}
                                                    </ul>
                                                )}
                                                {video && (
                                                    <Video className="w-6 opacity-50 flex-shrink-0 right-4 top-3 absolute lg:relative" />
                                                )}
                                            </div>
                                        )}
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </motion.div>
            {currentContent && (
                <div className="article-content md:flex-1 md:w-0">
                    <h1 className="mb-6 text-xl md:text-2xl">{currentContent.title}</h1>
                    {currentContent.video && (
                        <div className="mb-6 flex space-x-2">
                            <ViewButton view={contentView} title="Article" setView={setContentView} />
                            <ViewButton view={contentView} title="Video" setView={setContentView} />
                        </div>
                    )}
                    {currentContent.video && contentView === 'Video' ? (
                        <iframe src={currentContent.video} />
                    ) : currentContent.bodyType === 'component' ? (
                        currentContent.body()
                    ) : currentContent.bodyType === 'markdown' ? (
                        <Markdown>{currentContent.body}</Markdown>
                    ) : (
                        <MDXProvider components={components}>
                            <MDXRenderer>{currentContent.body}</MDXRenderer>
                        </MDXProvider>
                    )}
                </div>
            )}
        </div>
    )
}
