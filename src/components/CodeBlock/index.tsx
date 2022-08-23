import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import theme from './theme'
import { generateRandomHtmlId, getCookie } from '../../lib/utils'
import { Listbox } from '@headlessui/react'
import { SelectorIcon } from '@heroicons/react/outline'

type CodeBlockProps = {
    title?: React.ReactNode
    children: {
        name?: string
        language: Language
        code: string
    }[]

    showTitle?: boolean
    showLineNumbers?: boolean
    showCopy?: boolean
}

type MdxCodeBlockProps = {
    children: {
        key?: string | null
        props: {
            children: string
        }
        [extraProps: string]: any // 'children' has other props that we don't use here
    }
}

export const MdxCodeBlock: React.FC<MdxCodeBlockProps> = ({ children }) => {
    const className = children.props.className || ''
    const matches = className.match(/language-(?<lang>.*)/)
    const language = matches && matches.groups && matches.groups.lang ? matches.groups.lang : ''

    return (
        <CodeBlock showTitle={true}>
            {[
                {
                    name: language,
                    language,
                    code: children.props.children,
                },
            ]}
        </CodeBlock>
    )
}

export const CodeBlock = ({
    title,
    children,
    showTitle = true,
    showCopy = true,
    showLineNumbers = false,
}: CodeBlockProps) => {
    if (children.length < 0) {
        return null
    }

    const codeBlockId = generateRandomHtmlId()

    const [currentLanguage, setCurrentLanguage] = React.useState(children[0])
    const [tooltipVisible, setTooltipVisible] = React.useState(false)

    const [projectName, setProjectName] = React.useState<string | null>(null)
    const [projectToken, setProjectToken] = React.useState<string | null>(null)

    React.useEffect(() => {
        // Browser check - no cookies on the server
        if (document) {
            setProjectName(getCookie('ph_current_project_name'))
            setProjectToken(getCookie('ph_current_project_token'))
        }
    }, [children])

    const copyToClipboard = () => {
        navigator.clipboard.writeText(currentLanguage.code)

        setTooltipVisible(true)
        setTimeout(() => {
            setTooltipVisible(false)
        }, 1000)
    }

    return (
        <div className="relative my-2 rounded overflow-hidden">
            <div className="bg-black/90 text-gray px-3 py-1.5 text-sm flex items-center w-full">
                {showTitle && <div className="min-w-0 mr-8">{title || currentLanguage.name}</div>}

                <div className="shrink-0 ml-auto flex items-center divide-x divide-gray-accent-dark">
                    {children.length > 1 ? (
                        <div className="relative mr-2">
                            <Listbox value={currentLanguage} onChange={setCurrentLanguage}>
                                <Listbox.Button className="flex items-center space-x-1.5 text-gray">
                                    <span>{currentLanguage.name || currentLanguage.language}</span>

                                    <SelectorIcon className="w-4 h-4" />
                                </Listbox.Button>

                                <Listbox.Options className="absolute top-full right-0 mt-1 bg-black px-0 py-2 text-white list-none rounded text-xs focus:outline-none">
                                    {children.map((option) => (
                                        <Listbox.Option
                                            key={option.language}
                                            value={option}
                                            className="cursor-pointer text-sm hover:bg-black/40 w-full pl-8 pr-2 py-0.5"
                                        >
                                            {option.name || option.language}
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
                language={currentLanguage.language}
                theme={theme}
            >
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre className="w-full m-0 p-0 rounded-none" style={{ ...style }}>
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
