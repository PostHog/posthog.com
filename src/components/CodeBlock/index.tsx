import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import { generateRandomHtmlId, getCookie } from '../../lib/utils'
import { Listbox, Tab } from '@headlessui/react'
import { SelectorIcon } from '@heroicons/react/outline'

import theme from './theme'
import languageMap from './languages'

type LanguageOption = {
    label?: string
    language: string
    file?: string
    code: string
}

type CodeBlockProps = {
    label?: React.ReactNode
    selector?: 'dropdown' | 'tabs'
    showLabel?: boolean
    showLineNumbers?: boolean
    showCopy?: boolean

    onChange?: (language: LanguageOption) => void
    currentLanguage: LanguageOption
    children: LanguageOption[]
}

type SingleCodeBlockProps = {
    label?: React.ReactNode
    showLabel?: boolean
    showLineNumbers?: boolean
    showCopy?: boolean

    language: string
    children: string
}

type MdxCodeBlock = {
    selector?: 'dropdown' | 'tabs'
    showTitle?: boolean
    showCopy?: boolean
    children: MdxCodeBlockChildren[] | MdxCodeBlockChildren
}

// Optional metastring properties
type MetaStringProps = {
    metastring?: string
    file?: string
    showLineNumbers?: boolean
    label?: string
    unavailable?: boolean
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

export const MdxCodeBlock = ({ children, ...props }: MdxCodeBlock) => {
    const childArray = Array.isArray(children) ? children : [children]

    const languages = childArray
        .filter((child) => child.props.mdxType === 'pre' || child.props.mdxType === 'code')
        .map((child) => {
            const {
                className = '',
                label,
                file,
                children,
            } = child.props.mdxType === 'code' ? child.props : child.props.children.props

            const matches = className.match(/language-(?<lang>.*)/)
            const language = matches && matches.groups && matches.groups.lang ? matches.groups.lang : ''

            return {
                label,
                language,
                file,
                code: children as string,
            }
        })

    // This isn't great practice as it means hooks are renderered conditionally
    if (languages.length === 0) {
        return null
    }

    const [currentLanguage, setCurrentLanguage] = React.useState<LanguageOption>(languages[0])

    return (
        <CodeBlock currentLanguage={currentLanguage} onChange={setCurrentLanguage} {...props}>
            {languages}
        </CodeBlock>
    )
}

export const SingleCodeBlock = ({ label, language, children, ...props }: SingleCodeBlockProps) => {
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

export const CodeBlock = ({
    label,
    selector = 'dropdown',
    showLabel = true,
    showCopy = true,
    showLineNumbers = false,

    children: languages,
    currentLanguage,
    onChange,
}: CodeBlockProps) => {
    if (languages.length < 0 || !currentLanguage) {
        return null
    }

    const codeBlockId = generateRandomHtmlId()

    const [tooltipVisible, setTooltipVisible] = React.useState(false)

    const [projectName, setProjectName] = React.useState<string | null>(null)
    const [projectToken, setProjectToken] = React.useState<string | null>(null)

    const displayName = label || languageMap[currentLanguage.language]?.label || currentLanguage.language

    React.useEffect(() => {
        // Browser check - no cookies on the server
        if (document) {
            setProjectName(getCookie('ph_current_project_name'))
            setProjectToken(getCookie('ph_current_project_token'))
        }
    }, [])

    const copyToClipboard = () => {
        navigator.clipboard.writeText(currentLanguage.code)

        setTooltipVisible(true)
        setTimeout(() => {
            setTooltipVisible(false)
        }, 1000)
    }

    return (
        <div className="relative my-2">
            <div className="bg-black/90 text-gray px-3 py-1.5 text-sm flex items-center w-full rounded-t">
                {selector === 'tabs' && languages.length > 1 ? (
                    <Tab.Group onChange={(index) => onChange?.(languages[index])}>
                        <Tab.List className="flex items-center space-x-5">
                            {languages.map((option) => (
                                <Tab
                                    key={option.language}
                                    className={({ selected }) =>
                                        `cursor-pointer text-sm py-0.5 ${selected ? 'font-semibold text-white/70' : ''}`
                                    }
                                >
                                    {option.label || languageMap[option.language]?.label || option.language}
                                </Tab>
                            ))}
                        </Tab.List>
                    </Tab.Group>
                ) : showLabel ? (
                    <div className="min-w-0 mr-8">
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

                <div className="shrink-0 ml-auto flex items-center divide-x divide-gray-accent-dark">
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

                                <Listbox.Options className="absolute top-full right-0 mt-1 bg-black px-0 py-2 text-white list-none rounded text-xs focus:outline-none border border-white/10">
                                    {languages.map((option) => (
                                        <Listbox.Option
                                            key={option.language}
                                            value={option}
                                            className="cursor-pointer text-sm hover:bg-gray-accent-dark w-full pl-8 pr-2 py-0.5"
                                        >
                                            {option.label || option.language}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Listbox>
                        </div>
                    ) : null}

                    {showCopy && (
                        <div className="relative flex items-center justify-center pl-2">
                            <button
                                onClick={copyToClipboard}
                                className="text-primary-dark/50 hover:text-primary-dark/75 p-1 -m-1 hover:bg-black/40 rounded relative hover:scale-[1.07] active:top-[.5px] active:scale-[.99]"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
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
                                        className="absolute top-full mt-2 -right-2 bg-black text-white font-semibold px-2 py-1 rounded"
                                        initial={{ translateY: '-50%', opacity: 0 }}
                                        animate={{ translateY: 0, opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        Copied
                                    </motion.div>
                                </AnimatePresence>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <Highlight
                {...defaultProps}
                code={currentLanguage.code.trim()}
                language={(languageMap[currentLanguage.language]?.language || currentLanguage.language) as Language}
                theme={theme}
            >
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre className="w-full m-0 p-0 rounded-t-none rounded-b" style={{ ...style }}>
                        <div className="flex" id={codeBlockId}>
                            {showLineNumbers && (
                                <pre className="m-0 py-4 pl-4 pr-2 inline-block">
                                    <span
                                        className="select-none flex flex-col text-white/80 shrink-0"
                                        aria-hidden="true"
                                    >
                                        {tokens.map((_, i) => (
                                            <span className="inline-block w-4 text-right align-middle" key={i}>
                                                {i + 1}
                                            </span>
                                        ))}
                                    </span>
                                </pre>
                            )}

                            <code className={`${className} block rounded-none !m-0 p-4 shrink-0`}>
                                {tokens.map((line, i) => {
                                    const { className, ...props } = getLineProps({ line, key: i })
                                    return (
                                        <div key={i} className={className} {...props}>
                                            {line.map((token, key) => {
                                                const { className, children, ...props } = getTokenProps({ token, key })

                                                return (
                                                    <span
                                                        key={key}
                                                        className={`${className} text-shadow-none`}
                                                        {...props}
                                                    >
                                                        {children === "'<ph_project_api_key>'" && projectToken
                                                            ? `'${projectToken}'`
                                                            : children === "'<ph_instance_address>'" && projectToken
                                                            ? 'https://app.posthog.com'
                                                            : children}
                                                    </span>
                                                )
                                            })}
                                        </div>
                                    )
                                })}
                            </code>
                        </div>
                    </pre>
                )}
            </Highlight>
        </div>
    )
}
