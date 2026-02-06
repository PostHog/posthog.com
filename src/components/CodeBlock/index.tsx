import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import { generateRandomHtmlId, getCookie } from '../../lib/utils'
import { Listbox, Tab } from '@headlessui/react'
import { SelectorIcon } from '@heroicons/react/outline'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { darkTheme, lightTheme } from './theme'
import languageMap from './languages'
import { useActions, useValues } from 'kea'
import { layoutLogic } from 'logic/layoutLogic'
import Mermaid from 'components/Mermaid'
import Tooltip from 'components/Tooltip'
import usePostHog from 'hooks/usePostHog'
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'
import { IconArrowUpRight, IconSparkles } from '@posthog/icons'
import { useLocation } from '@reach/router'
import { codeBlockLogic } from './codeBlockLogic'

type LanguageOption = {
    label?: string
    language: string
    file?: string
    code: string
    focusOnLines?: string
    runInPostHog?: string
}

type CodeBlockProps = {
    label?: React.ReactNode
    selector?: 'dropdown' | 'tabs'
    showLabel?: boolean
    showLineNumbers?: boolean
    showCopy?: boolean
    showAskAI?: boolean
    focusOnLines?: string
    tooltips?: { lineNumber: number; content: string }[]

    onChange?: (language: LanguageOption) => void
    currentLanguage: LanguageOption
    children: LanguageOption[]
    lineNumberStart?: number
}

type SingleCodeBlockProps = {
    label?: React.ReactNode
    showLabel?: boolean
    showLineNumbers?: boolean
    showCopy?: boolean
    showAskAI?: boolean
    language: string
    children: string
}

type MdxCodeBlock = {
    selector?: 'dropdown' | 'tabs'
    showTitle?: boolean
    showCopy?: boolean
    /**
     * When provided, persists the selected tab across page refreshes and syncs
     * the selection across all code blocks with the same syncKey on the page.
     * Example: syncKey="install" for npm/yarn/pnpm tabs, syncKey="sdk" for Python/Node tabs.
     */
    syncKey?: string
    children: MdxCodeBlockChildren[] | MdxCodeBlockChildren
}

// Optional metastring properties
type MetaStringProps = {
    metastring?: string
    file?: string
    showLineNumbers?: boolean
    label?: string
    unavailable?: boolean
    focusOnLines?: string
    runInPostHog?: string
}

type MdxCodeBlockChildren = {
    props: {
        mdxType: string
        className: string
        label?: string
        children: {
            key: string | null
            props: {
                className: string
                mdxType: string
                children: string
            } & MetaStringProps
        }
    } & MetaStringProps
}

export const MdxCodeBlock = ({ children, syncKey, ...props }: MdxCodeBlock): JSX.Element | null => {
    if (children?.props?.className?.includes('language-mermaid')) {
        return <Mermaid>{children.props.children}</Mermaid>
    }
    const childArray = Array.isArray(children) ? children : [children]

    const languages = childArray
        .filter((child) => child.props.mdxType === 'pre' || child.props.mdxType === 'code')
        .map((child) => {
            const {
                className = '',
                label,
                file,
                children,
                focusOnLines,
                runInPostHog,
            } = child.props.mdxType === 'code' ? child.props : child.props.children.props

            const matches = className.match(/language-(?<lang>.*)/)
            const language = matches && matches.groups && matches.groups.lang ? matches.groups.lang : ''

            return {
                label,
                language: language.toLowerCase(),
                file,
                code: children as string,
                focusOnLines,
                runInPostHog,
            }
        })

    // This isn't great practice as it means hooks are renderered conditionally
    if (languages.length === 0) {
        return null
    }

    // If syncKey is provided, use persisted preferences
    if (syncKey) {
        return <SyncedCodeBlock languages={languages} syncKey={syncKey} {...props} />
    }

    // Otherwise, use local state only
    const [currentLanguage, setCurrentLanguage] = React.useState<LanguageOption>(languages[0])
    return (
        <CodeBlock currentLanguage={currentLanguage} onChange={setCurrentLanguage} {...props}>
            {languages}
        </CodeBlock>
    )
}

