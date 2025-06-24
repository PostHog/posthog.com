import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import OSButton from 'components/OSButton'
import {
    IconPencil,
    IconPullRequest,
    IconTextWidth,
    IconGear,
    IconInfo,
    IconRefresh,
    IconClockRewind,
    IconTextWidthFixed,
} from '@posthog/icons'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
import { Select } from '../RadixUI/Select'
import { Popover } from '../RadixUI/Popover'
import { ToggleGroup, ToggleOption } from 'components/RadixUI/ToggleGroup'
import Link from 'components/Link'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import HeaderBar from 'components/OSChrome/HeaderBar'
import ElementScrollLink, { ScrollSpyProvider } from 'components/ElementScrollLink'
import { TreeMenu } from 'components/TreeMenu'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Fieldset } from 'components/OSFieldset'
import Slider from 'components/RadixUI/Slider'
import Tooltip from 'components/RadixUI/Tooltip'
import { ReaderViewProvider, useReaderView } from './context/ReaderViewContext'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import CloudinaryImage from 'components/CloudinaryImage'
import SearchProvider from 'components/Editor/SearchProvider'
import { useLocation } from '@reach/router'
import { getProseClasses } from '../../constants'
dayjs.extend(relativeTime)

interface ReaderViewProps {
    body?: {
        type: 'mdx' | 'plain'
        content: string
        featuredImage?: any
        contributors?: any[]
    }
    title?: string
    tableOfContents?: any
    mdxComponents?: any
    commits?: any[]
    filePath?: string
    children?: React.ReactNode
    leftSidebar?: React.ReactNode
    padding?: boolean
    proseSize?: 'sm' | 'base' | 'lg'
}

interface BackgroundImageOption {
    label: string
    value: string
    backgroundImage: string
    backgroundPosition?: string
    backgroundRepeat?: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat'
    backgroundSize?: string
}

const contentWidthOptions: ToggleOption[] = [
    {
        label: 'Fixed',
        value: 'fixed',
        icon: <IconTextWidthFixed className="size-5 inline-block" />,
        default: true,
    },
    {
        label: 'Full',
        value: 'full',
        icon: <IconTextWidth className="size-5" />,
    },
]

