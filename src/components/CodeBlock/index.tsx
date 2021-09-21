import React, { useState, useEffect } from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import darkTheme from 'prism-react-renderer/themes/nightOwl'
import lightTheme from 'prism-react-renderer/themes/nightOwlLight'
import { getCookie, generateRandomHtmlId } from '../../lib/utils'
import { useValues } from 'kea'
import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'
import './style.scss'
import { CopyOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { layoutLogic } from 'logic/layoutLogic'

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
        [extraProps: string]: unknown // 'children' has other props that we don't use here
    }
}

export const CodeBlock = (props: CodeBlockProps): JSX.Element => {
    const { posthog } = useValues(posthogAnalyticsLogic)
    const className = props.children.props.className || ''
    const matches = className.match(/language-(?<lang>.*)/)
    const [code, setCode] = useState('')
    const [projectName, setProjectName] = useState('')
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
        setTooltipVisible(true)
        setTimeout(() => {
            setTooltipVisible(false)
        }, 1000)
    }

    return (
        <div className="relative">
            <Tooltip title="Copied!" visible={tooltipVisible}>
                {copyToClipboardAvailable ? (
                    <span className="text-primary dark:text-primary-dark absolute right-2 top-1">
                        <CopyOutlined onClick={copyToClipboard} />
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
