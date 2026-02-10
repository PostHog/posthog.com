import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import OSButton from 'components/OSButton'
import {
    IconPencil,
    IconPullRequest,
    IconTextWidth,
    IconGear,
    IconRefresh,
    IconClockRewind,
    IconTextWidthFixed,
} from '@posthog/icons'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { Select } from '../RadixUI/Select'
import { Popover } from '../RadixUI/Popover'
import { ToggleGroup, ToggleOption } from 'components/RadixUI/ToggleGroup'
import { Accordion } from '../RadixUI/Accordion'
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
import { ReaderViewProvider, useReaderView } from './context/ReaderViewContext'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import CloudinaryImage from 'components/CloudinaryImage'
import SearchProvider from 'components/Editor/SearchProvider'
import { useLocation } from '@reach/router'
import { getProseClasses, MARKDOWN_CONTENT_PATHS } from '../../constants'
import { useWindow } from '../../context/Window'
import { MenuItem, useApp } from '../../context/App'
import { Questions } from 'components/Squeak'
import { navigate } from 'gatsby'
import { DocsPageSurvey } from 'components/DocsPageSurvey'
import CopyMarkdownActionsDropdown, { useMarkdownUrlExists } from 'components/MarkdownActionsDropdown'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
import CustomerMetadata from './CustomerMetadata'
import { getVideoClasses } from '../../constants'
import { Blockquote } from 'components/BlockQuote'

dayjs.extend(relativeTime)

// Wrapper component that conditionally renders CopyMarkdownActionsDropdown based on whether the markdown URL exists
const ConditionalMarkdownDropdown = ({ pageUrl }: { pageUrl: string | undefined }) => {
    // Check if path is in allowed content paths
    const isAllowedPath = pageUrl && MARKDOWN_CONTENT_PATHS.some((path) => pageUrl.includes(path))
    const markdownExists = useMarkdownUrlExists(isAllowedPath ? pageUrl : '')

    // Don't render if path is not allowed, during loading, or if markdown doesn't exist
    if (!isAllowedPath || markdownExists !== true) {
        return null
    }

    return <CopyMarkdownActionsDropdown pageUrl={pageUrl} />
}