const backgroundImageOptions: (BackgroundImageOption & ToggleOption)[] = [
    {
        label: 'None',
        value: 'none',
        backgroundImage: 'none',
        default: true,
    },
    {
        label: '2',
        value: 'james',
        icon: (
            <img
                src="https://res.cloudinary.com/dmukukwp6/image/upload/v1738943658/James_H_5cb4c53d9a.png"
                className="size-5"
            />
        ),
        backgroundImage: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1738943658/James_H_5cb4c53d9a.png',
        backgroundRepeat: 'repeat',
        backgroundSize: '10%',
    },
    {
        label: '3',
        value: 'godzilla',
        icon: (
            <img
                src="https://res.cloudinary.com/dmukukwp6/image/upload/Frame_10127_b7362fd913.png"
                className="size-5"
            />
        ),
        backgroundImage: 'https://res.cloudinary.com/dmukukwp6/image/upload/Frame_10127_b7362fd913.png',
        backgroundPosition: 'bottom right',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
]

const ContributorsSmall = ({ contributors }) => {
    return contributors?.[0] ? (
        <div className="not-prose">
            <ul className="flex space-x-2">
                {contributors.map(({ profile_id, name, profile, ...other }) => {
                    const image = profile?.avatar?.url || other?.image
                    const url = profile_id && `/community/profiles/${profile_id}`
                    const Container = url ? Link : 'div'
                    const gatsbyImage = image && getImage(image)
                    return (
                        <li className="!mb-0" key={name}>
                            <Container className="flex space-x-2 items-center" {...(url ? { to: url } : {})}>
                                {typeof image === 'string' ? (
                                    <CloudinaryImage
                                        width={50}
                                        className="w-6 h-6 border-border border dark:border-dark rounded-full overflow-hidden"
                                        src={image}
                                    />
                                ) : gatsbyImage ? (
                                    <GatsbyImage
                                        image={gatsbyImage}
                                        alt={name}
                                        className="w-6 h-6 border-border border dark:border-dark rounded-full overflow-hidden"
                                    />
                                ) : (
                                    ''
                                )}
                                <span className="text-sm font-semibold">{name}</span>
                            </Container>
                        </li>
                    )
                })}
            </ul>
        </div>
    ) : null
}

const LineHeightSlider = ({ lineHeightMultiplier, onValueChange }) => {
    return (
        <div className="flex items-center space-x-1">
            <div className="flex-grow">
                <Slider
                    defaultValue={lineHeightMultiplier}
                    max={3}
                    step={0.25}
                    min={1}
                    value={[lineHeightMultiplier]}
                    label="Line height"
                    onValueChange={onValueChange}
                />
            </div>
            <OSButton onClick={() => onValueChange([1.3])} variant="ghost" icon={<IconRefresh className="size-5" />} />
        </div>
    )
}

const AppOptionsButton = ({ lineHeightMultiplier, handleLineHeightChange }) => {
    const { fullWidthContent, setFullWidthContent, setBackgroundImage, backgroundImage } = useReaderView()

    const selectedOption =
        backgroundImageOptions.find((option) => option.value === backgroundImage) || backgroundImageOptions[0]

    const handleContentWidthChange = (value: string) => {
        const isFullWidth = value === 'full'
        setFullWidthContent(isFullWidth)
        localStorage.setItem('full-width-content', isFullWidth.toString())
    }

    return (
        <Popover
            title="Options"
            dataScheme="secondary"
            trigger={
                <span>
                    <OSButton variant="ghost" icon={<IconGear className="size-5" />} />
                </span>
            }
            contentClassName="w-80"
        >
            <div className="w-full h-full bg-primary text-primary space-y-2">
                <Fieldset legend="Paragraphs">
                    <div className="grid grid-cols-2 gap-2">
                        <label className="text-[15px]">Line height</label>
                        <LineHeightSlider
                            lineHeightMultiplier={lineHeightMultiplier}
                            onValueChange={handleLineHeightChange}
                        />

                        <ToggleGroup
                            title="Content width"
                            options={contentWidthOptions}
                            value={fullWidthContent ? 'full' : 'fixed'}
                            onValueChange={handleContentWidthChange}
                        />
                    </div>
                </Fieldset>

                <Fieldset legend="Why not?">
                    <div className="grid grid-cols-2 gap-2">
                        <ToggleGroup
                            title="Background image"
                            options={backgroundImageOptions}
                            value={selectedOption.value}
                            onValueChange={(value) => {
                                setBackgroundImage(value === 'none' ? null : value)
                            }}
                        />
                    </div>
                </Fieldset>

                <p className="text-[13px]">
                    Toggle light/dark mode in{' '}
                    <span className="inline-flex items-center gap-0.5">
                        <button className="font-semibold underline">desktop settings</button>
                        <Tooltip trigger={<IconInfo className="size-4" />}>Lower right!</Tooltip>
                    </span>
                </p>
            </div>
        </Popover>
    )
}

const textWidthOptions: ToggleOption[] = [
    {
        label: 'Fixed width',
        value: 'fixed',
        icon: <IconTextWidthFixed className="size-5 inline-block" />,
        default: true,
    },
    {
        label: 'Full width',
        value: 'full',
        icon: <IconTextWidth className="size-5" />,
    },
]

export default function ReaderView({
    body = {},
    title,
    tableOfContents,
    mdxComponents,
    commits,
    filePath,
    children,
    leftSidebar,
    padding = true,
    proseSize = 'sm',
}: ReaderViewProps) {
    return (
        <ReaderViewProvider>
            <ReaderViewContent
                body={body}
                title={title}
                tableOfContents={tableOfContents}
                mdxComponents={mdxComponents}
                commits={commits}
                filePath={filePath}
                leftSidebar={leftSidebar}
                padding={padding}
                proseSize={proseSize}
            >
                {children}
            </ReaderViewContent>
        </ReaderViewProvider>
    )
}

const Menu = () => {
    const { parent, activeInternalMenu, setActiveInternalMenu } = useReaderView()

    return (
        <>
            <Select
                groups={[
                    {
                        label: null,
                        items: parent.children?.map((menuItem) => {
                            return {
                                value: menuItem.url || menuItem.name,
                                label: menuItem.name,
                                icon: menuItem.icon,
                                color: menuItem.color,
                            }
                        }),
                    },
                ]}
                placeholder="Select..."
                ariaLabel="Products"
                className="w-full mb-2"
                value={activeInternalMenu?.url || activeInternalMenu?.name}
                onValueChange={(value) => {
                    const selectedMenu = parent.children?.find(
                        (menuItem) => menuItem.url === value || menuItem.name === value
                    )
                    setActiveInternalMenu(selectedMenu)
                }}
            />
            <TreeMenu items={activeInternalMenu?.children} />
        </>
    )
}

const LeftSidebar = ({ children }: { children: React.ReactNode }) => {
    const { isNavVisible } = useReaderView()
    return (
        <AnimatePresence>
            {isNavVisible && (
                <motion.div
                    id="nav"
                    className="hidden @2xl:block flex-shrink-0 overflow-hidden mb-[-47px]"
                    initial={{ width: '250px' }}
                    animate={{
                        width: '250px',
                        transition: { duration: 0.2 },
                    }}
                    exit={{
                        width: 0,
                        transition: { duration: 0.25, delay: 0.05 },
                    }}
                >
                    <motion.div
                        className="h-full"
                        initial={{ opacity: 1 }}
                        animate={{
                            opacity: 1,
                            transition: { duration: 0.5, delay: 1 },
                        }}
                        exit={{
                            opacity: 0,
                            transition: { duration: 0.05 },
                        }}
                    >
                        <ScrollArea className="px-4">{children}</ScrollArea>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

function ReaderViewContent({
    body,
    title,
    tableOfContents,
    mdxComponents,
    commits,
    filePath,
    children,
    leftSidebar,
    padding = true,
    proseSize,
}) {
    const { hash } = useLocation()
    const contentRef = useRef(null)
    const {
        isNavVisible,
        isTocVisible,
        lineHeightMultiplier,
        fullWidthContent,
        backgroundImage,
        toggleNav,
        toggleToc,
        handleLineHeightChange,
        setFullWidthContent,
    } = useReaderView()

    const showSidebar = tableOfContents && tableOfContents?.length > 0

    const selectedBackgroundOption = backgroundImage
        ? backgroundImageOptions.find((option) => option.value === backgroundImage)
        : null

    const handleContentWidthChange = (value: string) => {
        const isFullWidth = value === 'full'
        setFullWidthContent(isFullWidth)
        localStorage.setItem('full-width-content', isFullWidth.toString())
    }

    useEffect(() => {
        if (hash) {
            const scrollElement = contentRef.current?.closest('[data-radix-scroll-area-viewport]')
            if (scrollElement) {
                scrollElement.scrollTo({
                    top: document.getElementById(CSS.escape(hash.replace('#', '')))?.offsetTop,
                    behavior: 'smooth',
                })
            }
        }
    }, [hash])

    return (
        <SearchProvider>
            <div className="@container w-full h-full flex flex-col">
                {/* <DebugContainerQuery /> */}
                {/* First row - Header */}
                <HeaderBar
                    isNavVisible={isNavVisible}
                    isTocVisible={isTocVisible}
                    onToggleNav={toggleNav}
                    onToggleToc={toggleToc}
                    showHome
                    showBack
                    showForward
                    showSearch
                    showBookmark
                    showToc
                    showSidebar={showSidebar}
                    searchContentRef={contentRef}
                />
                {/* Second row - Main Content */}
                <div data-scheme="secondary" className="bg-primary flex w-full gap-2 min-h-0 flex-grow">
                    <LeftSidebar>{leftSidebar || <Menu />}</LeftSidebar>
                    <ScrollArea
                        dataScheme="primary"
                        className={`bg-primary border border-primary flex-grow rounded ${
                            selectedBackgroundOption && selectedBackgroundOption.value !== 'none'
                                ? 'before:absolute before:inset-0 before:bg-primary before:opacity-75'
                                : ''
                        }`}
                        style={
                            selectedBackgroundOption && selectedBackgroundOption.value !== 'none'
                                ? {
                                      backgroundImage: `url(${selectedBackgroundOption.backgroundImage})`,
                                      backgroundRepeat: selectedBackgroundOption.backgroundRepeat || 'repeat',
                                      backgroundSize: selectedBackgroundOption.backgroundSize || 'auto',
                                      backgroundPosition: selectedBackgroundOption.backgroundPosition || 'center',
                                  }
                                : undefined
                        }
                    >
                        <article className={`${getProseClasses(proseSize)} max-w-none relative overflow-x-hidden`}>
                            <div
                                ref={contentRef}
                                className={`relative ${padding ? 'p-4' : ''} mx-auto transition-all ${
                                    fullWidthContent || body?.type !== 'mdx' ? 'max-w-full' : 'max-w-2xl'
                                }`}
                            >
                                {body.featuredImage && (
                                    <div className="mb-4">
                                        <GatsbyImage image={getImage(body.featuredImage)} alt={title} />
                                    </div>
                                )}
                                {title && <h1>{title}</h1>}
                                {body.contributors && <ContributorsSmall contributors={body.contributors} />}
                                <div
                                    data-scheme="secondary"
                                    className="@4xl:hidden p-4 mb-4 bg-primary rounded border border-primary"
                                >
                                    inline table of contents
                                </div>
                                {body.type === 'mdx' ? (
                                    <div className={'@container'}>
                                        <MDXProvider components={mdxComponents}>
                                            <MDXRenderer>{body.content}</MDXRenderer>
                                        </MDXProvider>
                                    </div>
                                ) : (
                                    children
                                )}
                            </div>
                        </article>
                    </ScrollArea>
                    <AnimatePresence>
                        {showSidebar && isTocVisible && (
                            <motion.div
                                id="toc"
                                className="hidden @4xl:block flex-shrink-0 overflow-hidden"
                                initial={{ width: '300px' }}
                                animate={{
                                    width: '300px',
                                    transition: { duration: 0.2 },
                                }}
                                exit={{
                                    width: 0,
                                    transition: { duration: 0.2, delay: 0.05 },
                                }}
                            >
                                <motion.div
                                    className="h-full"
                                    initial={{ opacity: 1 }}
                                    animate={{
                                        opacity: 1,
                                        transition: { duration: 0.05, delay: 0.2 },
                                    }}
                                    exit={{
                                        opacity: 0,
                                        transition: { duration: 0.05 },
                                    }}
                                >
                                    <ScrollArea className="px-4" fadeOverflow>
                                        {tableOfContents && tableOfContents?.length > 0 && (
                                            <ScrollSpyProvider>
                                                <div>
                                                    <h4 className="font-semibold text-muted m-0 mb-1 text-sm">
                                                        Jump to:
                                                    </h4>
                                                    <ul className="list-none m-0 p-0 flex flex-col">
                                                        {tableOfContents.map((navItem) => {
                                                            return (
                                                                <li
                                                                    className="relative leading-none m-0"
                                                                    key={navItem.url}
                                                                >
                                                                    <ElementScrollLink
                                                                        id={navItem.url}
                                                                        label={navItem.value}
                                                                        className={`text-sm text-muted hover:text-primary py-1 block relative active:top-px active:scale-[.99]`}
                                                                        element={contentRef}
                                                                        style={{
                                                                            paddingLeft: `${navItem.depth || 0}rem`,
                                                                        }}
                                                                    />
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                </div>
                                            </ScrollSpyProvider>
                                        )}
                                    </ScrollArea>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Third row - Footer */}
                <div data-scheme="secondary" className="bg-primary flex w-full gap-px p-2 flex-shrink-0">
                    <motion.div
                        className={`flex-shrink-0 transition-all min-w-0 ${
                            isNavVisible ? '@2xl:min-w-[250px]' : 'w-auto'
                        }`}
                    >
                        {/* this space intentionally left blank */}
                    </motion.div>
                    <div className="flex-grow flex justify-between items-center">
                        <div>Questions?</div>
                        {body?.type === 'mdx' && (
                            <div>
                                <AppOptionsButton
                                    lineHeightMultiplier={lineHeightMultiplier}
                                    handleLineHeightChange={handleLineHeightChange}
                                />
                            </div>
                        )}
                    </div>
                    <motion.div
                        className={`flex-shrink-0 items-center flex justify-end transition-all min-w-0 relative z-10 ${
                            showSidebar && isTocVisible ? '@4xl:min-w-[300px]' : 'w-auto'
                        }`}
                        animate={showSidebar && isTocVisible ? 'open' : 'closed'}
                    >
                        {filePath && (
                            <OSButton
                                asLink
                                to={`https://github.com/PostHog/posthog.com/tree/master/contents/${filePath}`}
                                variant="ghost"
                                icon={<IconPencil />}
                            />
                        )}

                        {commits?.length && commits.length > 0 && (
                            <Popover
                                trigger={
                                    <span>
                                        <OSButton variant="ghost" icon={<IconClockRewind />} />
                                    </span>
                                }
                                title="Edit history"
                                dataScheme="secondary"
                                contentClassName="w-[260px]"
                            >
                                <ul className="list-none m-0 p-0 space-y-2 max-h-[200px] overflow-y-auto">
                                    {commits.map((commit) => (
                                        <li key={commit.url} className="flex gap-2 justify-between items-center">
                                            <Link
                                                to={commit.author.html_url}
                                                className="flex items-center gap-2"
                                                externalNoIcon
                                            >
                                                <div>
                                                    <div className="size-7 bg-accent rounded-full relative">
                                                        <img
                                                            src={commit.author.avatar_url}
                                                            alt={commit.author.login}
                                                            className="size-full rounded-full object-cover"
                                                        />
                                                    </div>
                                                </div>
                                                <p className="text-sm m-0">{commit.author.login}</p>
                                            </Link>
                                            <div className="flex items-center gap-2">
                                                <p className="text-xs opacity-60 m-0">{dayjs(commit.date).fromNow()}</p>
                                                <Link to={commit.url} externalNoIcon>
                                                    <IconPullRequest className="size-4" />
                                                </Link>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </Popover>
                        )}
                    </motion.div>
                </div>
            </div>
        </SearchProvider>
    )
}