/**
 * Code block with synced preferences via kea.
 * Only rendered when syncKey is provided.
 */
const SyncedCodeBlock = ({
    languages,
    syncKey,
    ...props
}: { languages: LanguageOption[]; syncKey: string } & Omit<MdxCodeBlock, 'children' | 'syncKey'>): JSX.Element => {
    const { preferences } = useValues(codeBlockLogic)
    const { setPreference } = useActions(codeBlockLogic)

    // Get the option key for each language (label > file > language)
    const getOptionKey = (lang: LanguageOption) => lang.label || lang.file || lang.language

    // Find the initial language based on stored preference
    const storedValue = preferences[syncKey]
    const initialLanguage = storedValue
        ? languages.find((lang) => getOptionKey(lang) === storedValue) || languages[0]
        : languages[0]

    const [currentLanguage, setCurrentLanguage] = React.useState<LanguageOption>(initialLanguage)

    // Sync with preference changes from other code blocks OR when preferences load from localStorage
    const storedPreference = preferences[syncKey]
    React.useEffect(() => {
        if (storedPreference) {
            const matchingLanguage = languages.find((lang) => getOptionKey(lang) === storedPreference)
            if (matchingLanguage && getOptionKey(matchingLanguage) !== getOptionKey(currentLanguage)) {
                setCurrentLanguage(matchingLanguage)
            }
        }
    }, [storedPreference, languages, currentLanguage])

    const handleChange = React.useCallback(
        (language: LanguageOption) => {
            const key = getOptionKey(language)
            setCurrentLanguage(language)
            // Only persist preferences if this language exists in the available options
            // This ensures selecting an option only affects code blocks that have that option
            if (languages.some((lang) => getOptionKey(lang) === key)) {
                setPreference(syncKey, key)
            }
        },
        [syncKey, setPreference, languages]
    )

    return (
        <CodeBlock currentLanguage={currentLanguage} onChange={handleChange} {...props}>
            {languages}
        </CodeBlock>
    )
}

export const SingleCodeBlock = ({ label, language, children, ...props }: SingleCodeBlockProps): JSX.Element => {
    const currentLanguage = {
        language,
        code: children,
    }

    return (
        <CodeBlock label={label} currentLanguage={currentLanguage} {...props}>
            {[currentLanguage]}
        </CodeBlock>
    )
}

const tooltipKey = '// TIP:'
const highlightKey = '// HIGHLIGHT'
const diffAddKey = '// +'
const diffRemoveKey = '// -'

