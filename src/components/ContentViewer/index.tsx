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
import { InlineCode } from 'components/InlineCode'
import { Blockquote } from 'components/BlockQuote'
import { MdxCodeBlock } from 'components/CodeBlock'
import { ZoomImage } from 'components/ZoomImage'
import Markdown from 'components/Squeak/components/Markdown'

const A = (props) => <Link {...props} className="text-red hover:text-red font-semibold" />

interface IProps {
    content: {
        title: string
        image?: string
        body: string | (() => React.ReactNode)
        author?: string
        tags?: string[]
        video?: string
        type?: string
        bodyType?: 'markdown' | 'mdx' | 'component'
    }[]
    title?: string
    initialIndex?: number
    scrollToTop?: boolean
}

export default function ContentViewer({ content, title, initialIndex, scrollToTop = true }: IProps) {
    const [currentIndex, setCurrentIndex] = useState<number | null>(initialIndex ?? null)
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
        inlineCode: InlineCode,
        blockquote: Blockquote,
        pre: MdxCodeBlock,
        MultiLanguage: MdxCodeBlock,
        img: ZoomImage,
    }

    useEffect(() => {
        if (breakpoints.sm !== undefined) {
            setCurrentIndex(breakpoints.sm ? null : initialIndex ?? 0)
        }
    }, [breakpoints])

    return (
        <div className="flex gap-x-6 lg:gap-x-12 relative">
            <motion.div className="md:flex-[0_0_350px]">
                <div className="reasonable:sticky reasonable:top-[108px]">
                    {title && <h3 className="text-lg mb-2">{title}</h3>}
                    <ul className="list-none m-0 p-0 grid gap-y-1">
                        {content.map(({ title, author, image, tags, video, type }, index) => {
                            const active = currentIndex === index
                            const hasTags = tags && tags.length
                            return (
                                <li key={title + index}>
                                    <button
                                        onClick={() => {
                                            setCurrentIndex(index)
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

                                        {(hasTags || video) && (
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
                <div className="md:z-auto z-[999999999999999] article-content md:flex-1">
                    <ContentContainer {...(breakpoints.sm ? { setOpen: setCurrentIndex } : {})}>
                        <div className="max-h-[70vh] md:max-h-[initial] overflow-auto">
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
                    </ContentContainer>
                </div>
            )}
        </div>
    )
}
