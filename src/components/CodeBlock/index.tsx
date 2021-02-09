import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { OkaidiaTheme } from '../../lib/okaidia'

export const CodeBlock = (props: any) => {
    const className = props.children.props.className || ''
    const matches = className.match(/language-(?<lang>.*)/)
    return (
        <Highlight
            {...defaultProps}
            code={props.children.props.children.trim()}
            language={matches && matches.groups && matches.groups.lang ? matches.groups.lang : ''}
            theme={OkaidiaTheme}
        >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={{ ...style, padding: '20px' }}>
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
