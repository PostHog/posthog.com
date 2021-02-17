import React, { useState, useEffect } from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { OkaidiaTheme } from '../../lib/okaidia'
import { getCookie, generateRandomHtmlId } from '../../lib/utils'
import './style.scss'

export const CodeBlock = (props: any) => {
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
                    .replaceAll('<ph_project_api_key>', phToken)
                    .replaceAll('<ph_instance_address>', 'https://app.posthog.com')
                setCode(updatedCode)
                highlightToken(phToken)
            }
        }
    }, [props])

    const highlightToken = async (token: string) => {
        const phTokenElements = document.evaluate(
            `//pre[@id='${codeBlockId}']/*/span[contains(., '${token}')]`,
            document,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null
        )
        const tokenHighlightHtml = `<span class='code-block-ph-token' data-tooltip='This is the Project API Key for your project "${projectName}" in PostHog Cloud.'>${token}</span>`
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
            language={language}
            theme={OkaidiaTheme}
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
