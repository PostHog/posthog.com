import React, { useState, useEffect } from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/okaidia'
import { getCookie, generateRandomHtmlId } from '../../lib/utils'
import { useValues } from 'kea'
import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'
import './style.scss'

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

    const language = matches && matches.groups && matches.groups.lang ? matches.groups.lang : ''

    const codeBlockId = generateRandomHtmlId()

    useEffect(() => {
        // Browser check - no cookies on the server
        if (document) {
            setProjectName(getCookie('ph_current_project_name') || '')
            const phToken = getCookie('ph_current_project_token')
            if (phToken) {
                let updatedCode = props.children.props.children
                    .trim()
                    .replace(/<ph_project_api_key>/g, phToken)
                    .replace(/<ph_instance_address>/g, 'https://app.posthog.com')
                setCode(updatedCode)
                highlightToken(phToken)
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
        let snapshotIndex = 0
        let node: HTMLElement | null = phTokenElements.snapshotItem(snapshotIndex) as HTMLElement
        while (node) {
            node.innerHTML = node.innerHTML.replace(tokenMatchRegex, tokenHighlightHtml)
            node = phTokenElements.snapshotItem(snapshotIndex + 1) as HTMLElement
        }
    }

    return (
        <Highlight
            {...defaultProps}
            code={code || props.children.props.children.trim()}
            language={language as Language}
            theme={theme}
        >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={{ ...style, padding: '20px' }} id={codeBlockId}>
                    {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => (
                                <span key={key} {...getTokenProps({ token, key })} />
                            ))}
                        </div>
                    ))}
                </pre>
            )}
        </Highlight>
    )
}