const removeQuotes = (str?: string | null): string | null | undefined => {
    return str?.replace(/['"]/g, '')
}

const stripAnnotationComments = (code: string): string => {
    return code
        .replace(tooltipKey, '//')
        .replace(highlightKey, '')
        .replace(diffAddKey, '')
        .replace(diffRemoveKey, '')
        .trim()
}

const getLinesToShow = (lines: string): number[] => {
    const lineBounds = lines.split('-').map((line) => {
        return parseInt(line.trim())
    })

    const [start, end] = lineBounds
    const lineNumbers = Array.from({ length: end - start + 1 }, (_, i) => start + i)
    return lineNumbers
}

export const CodeBlock = ({
    label,
    selector = 'tabs',
    showLabel = true,
    showCopy = true,
    showAskAI = true,
    showLineNumbers = false,
    children: languages,
    currentLanguage,
    onChange,
    lineNumberStart = 1,
    tooltips,
}: CodeBlockProps): JSX.Element | null => {
    if (languages.length < 0 || !currentLanguage) {
        return null
    }

    const codeBlockId = generateRandomHtmlId()
    const { siteSettings, openNewChat } = useApp()
    const { appWindow } = useWindow()
    const location = useLocation()
    const [tooltipVisible, setTooltipVisible] = React.useState(false)
    const posthog = usePostHog()
    const [projectName, setProjectName] = React.useState<string | null>(null)
    const [projectToken, setProjectToken] = React.useState<string | null>(null)
    const [appHost, setAppHost] = React.useState<string | null>(null)
    const [region, setRegion] = React.useState<string>('us')
    const clientApiHost = appHost?.replace('.posthog.com', '.i.posthog.com') ?? 'https://us.i.posthog.com'

    const displayName = label || languageMap[currentLanguage.language]?.label || currentLanguage.language

    const websiteTheme = siteSettings.theme

    const [expandedStates, setExpandedStates] = React.useState<Record<string, boolean>>({})
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const setExpanded = (language: string, value: boolean) => {
        setExpandedStates((prev) => ({ ...prev, [language]: value }))
    }
    const getExpanded = (language: string) => expandedStates[language] || false

    // Sync selectedIndex with currentLanguage prop
    React.useEffect(() => {
        const index = languages.findIndex((lang) => lang === currentLanguage)
        if (index !== -1 && index !== selectedIndex) {
            setSelectedIndex(index)
        }
    }, [currentLanguage, languages, selectedIndex])

    React.useEffect(() => {
        // Browser check - no cookies on the server
        if (document) {
            setProjectName(getCookie('ph_current_project_name'))
            setProjectToken(getCookie('ph_current_project_token'))
            setAppHost(getCookie('ph_current_instance'))
        }
    }, [])

    React.useEffect(() => {
        if (posthog?.isFeatureEnabled('direct-to-eu-cloud')) {
            setRegion('eu')
        }
    }, [posthog])

    const replaceProjectInfo = (code: string): string => {
        return code
            .replace(/<ph_project_api_key>/g, removeQuotes(projectToken) || '<ph_project_api_key>')
            .replace(/<ph_project_name>/g, removeQuotes(projectName) || '<ph_project_name>')
            .replace(/<ph_app_host>/g, removeQuotes(appHost) || '<ph_app_host>')
            .replace(/<ph_client_api_host>/g, removeQuotes(clientApiHost) || 'https://us.i.posthog.com')
            .replace(/<ph_region>/g, removeQuotes(region) || '<ph_region>')
            .replace(/<ph_posthog_js_defaults>/g, '2025-11-30')
            .replace(
                /<ph_proxy_path>/g,
                projectToken ? `relay-${removeQuotes(projectToken)?.slice(-4)}` : '<ph_proxy_path>'
            )
    }

    const copyToClipboard = (code: string): void => {
        navigator.clipboard.writeText(replaceProjectInfo(stripAnnotationComments(code)))
        setTooltipVisible(true)
        setTimeout(() => setTooltipVisible(false), 500)
    }

    const handleAskAboutCode = (code: string, language: string): void => {
        const processedCode = replaceProjectInfo(stripAnnotationComments(code))
        const pagePath = appWindow?.path || location.pathname?.replace(/\/$/, '') || ''
        const sourceUrl = `https://posthog.com${pagePath}`

        // Use a timestamp so window opens fresh each time
        openNewChat({
            path: `ask-max-${pagePath}-code-${Date.now()}`,
            initialQuestion: `Explain this ${language || 'code'} code from ${sourceUrl}`,
            codeSnippet: { code: processedCode, language, sourceUrl },
        })
    }

    const getHighlightLineNumbers = (
        code: string
    ): { highlight: number[]; diffAdd: number[]; diffRemove: number[] } => {
        const highlightLineNumbers: number[] = []
        const diffAddLineNumbers: number[] = []
        const diffRemoveLineNumbers: number[] = []

        const codeLines = code.split('\n')
        codeLines.forEach((line, index) => {
            if (line.includes(highlightKey)) {
                highlightLineNumbers.push(index)
            }
            if (line.includes(diffAddKey)) {
                diffAddLineNumbers.push(index)
            }
            if (line.includes(diffRemoveKey)) {
                diffRemoveLineNumbers.push(index)
            }
        })

        return { highlight: highlightLineNumbers, diffAdd: diffAddLineNumbers, diffRemove: diffRemoveLineNumbers }
    }

    const generateSQLEditorLink = (code: string): string => {
        // Takes an SQL string and returns a URL string in the PostHog SQL editor format
        // We can't use app.posthog.com to redirect because it breaks newlines in the encoded URL

        const query = encodeURIComponent(code.trim()).replace(/%20/g, '+').replace(/\(/g, '%28').replace(/\)/g, '%29')
        return `https://${region}.posthog.com/sql?open_query=${query}`
    }

    return (
        <div className="code-block relative mt-2 mb-4 border border-primary rounded">
            {showLabel && (
                <div className="bg-accent text-sm flex items-center w-full rounded-t">
                    {selector === 'tabs' && languages.length > 1 ? (
                        <Tab.Group
                            selectedIndex={selectedIndex}
                            onChange={(index) => {
                                setSelectedIndex(index)
                                onChange?.(languages[index])
                            }}
                        >
                            <Tab.List className="flex items-center gap-[1px] flex-wrap">
                                {languages.map((option, index) => (
                                    <Tab
                                        key={option.file || option.label || index}
                                        className={({ selected }) =>
                                            `cursor-pointer text-sm px-3 py-2 rounded-full relative after:h-[2px] after:-bottom-[1px] after:left-0 after:right-0 after:absolute after:content-['']  ${
                                                selected
                                                    ? 'font-bold text-red hover:text-red dark:text-yellow hover:dark:text-yellow after:bg-red dark:after:bg-yellow'
                                                    : 'text-muted hover:after:bg-black/50 dark:hover:after:bg-white/50 hover:text-secondary'
                                            }`
                                        }
                                    >
                                        {option.file ||
                                            option.label ||
                                            languageMap[option.language]?.label ||
                                            option.language}
                                    </Tab>
                                ))}
                            </Tab.List>
                        </Tab.Group>
                    ) : showLabel ? (
                        <div className="min-w-0 mr-8 px-3 py-2 font-bold opacity-50">
                            {currentLanguage.file ? (
                                <div className="flex items-center space-x-1.5">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="w-4 h-4"
                                    >
                                        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                                        <polyline points="13 2 13 9 20 9" />
                                    </svg>
                                    <span className="font-semibold">{currentLanguage.file}</span>
                                </div>
                            ) : (
                                displayName
                            )}
                        </div>
                    ) : null}

                    <div className="shrink-0 ml-auto flex items-center divide-x divide-border dark:divide-border-dark">
                        {selector === 'dropdown' && languages.length > 1 ? (
                            <div className="relative mr-2">
                                <Listbox value={currentLanguage} onChange={(language) => onChange(language)}>
                                    <Listbox.Button className="flex items-center space-x-1.5 text-gray">
                                        <span>
                                            {currentLanguage.label ||
                                                languageMap[currentLanguage.language]?.label ||
                                                currentLanguage?.language}
                                        </span>

                                        <SelectorIcon className="w-4 h-4" />
                                    </Listbox.Button>

                                    <Listbox.Options className="absolute top-full right-0 m-0 p-0 mt-1 bg-black text-white list-none rounded text-xs focus:outline-none z-[50] overflow-hidden border border-primary">
                                        {languages.map((option) => (
                                            <Listbox.Option
                                                key={option.language}
                                                value={option}
                                                className="cursor-pointer text-sm hover:bg-accent-dark w-full px-3 py-1"
                                            >
                                                {option.label || option.language}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Listbox>
                            </div>
                        ) : null}

                        {(() => {
                            const activeLanguage = languages[selectedIndex] || currentLanguage
                            return (
                                <>
                                    {activeLanguage.runInPostHog !== 'false' && activeLanguage.language === 'sql' && (
                                        <div className="relative flex items-center justify-center px-1">
                                            <a
                                                href={`${generateSQLEditorLink(activeLanguage.code)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 whitespace-nowrap text-muted hover:text-secondary px-1 py-1 bg-transparent hover:bg-border border border-transparent hover:border rounded relative hover:scale-[1.02] active:top-[.5px] active:scale-[.99]"
                                            >
                                                Run in PostHog
                                                <IconArrowUpRight className="w-4 h-4" />
                                            </a>
                                        </div>
                                    )}

                                    {showAskAI && (
                                        <div className="relative flex items-center justify-center px-1 group/askai">
                                            <button
                                                onClick={() =>
                                                    handleAskAboutCode(activeLanguage.code, activeLanguage.language)
                                                }
                                                className="ask-posthog-ai-code-snippet inline-flex items-center gap-1 text-muted hover:text-secondary px-1 py-1 bg-transparent hover:bg-border border border-transparent hover:border rounded relative hover:scale-[1.02] active:top-[.5px] active:scale-[.99]"
                                            >
                                                <span className="hidden group-hover/askai:inline whitespace-nowrap text-sm">
                                                    PostHog AI
                                                </span>
                                                <IconSparkles className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}

                                    {showCopy && (
                                        <div className="relative flex items-center justify-center px-1">
                                            <button
                                                onClick={() => copyToClipboard(activeLanguage.code)}
                                                className="text-muted hover:text-secondary px-1 py-1 bg-transparent hover:bg-border border border-transparent hover:border rounded relative hover:scale-[1.02] active:top-[.5px] active:scale-[.99]"
                                                title="Copy to clipboard"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 18 18"
                                                    className="w-4 h-4 fill-current"
                                                >
                                                    <g clipPath="url(#a)">
                                                        <path d="M3.079 5.843h2.103V2.419c0-.58.236-1.106.618-1.487A2.1 2.1 0 0 1 7.287.313h7.634c.58 0 1.106.237 1.487.619a2.1 2.1 0 0 1 .618 1.487v7.633a2.1 2.1 0 0 1-.618 1.488 2.1 2.1 0 0 1-1.487.618h-2.103v3.424c0 .58-.236 1.106-.618 1.487a2.1 2.1 0 0 1-1.487.618H3.079c-.58 0-1.106-.236-1.487-.618a2.1 2.1 0 0 1-.618-1.487V7.948c0-.58.236-1.106.618-1.487a2.1 2.1 0 0 1 1.487-.618Zm3.28 0h4.354c.58 0 1.106.236 1.487.618a2.1 2.1 0 0 1 .618 1.487v3.033h2.103a.925.925 0 0 0 .655-.273.926.926 0 0 0 .274-.655V2.418a.925.925 0 0 0-.274-.656.926.926 0 0 0-.655-.273H7.287a.924.924 0 0 0-.655.273.926.926 0 0 0-.273.656v3.424Zm-.586 1.176H3.077a.924.924 0 0 0-.655.274.926.926 0 0 0-.273.655v7.634c0 .254.104.487.273.655.169.169.401.274.655.274h7.634a.924.924 0 0 0 .656-.274.926.926 0 0 0 .273-.655V7.948a.925.925 0 0 0-.273-.655.926.926 0 0 0-.656-.274h-4.94.002Z" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="a">
                                                            <path d="M0 0h18v18H0z" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </button>

                                            {tooltipVisible && (
                                                <AnimatePresence>
                                                    <motion.div
                                                        className="absolute top-full mt-2 -right-2 bg-black text-white font-semibold px-2 py-1 rounded z-10"
                                                        initial={{ translateY: '-50%', opacity: 0 }}
                                                        animate={{ translateY: 0, opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                    >
                                                        Copied!
                                                    </motion.div>
                                                </AnimatePresence>
                                            )}
                                        </div>
                                    )}
                                </>
                            )
                        })()}
                    </div>
                </div>
            )}

            {languages.map((languageOption, index) => {
                const isActive = index === selectedIndex
                const languageId = `${codeBlockId}-${languageOption.language}`
                const expanded = getExpanded(languageOption.language)
                const linesToShow = languageOption.focusOnLines ? getLinesToShow(languageOption.focusOnLines) : []
                const {
                    highlight: highlightLineNumbers,
                    diffAdd: diffAddLineNumbers,
                    diffRemove: diffRemoveLineNumbers,
                } = getHighlightLineNumbers(languageOption.code)

                return (
                    <div key={languageOption.language} className={isActive ? '' : 'hidden'} aria-hidden={!isActive}>
                        <Highlight
                            {...defaultProps}
                            code={replaceProjectInfo(languageOption.code.trim())}
                            language={
                                (languageMap[languageOption.language]?.language || languageOption.language) as Language
                            }
                            theme={websiteTheme === 'dark' ? darkTheme : lightTheme}
                        >
                            {({ className, tokens, getLineProps, getTokenProps }) => (
                                <pre
                                    data-scheme="primary"
                                    className={`w-full m-0 p-0 rounded-b bg-primary border-primary ${
                                        showLabel ? 'rounded-t-none border-t' : 'rounded-t'
                                    }`}
                                >
                                    <ScrollArea>
                                        <div className="flex whitespace-pre min-w-fit relative pb-2" id={languageId}>
                                            {showLineNumbers && (
                                                <pre className="m-0 py-4 pr-3 pl-5 inline-block font-code font-medium text-sm bg-accent">
                                                    <span
                                                        className="select-none flex flex-col dark:text-white/60 text-black/60 shrink-0"
                                                        aria-hidden="true"
                                                    >
                                                        {!expanded && linesToShow.length > 0 && linesToShow[0] >= 0 && (
                                                            <div className="flex border-b border-dashed border-primary w-full mb-2 -mt-2">
                                                                <button
                                                                    onClick={() =>
                                                                        setExpanded(languageOption.language, !expanded)
                                                                    }
                                                                    className="text-muted hover:text-secondary px-2 py-1 text-sm flex items-center gap-1 hover:scale-[1.01] hover:top-[-.5px] active:top-[.5px] active:scale-[.99] font-semibold"
                                                                >
                                                                    ...
                                                                </button>
                                                            </div>
                                                        )}
                                                        {tokens.map((_, i) => {
                                                            if (
                                                                !linesToShow.length ||
                                                                linesToShow.includes(i) ||
                                                                expanded
                                                            ) {
                                                                return (
                                                                    <span
                                                                        className={`inline-block text-right align-middle`}
                                                                        key={i}
                                                                    >
                                                                        <span>{i + lineNumberStart}</span>
                                                                    </span>
                                                                )
                                                            }
                                                            return
                                                        })}
                                                        {!expanded &&
                                                            linesToShow.length > 0 &&
                                                            linesToShow[linesToShow.length - 1] <=
                                                                tokens.length - 1 && (
                                                                <div className="flex border-t border-dashed border-primary w-full mt-2 -mb-2">
                                                                    <button
                                                                        onClick={() =>
                                                                            setExpanded(
                                                                                languageOption.language,
                                                                                !expanded
                                                                            )
                                                                        }
                                                                        className="text-muted hover:text-secondary px-2 py-1 text-sm flex items-center gap-1 hover:scale-[1.01] hover:top-[-.5px] active:top-[.5px] active:scale-[.99] font-semibold"
                                                                    >
                                                                        ...
                                                                    </button>
                                                                </div>
                                                            )}
                                                    </span>
                                                </pre>
                                            )}

                                            <code
                                                className={`not-prose block rounded-none !m-0 p-4 shrink-0 flex-1 font-code font-medium text-sm ${className}`}
                                            >
                                                {!expanded && linesToShow.length > 0 && linesToShow[0] >= 0 && (
                                                    <div className="flex border-b border-dashed border-primary w-full mb-2 -mt-2">
                                                        <button
                                                            onClick={() =>
                                                                setExpanded(languageOption.language, !expanded)
                                                            }
                                                            className="text-muted hover:text-secondary px-2 py-1 text-sm flex items-center gap-1 hover:scale-[1.01] hover:top-[-.5px] active:top-[.5px] active:scale-[.99] font-semibold"
                                                        >
                                                            Show full example
                                                        </button>
                                                    </div>
                                                )}
                                                {tokens.map((line, i) => {
                                                    if (
                                                        linesToShow.length > 0 &&
                                                        !linesToShow.includes(i) &&
                                                        !expanded
                                                    ) {
                                                        return
                                                    }
                                                    const { className, ...props } = getLineProps({ line, key: i })
                                                    const tooltipContent =
                                                        tooltips?.find(
                                                            (tooltip) => tooltip.lineNumber === i + lineNumberStart
                                                        )?.content ||
                                                        line
                                                            .find((token) => token.content.startsWith(tooltipKey))
                                                            ?.content.replace(tooltipKey, '')
                                                    line.forEach((token) => {
                                                        if (token.content.includes(highlightKey)) {
                                                            token.content = token.content.replace(highlightKey, '')
                                                        }
                                                        if (token.content.includes(diffAddKey)) {
                                                            token.content = token.content.replace(diffAddKey, '')
                                                        }
                                                        if (token.content.includes(diffRemoveKey)) {
                                                            token.content = token.content.replace(diffRemoveKey, '')
                                                        }
                                                    })

                                                    const firstContentIndex = line.findIndex(
                                                        (token) => !!token.content.trim()
                                                    )
                                                    return (
                                                        <div
                                                            key={i}
                                                            className={`${className} relative
                                                        ${highlightLineNumbers.includes(i) ? 'bg-yellow/10' : ''}
                                                        ${diffAddLineNumbers.includes(i) ? 'bg-green/10' : ''}
                                                        ${diffRemoveLineNumbers.includes(i) ? 'bg-red/10' : ''}
                                                        `}
                                                            {...props}
                                                        >
                                                            {line
                                                                .filter(
                                                                    (token) => !token.content.startsWith(tooltipKey)
                                                                )
                                                                .map((token, key) => {
                                                                    const { className, children, ...props } =
                                                                        getTokenProps({
                                                                            token,
                                                                            key,
                                                                        })
                                                                    return (
                                                                        <span className="relative" key={key}>
                                                                            {firstContentIndex === key &&
                                                                                tooltipContent && (
                                                                                    <Tooltip
                                                                                        content={() => (
                                                                                            <div className="text-center max-w-[200px]">
                                                                                                {tooltipContent.trim()}
                                                                                            </div>
                                                                                        )}
                                                                                    >
                                                                                        <span className="absolute -left-1 -translate-x-full top-1/2 -translate-y-1/2 flex h-3 w-3">
                                                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue/80 opacity-75"></span>
                                                                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue"></span>
                                                                                        </span>
                                                                                    </Tooltip>
                                                                                )}
                                                                            <span
                                                                                className={`${className} text-shadow-none `}
                                                                                {...props}
                                                                            >
                                                                                {children}
                                                                            </span>
                                                                        </span>
                                                                    )
                                                                })}
                                                        </div>
                                                    )
                                                })}
                                                {!expanded &&
                                                    linesToShow.length > 0 &&
                                                    linesToShow[linesToShow.length - 1] <= tokens.length - 1 && (
                                                        <div className="flex border-t border-dashed border-primary w-full mt-2 -mb-2">
                                                            <button
                                                                onClick={() =>
                                                                    setExpanded(languageOption.language, !expanded)
                                                                }
                                                                className="text-muted hover:text-secondary px-2 py-1 text-sm flex items-center gap-1 hover:scale-[1.01] hover:top-[-.5px] active:top-[.5px] active:scale-[.99] font-semibold"
                                                            >
                                                                Show full example
                                                            </button>
                                                        </div>
                                                    )}
                                            </code>
                                        </div>
                                    </ScrollArea>
                                </pre>
                            )}
                        </Highlight>
                    </div>
                )
            })}
        </div>
    )
}
