import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useValues } from 'kea'
import { layoutLogic } from 'logic/layoutLogic'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import darkTheme from './themes/dark'
import lightTheme from './themes/light'
import { generateRandomHtmlId, getCookie } from '../../lib/utils'
import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'

const TooltipTitle = ({ title, visible, className }: { title: string; visible: boolean; className?: string }) => {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className={className}
                    initial={{ position: 'absolute', translateY: 0, opacity: 0 }}
                    animate={{ translateY: '-150%', opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {title}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default function Tooltip({
    title = '',
    visible,
    children,
    className,
}: {
    title: string
    visible: boolean
    children: JSX.Element | JSX.Element[] | null
    className?: string
}): JSX.Element {
    return (
        <div className="relative">
            <TooltipTitle className={className} visible={visible} title={title} />
            {children}
        </div>
    )
}

interface CodeBlockProps {
    showLineNumbers?: boolean
    children: {
        key?: string | null
        props: {
            parentName: string
            className: string
            originalType: string
            mdxType: string
            children: string
        }
        [extraProps: string]: any // 'children' has other props that we don't use here
    }
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ children, showLineNumbers = false }) => {
    const { posthog } = useValues(posthogAnalyticsLogic)
    const className = children.props.className || ''
    const matches = className.match(/language-(?<lang>.*)/)
    const language = matches && matches.groups && matches.groups.lang ? matches.groups.lang : ''
    const codeBlockId = generateRandomHtmlId()
    const { websiteTheme } = useValues(layoutLogic)

    const [code, setCode] = useState('')
    const [projectName, setProjectName] = useState('')
    const [copyToClipboardAvailable, setCopyToClipboardAvailable] = useState(false)
    const [hasBeenCopied, setHasBeenCopied] = useState(false)
    const [tooltipVisible, setTooltipVisible] = useState(false)

    useEffect(() => {
        // Browser check - no cookies on the server
        if (document) {
            setProjectName(getCookie('ph_current_project_name') || '')
            const phToken = getCookie('ph_current_project_token')
            if (phToken) {
                const updatedCode = children.props.children
                    .trim()
                    .replace(/<ph_project_api_key>/g, phToken)
                    .replace(/<ph_instance_address>/g, 'https://app.posthog.com')
                setCode(updatedCode)
                highlightToken(phToken)
            }
            if (navigator.clipboard) {
                setCopyToClipboardAvailable(true)
            }
        }
    }, [children])

    const highlightToken = async (token: string) => {
        if (!localStorage.getItem('token_autofilled')) {
            localStorage.setItem('token_autofilled', '1')
            if (posthog) {
                posthog.capture('token_autofilled', { $set: { token_autofilled: true } })
            }
        }
        const phTokenElements = document.evaluate(
            `//pre[@id='${codeBlockId}']/*/span[contains(., '${token}')]`,
            document,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null
        )

        const tokenHighlightHtml = `<span class='code-block-ph-token' data-tooltip='This is the API key of your ${projectName} project in PostHog Cloud.'>${token}</span>`
        const tokenMatchRegex = new RegExp(token, 'g')
        const snapshotIndex = 0
        let node: HTMLElement | null = phTokenElements.snapshotItem(snapshotIndex) as HTMLElement

        while (node) {
            node.innerHTML = node.innerHTML.replace(tokenMatchRegex, tokenHighlightHtml)
            node = phTokenElements.snapshotItem(snapshotIndex + 1) as HTMLElement
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code || children.props.children.trim())
        setHasBeenCopied(true)
        setTooltipVisible(true)
        setTimeout(() => {
            setTooltipVisible(false)
        }, 1000)
    }

    return (
        <div className="relative my-2 rounded overflow-hidden">
            <div className="bg-black/90 text-gray px-3 py-1.5 text-sm flex items-center justify-between">
                <div>JavaScript</div>

                <button onClick={copyToClipboard} className="text-gray dark:text-primary-dark">
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
            </div>

            <pre className="m-0 p-0 rounded-none">
                <Highlight
                    {...defaultProps}
                    code={code || children.props.children.trim()}
                    language={language as Language}
                    theme={websiteTheme === 'dark' ? darkTheme : lightTheme}
                >
                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                        <div className="flex p-4" style={{ ...style }} id={codeBlockId}>
                            {showLineNumbers && (
                                <span className="select-none flex flex-col text-white/80" aria-hidden="true">
                                    {tokens.map((_, i) => (
                                        <span
                                            style={{ lineHeight: '20px' }}
                                            className="inline-block w-4 text-right mr-4 align-middle"
                                            key={i}
                                        >
                                            {i + 1}
                                        </span>
                                    ))}
                                </span>
                            )}

                            <code className={`${className} block rounded-none !m-0`}>
                                {tokens.map((line, i) => (
                                    <div key={i} className="h-[20px]" {...getLineProps({ line, key: i })}>
                                        {line.map((token, key) => {
                                            const { className, ...other } = getTokenProps({ token, key })
                                            return (
                                                <span
                                                    key={key}
                                                    className={`${className} text-shadow-none`}
                                                    {...other}
                                                />
                                            )
                                        })}
                                    </div>
                                ))}
                            </code>
                        </div>
                    )}
                </Highlight>
            </pre>
        </div>
    )
}
