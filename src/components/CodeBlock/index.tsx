import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import { generateRandomHtmlId, getCookie } from '../../lib/utils'
import { Listbox, Tab } from '@headlessui/react'
import { SelectorIcon } from '@heroicons/react/outline'

import theme from './theme'

const languageMap: Record<string, { language: string; label: React.ReactNode }> = {
    js: {
        language: 'javascript',
        label: 'JavaScript',
    },
    jsx: {
        language: 'jsx',
        label: 'JSX',
    },
    shell: {
        language: 'shell',
        label: (
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
                    className="w-3 h-3"
                >
                    <polyline points="4 17 10 11 4 5" />
                    <line x1="12" y1="19" x2="20" y2="19" />
                </svg>
                <span className="font-semibold">Terminal</span>
            </div>
        ),
    },
    bash: {
        language: 'bash',
        label: (
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
                    className="w-3 h-3"
                >
                    <polyline points="4 17 10 11 4 5" />
                    <line x1="12" y1="19" x2="20" y2="19" />
                </svg>
                <span className="font-semibold">Terminal</span>
            </div>
        ),
    },
    android: {
        language: 'clike',
        label: 'Android',
    },
    ruby: {
        language: 'ocaml',
        label: 'Ruby',
    },
    objectivec: {
        language: 'objectivec',
        label: 'Objective-C',
    },
    html: {
        language: 'html',
        label: 'HTML',
    },
    yaml: {
        language: 'yaml',
        label: 'YAML',
    },
    python: {
        language: 'python',
        label: 'Python',
    },
    ios: {
        language: 'objectivec',
        label: 'iOS',
    },
    'react-native': {
        language: 'jsx',
        label: 'React Native',
    },
}

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
                        <div className="relative flex items-center justify-center inline-block pl-2">
                            <button
                                onClick={copyToClipboard}
                                className="text-gray dark:text-primary-dark p-1 -m-1 hover:bg-black/40 rounded"
                            >
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
                                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
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