interface ReaderViewProps {
    body?: {
        type: 'mdx' | 'plain'
        content: string
        featuredImage?: any
        featuredImageCaption?: string
        contributors?: any[]
        date?: string
        featuredVideo?: string
        tags?: { label: string; url: string }[]
    }
    title?: string
    hideTitle?: boolean
    tableOfContents?: any
    mdxComponents?: any
    commits?: any[]
    filePath?: string
    children?: React.ReactNode
    leftSidebar?: React.ReactNode
    hideLeftSidebar?: boolean
    hideRightSidebar?: boolean
    contentMaxWidthClass?: string
    padding?: boolean
    proseSize?: 'sm' | 'base' | 'lg'
    homeURL?: string
    description?: string
    rightActionButtons?: React.ReactNode
    isEditing?: boolean
    onSearch?: (query: string) => void
    showSurvey?: boolean
    parent?: MenuItem
    showQuestions?: boolean
    showAbout?: boolean
    sourceInstanceName?: string
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
                    const color = profile?.color
                    const url = profile_id && `/community/profiles/${profile_id}`
                    const Container = url ? Link : 'div'
                    const gatsbyImage = image && getImage(image)
                    return (
                        <li className="!mb-0" key={name}>
                            <Container
                                className="flex space-x-2 items-center"
                                {...(url ? { to: url, state: { newWindow: true } } : {})}
                            >
                                {typeof image === 'string' ? (
                                    <CloudinaryImage
                                        width={50}
                                        className={`w-6 h-6 border border-primary rounded-full overflow-hidden bg-${
                                            color ? color : 'red'
                                        }`}
                                        src={image}
                                    />
                                ) : gatsbyImage ? (
                                    <GatsbyImage
                                        image={gatsbyImage}
                                        alt={name}
                                        className={`w-6 h-6 border border-primary rounded-full overflow-hidden bg-${
                                            color ? color : 'red'
                                        }`}
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
            <OSButton onClick={() => onValueChange([1])} icon={<IconRefresh className="size-5" />} />
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
                    <OSButton icon={<IconGear className="size-5" />} />
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
                        <Link to="/display-options" state={{ newWindow: true }} className="font-semibold underline">
                            desktop settings
                        </Link>
                    </span>
                </p>
            </div>
        </Popover>
    )
}

interface TableOfContentsProps {
    tableOfContents: any[]
    contentRef: React.RefObject<HTMLDivElement>
    title?: string
    className?: string
}

const TableOfContents = ({ tableOfContents, contentRef, title = 'Jump to:', className = '' }: TableOfContentsProps) => {
    if (!tableOfContents || tableOfContents.length === 0) {
        return null
    }

    return (
        <ScrollSpyProvider>
            <div className={`not-prose ${className}`}>
                <div className="@4xl/app-reader:hidden mb-4">
                    <Accordion
                        items={[
                            {
                                value: 'table-of-contents',
                                trigger: title,
                                content: (
                                    <ul className="list-none m-0 p-0 flex flex-col">
                                        {tableOfContents.map((navItem) => {
                                            return (
                                                <li className="relative leading-none m-0" key={navItem.url}>
                                                    <ElementScrollLink
                                                        id={navItem.url}
                                                        label={navItem.value}
                                                        className="hover:underline"
                                                        element={contentRef}
                                                        style={{
                                                            paddingLeft: `${navItem.depth || 0}rem`,
                                                        }}
                                                    />
                                                </li>
                                            )
                                        })}
                                    </ul>
                                ),
                            },
                        ]}
                        defaultValue="table-of-contents"
                        skin={true}
                        dataScheme="secondary"
                    />
                </div>
                <div className="hidden @4xl/app-reader:block">
                    {title && <h4 className="font-semibold text-muted m-0 mb-1 text-sm">{title}</h4>}
                    <ul className="list-none m-0 p-0 flex flex-col">
                        {tableOfContents.map((navItem) => {
                            return (
                                <li className="relative leading-none m-0" key={navItem.url}>
                                    <ElementScrollLink
                                        id={navItem.url}
                                        label={navItem.value}
                                        className="hover:underline"
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
            </div>
        </ScrollSpyProvider>
    )
}

export default function ReaderView({
    body = {},
    title,
    header,
    hideTitle = false,
    tableOfContents,
    hideMobileTableOfContents = false,
    mdxComponents,
    commits,
    filePath,
    children,
    leftSidebar,
    hideLeftSidebar = false,
    hideRightSidebar = false,
    contentMaxWidthClass,
    padding = true,
    proseSize = 'sm',
    homeURL,
    description,
    rightActionButtons,
    isEditing,
    onSearch,
    showSurvey = false,
    parent,
    showQuestions = true,
    showAbout = false,
    sourceInstanceName,
}: ReaderViewProps) {
    return (
        <ReaderViewProvider>
            <ReaderViewContent
                body={body}
                title={title}
                header={header}
                hideTitle={hideTitle}
                tableOfContents={tableOfContents}
                hideMobileTableOfContents={hideMobileTableOfContents}
                mdxComponents={mdxComponents}
                commits={commits}
                filePath={filePath}
                leftSidebar={leftSidebar}
                hideLeftSidebar={hideLeftSidebar}
                hideRightSidebar={hideRightSidebar}
                contentMaxWidthClass={contentMaxWidthClass}
                padding={padding}
                proseSize={proseSize}
                homeURL={homeURL}
                description={description}
                rightActionButtons={rightActionButtons}
                isEditing={isEditing}
                onSearch={onSearch}
                showSurvey={showSurvey}
                parent={parent}
                showQuestions={showQuestions}
                showAbout={showAbout}
                sourceInstanceName={sourceInstanceName}
            >
                {children}
            </ReaderViewContent>
        </ReaderViewProvider>
    )
}

const Menu = (props: { parent: MenuItem }) => {
    const { setActiveInternalMenu, activeInternalMenu: windowActiveInternalMenu, parent: windowParent } = useWindow()

    const parent = props.parent || windowParent
    const activeInternalMenu = windowActiveInternalMenu || parent.children?.[0]

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
                    if (selectedMenu?.url) {
                        return navigate(selectedMenu.url)
                    }
                }}
                dataScheme="primary"
            />
            <TreeMenu key={activeInternalMenu?.url} items={activeInternalMenu?.children} />
        </>
    )
}

const LeftSidebar = ({ children }: { children: React.ReactNode }) => {
    const { isNavVisible, toggleNav } = useReaderView()

    return (
        <AnimatePresence>
            {isNavVisible && (
                <>
                    {/* Backdrop for mobile overlay - only visible on small screens */}
                    <motion.div
                        className="fixed inset-0 top-[37px] bg-black/50 z-40 @2xl/app-reader:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 0.2 } }}
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                        onClick={toggleNav}
                    />

                    {/* Sidebar - overlay on mobile, normal flow on desktop */}
                    <motion.div
                        id="nav"
                        className="flex-shrink-0 overflow-hidden mb-[-36px] @2xl/app-reader:mb-0 text-primary 
                                   fixed left-2 top-[47px] bottom-16 z-50 
                                   @2xl/app-reader:static @2xl/app-reader:z-auto @2xl/app-reader:top-auto @2xl/app-reader:bottom-auto @2xl/app-reader:left-auto"
                        initial={{
                            width: '250px',
                            x: isNavVisible ? 0 : -250, // Start off-screen on mobile
                        }}
                        animate={{
                            width: '250px',
                            x: 0, // Slide in
                            transition: { duration: 0.2 },
                        }}
                        exit={{
                            width: '250px',
                            x: -250, // Slide out on mobile
                            transition: { duration: 0.25, delay: 0.05 },
                        }}
                    >
                        <motion.div
                            className="h-full bg-primary rounded @2xl/app-reader:rounded-none pt-4 @2xl/app-reader:pt-0"
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
                            <ScrollArea className="px-4">{children}</ScrollArea>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

function ReaderViewContent({
    body,
    title,
    header,
    hideTitle = false,
    tableOfContents,
    hideMobileTableOfContents = false,
    mdxComponents,
    commits,
    filePath,
    children,
    leftSidebar,
    hideLeftSidebar = false,
    hideRightSidebar = false,
    contentMaxWidthClass,
    padding = true,
    proseSize,
    homeURL,
    description,
    rightActionButtons,
    isEditing,
    onSearch,
    showSurvey = false,
    parent,
    showQuestions = true,
    showAbout = false,
    sourceInstanceName,
}) {
    const { openNewChat, compact } = useApp()
    const { appWindow, activeInternalMenu } = useWindow()
    const { hash, pathname } = useLocation()
    const contentRef = useRef(null)

    // Check if this is a customer page and get customer key
    const isCustomerPage = appWindow?.path?.startsWith('/customers/')
    const customerSlug = isCustomerPage ? appWindow.path.split('/').pop() : null
    // Handle slug-to-key mapping (e.g., great-expectations → greatexpectations)
    const customerKey = customerSlug ? customerSlug.replace(/-/g, '') : null
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

    const showSidebar = tableOfContents && tableOfContents?.length > 0 && !hideRightSidebar

    // Determine if we should render the left sidebar at all (separate from animation state)
    const renderLeftSidebar = !compact && !hideLeftSidebar

    const selectedBackgroundOption = backgroundImage
        ? backgroundImageOptions.find((option) => option.value === backgroundImage)
        : null

    const handleContentWidthChange = (value: string) => {
        const isFullWidth = value === 'full'
        setFullWidthContent(isFullWidth)
        localStorage.setItem('full-width-content', isFullWidth.toString())
    }

    useEffect(() => {
        const scrollElement = contentRef.current?.closest('[data-radix-scroll-area-viewport]') as HTMLElement
        if (!scrollElement) return

        const waitForImagesAndScroll = async () => {
            const images = contentRef.current?.querySelectorAll('img') || []
            const imageLoadPromises = Array.from(images).map((img: HTMLImageElement) => {
                return new Promise<void>((resolve) => {
                    if (img.complete) {
                        resolve()
                    } else {
                        img.addEventListener('load', () => resolve())
                        img.addEventListener('error', () => resolve())
                    }
                })
            })
            await Promise.all(imageLoadPromises)
            await new Promise((resolve) => setTimeout(resolve, 100))
            const targetElement = document.getElementById(hash.replace('#', ''))
            if (targetElement) {
                const detailsParent = targetElement.closest('details')
                if (detailsParent) {
                    detailsParent.open = true
                }
                scrollElement.scrollTo({
                    top: targetElement.offsetTop || 0,
                    behavior: 'smooth',
                })
            }
        }

        if (hash) {
            waitForImagesAndScroll()
        } else {
            scrollElement.scrollTo({
                top: 0,
            })
        }
    }, [appWindow?.path, hash])

    return (
        <SearchProvider>
            <div className="@container/app-reader w-full h-full flex flex-col">
                {/* <DebugContainerQuery /> */}
                {/* First row - Header */}
                <HeaderBar
                    isNavVisible={isNavVisible}
                    isTocVisible={isTocVisible}
                    onToggleNav={toggleNav}
                    onToggleToc={toggleToc}
                    showBack
                    showForward
                    showSearch
                    showToc
                    showSidebar={showSidebar}
                    hasLeftSidebar={renderLeftSidebar}
                    searchContentRef={contentRef}
                    homeURL={homeURL}
                    bookmark={{
                        title,
                        description,
                    }}
                    rightActionButtons={rightActionButtons}
                    isEditing={isEditing}
                    onSearch={onSearch}
                />
                {/* Second row - Main Content */}
                <div data-scheme="secondary" className="bg-primary flex w-full gap-2 min-h-0 flex-grow">
                    {renderLeftSidebar && <LeftSidebar>{leftSidebar || <Menu parent={parent} />}</LeftSidebar>}
                    <ScrollArea
                        dataScheme="primary"
                        className={`bg-primary border border-primary flex-grow  
                            ${renderLeftSidebar && isNavVisible ? '@2xl/app-reader:rounded-l' : 'border-l-0'}
                            ${
                                showSidebar && isTocVisible
                                    ? 'rounded-r-0 border-r-0 @4xl/app-reader:rounded-r @4xl/app-reader:border-r'
                                    : 'border-r-0'
                            } ${
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
                        <article
                            className={`reader-view-content-container @container/reader-content-container ${getProseClasses(
                                proseSize
                            )} max-w-none relative`}
                        >
                            {header && (
                                <header className="relative">
                                    <CloudinaryImage
                                        src="https://res.cloudinary.com/dmukukwp6/image/upload/texture_tan_9608fcca70.png"
                                        className="dark:hidden absolute inset-0"
                                        imgClassName="h-full w-full"
                                    />
                                    <CloudinaryImage
                                        src="https://res.cloudinary.com/dmukukwp6/image/upload/texture_tan_dark_a92b0e022d.png"
                                        className="hidden dark:block absolute inset-0"
                                        imgClassName="h-full w-full"
                                    />
                                    <div className="relative flex flex-col items-center w-full">{header}</div>
                                </header>
                            )}
                            <div
                                ref={contentRef}
                                className={`@container/reader-content relative ${
                                    padding
                                        ? 'p-4 @md/reader-content-container:px-6 @lg/reader-content-container:px-8'
                                        : ''
                                }`}
                            >
                                {/* <DebugContainerQuery /> */}
                                {body.featuredImage && !body.featuredVideo && (
                                    <div className="not-prose mb-6 relative">
                                        <div className="text-center">
                                            <GatsbyImage
                                                image={getImage(body.featuredImage)}
                                                alt={title}
                                                className="rounded"
                                            />
                                        </div>
                                        {body.featuredImageCaption && (
                                            <div className="absolute right-0 bottom-0 m-2 text-sm text-white bg-black bg-opacity-75 font-medium py-1 px-2 rounded-sm italic text-right">
                                                {body.featuredImageCaption}
                                            </div>
                                        )}
                                    </div>
                                )}
                                {title && !hideTitle && (
                                    <h1
                                        className={`mx-auto transition-all ${
                                            fullWidthContent || body?.type !== 'mdx'
                                                ? 'max-w-full'
                                                : contentMaxWidthClass || 'max-w-2xl'
                                        }`}
                                    >
                                        {title}
                                    </h1>
                                )}
                                {(body.date || body.contributors || body.tags) && (
                                    <div
                                        className={`flex items-center space-x-2 mt-4 flex-wrap mx-auto transition-all ${
                                            fullWidthContent || body?.type !== 'mdx'
                                                ? 'max-w-full'
                                                : contentMaxWidthClass || 'max-w-2xl'
                                        }`}
                                    >
                                        {body.contributors && <ContributorsSmall contributors={body.contributors} />}
                                        {body.date && <p className="text-sm text-secondary m-0">{body.date}</p>}
                                        {body.tags && (
                                            <ul className="m-0 p-0 list-none text-sm flex flex-wrap gap-1">
                                                {body.tags.map((tag, index) => {
                                                    const isLast = index === body.tags.length - 1
                                                    return (
                                                        <li key={tag.url} className="p-0">
                                                            <Link to={tag.url}>{tag.label}</Link>
                                                            {!isLast && ', '}
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        )}
                                    </div>
                                )}
                                {tableOfContents &&
                                    tableOfContents.length > 0 &&
                                    !hideMobileTableOfContents &&
                                    !hideRightSidebar && (
                                        <div
                                            id="mobile-toc"
                                            data-scheme="secondary"
                                            className={`@4xl/app-reader:hidden mt-4 mx-auto transition-all ${
                                                fullWidthContent || body?.type !== 'mdx'
                                                    ? 'max-w-full'
                                                    : contentMaxWidthClass || 'max-w-2xl'
                                            }`}
                                        >
                                            <TableOfContents
                                                tableOfContents={tableOfContents}
                                                contentRef={contentRef}
                                                title="Contents"
                                            />
                                        </div>
                                    )}
                                {body.featuredVideo && (
                                    <iframe src={body.featuredVideo} className={getVideoClasses(fullWidthContent)} />
                                )}
                                <div className="reader-content-container">
                                    {body.type === 'mdx' ? (
                                        <div
                                            className={`@container [&>*:not(.OSTable):not(.Table)]:mx-auto [&>*:not(.OSTable):not(.Table)]:transition-all [&>span:not(.OSTable):not(.Table)]:block ${
                                                fullWidthContent || body?.type !== 'mdx'
                                                    ? '[&>*:not(.OSTable):not(.Table)]:max-w-full'
                                                    : contentMaxWidthClass ||
                                                      '[&>*:not(.OSTable):not(.Table)]:max-w-2xl'
                                            }`}
                                        >
                                            {/* Display customer metadata if this is a customer page */}
                                            {isCustomerPage && customerKey && (
                                                <CustomerMetadata customerKey={customerKey} />
                                            )}

                                            <MDXProvider components={mdxComponents}>
                                                <MDXRenderer>{body.content}</MDXRenderer>
                                            </MDXProvider>
                                        </div>
                                    ) : (
                                        children
                                    )}
                                </div>
                                {showAbout && (
                                    <div
                                        className={`mt-8 mx-auto transition-all ${
                                            fullWidthContent || body?.type !== 'mdx'
                                                ? 'max-w-full'
                                                : contentMaxWidthClass || 'max-w-2xl'
                                        }`}
                                    >
                                        <Blockquote>
                                            PostHog is an all-in-one developer platform for building successful
                                            products. We provide <a href="/product-analytics">product analytics</a>,{' '}
                                            <a href="/web-analytics">web analytics</a>,{' '}
                                            <a href="/session-replay">session replay</a>,{' '}
                                            <a href="/error-tracking">error tracking</a>,{' '}
                                            <a href="/feature-flags">feature flags</a>,{' '}
                                            <a href="/experiments">experiments</a>, <a href="/surveys">surveys</a>,{' '}
                                            <a href="/llm-analytics">LLM analytics</a>,{' '}
                                            <a href="/data-warehouse">data warehouse</a>, <a href="/cdp">CDP</a>, and an{' '}
                                            <a href="/ai">AI product assistant</a> to help debug your code, ship
                                            features faster, and keep all your usage and customer data in one stack.
                                        </Blockquote>
                                    </div>
                                )}
                                {showQuestions && (
                                    <div
                                        className={`mt-8 mx-auto transition-all ${
                                            fullWidthContent || body?.type !== 'mdx'
                                                ? 'max-w-full'
                                                : contentMaxWidthClass || 'max-w-2xl'
                                        }`}
                                    >
                                        <h3 id="squeak-questions" className="mb-4">
                                            Community questions
                                        </h3>
                                        <Questions
                                            slug={appWindow?.path}
                                            parentName={activeInternalMenu?.name}
                                            className={`mx-auto transition-all ${
                                                fullWidthContent || body?.type !== 'mdx'
                                                    ? 'max-w-full'
                                                    : contentMaxWidthClass || 'max-w-2xl'
                                            }`}
                                        />
                                    </div>
                                )}
                                {showSurvey && (
                                    <div
                                        className={`mt-8 mx-auto transition-all ${
                                            fullWidthContent || body?.type !== 'mdx'
                                                ? 'max-w-full'
                                                : contentMaxWidthClass || 'max-w-2xl'
                                        }`}
                                    >
                                        <DocsPageSurvey filePath={filePath} />
                                    </div>
                                )}
                            </div>
                        </article>
                    </ScrollArea>
                    <AnimatePresence>
                        {showSidebar && isTocVisible && (
                            <motion.div
                                id="toc"
                                className="hidden @4xl/app-reader:block flex-shrink-0 overflow-hidden"
                                initial={{ width: 250 }}
                                animate={{
                                    width: 250,
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
                                    <ScrollArea className="px-2" fadeOverflow>
                                        {tableOfContents && tableOfContents?.length > 0 && (
                                            <TableOfContents
                                                tableOfContents={tableOfContents}
                                                contentRef={contentRef}
                                            />
                                        )}
                                    </ScrollArea>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Third row - Footer */}
                <div data-scheme="secondary" className="bg-primary flex w-full gap-px p-2 flex-shrink-0 rounded-b">
                    <motion.div
                        className={`flex-shrink-0 transition-all min-w-0 ${
                            renderLeftSidebar && isNavVisible ? '@2xl/app-reader:min-w-[250px]' : 'w-auto'
                        }`}
                    >
                        {/* this space intentionally left blank */}
                    </motion.div>
                    {!compact && (
                        <div className="flex-grow flex justify-between items-center text-primary">
                            <div>
                                <p className="m-0 text-sm">
                                    Questions about this page?{' '}
                                    <button
                                        className="font-semibold underline"
                                        onClick={() =>
                                            openNewChat({
                                                path: `ask-max-${appWindow?.path}`,
                                                context: [
                                                    {
                                                        type: 'page',
                                                        value: {
                                                            path: appWindow?.path,
                                                            label: title,
                                                        },
                                                    },
                                                ],
                                            })
                                        }
                                    >
                                        Ask PostHog AI
                                    </button>{' '}
                                    or{' '}
                                    <Link
                                        className="font-semibold underline"
                                        to="/questions"
                                        state={{ newWindow: true }}
                                    >
                                        post a community question
                                    </Link>
                                    .
                                </p>
                            </div>
                            {body?.type === 'mdx' && (
                                <div>
                                    <AppOptionsButton
                                        lineHeightMultiplier={lineHeightMultiplier}
                                        handleLineHeightChange={handleLineHeightChange}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                    <motion.div
                        className={`flex-shrink-0 items-center flex justify-end transition-all min-w-0 relative z-10 ${
                            showSidebar && isTocVisible ? '@4xl/app-reader:min-w-[250px]' : 'w-auto'
                        }`}
                        animate={showSidebar && isTocVisible ? 'open' : 'closed'}
                    >
                        <ConditionalMarkdownDropdown pageUrl={appWindow?.path} />
                        {filePath && (
                            <OSButton
                                asLink
                                to={`https://github.com/PostHog/${
                                    sourceInstanceName === 'posthog-main-repo'
                                        ? 'posthog/blob/master'
                                        : 'posthog.com/blob/master/contents'
                                }/${filePath}`}
                                icon={<IconPencil />}
                            />
                        )}
                        {commits?.length && commits.length > 0 && (
                            <Popover
                                trigger={
                                    <span>
                                        <OSButton icon={<IconClockRewind />} />
                                    </span>
                                }
                                title="Edit history"
                                dataScheme="secondary"
                                contentClassName="w-[260px]"
                            >
                                <ul className="list-none m-0 p-0 space-y-2 max-h-[200px] overflow-y-auto">
                                    {commits
                                        .filter((commit) => !!commit.author)
                                        .map((commit) => (
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
                                                    <p className="text-xs opacity-60 m-0">
                                                        {dayjs(commit.date).fromNow()}
                                                    </p>
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
