import React, { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import OSButton from 'components/OSButton'
import { IconPencil, IconPullRequest, IconTextWidth, IconGear, IconInfo, IconRefresh, IconClockRewind, IconTextWidthFixed } from '@posthog/icons'
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
import TooltipDemo from 'components/RadixUI/Tooltip'
import { ReaderViewProvider, useReaderView } from './context/ReaderViewContext'
dayjs.extend(relativeTime)

interface ReaderViewProps {
    body: {
        type: 'mdx' | 'plain'
        content: string
    }
    title: string
    tableOfContents: any
    mdxComponents?: any
    commits?: any[]
    filePath?: string
}

const backgroundImageOptions: ToggleOption[] = [
    {
        label: 'None',
        value: 'none',
        // icon: <IconLaptop className="size-5" />,
        default: true,
    },
    {
        label: '2',
        value: '2',
        // icon: <IconDay className="size-5" />,
    },
    {
        label: '3',
        value: '3',
        // icon: <IconNight className="size-5" />,
    },
]

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
            <OSButton onClick={() => onValueChange([1])} variant="ghost" icon={<IconRefresh className="size-5" />} />
        </div>
    )
}

const AppOptionsButton = ({ lineHeightMultiplier, handleLineHeightChange }) => {
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
                    </div>
                </Fieldset>

                <Fieldset legend="Why not?">
                    <div className="grid grid-cols-2 gap-2">
                        <label className="pt-1.5 text-[15px]">Background image</label>
                        <ToggleGroup title="Background image" options={backgroundImageOptions} />
                    </div>
                </Fieldset>

                <p className="text-[13px]">
                    Toggle light/dark mode in{' '}
                    <span className="inline-flex items-center gap-0.5">
                        <button className="font-semibold underline">desktop settings</button>
                        <TooltipDemo trigger={<IconInfo className="size-4" />}>Lower right!</TooltipDemo>
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
    body,
    title,
    tableOfContents,
    mdxComponents,
    commits,
    filePath,
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
            />
        </ReaderViewProvider>
    )
}

function ReaderViewContent({ body, title, tableOfContents, mdxComponents, commits, filePath }) {
    const contentRef = useRef(null)
    const {
        isNavVisible,
        isTocVisible,
        lineHeightMultiplier,
        fullWidthContent,
        parent,
        activeInternalMenu,
        toggleNav,
        toggleToc,
        handleLineHeightChange,
        setActiveInternalMenu,
    } = useReaderView()

    return (
        <div className="@container w-full h-full flex flex-col">
            <DebugContainerQuery />
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
                showSidebar
            />
            {/* Second row - Main Content */}
            <div data-scheme="secondary" className="bg-primary flex w-full gap-2 min-h-0 flex-grow">
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
                                <ScrollArea className="px-4">
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
                                    <TreeMenu items={activeInternalMenu.children} />
                                </ScrollArea>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <ScrollArea dataScheme="primary" className="bg-primary border border-primary flex-grow rounded">
                    <div
                        ref={contentRef}
                        className={`p-4 mx-auto transition-all ${fullWidthContent ? 'max-w-full' : 'max-w-xl'}`}
                    >
                        <h2>{title}</h2>
                        <div
                            data-scheme="secondary"
                            className="@4xl:hidden p-4 mb-4 bg-primary rounded border border-primary"
                        >
                            inline table of contents
                        </div>
                        {body.type === 'mdx' ? (
                            <div className={'article-content'}>
                                <MDXProvider components={mdxComponents}>
                                    <MDXRenderer>{body.content}</MDXRenderer>
                                </MDXProvider>
                            </div>
                        ) : (
                            body.content
                        )}
                    </div>
                </ScrollArea>
                <AnimatePresence>
                    {isTocVisible && (
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
                                                <h4 className="font-semibold text-muted m-0 mb-1 text-sm">Jump to:</h4>
                                                <ul className="list-none m-0 p-0 flex flex-col">
                                                    {tableOfContents.map((navItem) => {
                                                        return (
                                                            <li className="relative leading-none m-0" key={navItem.url}>
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
                    className={`flex-shrink-0 transition-all min-w-0 ${isNavVisible ? '@2xl:min-w-[250px]' : 'w-auto'}`}
                >
                    {/* this space intentionally left blank */}
                </motion.div>
                <div className="flex-grow flex justify-between items-center">
                    <div>Questions?</div>
                    <div>
                        <AppOptionsButton
                            lineHeightMultiplier={lineHeightMultiplier}
                            handleLineHeightChange={handleLineHeightChange}
                        />
                    </div>
                </div>
                <motion.div
                    className={`flex-shrink-0 items-center flex justify-end transition-all min-w-0 relative z-10 ${
                        isTocVisible ? '@4xl:min-w-[300px]' : 'w-auto'
                    }`}
                    animate={isTocVisible ? 'open' : 'closed'}
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
    )
}
