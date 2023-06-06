import { MDXProvider } from '@mdx-js/react'
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
    title?: string
    initialIndex?: number
}

export default function ContentViewer({ content, title, initialIndex }: IProps) {
    const [currentIndex, setCurrentIndex] = useState<number | null>(initialIndex ?? null)
    const [contentView, setContentView] = useState('Article')
    const currentContent = currentIndex !== null && content[currentIndex]
    const breakpoints = useBreakpoint()
    const ContentContainer = breakpoints.sm ? MenuContainer : React.Fragment
    const components = {
        ...shortcodes,
        Caption,
        ImageBlock,
        FloatedImage,
        a: A,
    }

    useEffect(() => {
        if (breakpoints.sm !== undefined) {
            setCurrentIndex(breakpoints.sm ? null : initialIndex ?? 0)
        }
    }, [breakpoints])

    return (
        <div className="flex gap-x-6 lg:gap-x-12 relative">
            <motion.div className="md:flex-[0_0_350px]">
                <div className="sticky top-4">
                    {title && <h3 className="text-lg mb-2">{title}</h3>}
                    <ul className="list-none m-0 p-0 grid gap-y-1">
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
                                        className={`p-4 rounded-md w-full text-left relative hover:scale-[1.01] hover:top-[-.5px] active:scale-[1] active:top-[.5px] hover:bg-gray-accent-light ${
                                            active ? 'bg-gray-accent-light hover:top-[0px] hover:scale-[1]' : ''
                                        }`}
                                    >
                                        {image && <img className="max-h-[30px] mb-2" src={image} />}
                                        {(hasTags || video) && (
                                            <div className="flex justify-between lg:space-x-2 lg:space-y-0 space-y-2 space-y-reverse lg:flex-row flex-col-reverse items-start">
                                                {hasTags && (
                                                    <ul className="list-none m-0 mb-1 p-0 flex items-center flex-wrap">
                                                        {tags.map((tag) => {
                                                            return (
                                                                <li
                                                                    className="rounded-full px-2 py-1 mr-1 bg-red/10 text-red text-xs whitespace-nowrap mb-1"
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

                                        <p className="m-0 font-semibold leading-tight text-[15px]">{title}</p>
                                        {author && (
                                            <p className="text-sm font-semibold m-0 opacity-60 mt-1">by {author}</p>
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
