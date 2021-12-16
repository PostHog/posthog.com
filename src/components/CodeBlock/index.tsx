import { AnimatePresence, motion } from 'framer-motion'
import { useValues } from 'kea'
import { layoutLogic } from 'logic/layoutLogic'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import darkTheme from 'prism-react-renderer/themes/nightOwl'
import lightTheme from 'prism-react-renderer/themes/nightOwlLight'
import React, { useEffect, useState } from 'react'
import { generateRandomHtmlId, getCookie } from '../../lib/utils'
import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'
import './style.scss'

const TooltipTitle = ({ title, visible, className }: { title: string; visible: boolean; className: string }) => {
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
    className = '',
}: {
    title: string
    visible: boolean
    children: JSX.Element[]
    className: ''
}) {
    return (
        <div className="relative">
            <TooltipTitle className={className} visible={visible} title={title} />
            {children}
        </div>
    )
}

interface CodeBlockProps {
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

export const CodeBlock = (props: CodeBlockProps) => {
    const { posthog } = useValues(posthogAnalyticsLogic)
    const className = props.children.props.className || ''
    const matches = className.match(/language-(?<lang>.*)/)
    const [code, setCode] = useState('')
    const [projectName, setProjectName] = useState('')
    const [hasBeenCopied, setHasBeenCopied] = useState(false)
    const [tooltipVisible, setTooltipVisible] = useState(false)
    const [copyToClipboardAvailable, setCopyToClipboardAvailable] = useState(false)
    const language = matches && matches.groups && matches.groups.lang ? matches.groups.lang : ''
    const codeBlockId = generateRandomHtmlId()
    const { websiteTheme } = useValues(layoutLogic)

    useEffect(() => {
        // Browser check - no cookies on the server
        if (document) {
            setProjectName(getCookie('ph_current_project_name') || '')
            const phToken = getCookie('ph_current_project_token')
            if (phToken) {
                const updatedCode = props.children.props.children
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
    }, [props])

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
        navigator.clipboard.writeText(code || props.children.props.children.trim())
        setHasBeenCopied(true)
        setTooltipVisible(true)
        setTimeout(() => {
            setTooltipVisible(false)
        }, 1000)
    }

    return (
        <div className="relative">
            <Tooltip className="right-0" title="Copied!" visible={tooltipVisible}>
                {copyToClipboardAvailable ? (
                    <span className="text-primary dark:text-primary-dark opacity-60 absolute right-1 top-1">
                        <button onClick={copyToClipboard}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                                />
                            </svg>
                        </button>
                    </span>
                ) : null}
            </Tooltip>
            <Highlight
                {...defaultProps}
                code={code || props.children.props.children.trim()}
                language={language as Language}
                theme={websiteTheme === 'dark' ? darkTheme : lightTheme}
            >
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre
                        className={`${className} !bg-gray-accent-light dark:!bg-gray-accent-dark`}
                        style={{ ...style, padding: '20px' }}
                        id={codeBlockId}
                    >
                        {tokens.map((line, i) => (
                            <div key={i} {...getLineProps({ line, key: i })}>
                                {line.map((token, key) => {
                                    const { className, ...other } = getTokenProps({ token, key })
                                    return <span key={key} className={`${className} text-shadow-none`} {...other} />
                                })}
                            </div>
                        ))}
                    </pre>
                )}
            </Highlight>
        </div>
    )
}
